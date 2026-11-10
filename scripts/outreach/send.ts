#!/usr/bin/env node
/**
 * Daily sender for the FMCSA outreach kits. Run once per sending day.
 *
 *   npm run outreach:send              # dry run: prints the plan, sends nothing
 *   npm run outreach:send -- --live    # sends
 *   npm run outreach:send -- --live --limit 50
 *
 * Reads data/outreach/leads.ndjson (from outreach:import) and keeps its
 * progress in data/outreach/state.ndjson, an append-only log where the
 * last line for an address wins. Configuration is documented in
 * docs/outreach/README.md and .env.example.
 */
import { appendFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { setTimeout as sleep } from "node:timers/promises";

import { AgentMail, AgentMailClient } from "agentmail";

import { SEQUENCE_LENGTH } from "../../lib/outreach/kits.ts";
import { renderEmail } from "../../lib/outreach/render.ts";
import { planDay, type LeadState, type PlannedSend } from "../../lib/outreach/schedule.ts";
import type { Layout, Lead } from "../../lib/outreach/types.ts";
import { listUnsubscribeHeaders, unsubscribeUrl } from "../../lib/outreach/unsubscribe.ts";

const DIR = path.join("data", "outreach");
const LEADS_FILE = path.join(DIR, "leads.ndjson");
const STATE_FILE = path.join(DIR, "state.ndjson");

type StoredState = LeadState & { email: string; threadId: string; note?: string };

function env(name: string, fallback?: string): string {
  const value = process.env[name]?.trim() || fallback;
  if (value === undefined) {
    console.error(`Missing required environment variable ${name}`);
    process.exit(1);
  }
  return value;
}

function readNdjson<T>(file: string): T[] {
  if (!existsSync(file)) return [];
  return readFileSync(file, "utf8")
    .split("\n")
    .filter(Boolean)
    .map((line) => JSON.parse(line) as T);
}

function flag(name: string): string | undefined {
  const i = process.argv.indexOf(name);
  return i === -1 ? undefined : process.argv[i + 1];
}

const live = process.argv.includes("--live");
const limit = flag("--limit");
const dailyCap = Math.min(Number(env("OUTREACH_DAILY_CAP", "200")), limit ? Number(limit) : Infinity);
const perInboxCap = Number(env("OUTREACH_PER_INBOX_CAP", "30"));
const windowHours = Number(env("OUTREACH_WINDOW_HOURS", "8"));
const maxBounceRate = Number(env("OUTREACH_MAX_BOUNCE_RATE", "0.02"));
const maxComplaintRate = Number(env("OUTREACH_MAX_COMPLAINT_RATE", "0.001"));
const layout = env("OUTREACH_LAYOUT", "plain") as Layout;
const siteUrl = env("OUTREACH_SITE_URL", "https://dispatched.finance");
const inboxIds = env("OUTREACH_INBOXES").split(",").map((s) => s.trim()).filter(Boolean);

const leads = readNdjson<Lead>(LEADS_FILE);
const stored = new Map<string, StoredState>();
for (const entry of readNdjson<StoredState>(STATE_FILE)) stored.set(entry.email, entry);

function save(entry: StoredState) {
  stored.set(entry.email, entry);
  mkdirSync(DIR, { recursive: true });
  appendFileSync(STATE_FILE, JSON.stringify(entry) + "\n");
}

/** Round-robin across inboxes so no inbox sends a burst. */
function interleave(plan: PlannedSend[]): PlannedSend[] {
  const queues = new Map<string, PlannedSend[]>();
  for (const item of plan) {
    const queue = queues.get(item.inboxId) ?? [];
    queue.push(item);
    queues.set(item.inboxId, queue);
  }
  const out: PlannedSend[] = [];
  for (let more = true; more; ) {
    more = false;
    for (const queue of queues.values()) {
      const item = queue.shift();
      if (item) {
        out.push(item);
        more = true;
      }
    }
  }
  return out;
}

const plan = interleave(planDay({ leads, state: stored, inboxIds, dailyCap, perInboxCap, now: new Date() }));

const summary: Record<string, number> = {};
for (const item of plan) {
  const key = `${item.lead.segment} step ${item.step}`;
  summary[key] = (summary[key] ?? 0) + 1;
}
console.log(`Leads: ${leads.length} | in sequence or finished: ${stored.size} | inboxes: ${inboxIds.length}`);
console.log(`Planned today: ${plan.length} (cap ${dailyCap}, ${perInboxCap} per inbox)`);
console.table(summary);

if (!live) {
  console.log("Dry run. Nothing was sent. Re-run with --live to send.");
  process.exit(0);
}

const senderName = env("OUTREACH_SENDER_NAME");
const secret = env("OUTREACH_UNSUBSCRIBE_SECRET");
const client = new AgentMailClient({ apiKey: env("AGENTMAIL_API_KEY"), maxRetries: 4 });

/** Stops the run when the rolling 24-hour bounce or complaint rate is over
    the limit. Mailbox providers act on these numbers before we would. */
async function assertHealthy() {
  const rates = await client.metrics.queryRates({ rateTypes: ["bounce", "complaint"], limit: 1, descending: true });
  const check = (name: "bounce" | "complaint", max: number) => {
    const point = rates[name]?.[0];
    // Too few sends make the rate meaningless.
    if (!point || point.rate === undefined || point.rate === null || point.sent < 100) return;
    if (point.rate > max) {
      throw new Error(`${name} rate ${(point.rate * 100).toFixed(2)}% over ${(max * 100).toFixed(2)}% limit (${point.sent} sent in window). Stopping.`);
    }
  };
  check("bounce", maxBounceRate);
  check("complaint", maxComplaintRate);
}

async function sendOne(item: PlannedSend, inboxAddress: string): Promise<void> {
  const { lead, step, inboxId } = item;
  const previous = stored.get(lead.email);
  const url = unsubscribeUrl(siteUrl, lead.email, secret);
  const email = renderEmail(lead, step, { siteUrl, senderName, unsubscribeUrl: url, layout });
  const headers = listUnsubscribeHeaders(url, inboxAddress);
  const options = { idempotencyKey: `outreach:${lead.dot}:${step}` };

  if (step > 1 && previous) {
    // Any reply ends the sequence; a person takes it from there.
    const thread = await client.inboxes.threads.get(inboxId, previous.threadId);
    if (thread.receivedTimestamp) {
      save({ ...previous, status: "replied" });
      return;
    }
    const sent = await client.inboxes.messages.reply(
      inboxId,
      previous.lastMessageId,
      { to: [lead.email], text: email.text, html: email.html, headers, labels: ["outreach", `step-${step}`] },
      options,
    );
    save({ ...previous, step, lastMessageId: sent.messageId, status: step >= SEQUENCE_LENGTH ? "done" : "active" });
    return;
  }

  const sent = await client.inboxes.messages.send(
    inboxId,
    { to: [lead.email], subject: email.subject, text: email.text, html: email.html, headers, labels: ["outreach", "step-1", lead.segment] },
    options,
  );
  save({
    email: lead.email,
    status: "active",
    step: 1,
    firstSentAt: new Date().toISOString(),
    inboxId,
    lastMessageId: sent.messageId,
    threadId: sent.threadId,
  });
}

async function main() {
  const addresses = new Map<string, string>();
  for (const id of inboxIds) addresses.set(id, (await client.inboxes.get(id)).email);

  await assertHealthy();
  const gapMs = Math.max(250, (windowHours * 3_600_000) / Math.max(plan.length, 1));
  let sent = 0;
  let consecutiveFailures = 0;

  for (const [i, item] of plan.entries()) {
    if (i > 0 && i % 500 === 0) await assertHealthy();
    try {
      await sendOne(item, addresses.get(item.inboxId) ?? item.inboxId);
      sent++;
      consecutiveFailures = 0;
    } catch (err) {
      const status = (err as { statusCode?: number }).statusCode;
      const note = err instanceof Error ? err.message.slice(0, 200) : String(err);
      const previous = stored.get(item.lead.email);
      // AgentMail refusing the recipient (block list, prior bounce or
      // complaint). Never retry those.
      if (err instanceof AgentMail.MessageRejectedError || status === 403) {
        save({
          email: item.lead.email,
          firstSentAt: previous?.firstSentAt ?? new Date().toISOString(),
          inboxId: item.inboxId,
          lastMessageId: previous?.lastMessageId ?? "",
          threadId: previous?.threadId ?? "",
          step: previous?.step ?? 0,
          status: "suppressed",
          note,
        });
      } else {
        console.error(`Send failed for DOT ${item.lead.dot} step ${item.step}: ${note}`);
        if (++consecutiveFailures >= 10) throw new Error("10 consecutive failures. Stopping.");
      }
    }
    // Jitter so sends are not evenly spaced.
    await sleep(gapMs * (0.5 + Math.random()));
  }
  console.log(`Sent ${sent} of ${plan.length} planned.`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
