import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";

/* Regression: ISSUE-001 — /trucking returned 307 to /trucking-working-capital
   but was listed in the sitemap at priority 0.9, wasting Google crawl budget
   and triggering "Sitemap URL is redirected" warnings in Search Console.
   Found by /qa on 2026-05-06.
   Report: .gstack/qa-reports/qa-report-dispatched-finance-2026-05-06.md */

describe("sitemap", () => {
  const entries = sitemap();
  const urls = new Set(entries.map((e) => e.url));

  it("excludes /trucking — legacy URL that 307s to /trucking-working-capital", () => {
    expect(urls.has("https://dispatched.finance/trucking")).toBe(false);
  });

  it("includes the canonical /trucking-working-capital landing", () => {
    expect(urls.has("https://dispatched.finance/trucking-working-capital")).toBe(true);
  });

  it("includes every wave 2 SEO landing", () => {
    const required = [
      "/truck-repair-loans",
      "/box-truck-financing",
      "/bad-credit-truck-financing",
      "/owner-operator-financing",
      "/semi-truck-financing",
      "/equipment-financing",
      "/trucking-working-capital",
      "/invoice-factoring-for-truckers",
      "/new-authority-truck-financing",
    ];
    for (const path of required) {
      expect(urls.has(`https://dispatched.finance${path}`)).toBe(true);
    }
  });

  it("includes the calculators index and truck-repair fit estimator", () => {
    expect(urls.has("https://dispatched.finance/calculators")).toBe(true);
    expect(urls.has("https://dispatched.finance/calculators/truck-repair")).toBe(true);
  });
});
