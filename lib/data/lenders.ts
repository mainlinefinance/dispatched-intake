import "server-only";

/* ===========================================================================
   Trucking lender directory. Programmatic SEO play for state-by-state
   lender queries — every entry in LENDERS appears on /lenders and (if it
   serves the state) on /lenders/[state].

   Architecture:
     - LENDERS: 12 curated trucking lenders covering factoring, equipment,
       working capital, ABL, and insurance-premium financing.
     - STATE_INFO: the 50 US states plus DC. Keyed in two-letter code form.
     - The page renderers iterate LENDERS for the index and call
       getLendersByState(stateCode) per state page.

   Coverage convention: when a lender serves the entire country, the
   `statesServed` array contains the single literal "ALL". The lookup
   functions treat ALL as expanding to every state code + DC. Adding a
   regional lender requires listing the specific state codes (no ALL).

   All copy in `blurb` is tradeoff-honest and short (1–2 sentences). No
   marketing — the directory is editorial. URLs link to the lender's own
   marketing site; we keep target="_blank" + rel="noopener noreferrer" at
   the render layer.
   =========================================================================== */

export type LenderType =
  | "factoring"
  | "equipment"
  | "working-capital"
  | "insurance-premium-financing"
  | "abl";

export type LenderEntry = {
  readonly slug: string;
  readonly name: string;
  readonly url: string;
  readonly types: ReadonlyArray<LenderType>;
  readonly statesServed: ReadonlyArray<string>;
  readonly hqState?: string;
  readonly founded?: number;
  readonly blurb: string;
  readonly bestFor: string;
  readonly rateFloor?: string;
  readonly contractMin?: string;
};

export type StateInfo = {
  readonly code: string;
  readonly slug: string;
  readonly name: string;
};

export const STATE_INFO: ReadonlyArray<StateInfo> = [
  { code: "AL", slug: "alabama", name: "Alabama" },
  { code: "AK", slug: "alaska", name: "Alaska" },
  { code: "AZ", slug: "arizona", name: "Arizona" },
  { code: "AR", slug: "arkansas", name: "Arkansas" },
  { code: "CA", slug: "california", name: "California" },
  { code: "CO", slug: "colorado", name: "Colorado" },
  { code: "CT", slug: "connecticut", name: "Connecticut" },
  { code: "DE", slug: "delaware", name: "Delaware" },
  { code: "DC", slug: "district-of-columbia", name: "District of Columbia" },
  { code: "FL", slug: "florida", name: "Florida" },
  { code: "GA", slug: "georgia", name: "Georgia" },
  { code: "HI", slug: "hawaii", name: "Hawaii" },
  { code: "ID", slug: "idaho", name: "Idaho" },
  { code: "IL", slug: "illinois", name: "Illinois" },
  { code: "IN", slug: "indiana", name: "Indiana" },
  { code: "IA", slug: "iowa", name: "Iowa" },
  { code: "KS", slug: "kansas", name: "Kansas" },
  { code: "KY", slug: "kentucky", name: "Kentucky" },
  { code: "LA", slug: "louisiana", name: "Louisiana" },
  { code: "ME", slug: "maine", name: "Maine" },
  { code: "MD", slug: "maryland", name: "Maryland" },
  { code: "MA", slug: "massachusetts", name: "Massachusetts" },
  { code: "MI", slug: "michigan", name: "Michigan" },
  { code: "MN", slug: "minnesota", name: "Minnesota" },
  { code: "MS", slug: "mississippi", name: "Mississippi" },
  { code: "MO", slug: "missouri", name: "Missouri" },
  { code: "MT", slug: "montana", name: "Montana" },
  { code: "NE", slug: "nebraska", name: "Nebraska" },
  { code: "NV", slug: "nevada", name: "Nevada" },
  { code: "NH", slug: "new-hampshire", name: "New Hampshire" },
  { code: "NJ", slug: "new-jersey", name: "New Jersey" },
  { code: "NM", slug: "new-mexico", name: "New Mexico" },
  { code: "NY", slug: "new-york", name: "New York" },
  { code: "NC", slug: "north-carolina", name: "North Carolina" },
  { code: "ND", slug: "north-dakota", name: "North Dakota" },
  { code: "OH", slug: "ohio", name: "Ohio" },
  { code: "OK", slug: "oklahoma", name: "Oklahoma" },
  { code: "OR", slug: "oregon", name: "Oregon" },
  { code: "PA", slug: "pennsylvania", name: "Pennsylvania" },
  { code: "RI", slug: "rhode-island", name: "Rhode Island" },
  { code: "SC", slug: "south-carolina", name: "South Carolina" },
  { code: "SD", slug: "south-dakota", name: "South Dakota" },
  { code: "TN", slug: "tennessee", name: "Tennessee" },
  { code: "TX", slug: "texas", name: "Texas" },
  { code: "UT", slug: "utah", name: "Utah" },
  { code: "VT", slug: "vermont", name: "Vermont" },
  { code: "VA", slug: "virginia", name: "Virginia" },
  { code: "WA", slug: "washington", name: "Washington" },
  { code: "WV", slug: "west-virginia", name: "West Virginia" },
  { code: "WI", slug: "wisconsin", name: "Wisconsin" },
  { code: "WY", slug: "wyoming", name: "Wyoming" },
];

const ALL_STATE_CODES: ReadonlyArray<string> = STATE_INFO.map((s) => s.code);

/* The 12 curated trucking lenders. Editorial copy is tradeoff-honest:
   we name the limitation in the same sentence as the strength so the
   page reads like research, not marketing. */
const LENDERS: ReadonlyArray<LenderEntry> = [
  {
    slug: "apex-capital",
    name: "Apex Capital",
    url: "https://www.apexcapitalcorp.com/",
    types: ["factoring", "equipment"],
    statesServed: ["ALL"],
    hqState: "TX",
    founded: 1995,
    bestFor: "owner-operators",
    rateFloor: "1%",
    contractMin: "12 months",
    blurb:
      "Three decades of owner-operator factoring with instant 24/7/365 funding via blynk® and the deepest fuel discount in the market (operator-reported ~51¢/gal at participating chains). 12-month auto-renewing contract with a 30-day cancellation window is the main trade-off.",
  },
  {
    slug: "ecapital",
    name: "eCapital",
    url: "https://ecapital.com/",
    types: ["factoring", "working-capital", "abl"],
    statesServed: ["ALL"],
    founded: 2006,
    bestFor: "mid-fleets and brokers",
    rateFloor: "1.95%",
    contractMin: "varies",
    blurb:
      "Largest North American freight factor by volume with deep mid-fleet and broker products plus ABL and equipment financing under one roof. Fee transparency and contract-exit complaints are the most common review themes — read the schedule in writing before signing.",
  },
  {
    slug: "rts-financial",
    name: "RTS Financial",
    url: "https://www.rtsinc.com/",
    types: ["factoring"],
    statesServed: ["ALL"],
    hqState: "KS",
    founded: 1995,
    bestFor: "high-volume fleets",
    rateFloor: "1.5%",
    contractMin: "12 months",
    blurb:
      "Trucking-native factor with a solid fuel-card network and broker-credit tool sized for 10–50 truck fleets. Does not edge out Apex on owner-operators or eCapital on the largest fleets, but a fair quote-against for mid-sized operators.",
  },
  {
    slug: "triumph-business-capital",
    name: "Triumph Business Capital",
    url: "https://www.triumph.com/",
    types: ["factoring", "abl", "insurance-premium-financing"],
    statesServed: ["ALL"],
    hqState: "TX",
    founded: 2004,
    bestFor: "non-recourse + ABL graduation",
    rateFloor: "1.5%",
    contractMin: "12 months",
    blurb:
      "Strongest non-recourse program on the list — built around broker-credit risk as a core product, not a bolt-on. Owned by publicly traded Triumph Financial, which keeps pricing disciplined but rigid; the 12-month contract auto-renews.",
  },
  {
    slug: "tbs-factoring",
    name: "TBS Factoring",
    url: "https://www.tbsfactoring.com/",
    types: ["factoring"],
    statesServed: ["ALL"],
    hqState: "OK",
    founded: 1968,
    bestFor: "new-authority operators",
    rateFloor: "1.2%",
    contractMin: "12 months",
    blurb:
      "Funds brand-new MC numbers in their first 30 days where most factors require 90+ days of broker history. Supportive of post-bankruptcy operators and includes a fuel card plus dispatch support; customer service is functional rather than high-touch.",
  },
  {
    slug: "otr-solutions",
    name: "OTR Solutions",
    url: "https://www.otrcapital.com/",
    types: ["factoring"],
    statesServed: ["ALL"],
    founded: 2011,
    bestFor: "transparency-first owner-operators",
    rateFloor: "2.5%",
    contractMin: "month-to-month",
    blurb:
      "No minimum volume and no minimum contract — spot factoring on the loads you choose with everything else in-house. Per-invoice rate (2.5–5%) is higher than full-ledger factoring, so the math only works if you factor selectively.",
  },
  {
    slug: "porter-freight-funding",
    name: "Porter Freight Funding",
    url: "https://porterfreightfunding.com/",
    types: ["factoring"],
    statesServed: ["ALL"],
    bestFor: "bad-credit owner-operators",
    rateFloor: "1.5%",
    contractMin: "month-to-month",
    blurb:
      "Explicit no-personal-credit-check option for sub-580 FICOs, recent bankruptcies, and thin-file operators — they underwrite the broker, not the trucker. No fuel program and a 90% advance cap raise the effective cost vs. Apex or eCapital.",
  },
  {
    slug: "truckstop-go-capital",
    name: "Truckstop Go Capital",
    url: "https://truckstop.com/factoring/",
    types: ["factoring"],
    statesServed: ["ALL"],
    bestFor: "Truckstop load-board users",
    rateFloor: "3.25%",
    contractMin: "cancel anytime",
    blurb:
      "Native factoring product inside the Truckstop load board — invoices flow from booked loads into the factoring queue without re-entry. Higher headline rate (3.25%+) than Apex or Triumph; the integration value disappears if you do not run loads through Truckstop.",
  },
  {
    slug: "1st-commercial-credit",
    name: "1st Commercial Credit",
    url: "https://www.1stcommercialcredit.com/",
    types: ["factoring", "abl"],
    statesServed: ["ALL"],
    hqState: "TX",
    bestFor: "small-to-mid fleets",
    rateFloor: "0.69%",
    contractMin: "month-to-month",
    blurb:
      "Broad SMB factoring desk with a trucking-specific team and open underwriting for operators other factors decline. Trade-off: not trucking-specialized in the way Apex, TBS, and Triumph are — the fuel program and broker-credit tooling are thinner.",
  },
  {
    slug: "riviera-finance",
    name: "Riviera Finance",
    url: "https://www.rivierafinance.com/",
    types: ["factoring", "working-capital"],
    statesServed: ["ALL"],
    founded: 1969,
    bestFor: "long-history factoring relationships",
    rateFloor: "2%",
    contractMin: "month-to-month",
    blurb:
      "Legacy factor since 1969 with a national branch network — the only major factor on this list with in-person branch relationships. Technology stack (instant payment, mobile capture) is dated relative to Apex, eCapital, and Truckstop Go.",
  },
  {
    slug: "bluevine",
    name: "Bluevine",
    url: "https://www.bluevine.com/",
    types: ["working-capital", "abl"],
    statesServed: ["ALL"],
    founded: 2013,
    bestFor: "tech-forward SMB owner-operators",
    contractMin: "revolving line",
    blurb:
      "Tech-forward online lender offering revolving lines of credit up to $250K with same-day decisioning for clean files. Not trucking-native — works for owner-operators with strong personal credit and clean bank statements, but the underwriting does not flex for thin-file or new-authority profiles.",
  },
  {
    slug: "lendio",
    name: "Lendio",
    url: "https://www.lendio.com/",
    types: ["working-capital", "equipment"],
    statesServed: ["ALL"],
    founded: 2011,
    bestFor: "marketplace shopping across multiple lenders",
    contractMin: "varies by lender",
    blurb:
      "Lender marketplace that shops a single application across 75+ partner lenders for term loans, lines of credit, and equipment financing. Convenient for first-pass shopping; the downside is generic SMB underwriting rather than trucking-specific products from any single desk.",
  },
];

/* Public API. Keep the surface minimal — pages call these four. */

export function getAllLenders(): ReadonlyArray<LenderEntry> {
  return LENDERS;
}

export function getLender(slug: string): LenderEntry | undefined {
  return LENDERS.find((l) => l.slug === slug);
}

/* getLendersByState — accepts a 2-letter state code. A lender with
   statesServed === ["ALL"] is included for every state. Otherwise the
   state code must be present in the array. */
export function getLendersByState(
  stateCode: string,
): ReadonlyArray<LenderEntry> {
  const code = stateCode.toUpperCase();
  return LENDERS.filter((l) => {
    if (l.statesServed.includes("ALL")) return true;
    return l.statesServed.includes(code);
  });
}

export function getAllStateSlugs(): ReadonlyArray<string> {
  return STATE_INFO.map((s) => s.slug);
}

export function getStateBySlug(slug: string): StateInfo | undefined {
  return STATE_INFO.find((s) => s.slug === slug);
}

/* Used by the state-page render to confirm a lender array isn't unexpectedly
   empty — keeps the lookup explicit if we add regional-only lenders later. */
export function getAllStateCodes(): ReadonlyArray<string> {
  return ALL_STATE_CODES;
}

/* Human-readable label per LenderType. The renderers use this to render
   type chips on lender cards. */
export const LENDER_TYPE_LABELS: Record<LenderType, string> = {
  factoring: "Factoring",
  equipment: "Equipment financing",
  "working-capital": "Working capital",
  "insurance-premium-financing": "Insurance premium financing",
  abl: "Asset-based lending",
};
