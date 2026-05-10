import "server-only";

/* ===========================================================================
   Shared types for the glossary sub-files. The barrel (../glossary.ts)
   imports an array of GlossaryTerm from each category sub-file and
   concatenates them.

   Adding a new category:
     1. Add the literal to GlossaryCategory.
     2. Add a label to CATEGORY_LABELS.
     3. Add the category to the ORDERED_CATEGORIES array in glossary.ts so
        the index page renders in a stable sequence.
     4. Create lib/data/glossary/<category-slug>.ts exporting an array of
        terms with that category, then import + spread it in glossary.ts.
   =========================================================================== */

export type GlossaryCategory =
  | "operating-authority-compliance"
  | "factoring-cash-flow"
  | "operator-types"
  | "trucking-operations"
  | "trucking-finance"
  | "insurance-and-risk";

export type GlossaryRelatedProduct = {
  readonly url: string;
  readonly label: string;
};

export type GlossarySection = {
  readonly h2: string;
  readonly body: string;
};

export type GlossaryTerm = {
  readonly slug: string;
  readonly term: string;
  readonly abbreviation?: string;
  readonly termCode?: string;
  readonly category: GlossaryCategory;
  readonly shortDefinition: string;
  readonly sections: ReadonlyArray<GlossarySection>;
  readonly relatedTerms: ReadonlyArray<string>;
  readonly relatedProducts: ReadonlyArray<GlossaryRelatedProduct>;
};

export const CATEGORY_LABELS: Record<GlossaryCategory, string> = {
  "operating-authority-compliance": "Operating Authority & Compliance",
  "factoring-cash-flow": "Factoring & Cash Flow",
  "operator-types": "Operator Types",
  "trucking-operations": "Trucking Operations",
  "trucking-finance": "Trucking Finance",
  "insurance-and-risk": "Insurance & Risk",
};
