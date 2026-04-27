import type { MetadataRoute } from "next";

const ORIGIN = "https://dispatched.finance";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/insurance/quote",
          "/insurance/thanks",
          "/healthz",
        ],
      },
    ],
    sitemap: `${ORIGIN}/sitemap.xml`,
    host: ORIGIN,
  };
}
