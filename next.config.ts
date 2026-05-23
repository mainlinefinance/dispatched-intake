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
