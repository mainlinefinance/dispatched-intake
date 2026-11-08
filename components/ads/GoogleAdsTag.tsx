import Script from "next/script";
import {
  googleAdsConfigOnlySnippet,
  googleAdsInstallPlan,
  googleAdsInstallSnippet,
  resolveGoogleAdsConfig,
} from "@/lib/ads/google-ads";

// Does not send a conversion. When GA4 is already configured, this adds one
// ads `config` call on the existing gtag and does not load gtag.js again.
// When GA4 is absent, this loads gtag.js for the ads id only.
export default function GoogleAdsTag() {
  const env = {
    NEXT_PUBLIC_GOOGLE_ADS_ID: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID,
    NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL:
      process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL,
    GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
  };
  const plan = googleAdsInstallPlan(env);
  const config = resolveGoogleAdsConfig(env);
  if (plan === "off" || !config) return null;

  if (plan === "config-only") {
    return (
      <Script id="google-ads-config" strategy="afterInteractive">
        {googleAdsConfigOnlySnippet(config.awId)}
      </Script>
    );
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${config.awId}`}
        strategy="afterInteractive"
      />
      <Script id="google-ads-config" strategy="afterInteractive">
        {googleAdsInstallSnippet(config.awId)}
      </Script>
    </>
  );
}
