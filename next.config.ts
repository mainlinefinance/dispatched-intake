import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  // Defensive code-splitting for packages with many named exports. Today these
  // deps are tree-shaken out of the production bundle entirely (nothing in
  // app/ imports them — they're only referenced from the orphaned intake
  // screens and lib/machine.ts that aren't wired to any route). If a future
  // change adds a shared import, optimizePackageImports prevents the entire
  // package from being pulled into a shared chunk.
  experimental: {
    optimizePackageImports: ["framer-motion", "libphonenumber-js"],
  },
  /* /sitemap.xml → the sitemap index route. app/sitemap.ts owns the
     /sitemap.xml path as a metadata route but, with generateSitemaps(), only
     serves the shards under /sitemap/<id>.xml, so a route handler cannot sit
     at /sitemap.xml itself. beforeFiles lets the rewrite win. */
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/sitemap.xml", destination: "/sitemap-index.xml" },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
  async redirects() {
    return [
      {
        source: "/invoice-factoring-for-truckers",
        destination: "/factoring",
        permanent: true,
      },
      {
        source: "/invoice-factoring-for-truckers/:path*",
        destination: "/factoring/:path*",
        permanent: true,
      },
      {
        // The /trucking-loans geo family was an early template (placeholder
        // phone, hard-coded stats, retired speed claims). /lenders covers the
        // same states. City pages now live as a section of their state page.
        source: "/trucking-loans",
        destination: "/lenders",
        permanent: true,
      },
      {
        source: "/trucking-loans/:state",
        destination: "/lenders/:state",
        permanent: true,
      },
      {
        source: "/trucking-loans/:state/:city",
        destination: "/lenders/:state",
        permanent: true,
      },
      {
        // The 25 city pages were ~65% identical to each other and carried
        // unsourced local statistics; their city-specific content was folded
        // into the state page.
        source: "/lenders/:state/:city",
        destination: "/lenders/:state",
        permanent: true,
      },
      {
        // These two slugs promised what the pages no longer claim (no credit
        // check, same-day funding). The pages were reframed; the URLs follow.
        source: "/factoring/no-credit-check",
        destination: "/factoring/broker-credit",
        permanent: true,
      },
      {
        source: "/blog/same-day-truck-repair-loan",
        destination: "/blog/truck-repair-loan-how-it-works",
        permanent: true,
      },
      {
        // Canonical money-page slug is /trucking-working-capital. /working-capital
        // is the slug external citers and AI tools default to — redirect it in
        // so the URL is reachable without a 404.
        source: "/working-capital",
        destination: "/trucking-working-capital",
        permanent: true,
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
