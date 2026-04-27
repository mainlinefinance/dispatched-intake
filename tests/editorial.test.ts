import { describe, expect, it } from "vitest";
import {
  getAllEditorial,
  type EditorialBody,
} from "@/lib/data/editorial";

/* ===========================================================================
   Editorial QA — runs as part of the regular vitest suite. Fails the build
   when any published editorial body fails the bar. Adding a new editorial
   entry that does not meet these rules is a CI break, not a runtime
   surprise.

   Rules:
     - ≥ 3 paragraphs, ≥ 200 total words
     - ≥ 3 sources with non-empty labels
     - reviewer + lastReviewedAt: BOTH or NEITHER. Half-set is inconsistent.
     - When set, lastReviewedAt must be within the last 18 months
   =========================================================================== */

const MIN_PARAGRAPHS = 3;
const MIN_TOTAL_WORDS = 200;
const MIN_SOURCES = 3;
const REVIEW_FRESHNESS_DAYS = 18 * 30; // ~18 months

function wordCount(s: string): number {
  return s.trim().split(/\s+/).filter(Boolean).length;
}

function totalWords(b: EditorialBody): number {
  return b.paragraphs.reduce((n, p) => n + wordCount(p), 0);
}

function entryLabel(b: EditorialBody): string {
  const dc = b.dotClassSlug ? `/${b.dotClassSlug}` : "";
  return `${b.productSlug}/${b.stateSlug}${dc}`;
}

function ageInDays(iso: string): number {
  const ms = Date.now() - new Date(iso).getTime();
  return Math.floor(ms / (1000 * 60 * 60 * 24));
}

describe("editorial bodies", () => {
  const all = getAllEditorial();

  it.each(all)(
    "$productSlug/$stateSlug — has at least 3 paragraphs and $MIN_TOTAL_WORDS+ words",
    (b) => {
      expect(
        b.paragraphs.length,
        `${entryLabel(b)}: paragraphs.length`,
      ).toBeGreaterThanOrEqual(MIN_PARAGRAPHS);
      expect(
        totalWords(b),
        `${entryLabel(b)}: word count = ${totalWords(b)}`,
      ).toBeGreaterThanOrEqual(MIN_TOTAL_WORDS);
    },
  );

  it.each(all)(
    "$productSlug/$stateSlug — has at least 3 sources with non-empty labels",
    (b) => {
      expect(
        b.sources.length,
        `${entryLabel(b)}: sources.length`,
      ).toBeGreaterThanOrEqual(MIN_SOURCES);
      for (const s of b.sources) {
        expect(
          s.label.trim().length,
          `${entryLabel(b)}: empty source label`,
        ).toBeGreaterThan(0);
      }
    },
  );

  it.each(all)(
    "$productSlug/$stateSlug — reviewer + lastReviewedAt are both-or-neither",
    (b) => {
      const r = b.reviewer !== null;
      const d = b.lastReviewedAt !== null;
      expect(
        r,
        `${entryLabel(b)}: reviewer=${r}, lastReviewedAt=${d}`,
      ).toBe(d);
    },
  );

  it.each(all)(
    "$productSlug/$stateSlug — when reviewed, lastReviewedAt is within 18 months",
    (b) => {
      if (!b.lastReviewedAt) return;
      const age = ageInDays(b.lastReviewedAt);
      expect(
        age,
        `${entryLabel(b)}: ${age} days old (limit ${REVIEW_FRESHNESS_DAYS})`,
      ).toBeLessThanOrEqual(REVIEW_FRESHNESS_DAYS);
    },
  );

  it.each(all)(
    "$productSlug/$stateSlug — headline is non-empty",
    (b) => {
      expect(b.headline.trim().length).toBeGreaterThan(0);
    },
  );
});
