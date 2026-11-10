import { contentDates } from "@/lib/seo/contentDates";
import type { Metadata } from "next";
import Link from "next/link";
import { getAllCarriers, type Carrier } from "@/lib/data/carriers";
import { getAllProducts } from "@/lib/data/products";
import { getProductGuide } from "@/lib/data/productGuides";
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
    "Compare commercial truck insurance companies — AM Best ratings, products written, and the state pages where each carrier appears.",
  alternates: { canonical: "/carriers" },
  openGraph: {
    images: ["/opengraph-image"],
    title: "Commercial truck insurance companies — AM Best | Dispatched",
    description:
      "Compare commercial truck insurance companies — AM Best ratings, products written, and the state pages where each carrier appears.",
    url: "/carriers",
    type: "website",
  },
  twitter: {
    images: ["/opengraph-image"],
    card: "summary_large_image",
    title: "Commercial truck insurance companies — AM Best | Dispatched",
    description:
      "Compare commercial truck insurance companies — AM Best ratings, products written, and the state pages where each carrier appears.",
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
  const { published, modified: today } = contentDates("app/carriers/page.tsx");

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
          datePublished: published,
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

        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">How to use this list</span>
            <h2 className="ins-hero-title">Reading a carrier review</h2>
            <p className="ins-hero-sub">
              The tag next to each name is the carrier&apos;s AM Best
              Financial Strength Rating as we last verified it. Open a review
              to see the date of that check, the trucking lines the carrier
              writes, and the states where we list it. A rating tells you
              whether an insurer is expected to be able to pay its claims; it
              does not tell you whether the carrier will write your
              operation, or at what price. That depends on your equipment,
              radius, commodities, and loss history, and the answer comes
              from a quote.
            </p>
            <dl className="ins-faq">
              {faqs.map((qa) => (
                <div key={qa.q} className="ins-faq-item">
                  <dt>{qa.q}</dt>
                  <dd>{qa.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="ins-sunken" id="ratings">
          <div className="ins-container">
            <span className="ins-eyebrow">Financial strength</span>
            <h2 className="ins-hero-title">What the AM Best categories mean</h2>
            <p className="ins-hero-sub">
              The letter grades on these pages are AM Best Financial Strength
              Ratings: AM Best&apos;s opinion of an insurer&apos;s ability to
              meet its ongoing policy and claim obligations. A rating says
              nothing about price or about how claims are handled.
            </p>
            <dl className="ins-faq">
              <div className="ins-faq-item">
                <dt>A++ and A+ (Superior)</dt>
                <dd>
                  The highest of AM Best&apos;s rating groups. It clears the
                  minimum rating most broker and shipper agreements set.
                </dd>
              </div>
              <div className="ins-faq-item">
                <dt>A and A- (Excellent)</dt>
                <dd>
                  The second group. Many broker and shipper agreements name
                  A- as the lowest rating they accept, so compare the rating
                  with the wording in your own contracts.
                </dd>
              </div>
              <div className="ins-faq-item">
                <dt>Not Rated</dt>
                <dd>
                  AM Best has not assigned the company a Financial Strength
                  Rating. It is a statement about the rating, not a judgment
                  that the company is weak, but an unrated insurer may not
                  satisfy a contract that names a minimum.
                </dd>
              </div>
              <div className="ins-faq-item">
                <dt>Pending</dt>
                <dd>
                  We have not completed our own check. Look the company up on{" "}
                  <a href="https://web.ambest.com/" rel="noopener" target="_blank">
                    ambest.com
                  </a>{" "}
                  before relying on it.
                </dd>
              </div>
              <div className="ins-faq-item">
                <dt>How we verify</dt>
                <dd>
                  Ratings change over time. We display one only after a
                  person has confirmed it on ambest.com, and we show the date
                  of that check on the carrier&apos;s review.{" "}
                  <Link href="/methodology">Read our methodology.</Link>
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <section id="lines">
          <div className="ins-container">
            <span className="ins-eyebrow">Trucking lines</span>
            <h2 className="ins-hero-title">What each line covers, in brief</h2>
            <dl className="ins-faq">
              {getAllProducts().map((p) => (
                <div key={p.slug} className="ins-faq-item">
                  <dt>
                    <Link href={`/insurance/${p.slug}`}>{p.name}</Link>
                  </dt>
                  <dd>{getProductGuide(p.slug).inBrief}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="ins-sunken" id="how-listed">
          <div className="ins-container">
            <span className="ins-eyebrow">How carriers are listed</span>
            <p className="ins-compliance-note">
              Dispatched is a comparison and matching platform. We are not
              appointed by every carrier we list. Coverage is placed by
              licensed producers and bound by carriers. Where we accept your
              contact information for a quote, that consent is one-to-one
              with the named producer partner identified at submission.
            </p>
            <p className="ins-compliance-note">
              The states shown on a carrier&apos;s review reflect
              Dispatched&apos;s editorial pick of the carriers to list on
              each state page. A carrier&apos;s actual license footprint may
              be broader; we display the licensure list separately once we
              have completed direct verification with the carrier.
            </p>
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
