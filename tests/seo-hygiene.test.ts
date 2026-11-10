import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import robots from "@/app/robots";
import dates from "@/lib/seo/contentDates.json";
import { contentDatesForPath } from "@/lib/seo/contentDates";

/* Regression guards for the 2026-11 SEO/AEO audit. Each one pins a defect
   that was live and is cheap to reintroduce. */

const ROOT = resolve(__dirname, "..");

function pageFiles(dir: string): string[] {
  return readdirSync(join(ROOT, dir)).flatMap((name) => {
    const rel = `${dir}/${name}`;
    if (statSync(join(ROOT, rel)).isDirectory()) return pageFiles(rel);
    return name === "page.tsx" ? [rel] : [];
  });
}

const PAGES = pageFiles("app");

describe("robots.txt", () => {
  it("lets crawlers fetch /_next/ (CSS, JS and optimized images)", () => {
    const rules = [robots().rules].flat();
    const disallowed = rules.flatMap((r) => [r.disallow ?? []].flat());
    expect(disallowed.some((d) => d.startsWith("/_next"))).toBe(false);
  });
});

describe("content dates", () => {
  it("no page stamps itself with the build date", () => {
    const offenders = PAGES.filter((f) =>
      /new Date\(\)\.toISOString\(\)/.test(readFileSync(join(ROOT, f), "utf8")),
    );
    expect(offenders).toEqual([]);
  });

  it("every page file has an entry, and only real ISO dates", () => {
    expect(PAGES.filter((f) => !(f in dates))).toEqual([]);
    for (const d of Object.values(dates)) {
      expect(d.published).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(d.modified).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(d.published <= d.modified).toBe(true);
    }
  });

  it("resolves URL paths to the page or template that serves them", () => {
    expect(contentDatesForPath("/")).toEqual(dates["app/page.tsx"]);
    expect(contentDatesForPath("/factoring")).toEqual(
      dates["app/factoring/page.tsx"],
    );
    expect(contentDatesForPath("/lenders/texas/houston")).toEqual(
      dates["app/lenders/[state]/[city]/page.tsx"],
    );
    // A static route wins over a dynamic sibling.
    expect(contentDatesForPath("/insurance/tools")).toEqual(
      dates["app/insurance/tools/page.tsx"],
    );
    expect(contentDatesForPath("/privacy")).toEqual(
      dates["app/(legal)/privacy/page.tsx"],
    );
    expect(contentDatesForPath("/no/such/page/at/all")).toBeNull();
  });
});

describe("share image", () => {
  it("every page that defines openGraph or twitter lists an image", () => {
    const own = new Set(["app/carriers/[carrier]", "app/insurance/[product]/[state]"]);
    const offenders: string[] = [];
    for (const f of PAGES) {
      if (own.has(f.replace(/\/page\.tsx$/, ""))) continue; // file-based image
      const src = readFileSync(join(ROOT, f), "utf8");
      if (src.includes("withSocial(")) continue;
      for (const m of src.matchAll(/^([ \t]*)(?:openGraph|twitter): \{$/gm)) {
        const end = src.indexOf(`\n${m[1]}}`, m.index);
        if (!src.slice(m.index, end).includes("images:")) offenders.push(f);
      }
    }
    expect(offenders).toEqual([]);
  });
});

describe("legacy /trucking-loans family", () => {
  it("is gone from the app and redirected to /lenders", () => {
    expect(PAGES.filter((f) => f.startsWith("app/trucking-loans"))).toEqual([]);
    const config = readFileSync(join(ROOT, "next.config.ts"), "utf8");
    expect(config).toContain('source: "/trucking-loans/:state/:city"');
    expect(config).toContain('destination: "/lenders/:state/:city"');
  });
});

describe("llms.txt", () => {
  it("carries no retired vendor, credit floor or redirected URL", () => {
    const llms = readFileSync(join(ROOT, "public/llms.txt"), "utf8");
    for (const stale of ["Lendflow", "FICO 500", "invoice-factoring-for-truckers"]) {
      expect(llms).not.toContain(stale);
    }
  });
});
