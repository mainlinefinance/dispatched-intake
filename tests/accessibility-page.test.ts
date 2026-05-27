import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { metadata } from "@/app/accessibility/page";

const SOURCE = readFileSync(
  resolve(__dirname, "../app/accessibility/page.tsx"),
  "utf8",
);

const SITEMAP = readFileSync(
  resolve(__dirname, "../app/sitemap.ts"),
  "utf8",
);

const FOOTER = readFileSync(
  resolve(__dirname, "../components/landing/Footer.tsx"),
  "utf8",
);

/* ===========================================================================
   Accessibility page contract.

   Mirrors the privacy/terms test approach: metadata via the exported
   constant, content via raw source-file string match (rendering the page
   through React in vitest needs the full Next runtime — same constraint
   that privacy-page.test.ts works around).

   The footer + sitemap assertions live here too so that a future "trust
   cleanup" PR that strips the Accessibility link or the sitemap entry
   trips this guard instead of silently regressing the discoverability
   half of the work.
   =========================================================================== */

describe("accessibility page metadata", () => {
  it("has a title naming the page", () => {
    expect(metadata.title).toBeTruthy();
    expect(String(metadata.title)).toMatch(/accessibility/i);
  });

  it("is indexable (no robots noindex)", () => {
    // Unlike privacy/terms, this is a public commitment we want findable.
    const robots = metadata.robots as { index?: boolean } | undefined;
    expect(robots?.index).not.toBe(false);
  });

  it("declares a canonical URL", () => {
    expect(metadata.alternates?.canonical).toBe("/accessibility");
  });
});

describe("accessibility page content invariants", () => {
  it("names WCAG 2.2 Level AA as the conformance target", () => {
    expect(SOURCE).toMatch(/WCAG\s*2\.2[^.]{0,40}AA/i);
  });

  it("uses the dispatched.finance feedback address (not the legal/privacy address)", () => {
    expect(SOURCE).toContain("angelo@dispatched.finance");
  });

  it("names the responsible legal entity", () => {
    expect(SOURCE).toMatch(/Dispatched, Inc\./);
  });

  it("declares a last-reviewed date constant (not new Date())", () => {
    expect(SOURCE).toMatch(/LAST_REVIEWED\s*=\s*"\d{4}-\d{2}-\d{2}"/);
    expect(SOURCE).not.toMatch(/new Date\(\)/);
  });

  it("has an honest 'known gaps' section (not just an aspirational claim)", () => {
    expect(SOURCE).toMatch(/id="known-gaps"/);
    expect(SOURCE).toMatch(/Known gaps/);
  });

  it("uses a single h1", () => {
    const h1Count = (SOURCE.match(/<h1[\s>]/g) ?? []).length;
    expect(h1Count).toBe(1);
  });
});

describe("accessibility page discoverability", () => {
  it("is listed in the XML sitemap", () => {
    expect(SITEMAP).toContain("/accessibility");
  });

  it("is linked from the footer (regression guard against another Soon-style purge)", () => {
    expect(FOOTER).toContain("/accessibility");
    expect(FOOTER).toMatch(/>Accessibility</);
  });
});
