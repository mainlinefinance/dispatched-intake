// Google Ads conversion tag.
//
// The destination tag id and conversion label are not known in this repo.
// Do not infer them from a conversion action id. Both values have to be
// supplied at build time. If either is missing or fails the pattern, the
// tag is not installed and reportAcceptedLeadConversion does not call gtag.
// GA4 (GOOGLE_ANALYTICS_ID) is a separate tag and is not a conversion.

const AW_ID_RE = /^AW-\d{6,20}$/;
const LABEL_RE = /^[A-Za-z0-9_-]{1,80}$/;
const REPORTED_KEY = "df_ads_reported_v1";

export type GoogleAdsConfig = {
  awId: string;
  conversionLabel: string;
};

export type ConversionReport = {
  fired: boolean;
  reason: "unconfigured" | "invalid_id" | "duplicate" | "reported" | "gtag_error";
};

export type ConversionDeps = {
  config: GoogleAdsConfig | null;
  hasReported: (leadId: string) => boolean;
  remember: (leadId: string) => void;
  gtag: (
    command: "event",
    eventName: "conversion",
    params: { send_to: string; transaction_id: string },
  ) => void;
};

export function resolveGoogleAdsConfig(
  env: Record<string, string | undefined>,
): GoogleAdsConfig | null {
  const awId = (env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? "").trim();
  const conversionLabel = (env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL ?? "").trim();
  if (!AW_ID_RE.test(awId)) return null;
  if (!LABEL_RE.test(conversionLabel)) return null;
  return { awId, conversionLabel };
}

// "off": ads tag id or label missing. GA4 is left untouched.
// "config-only": GA4 already installs gtag.js. Add one ads config call.
// "install": no GA4 id, so this tag loads gtag.js once for the ads id.
export type GoogleAdsInstall = "off" | "config-only" | "install";

export function googleAdsInstallPlan(
  env: Record<string, string | undefined>,
): GoogleAdsInstall {
  if (!resolveGoogleAdsConfig(env)) return "off";
  if ((env.GOOGLE_ANALYTICS_ID ?? "").trim()) return "config-only";
  return "install";
}

export function googleAdsConfigOnlySnippet(awId: string): string {
  const id = JSON.stringify(awId);
  return `window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};window.gtag('config',${id});`;
}

export function googleAdsInstallSnippet(awId: string): string {
  const id = JSON.stringify(awId);
  return `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=window.gtag||gtag;gtag('js',new Date());gtag('config',${id});`;
}

export function reportAcceptedLeadConversion(
  leadId: string,
  deps: ConversionDeps,
): ConversionReport {
  if (!deps.config) return { fired: false, reason: "unconfigured" };
  const id = leadId.trim();
  if (!/^[A-Za-z0-9][A-Za-z0-9._:-]{7,127}$/.test(id)) {
    return { fired: false, reason: "invalid_id" };
  }
  if (deps.hasReported(id)) return { fired: false, reason: "duplicate" };
  try {
    deps.gtag("event", "conversion", {
      send_to: `${deps.config.awId}/${deps.config.conversionLabel}`,
      transaction_id: id,
    });
  } catch {
    return { fired: false, reason: "gtag_error" };
  }
  deps.remember(id);
  return { fired: true, reason: "reported" };
}

function readReportedIds(): string[] {
  if (typeof sessionStorage === "undefined") return [];
  try {
    const raw = sessionStorage.getItem(REPORTED_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is string => typeof item === "string");
  } catch {
    return [];
  }
}

function browserHasReported(leadId: string): boolean {
  return readReportedIds().includes(leadId);
}

function browserRemember(leadId: string): void {
  if (typeof sessionStorage === "undefined") return;
  try {
    const ids = readReportedIds();
    if (!ids.includes(leadId)) ids.push(leadId);
    sessionStorage.setItem(REPORTED_KEY, JSON.stringify(ids.slice(-50)));
  } catch {
    // If we cannot remember, Google still dedupes on transaction_id.
  }
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function browserGtag(
  command: "event",
  eventName: "conversion",
  params: { send_to: string; transaction_id: string },
): void {
  if (typeof window === "undefined") {
    throw new Error("gtag unavailable");
  }
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== "function") {
    window.gtag = function gtag(...args: unknown[]) {
      // Queue the command until gtag.js drains dataLayer. An array has the
      // same indexed shape as the Arguments object in Google's snippet.
      window.dataLayer!.push(args);
    };
  }
  window.gtag(command, eventName, params);
}

export function browserConversionDeps(): ConversionDeps {
  return {
    config: resolveGoogleAdsConfig({
      NEXT_PUBLIC_GOOGLE_ADS_ID: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID,
      NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL:
        process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL,
    }),
    hasReported: browserHasReported,
    remember: browserRemember,
    gtag: browserGtag,
  };
}

export function reportBrowserLeadConversion(leadId: string): ConversionReport {
  return reportAcceptedLeadConversion(leadId, browserConversionDeps());
}
