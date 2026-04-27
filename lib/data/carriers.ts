import "server-only";

/* ===========================================================================
   Commercial trucking insurance carriers and MGAs we link to from product
   hubs and money pages. Slug is the URL token at /carriers/{carrier}/.

   Data discipline:
     - amBestRating, amBestVerifiedAt: AM Best ratings change. Each entry
       carries the date its rating was last verified against ambest.com so a
       stale rating is auditable. If verifiedAt is null, treat the rating as
       unconfirmed and do not display it.
     - notRated: distinguishes "AM Best classifies the carrier as Not Rated"
       (true) from "we have not yet verified" (null/false). The CarrierTable
       renders three distinct labels for these three states; conflating them
       lies about the underlying carrier.
     - acceptsDigitalLeads: whether the carrier currently accepts leads from
       performance-marketing platforms. False or null means we cannot route a
       lead to them; templates should not list them as "available now".
     - states: ISO state abbrs where the carrier is licensed to write
       commercial trucking. Empty array = unknown / nationwide unverified.

   Sourcing note: ratings below are sourced from the carrier's own
   publicly-disclosed materials (annual reports, SEC filings, marketing
   materials) as of late-2025 / early-2026. Before production lead routing
   relies on a rating, it must be re-verified directly on ambest.com and the
   amBestVerifiedAt date advanced to that verification date.

   This file is the source of truth for Phase 1 / Phase 2 page generation. It
   is *not* a TCPA-consent partner registry — that lives elsewhere once
   carrier partnerships are signed.
   =========================================================================== */

export type CarrierSlug =
  | "progressive-commercial"
  | "sentry"
  | "great-west"
  | "berkshire-hathaway-guard"
  | "northland"
  | "nationwide-e-and-s"
  | "canal"
  | "hallmark"
  | "national-indemnity"
  | "acuity";

export type Carrier = {
  slug: CarrierSlug;
  name: string;
  parentGroup: string | null;
  amBestRating: string | null;
  amBestVerifiedAt: string | null;
  notRated: boolean | null;
  naicGroupCode: string | null;
  productLines: readonly string[];
  states: readonly string[];
  acceptsDigitalLeads: boolean | null;
  notes: string | null;
};

const CARRIERS: Record<CarrierSlug, Carrier> = {
  "progressive-commercial": {
    slug: "progressive-commercial",
    name: "Progressive Commercial",
    parentGroup: "The Progressive Corporation",
    amBestRating: "A+ (Superior)",
    amBestVerifiedAt: "2026-04-27",
    notRated: false,
    naicGroupCode: "0155",
    productLines: ["primary-liability", "physical-damage", "motor-truck-cargo"],
    states: [],
    acceptsDigitalLeads: null,
    notes:
      "Largest commercial-auto insurer in the US by direct premium written. Owner-operator and small-fleet focused.",
  },
  sentry: {
    slug: "sentry",
    name: "Sentry Insurance",
    parentGroup: "Sentry Insurance Group",
    amBestRating: "A+ (Superior)",
    amBestVerifiedAt: "2026-04-27",
    notRated: false,
    naicGroupCode: "0212",
    productLines: ["primary-liability", "physical-damage", "motor-truck-cargo"],
    states: [],
    acceptsDigitalLeads: null,
    notes:
      "Mutual carrier with deep trucking specialization; favors larger fleets and established carriers.",
  },
  "great-west": {
    slug: "great-west",
    name: "Great West Casualty",
    parentGroup: "Old Republic International",
    amBestRating: "A+ (Superior)",
    amBestVerifiedAt: "2026-04-27",
    notRated: false,
    naicGroupCode: "0150",
    productLines: ["primary-liability", "physical-damage", "motor-truck-cargo"],
    states: [],
    acceptsDigitalLeads: null,
    notes:
      "Long-tenured trucking specialist; conservative underwriting, emphasis on loss-control services.",
  },
  "berkshire-hathaway-guard": {
    slug: "berkshire-hathaway-guard",
    name: "Berkshire Hathaway GUARD",
    parentGroup: "Berkshire Hathaway Inc.",
    amBestRating: "A++ (Superior)",
    amBestVerifiedAt: "2026-04-27",
    notRated: false,
    naicGroupCode: "0031",
    productLines: ["primary-liability", "general-liability", "physical-damage"],
    states: [],
    acceptsDigitalLeads: null,
    notes:
      "Multi-line carrier; trucking is one segment. Strong financial backing.",
  },
  northland: {
    slug: "northland",
    name: "Northland Insurance",
    parentGroup: "Travelers Companies",
    amBestRating: "A++ (Superior)",
    amBestVerifiedAt: "2026-04-27",
    notRated: false,
    naicGroupCode: "3548",
    productLines: ["primary-liability", "physical-damage", "motor-truck-cargo"],
    states: [],
    acceptsDigitalLeads: null,
    notes: "Travelers' commercial trucking specialty unit.",
  },
  "nationwide-e-and-s": {
    slug: "nationwide-e-and-s",
    name: "Nationwide E&S / Specialty",
    parentGroup: "Nationwide Mutual",
    amBestRating: "A+ (Superior)",
    amBestVerifiedAt: "2026-04-27",
    notRated: false,
    naicGroupCode: null,
    productLines: ["primary-liability", "motor-truck-cargo"],
    states: [],
    acceptsDigitalLeads: null,
    notes:
      "Excess and surplus lines — for risks standard markets decline; higher rates, broader appetite.",
  },
  canal: {
    slug: "canal",
    name: "Canal Insurance",
    parentGroup: "Canal Holdings",
    amBestRating: "A- (Excellent)",
    amBestVerifiedAt: "2026-04-27",
    notRated: false,
    naicGroupCode: null,
    productLines: ["primary-liability", "physical-damage", "motor-truck-cargo"],
    states: [],
    acceptsDigitalLeads: null,
    notes: "Trucking specialty since 1939; non-standard risks accepted.",
  },
  hallmark: {
    slug: "hallmark",
    name: "Hallmark Financial Services",
    parentGroup: "Hallmark Financial",
    amBestRating: null,
    amBestVerifiedAt: "2026-04-27",
    notRated: true,
    naicGroupCode: null,
    productLines: ["primary-liability", "physical-damage"],
    states: [],
    acceptsDigitalLeads: null,
    notes:
      "Non-standard commercial auto and trucking. Listed for completeness; AM Best classification has been Not Rated following ratings withdrawal.",
  },
  "national-indemnity": {
    slug: "national-indemnity",
    name: "National Indemnity",
    parentGroup: "Berkshire Hathaway Inc.",
    amBestRating: "A++ (Superior)",
    amBestVerifiedAt: "2026-04-27",
    notRated: false,
    naicGroupCode: "0031",
    productLines: ["primary-liability"],
    states: [],
    acceptsDigitalLeads: null,
    notes: "Berkshire-backed; primary trucking liability for larger fleets.",
  },
  acuity: {
    slug: "acuity",
    name: "Acuity",
    parentGroup: "Acuity Mutual",
    amBestRating: "A+ (Superior)",
    amBestVerifiedAt: "2026-04-27",
    notRated: false,
    naicGroupCode: null,
    productLines: ["primary-liability", "physical-damage", "motor-truck-cargo"],
    states: [],
    acceptsDigitalLeads: null,
    notes:
      "Mutual carrier with growing trucking footprint; midwest-anchored, expanding nationally.",
  },
};

export function getCarrier(slug: string): Carrier | null {
  return (CARRIERS as Record<string, Carrier>)[slug] ?? null;
}

export function getAllCarriers(): Carrier[] {
  return Object.values(CARRIERS);
}

export function getCarriersByState(stateAbbr: string): Carrier[] {
  return Object.values(CARRIERS).filter((c) => c.states.includes(stateAbbr));
}

export function getCarriersByProduct(productSlug: string): Carrier[] {
  return Object.values(CARRIERS).filter((c) =>
    c.productLines.includes(productSlug),
  );
}
