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
            <span className="ins-eyebrow">What these are</span>
            <h2 className="ins-hero-title">Tools for checking a number</h2>
            <p className="ins-hero-sub">
              Trucking insurance is priced by underwriters, one operation at
              a time, so no calculator can tell you your premium. What a
              tool can do is show the range similar operations fall in and
              which of your own facts move it. That is useful at two
              moments: before you shop, to set a realistic budget, and after
              a quote arrives, to see whether it is in line and what to ask
              the producer if it is not.
            </p>
            <p className="ins-hero-sub">
              Every tool here follows the same rules. It starts from a
              sampled rate observation, not an invented average. It shows
              each adjustment it applies and why. When we hold no
              observation for a state, product, or equipment class, it tells
              you there is no data instead of producing a figure. And it
              asks for no name, phone number, or email, and does not touch
              your credit.
            </p>
          </div>
        </section>
        <section className="ins-sunken">
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
        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">What to bring</span>
            <h2 className="ins-hero-title">Inputs worth having on hand</h2>
            <ul>
              <li>
                The state where the truck is garaged, which is the state
                the policy is rated in.
              </li>
              <li>
                Your DOT class and what you haul; hazmat and specialized
                freight are rated differently from general freight.
              </li>
              <li>
                Your operating radius: local, regional, or long haul.
              </li>
              <li>
                The number of power units and drivers you want on the
                policy, since a quote is built per unit.
              </li>
              <li>
                Chargeable claims in the last three years, as they would
                appear on your loss runs.
              </li>
              <li>
                The liability limit your broker or shipper contracts
                require. The federal minimum for general freight is
                $750,000 under 49 CFR Part 387; many contracts ask for $1
                million.
              </li>
            </ul>
            <p className="ins-compliance-note">
              Results are indicative and are not a quote or an offer of
              coverage. Coverage is quoted and bound by a licensed producer.{" "}
              <Link href="/methodology">Read our methodology</Link> or{" "}
              <Link href="/insurance">browse the coverage types</Link>.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
