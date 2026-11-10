import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { APPLY_HREF, CTA_LABEL, ctaPlacement } from "@/components/landing/cta";

/* ===========================================================================
   Home page funnel contract.

   Source-string assertions, same approach as the privacy / accessibility
   page tests (rendering a Next page through React in vitest needs the full
   Next runtime).

   Two things are pinned here:
   - the home never states a different fact than /apply does about the same
     application (shortlist size, what is asked for up front);
   - a visitor is never more than one section away from the apply CTA, and
     the insurance cross-sell stays below the close of the funding pitch.
   =========================================================================== */

function source(path: string): string {
  return readFileSync(resolve(__dirname, "..", path), "utf8");
}

const HOME = source("app/page.tsx");
const HOW_IT_WORKS = source("components/landing/HowItWorks.tsx");
const DECLINE = source("components/landing/DeclineSection.tsx");
const PRODUCT_CARDS = source("components/landing/ProductCards.tsx");
const APPLY = source("app/apply/page.tsx");

describe("home copy agrees with /apply", () => {
  it("quotes the same lender shortlist size", () => {
    expect(APPLY).toContain("shortlist of 2 to 4 matched lenders");
    expect(HOW_IT_WORKS).toContain("2–4 matched lenders");
    expect(HOW_IT_WORKS).not.toMatch(/3\s*[–-]\s*5 matched lenders/);
  });

  it("does not ask for a bank account or documents in step 1", () => {
    // /apply: statements are uploaded after the soft-approval step.
    expect(APPLY).toContain("No document uploads required at the soft-pull stage");
    const stepOne = HOW_IT_WORKS.slice(
      HOW_IT_WORKS.indexOf('label: "Application"'),
      HOW_IT_WORKS.indexOf('n: "2"'),
    );
    expect(stepOne).toContain("No document uploads to start");
    expect(stepOne).not.toMatch(/bank account/i);
  });
});

describe("apply CTA placement on the home", () => {
  it("every placement shares one label and one destination", () => {
    expect(CTA_LABEL).toBe("See my funding options");
    expect(APPLY_HREF).toBe("/apply");
    expect(ctaPlacement("home-hero")).toEqual({
      "data-ph-capture-attribute-cta": "home-hero",
    });
  });

  it("the persuasion sections each end on an apply CTA", () => {
    expect(HOW_IT_WORKS).toContain('<SectionCta');
    expect(HOW_IT_WORKS).toContain('placement="home-how-it-works"');
    expect(DECLINE).toContain('<SectionCta');
    expect(DECLINE).toContain('placement="home-decline"');
  });

  it("the page closes on the apply CTA, with insurance below it", () => {
    const order = ["<Hero />", "<FAQ />", "<ClosingCta />", "<InsuranceCrossSell />"].map(
      (tag) => HOME.indexOf(tag),
    );
    expect(order.every((i) => i !== -1)).toBe(true);
    expect([...order].sort((a, b) => a - b)).toEqual(order);
    expect(HOME).toContain("<HomeStickyCta />");
  });

  it("the product cards do not send funding visitors to insurance", () => {
    expect(PRODUCT_CARDS).not.toContain('href: "/insurance"');
  });
});
