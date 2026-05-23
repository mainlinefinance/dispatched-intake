import { describe, expect, it } from "vitest";
import { metadata } from "@/app/trucking/page";
import {
  getAllFinancingProducts,
  getFinancingProductSlugs,
} from "@/lib/data/financingProducts";
import {
  article,
  breadcrumbList,
  faqPage,
  financialService,
} from "@/components/seo/JsonLd";

/* ===========================================================================
   /trucking pillar hub — schema + metadata + product-grid integrity.

   Scope: assert on the contracts we ship to crawlers (metadata, JSON-LD
   payloads) and on the data layer that powers the product grid. We do NOT
   render the page through React in this test — Nav/Footer pull in
   next/font and usePathname which need a full Next runtime to resolve;
   the page-level component is exercised by `next build` and the e2e
   smoke test instead.
   =========================================================================== */

describe("app/trucking/page metadata", () => {
  it("has a non-empty unique title", () => {
    expect(metadata.title).toBeTruthy();
    expect(typeof metadata.title).toBe("string");
    // Crawlers truncate long titles; we keep ours under the soft Google cap.
    expect((metadata.title as string).length).toBeLessThanOrEqual(80);
  });

  it("has a description under 200 chars (Google truncates around 155)", () => {
    expect(metadata.description).toBeTruthy();
    expect(typeof metadata.description).toBe("string");
    expect((metadata.description as string).length).toBeLessThanOrEqual(200);
  });

  it("sets canonical to /trucking", () => {
    expect(metadata.alternates?.canonical).toBe("/trucking");
  });

  it("emits openGraph + twitter blocks for the head term", () => {
    expect(metadata.openGraph).toBeTruthy();
    expect(metadata.openGraph?.title).toBeTruthy();
    expect(metadata.openGraph?.description).toBeTruthy();
    expect(metadata.twitter).toBeTruthy();
    // The Twitter type from next is a union; the card field only lives on
    // the summary/summary_large_image variants. Cast for read access.
    const twitter = metadata.twitter as { card?: string };
    expect(twitter.card).toBe("summary_large_image");
  });
});

describe("financingProducts data layer", () => {
  const products = getAllFinancingProducts();

  it("returns exactly 9 products", () => {
    expect(products).toHaveLength(9);
    expect(getFinancingProductSlugs()).toHaveLength(9);
  });

  it("every product has slug, name, oneLine, url, category, rangeLabel", () => {
    for (const p of products) {
      expect(p.slug.trim()).not.toBe("");
      expect(p.name.trim()).not.toBe("");
      expect(p.oneLine.trim()).not.toBe("");
      expect(p.url.trim()).not.toBe("");
      expect(p.category.trim()).not.toBe("");
      expect(p.rangeLabel.trim()).not.toBe("");
      // url is the canonical full path — must start with `/` and never
      // collide with the hub's own route.
      expect(p.url.startsWith("/")).toBe(true);
      expect(p.url).not.toBe("/trucking");
    }
  });

  it("urls are unique (no duplicate product cards in the grid)", () => {
    const urls = products.map((p) => p.url);
    expect(new Set(urls).size).toBe(urls.length);
  });

  it("slugs are unique", () => {
    const slugs = products.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("includes all nine canonical money-page paths", () => {
    const expected = [
      "/trucking-working-capital",
      "/equipment-financing",
      "/truck-repair-loans",
      "/factoring",
      "/semi-truck-financing",
      "/box-truck-financing",
      "/owner-operator-financing",
      "/new-authority-truck-financing",
      "/bad-credit-truck-financing",
    ];
    const urls = products.map((p) => p.url).sort();
    expect(urls).toEqual([...expected].sort());
  });
});

describe("/trucking JSON-LD payloads", () => {
  it("financialService() pins @id to the hub URL", () => {
    const fs = financialService();
    expect(fs["@type"]).toBe("FinancialService");
    expect(fs["@id"]).toBe("https://dispatched.finance/trucking#service");
  });

  it("breadcrumbList has exactly 2 items in the right order", () => {
    const bc = breadcrumbList([
      { name: "Home", url: "https://dispatched.finance/" },
      { name: "Trucking financing", url: "https://dispatched.finance/trucking" },
    ]);
    expect(bc["@type"]).toBe("BreadcrumbList");
    const items = bc.itemListElement as unknown as ReadonlyArray<{
      "@type": string;
      position: number;
      name: string;
      item: string;
    }>;
    expect(items).toHaveLength(2);
    expect(items[0].position).toBe(1);
    expect(items[0].item).toBe("https://dispatched.finance/");
    expect(items[1].position).toBe(2);
    expect(items[1].item).toBe("https://dispatched.finance/trucking");
  });

  it("article + faqPage payloads serialize to JSON without throwing", () => {
    const today = new Date().toISOString().slice(0, 10);
    const a = article({
      headline: "Trucking Financing: Products, Eligibility, and How to Pick the Right One",
      description: "Pillar overview.",
      url: "https://dispatched.finance/trucking",
      datePublished: today,
      dateModified: today,
    });
    const fp = faqPage([{ q: "Sample q?", a: "Sample a." }]);
    expect(() => JSON.stringify(a)).not.toThrow();
    expect(() => JSON.stringify(fp)).not.toThrow();
    expect(a["@type"]).toBe("Article");
    expect(fp["@type"]).toBe("FAQPage");
  });

  it("financialService OfferCatalog references all 9 product URLs we ship", () => {
    const fs = financialService();
    const catalog = fs.hasOfferCatalog as unknown as {
      itemListElement: ReadonlyArray<{
        itemOffered: { url: string };
      }>;
    };
    const catalogUrls = catalog.itemListElement
      .map((it) => it.itemOffered.url)
      .sort();
    const productUrls = getAllFinancingProducts()
      .map((p) => `https://dispatched.finance${p.url}`)
      .sort();
    expect(catalogUrls).toEqual(productUrls);
  });
});
