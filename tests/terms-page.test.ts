import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { metadata } from "@/app/(legal)/terms/page";

const SOURCE = readFileSync(
  resolve(__dirname, "../app/(legal)/terms/page.tsx"),
  "utf8",
);

/* ===========================================================================
   Terms of service contract.

   See tests/privacy-page.test.ts header for the two-layer pattern
   (metadata via export, content via source-file grep — page-level React
   render is blocked by next/font in vitest).
   =========================================================================== */

describe("terms page metadata", () => {
  it("has a non-empty title containing 'Terms'", () => {
    expect(metadata.title).toBeTruthy();
    expect(String(metadata.title)).toMatch(/terms/i);
  });

  it("is excluded from search indexing", () => {
    const robots = metadata.robots as { index?: boolean; follow?: boolean };
    expect(robots?.index).toBe(false);
    expect(robots?.follow).toBe(false);
  });
});

describe("terms page content invariants", () => {
  it("names the legal entity", () => {
    expect(SOURCE).toMatch(/Dispatched, Inc\./);
    expect(SOURCE).toMatch(/Wyoming corporation/);
  });

  it("lists the mailing address used everywhere on the site", () => {
    expect(SOURCE).toContain("12895 Josey Lane #124");
    expect(SOURCE).toContain("Dallas, TX 75234");
  });

  it("lists the legal contact email", () => {
    expect(SOURCE).toContain("angelo@mainline.finance");
  });

  it("states Dispatched is a matching service and not a lender", () => {
    expect(SOURCE).toMatch(/not a lender/i);
    expect(SOURCE).toMatch(/matching service/i);
  });

  it("declares Texas governing law and Dallas County venue", () => {
    expect(SOURCE).toMatch(/Texas law/i);
    expect(SOURCE).toMatch(/Dallas County/i);
  });

  it("includes the no-class-actions clause", () => {
    expect(SOURCE).toMatch(/class action/i);
  });

  it("declares an effective date constant (not new Date())", () => {
    expect(SOURCE).toMatch(/EFFECTIVE_DATE\s*=\s*"\d{4}-\d{2}-\d{2}"/);
    expect(SOURCE).not.toMatch(/new Date\(\)/);
  });
});
