"use client";

import Script from "next/script";

const ENV_ID = process.env.NEXT_PUBLIC_LENDFLOW_WIDGET_ENV_ID;
const HOST =
  process.env.NEXT_PUBLIC_LENDFLOW_WIDGET_HOST ??
  "https://sandbox-widget.lendflow.com";
const BRANDING_ID = process.env.NEXT_PUBLIC_LENDFLOW_WIDGET_BRANDING_ID;
const TARGET_ID = "lendflow-widget-target";

export default function LendflowWidget() {
  if (!ENV_ID) {
    return (
      <div role="alert" className="apply-fallback">
        <p>The application form is not configured. Please reach us by phone.</p>
      </div>
    );
  }
  const params = new URLSearchParams({ env: ENV_ID, target: TARGET_ID });
  if (BRANDING_ID) params.set("branding", BRANDING_ID);
  return (
    <>
      <div
        id={TARGET_ID}
        style={{
          width: "100%",
          maxWidth: 720,
          minHeight: 800,
          margin: "0 auto",
        }}
      />
      <Script
        src={`${HOST}/js/lendflow-loader.js?${params.toString()}`}
        strategy="afterInteractive"
      />
    </>
  );
}
