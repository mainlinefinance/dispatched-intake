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

/* ---------------------------------------------------------------------------
   Carrier-specific copy. Every sentence below is composed from this
   carrier's own record (lines, parent group, rating and its verification
   date, NAIC code, the state pages it appears on), so the text differs from
   one review to the next. General explanations live once, on /carriers.
   --------------------------------------------------------------------------- */

type ListedProduct = NonNullable<ReturnType<typeof getProduct>>;

const ALL_LINES: ReadonlyArray<ProductSlug> = [
  "primary-liability",
  "motor-truck-cargo",
  "physical-damage",
  "general-liability",
  "non-trucking-liability",
  "occupational-accident",
  "reefer-breakdown",
];

/* Who each line matters to, phrased so it can follow the carrier's name. */
const LINE_AUDIENCE: Partial<Record<ProductSlug, string>> = {
  "primary-liability":
    "primary liability, the filing a carrier running under its own authority needs on record before the authority is active",
  "motor-truck-cargo":
    "motor truck cargo, the limit brokers and shippers check before they tender a load",
  "physical-damage":
    "physical damage, which matters most where a lender or lessor sets the terms on financed equipment",
  "general-liability":
    "general liability, usually bought because a broker or shipper contract asks for it",
};

function joinList(items: ReadonlyArray<string>): string {
  if (items.length <= 1) return items.join("");
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

function ratingAdvice(carrier: Carrier): string {
  if (carrier.notRated === true) {
    return `Before asking for a ${carrier.name} quote, read the minimum-rating clause in each of your broker and shipper agreements: many name a minimum AM Best rating, and an unrated insurer may not satisfy it.`;
  }
  if (carrier.amBestRating && carrier.amBestVerifiedAt) {
    const group = carrier.parentGroup
      ? ` ${carrier.name} is part of ${carrier.parentGroup}; the rating that counts for your contracts is the one assigned to the company named on the policy.`
      : "";
    return `We checked it on ${carrier.amBestVerifiedAt}. Compare ${carrier.amBestRating} with the minimum your broker and shipper agreements name, and confirm it again on the day you bind.${group}`;
  }
  return `Look ${carrier.name} up on ambest.com and compare the result with the minimum your broker and shipper agreements name.`;
}

function linesSummary(
  carrier: Carrier,
  products: ReadonlyArray<ListedProduct>,
): string {
  const audiences = products
    .map((p) => LINE_AUDIENCE[p.slug as ProductSlug])
    .filter((x): x is string => Boolean(x));
  const count =
    products.length === 1 ? "one trucking line" : `${products.length} trucking lines`;
  return `Dispatched lists ${carrier.name} for ${count}: ${joinList(audiences)}.`;
}

function linesGap(
  carrier: Carrier,
  products: ReadonlyArray<ListedProduct>,
): string {
  const listed = new Set(products.map((p) => p.slug));
  const missing = ALL_LINES.filter((slug) => !listed.has(slug))
    .map((slug) => getProduct(slug)?.name.toLowerCase())
    .filter((x): x is string => Boolean(x));
  if (missing.length === 0) {
    return `That is every trucking line we cover, so ${carrier.name} can be asked to quote the whole program.`;
  }
  return `We do not list ${carrier.name} for ${joinList(missing)}. If your operation needs any of those, ask the producer whether ${carrier.name} can add it or whether it has to be placed with a second insurer, and try to keep the renewal dates aligned.`;
}

function statesSummary(
  carrier: Carrier,
  states: ReturnType<typeof getAllInsuranceStates>,
): string {
  if (states.length === 0) {
    return `${carrier.name} is not one of our picks on any state page at the moment. That says nothing about where it is licensed; ask the producer whether it writes in your garaging state.`;
  }
  const names = joinList(states.map((s) => s.name));
  const pages = states.length === 1 ? "one state page" : `${states.length} state pages`;
  return `${carrier.name} is one of our editorial picks on ${pages}: ${names}. If you garage elsewhere, that reflects our selection for those pages, not ${carrier.name}'s license footprint, which may be broader.`;
}

function packageNote(
  carrier: Carrier,
  products: ReadonlyArray<ListedProduct>,
): string {
  const has = (slug: ProductSlug) => products.some((p) => p.slug === slug);
  const naic = carrier.naicGroupCode
    ? ` To look the group up in a state insurance department's company search, use NAIC group code ${carrier.naicGroupCode}.`
    : "";
  let pack: string;
  if (has("primary-liability") && has("physical-damage") && has("motor-truck-cargo")) {
    pack = `Because ${carrier.name} is listed for liability, physical damage, and cargo, you can ask for all three on one quote and compare the package with separate policies.`;
  } else if (has("primary-liability") && has("general-liability")) {
    pack = `Because ${carrier.name} is listed for both primary and general liability, ask how a loading or unloading claim would be divided between the two policies. Cargo would need a separate quote.`;
  } else if (has("primary-liability") && has("motor-truck-cargo")) {
    pack = `${carrier.name} is listed for liability and cargo but not physical damage, so financed equipment would need a separate physical damage quote that satisfies the lender.`;
  } else if (has("primary-liability") && has("physical-damage")) {
    pack = `${carrier.name} is listed for liability and physical damage but not cargo, so check what your broker agreements require for cargo and where that policy would come from.`;
  } else {
    pack = `${carrier.name} is listed here for primary liability only, so cargo and physical damage would be separate quotes; ask the producer to line up the effective dates.`;
  }
  return `${pack}${naic} Start with these checks:`;
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

/* One line on the AM Best category shown on this page. The full explanation
   of the categories lives once, on /carriers#ratings. */
function ratingMeaning(carrier: Carrier): string {
  if (carrier.notRated === true) {
    return "AM Best has not assigned this company a Financial Strength Rating.";
  }
  const rating =
    carrier.amBestRating && carrier.amBestVerifiedAt ? carrier.amBestRating : "";
  if (rating.startsWith("A++") || rating.startsWith("A+")) {
    return "That is AM Best's Superior category, the highest group.";
  }
  if (rating.startsWith("A")) {
    return "That is AM Best's Excellent category, the second group.";
  }
  return "We have not yet verified this company's current rating.";
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
        <p className="ins-hero-sub">
          {ratingMeaning(carrier)} {ratingAdvice(carrier)}
        </p>
        {carrier.naicGroupCode ? (
          <p className="ins-compliance-note">
            NAIC group code: <code>{carrier.naicGroupCode}</code>.
          </p>
        ) : null}
        <p className="ins-compliance-note">
          <Link href="/carriers#ratings">
            What the rating categories mean and how we verify them
          </Link>
          .
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
            <p className="ins-hero-sub">{linesSummary(carrier, products)}</p>
            <p className="ins-hero-sub">{linesGap(carrier, products)}</p>
            <p className="ins-compliance-note">
              <Link href="/carriers#lines">
                What each trucking line covers, in brief
              </Link>
              .
            </p>
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
        <p className="ins-hero-sub">{statesSummary(carrier, states)}</p>
        <p className="ins-compliance-note">
          <Link href="/carriers#how-listed">How carriers are listed</Link>.
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
        <p className="ins-hero-sub">{packageNote(carrier, products)}</p>
        <ul>
          {products.map((p) => {
            const guide = getProductGuide(p.slug as ProductSlug);
            return (
              <li key={p.slug}>
                <strong>{p.shortLabel}:</strong>{" "}
                {guide.checkOnQuote[0]}{" "}
                <Link href={`/insurance/${p.slug}`}>Full checklist</Link>
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
          Coverage is placed by licensed producers and bound by carriers.{" "}
          <Link href="/carriers#how-listed">How carriers are listed</Link>.
        </p>
        <p>
          <Link href="/insurance">← Back to commercial trucking insurance</Link>
        </p>
      </div>
    </section>
  );
}
