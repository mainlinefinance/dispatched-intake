import { KITS, SEQUENCE_LENGTH } from "./kits.ts";
import type { Lead } from "./types.ts";

/* Pure planning for one sending day: which follow-ups are due, how many
   new leads fit, and which inbox carries each message. No I/O. */

export type LeadStatus = "active" | "done" | "replied" | "suppressed";

export type LeadState = {
  status: LeadStatus;
  /** Last step sent. */
  step: number;
  /** ISO timestamp of step 1. Follow-up offsets count from here. */
  firstSentAt: string;
  /** Inbox that owns the thread; follow-ups must reuse it. */
  inboxId: string;
  /** Message to reply to so the follow-up lands in the same thread. */
  lastMessageId: string;
};

export type PlannedSend = { lead: Lead; step: number; inboxId: string };

export type PlanInput = {
  leads: Lead[];
  state: Map<string, LeadState>;
  inboxIds: string[];
  dailyCap: number;
  perInboxCap: number;
  now: Date;
};

const DAY_MS = 86_400_000;

export function nextDueStep(lead: Lead, state: LeadState, now: Date): number | null {
  if (state.status !== "active" || state.step >= SEQUENCE_LENGTH) return null;
  const next = KITS[lead.segment].steps[state.step];
  const dueAt = new Date(state.firstSentAt).getTime() + next.dayOffset * DAY_MS;
  // One hour of slack so a daily cron that starts a little early still
  // picks up the step.
  return now.getTime() + 3_600_000 >= dueAt ? next.step : null;
}

export function planDay(input: PlanInput): PlannedSend[] {
  const { leads, state, inboxIds, dailyCap, perInboxCap, now } = input;
  const used = new Map<string, number>(inboxIds.map((id) => [id, 0]));
  const plan: PlannedSend[] = [];

  const take = (inboxId: string): boolean => {
    const count = used.get(inboxId);
    if (count === undefined || count >= perInboxCap || plan.length >= dailyCap) return false;
    used.set(inboxId, count + 1);
    return true;
  };

  // Follow-ups first: a started sequence is worth more than a new one,
  // and they are pinned to the inbox that owns the thread.
  for (const lead of leads) {
    const current = state.get(lead.email);
    if (!current) continue;
    const step = nextDueStep(lead, current, now);
    if (step !== null && take(current.inboxId)) {
      plan.push({ lead, step, inboxId: current.inboxId });
    }
  }

  // New leads fill the remaining capacity, least-loaded inbox first.
  for (const lead of leads) {
    if (plan.length >= dailyCap) break;
    if (state.has(lead.email)) continue;
    let best: string | null = null;
    for (const id of inboxIds) {
      const count = used.get(id) ?? 0;
      if (count < perInboxCap && (best === null || count < (used.get(best) ?? 0))) best = id;
    }
    if (best === null) break;
    take(best);
    plan.push({ lead, step: 1, inboxId: best });
  }

  return plan;
}
