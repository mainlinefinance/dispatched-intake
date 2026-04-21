import { describe, expect, it } from "vitest";
import { estimateMatch } from "@/lib/estimateMatch";
import type { IntakeContext } from "@/lib/types";

const base: IntakeContext = {
  useCase: "repairs",
  vertical: "owner-operator",
  amount: 50000,
  amountBand: "custom",
  revenueTier: 3,
  timeInBusinessTier: 4,
  creditBand: "720+",
  matchEstimate: null,
  contact: null,
  hasSeenMatch: false,
};

const withCtx = (overrides: Partial<IntakeContext>): IntakeContext => ({
  ...base,
  ...overrides,
});

describe("estimateMatch", () => {
  it("Tier A — owner-operator, strong revenue + 3+ years + 720 credit, $95K request", () => {
    const result = estimateMatch(
      withCtx({
        vertical: "owner-operator",
        revenueTier: 3,
        timeInBusinessTier: 4,
        creditBand: "720+",
        amount: 95000,
      })
    );
    expect(result).toEqual({
      lenderCount: 7,
      rangeLow: 61750,
      rangeHigh: 118750,
      aprLow: 14,
      aprHigh: 22,
      timingLow: 24,
      timingHigh: 48,
      tier: "A",
    });
  });

  it("Tier B — owner-operator, mid revenue + 6-12mo + mid credit, $50K request", () => {
    const result = estimateMatch(
      withCtx({
        vertical: "owner-operator",
        revenueTier: 2,
        timeInBusinessTier: 2,
        creditBand: "650-720",
        amount: 50000,
      })
    );
    expect(result).toMatchObject({
      lenderCount: 5,
      rangeLow: 32500,
      rangeHigh: 62500,
      aprLow: 22,
      aprHigh: 34,
      timingLow: 48,
      timingHigh: 72,
      tier: "B",
    });
  });

  it("Tier C — owner-operator, thin revenue, $20K request (hits Tier C max floor)", () => {
    const result = estimateMatch(
      withCtx({
        vertical: "owner-operator",
        revenueTier: 1,
        timeInBusinessTier: 2,
        creditBand: "650-720",
        amount: 20000,
      })
    );
    expect(result).toMatchObject({
      lenderCount: 3,
      rangeLow: 13000,
      rangeHigh: 25000,
      aprLow: 28,
      aprHigh: 45,
      timingLow: 48,
      timingHigh: 96,
      tier: "C",
    });
  });

  it("Tier A — small-fleet, vertical normalization (rev tier 3 maps to $250K-$500K band)", () => {
    const result = estimateMatch(
      withCtx({
        vertical: "small-fleet",
        revenueTier: 3,
        timeInBusinessTier: 3,
        creditBand: "650-720",
        amount: 200000,
      })
    );
    expect(result).toMatchObject({
      lenderCount: 7,
      rangeLow: 130000,
      rangeHigh: 250000,
      aprLow: 14,
      aprHigh: 22,
      tier: "A",
    });
  });

  it("Tier C — small-fleet, thin TIB (Under 1 year) fails 12mo cutoff", () => {
    const result = estimateMatch(
      withCtx({
        vertical: "small-fleet",
        revenueTier: 3,
        timeInBusinessTier: 1,
        creditBand: "650-720",
        amount: 60000,
      })
    );
    expect(result).toMatchObject({
      tier: "C",
      lenderCount: 3,
      rangeLow: 39000,
      rangeHigh: 75000,
    });
  });

  it("Tier A — contractor, amount above Tier A max clamps rangeHigh to $250K", () => {
    const result = estimateMatch(
      withCtx({
        vertical: "contractor",
        revenueTier: 3,
        timeInBusinessTier: 3,
        creditBand: "720+",
        amount: 300000,
      })
    );
    expect(result).toMatchObject({
      lenderCount: 7,
      rangeLow: 195000,
      rangeHigh: 250000,
      tier: "A",
    });
  });

  it("Tier B — contractor, rev tier 2 + tib tier 2, $100K", () => {
    const result = estimateMatch(
      withCtx({
        vertical: "contractor",
        revenueTier: 2,
        timeInBusinessTier: 2,
        creditBand: "580-650",
        amount: 100000,
      })
    );
    expect(result).toMatchObject({
      lenderCount: 5,
      rangeLow: 65000,
      rangeHigh: 125000,
      tier: "B",
    });
  });

  it("Tier C — contractor, thin revenue tier 1 (Under $25K)", () => {
    const result = estimateMatch(
      withCtx({
        vertical: "contractor",
        revenueTier: 1,
        timeInBusinessTier: 4,
        creditBand: "720+",
        amount: 40000,
      })
    );
    expect(result).toMatchObject({
      lenderCount: 3,
      rangeLow: 26000,
      rangeHigh: 50000,
      tier: "C",
    });
  });

  it("Credit modifier — <580 downgrades Tier A to Tier B", () => {
    const result = estimateMatch(
      withCtx({
        vertical: "owner-operator",
        revenueTier: 3,
        timeInBusinessTier: 4,
        creditBand: "under-580",
        amount: 80000,
      })
    );
    expect(result).toMatchObject({
      tier: "B",
      lenderCount: 5,
      rangeLow: 52000,
      rangeHigh: 100000,
      aprLow: 22,
      aprHigh: 34,
    });
  });

  it("Credit modifier — 'not-sure' is treated as 580-650 (no downgrade)", () => {
    const result = estimateMatch(
      withCtx({
        vertical: "owner-operator",
        revenueTier: 3,
        timeInBusinessTier: 4,
        creditBand: "not-sure",
        amount: 50000,
      })
    );
    expect(result.tier).toBe("A");
    expect(result.aprLow).toBe(14);
  });

  it("throws when required fields are missing", () => {
    expect(() =>
      estimateMatch(withCtx({ vertical: null }))
    ).toThrowError(/vertical/);
    expect(() =>
      estimateMatch(withCtx({ revenueTier: null }))
    ).toThrowError(/revenueTier/);
    expect(() =>
      estimateMatch(withCtx({ amount: null }))
    ).toThrowError(/amount/);
  });
});
