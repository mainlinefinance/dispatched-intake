import "server-only";

/* ===========================================================================
   Trucking financing products. Powers the /trucking pillar page (the hub),
   the financingService() OfferCatalog payload, and any future programmatic
   surface that needs a canonical list of the nine money pages.

   Important deviation from lib/data/products.ts:
     - `slug` here is NOT a route segment. The 9 products live at top-level
       routes (e.g. /trucking-working-capital, /equipment-financing). The hub
       cards link to `url`, which is the canonical full path for each money
       page. There is no /trucking/{slug} route shape and there will not be —
       these pages predate the pillar by months and we are not refactoring
       paths in this ticket.
     - The slug exists purely as a stable identifier for tests and for the
       eventual move to a shared key with the financialService() OfferCatalog.

   Copy source rule:
     `name`, `oneLine`, and `rangeLabel` are pulled verbatim (or near-verbatim
     framing) from the existing money pages — heroes and "What it actually is"
     sections. Do not invent new framing here. If the money page changes, this
     file follows.

   Adding a product:
     1. Add an entry to PRODUCTS keyed by slug.
     2. The pillar auto-picks it up via getAllFinancingProducts().
     3. Update financialService() in components/seo/JsonLd.tsx to keep the
        OfferCatalog in sync.
   =========================================================================== */

export type FinancingProductSlug =
  | "working-capital"
  | "equipment-financing"
  | "truck-repair-loans"
  | "invoice-factoring"
  | "semi-truck-financing"
  | "box-truck-financing"
  | "owner-operator-financing"
  | "new-authority-financing"
  | "bad-credit-financing";

export type FinancingProduct = {
  slug: FinancingProductSlug;
  name: string;
  oneLine: string;
  url: string;
  category: string;
  rangeLabel: string;
  aprBand?: string;
};

const PRODUCTS: Record<FinancingProductSlug, FinancingProduct> = {
  "working-capital": {
    slug: "working-capital",
    name: "Trucking working capital",
    oneLine:
      "Unsecured commercial line for fuel, driver payroll, tolls, insurance premiums, and slow-month gaps.",
    url: "/trucking-working-capital",
    category: "Working capital",
    rangeLabel: "$25K–$250K",
    aprBand: "14%–34% APR",
  },
  "equipment-financing": {
    slug: "equipment-financing",
    name: "Equipment financing",
    oneLine:
      "Secured loans for tractors, trailers, reefers, and lift gates. Longer payback than working capital, lower monthly payment.",
    url: "/equipment-financing",
    category: "Equipment",
    rangeLabel: "Terms to 72 months",
    aprBand: "9%–18% APR",
  },
  "truck-repair-loans": {
    slug: "truck-repair-loans",
    name: "Truck repair loans",
    oneLine:
      "Short-term financing for a specific repair — engine, transmission, brakes, after-treatment, accident damage. Same-banking-day funds.",
    url: "/truck-repair-loans",
    category: "Repair",
    rangeLabel: "$5K–$150K",
  },
  "invoice-factoring": {
    slug: "invoice-factoring",
    name: "Invoice factoring",
    oneLine:
      "Sell broker or carrier invoices for an immediate cash advance instead of waiting 30–60 days. Not a loan: no APR, no monthly payment.",
    url: "/factoring",
    category: "Cashflow",
    rangeLabel: "Recourse and non-recourse",
  },
  "semi-truck-financing": {
    slug: "semi-truck-financing",
    name: "Semi-truck financing",
    oneLine:
      "Class 8 tractors — Cascadias, Kenworths, Peterbilts, Volvos, Macks. Secured by the truck, longer terms than working capital.",
    url: "/semi-truck-financing",
    category: "Equipment",
    rangeLabel: "Terms to 72 months",
    aprBand: "9%–18% APR",
  },
  "box-truck-financing": {
    slug: "box-truck-financing",
    name: "Box truck financing",
    oneLine:
      "16ft to 26ft box trucks for last-mile, expediting, hot-shot, and Amazon Relay operators. Smaller loan sizes, smaller equipment value.",
    url: "/box-truck-financing",
    category: "Equipment",
    rangeLabel: "$20K–$120K",
    aprBand: "9%–18% APR",
  },
  "owner-operator-financing": {
    slug: "owner-operator-financing",
    name: "Owner-operator financing",
    oneLine:
      "Built around the 1099 sole-prop profile. Lenders underwrite ELD miles and settlement statements, not bank-grade DSCR worksheets.",
    url: "/owner-operator-financing",
    category: "Operator profile",
    rangeLabel: "FICO 500+",
  },
  "new-authority-financing": {
    slug: "new-authority-financing",
    name: "New-authority financing",
    oneLine:
      "Capital in your first 6–12 months under your own MC authority. Factoring and higher-down-payment equipment loans dominate the segment.",
    url: "/new-authority-truck-financing",
    category: "Operator profile",
    rangeLabel: "Under 12 months MC",
  },
  "bad-credit-financing": {
    slug: "bad-credit-financing",
    name: "Bad-credit truck financing",
    oneLine:
      "Same panel, same products — different routing. Lenders that underwrite revenue and equipment, not just FICO. Panel floor is 500.",
    url: "/bad-credit-truck-financing",
    category: "Operator profile",
    rangeLabel: "FICO 500–650",
  },
};

/* Recommended display order for the hub. Working capital + equipment first
   (highest commercial intent), repair loans next (highest urgency), then
   factoring as the cashflow alternative, then equipment subtypes, then the
   operator-profile cuts (owner-op, new authority, bad credit). */
const ORDER: readonly FinancingProductSlug[] = [
  "working-capital",
  "equipment-financing",
  "truck-repair-loans",
  "invoice-factoring",
  "semi-truck-financing",
  "box-truck-financing",
  "owner-operator-financing",
  "new-authority-financing",
  "bad-credit-financing",
];

export function getAllFinancingProducts(): FinancingProduct[] {
  return ORDER.map((slug) => PRODUCTS[slug]);
}

export function getFinancingProduct(
  slug: string,
): FinancingProduct | null {
  return (PRODUCTS as Record<string, FinancingProduct>)[slug] ?? null;
}

export function getFinancingProductSlugs(): FinancingProductSlug[] {
  return [...ORDER];
}
