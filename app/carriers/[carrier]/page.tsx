import { contentDates } from "@/lib/seo/contentDates";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllCarriers,
  getCarrier,
  type Carrier,
  type CarrierSlug,
} from "@/lib/data/carriers";
import { getProduct, type ProductSlug } from "@/lib/data/products";
import { getProductGuide } from "@/lib/data/productGuides";
import { getAllInsuranceStates } from "@/lib/data/states";
import {
  JsonLd,
  article,
  breadcrumbList,
} from "@/components/seo/JsonLd";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/seo/Breadcrumbs";
import EditorialByline from "@/components/landing/EditorialByline";
import { metaCarrier } from "@/lib/seo/metadataPatterns";

type Params = { carrier: string };

export const dynamicParams = false;

export async function generateStaticParams(): Promise<Params[]> {
  return getAllCarriers().map((c) => ({ carrier: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { carrier } = await params;
  const c = getCarrier(carrier);
  if (!c) return {};
  const { title, description } = metaCarrier(c.name);
  const canonical = `/carriers/${c.slug}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function CarrierReviewPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { carrier } = await params;
  const c = getCarrier(carrier);
  if (!c) notFound();

  const stateAppearances = getAllInsuranceStates().filter((s) =>
    s.topCarriers.includes(c.slug as CarrierSlug),
  );
  const products = c.productLines
    .map((slug) => getProduct(slug))
    .filter((p): p is NonNullable<ReturnType<typeof getProduct>> => p !== null);
  const { published, modified: today } = contentDates("app/carriers/[carrier]/page.tsx");
  const url = `https://dispatched.finance/carriers/${c.slug}`;
  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Dispatched", url: "https://dispatched.finance/" },
    { name: "Carriers", url: "https://dispatched.finance/carriers" },
    { name: c.name, url },
  ];

  return (
    <div className="ins-page">
      <JsonLd payload={breadcrumbList(breadcrumbs)} />
      <JsonLd
        payload={article({
          headline: `${c.name} — Commercial Trucking Insurance Review`,
          description: c.notes ?? `${c.name} commercial trucking insurance review.`,
          url,
          datePublished: published,
          dateModified: today,
        })}
      />

      <main id="main-content">
        <div className="ins-container">
          <Breadcrumbs items={breadcrumbs} />
        </div>
        <Hero carrier={c} today={today} />
        <RatingBlock carrier={c} />
        {c.notes ? <AboutBlock carrier={c} /> : null}
        <ProductsBlock carrier={c} products={products} />
        <StatesBlock carrier={c} states={stateAppearances} />
        <QuoteChecklist carrier={c} products={products} />
        <MethodologyFooter />
      </main>
    </div>
  );
}

function Hero({ carrier, today }: { carrier: Carrier; today: string }) {
  return (
    <section className="ins-hero">
      <div className="ins-container">
        <span className="ins-eyebrow">Carrier review</span>
        <h1 className="ins-hero-title">{carrier.name}</h1>
        <EditorialByline updated={today} />
        {carrier.parentGroup ? (
          <p className="ins-hero-sub">
            Part of <strong>{carrier.parentGroup}</strong>.
          </p>
        ) : null}
      </div>
    </section>
  );
}

/* What the AM Best category on this page means, in AM Best's own terms. The
   letter grades are Financial Strength Ratings: an opinion on an insurer's
   ability to pay claims, not on its prices or its service. */
function ratingMeaning(carrier: Carrier): string {
  if (carrier.notRated === true) {
    return "Not Rated means AM Best has not assigned a Financial Strength Rating to this company. It is a statement about the rating, not a judgment that the company is weak. Brokers and shippers often set a minimum AM Best rating in their carrier agreements, so check your contracts before binding with an unrated insurer.";
  }
  const rating =
    carrier.amBestRating && carrier.amBestVerifiedAt ? carrier.amBestRating : "";
  if (rating.startsWith("A++") || rating.startsWith("A+")) {
    return "A++ and A+ are AM Best's Superior category, the highest of its Financial Strength Rating groups. The rating is AM Best's opinion of the insurer's ability to meet its ongoing policy and claim obligations. It says nothing about price or claims service, and it clears the minimum rating most broker and shipper agreements set.";
  }
  if (rating.startsWith("A")) {
    return "A and A- are AM Best's Excellent category, the second of its Financial Strength Rating groups. The rating is AM Best's opinion of the insurer's ability to meet its ongoing policy and claim obligations. Many broker and shipper agreements set A- as the minimum they accept, so compare the rating with the wording in your own contracts.";
  }
  return "An AM Best Financial Strength Rating is an opinion of an insurer's ability to meet its ongoing policy and claim obligations. Until we have verified this company's current rating, look it up on ambest.com and compare it with the minimum your broker and shipper agreements set.";
}

function RatingBlock({ carrier }: { carrier: Carrier }) {
  const ratingCopy =
    carrier.notRated === true
      ? "AM Best classifies this carrier as Not Rated."
      : carrier.amBestRating && carrier.amBestVerifiedAt
        ? `AM Best rating: ${carrier.amBestRating}. Verified ${carrier.amBestVerifiedAt}.`
        : "AM Best rating pending verification.";
  return (
    <section className="ins-sunken">
      <div className="ins-container">
        <span className="ins-eyebrow">Financial strength</span>
        <h2 className="ins-hero-title">{ratingCopy}</h2>
        <p className="ins-hero-sub">{ratingMeaning(carrier)}</p>
        {carrier.naicGroupCode ? (
          <p className="ins-compliance-note">
            NAIC group code: <code>{carrier.naicGroupCode}</code>.
          </p>
        ) : null}
        <p className="ins-compliance-note">
          AM Best ratings change over time. Dispatched displays the rating
          only when a specific human has verified it on{" "}
          <a href="https://web.ambest.com/" rel="noopener" target="_blank">
            ambest.com
          </a>{" "}
          and stamped the verification date in our data layer.{" "}
          <Link href="/methodology">Read our rate methodology.</Link>
        </p>
      </div>
    </section>
  );
}

function AboutBlock({ carrier }: { carrier: Carrier }) {
  return (
    <section>
      <div className="ins-container">
        <span className="ins-eyebrow">About</span>
        <h2 className="ins-hero-title">{carrier.name} at a glance</h2>
        <p className="ins-hero-sub">{carrier.notes}</p>
      </div>
    </section>
  );
}

function ProductsBlock({
  carrier,
  products,
}: {
  carrier: Carrier;
  products: ReadonlyArray<NonNullable<ReturnType<typeof getProduct>>>;
}) {
  return (
    <section className="ins-sunken">
      <div className="ins-container">
        <span className="ins-eyebrow">Products written</span>
        <h2 className="ins-hero-title">
          What {carrier.name} writes for commercial trucking
        </h2>
        {products.length === 0 ? (
          <p className="ins-compliance-note">
            Product list pending verification of carrier&apos;s current
            appetite.
          </p>
        ) : (
          <>
            <div className="ins-state-grid">
              {products.map((p) => (
                <Link
                  key={p.slug}
                  href={`/insurance/${p.slug}`}
                  className="ins-state-tile"
                >
                  <span>{p.shortLabel}</span>
                  <span className="ins-state-tile-tag">View product</span>
                </Link>
              ))}
            </div>
            <dl className="ins-faq">
              {products.map((p) => (
                <div key={p.slug} className="ins-faq-item">
                  <dt>{p.name}</dt>
                  <dd>{getProductGuide(p.slug as ProductSlug).inBrief}</dd>
                </div>
              ))}
            </dl>
          </>
        )}
      </div>
    </section>
  );
}

function StatesBlock({
  carrier,
  states,
}: {
  carrier: Carrier;
  states: ReturnType<typeof getAllInsuranceStates>;
}) {
  return (
    <section>
      <div className="ins-container">
        <span className="ins-eyebrow">Where we list this carrier</span>
        <h2 className="ins-hero-title">
          {carrier.name}
          {" "}
          appears on Dispatched&apos;s state money pages for:
        </h2>
        {states.length === 0 ? (
          <p className="ins-compliance-note">
            Not currently listed on any state money page. State license
            footprint pending verification.
          </p>
        ) : (
          <div className="ins-state-grid">
            {states.map((s) => (
              <Link
                key={s.slug}
                href={`/insurance/primary-liability/${s.slug}`}
                className="ins-state-tile"
              >
                <span>{s.name}</span>
                <span className="ins-state-tile-tag">{s.abbr}</span>
              </Link>
            ))}
          </div>
        )}
        <p className="ins-compliance-note">
          State appearances reflect Dispatched&apos;s editorial pick of the
          top carriers to list on each state&apos;s money page. The
          carrier&apos;s actual license footprint may be broader; we display
          the licensure list separately once we have completed direct
          verification with the carrier.
        </p>
      </div>
    </section>
  );
}

/* Questions to put to the producer, built from the lines this carrier
   writes: the first check for each one. */
function QuoteChecklist({
  carrier,
  products,
}: {
  carrier: Carrier;
  products: ReadonlyArray<NonNullable<ReturnType<typeof getProduct>>>;
}) {
  if (products.length === 0) return null;
  return (
    <section>
      <div className="ins-container">
        <span className="ins-eyebrow">Before you bind</span>
        <h2 className="ins-hero-title">
          What to check on a {carrier.name} quote
        </h2>
        <p className="ins-hero-sub">
          A carrier review tells you who stands behind the policy. The quote
          tells you what the policy does. For the {products.length === 1 ? "line" : "lines"}{" "}
          {carrier.name} writes, start with these:
        </p>
        <ul>
          {products.map((p) => {
            const guide = getProductGuide(p.slug as ProductSlug);
            return (
              <li key={p.slug}>
                <strong>{p.shortLabel}:</strong>{" "}
                {guide.checkOnQuote.slice(0, 2).join(" ")}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function MethodologyFooter() {
  return (
    <section className="ins-sunken">
      <div className="ins-container">
        <p className="ins-compliance-note">
          Dispatched is a comparison and matching platform. We are not
          appointed by every carrier we list. Coverage is placed by licensed
          producers and bound by carriers. Where we accept your contact
          information for a quote, that consent is one-to-one with the named
          producer partner identified at submission.
        </p>
        <p>
          <Link href="/insurance">← Back to commercial trucking insurance</Link>
        </p>
      </div>
    </section>
  );
}
