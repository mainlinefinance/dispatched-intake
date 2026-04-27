import "server-only";

/* ===========================================================================
   Trucking insurance products. The slug is the URL token used in
   /insurance/{product}/[state]/[dotClass]/. Display copy lives here and is
   read by the pillar, product hub, and money-page templates.

   Adding a product:
     1. Add an entry to PRODUCTS keyed by slug.
     2. The pillar and product hub auto-pick it up via getAllProducts().
     3. Write a methodology entry for any product that has rate observations.
   =========================================================================== */

export type ProductSlug =
  | "primary-liability"
  | "motor-truck-cargo"
  | "physical-damage"
  | "general-liability"
  | "non-trucking-liability"
  | "occupational-accident"
  | "reefer-breakdown";

export type Product = {
  slug: ProductSlug;
  name: string;
  shortLabel: string;
  oneLine: string;
  whoBuys: string;
  regulatoryNote: string;
  fmcsaMinimum: string | null;
  optionalForDotClasses: readonly string[];
};

const PRODUCTS: Record<ProductSlug, Product> = {
  "primary-liability": {
    slug: "primary-liability",
    name: "Primary Liability Insurance",
    shortLabel: "Primary Liability",
    oneLine:
      "Pays for bodily injury and property damage you cause to others while operating under your authority.",
    whoBuys:
      "Every motor carrier with active FMCSA authority. Federally mandated.",
    regulatoryNote:
      "Required under FMCSA 49 CFR Part 387. Minimum $750K for non-hazmat general freight; $1M is the prevailing industry standard; $5M for some hazmat classes.",
    fmcsaMinimum: "$750,000 (general freight); $5,000,000 (hazmat Class A/B)",
    optionalForDotClasses: [],
  },
  "motor-truck-cargo": {
    slug: "motor-truck-cargo",
    name: "Motor Truck Cargo",
    shortLabel: "Cargo",
    oneLine:
      "Covers freight you are hauling against loss, theft, and damage in transit.",
    whoBuys:
      "Required by most shippers and brokers as a condition of accepting loads. Standard limit is $100,000 for general freight; reefer and high-value commodities require higher.",
    regulatoryNote:
      "Not federally mandated, but functionally required by 95%+ of brokered freight contracts.",
    fmcsaMinimum: null,
    optionalForDotClasses: [],
  },
  "physical-damage": {
    slug: "physical-damage",
    name: "Physical Damage",
    shortLabel: "Physical Damage",
    oneLine:
      "Covers your truck and trailer against collision, theft, and comprehensive perils.",
    whoBuys:
      "Required if your tractor or trailer is financed. Optional but typical on owned equipment.",
    regulatoryNote:
      "Lender-mandated whenever equipment is financed. Coverage usually written at stated value.",
    fmcsaMinimum: null,
    optionalForDotClasses: [],
  },
  "general-liability": {
    slug: "general-liability",
    name: "General Liability",
    shortLabel: "GL",
    oneLine:
      "Covers premises liability, completed operations, and non-trucking-related injury claims.",
    whoBuys:
      "Often required by terminal access agreements and shipper contracts; complements primary liability for non-truck-operations exposure.",
    regulatoryNote: "Not federally mandated; commonly required by contract.",
    fmcsaMinimum: null,
    optionalForDotClasses: [],
  },
  "non-trucking-liability": {
    slug: "non-trucking-liability",
    name: "Non-Trucking Liability",
    shortLabel: "NTL / Bobtail",
    oneLine:
      "Covers an owner-operator's truck when operated outside the dispatch of the carrier they are leased to (also called bobtail).",
    whoBuys:
      "Owner-operators leased onto a motor carrier; the carrier's policy covers loaded dispatch but excludes personal/non-dispatched use.",
    regulatoryNote:
      "Required by most carrier lease agreements when an operator is leased on rather than running their own authority.",
    fmcsaMinimum: null,
    optionalForDotClasses: [],
  },
  "occupational-accident": {
    slug: "occupational-accident",
    name: "Occupational Accident",
    shortLabel: "Occ-Acc",
    oneLine:
      "Provides medical, disability, and accidental-death coverage for owner-operators not eligible for workers' compensation.",
    whoBuys:
      "Owner-operators classified as 1099 contractors who are excluded from workers' comp; sometimes required by lease agreements.",
    regulatoryNote:
      "State-by-state interaction with workers' comp varies; in monopolistic-state-fund states (OH, ND, WA, WY), coverage rules differ materially.",
    fmcsaMinimum: null,
    optionalForDotClasses: [],
  },
  "reefer-breakdown": {
    slug: "reefer-breakdown",
    name: "Reefer Breakdown Coverage",
    shortLabel: "Reefer Breakdown",
    oneLine:
      "Endorsement on cargo policy that covers spoiled refrigerated freight when a reefer unit fails.",
    whoBuys:
      "Carriers and owner-operators hauling temperature-controlled freight. Standard cargo policies typically exclude reefer-breakdown losses.",
    regulatoryNote:
      "Endorsement, not standalone product. Typically requires recent reefer maintenance records as a condition of coverage.",
    fmcsaMinimum: null,
    optionalForDotClasses: [],
  },
};

export function getProduct(slug: string): Product | null {
  return (PRODUCTS as Record<string, Product>)[slug] ?? null;
}

export function getAllProducts(): Product[] {
  return Object.values(PRODUCTS);
}

export function getProductSlugs(): ProductSlug[] {
  return Object.keys(PRODUCTS) as ProductSlug[];
}
