import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it, vi } from "vitest";
import {
  reportAcceptedLeadConversion,
  resolveGoogleAdsConfig,
  type ConversionDeps,
} from "@/lib/ads/google-ads";

const CONFIG = {
  awId: "AW-123456789",
  conversionLabel: "abcDEF_123",
};
const LEAD_ID = "btc_lead_12345678";

function deps(overrides: Partial<ConversionDeps> = {}): {
  client: ConversionDeps;
  gtag: ReturnType<typeof vi.fn>;
  reported: Set<string>;
} {
  const reported = new Set<string>();
  const gtag = vi.fn();
  const client: ConversionDeps = {
    config: CONFIG,
    hasReported: (id) => reported.has(id),
    remember: (id) => {
      reported.add(id);
    },
    gtag,
    ...overrides,
  };
  return { client, gtag, reported };
}

describe("Google Ads conversion gate", () => {
  it("stays off when the tag id or label is missing or not a tag id", () => {
    expect(resolveGoogleAdsConfig({})).toBeNull();
    expect(
      resolveGoogleAdsConfig({ NEXT_PUBLIC_GOOGLE_ADS_ID: "AW-123456789" }),
    ).toBeNull();
    expect(
      resolveGoogleAdsConfig({
        NEXT_PUBLIC_GOOGLE_ADS_ID: "7890276237",
        NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL: "abcDEF_123",
      }),
    ).toBeNull();
    expect(
      resolveGoogleAdsConfig({
        NEXT_PUBLIC_GOOGLE_ADS_ID: "AW-123456789",
        NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL: "bad/label",
      }),
    ).toBeNull();
    expect(
      resolveGoogleAdsConfig({
        NEXT_PUBLIC_GOOGLE_ADS_ID: "AW-123456789",
        NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL: "abcDEF_123",
      }),
    ).toEqual(CONFIG);
  });

  it("does not call gtag when the tag is unconfigured", () => {
    const { client, gtag } = deps({ config: null });
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    expect(reportAcceptedLeadConversion(LEAD_ID, client)).toEqual({
      fired: false,
      reason: "unconfigured",
    });
    expect(gtag).not.toHaveBeenCalled();
    expect(fetchSpy).not.toHaveBeenCalled();
    fetchSpy.mockRestore();
  });

  it("fires once for a durable id and dedupes the second call", () => {
    const { client, gtag } = deps();
    const first = reportAcceptedLeadConversion(LEAD_ID, client);
    const second = reportAcceptedLeadConversion(LEAD_ID, client);
    expect(first).toEqual({ fired: true, reason: "reported" });
    expect(second).toEqual({ fired: false, reason: "duplicate" });
    expect(gtag).toHaveBeenCalledTimes(1);
    expect(gtag).toHaveBeenCalledWith("event", "conversion", {
      send_to: "AW-123456789/abcDEF_123",
      transaction_id: LEAD_ID,
    });
  });

  it("does not fire for a missing id or when gtag throws", () => {
    const { client } = deps();
    expect(reportAcceptedLeadConversion("nope", client).reason).toBe("invalid_id");
    const failing = deps({
      gtag: () => {
        throw new Error("blocked");
      },
    });
    expect(reportAcceptedLeadConversion(LEAD_ID, failing.client)).toEqual({
      fired: false,
      reason: "gtag_error",
    });
    expect(failing.reported.has(LEAD_ID)).toBe(false);
  });

  it("does not hardcode a destination tag in the layout or the tag component", () => {
    const root = resolve(__dirname, "..");
    const layout = readFileSync(resolve(root, "app/layout.tsx"), "utf8");
    const tag = readFileSync(resolve(root, "components/ads/GoogleAdsTag.tsx"), "utf8");
    expect(layout).not.toContain("7890276237");
    expect(layout).not.toMatch(/AW-\d+/);
    expect(layout).not.toContain("G-VCFR0WDQL9");
    expect(tag).not.toContain("gtag('event'");
    expect(tag).not.toContain("transaction_id");
    expect(tag).not.toMatch(/AW-\d+/);
  });
});
