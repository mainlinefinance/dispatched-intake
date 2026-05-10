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

export function JsonLd({ payload }: { payload: JsonLdPayload }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
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
  const author: JsonLdPayload["author"] = args.authorName
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
    payload.reviewedBy = {
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
    "@id": "https://dispatched.finance/#organization",
    name: "Dispatched",
    legalName: "Dispatched, Inc.",
    url: "https://dispatched.finance",
    logo: {
      "@type": "ImageObject",
      url: "https://dispatched.finance/opengraph-image",
      width: 1200,
      height: 630,
    },
    description:
      "A matching platform for commercial trucking working capital and commercial trucking insurance. Operates two product lines: financing routed to a panel of commercial lenders, and insurance comparison routed to a named producer partner.",
    telephone: "+1-307-317-0801",
    areaServed: { "@type": "Country", name: "United States" },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-307-317-0801",
      contactType: "customer service",
      areaServed: "US",
      availableLanguage: ["English"],
    },
    sameAs: [],
  };
}

export function financialService(args: {
  name: string;
  description: string;
  url: string;
  serviceType: string;
  offerCatalog?: ReadonlyArray<{ name: string; url: string }>;
}): JsonLdPayload {
  const payload: JsonLdPayload = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: args.name,
    description: args.description,
    url: args.url,
    serviceType: args.serviceType,
    provider: { "@id": "https://dispatched.finance/#organization" },
    areaServed: { "@type": "Country", name: "United States" },
  };
  if (args.offerCatalog && args.offerCatalog.length > 0) {
    payload.hasOfferCatalog = {
      "@type": "OfferCatalog",
      name: `${args.name} — products`,
      itemListElement: args.offerCatalog.map((o) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: o.name, url: o.url },
      })),
    };
  }
  return payload;
}

export function insuranceAgency(args: {
  name: string;
  description: string;
  url: string;
}): JsonLdPayload {
  return {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    name: args.name,
    description: args.description,
    url: args.url,
    provider: { "@id": "https://dispatched.finance/#organization" },
    areaServed: { "@type": "Country", name: "United States" },
    telephone: "+1-307-317-0801",
  };
}

export function website(): JsonLdPayload {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Dispatched",
    url: "https://dispatched.finance",
    publisher: {
      "@type": "Organization",
      name: "Dispatched",
      url: "https://dispatched.finance",
    },
  };
}
