"use client";

import Script from "next/script";

/* The full script src — env, viewProduct, workflowTemplateId,
   consentTemplateId, destination[*], targetId — is generated in the
   Lendflow dashboard (Integrations → Widget Integration → Step 8,
   "Embedded" toggle) and pasted verbatim into the env var. To change
   workflow, branding, redirect, or consent template, regenerate the
   snippet there and replace the env var. The container div id MUST
   match the `targetId` query param in that URL (dashboard default:
   `container`). */

const SCRIPT_SRC = process.env.NEXT_PUBLIC_LENDFLOW_WIDGET_SCRIPT_SRC;

export default function LendflowWidget() {
  if (!SCRIPT_SRC) {
    return (
      <div role="alert" className="apply-fallback">
        <p>The application form is not configured. Please reach us by phone.</p>
      </div>
    );
  }
  // Container has fixed height so the injected iframe (sized by globals.css
  // `#container iframe` rule) can resolve `height: 100%` against it.
  return (
    <>
      <div
        id="container"
        style={{
          width: "100%",
          maxWidth: 720,
          height: 800,
          margin: "0 auto",
        }}
      />
      <Script src={SCRIPT_SRC} strategy="afterInteractive" />
    </>
  );
}
