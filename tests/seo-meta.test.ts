import { describe, expect, it } from "vitest";
import { getAllTerms } from "@/lib/data/glossary";
import {
  DESCRIPTION_MAX,
  TITLE_MAX,
  fitDescription,
  fitMeta,
  fitTitle,
} from "@/lib/seo/meta";

describe("fitTitle", () => {
  it("leaves a title that fits alone", () => {
    expect(fitTitle("Trucking Lenders Directory 2026 | Dispatched")).toBe(
      "Trucking Lenders Directory 2026 | Dispatched",
    );
  });

  it("drops the brand first, then further qualifiers", () => {
    expect(
      fitTitle(
        "Hazmat Endorsement (H endorsement) — Trucking Glossary | Dispatched",
      ),
    ).toBe("Hazmat Endorsement (H endorsement) — Trucking Glossary");
    expect(
      fitTitle(
        "Sentry Insurance vs Nationwide Trucking — 2026 Specialty Carriers Compared | Dispatched",
      ),
    ).toBe("Sentry Insurance vs Nationwide Trucking");
    expect(
      fitTitle(
        "PADD 4 — Rocky Mountain Diesel Prices This Week — Dispatched Pulse",
      ),
    ).toBe("PADD 4 — Rocky Mountain Diesel Prices This Week");
  });

  it("never drops the subject, even when it alone is too long", () => {
    const subject = "A".repeat(80);
    expect(fitTitle(`${subject} | Dispatched`)).toBe(subject);
  });
});

describe("fitDescription", () => {
  it("leaves a description that fits alone", () => {
    const text = "Short and complete.";
    expect(fitDescription(text)).toBe(text);
  });

  it("keeps whole sentences when they fit", () => {
    const text =
      "Stop guessing. Calculate your real cost per mile in 8 steps, including fuel, fixed costs, factoring, depreciation, and deadhead. Plus the diagnostic number that tells you if you're profitable.";
    expect(fitDescription(text)).toBe(
      "Stop guessing. Calculate your real cost per mile in 8 steps, including fuel, fixed costs, factoring, depreciation, and deadhead.",
    );
  });

  it("does not treat a decimal or an abbreviation as a sentence end", () => {
    const text =
      "Accepting a $1.80/mile load to fill the truck looks like revenue for U.S. carriers on a slow week, and the math behind that single decision says it is a loss once deadhead and opportunity cost are counted in full.";
    const fitted = fitDescription(text);
    expect(fitted.endsWith("…")).toBe(true);
    expect(fitted.length).toBeLessThanOrEqual(DESCRIPTION_MAX);
    expect(text.startsWith(fitted.slice(0, -1))).toBe(true);
    // Cut between words, not inside one.
    expect(text[fitted.length - 1]).toBe(" ");
  });

  it("falls back to a word cut when the first sentence is too short to stand alone", () => {
    const text = `Yes. ${"word ".repeat(60)}`.trim();
    const fitted = fitDescription(text);
    expect(fitted.endsWith("…")).toBe(true);
    expect(fitted.length).toBeLessThanOrEqual(DESCRIPTION_MAX);
  });

  it("fits every glossary definition", () => {
    for (const term of getAllTerms()) {
      const fitted = fitDescription(term.shortDefinition);
      expect(fitted.length).toBeLessThanOrEqual(DESCRIPTION_MAX);
      expect(fitted.length).toBeGreaterThan(40);
    }
  });
});

describe("fitMeta", () => {
  it("fits title and description and leaves the share copies alone", () => {
    const long = "word ".repeat(50).trim();
    const meta = fitMeta({
      title: `${"T".repeat(55)} | Dispatched`,
      description: long,
      openGraph: { title: "og", description: long },
    });
    expect((meta.title as string).length).toBeLessThanOrEqual(TITLE_MAX);
    expect((meta.description as string).length).toBeLessThanOrEqual(
      DESCRIPTION_MAX,
    );
    expect(meta.openGraph).toEqual({ title: "og", description: long });
  });
});
