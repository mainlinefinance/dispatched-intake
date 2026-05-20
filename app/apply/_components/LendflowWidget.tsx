"use client";

import Script from "next/script";

import { PHONE_TEL, PHONE_DISPLAY } from "@/lib/contact";

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
        <p className="apply-fallback-title">
          The online application isn’t available right now.
        </p>
        <p className="apply-fallback-body">
          Call us and a funding specialist will match you with lenders by
          phone — same soft-pull match, no impact to your credit.
        </p>
        <a className="btn btn--primary btn--lg" href={PHONE_TEL}>
          Call {PHONE_DISPLAY}
        </a>
      </div>
    );
  }
  // Container has fixed height so the injected iframe (sized by globals.css
  // `#container iframe` rule) can resolve `height: 100%` against it.
  return (
    <>
      {/* Lendflow's loader injects an iframe at a default 150px height and
          does not resize it. We size the container explicitly and force the
          injected iframe to fill it; CSS percentage heights would not resolve
          against a `min-height` parent. */}
      <style>{`
        #container iframe {
          width: 100%;
          height: 100%;
          border: 0;
          display: block;
        }
      `}</style>
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
