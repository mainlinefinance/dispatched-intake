#!/usr/bin/env node
/**
 * AgentMail outreach runner for the six-month carrier sequence.
 *
 * AgentMail is an inbox API, not a sequencer, and its terms (section 8(h))
 * prohibit unsolicited email; see docs/outreach/agentmail-sending.md for the
 * risk the account owner accepted. This runner adds the sequencer duties that
 * AgentMail leaves to the sender, and keeps volume low:
 *
 *   - State lives in AgentMail itself (labels on sent messages), so a run in a
 *     fresh container picks up where the last one stopped. Nothing is stored
 *     locally except an optional run report.
 *   - Any reply stops the sequence for that carrier, except an out-of-office.
 *     "Stop" and "not interested" replies also go on the organization's send
 *     block list.
 *   - An inbox with a spam complaint, or a bounce rate over the limit, is
 *     paused for the run.
 *   - Due follow-ups go first, then new carriers, up to --cap sends per inbox
 *     per day (America/Chicago), weekdays only.
 *   - Every email carries a List-Unsubscribe header (AgentMail does not add
 *     one on custom domains) next to the opt-out line in the footer.
 *   - Without --send it only reports what it would do.
 *
 * Usage:
 *   npm run outreach:agentmail -- --plan outreach-data/send-plan.json \
 *     --inboxes angelo@trydispatched.com,angelo@dispatchedfunding.com
 *   npm run outreach:agentmail -- --plan … --inboxes … --send
 *
 * Auth: AGENTMAIL_API_KEY from the environment, or a network proxy that
 * injects it (cloud sessions).
 */

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";

// ---------------------------------------------------------------------------
// Types and options
// ---------------------------------------------------------------------------

export interface PlanEntry {
  email: string;
  dot: string;
  company: string;
  tier: string;
  steps: { step: number; subject: string; text: string }[];
}

export interface SentStep {
  step: number;
  inbox: string;
  messageId: string;
  threadId: string;
  /** ISO timestamp */
  at: string;
}

export type Intent = "stop" | "yes" | "factoring" | "auto" | "other";

export interface RunOptions {
  plan: string;
  inboxes: string[];
  campaign: string;
  /** Sends (new + follow-ups) per inbox per local day. */
  cap: number;
  /** Days to wait before step 2 (after step 1) and step 3 (after step 2). */
  gaps: Record<number, number>;
  timeZone: string;
  allowWeekend: boolean;
  maxBounceRate: number;
  maxComplaints: number;
  spacingSeconds: number;
  send: boolean;
  report: string;
  /** Testing only: pretend today is this local date (YYYY-MM-DD). */
  asOf: string | null;
}

function readFlags(argv: string[]): Map<string, string> {
  const flags = new Map<string, string>();
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (!arg.startsWith("--")) continue;
    const eq = arg.indexOf("=");
    if (eq !== -1) flags.set(arg.slice(2, eq), arg.slice(eq + 1));
    else if (argv[i + 1] === undefined || argv[i + 1].startsWith("--")) flags.set(arg.slice(2), "");
    else {
      flags.set(arg.slice(2), argv[i + 1]);
      i++;
    }
  }
  return flags;
}

export function parseArgs(argv: string[], today: string): RunOptions {
  const f = readFlags(argv);
  const plan = f.get("plan");
  if (!plan) throw new Error("--plan <send-plan.json> is required (npm run outreach:render -- --send-plan …)");
  const inboxes = (f.get("inboxes") ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  if (inboxes.length === 0) throw new Error("--inboxes a@x.com,b@y.com is required");
  const num = (name: string, fallback: number, min = 0) => {
    const raw = f.get(name);
    if (raw === undefined || raw === "") return fallback;
    const n = Number(raw);
    if (!Number.isFinite(n) || n < min) throw new Error(`--${name} must be a number ≥ ${min}`);
    return n;
  };
  return {
    plan,
    inboxes,
    campaign: f.get("campaign") || "m6",
    cap: num("cap", 5, 1),
    gaps: { 2: num("gap2", 3, 1), 3: num("gap3", 5, 1) },
    timeZone: f.get("tz") || "America/Chicago",
    allowWeekend: f.has("allow-weekend"),
    maxBounceRate: num("max-bounce-rate", 0.03),
    maxComplaints: num("max-complaints", 1, 1),
    spacingSeconds: num("spacing", 8),
    send: f.has("send"),
    report: f.get("report") || `outreach-data/agentmail-run-${today}.json`,
    asOf: parseAsOf(f.get("as-of")),
  };
}

function parseAsOf(raw: string | undefined): string | null {
  if (raw === undefined || raw === "") return null;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(raw)) throw new Error("--as-of must be YYYY-MM-DD");
  return raw;
}

/** Local day for --as-of: the date as given, its weekday by the calendar. */
export function asOfDay(date: string): { date: string; weekday: number } {
  return { date, weekday: new Date(`${date}T12:00:00Z`).getUTCDay() };
}

// ---------------------------------------------------------------------------
// Pure helpers
// ---------------------------------------------------------------------------

/** "Kyle <kyle@x.com>" → "kyle@x.com". */
export function parseAddress(raw: string | undefined): string {
  const s = (raw ?? "").trim();
  const m = /<([^>]+)>/.exec(s);
  return (m ? m[1] : s).trim().toLowerCase();
}

/** YYYY-MM-DD and weekday (0 = Sunday) of an instant in a time zone. */
export function localDay(instant: Date, timeZone: string): { date: string; weekday: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  }).formatToParts(instant);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { date: `${get("year")}-${get("month")}-${get("day")}`, weekday };
}

export function daysBetween(fromDate: string, toDate: string): number {
  return Math.round((Date.parse(`${toDate}T00:00:00Z`) - Date.parse(`${fromDate}T00:00:00Z`)) / 86_400_000);
}

const AUTO = /\b(out of (the )?office|automatic reply|auto-?reply|on vacation|away from (the )?office)\b/i;
const STOP =
  /\b(stop|unsubscribe|remove (me|us)|take (me|us) off|opt[ -]?out|do not (contact|email)|don'?t (contact|email)|not interested|no,? thanks|no thank you)\b/i;
const YES = /\b(yes|yeah|yep|sure|send it|interested|please send|go ahead|ok(ay)?)\b/i;
const FACTORING = /\b(brokers?|factoring|invoices?)\b/i;

/** Intent of a reply, from its new text (extracted_text) and subject. */
export function classifyReply(text: string, subject = ""): Intent {
  if (AUTO.test(text) || AUTO.test(subject)) return "auto";
  if (STOP.test(text) || /unsubscribe/i.test(subject)) return "stop";
  if (YES.test(text)) return "yes";
  if (FACTORING.test(text)) return "factoring";
  return "other";
}

export type Action =
  | { kind: "new"; email: string; dot: string; inbox: string; step: 1; subject: string; text: string }
  | { kind: "follow-up"; email: string; dot: string; inbox: string; step: number; replyTo: string; text: string };

export interface PlanInput {
  plan: PlanEntry[];
  /** email → step → what was sent */
  sent: Map<string, Map<number, SentStep>>;
  /** Carriers who replied (not out-of-office), are blocked, or were rejected. */
  stopped: Set<string>;
  pausedInboxes: Set<string>;
  /** Sends already made today, per inbox. */
  sentToday: Map<string, number>;
  today: { date: string; weekday: number };
}

export interface PlanResult {
  actions: Action[];
  notes: string[];
  waiting: number;
  finished: number;
}

/** What this run should send. Follow-ups first, then new carriers, within each inbox's daily cap. */
export function planActions(input: PlanInput, opts: Pick<RunOptions, "inboxes" | "cap" | "gaps" | "timeZone" | "allowWeekend">): PlanResult {
  const notes: string[] = [];
  const result: PlanResult = { actions: [], notes, waiting: 0, finished: 0 };
  const isWeekend = input.today.weekday === 0 || input.today.weekday === 6;
  if (isWeekend && !opts.allowWeekend) {
    notes.push("weekend: nothing is sent on Saturday or Sunday");
    return result;
  }

  const capacity = new Map<string, number>();
  for (const inbox of opts.inboxes) {
    const left = input.pausedInboxes.has(inbox) ? 0 : Math.max(0, opts.cap - (input.sentToday.get(inbox) ?? 0));
    capacity.set(inbox, left);
  }

  // Follow-ups, oldest first.
  for (const entry of input.plan) {
    const steps = input.sent.get(entry.email);
    if (!steps || steps.size === 0) continue;
    const last = Math.max(...steps.keys());
    if (last >= entry.steps.length || input.stopped.has(entry.email)) {
      result.finished++;
      continue;
    }
    const previous = steps.get(last)!;
    const nextStep = last + 1;
    const due = daysBetween(localDay(new Date(previous.at), opts.timeZone).date, input.today.date) >= (opts.gaps[nextStep] ?? 3);
    if (!due) {
      result.waiting++;
      continue;
    }
    const inbox = previous.inbox;
    if ((capacity.get(inbox) ?? 0) <= 0) {
      result.waiting++;
      continue;
    }
    const content = entry.steps.find((s) => s.step === nextStep);
    if (!content) continue;
    result.actions.push({ kind: "follow-up", email: entry.email, dot: entry.dot, inbox, step: nextStep, replyTo: previous.messageId, text: content.text });
    capacity.set(inbox, (capacity.get(inbox) ?? 0) - 1);
  }

  // New carriers, into whichever inbox has the most room left.
  for (const entry of input.plan) {
    if (input.sent.has(entry.email) || input.stopped.has(entry.email)) continue;
    const open = opts.inboxes.filter((i) => (capacity.get(i) ?? 0) > 0);
    if (open.length === 0) break;
    const inbox = open.reduce((best, i) => ((capacity.get(i) ?? 0) > (capacity.get(best) ?? 0) ? i : best), open[0]);
    const first = entry.steps.find((s) => s.step === 1);
    if (!first) continue;
    result.actions.push({ kind: "new", email: entry.email, dot: entry.dot, inbox, step: 1, subject: first.subject, text: first.text });
    capacity.set(inbox, (capacity.get(inbox) ?? 0) - 1);
  }

  for (const p of input.pausedInboxes) notes.push(`${p} is paused (spam complaint or bounce rate over the limit)`);
  return result;
}

/**
 * Which campaign carrier a received message is a reply from, or null.
 * It matches by thread first, then by sender (a carrier may write a new
 * email, e.g. an unsubscribe through the List-Unsubscribe mailto). Only mail
 * received after that carrier's first campaign email counts: anything older
 * is not a reply to the campaign.
 */
export function matchReply(
  message: { thread_id: string; from?: string; timestamp: string },
  inbox: string,
  threadToEmail: Map<string, string>,
  sent: Map<string, Map<number, SentStep>>,
): string | null {
  const from = parseAddress(message.from);
  const email = threadToEmail.get(`${inbox}#${message.thread_id}`) ?? (sent.has(from) ? from : null);
  if (!email) return null;
  const firstAt = sent.get(email)?.get(1)?.at;
  if (!firstAt || Date.parse(message.timestamp) < Date.parse(firstAt)) return null;
  return email;
}

export function unsubscribeHeader(inbox: string): Record<string, string> {
  return { "List-Unsubscribe": `<mailto:${inbox}?subject=unsubscribe>` };
}

export function stepLabels(campaign: string, step: number, dot: string): string[] {
  return [campaign, `${campaign}-step-${step}`, ...(dot ? [`dot-${dot}`] : [])];
}

/** Step number from a sent message's labels, e.g. "m6-step-2" → 2. */
export function stepFromLabels(labels: string[], campaign: string): number | null {
  for (const l of labels) {
    const m = new RegExp(`^${campaign}-step-(\\d+)$`).exec(l);
    if (m) return Number(m[1]);
  }
  return null;
}

// ---------------------------------------------------------------------------
// AgentMail client
// ---------------------------------------------------------------------------

const API = process.env.AGENTMAIL_API_BASE || "https://api.agentmail.to/v0";
const enc = encodeURIComponent;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Explicit fields: Node's type stripping cannot run TypeScript parameter properties.
class ApiError extends Error {
  status: number;
  code: string;
  constructor(message: string, status: number, code: string) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

async function api<T = Record<string, unknown>>(method: string, path: string, body?: unknown): Promise<T> {
  const headers = {
    Authorization: `Bearer ${process.env.AGENTMAIL_API_KEY || "proxy-injected"}`,
    "Content-Type": "application/json",
  };
  for (let attempt = 1; ; attempt++) {
    const res = await fetch(API + path, { method, headers, body: body === undefined ? undefined : JSON.stringify(body) });
    const text = await res.text();
    if (res.ok) return (text ? JSON.parse(text) : {}) as T;
    if ((res.status === 429 || res.status >= 500) && attempt < 4) {
      await sleep(1000 * Number(res.headers.get("retry-after") || 2 ** attempt));
      continue;
    }
    let code = "";
    try {
      code = (JSON.parse(text) as { code?: string }).code ?? "";
    } catch {
      /* not JSON */
    }
    throw new ApiError(`${method} ${path} → ${res.status} ${text.slice(0, 300)}`, res.status, code);
  }
}

interface ApiMessage {
  message_id: string;
  thread_id: string;
  labels?: string[];
  timestamp: string;
  from?: string;
  to?: string[] | string;
  subject?: string;
  text?: string;
  extracted_text?: string;
}

async function listMessages(inbox: string, labels: string[]): Promise<ApiMessage[]> {
  const out: ApiMessage[] = [];
  let token = "";
  do {
    const qs = new URLSearchParams({ limit: "100" });
    for (const l of labels) qs.append("labels", l);
    if (token) qs.set("page_token", token);
    const page = await api<{ messages?: ApiMessage[]; next_page_token?: string }>("GET", `/inboxes/${enc(inbox)}/messages?${qs}`);
    out.push(...(page.messages ?? []));
    token = page.next_page_token ?? "";
  } while (token);
  return out;
}

async function inboxMetrics(inbox: string): Promise<{ sent: number; bounced: number; complained: number; rejected: number }> {
  const m = await api<Record<string, { count: number }[]>>("GET", `/inboxes/${enc(inbox)}/metrics`);
  const total = (k: string) => (m[k] ?? []).reduce((sum, x) => sum + (x.count ?? 0), 0);
  return { sent: total("message.sent"), bounced: total("message.bounced"), complained: total("message.complained"), rejected: total("message.rejected") };
}

async function sendBlockList(): Promise<Set<string>> {
  const out = new Set<string>();
  let token = "";
  do {
    const qs = new URLSearchParams({ limit: "100" });
    if (token) qs.set("page_token", token);
    const page = await api<{ entries?: { entry: string }[]; next_page_token?: string }>("GET", `/lists/send/block?${qs}`);
    for (const e of page.entries ?? []) out.add(e.entry.toLowerCase());
    token = page.next_page_token ?? "";
  } while (token);
  return out;
}

// ---------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------

async function main() {
  const now = new Date();
  const opts = parseArgs(process.argv.slice(2), now.toISOString().slice(0, 10));
  const today = opts.asOf ? asOfDay(opts.asOf) : localDay(now, opts.timeZone);
  const log = (msg: string) => process.stderr.write(`[agentmail] ${msg}\n`);
  const plan = JSON.parse(readFileSync(resolve(opts.plan), "utf8")) as PlanEntry[];
  const planEmails = new Set(plan.map((p) => p.email));
  log(`${opts.send ? "SEND" : "DRY RUN"} · ${today.date}${opts.asOf ? " (simulated with --as-of)" : ""} (${opts.timeZone}) · ${plan.length} carriers in plan · inboxes: ${opts.inboxes.join(", ")}`);

  // 1. What was already sent, from campaign labels.
  const sent = new Map<string, Map<number, SentStep>>();
  const sentToday = new Map<string, number>();
  const threadToEmail = new Map<string, string>();
  for (const inbox of opts.inboxes) {
    for (const m of await listMessages(inbox, [opts.campaign])) {
      if (!(m.labels ?? []).includes("sent")) continue;
      const step = stepFromLabels(m.labels ?? [], opts.campaign);
      const to = parseAddress(Array.isArray(m.to) ? m.to[0] : m.to);
      if (!step || !to) continue;
      if (!sent.has(to)) sent.set(to, new Map());
      sent.get(to)!.set(step, { step, inbox, messageId: m.message_id, threadId: m.thread_id, at: m.timestamp });
      threadToEmail.set(`${inbox}#${m.thread_id}`, to);
      if (localDay(new Date(m.timestamp), opts.timeZone).date === today.date) sentToday.set(inbox, (sentToday.get(inbox) ?? 0) + 1);
    }
  }

  // 2. Replies: stop the sequence, label them, block opt-outs.
  const blocked = await sendBlockList();
  const stopped = new Set<string>([...blocked].filter((e) => e.includes("@")));
  const replies: { email: string; intent: Intent; inbox: string; text: string; at: string; isNew: boolean }[] = [];
  for (const inbox of opts.inboxes) {
    for (const m of await listMessages(inbox, ["received"])) {
      const email = matchReply(m, inbox, threadToEmail, sent);
      if (!email) continue;
      const labels = m.labels ?? [];
      let intent = (labels.find((l) => l.startsWith("intent-"))?.slice(7) as Intent | undefined) ?? null;
      let text = "";
      const isNew = !labels.includes(`${opts.campaign}-reply`);
      if (isNew) {
        const full = await api<ApiMessage>("GET", `/inboxes/${enc(inbox)}/messages/${enc(m.message_id)}`);
        text = (full.extracted_text || full.text || "").trim();
        intent = classifyReply(text, full.subject ?? "");
        if (opts.send) {
          await api("PATCH", `/inboxes/${enc(inbox)}/messages/${enc(m.message_id)}`, { add_labels: [`${opts.campaign}-reply`, `intent-${intent}`] });
          if (intent === "stop" && !blocked.has(email)) {
            try {
              await api("POST", "/lists/send/block", { entry: email, reason: "opted out by reply" });
            } catch (err) {
              if (!(err instanceof ApiError && err.status === 409)) throw err;
            }
            blocked.add(email);
          }
        }
      }
      if (intent && intent !== "auto") stopped.add(email);
      replies.push({ email, intent: intent ?? "other", inbox, text, at: m.timestamp, isNew });
    }
  }

  // 3. Inbox health.
  const pausedInboxes = new Set<string>();
  const health: Record<string, unknown> = {};
  for (const inbox of opts.inboxes) {
    const h = await inboxMetrics(inbox);
    const bounceRate = h.sent > 0 ? h.bounced / h.sent : 0;
    const paused = h.complained >= opts.maxComplaints || (h.sent >= 20 && bounceRate > opts.maxBounceRate);
    if (paused) pausedInboxes.add(inbox);
    health[inbox] = { ...h, bounceRate: Number(bounceRate.toFixed(4)), paused, sentToday: sentToday.get(inbox) ?? 0 };
  }

  // 4. Plan and (maybe) send.
  const result = planActions({ plan, sent, stopped, pausedInboxes, sentToday, today }, opts);
  const done: { kind: string; email: string; inbox: string; step: number; status: string }[] = [];
  for (const a of result.actions) {
    if (!planEmails.has(a.email)) continue;
    if (!opts.send) {
      done.push({ kind: a.kind, email: a.email, inbox: a.inbox, step: a.step, status: "would send" });
      continue;
    }
    const body = {
      to: a.email,
      text: a.text,
      labels: stepLabels(opts.campaign, a.step, a.dot),
      headers: unsubscribeHeader(a.inbox),
      ...(a.kind === "new" ? { subject: a.subject } : {}),
    };
    const path =
      a.kind === "new"
        ? `/inboxes/${enc(a.inbox)}/messages/send`
        : `/inboxes/${enc(a.inbox)}/messages/${enc(a.replyTo)}/reply`;
    try {
      await api("POST", path, body);
      done.push({ kind: a.kind, email: a.email, inbox: a.inbox, step: a.step, status: "sent" });
    } catch (err) {
      if (err instanceof ApiError && err.status === 403) {
        // Rejected: blocked, bounced or complained before. Never retried.
        done.push({ kind: a.kind, email: a.email, inbox: a.inbox, step: a.step, status: `rejected (${err.code || 403})` });
      } else {
        throw err;
      }
    }
    await sleep(opts.spacingSeconds * 1000);
  }

  // 5. Report.
  const counts = (pred: (d: (typeof done)[number]) => boolean) => done.filter(pred).length;
  const intents = replies.reduce<Record<string, number>>((acc, r) => ((acc[r.intent] = (acc[r.intent] ?? 0) + 1), acc), {});
  for (const [inbox, h] of Object.entries(health)) log(`${inbox}: ${JSON.stringify(h)}`);
  log(`replies: ${replies.length} (${Object.entries(intents).map(([k, v]) => `${k} ${v}`).join(", ") || "none"}), ${replies.filter((r) => r.isNew).length} new this run`);
  log(`this run: ${counts((d) => d.kind === "new")} new, ${counts((d) => d.kind === "follow-up")} follow-ups, ${counts((d) => d.status.startsWith("rejected"))} rejected · waiting on a follow-up date: ${result.waiting} · finished or stopped: ${result.finished}`);
  for (const n of result.notes) log(n);
  for (const r of replies.filter((x) => x.isNew)) log(`  new reply [${r.intent}] ${r.email}: ${r.text.replace(/\s+/g, " ").slice(0, 140)}`);

  const reportPath = resolve(opts.report);
  mkdirSync(dirname(reportPath), { recursive: true });
  writeFileSync(reportPath, JSON.stringify({ at: now.toISOString(), mode: opts.send ? "send" : "dry-run", today, health, replies, actions: done, notes: result.notes }, null, 2) + "\n");
  log(`report: ${reportPath}`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((err) => {
    process.stderr.write(`[agentmail] failed: ${err instanceof Error ? err.message : String(err)}\n`);
    process.exit(1);
  });
}
