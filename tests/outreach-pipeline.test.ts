import { describe, expect, it } from "vitest";

import { displayCase, normalizeRow, parseCensusDate } from "@/lib/outreach/fmcsa";
import { planDay, type LeadState } from "@/lib/outreach/schedule";
import type { Lead } from "@/lib/outreach/types";

const NOW = new Date("2026-11-10T15:00:00Z");

const ROW = {
  dot_number: "1234567",
  legal_name: "JOHN SMITH TRUCKING LLC",
  dba_name: "",
  email_address: "John@SmithTrucking.com",
  phy_state: "tx",
  phy_country: "US",
  nbr_power_unit: "1",
  add_date: "20190315",
};

describe("normalizeRow", () => {
  it("normalizes a census row into an owner-operator lead", () => {
    expect(normalizeRow(ROW, NOW)).toEqual({
      ok: true,
      lead: {
        dot: "1234567",
        email: "john@smithtrucking.com",
        company: "John Smith Trucking LLC",
        state: "TX",
        powerUnits: 1,
        addDate: "2019-03-15",
        segment: "owner-operator",
      },
    });
  });

  it("segments by fleet size and authority age", () => {
    const segment = (patch: Partial<typeof ROW>) => {
      const result = normalizeRow({ ...ROW, ...patch }, NOW);
      return result.ok ? result.lead.segment : result.reason;
    };
    expect(segment({ nbr_power_unit: "4" })).toBe("small-fleet");
    expect(segment({ add_date: "20260601" })).toBe("new-authority");
    expect(segment({ add_date: "20260601", nbr_power_unit: "4" })).toBe("new-authority");
    expect(segment({ add_date: "20251109" })).toBe("owner-operator");
  });

  it("reads the alternate column names", () => {
    const result = normalizeRow(
      { usdot: "77", legal_name: "A", dba_name: "ACME HAULING", email: "a@b.co", state: "OH", power_units: "3" },
      NOW,
    );
    expect(result.ok && result.lead.company).toBe("Acme Hauling");
  });

  it.each([
    [{ email_address: "" }, "no-email"],
    [{ email_address: "not-an-email" }, "bad-email"],
    [{ email_address: "noreply@carrier.com" }, "role-or-blocked-domain"],
    [{ email_address: "fleet@county.gov" }, "role-or-blocked-domain"],
    [{ phy_state: "ON", phy_country: "CA" }, "not-us"],
    [{ phy_country: "MX" }, "not-us"],
    [{ dot_number: "" }, "no-dot"],
    [{ legal_name: "" }, "no-name"],
    [{ nbr_power_unit: "0" }, "units-out-of-range"],
    [{ nbr_power_unit: "11" }, "units-out-of-range"],
    [{ nbr_power_unit: "" }, "units-out-of-range"],
  ])("skips %j as %s", (patch, reason) => {
    expect(normalizeRow({ ...ROW, ...patch }, NOW)).toEqual({ ok: false, reason });
  });
});

describe("census helpers", () => {
  it("parses the date formats the census uses", () => {
    expect(parseCensusDate("20240131")).toBe("2024-01-31");
    expect(parseCensusDate("2024-01-31T00:00:00.000")).toBe("2024-01-31");
    expect(parseCensusDate("1/31/2024")).toBe("2024-01-31");
    expect(parseCensusDate("31-JAN-24")).toBe("2024-01-31");
    expect(parseCensusDate("05-MAR-98")).toBe("1998-03-05");
    expect(parseCensusDate("soon")).toBeUndefined();
  });

  it("display-cases shouting names but keeps entity suffixes", () => {
    expect(displayCase("  A&B  EXPRESS,  INC. ")).toBe("A&B Express, INC.");
    expect(displayCase("O'BRIEN & SONS")).toBe("O'Brien & Sons");
    expect(displayCase("McAllen Freight llc")).toBe("McAllen Freight LLC");
    expect(displayCase("I40 TRANSPORT")).toBe("I40 Transport");
  });
});

describe("planDay", () => {
  const lead = (n: number): Lead => ({
    dot: String(n),
    email: `l${n}@example.com`,
    company: `Carrier ${n}`,
    state: "TX",
    powerUnits: 1,
    segment: "owner-operator",
  });
  const leads = [1, 2, 3, 4, 5, 6].map(lead);
  const sentDaysAgo = (days: number, patch: Partial<LeadState> = {}): LeadState => ({
    status: "active",
    step: 1,
    firstSentAt: new Date(NOW.getTime() - days * 86_400_000).toISOString(),
    inboxId: "a",
    lastMessageId: "m",
    ...patch,
  });
  const base = { leads, inboxIds: ["a", "b"], dailyCap: 100, perInboxCap: 100, now: NOW };

  it("sends due follow-ups from the thread's inbox, then new leads", () => {
    const state = new Map<string, LeadState>([
      ["l1@example.com", sentDaysAgo(3)], // step 2 due
      ["l2@example.com", sentDaysAgo(2)], // step 2 not due yet
      ["l3@example.com", sentDaysAgo(14, { step: 3 })], // step 4 due
      ["l4@example.com", sentDaysAgo(30, { status: "replied" })],
    ]);
    const plan = planDay({ ...base, state });
    expect(plan.map((p) => [p.lead.dot, p.step, p.inboxId])).toEqual([
      ["1", 2, "a"],
      ["3", 4, "a"],
      ["5", 1, "b"],
      ["6", 1, "b"],
    ]);
  });

  it("never contacts suppressed, replied or finished leads again", () => {
    const state = new Map<string, LeadState>(
      (["suppressed", "replied", "done"] as const).map((status, i) => [
        `l${i + 1}@example.com`,
        sentDaysAgo(60, { status, step: status === "done" ? 4 : 1 }),
      ]),
    );
    const plan = planDay({ ...base, state });
    expect(plan.map((p) => p.lead.dot)).toEqual(["4", "5", "6"]);
  });

  it("respects the daily cap and the per-inbox cap", () => {
    const empty = new Map<string, LeadState>();
    expect(planDay({ ...base, state: empty, dailyCap: 3 })).toHaveLength(3);
    const capped = planDay({ ...base, state: empty, perInboxCap: 2 });
    expect(capped).toHaveLength(4);
    expect(capped.filter((p) => p.inboxId === "a")).toHaveLength(2);
  });

  it("holds a follow-up back when its inbox is full rather than moving it", () => {
    const state = new Map<string, LeadState>([
      ["l1@example.com", sentDaysAgo(3)],
      ["l2@example.com", sentDaysAgo(3)],
    ]);
    const plan = planDay({ ...base, state, perInboxCap: 1 });
    expect(plan.filter((p) => p.step === 2)).toHaveLength(1);
    expect(plan.every((p) => p.step === 1 || p.inboxId === "a")).toBe(true);
  });
});
