import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { JsonLd, organization, website } from "@/components/seo/JsonLd";

const archivo = localFont({
  src: [
    { path: "../public/fonts/Archivo-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/Archivo-Medium.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/Archivo-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/Archivo-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-archivo",
  display: "swap",
});

const plexSans = localFont({
  src: [
    { path: "../public/fonts/IBMPlexSans-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/IBMPlexSans-Italic.woff2", weight: "400", style: "italic" },
    { path: "../public/fonts/IBMPlexSans-Medium.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/IBMPlexSans-SemiBold.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = localFont({
  src: [
    { path: "../public/fonts/IBMPlexMono-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/IBMPlexMono-Medium.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-plex-mono",
  display: "swap",
});

/* Root metadata.

   Notes:
   - metadataBase resolves relative URLs (canonical, openGraph.url, twitter
     image paths). Falls back to the production origin when NEXT_PUBLIC_SITE_URL
     is unset (preview builds, local dev without .env.local).
   - openGraph.images and twitter.images are NOT set here on purpose — Next 16
     auto-populates them from app/opengraph-image.tsx for every route.
   - alternates.canonical is NOT set here on purpose — every page-level
     metadata MUST set its own canonical. Setting one in the root layout
     would silently canonicalize every uninstrumented child route to "/",
     deindexing the site.
   - verification reads from env at build time. SEO owner pastes the GSC and
     Bing tokens into Render dashboard env, then redeploys. */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://dispatched.finance";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Dispatched — Capital and Insurance Built for Truckers",
  description:
    "Capital and insurance built for owner-operators and small fleets. Match with trucking-friendly lenders for working capital, equipment financing, repair loans, and invoice factoring — and compare commercial trucking insurance carriers writing your DOT class in your state. Soft pull first; no credit impact to start.",
  applicationName: "Dispatched",
  authors: [{ name: "Dispatched", url: SITE_URL }],
  creator: "Dispatched",
  publisher: "TCopyCats LLC",
  keywords: [
    "trucking financing",
    "commercial truck loans",
    "owner-operator financing",
    "semi truck financing",
    "truck repair loans",
    "invoice factoring trucking",
    "commercial trucking insurance",
    "primary liability trucking",
    "MC authority financing",
    "trucking working capital",
  ],
  formatDetection: { telephone: false, email: false, address: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Dispatched",
    title: "Dispatched — Capital and Insurance Built for Truckers",
    description:
      "Capital and insurance built for owner-operators and small fleets. Soft pull first; no credit impact to start.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@dispatchedfin",
    creator: "@dispatchedfin",
    title: "Dispatched — Capital Built for Truckers",
    description:
      "Capital and insurance built for owner-operators and small fleets. Soft pull first; no credit impact.",
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: process.env.BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION }
      : undefined,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${plexSans.variable} ${plexMono.variable}`}
    >
      <head>
        {/* Third-party origins that are loaded after-interactive on specific
            routes. dns-prefetch resolves DNS ahead of script execution; the
            cost is ~zero and the saving is one RTT when the script body kicks
            in. preconnect on the Coverdash quote engine because the iframe
            renders inside the viewport on /insurance and benefits from a
            warm TLS handshake. We do NOT preconnect to the Lendflow or
            Coverdash widget SRCs because those origins are env-driven and
            not known at build time. */}
        <link rel="dns-prefetch" href="https://quotes.coverdash.com" />
        <link rel="preconnect" href="https://quotes.coverdash.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://api.trustedform.com" />
        <link rel="dns-prefetch" href="https://create.lidstatic.com" />
      </head>
      <body>
        {/* Site-wide entity context. Every page inherits Organization +
            WebSite schema so search engines can resolve the publisher of
            any given Article/FAQ/FinancialProduct schema rendered on a
            child page via the @id graph. */}
        <JsonLd payload={organization()} />
        <JsonLd payload={website()} />
        <a href="#main-content" className="skip-link">Skip to main content</a>
        {children}
      </body>
    </html>
  );
}
