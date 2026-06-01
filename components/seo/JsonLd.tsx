/* ===========================================================================
   Server-rendered schema.org JSON-LD. Use one component per JSON-LD payload;
   render multiple on a page when needed (e.g., Article + BreadcrumbList +
   FAQPage on a money page).

   Type discipline: the runtime JSON allows any schema.org shape, but every
   call site uses one of the helper builders (article(), breadcrumbList(),
   faqPage(), financialProduct(), person()) that constrain the shape we
   actually emit. Adding a new helper is one entry; we do not let arbitrary
   payloads spread across the codebase.

   Renders as <script type="application/ld+json"> with the payload safely
   serialized. JSON.stringify with no replacer is sufficient because we never
   embed user-controlled HTML in schema fields — every input is either a
   server-only literal or a typed slug.
   =========================================================================== */

type JsonLdValue =
  | string
  | number
  | boolean
  | null
  | JsonLdValue[]
  | { [key: string]: JsonLdValue };

export type JsonLdPayload = {
  "@context": "https://schema.org";
  "@type": string;
  [key: string]: JsonLdValue;
};

/* Stable @id values — used to cross-reference entities in the JSON-LD graph
   (e.g., a FinancialService can point provider → org @id). Search engines
   collapse references via @id, which strengthens entity recognition. Hoisted
   to the top of the file so the article() helper can reference FOUNDER_ID
   without forward-reference ambiguity. */
const ORG_ID = "https://dispatched.finance/#organization";
const SITE_ID = "https://dispatched.finance/#website";
const FOUNDER_ID = "https://dispatched.finance/about#angelo-orru-neto";

/* Canonical founder name — used by article()/howTo()/etc. to detect when an
   authorName/reviewerName arg refers to the founder Person entity and emit an
   @id reference instead of a detached inline Person. Keeps the entity graph
   clean: one Person node on /about, many articles referencing it. */
const FOUNDER_NAME_CANONICAL = "Angelo Orru Neto";

export function JsonLd({ payload }: { payload: JsonLdPayload }) {
  // Defense-in-depth: escape `<` to its unicode equivalent so a stray HTML
  // sequence in any future schema field can't break out of the <script> tag.
  // Per Next 16 official JSON-LD guide:
  // node_modules/next/dist/docs/01-app/02-guides/json-ld.md
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(payload).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function article(args: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  authorName?: string;
  reviewerName?: string;
  reviewerCredential?: string;
}): JsonLdPayload {
  const author: JsonLdPayload["author"] =
    args.authorName === FOUNDER_NAME_CANONICAL
      ? { "@id": FOUNDER_ID }
      : args.authorName
        ? { "@type": "Person", name: args.authorName }
        : { "@type": "Organization", name: "Dispatched" };
  const payload: JsonLdPayload = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: args.headline,
    description: args.description,
    url: args.url,
    datePublished: args.datePublished,
    dateModified: args.dateModified,
    author,
    publisher: {
      "@type": "Organization",
      name: "Dispatched",
      url: "https://dispatched.finance",
    },
  };
  if (args.reviewerName) {
    payload.reviewedBy =
      args.reviewerName === FOUNDER_NAME_CANONICAL
        ? { "@id": FOUNDER_ID }
        : {
            "@type": "Person",
            name: args.reviewerName,
            ...(args.reviewerCredential
              ? { hasCredential: args.reviewerCredential }
              : {}),
          };
  }
  return payload;
}

export function breadcrumbList(
  items: ReadonlyArray<{ name: string; url: string }>,
): JsonLdPayload {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

export function faqPage(
  qas: ReadonlyArray<{ q: string; a: string }>,
): JsonLdPayload {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: qas.map((qa) => ({
      "@type": "Question",
      name: qa.q,
      acceptedAnswer: { "@type": "Answer", text: qa.a },
    })),
  };
}

export function financialProduct(args: {
  name: string;
  description: string;
  url: string;
  category: string;
}): JsonLdPayload {
  return {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    name: args.name,
    description: args.description,
    url: args.url,
    category: args.category,
    provider: {
      "@type": "Organization",
      name: "Dispatched",
      url: "https://dispatched.finance",
    },
  };
}

export function organization(): JsonLdPayload {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: "Dispatched",
    legalName: "TCopyCats LLC",
    url: "https://dispatched.finance",
    logo: {
      "@type": "ImageObject",
      url: "https://dispatched.finance/logo.png",
      width: 512,
      height: 512,
    },
    description:
      "A matching platform for commercial trucking working capital and commercial trucking insurance. Operates two product lines: financing routed to a panel of commercial lenders, and insurance comparison routed to a named producer partner.",
    telephone: "+1-307-317-0801",
    email: "support@dispatched.finance",
    foundingDate: "2026",
    founder: { "@id": FOUNDER_ID },
    address: {
      "@type": "PostalAddress",
      streetAddress: "12895 Josey Lane #124",
      addressLocality: "Dallas",
      addressRegion: "TX",
      postalCode: "75234",
      addressCountry: "US",
    },
    areaServed: { "@type": "Country", name: "United States" },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-307-317-0801",
      email: "support@dispatched.finance",
      contactType: "customer service",
      areaServed: "US",
      availableLanguage: ["English", "Spanish"],
    },
    sameAs: [
      "https://www.linkedin.com/company/dispatched-finance",
      "https://twitter.com/dispatchedfin",
      "https://www.facebook.com/dispatchedfinance",
    ],
  };
}

/* Person schema for the founder. Lives on /about and is referenced from
   organization() via founder → @id. Search engines collapse the reference
   into a single entity-graph node, strengthening E-E-A-T signal for the
   YMYL finance vertical (Google quality raters explicitly look for "who
   runs this site" with a real human). */
export function person(args: {
  name: string;
  jobTitle: string;
  description: string;
  imageUrl: string;
  alumniOf?: string;
  sameAs?: ReadonlyArray<string>;
  knowsAbout?: ReadonlyArray<string>;
}): JsonLdPayload {
  const payload: JsonLdPayload = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": FOUNDER_ID,
    name: args.name,
    jobTitle: args.jobTitle,
    description: args.description,
    url: "https://dispatched.finance/about",
    image: args.imageUrl,
    worksFor: { "@id": ORG_ID },
  };
  if (args.alumniOf) {
    payload.alumniOf = {
      "@type": "EducationalOrganization",
      name: args.alumniOf,
    };
  }
  if (args.sameAs && args.sameAs.length > 0) {
    payload.sameAs = [...args.sameAs];
  }
  if (args.knowsAbout && args.knowsAbout.length > 0) {
    payload.knowsAbout = [...args.knowsAbout];
  }
  return payload;
}

export function website(): JsonLdPayload {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID,
    name: "Dispatched",
    url: "https://dispatched.finance",
    publisher: { "@id": ORG_ID },
  };
}

/* FinancialService — entity-level wrapper for a hub page that lists multiple
   financing products under one service. Use on a hub like /trucking when one
   exists; per-product pages keep using financialProduct(). */
export function financialService(): JsonLdPayload {
  return {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "@id": "https://dispatched.finance/trucking#service",
    name: "Trucking Financing",
    url: "https://dispatched.finance/trucking-working-capital",
    // FinancialService inherits from LocalBusiness/Organization; the correct
    // way to relate it to the parent corporate entity (TCopyCats LLC dba
    // Dispatched) is parentOrganization, not provider. The schema.org
    // validator flags `provider` here as an unrecognized property.
    parentOrganization: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "United States" },
    // serviceType + audience were dropped — both are properties of Service,
    // and FinancialService's lineage in schema.org is LocalBusiness >
    // Organization (NOT Service). The validator flags either as unrecognized
    // on FinancialService. The audience signal is preserved in the
    // description string ("for U.S. truckers"); the @type itself is the
    // serviceType (FinancialService).
    description:
      "Working capital, equipment financing, truck repair loans, invoice factoring, semi-truck financing, box truck financing, owner-operator and new-authority loans for U.S. truckers (owner-operators and small fleets).",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Trucking Loan Products",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Truck Repair Loans", url: "https://dispatched.finance/truck-repair-loans" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Working Capital", url: "https://dispatched.finance/trucking-working-capital" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Equipment Financing", url: "https://dispatched.finance/equipment-financing" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Invoice Factoring", url: "https://dispatched.finance/factoring" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Semi-Truck Financing", url: "https://dispatched.finance/semi-truck-financing" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Box Truck Financing", url: "https://dispatched.finance/box-truck-financing" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Bad Credit Truck Financing", url: "https://dispatched.finance/bad-credit-truck-financing" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "New Authority Truck Financing", url: "https://dispatched.finance/new-authority-truck-financing" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Owner-Operator Financing", url: "https://dispatched.finance/owner-operator-financing" } },
      ],
    },
  };
}

/* HowTo — for step-by-step pages (e.g., /owner-operator-financing/first-time
   "from CDL to your first funded truck"). Google still rewards HowTo schema
   on educational pages even though rich-result eligibility was narrowed in
   2023; the structured signal still strengthens entity recognition. */
export function howTo(args: {
  name: string;
  description: string;
  totalTime?: string; // ISO 8601 duration, e.g. "PT10D" for 10 days
  steps: ReadonlyArray<{ name: string; text: string; url?: string }>;
}): JsonLdPayload {
  const payload: JsonLdPayload = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: args.name,
    description: args.description,
    step: args.steps.map((s, i) => {
      const step: JsonLdValue = {
        "@type": "HowToStep",
        position: i + 1,
        name: s.name,
        text: s.text,
      };
      if (s.url) (step as { [k: string]: JsonLdValue }).url = s.url;
      return step;
    }),
  };
  if (args.totalTime) payload.totalTime = args.totalTime;
  return payload;
}

/* ItemList — used on listicle/ranking pages (e.g.,
   /research/best-trucking-factoring-2026). Each item references an external
   organization by url; we do NOT emit AggregateRating without verifiable
   user-review data, since Google penalizes self-serving rating schema. */
export function itemList(args: {
  name: string;
  description: string;
  items: ReadonlyArray<{ name: string; url: string; description?: string }>;
}): JsonLdPayload {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: args.name,
    description: args.description,
    numberOfItems: args.items.length,
    itemListElement: args.items.map((it, i) => {
      const li: JsonLdValue = {
        "@type": "ListItem",
        position: i + 1,
        name: it.name,
        url: it.url,
      };
      if (it.description) (li as { [k: string]: JsonLdValue }).description = it.description;
      return li;
    }),
  };
}

/* DefinedTerm — for individual glossary entries. The DefinedTermSet (the
   glossary index) groups all DefinedTerms. Critical for AEO/LLM citation
   eligibility — schema.org's DefinedTerm is one of the most-cited types
   by ChatGPT and Perplexity for definitional queries. */
export function definedTerm(args: {
  name: string;
  description: string;
  url: string;
  termCode?: string; // e.g. "MC#", "DOT#"
  inDefinedTermSetUrl?: string;
}): JsonLdPayload {
  const payload: JsonLdPayload = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: args.name,
    description: args.description,
    url: args.url,
  };
  if (args.termCode) payload.termCode = args.termCode;
  if (args.inDefinedTermSetUrl) {
    payload.inDefinedTermSet = {
      "@type": "DefinedTermSet",
      url: args.inDefinedTermSetUrl,
    };
  }
  return payload;
}

/* DefinedTermSet — the glossary index page wrapper. Lists all DefinedTerm
   entries by reference (not embedded; each term has its own page with its
   own DefinedTerm payload). */
export function definedTermSet(args: {
  name: string;
  description: string;
  url: string;
  hasDefinedTerms: ReadonlyArray<{ name: string; url: string }>;
}): JsonLdPayload {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: args.name,
    description: args.description,
    url: args.url,
    hasDefinedTerm: args.hasDefinedTerms.map((t) => ({
      "@type": "DefinedTerm",
      name: t.name,
      url: t.url,
    })),
  };
}

/* SoftwareApplication — for interactive calculator pages (factoring fee,
   lease vs buy, owner-operator P&L). Pairs with HowTo schema on the same
   page: HowTo describes the steps, SoftwareApplication describes the
   tool itself. applicationCategory uses Google's enumerated values
   (BusinessApplication, FinanceApplication). */
export function softwareApplication(args: {
  name: string;
  description: string;
  url: string;
  applicationCategory:
    | "BusinessApplication"
    | "FinanceApplication"
    | "UtilitiesApplication";
}): JsonLdPayload {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: args.name,
    description: args.description,
    url: args.url,
    applicationCategory: args.applicationCategory,
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    provider: {
      "@type": "Organization",
      name: "Dispatched",
      url: "https://dispatched.finance",
    },
  };
}

/* Dataset — for Dispatched Pulse data pages (diesel, freight rates, etc.).
   `Dataset` is one of the highest-cited schema types by Perplexity / ChatGPT
   for numeric queries ("what is the current diesel price"). Pairs with
   article() on the same page (Article describes the commentary, Dataset
   describes the data). Set `isBasedOn` to the upstream source URL (EIA,
   FMCSA) so the citation chain is auditable. */
export function dataset(args: {
  name: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  temporalCoverage: string; // ISO 8601 interval, e.g. "2026-W20"
  variableMeasured: string; // e.g. "Retail diesel price (USD/gal)"
  spatialCoverage?: string; // e.g. "United States" or "PADD 1 — East Coast"
  sourceName: string;       // e.g. "U.S. Energy Information Administration"
  sourceUrl: string;        // upstream source URL
  license?: string;         // distribution license URL or label
  measurementTechnique?: string;
}): JsonLdPayload {
  const payload: JsonLdPayload = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: args.name,
    description: args.description,
    url: args.url,
    datePublished: args.datePublished,
    dateModified: args.dateModified,
    temporalCoverage: args.temporalCoverage,
    variableMeasured: args.variableMeasured,
    creator: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    isBasedOn: {
      "@type": "Dataset",
      name: args.sourceName,
      url: args.sourceUrl,
    },
    distribution: {
      "@type": "DataDownload",
      contentUrl: args.url,
      encodingFormat: "text/html",
    },
  };
  if (args.spatialCoverage) payload.spatialCoverage = args.spatialCoverage;
  if (args.license) payload.license = args.license;
  if (args.measurementTechnique) payload.measurementTechnique = args.measurementTechnique;
  return payload;
}

/* InsuranceAgency — entity-level wrapper for the /insurance pillar page.
   Complements the Article schema on the same page (Article describes the
   editorial; InsuranceAgency describes the entity providing the service). */
export function insuranceAgency(): JsonLdPayload {
  return {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    "@id": "https://dispatched.finance/insurance#service",
    name: "Dispatched Trucking Insurance",
    url: "https://dispatched.finance/insurance",
    // InsuranceAgency inherits from LocalBusiness/Organization; the correct
    // way to relate it to the parent corporate entity (TCopyCats LLC dba
    // Dispatched) is parentOrganization, not provider. Schema.org validator
    // flagged `provider` as not recognized on InsuranceAgency.
    parentOrganization: { "@id": ORG_ID },
    description:
      "Commercial trucking insurance comparison and matching: primary liability, motor truck cargo, physical damage, general liability, non-trucking liability, occupational accident, and reefer breakdown coverage from a panel of carriers writing your DOT class in your state.",
    areaServed: { "@type": "Country", name: "United States" },
    telephone: "+1-307-317-0801",
  };
}
