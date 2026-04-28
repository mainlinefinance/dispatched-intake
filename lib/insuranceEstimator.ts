import "server-only";

import type { ProductSlug } from "./data/products";
import type { DotClassSlug } from "./data/dotClasses";
import { getRate, type RateObservation } from "./data/rates";
import { getInsuranceState } from "./data/states";

/* ===========================================================================
   Premium estimator. Pure function on top of the RateObservation data layer
   so every estimate is anchored to a real (or proxy) rate band. Modifiers
   apply multiplicatively on top of the base observation.

   The estimator NEVER fabricates a band when no observation exists. It
   returns { ok: false, reason: "no-observation" } and the page renders an
   honest pending notice. This is the same discipline the deep money page
   templates use.

   The factor values below are not state-DOI-derived — they reflect
   industry-typical rate-class spreads under FMCSA Part 387 and are
   transparent on the page (each modifier is named, with its factor and
   reason, so a reader can audit how the band was assembled). Publishing
   the factors is the whole point.
   =========================================================================== */

const CLAIMS_FACTORS = {
  "clean-36mo": {
    factor: 1.0,
    reason: "Clean MVR over 36 months — preferred underwriting class",
  },
  "1-claim": {
    factor: 1.4,
    reason: "One chargeable claim in 36 months — standard surcharge",
  },
  "2-plus-claims": {
    factor: 2.0,
    reason: "Two or more chargeable claims — non-standard market typical",
  },
  "not-sure": {
    factor: 1.4,
    reason: "Conservative pricing pending MVR pull",
  },
} as const;

const COVERAGE_FACTORS = {
  "fmcsa-minimum": {
    factor: 0.85,
    reason: "FMCSA minimum limits ($750K general freight)",
  },
  "1m-standard": {
    factor: 1.0,
    reason: "$1M industry-standard limits",
  },
  "2m-elevated": {
    factor: 1.35,
    reason: "$2M elevated limits",
  },
  "5m-hazmat": {
    factor: 1.8,
    reason: "$5M hazmat-class limits",
  },
} as const;

const RADIUS_FACTORS = {
  "local-100": {
    factor: 0.9,
    reason: "Local — within 100 miles",
  },
  "regional-500": {
    factor: 1.0,
    reason: "Regional — within 500 miles",
  },
  "long-haul-1000+": {
    factor: 1.15,
    reason: "Long-haul — 1,000+ miles",
  },
} as const;

export type ClaimsHistoryKey = keyof typeof CLAIMS_FACTORS;
export type CoverageLimitKey = keyof typeof COVERAGE_FACTORS;
export type RadiusKey = keyof typeof RADIUS_FACTORS;

export type EstimatorInput = {
  stateSlug: string;
  productSlug: ProductSlug;
  dotClassSlug: DotClassSlug;
  claimsHistory: ClaimsHistoryKey;
  coverageLimitBand: CoverageLimitKey;
  radiusBand: RadiusKey;
};

export type EstimatorModifier = {
  name: string;
  factor: number;
  reason: string;
};

export type EstimatorOk = {
  ok: true;
  premiumLowAnnual: number;
  premiumHighAnnual: number;
  baseObservation: RateObservation;
  combinedFactor: number;
  modifiers: EstimatorModifier[];
};

export type EstimatorMiss = {
  ok: false;
  reason: "no-observation" | "invalid-state";
  message: string;
};

export type EstimatorResult = EstimatorOk | EstimatorMiss;

export function estimatePremiumBand(
  input: EstimatorInput,
): EstimatorResult {
  const state = getInsuranceState(input.stateSlug);
  if (!state) {
    return {
      ok: false,
      reason: "invalid-state",
      message: `State '${input.stateSlug}' is not in our coverage map yet.`,
    };
  }

  const obs = getRate(state.abbr, input.productSlug, input.dotClassSlug);
  if (!obs) {
    return {
      ok: false,
      reason: "no-observation",
      message: `We have no sampled rate observation for this combination yet.`,
    };
  }

  const claimsMod = CLAIMS_FACTORS[input.claimsHistory];
  const covMod = COVERAGE_FACTORS[input.coverageLimitBand];
  const radMod = RADIUS_FACTORS[input.radiusBand];

  const combined = claimsMod.factor * covMod.factor * radMod.factor;

  return {
    ok: true,
    premiumLowAnnual: Math.round(obs.premiumLowAnnual * combined),
    premiumHighAnnual: Math.round(obs.premiumHighAnnual * combined),
    baseObservation: obs,
    combinedFactor: combined,
    modifiers: [
      { name: "Claims history", ...claimsMod },
      { name: "Coverage limits", ...covMod },
      { name: "Radius", ...radMod },
    ],
  };
}

export function getEstimatorChoices() {
  return {
    claims: Object.entries(CLAIMS_FACTORS).map(([key, v]) => ({
      key: key as ClaimsHistoryKey,
      reason: v.reason,
    })),
    coverage: Object.entries(COVERAGE_FACTORS).map(([key, v]) => ({
      key: key as CoverageLimitKey,
      reason: v.reason,
    })),
    radius: Object.entries(RADIUS_FACTORS).map(([key, v]) => ({
      key: key as RadiusKey,
      reason: v.reason,
    })),
  };
}
