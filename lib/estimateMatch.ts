import type {
  BandTier,
  CreditBand,
  IntakeContext,
  MatchResult,
  MatchTier,
  Vertical,
} from "./types";

/* TIB tier thresholds are vertical-dependent because the copy bands
   have different granularity. Owner-op / other-trade split at 6mo and
   12mo; fleet / contractor's bottom band is already "Under 1 year"
   so both cutoffs collapse onto tier 2+. */
const TIB_12_MONTH_TIER: Record<Vertical, BandTier> = {
  "owner-operator": 3,
  "small-fleet": 2,
  contractor: 2,
  "other-trade": 3,
};

const TIB_6_MONTH_TIER: Record<Vertical, BandTier> = {
  "owner-operator": 2,
  "small-fleet": 2,
  contractor: 2,
  "other-trade": 2,
};

type TierSpec = {
  lenderCount: number;
  aprLow: number;
  aprHigh: number;
  timingLow: number;
  timingHigh: number;
  dollarMin: number;
  dollarMax: number;
};

const TIER_SPECS: Record<MatchTier, TierSpec> = {
  A: {
    lenderCount: 7,
    aprLow: 14,
    aprHigh: 22,
    timingLow: 24,
    timingHigh: 48,
    dollarMin: 25000,
    dollarMax: 250000,
  },
  B: {
    lenderCount: 5,
    aprLow: 22,
    aprHigh: 34,
    timingLow: 48,
    timingHigh: 72,
    dollarMin: 15000,
    dollarMax: 150000,
  },
  C: {
    lenderCount: 3,
    aprLow: 28,
    aprHigh: 45,
    timingLow: 48,
    timingHigh: 96,
    dollarMin: 10000,
    dollarMax: 75000,
  },
};

function classifyBaseTier(
  vertical: Vertical,
  revTier: BandTier,
  tibTier: BandTier
): MatchTier {
  const twelve = TIB_12_MONTH_TIER[vertical];
  const six = TIB_6_MONTH_TIER[vertical];

  if (revTier >= 3 && tibTier >= twelve) return "A";
  if (revTier >= 2 && tibTier >= six) return "B";
  return "C";
}

function applyCreditModifier(
  tier: MatchTier,
  credit: CreditBand
): MatchTier {
  if (credit === "under-580") {
    if (tier === "A") return "B";
    if (tier === "B") return "C";
    return "C";
  }
  return tier;
}

function clamp(n: number, min: number, max: number): number {
  return Math.min(Math.max(n, min), max);
}

export function estimateMatch(ctx: IntakeContext): MatchResult {
  if (!ctx.vertical) throw new Error("estimateMatch requires vertical");
  if (ctx.revenueTier === null)
    throw new Error("estimateMatch requires revenueTier");
  if (ctx.timeInBusinessTier === null)
    throw new Error("estimateMatch requires timeInBusinessTier");
  if (ctx.amount === null) throw new Error("estimateMatch requires amount");

  const baseTier = classifyBaseTier(
    ctx.vertical,
    ctx.revenueTier,
    ctx.timeInBusinessTier
  );
  const finalTier = applyCreditModifier(
    baseTier,
    ctx.creditBand ?? "not-sure"
  );
  const spec = TIER_SPECS[finalTier];

  const rawLow = ctx.amount * 0.65;
  const rawHigh = ctx.amount * 1.25;

  const rangeLow = Math.round(clamp(rawLow, spec.dollarMin, spec.dollarMax));
  const rangeHigh = Math.round(clamp(rawHigh, spec.dollarMin, spec.dollarMax));

  return {
    lenderCount: spec.lenderCount,
    rangeLow,
    rangeHigh,
    aprLow: spec.aprLow,
    aprHigh: spec.aprHigh,
    timingLow: spec.timingLow,
    timingHigh: spec.timingHigh,
    tier: finalTier,
  };
}
