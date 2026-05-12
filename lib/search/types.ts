/* ===========================================================================
   Search index types. Shared between the server-side index builder
   (lib/search/index.ts), the /search page (app/search/page.tsx), the
   pre-build script (scripts/build-search-index.ts), and any future
   client-side consumer of lib/search/searchIndex.json.

   The shape is intentionally narrow: one row per searchable page with the
   fields a results list actually renders (title, description, url, type
   chip, optional category chip). Bodies/sections stay out — search is
   over the surface metadata, not the long-form copy.
   =========================================================================== */

export type SearchableType =
  | "glossary"
  | "blog"
  | "comparison"
  | "research"
  | "calculator"
  | "vertical"
  | "lender"
  | "city";

export type SearchableItem = {
  readonly url: string;
  readonly title: string;
  readonly description: string;
  readonly type: SearchableType;
  readonly category?: string;
};

export const TYPE_LABELS: Record<SearchableType, string> = {
  glossary: "Glossary",
  blog: "Blog",
  comparison: "Lender comparisons",
  research: "Research reports",
  calculator: "Calculators",
  vertical: "Financing & insurance",
  lender: "Lender directory",
  city: "Local lender pages",
};

/* Display order on the results page — groups appear in this sequence when
   results exist in each. Money pages first (vertical, lender, comparison),
   then high-intent decision aids (calculator, research), then upper-funnel
   (blog, glossary, city). */
export const TYPE_DISPLAY_ORDER: ReadonlyArray<SearchableType> = [
  "vertical",
  "lender",
  "comparison",
  "calculator",
  "research",
  "blog",
  "glossary",
  "city",
];
