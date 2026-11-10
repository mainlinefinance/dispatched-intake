import { describe, expect, it } from "vitest";
import {
  buildMainlineWidgetSrc,
  EMPTY_ADS_ATTRIBUTION,
  persistAdsAttribution,
  type AdsStorage,
} from "@/lib/ads/attribution";

function memoryStorage(): AdsStorage & { raw: () => string | null } {
  let value: string | null = null;
  return {
    read: () => value,
    write: (next) => {
      value = next;
    },
    raw: () => value,
  };
}

const LANDING =
  "https://dispatched.finance/semi-truck-financing?gclid=CLICK123456&gbraid=GBRAID123456&utm_source=google&utm_medium=cpc&utm_campaign=semi&utm_term=truck&utm_content=ad";

describe("ads query persistence", () => {
  it("keeps gclid and utm after a later page drops the query", () => {
    const storage = memoryStorage();
    persistAdsAttribution(LANDING, "https://www.google.com/aclk", storage);
    const stored = persistAdsAttribution(
      "https://dispatched.finance/apply?useCase=equipment",
      "https://dispatched.finance/semi-truck-financing",
      storage,
    );

    expect(stored.gclid).toBe("CLICK123456");
    expect(stored.gbraid).toBe("GBRAID123456");
    expect(stored.utm_source).toBe("google");
    expect(stored.utm_medium).toBe("cpc");
    expect(stored.utm_campaign).toBe("semi");
    expect(stored.utm_term).toBe("truck");
    expect(stored.utm_content).toBe("ad");
    expect(stored.referrer).toBe("https://www.google.com/aclk");
    expect(stored.landingUrl).toContain("/semi-truck-financing");
    expect(stored.landingUrl).toContain("gclid=CLICK123456");

    const src = buildMainlineWidgetSrc({
      widgetHost: "mainline.tryoption.ai",
      attribution: stored,
    });
    expect(src).toBeTruthy();
    const url = new URL(src!);
    expect(url.origin).toBe("https://mainline.tryoption.ai");
    expect(url.pathname).toBe("/w/dispatched-finance");
    expect(url.searchParams.get("variant")).toBe("standard");
    expect(url.searchParams.get("utm_source")).toBe("google");
    expect(url.searchParams.get("utm_medium")).toBe("cpc");
    expect(url.searchParams.get("utm_campaign")).toBe("semi");
    expect(url.searchParams.get("utm_term")).toBe("truck");
    expect(url.searchParams.get("utm_content")).toBe("ad");
    expect(url.searchParams.get("gclid")).toBe("CLICK123456");
    expect(url.searchParams.get("gbraid")).toBe("GBRAID123456");
    expect(url.searchParams.get("referrer")).toBe("https://www.google.com/aclk");
    const page = new URL(url.searchParams.get("page")!);
    expect(page.pathname).toBe("/semi-truck-financing");
    expect(page.searchParams.get("gclid")).toBe("CLICK123456");
    expect(page.searchParams.get("utm_source")).toBe("google");
  });

  it("replaces the utm snapshot when a later landing is tagged, and keeps an older gclid", () => {
    const storage = memoryStorage();
    persistAdsAttribution(LANDING, "https://www.google.com/", storage);
    const stored = persistAdsAttribution(
      "https://dispatched.finance/factoring?utm_source=newsletter&utm_medium=email",
      "https://example.com/story",
      storage,
    );
    expect(stored.gclid).toBe("CLICK123456");
    expect(stored.utm_source).toBe("newsletter");
    expect(stored.utm_medium).toBe("email");
    expect(stored.utm_campaign).toBeNull();
    expect(stored.referrer).toBe("https://www.google.com/");
  });

  it("drops an over-long utm value instead of truncating it", () => {
    const storage = memoryStorage();
    const stored = persistAdsAttribution(
      `https://dispatched.finance/apply?utm_source=${"a".repeat(101)}&gclid=CLICK123456`,
      null,
      storage,
    );
    expect(stored.utm_source).toBeNull();
    expect(stored.gclid).toBe("CLICK123456");
  });

  it("does not write storage for a page with no click id or campaign parameter", () => {
    const storage = memoryStorage();
    let writes = 0;
    const counting = {
      read: () => storage.raw(),
      write: (value: string) => {
        writes += 1;
        storage.write(value);
      },
    };
    persistAdsAttribution(
      "https://dispatched.finance/factoring",
      "https://www.google.com/",
      counting,
    );
    expect(writes).toBe(0);
  });

  it("writes the campaign once and does not refresh it on a later untagged page", () => {
    const storage = memoryStorage();
    let writes = 0;
    const counting = {
      read: () => storage.raw(),
      write: (value: string) => {
        writes += 1;
        storage.write(value);
      },
    };
    persistAdsAttribution(LANDING, "https://www.google.com/aclk", counting);
    persistAdsAttribution(
      "https://dispatched.finance/apply",
      "https://dispatched.finance/semi-truck-financing",
      counting,
    );
    expect(writes).toBe(1);
  });

  it("carries quick-start answers on the frame without touching attribution", () => {
    const storage = memoryStorage();
    persistAdsAttribution(LANDING, "https://www.google.com/aclk", storage);
    // The hero form sends the operator to /apply with the answers in the URL.
    const stored = persistAdsAttribution(
      "https://dispatched.finance/apply?fundingAmount=25k-100k&revenue=50k-100k",
      "https://dispatched.finance/",
      storage,
    );
    const plain = buildMainlineWidgetSrc({
      widgetHost: "mainline.tryoption.ai",
      attribution: stored,
    });
    const prefilled = buildMainlineWidgetSrc({
      widgetHost: "mainline.tryoption.ai",
      attribution: stored,
      prefill: { fundingAmount: "25k-100k", revenue: "50k-100k" },
    });
    const url = new URL(prefilled!);
    expect(url.searchParams.get("prefill_loan_amount_range")).toBe(
      "$25K–$100K",
    );
    expect(url.searchParams.get("prefill_revenue")).toBe("$50K–$100K");

    // Everything the frame carried before is byte-identical; the answers
    // are appended and never folded into the landing URL the lead stores.
    url.searchParams.delete("prefill_loan_amount_range");
    url.searchParams.delete("prefill_revenue");
    expect(url.toString()).toBe(plain);
    const page = new URL(url.searchParams.get("page")!);
    expect(page.pathname).toBe("/semi-truck-financing");
    expect(page.search).not.toContain("fundingAmount");
    expect(page.search).not.toContain("revenue=");
  });

  it("adds no prefill keys when nothing was answered", () => {
    const storage = memoryStorage();
    const stored = persistAdsAttribution(LANDING, null, storage);
    const plain = buildMainlineWidgetSrc({
      widgetHost: "mainline.tryoption.ai",
      attribution: stored,
    });
    expect(
      buildMainlineWidgetSrc({
        widgetHost: "mainline.tryoption.ai",
        attribution: stored,
        prefill: { monthlyRevenue: null, timeInBusiness: null },
      }),
    ).toBe(plain);
    expect(plain).not.toContain("prefill_");
  });

  it("ignores a same-site referrer and a widget host that is not a hostname", () => {
    const storage = memoryStorage();
    const stored = persistAdsAttribution(
      "https://dispatched.finance/apply?gclid=CLICK123456",
      "https://dispatched.finance/factoring",
      storage,
    );
    expect(stored.referrer).toBeNull();
    expect(
      buildMainlineWidgetSrc({
        widgetHost: "https://evil.example/path",
        attribution: stored,
      }),
    ).toBeNull();
    expect(
      buildMainlineWidgetSrc({
        widgetHost: "mainline.tryoption.ai",
        attribution: EMPTY_ADS_ATTRIBUTION,
      }),
    ).toBeNull();
  });
});
