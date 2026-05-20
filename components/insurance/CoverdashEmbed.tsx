"use client";

import Script from "next/script";
import { useId, useRef } from "react";

/* ===========================================================================
   Coverdash producer-partner embed.

   Coverdash is the named licensed insurance producer for the /insurance
   funnel — they hold appointments with the carrier panel and bind the
   policy. Dispatched routes intent to them.

   Three render modes, in order of preference. The component picks the first
   one whose env config is present:

     1. WIDGET   — NEXT_PUBLIC_COVERDASH_WIDGET_SCRIPT_SRC is set. Loads the
                   official Coverdash NPM/CDN bundle and mounts the
                   <coverdash-embed> custom element with our partner license.
                   Mirrors the Lendflow widget pattern already established in
                   this codebase.

     2. IFRAME   — NEXT_PUBLIC_COVERDASH_QUOTES_BASE_URL is set (e.g.
                   https://quotes.coverdash.com). Renders an iframe to
                   {base}?license={licenseId}&prefilled_*. This is the
                   pattern the Coverdash × Zeni partnership page uses.

     3. DEEPLINK — fallback. Renders product-specific call-to-action links
                   that open the Coverdash quote engine in a new tab. Always
                   safe to render — no network calls until the user clicks.

   The license ID and quote-engine origin come from the BD-negotiated
   partnership URL. They are public identifiers (visible in the Coverdash ×
   Zeni reference page URL) — no secret material lives in this component.
   =========================================================================== */

const COVERDASH_LICENSE = process.env.NEXT_PUBLIC_COVERDASH_LICENSE_ID ?? "";
const COVERDASH_QUOTES_BASE =
  process.env.NEXT_PUBLIC_COVERDASH_QUOTES_BASE_URL ?? "";
const COVERDASH_WIDGET_SRC =
  process.env.NEXT_PUBLIC_COVERDASH_WIDGET_SCRIPT_SRC ?? "";

/* BD-negotiated partner-cobrand quote URL. The path UUID is a public partner
   identifier — no secret material, same class as the license ID above. Every
   deeplink CTA and the hero quote button route here. */
export const COVERDASH_PARTNER_QUOTE_URL =
  "https://quotes.coverdash.com/partner-cobrand-embedded/e264f3d2-bb31-4696-a476-3ea71dab1d01";

type Mode = "widget" | "iframe" | "deeplink";

/* Coverdash uses operationType to pre-segment a partner funnel (mirrors the
   Zeni page's prefilled_companyType=startup). Map our trucking ICPs to the
   tokens we negotiate with their BD; until those are confirmed in writing,
   omit prefilled_operationType and let the widget detect freely. */
export type OperationType =
  | "owner_operator"
  | "small_fleet"
  | "fleet"
  | "dispatch_service"
  | "hotshot"
  | "reefer"
  | undefined;

type Props = {
  operationType?: OperationType;
  /* Optional pre-selected product slug (e.g., "primary-liability"). When the
     widget supports per-product entry, this routes the user directly into
     that line's flow. */
  productSlug?: string;
};

function pickMode(): Mode {
  if (COVERDASH_WIDGET_SRC) return "widget";
  if (COVERDASH_QUOTES_BASE && COVERDASH_LICENSE) return "iframe";
  return "deeplink";
}

function buildQuoteUrl(opts: {
  operationType?: OperationType;
  productSlug?: string;
}): string | null {
  if (!COVERDASH_QUOTES_BASE || !COVERDASH_LICENSE) return null;
  const url = new URL(COVERDASH_QUOTES_BASE);
  url.searchParams.set("license", COVERDASH_LICENSE);
  if (opts.operationType) {
    url.searchParams.set("prefilled_operationType", opts.operationType);
  }
  if (opts.productSlug) {
    url.searchParams.set("prefilled_product", opts.productSlug);
  }
  return url.toString();
}

export default function CoverdashEmbed(props: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetMountId = useId();

  /* NEXT_PUBLIC_* vars are inlined at build by Next.js, so the mode is
     identical on server and client — safe to compute synchronously and
     render the chosen branch on first paint without a mount-effect. */
  const mode = pickMode();

  if (mode === "widget" && COVERDASH_WIDGET_SRC) {
    return (
      <div className="cd-embed">
        <Script
          id="coverdash-widget"
          src={COVERDASH_WIDGET_SRC}
          strategy="afterInteractive"
        />
        <div
          ref={containerRef}
          id={widgetMountId}
          data-coverdash-license={COVERDASH_LICENSE || undefined}
          data-coverdash-operation-type={props.operationType}
          data-coverdash-product={props.productSlug}
          /* Scope the embed surface so the official widget can claim it. The
             concrete attribute names align with the Coverdash docs once the
             integration spec is delivered by their BD; the data-* envelope
             keeps the markup forward-compatible. */
          className="cd-widget-mount"
          aria-label="Get a commercial trucking insurance quote"
        />
      </div>
    );
  }

  if (mode === "iframe") {
    const src = buildQuoteUrl({
      operationType: props.operationType,
      productSlug: props.productSlug,
    });
    if (!src) return <DeepLinkFallback />;
    return (
      <div className="cd-embed cd-embed--iframe">
        <iframe
          src={src}
          title="Commercial trucking insurance quote — Coverdash"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allow="clipboard-write; payment"
          /* Sandboxed but with the permissions Coverdash needs to render its
             own quote flow: scripts (the SPA), forms (the quote form), top
             navigation only on user activation (post-bind redirect), and
             same-origin so its own cookies/storage work. We do NOT grant
             allow-popups-to-escape-sandbox or allow-modals. */
          sandbox="allow-scripts allow-forms allow-same-origin allow-top-navigation-by-user-activation allow-popups"
          className="cd-iframe"
        />
      </div>
    );
  }

  return <DeepLinkFallback />;
}

function DeepLinkFallback() {
  return (
    <div className="cd-embed cd-embed--deeplink">
      <p className="cd-deeplink-eyebrow">Quote with our producer partner</p>
      <p className="cd-deeplink-lead">
        Quotes are placed by our licensed insurance producer partner. Pick the
        coverage you want priced and you&rsquo;ll be routed into their quote
        engine — no application fee, no commitment.
      </p>
      <div className="cd-deeplink-grid">
        {DEEPLINK_PRODUCTS.map((p) => (
          <a
            key={p.slug}
            href={COVERDASH_PARTNER_QUOTE_URL}
            className="cd-deeplink-card"
            target="_blank"
            rel="noopener"
          >
            <span className="cd-deeplink-card-title">{p.label}</span>
            <span className="cd-deeplink-card-sub">{p.sub}</span>
            <span className="cd-deeplink-card-cta">Quote →</span>
          </a>
        ))}
      </div>
    </div>
  );
}

const DEEPLINK_PRODUCTS: ReadonlyArray<{
  slug: string;
  label: string;
  sub: string;
}> = [
  {
    slug: "primary-liability",
    label: "Primary Liability",
    sub: "FMCSA-mandated for active authority",
  },
  {
    slug: "motor-truck-cargo",
    label: "Motor Truck Cargo",
    sub: "Required by ~95% of broker contracts",
  },
  {
    slug: "physical-damage",
    label: "Physical Damage",
    sub: "Required if equipment is financed",
  },
  {
    slug: "non-trucking-liability",
    label: "Non-Trucking Liability",
    sub: "Bobtail coverage for leased operators",
  },
  {
    slug: "general-liability",
    label: "General Liability",
    sub: "Premises and contract requirements",
  },
  {
    slug: "occupational-accident",
    label: "Occupational Accident",
    sub: "1099 owner-operator medical / disability",
  },
];
