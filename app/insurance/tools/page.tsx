import { withSocial } from "@/lib/seo/social";
import { contentDates } from "@/lib/seo/contentDates";
import type { Metadata } from "next";
import Link from "next/link";
import {
  JsonLd,
  article,
  breadcrumbList,
} from "@/components/seo/JsonLd";

export const metadata: Metadata = withSocial({
  title: "Insurance Tools — Dispatched",
  description:
    "Calculators and decision tools for commercial trucking insurance shoppers.",
  alternates: { canonical: "/insurance/tools" },
}, "/insurance/tools");

const TOOLS = [
  {
    slug: "premium-estimator",
    title: "Premium estimator",
    description:
      "Pick your state, product, DOT class, and operator profile; see an indicative annual band with a transparent breakdown of every modifier we apply. Anchored to a real sampled rate observation; no fabricated numbers.",
  },
] as const;

export default function ToolsIndexPage() {
  const { published, modified: today } = contentDates("app/insurance/tools/page.tsx");
  return (
    <div className="ins-page">
      <JsonLd
        payload={breadcrumbList([
          { name: "Home", url: "https://dispatched.finance/" },
          { name: "Insurance", url: "https://dispatched.finance/insurance" },
          { name: "Tools", url: "https://dispatched.finance/insurance/tools" },
        ])}
      />
      <JsonLd
        payload={article({
          headline: "Commercial trucking insurance tools",
          description:
            "Calculators and decision tools for commercial trucking insurance shoppers.",
          url: "https://dispatched.finance/insurance/tools",
          datePublished: published,
          dateModified: today,
        })}
      />
      <main id="main-content">
        <section className="ins-hero">
          <div className="ins-container">
            <span className="ins-eyebrow">Tools</span>
            <h1 className="ins-hero-title">
              Insurance tools.
            </h1>
            <p className="ins-hero-sub">
              Calculators that anchor to real sampled data, with every
              modifier on the page so you can audit the math.
            </p>
          </div>
        </section>
        <section>
          <div className="ins-container">
            <div className="ins-product-grid">
              {TOOLS.map((t) => (
                <Link
                  key={t.slug}
                  href={`/insurance/tools/${t.slug}`}
                  className="ins-product-card"
                >
                  <h3>{t.title}</h3>
                  <p>{t.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
