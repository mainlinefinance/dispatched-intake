import "server-only";

/* ===========================================================================
   Sampling profiles describe the *exact* operator scenario a RateObservation
   was sampled against. Methodology pages render these verbatim so a reader
   can audit "what does this premium band assume?".

   Pattern mirrors QuinStreet's Quadrant Information Services disclosure on
   carinsurance.com state pages: a fixed driver/vehicle profile is named, and
   every quoted premium on the site is anchored to it. Without this, every
   programmatic rate page is unmoored.

   Keys are stable — they are referenced by RateObservation.profileId.
   =========================================================================== */

export type SamplingProfile = {
  id: string;
  label: string;
  driver: string;
  vehicle: string;
  coverage: string;
  operations: string;
};

export const SAMPLING_PROFILES: Record<string, SamplingProfile> = {
  "owner-op-clean-class8": {
    id: "owner-op-clean-class8",
    label: "Owner-operator, clean MVR, Class 8 tractor, general freight",
    driver:
      "42-year-old owner-operator, 5+ years CDL, clean motor vehicle record, no at-fault accidents in 36 months, valid medical card",
    vehicle:
      "2020 model-year Class 8 tractor (e.g., Freightliner Cascadia), with company-owned trailer",
    coverage:
      "$1M primary liability, $100K motor truck cargo, $1,000 deductible on physical damage at $120K stated value",
    operations:
      "500-mile radius, general freight (non-hazmat), under MC authority, weekly average 2,200 miles",
  },
  "small-fleet-3-trucks-class8": {
    id: "small-fleet-3-trucks-class8",
    label: "3-truck fleet, mixed drivers, Class 8 tractors, general freight",
    driver:
      "Drivers averaging 8 years CDL experience, fleet MVR with no major violations in 24 months",
    vehicle:
      "Three 2018–2022 Class 8 tractors with company trailers, average $110K stated value per unit",
    coverage:
      "$1M primary liability per occurrence, $100K cargo, $1,000 deductible on physical damage",
    operations:
      "Regional 750-mile radius, general freight, under fleet MC authority",
  },
  "hot-shot-with-authority": {
    id: "hot-shot-with-authority",
    label: "Hot-shot owner-op, Class 5 dually with gooseneck, expedited freight",
    driver:
      "38-year-old owner-operator, 3+ years CDL, clean MVR, hot-shot endorsement",
    vehicle: "2021 Class 5 dually pickup with 40-ft gooseneck trailer",
    coverage:
      "$750K primary liability (FMCSA minimum for non-hazmat under 26K GVWR is lower; carrying $750K is industry norm), $50K cargo",
    operations:
      "Expedited / partial loads, 1,000-mile radius, mix of broker-load-board freight",
  },
  "box-truck-local-delivery": {
    id: "box-truck-local-delivery",
    label: "Box truck owner-op, Class 6, local delivery",
    driver:
      "35-year-old, non-CDL where allowed (under 26K GVWR), clean MVR, 4 years driving",
    vehicle: "2021 Class 6 box truck (24-26 ft body), $65K stated value",
    coverage:
      "$1M primary liability, $25K cargo, $1,000 deductible physical damage",
    operations:
      "100-mile radius, local delivery / last-mile, no overnight runs",
  },
};
