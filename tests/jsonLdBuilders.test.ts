import { describe, expect, it } from "vitest";
import {
  article,
  breadcrumbList,
  definedTerm,
  definedTermSet,
  faqPage,
  financialProduct,
  financialService,
  howTo,
  insuranceAgency,
  itemList,
  organization,
  person,
  softwareApplication,
  website,
  type JsonLdPayload,
} from "@/components/seo/JsonLd";

/* ===========================================================================
   Schema validation for every JSON-LD builder exported from
   components/seo/JsonLd.tsx. The suite locks in:

     - @context / @type shape
     - required field surface for each schema type
     - conditional fields (e.g., article.reviewedBy only when reviewerName)
     - edge cases (empty arrays, missing optionals)

   These tests guard against regressions when a builder is edited. Schema
   structure is the contract: search engines and LLMs consume the emitted
   JSON, so any silent break in shape would degrade entity recognition
   across the 300+ routes that render these payloads.
   =========================================================================== */

/* Local helper — type-narrowing accessor for nested JSON-LD nodes. The
   builder return type intentionally allows any JsonLdValue, so tests need
   to assert object-shape access without `any`. */
type JsonLdNode = { readonly [key: string]: unknown };

function obj(value: unknown): JsonLdNode {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("Expected nested object");
  }
  return value as JsonLdNode;
}

function arr(value: unknown): ReadonlyArray<unknown> {
  if (!Array.isArray(value)) {
    throw new Error("Expected array");
  }
  return value;
}

function str(value: unknown): string {
  if (typeof value !== "string") {
    throw new Error("Expected string");
  }
  return value;
}

function assertContextAndType(payload: JsonLdPayload, type: string): void {
  expect(payload["@context"]).toBe("https://schema.org");
  expect(payload["@type"]).toBe(type);
}

describe("article builder", () => {
  const baseArgs = {
    headline: "Test headline",
    description: "Test description",
    url: "https://dispatched.finance/test",
    datePublished: "2026-01-01",
    dateModified: "2026-02-01",
  };

  it("produces a valid Article schema with default Organization author", () => {
    const out = article(baseArgs);
    assertContextAndType(out, "Article");
    expect(out.headline).toBe("Test headline");
    expect(out.description).toBe("Test description");
    expect(out.url).toBe("https://dispatched.finance/test");
    expect(out.datePublished).toBe("2026-01-01");
    expect(out.dateModified).toBe("2026-02-01");
    expect(obj(out.author)["@type"]).toBe("Organization");
    expect(obj(out.author).name).toBe("Dispatched");
    expect(obj(out.publisher)["@type"]).toBe("Organization");
    expect(obj(out.publisher).name).toBe("Dispatched");
    expect(obj(out.publisher).url).toBe("https://dispatched.finance");
  });

  it("uses Person author when authorName provided", () => {
    const out = article({ ...baseArgs, authorName: "Angelo Orru-Neto" });
    expect(obj(out.author)["@type"]).toBe("Person");
    expect(obj(out.author).name).toBe("Angelo Orru-Neto");
  });

  it("omits reviewedBy when no reviewerName supplied", () => {
    const out = article(baseArgs);
    expect(out.reviewedBy).toBeUndefined();
  });

  it("includes reviewedBy when reviewerName provided", () => {
    const out = article({ ...baseArgs, reviewerName: "Jane Reviewer" });
    expect(obj(out.reviewedBy)["@type"]).toBe("Person");
    expect(obj(out.reviewedBy).name).toBe("Jane Reviewer");
    expect(obj(out.reviewedBy).hasCredential).toBeUndefined();
  });

  it("includes hasCredential only when reviewerCredential provided alongside reviewerName", () => {
    const out = article({
      ...baseArgs,
      reviewerName: "Jane Reviewer",
      reviewerCredential: "CPA",
    });
    expect(obj(out.reviewedBy).hasCredential).toBe("CPA");
  });

  it("omits reviewedBy if reviewerCredential is provided without reviewerName", () => {
    const out = article({ ...baseArgs, reviewerCredential: "CPA" });
    expect(out.reviewedBy).toBeUndefined();
  });
});

describe("breadcrumbList builder", () => {
  it("produces valid BreadcrumbList schema with multiple items", () => {
    const out = breadcrumbList([
      { name: "Home", url: "https://dispatched.finance/" },
      { name: "Glossary", url: "https://dispatched.finance/glossary" },
      { name: "MC Number", url: "https://dispatched.finance/glossary/mc-number" },
    ]);
    assertContextAndType(out, "BreadcrumbList");
    const items = arr(out.itemListElement);
    expect(items).toHaveLength(3);
    items.forEach((item, i) => {
      const node = obj(item);
      expect(node["@type"]).toBe("ListItem");
      expect(node.position).toBe(i + 1);
    });
    expect(obj(items[0]).name).toBe("Home");
    expect(obj(items[2]).item).toBe("https://dispatched.finance/glossary/mc-number");
  });

  it("uses 1-based positions", () => {
    const out = breadcrumbList([{ name: "A", url: "https://a/" }]);
    expect(obj(arr(out.itemListElement)[0]).position).toBe(1);
  });

  it("handles single-item list", () => {
    const out = breadcrumbList([{ name: "Solo", url: "https://example.com/" }]);
    expect(arr(out.itemListElement)).toHaveLength(1);
  });

  it("handles empty list without crashing", () => {
    const out = breadcrumbList([]);
    assertContextAndType(out, "BreadcrumbList");
    expect(arr(out.itemListElement)).toHaveLength(0);
  });
});

describe("faqPage builder", () => {
  it("produces valid FAQPage schema with Q/A entries", () => {
    const out = faqPage([
      { q: "What is X?", a: "X is a thing." },
      { q: "How does Y work?", a: "Y works like so." },
    ]);
    assertContextAndType(out, "FAQPage");
    const entities = arr(out.mainEntity);
    expect(entities).toHaveLength(2);
    entities.forEach((entry) => {
      const node = obj(entry);
      expect(node["@type"]).toBe("Question");
      const answer = obj(node.acceptedAnswer);
      expect(answer["@type"]).toBe("Answer");
      expect(typeof answer.text).toBe("string");
    });
    expect(obj(entities[0]).name).toBe("What is X?");
    expect(obj(obj(entities[1]).acceptedAnswer).text).toBe("Y works like so.");
  });

  it("handles single QA", () => {
    const out = faqPage([{ q: "Only?", a: "Yes." }]);
    expect(arr(out.mainEntity)).toHaveLength(1);
  });

  it("handles empty list without crashing", () => {
    const out = faqPage([]);
    assertContextAndType(out, "FAQPage");
    expect(arr(out.mainEntity)).toHaveLength(0);
  });
});

describe("financialProduct builder", () => {
  it("produces valid FinancialProduct schema", () => {
    const out = financialProduct({
      name: "Working capital loan",
      description: "Working capital for owner-operators.",
      url: "https://dispatched.finance/trucking-working-capital",
      category: "BusinessLoan",
    });
    assertContextAndType(out, "FinancialProduct");
    expect(out.name).toBe("Working capital loan");
    expect(out.description).toBe("Working capital for owner-operators.");
    expect(out.url).toBe("https://dispatched.finance/trucking-working-capital");
    expect(out.category).toBe("BusinessLoan");
    expect(obj(out.provider)["@type"]).toBe("Organization");
    expect(obj(out.provider).name).toBe("Dispatched");
    expect(obj(out.provider).url).toBe("https://dispatched.finance");
  });

  it("includes provider on every payload", () => {
    const out = financialProduct({
      name: "X",
      description: "Y",
      url: "https://z/",
      category: "Loan",
    });
    expect(out.provider).toBeDefined();
  });
});

describe("organization builder", () => {
  it("produces a valid Organization schema", () => {
    const out = organization();
    assertContextAndType(out, "Organization");
    expect(out["@id"]).toBe("https://dispatched.finance/#organization");
    expect(out.name).toBe("Dispatched");
    expect(out.legalName).toBe("TCopyCats LLC");
    expect(out.url).toBe("https://dispatched.finance");
    expect(obj(out.logo)["@type"]).toBe("ImageObject");
    expect(obj(out.address)["@type"]).toBe("PostalAddress");
    expect(obj(out.address).addressCountry).toBe("US");
    expect(obj(out.contactPoint)["@type"]).toBe("ContactPoint");
    expect(arr(out.sameAs).length).toBeGreaterThan(0);
  });

  it("references the founder via @id", () => {
    const out = organization();
    expect(obj(out.founder)["@id"]).toBe(
      "https://dispatched.finance/about#angelo-orru-neto",
    );
  });

  it("contactPoint advertises English and Spanish", () => {
    const out = organization();
    const langs = arr(obj(out.contactPoint).availableLanguage);
    expect(langs).toContain("English");
    expect(langs).toContain("Spanish");
  });
});

describe("person builder", () => {
  const baseArgs = {
    name: "Angelo Orru-Neto",
    jobTitle: "Founder",
    description: "Founder description.",
    imageUrl: "https://dispatched.finance/founder.jpg",
  };

  it("produces a valid Person schema with required fields only", () => {
    const out = person(baseArgs);
    assertContextAndType(out, "Person");
    expect(out["@id"]).toBe("https://dispatched.finance/about#angelo-orru-neto");
    expect(out.name).toBe(baseArgs.name);
    expect(out.jobTitle).toBe(baseArgs.jobTitle);
    expect(out.description).toBe(baseArgs.description);
    expect(out.image).toBe(baseArgs.imageUrl);
    expect(out.url).toBe("https://dispatched.finance/about");
    expect(obj(out.worksFor)["@id"]).toBe("https://dispatched.finance/#organization");
  });

  it("omits alumniOf and sameAs when not provided", () => {
    const out = person(baseArgs);
    expect(out.alumniOf).toBeUndefined();
    expect(out.sameAs).toBeUndefined();
  });

  it("includes alumniOf when alumniOf provided", () => {
    const out = person({ ...baseArgs, alumniOf: "MIT" });
    expect(obj(out.alumniOf)["@type"]).toBe("EducationalOrganization");
    expect(obj(out.alumniOf).name).toBe("MIT");
  });

  it("includes sameAs when sameAs entries provided", () => {
    const out = person({
      ...baseArgs,
      sameAs: ["https://linkedin.com/in/x", "https://twitter.com/x"],
    });
    const same = arr(out.sameAs);
    expect(same).toHaveLength(2);
    expect(same[0]).toBe("https://linkedin.com/in/x");
  });

  it("omits sameAs when an empty array is provided", () => {
    const out = person({ ...baseArgs, sameAs: [] });
    expect(out.sameAs).toBeUndefined();
  });
});

describe("website builder", () => {
  it("produces a valid WebSite schema referencing the org @id", () => {
    const out = website();
    assertContextAndType(out, "WebSite");
    expect(out["@id"]).toBe("https://dispatched.finance/#website");
    expect(out.name).toBe("Dispatched");
    expect(out.url).toBe("https://dispatched.finance");
    expect(obj(out.publisher)["@id"]).toBe("https://dispatched.finance/#organization");
  });
});

describe("financialService builder", () => {
  it("produces a valid FinancialService schema with offer catalog", () => {
    const out = financialService();
    assertContextAndType(out, "FinancialService");
    expect(out["@id"]).toBe("https://dispatched.finance/trucking#service");
    expect(obj(out.parentOrganization)["@id"]).toBe(
      "https://dispatched.finance/#organization",
    );
    expect(obj(out.areaServed)["@type"]).toBe("Country");
    const catalog = obj(out.hasOfferCatalog);
    expect(catalog["@type"]).toBe("OfferCatalog");
    const offers = arr(catalog.itemListElement);
    expect(offers.length).toBeGreaterThan(0);
    offers.forEach((offer) => {
      const node = obj(offer);
      expect(node["@type"]).toBe("Offer");
      const service = obj(node.itemOffered);
      expect(service["@type"]).toBe("Service");
      expect(typeof service.name).toBe("string");
      expect(str(service.url).startsWith("https://dispatched.finance/")).toBe(true);
    });
  });

  it("does NOT emit the deprecated provider/serviceType/audience fields", () => {
    /* Schema.org validator flags `provider`, `serviceType`, and `audience`
       on FinancialService — the comments in the source explain why. Guard
       against regression by asserting they are absent. */
    const out = financialService();
    expect(out.provider).toBeUndefined();
    expect(out.serviceType).toBeUndefined();
    expect(out.audience).toBeUndefined();
  });
});

describe("insuranceAgency builder", () => {
  it("produces a valid InsuranceAgency schema", () => {
    const out = insuranceAgency();
    assertContextAndType(out, "InsuranceAgency");
    expect(out["@id"]).toBe("https://dispatched.finance/insurance#service");
    expect(out.name).toBe("Dispatched Trucking Insurance");
    expect(out.url).toBe("https://dispatched.finance/insurance");
    expect(obj(out.parentOrganization)["@id"]).toBe(
      "https://dispatched.finance/#organization",
    );
    expect(obj(out.areaServed)["@type"]).toBe("Country");
    expect(out.telephone).toBe("+1-307-317-0801");
  });

  it("does NOT emit the deprecated provider field", () => {
    const out = insuranceAgency();
    expect(out.provider).toBeUndefined();
  });
});

describe("howTo builder", () => {
  const baseArgs = {
    name: "From CDL to first funded truck",
    description: "Step-by-step path for first-time owner-operators.",
    steps: [
      { name: "Get authority", text: "File MC and DOT." },
      { name: "Get insurance", text: "Bind primary liability." },
      { name: "Pick truck", text: "Match the truck to the lane." },
    ],
  };

  it("produces a valid HowTo schema with 1-based step positions", () => {
    const out = howTo(baseArgs);
    assertContextAndType(out, "HowTo");
    expect(out.name).toBe(baseArgs.name);
    expect(out.description).toBe(baseArgs.description);
    const steps = arr(out.step);
    expect(steps).toHaveLength(3);
    steps.forEach((step, i) => {
      const node = obj(step);
      expect(node["@type"]).toBe("HowToStep");
      expect(node.position).toBe(i + 1);
      expect(typeof node.name).toBe("string");
      expect(typeof node.text).toBe("string");
    });
  });

  it("omits totalTime when not provided", () => {
    const out = howTo(baseArgs);
    expect(out.totalTime).toBeUndefined();
  });

  it("includes totalTime when supplied", () => {
    const out = howTo({ ...baseArgs, totalTime: "PT10D" });
    expect(out.totalTime).toBe("PT10D");
  });

  it("includes optional step url when present and omits when absent", () => {
    const out = howTo({
      ...baseArgs,
      steps: [
        { name: "A", text: "first", url: "https://dispatched.finance/a" },
        { name: "B", text: "second" },
      ],
    });
    const steps = arr(out.step);
    expect(obj(steps[0]).url).toBe("https://dispatched.finance/a");
    expect(obj(steps[1]).url).toBeUndefined();
  });

  it("handles empty step list", () => {
    const out = howTo({ ...baseArgs, steps: [] });
    expect(arr(out.step)).toHaveLength(0);
  });
});

describe("itemList builder", () => {
  const baseArgs = {
    name: "Best factoring 2026",
    description: "Ranked list of factoring providers.",
    items: [
      { name: "OTR Solutions", url: "https://otrsolutions.com" },
      { name: "Triumph", url: "https://triumph.com", description: "Non-recourse leader" },
    ],
  };

  it("produces a valid ItemList schema with 1-based positions and numberOfItems", () => {
    const out = itemList(baseArgs);
    assertContextAndType(out, "ItemList");
    expect(out.name).toBe(baseArgs.name);
    expect(out.description).toBe(baseArgs.description);
    expect(out.numberOfItems).toBe(2);
    const list = arr(out.itemListElement);
    expect(list).toHaveLength(2);
    list.forEach((it, i) => {
      const node = obj(it);
      expect(node["@type"]).toBe("ListItem");
      expect(node.position).toBe(i + 1);
      expect(typeof node.name).toBe("string");
      expect(typeof node.url).toBe("string");
    });
  });

  it("includes per-item description only when provided", () => {
    const out = itemList(baseArgs);
    const list = arr(out.itemListElement);
    expect(obj(list[0]).description).toBeUndefined();
    expect(obj(list[1]).description).toBe("Non-recourse leader");
  });

  it("handles empty items", () => {
    const out = itemList({ ...baseArgs, items: [] });
    expect(out.numberOfItems).toBe(0);
    expect(arr(out.itemListElement)).toHaveLength(0);
  });
});

describe("softwareApplication builder", () => {
  const baseArgs = {
    name: "Factoring fee calculator",
    description: "Compute factoring fee, advance, and effective APR.",
    url: "https://dispatched.finance/tools/factoring-fee",
    applicationCategory: "FinanceApplication" as const,
  };

  it("produces a valid SoftwareApplication schema with offer and provider", () => {
    const out = softwareApplication(baseArgs);
    assertContextAndType(out, "SoftwareApplication");
    expect(out.name).toBe(baseArgs.name);
    expect(out.description).toBe(baseArgs.description);
    expect(out.url).toBe(baseArgs.url);
    expect(out.applicationCategory).toBe("FinanceApplication");
    expect(out.operatingSystem).toBe("Web");
    const offer = obj(out.offers);
    expect(offer["@type"]).toBe("Offer");
    expect(offer.price).toBe("0");
    expect(offer.priceCurrency).toBe("USD");
    expect(obj(out.provider)["@type"]).toBe("Organization");
  });

  it("accepts each supported applicationCategory", () => {
    const cats = [
      "BusinessApplication",
      "FinanceApplication",
      "UtilitiesApplication",
    ] as const;
    cats.forEach((cat) => {
      const out = softwareApplication({ ...baseArgs, applicationCategory: cat });
      expect(out.applicationCategory).toBe(cat);
    });
  });
});

describe("definedTerm builder", () => {
  const baseArgs = {
    name: "MC Number",
    description: "Federal operating authority number issued by FMCSA.",
    url: "https://dispatched.finance/glossary/mc-number",
  };

  it("produces a valid DefinedTerm schema with required fields", () => {
    const out = definedTerm(baseArgs);
    assertContextAndType(out, "DefinedTerm");
    expect(out.name).toBe(baseArgs.name);
    expect(out.description).toBe(baseArgs.description);
    expect(out.url).toBe(baseArgs.url);
  });

  it("omits termCode and inDefinedTermSet when not provided", () => {
    const out = definedTerm(baseArgs);
    expect(out.termCode).toBeUndefined();
    expect(out.inDefinedTermSet).toBeUndefined();
  });

  it("includes termCode when supplied", () => {
    const out = definedTerm({ ...baseArgs, termCode: "MC#" });
    expect(out.termCode).toBe("MC#");
  });

  it("includes inDefinedTermSet when supplied", () => {
    const out = definedTerm({
      ...baseArgs,
      inDefinedTermSetUrl: "https://dispatched.finance/glossary",
    });
    expect(obj(out.inDefinedTermSet)["@type"]).toBe("DefinedTermSet");
    expect(obj(out.inDefinedTermSet).url).toBe("https://dispatched.finance/glossary");
  });
});

describe("definedTermSet builder", () => {
  const baseArgs = {
    name: "Dispatched Trucking Finance Glossary",
    description: "Glossary of trucking finance, compliance, and insurance terms.",
    url: "https://dispatched.finance/glossary",
    hasDefinedTerms: [
      { name: "MC Number", url: "https://dispatched.finance/glossary/mc-number" },
      { name: "DOT Number", url: "https://dispatched.finance/glossary/dot-number" },
    ],
  };

  it("produces a valid DefinedTermSet schema with referenced terms", () => {
    const out = definedTermSet(baseArgs);
    assertContextAndType(out, "DefinedTermSet");
    expect(out.name).toBe(baseArgs.name);
    expect(out.description).toBe(baseArgs.description);
    expect(out.url).toBe(baseArgs.url);
    const refs = arr(out.hasDefinedTerm);
    expect(refs).toHaveLength(2);
    refs.forEach((ref) => {
      const node = obj(ref);
      expect(node["@type"]).toBe("DefinedTerm");
      expect(typeof node.name).toBe("string");
      expect(typeof node.url).toBe("string");
    });
  });

  it("handles empty hasDefinedTerms", () => {
    const out = definedTermSet({ ...baseArgs, hasDefinedTerms: [] });
    expect(arr(out.hasDefinedTerm)).toHaveLength(0);
  });
});

describe("cross-builder invariants", () => {
  it("every builder emits @context as the schema.org URL", () => {
    const payloads: ReadonlyArray<JsonLdPayload> = [
      article({
        headline: "h",
        description: "d",
        url: "https://x/",
        datePublished: "2026-01-01",
        dateModified: "2026-01-01",
      }),
      breadcrumbList([{ name: "n", url: "https://x/" }]),
      faqPage([{ q: "q", a: "a" }]),
      financialProduct({ name: "n", description: "d", url: "https://x/", category: "c" }),
      organization(),
      person({ name: "n", jobTitle: "j", description: "d", imageUrl: "https://x/" }),
      website(),
      financialService(),
      insuranceAgency(),
      howTo({ name: "n", description: "d", steps: [] }),
      itemList({ name: "n", description: "d", items: [] }),
      softwareApplication({
        name: "n",
        description: "d",
        url: "https://x/",
        applicationCategory: "FinanceApplication",
      }),
      definedTerm({ name: "n", description: "d", url: "https://x/" }),
      definedTermSet({ name: "n", description: "d", url: "https://x/", hasDefinedTerms: [] }),
    ];
    for (const p of payloads) {
      expect(p["@context"]).toBe("https://schema.org");
      expect(typeof p["@type"]).toBe("string");
      expect(p["@type"].length).toBeGreaterThan(0);
    }
  });

  it("every builder return value JSON-serializes without cycles", () => {
    /* JsonLd component calls JSON.stringify on the payload. A cycle or a
       non-serializable value would break SSR. This guard ensures the
       builders only produce serializable graphs. */
    const payloads: ReadonlyArray<JsonLdPayload> = [
      article({
        headline: "h",
        description: "d",
        url: "https://x/",
        datePublished: "2026-01-01",
        dateModified: "2026-01-01",
        authorName: "A",
        reviewerName: "R",
        reviewerCredential: "C",
      }),
      breadcrumbList([{ name: "n", url: "https://x/" }]),
      faqPage([{ q: "q", a: "a" }]),
      organization(),
      person({
        name: "n",
        jobTitle: "j",
        description: "d",
        imageUrl: "https://x/",
        alumniOf: "U",
        sameAs: ["https://y/"],
      }),
      website(),
      financialService(),
      insuranceAgency(),
      howTo({
        name: "n",
        description: "d",
        totalTime: "PT1H",
        steps: [{ name: "s", text: "t", url: "https://x/" }],
      }),
      itemList({
        name: "n",
        description: "d",
        items: [{ name: "n", url: "https://x/", description: "d" }],
      }),
    ];
    for (const p of payloads) {
      expect(() => JSON.stringify(p)).not.toThrow();
      const serialized = JSON.stringify(p);
      expect(serialized.length).toBeGreaterThan(0);
      expect(serialized.includes("\"@context\":\"https://schema.org\"")).toBe(true);
    }
  });
});
