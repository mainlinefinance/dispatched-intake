import type { Metadata } from "next";
import Link from "next/link";
import { getAllCarriers, type Carrier } from "@/lib/data/carriers";
import {
  JsonLd,
  article,
  breadcrumbList,
  faqPage,
} from "@/components/seo/JsonLd";

// Per A5 decision (docs/seo/decisions-pr55.md): primary keyword pivoted from
// "commercial trucking insurance carriers" to "commercial truck insurance
// companies." Rationale: SERP for "carriers" is FMCSA-polluted (motor-carrier
// registration intent); every competitor listicle uses "companies." Title
// and description below reflect the pivot. FAQ Q&A (which are about the
// carriers the producer partner uses) are unchanged from the copy doc — that
// usage of "carriers" is correct insurance-industry terminology.
export const metadata: Metadata = {
  title: "Commercial truck insurance companies — AM Best | Dispatched",
  description:
    "Compare commercial truck insurance companies — AM Best ratings, products written, and the state pages where each carrier appears. Get matched today.",
  alternates: { canonical: "/carriers" },
  openGraph: {
    title: "Commercial truck insurance companies — AM Best | Dispatched",
    description:
      "Compare commercial truck insurance companies — AM Best ratings, products written, and the state pages where each carrier appears. Get matched today.",
    url: "/carriers",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Commercial truck insurance companies — AM Best | Dispatched",
    description:
      "Compare commercial truck insurance companies — AM Best ratings, products written, and the state pages where each carrier appears. Get matched today.",
  },
};

const faqs = [
  {
    q: "Which insurance carriers does Dispatched work with?",
    a: "The producer partner holds appointments with the major commercial trucking carriers — including Progressive Commercial, Great West Casualty, Berkshire Hathaway GUARD, Canal Insurance, Sentry Select, and a panel of specialty MGAs that write higher-risk and new-authority classes. The full list, with each carrier's AM Best rating and the products they write, is on this page.",
  },
  {
    q: "What does the AM Best rating tell me about a carrier?",
    a: "AM Best is a credit rating agency that grades insurance carrier financial strength on an A++ to F scale. Ratings of A- or better indicate the carrier has the financial strength to pay claims under stress; ratings below B+ indicate elevated solvency risk. Most operators should choose A- or better for primary liability and physical damage. Specialty classes sometimes only have B-rated carriers available.",
  },
  {
    q: "How does Dispatched decide which carriers to list?",
    a: "Carriers listed on this page are appointments held by the named producer partner that Dispatched routes insurance quotes to. We do not list carriers the producer partner cannot quote against. AM Best ratings are pulled from public AM Best filings and timestamped on the carrier detail page; the rating shown is the most recent verified value, not the all-time high.",
  },
  {
    q: "Can I get a quote from any carrier on this list?",
    a: "Subject to underwriting fit. Each carrier has appetite rules — equipment classes they will write, operating radius, loss-history thresholds, and minimum revenue or fleet size. The producer partner runs your operation against each carrier's appetite and only quotes the ones that will actually bind. The carrier detail pages list each carrier's appetite at a high level.",
  },
  {
    q: "Are there carriers Dispatched does not work with?",
    a: "Yes. Dispatched only routes quotes to carriers held by the named producer partner. Carriers outside that appointment list — including some direct-writers and captive programs — are not in the comparison set. If you have an existing relationship with a carrier the producer partner does not hold, you can still quote them directly; Dispatched does not block parallel shopping.",
  },
  {
    q: "Does the carrier write the policy or is it a wholesaler?",
    a: "For most carriers on the panel, the producer partner has a direct retail appointment and the carrier writes the policy. For specialty classes (high-risk, new-authority, hazmat), the producer partner often writes through an MGA wholesaler that fronts a rated carrier — the carrier on the policy is still A-rated, but the underwriting decision sits with the MGA. The carrier detail page flags which structure applies.",
  },
];

function amBestLabel(c: Carrier): string {
  if (c.notRated === true) return "Not Rated";
  if (c.amBestRating && c.amBestVerifiedAt) return c.amBestRating;
  return "Pending";
}

export default function CarriersIndexPage() {
  const carriers = getAllCarriers();
  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="ins-page">
      <JsonLd
        payload={breadcrumbList([
          { name: "Home", url: "https://dispatched.finance/" },
          { name: "Insurance", url: "https://dispatched.finance/insurance" },
          { name: "Carriers", url: "https://dispatched.finance/carriers" },
        ])}
      />
      <JsonLd
        payload={article({
          headline: "Commercial Trucking Insurance Carriers",
          description:
            "Index of carriers Dispatched lists across its commercial-trucking insurance money pages.",
          url: "https://dispatched.finance/carriers",
          datePublished: today,
          dateModified: today,
        })}
      />
      <JsonLd payload={faqPage(faqs)} />
      <main id="main-content">
        <section className="ins-hero">
          <div className="ins-container">
            <span className="ins-eyebrow">Carriers · {carriers.length}</span>
            <h1 className="ins-hero-title">
              Commercial trucking insurance carriers.
            </h1>
            <p className="ins-hero-sub">
              The carriers Dispatched lists across its money pages. Each
              review covers AM Best status (with verification date),
              products written, and the state money pages where the carrier
              appears in our editorial picks.
            </p>
          </div>
        </section>

        <section>
          <div className="ins-container">
            <div className="ins-state-grid">
              {carriers.map((c) => (
                <Link
                  key={c.slug}
                  href={`/carriers/${c.slug}`}
                  className="ins-state-tile"
                >
                  <span>{c.name}</span>
                  <span className="ins-state-tile-tag">{amBestLabel(c)}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="ins-sunken">
          <div className="ins-container">
            <p className="ins-compliance-note">
              AM Best ratings are populated only when verified directly
              against ambest.com and stamped with the verification date in
              our data layer. &ldquo;Not Rated&rdquo; reflects AM Best&apos;s
              own classification; &ldquo;Pending&rdquo; reflects that we
              have not completed verification, not that the carrier&apos;s
              rating is missing or weak.{" "}
              <Link href="/methodology">Read our methodology.</Link>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
