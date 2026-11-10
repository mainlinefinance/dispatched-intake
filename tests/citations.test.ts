import { describe, expect, it } from "vitest";
import { getAllPosts } from "@/lib/data/blog";
import { getAllTerms } from "@/lib/data/glossary";
import {
  ALL_CITATIONS,
  citationsForGlossaryTerm,
  citationsForPost,
} from "@/lib/seo/citations";

describe("citation catalog", () => {
  it("holds only https links to non-commercial primary sources", () => {
    for (const c of ALL_CITATIONS) {
      expect(c.url).toMatch(/^https:\/\//);
      expect(c.name.length).toBeGreaterThan(3);
      expect(c.publisher.length).toBeGreaterThan(2);
      expect(new URL(c.url).hostname).toMatch(/\.(gov|org|edu)$/);
    }
    const urls = ALL_CITATIONS.map((c) => c.url);
    expect(new Set(urls).size).toBe(urls.length);
  });
});

describe("every editorial page is cited", () => {
  it.each(getAllTerms().map((t) => [t.slug, t] as const))(
    "glossary/%s has 2–4 distinct sources",
    (_slug, term) => {
      const cites = citationsForGlossaryTerm(term);
      expect(cites.length).toBeGreaterThanOrEqual(2);
      expect(cites.length).toBeLessThanOrEqual(4);
      expect(new Set(cites.map((c) => c.url)).size).toBe(cites.length);
    },
  );

  it.each(getAllPosts().map((p) => [p.slug, p] as const))(
    "blog/%s has 2–4 distinct sources",
    (_slug, post) => {
      const cites = citationsForPost(post);
      expect(cites.length).toBeGreaterThanOrEqual(2);
      expect(cites.length).toBeLessThanOrEqual(4);
    },
  );

  it("matches a term to the source that governs it", () => {
    const names = (slug: string) =>
      citationsForGlossaryTerm(getAllTerms().find((t) => t.slug === slug)!).map(
        (c) => c.publisher,
      );
    expect(names("ifta")).toContain("International Fuel Tax Association, Inc.");
    expect(names("irp")).toContain("International Registration Plan, Inc.");
    expect(names("ucr")).toContain("UCR Plan");
  });
});
