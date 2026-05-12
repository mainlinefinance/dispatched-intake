import { describe, expect, it } from "vitest";
import {
  article,
  breadcrumbList,
  definedTerm,
  definedTermSet,
  faqPage,
  type JsonLdPayload,
} from "@/components/seo/JsonLd";
import {
  CATEGORY_LABELS,
  getAllTerms,
  getTermsByCategory,
} from "@/lib/data/glossary";
import {
  BLOG_TOPICS,
  getAllPosts,
  getPostsByTopic,
} from "@/lib/data/blog";

/* ===========================================================================
   Data-integrity + builder-roundtrip suite. The builder unit tests
   (jsonLdBuilders.test.ts) lock in shape; this suite confirms that every
   production data record — glossary terms and blog posts — passes through
   the relevant builder cleanly and yields a well-formed schema payload.

   Two failure modes this catches:
     1. A glossary or blog entry with a malformed field that breaks the
        builder at render time (e.g., empty description).
     2. An orphaned category or topic that exists on data but not in the
        CATEGORY_LABELS / BLOG_TOPICS lookup tables.

   Any production data drift gets caught at `npm run test` before it ships.
   =========================================================================== */

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

function assertValidPayload(payload: JsonLdPayload, type: string): void {
  expect(payload["@context"]).toBe("https://schema.org");
  expect(payload["@type"]).toBe(type);
}

const GLOSSARY_BASE = "https://dispatched.finance/glossary";
const BLOG_BASE = "https://dispatched.finance/blog";

describe("glossary data — through definedTerm builder", () => {
  const terms = getAllTerms();

  it("loads a meaningful corpus of terms", () => {
    expect(terms.length).toBeGreaterThan(50);
  });

  it("every term has a unique slug", () => {
    const slugs = terms.map((t) => t.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every term has a non-empty term + shortDefinition pair", () => {
    for (const t of terms) {
      expect(t.term.length).toBeGreaterThan(0);
      expect(t.shortDefinition.length).toBeGreaterThan(20);
    }
  });

  it("every term produces a valid DefinedTerm payload", () => {
    for (const t of terms) {
      const payload = definedTerm({
        name: t.term,
        description: t.shortDefinition,
        url: `${GLOSSARY_BASE}/${t.slug}`,
        ...(t.termCode ? { termCode: t.termCode } : {}),
        inDefinedTermSetUrl: GLOSSARY_BASE,
      });
      assertValidPayload(payload, "DefinedTerm");
      expect(payload.name).toBe(t.term);
      expect(payload.description).toBe(t.shortDefinition);
      expect(payload.url).toBe(`${GLOSSARY_BASE}/${t.slug}`);
      const inSet = obj(payload.inDefinedTermSet);
      expect(inSet["@type"]).toBe("DefinedTermSet");
      expect(inSet.url).toBe(GLOSSARY_BASE);
      if (t.termCode) {
        expect(payload.termCode).toBe(t.termCode);
      }
    }
  });
});

describe("glossary data — DefinedTermSet over the full corpus", () => {
  it("produces a valid DefinedTermSet payload referencing every term", () => {
    const terms = getAllTerms();
    const payload = definedTermSet({
      name: "Dispatched Trucking Finance Glossary",
      description:
        "Glossary of trucking finance, compliance, operations, and insurance terms.",
      url: GLOSSARY_BASE,
      hasDefinedTerms: terms.map((t) => ({
        name: t.term,
        url: `${GLOSSARY_BASE}/${t.slug}`,
      })),
    });
    assertValidPayload(payload, "DefinedTermSet");
    const refs = arr(payload.hasDefinedTerm);
    expect(refs).toHaveLength(terms.length);
    refs.forEach((ref) => {
      const node = obj(ref);
      expect(node["@type"]).toBe("DefinedTerm");
      expect(typeof node.name).toBe("string");
      expect(typeof node.url).toBe("string");
    });
  });
});

describe("glossary data — section integrity", () => {
  const terms = getAllTerms();

  it("every term has at least one section", () => {
    for (const t of terms) {
      expect(t.sections.length).toBeGreaterThan(0);
    }
  });

  it("every section has non-empty h2 and body", () => {
    for (const t of terms) {
      for (const s of t.sections) {
        expect(s.h2.length).toBeGreaterThan(0);
        expect(s.body.length).toBeGreaterThan(0);
      }
    }
  });
});

describe("glossary data — category integrity", () => {
  it("every term's category is represented in CATEGORY_LABELS", () => {
    const terms = getAllTerms();
    const allowed = Object.keys(CATEGORY_LABELS);
    for (const t of terms) {
      expect(allowed).toContain(t.category);
    }
  });

  it("every CATEGORY_LABELS key has a non-empty label", () => {
    for (const key of Object.keys(CATEGORY_LABELS) as Array<keyof typeof CATEGORY_LABELS>) {
      expect(CATEGORY_LABELS[key].length).toBeGreaterThan(0);
    }
  });

  it("getTermsByCategory returns every term across its groups", () => {
    const groups = getTermsByCategory();
    const flatCount = groups.reduce((acc, g) => acc + g.terms.length, 0);
    expect(flatCount).toBe(getAllTerms().length);
  });
});

describe("glossary data — relatedTerms point to real slugs", () => {
  /* Known-orphan allowlist. These cross-references exist in production
     data but point to glossary slugs that have not been authored yet.
     The orphan is harmless at render time (the related-terms UI no-ops
     on unknown slugs), but the test surface catches any NEW orphans
     introduced later. To resolve an entry, either add the missing term
     or remove the reference — then drop it from this set.

     - guaranteed-pay → "dedicated": stale reference; the related
       "dedicated lane" / "dedicated freight" term has not been authored.
       Surfaced 2026-05-11 by tests/jsonLdData.test.ts. */
  const KNOWN_ORPHANS: ReadonlySet<string> = new Set([
    "guaranteed-pay::dedicated",
  ]);

  it("every relatedTerm slug references an existing term (modulo known-orphans)", () => {
    const terms = getAllTerms();
    const known = new Set(terms.map((t) => t.slug));
    const newOrphans: string[] = [];
    for (const t of terms) {
      for (const rel of t.relatedTerms) {
        if (!known.has(rel)) {
          const key = `${t.slug}::${rel}`;
          if (!KNOWN_ORPHANS.has(key)) {
            newOrphans.push(key);
          }
        }
      }
    }
    expect(newOrphans).toEqual([]);
  });

  it("known-orphan allowlist entries are still real orphans", () => {
    /* Guard against the allowlist itself going stale. If a missing term
       gets authored, the entry should be removed from KNOWN_ORPHANS, not
       left silently masking what is now a healthy cross-reference. */
    const terms = getAllTerms();
    const known = new Set(terms.map((t) => t.slug));
    for (const key of KNOWN_ORPHANS) {
      const [from, missing] = key.split("::");
      const sourceTerm = terms.find((t) => t.slug === from);
      expect(sourceTerm, `allowlisted source term ${from} should exist`).toBeDefined();
      expect(
        sourceTerm?.relatedTerms.includes(missing),
        `allowlisted reference ${key} should still be in relatedTerms`,
      ).toBe(true);
      expect(
        known.has(missing),
        `allowlisted target ${missing} should still be missing — drop from allowlist if it has been authored`,
      ).toBe(false);
    }
  });
});

describe("blog data — through article builder", () => {
  const posts = getAllPosts();

  it("loads a meaningful corpus of posts", () => {
    expect(posts.length).toBeGreaterThan(5);
  });

  it("every post has a unique slug", () => {
    const slugs = posts.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every post produces a valid Article payload", () => {
    for (const p of posts) {
      const payload = article({
        headline: p.title,
        description: p.metaDescription,
        url: `${BLOG_BASE}/${p.slug}`,
        datePublished: p.publishedDate,
        dateModified: p.updatedDate,
      });
      assertValidPayload(payload, "Article");
      expect(payload.headline).toBe(p.title);
      expect(payload.description).toBe(p.metaDescription);
      expect(payload.url).toBe(`${BLOG_BASE}/${p.slug}`);
      expect(payload.datePublished).toBe(p.publishedDate);
      expect(payload.dateModified).toBe(p.updatedDate);
      expect(obj(payload.author)["@type"]).toBe("Organization");
      expect(obj(payload.publisher)["@type"]).toBe("Organization");
    }
  });

  it("every post date is ISO YYYY-MM-DD and dateModified >= datePublished", () => {
    const re = /^\d{4}-\d{2}-\d{2}$/;
    for (const p of posts) {
      expect(p.publishedDate).toMatch(re);
      expect(p.updatedDate).toMatch(re);
      expect(p.updatedDate >= p.publishedDate).toBe(true);
    }
  });
});

describe("blog data — section + content integrity", () => {
  const posts = getAllPosts();

  it("every post has at least one section", () => {
    for (const p of posts) {
      expect(p.sections.length).toBeGreaterThan(0);
    }
  });

  it("every section has a non-empty h2 and body", () => {
    for (const p of posts) {
      for (const s of p.sections) {
        expect(s.h2.length).toBeGreaterThan(0);
        expect(s.body.length).toBeGreaterThan(0);
      }
    }
  });

  it("every post has meta fields populated", () => {
    for (const p of posts) {
      expect(p.title.length).toBeGreaterThan(0);
      expect(p.metaTitle.length).toBeGreaterThan(0);
      expect(p.metaDescription.length).toBeGreaterThan(20);
      expect(p.subhead.length).toBeGreaterThan(0);
      expect(p.readTimeMinutes).toBeGreaterThan(0);
    }
  });
});

describe("blog data — topic integrity", () => {
  it("every post's topic is represented in BLOG_TOPICS", () => {
    const posts = getAllPosts();
    const allowed = Object.keys(BLOG_TOPICS);
    for (const p of posts) {
      expect(allowed).toContain(p.topic);
    }
  });

  it("every BLOG_TOPICS key has a non-empty label", () => {
    for (const key of Object.keys(BLOG_TOPICS) as Array<keyof typeof BLOG_TOPICS>) {
      expect(BLOG_TOPICS[key].length).toBeGreaterThan(0);
    }
  });

  it("getPostsByTopic returns every post across its groups", () => {
    const groups = getPostsByTopic();
    const flatCount = groups.reduce((acc, g) => acc + g.posts.length, 0);
    expect(flatCount).toBe(getAllPosts().length);
  });
});

describe("blog data — FAQ block produces valid FAQPage payload", () => {
  const postsWithFaqs = getAllPosts().filter((p) => p.faqs && p.faqs.length > 0);

  it("at least one post has an FAQ block (sanity check on the corpus)", () => {
    expect(postsWithFaqs.length).toBeGreaterThan(0);
  });

  it("every FAQ entry has non-empty q and a strings", () => {
    for (const p of postsWithFaqs) {
      for (const f of p.faqs ?? []) {
        expect(f.q.length).toBeGreaterThan(0);
        expect(f.a.length).toBeGreaterThan(0);
      }
    }
  });

  it("every post with FAQs produces a valid FAQPage payload", () => {
    for (const p of postsWithFaqs) {
      const payload = faqPage((p.faqs ?? []).map((f) => ({ q: f.q, a: f.a })));
      assertValidPayload(payload, "FAQPage");
      const entries = arr(payload.mainEntity);
      expect(entries.length).toBe((p.faqs ?? []).length);
      entries.forEach((entry) => {
        const node = obj(entry);
        expect(node["@type"]).toBe("Question");
        expect(obj(node.acceptedAnswer)["@type"]).toBe("Answer");
      });
    }
  });
});

describe("blog data — relatedPosts and relatedGlossary references resolve", () => {
  const posts = getAllPosts();
  const knownPostSlugs = new Set(posts.map((p) => p.slug));
  const knownTermSlugs = new Set(getAllTerms().map((t) => t.slug));

  it("every relatedPosts slug references a real post", () => {
    for (const p of posts) {
      for (const rel of p.relatedPosts) {
        expect(knownPostSlugs.has(rel)).toBe(true);
      }
    }
  });

  it("every relatedGlossary slug references a real glossary term", () => {
    for (const p of posts) {
      for (const rel of p.relatedGlossary) {
        expect(knownTermSlugs.has(rel)).toBe(true);
      }
    }
  });

  it("every relatedProducts url starts with /", () => {
    for (const p of posts) {
      for (const rp of p.relatedProducts) {
        expect(rp.url.startsWith("/")).toBe(true);
        expect(rp.label.length).toBeGreaterThan(0);
      }
    }
  });
});

describe("data — breadcrumbList works for representative production routes", () => {
  it("glossary term breadcrumb is well-formed for every term", () => {
    for (const t of getAllTerms()) {
      const payload = breadcrumbList([
        { name: "Home", url: "https://dispatched.finance/" },
        { name: "Glossary", url: GLOSSARY_BASE },
        { name: t.term, url: `${GLOSSARY_BASE}/${t.slug}` },
      ]);
      assertValidPayload(payload, "BreadcrumbList");
      const items = arr(payload.itemListElement);
      expect(items).toHaveLength(3);
      expect(obj(items[2]).name).toBe(t.term);
      expect(obj(items[2]).position).toBe(3);
    }
  });

  it("blog post breadcrumb is well-formed for every post", () => {
    for (const p of getAllPosts()) {
      const payload = breadcrumbList([
        { name: "Home", url: "https://dispatched.finance/" },
        { name: "Blog", url: BLOG_BASE },
        { name: p.title, url: `${BLOG_BASE}/${p.slug}` },
      ]);
      assertValidPayload(payload, "BreadcrumbList");
      const items = arr(payload.itemListElement);
      expect(items).toHaveLength(3);
      expect(obj(items[2]).name).toBe(p.title);
    }
  });
});
