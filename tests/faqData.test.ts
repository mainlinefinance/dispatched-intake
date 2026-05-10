import { describe, expect, it } from "vitest";
import { homepageFaqs } from "@/components/landing/FAQ.data";
import { faqPage } from "@/components/seo/JsonLd";

/* ===========================================================================
   FAQ data integrity — every homepage FAQ must have a non-empty question,
   non-empty aText (powers FAQPage JSON-LD), and a renderable aJsx (powers
   the visible accordion). Schema and visible content must stay in lockstep:
   Google penalizes meaningful divergence between FAQPage schema and the
   FAQ block on page.

   Also asserts the JSON-LD payload that ships in <head> is well-formed.
   =========================================================================== */

const MIN_QUESTION_WORDS = 3;
const MIN_ANSWER_WORDS = 15;

function wordCount(s: string): number {
  return s.trim().split(/\s+/).filter(Boolean).length;
}

describe("homepageFaqs", () => {
  it("has at least one entry", () => {
    expect(homepageFaqs.length).toBeGreaterThan(0);
  });

  it.each(homepageFaqs.map((f, i) => [i, f] as const))(
    "entry #%i has populated q/aText/aJsx",
    (_i, f) => {
      expect(f.q.trim()).not.toBe("");
      expect(wordCount(f.q)).toBeGreaterThanOrEqual(MIN_QUESTION_WORDS);
      expect(f.aText.trim()).not.toBe("");
      expect(wordCount(f.aText)).toBeGreaterThanOrEqual(MIN_ANSWER_WORDS);
      expect(f.aJsx).toBeTruthy();
    },
  );

  it("question texts are unique", () => {
    const qs = homepageFaqs.map((f) => f.q.trim().toLowerCase());
    expect(new Set(qs).size).toBe(qs.length);
  });
});

describe("faqPage(homepageFaqs)", () => {
  const payload = faqPage(
    homepageFaqs.map((f) => ({ q: f.q, a: f.aText })),
  );

  it("emits a FAQPage with one Question per entry", () => {
    expect(payload["@type"]).toBe("FAQPage");
    expect(Array.isArray(payload.mainEntity)).toBe(true);
    const main = payload.mainEntity as ReadonlyArray<unknown>;
    expect(main).toHaveLength(homepageFaqs.length);
  });

  it("each Question has a populated acceptedAnswer.text", () => {
    const main = payload.mainEntity as unknown as ReadonlyArray<{
      "@type": string;
      name: string;
      acceptedAnswer: { "@type": string; text: string };
    }>;
    for (const q of main) {
      expect(q["@type"]).toBe("Question");
      expect(q.name.trim()).not.toBe("");
      expect(q.acceptedAnswer["@type"]).toBe("Answer");
      expect(q.acceptedAnswer.text.trim()).not.toBe("");
    }
  });

  it("serializes to JSON without throwing (JsonLd contract)", () => {
    expect(() => JSON.stringify(payload)).not.toThrow();
  });
});
