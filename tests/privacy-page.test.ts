import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { metadata } from "@/app/(legal)/privacy/page";

const SOURCE = readFileSync(
  resolve(__dirname, "../app/(legal)/privacy/page.tsx"),
  "utf8",
);

/* ===========================================================================
   Privacy page contract.

   Two layers:
     - metadata: assert via the exported `metadata` Next constant.
     - content: assert via raw source-file string match. We can't render
       the page through React in vitest (Nav/Footer + next/font require a
       full Next runtime — see tests/app-trucking-hub.test.ts), so the
       load-bearing strings are pinned at the source level.
   =========================================================================== */

describe("privacy page metadata", () => {
  it("has a non-empty title containing 'Privacy'", () => {
    expect(metadata.title).toBeTruthy();
    expect(String(metadata.title)).toMatch(/privacy/i);
  });

  it("is excluded from search indexing", () => {
    const robots = metadata.robots as { index?: boolean; follow?: boolean };
    expect(robots?.index).toBe(false);
    expect(robots?.follow).toBe(false);
  });
});

describe("privacy page content invariants", () => {
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

  it("includes the CCPA 'do not sell' carve-out (replaces the deleted /do-not-sell page)", () => {
    expect(SOURCE).toMatch(/do not .{0,30}sell .{0,30}personal information/i);
  });

  it("explicitly addresses Texas (TDPSA) residents", () => {
    expect(SOURCE).toMatch(/TDPSA|Texas Data Privacy/i);
  });

  it("declares an effective date constant (not new Date())", () => {
    expect(SOURCE).toMatch(/EFFECTIVE_DATE\s*=\s*"\d{4}-\d{2}-\d{2}"/);
    expect(SOURCE).not.toMatch(/new Date\(\)/);
  });

  it("retains the [COUNSEL REVIEW] markers grep convention", () => {
    expect(SOURCE).toMatch(/\[COUNSEL REVIEW:/);
  });
});
