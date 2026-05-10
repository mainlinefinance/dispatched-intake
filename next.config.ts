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
};

export default withBundleAnalyzer(nextConfig);
