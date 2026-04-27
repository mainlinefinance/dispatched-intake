import "server-only";

import type { ProductSlug } from "./products";
import type { DotClassSlug } from "./dotClasses";
import { SAMPLING_PROFILES, type SamplingProfile } from "./profiles";

/* ===========================================================================
   Rate observations are the renewable asset. Each row is a state × product
   × dot-class cell with a premium *band* (low/high), a sampling profile id
   that fixes the operator scenario, a source citation (URL or named filing),
   and the date the observation was sampled.

   Phase 1 sourcing rule: state DOI public rate filings only — no paid feeds.
   Each row's `source` field must point to a publicly verifiable filing, a
   regulator publication, or named carrier marketing. Rows without a source
   must have `source = null` and *will not be rendered* by money-page
   templates — they exist only as schema placeholders.

   The shape is intentionally narrow. Adding fields (e.g., per-vehicle
   factor, deductible variants) is fine; widening must be done in lockstep
   with a methodology page update so the disclosed methodology continues to
   match what the data actually says.

   Important: this file ships *empty of seeded values* in Phase 1 setup. The
   getter functions are wired so templates can render gracefully when no
   observation exists for a given combination. Seeded rows arrive as DOI
   filings are extracted; each commit that adds rows must include the
   filing citation in its message.
   =========================================================================== */

export type ProxyType =
  | "state-doi-filing"
  | "carrier-published-guidance"
  | "national-average-proxy";

export type RateObservation = {
  stateAbbr: string;
  productSlug: ProductSlug;
  dotClassSlug: DotClassSlug;
  profileId: string;
  premiumLowAnnual: number;
  premiumHighAnnual: number;
  currency: "USD";
  sampledAt: string;
  /* proxyType distinguishes the strength of the source. Templates render
     a different disclosure for each so a reader can tell whether the band
     came from the state regulator or from a less specific proxy. */
  proxyType: ProxyType;
  source: {
    label: string;
    url: string | null;
  } | null;
};

const OBSERVATIONS: RateObservation[] = [
  {
    stateAbbr: "TX",
    productSlug: "primary-liability",
    dotClassSlug: "class-8-tractor",
    profileId: "owner-op-clean-class8",
    premiumLowAnnual: 9000,
    premiumHighAnnual: 15000,
    currency: "USD",
    sampledAt: "2026-04-27",
    proxyType: "carrier-published-guidance",
    source: {
      label:
        "Progressive Commercial — owner-operator primary liability published guidance",
      url: "https://www.progressivecommercial.com/",
    },
  },
];

function key(
  stateAbbr: string,
  productSlug: string,
  dotClassSlug: string,
): string {
  return `${stateAbbr.toUpperCase()}|${productSlug}|${dotClassSlug}`;
}

const INDEX = new Map<string, RateObservation>();
for (const o of OBSERVATIONS) {
  INDEX.set(key(o.stateAbbr, o.productSlug, o.dotClassSlug), o);
}

export function getRate(
  stateAbbr: string,
  productSlug: ProductSlug,
  dotClassSlug: DotClassSlug,
): RateObservation | null {
  return INDEX.get(key(stateAbbr, productSlug, dotClassSlug)) ?? null;
}

export function getRatesByState(stateAbbr: string): RateObservation[] {
  return OBSERVATIONS.filter(
    (o) => o.stateAbbr.toUpperCase() === stateAbbr.toUpperCase(),
  );
}

export function getRatesByProduct(
  productSlug: ProductSlug,
): RateObservation[] {
  return OBSERVATIONS.filter((o) => o.productSlug === productSlug);
}

export function getProfileForObservation(
  o: RateObservation,
): SamplingProfile | null {
  return SAMPLING_PROFILES[o.profileId] ?? null;
}

export function hasAnyRates(
  stateAbbr: string,
  productSlug: ProductSlug,
): boolean {
  return OBSERVATIONS.some(
    (o) =>
      o.stateAbbr.toUpperCase() === stateAbbr.toUpperCase() &&
      o.productSlug === productSlug,
  );
}
