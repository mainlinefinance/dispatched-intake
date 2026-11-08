import Script from "next/script";
import { resolveGoogleAdsConfig } from "@/lib/ads/google-ads";

// Installs the Google tag for linker / click capture only.
// A conversion event is never sent from this component. That event is
// reportBrowserLeadConversion, and only after an accepted lead id.
export default function GoogleAdsTag() {
  const config = resolveGoogleAdsConfig({
    NEXT_PUBLIC_GOOGLE_ADS_ID: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID,
    NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL:
      process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL,
  });
  if (!config) return null;

  const awId = JSON.stringify(config.awId);
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${config.awId}`}
        strategy="afterInteractive"
      />
      <Script id="google-ads-config" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=window.gtag||gtag;gtag('js',new Date());gtag('config',${awId});`}
      </Script>
    </>
  );
}
