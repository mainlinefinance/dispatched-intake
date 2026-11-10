import { describe, expect, it } from "vitest";
import {
  asOfDay,
  classifyReply,
  daysBetween,
  localDay,
  matchReply,
  parseAddress,
  parseArgs,
  planActions,
  stepFromLabels,
  stepLabels,
  unsubscribeHeader,
  type PlanEntry,
  type PlanInput,
  type SentStep,
} from "@/scripts/agentmail-outreach";

const OPTS = {
  inboxes: ["a@try.com", "b@fund.com"],
  cap: 2,
  gaps: { 2: 3, 3: 5 },
  timeZone: "America/Chicago",
  allowWeekend: false,
};

function entry(n: number): PlanEntry {
  return {
    email: `c${n}@carrier.com`,
    dot: String(1000 + n),
    company: `Carrier ${n}`,
    tier: "ICP-1",
    steps: [1, 2, 3].map((step) => ({ step, subject: step === 1 ? "6 months of authority" : "Re: 6 months of authority", text: `step ${step} for c${n}` })),
  };
}

function sentSteps(inbox: string, ...steps: [number, string][]): Map<number, SentStep> {
  return new Map(steps.map(([step, at]) => [step, { step, inbox, messageId: `<m${step}@x>`, threadId: "t1", at }]));
}

const TUESDAY = { date: "2026-11-10", weekday: 2 };

function input(overrides: Partial<PlanInput> = {}): PlanInput {
  return {
    plan: [entry(1), entry(2), entry(3), entry(4), entry(5)],
    sent: new Map(),
    stopped: new Set(),
    pausedInboxes: new Set(),
    sentToday: new Map(),
    today: TUESDAY,
    ...overrides,
  };
}

describe("parseArgs", () => {
  it("requires a plan and inboxes, and defaults to a dry run at 5 per inbox", () => {
    expect(() => parseArgs([], "2026-11-10")).toThrow(/--plan/);
    expect(() => parseArgs(["--plan", "p.json"], "2026-11-10")).toThrow(/--inboxes/);
    const o = parseArgs(["--plan", "p.json", "--inboxes", "A@try.com, b@fund.com"], "2026-11-10");
    expect(o).toMatchObject({ inboxes: ["a@try.com", "b@fund.com"], cap: 5, send: false, campaign: "m6", gaps: { 2: 3, 3: 5 } });
    expect(o.report).toBe("outreach-data/agentmail-run-2026-11-10.json");
  });

  it("reads switches without values", () => {
    const o = parseArgs(["--plan", "p.json", "--send", "--inboxes", "a@try.com", "--allow-weekend"], "2026-11-10");
    expect(o).toMatchObject({ send: true, allowWeekend: true, inboxes: ["a@try.com"] });
  });
});

describe("helpers", () => {
  it("parses addresses with or without a display name", () => {
    expect(parseAddress("Kyle Towns <Kyle@Towns.com>")).toBe("kyle@towns.com");
    expect(parseAddress(" owner@x.com ")).toBe("owner@x.com");
    expect(parseAddress(undefined)).toBe("");
  });

  it("finds the local day and weekday in Chicago", () => {
    // 03:00 UTC on Wednesday is still Tuesday evening in Chicago.
    expect(localDay(new Date("2026-11-11T03:00:00Z"), "America/Chicago")).toEqual({ date: "2026-11-10", weekday: 2 });
    expect(localDay(new Date("2026-11-14T18:00:00Z"), "America/Chicago").weekday).toBe(6);
  });

  it("reads --as-of as a calendar day for tests", () => {
    expect(asOfDay("2026-11-13")).toEqual({ date: "2026-11-13", weekday: 5 });
    expect(() => parseArgs(["--plan", "p", "--inboxes", "a@b.com", "--as-of", "13/11/2026"], "2026-11-10")).toThrow(/--as-of/);
  });

  it("counts calendar days between dates", () => {
    expect(daysBetween("2026-11-10", "2026-11-13")).toBe(3);
    expect(daysBetween("2026-10-30", "2026-11-04")).toBe(5);
  });

  it("labels steps and reads them back", () => {
    expect(stepLabels("m6", 2, "4512345")).toEqual(["m6", "m6-step-2", "dot-4512345"]);
    expect(stepFromLabels(["sent", "m6", "m6-step-3"], "m6")).toBe(3);
    expect(stepFromLabels(["sent", "m6"], "m6")).toBeNull();
  });

  it("builds a mailto List-Unsubscribe header for the sending inbox", () => {
    expect(unsubscribeHeader("angelo@trydispatched.com")).toEqual({
      "List-Unsubscribe": "<mailto:angelo@trydispatched.com?subject=unsubscribe>",
    });
  });
});

describe("classifyReply", () => {
  it.each([
    ["Yes, send it over. We're thinking about adding a truck.", "", "yes"],
    ["sure", "", "yes"],
    ["Please stop emailing me", "", "stop"],
    ["Not interested, thanks", "", "stop"],
    ["", "unsubscribe", "stop"],
    ["Remove me from your list", "", "stop"],
    ["I am out of the office until Monday", "Automatic reply: 6 months", "auto"],
    ["We wait 45 days on our brokers, that's the problem", "", "factoring"],
    ["Who is this?", "", "other"],
  ])("%s / %s → %s", (text, subject, intent) => {
    expect(classifyReply(text, subject)).toBe(intent);
  });
});

describe("planActions", () => {
  it("sends nothing on weekends unless allowed", () => {
    const saturday = { date: "2026-11-14", weekday: 6 };
    expect(planActions(input({ today: saturday }), OPTS).actions).toEqual([]);
    expect(planActions(input({ today: saturday }), { ...OPTS, allowWeekend: true }).actions).toHaveLength(4);
  });

  it("fills each inbox up to its cap with new carriers, spreading them", () => {
    const { actions } = planActions(input(), OPTS);
    expect(actions.map((a) => [a.kind, a.email, a.inbox])).toEqual([
      ["new", "c1@carrier.com", "a@try.com"],
      ["new", "c2@carrier.com", "b@fund.com"],
      ["new", "c3@carrier.com", "a@try.com"],
      ["new", "c4@carrier.com", "b@fund.com"],
    ]);
  });

  it("counts today's earlier sends against the cap and skips paused inboxes", () => {
    const { actions, notes } = planActions(
      input({ sentToday: new Map([["a@try.com", 1]]), pausedInboxes: new Set(["b@fund.com"]) }),
      OPTS,
    );
    expect(actions.map((a) => a.inbox)).toEqual(["a@try.com"]);
    expect(notes.join(" ")).toMatch(/b@fund.com is paused/);
  });

  it("sends a due follow-up from the same inbox, as a reply to the last step, before new carriers", () => {
    const sent = new Map([["c1@carrier.com", sentSteps("b@fund.com", [1, "2026-11-06T15:00:00Z"])]]);
    const { actions } = planActions(input({ sent }), OPTS);
    expect(actions[0]).toMatchObject({ kind: "follow-up", email: "c1@carrier.com", inbox: "b@fund.com", step: 2, replyTo: "<m1@x>", text: "step 2 for c1" });
    expect(actions.filter((a) => a.kind === "new").map((a) => a.email)).not.toContain("c1@carrier.com");
  });

  it("waits until the gap has passed", () => {
    const sent = new Map([
      ["c1@carrier.com", sentSteps("a@try.com", [1, "2026-11-09T15:00:00Z"])], // 1 day ago, step 2 needs 3
      ["c2@carrier.com", sentSteps("a@try.com", [1, "2026-11-01T15:00:00Z"], [2, "2026-11-07T15:00:00Z"])], // step 3 needs 5
    ]);
    const result = planActions(input({ sent }), OPTS);
    expect(result.actions.filter((a) => a.kind === "follow-up")).toEqual([]);
    expect(result.waiting).toBe(2);
  });

  it("stops the sequence for carriers who replied or are blocked, and finishes after step 3", () => {
    const sent = new Map([
      ["c1@carrier.com", sentSteps("a@try.com", [1, "2026-11-01T15:00:00Z"])],
      ["c2@carrier.com", sentSteps("a@try.com", [1, "2026-10-20T15:00:00Z"], [2, "2026-10-23T15:00:00Z"], [3, "2026-10-28T15:00:00Z"])],
    ]);
    const result = planActions(input({ sent, stopped: new Set(["c1@carrier.com", "c5@carrier.com"]) }), OPTS);
    const emails = result.actions.map((a) => a.email);
    expect(emails).not.toContain("c1@carrier.com");
    expect(emails).not.toContain("c2@carrier.com");
    expect(emails).not.toContain("c5@carrier.com");
    expect(result.finished).toBe(2);
  });
});

describe("matchReply", () => {
  const sent = new Map([["c1@carrier.com", sentSteps("a@try.com", [1, "2026-11-10T15:00:00Z"])]]);
  const threads = new Map([["a@try.com#t1", "c1@carrier.com"]]);

  it("matches a reply in the campaign thread", () => {
    expect(matchReply({ thread_id: "t1", from: "x@y.com", timestamp: "2026-11-11T10:00:00Z" }, "a@try.com", threads, sent)).toBe("c1@carrier.com");
  });

  it("matches a new email from a campaign carrier, such as an unsubscribe", () => {
    expect(matchReply({ thread_id: "t9", from: "Kyle <C1@carrier.com>", timestamp: "2026-11-11T10:00:00Z" }, "a@try.com", threads, sent)).toBe("c1@carrier.com");
  });

  it("ignores mail that arrived before the carrier's first campaign email", () => {
    expect(matchReply({ thread_id: "t9", from: "c1@carrier.com", timestamp: "2026-11-09T10:00:00Z" }, "a@try.com", threads, sent)).toBeNull();
  });

  it("ignores everyone else", () => {
    expect(matchReply({ thread_id: "t9", from: "someone@else.com", timestamp: "2026-11-11T10:00:00Z" }, "a@try.com", threads, sent)).toBeNull();
  });
});
