import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, type Product } from "@/lib/data/products";
import {
  getInsuranceState,
  type InsuranceState,
} from "@/lib/data/states";
import { getDotClass, type DotClass } from "@/lib/data/dotClasses";
import { getCarrier, type Carrier } from "@/lib/data/carriers";
// (getAllDotClasses no longer used — DOT-class directory was on the old template)
import {
  getDeepMoneyPages,
  isDeepMoneyPagePublished,
} from "@/lib/data/moneyPageIndex";
import {
  getRate,
  getProfileForObservation,
  type ProxyType,
} from "@/lib/data/rates";
import { getEditorial, type EditorialBody } from "@/lib/data/editorial";
import {
  JsonLd,
  article,
  breadcrumbList,
  financialProduct,
} from "@/components/seo/JsonLd";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/seo/Breadcrumbs";
import EditorialByline from "@/components/landing/EditorialByline";
import { metaInsuranceDeep } from "@/lib/seo/metadataPatterns";
import CarrierCardList from "@/components/compare/CarrierCardList";
import {
  INSURANCE_CONSENT_TEXT,
  INSURANCE_CONSENT_VERSION,
} from "@/lib/insuranceConsent";
import { BROKER_PARTNER_NAME } from "@/lib/insuranceLeadStore";

type Params = { product: string; state: string; dotClass: string };

export const dynamicParams = false;

export async function generateStaticParams(): Promise<Params[]> {
  return getDeepMoneyPages().map((p) => ({
    product: p.productSlug,
    state: p.stateSlug,
    dotClass: p.dotClassSlug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { product, state, dotClass } = await params;
  const p = getProduct(product);
  const s = getInsuranceState(state);
  const dc = getDotClass(dotClass);
  if (!p || !s || !dc) return {};
  const { title, description } = metaInsuranceDeep({
    productName: p.name,
    productShortLabel: p.shortLabel,
    dotClassName: dc.name,
    dotClassShortLabel: dc.shortLabel,
    stateName: s.name,
  });
  const canonical = `/insurance/${p.slug}/${s.slug}/${dc.slug}`;
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

function proxyEyebrow(proxyType: ProxyType): string {
  switch (proxyType) {
    case "state-doi-filing":
      return "Sampled premium band — state DOI filing";
    case "carrier-published-guidance":
      return "Indicative band — carrier-published guidance";
    case "national-average-proxy":
      return "Indicative band — national-average proxy";
  }
}

function proxyDisclosure(proxyType: ProxyType, state: InsuranceState): string {
  switch (proxyType) {
    case "state-doi-filing":
      return `Sampled directly from a public ${state.doi.name} rate filing against the named profile below.`;
    case "carrier-published-guidance":
      return `This band reflects the carrier's own publicly-disclosed guidance for owner-operators — not a state-specific rate filing. We will replace it with a sourced ${state.doi.name} filing once extracted.`;
    case "national-average-proxy":
      return `This band reflects national-average industry data, not a ${state.name}-specific filing. We will replace it with a sourced ${state.doi.name} filing once extracted.`;
  }
}

const fmtUsd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export default async function DeepMoneyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { product, state, dotClass } = await params;
  const p = getProduct(product);
  const s = getInsuranceState(state);
  const dc = getDotClass(dotClass);
  if (!p || !s || !dc) notFound();
  if (!isDeepMoneyPagePublished(p.slug, s.slug, dc.slug)) notFound();

  const observation = getRate(s.abbr, p.slug, dc.slug);
  const profile = observation ? getProfileForObservation(observation) : null;
  const editorial = getEditorial(p.slug, s.slug, dc.slug);
  const carriers = s.topCarriers
    .map((slug) => getCarrier(slug))
    .filter((c): c is Carrier => c !== null);
  const today = new Date().toISOString().slice(0, 10);
  const url = `https://dispatched.finance/insurance/${p.slug}/${s.slug}/${dc.slug}`;
  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Dispatched", url: "https://dispatched.finance/" },
    { name: "Insurance", url: "https://dispatched.finance/insurance" },
    {
      name: p.name,
      url: `https://dispatched.finance/insurance/${p.slug}`,
    },
    {
      name: s.name,
      url: `https://dispatched.finance/insurance/${p.slug}/${s.slug}`,
    },
    { name: dc.name, url },
  ];

  return (
    <div className="deep-money-page">
      <JsonLd payload={breadcrumbList(breadcrumbs)} />
      <JsonLd
        payload={article({
          headline: `${p.name} for ${dc.name} in ${s.name}`,
          description: `${p.shortLabel} carriers, sampling profile, and rate environment for ${dc.name.toLowerCase()} operators in ${s.name}.`,
          url,
          datePublished: today,
          dateModified: today,
        })}
      />
      <JsonLd
        payload={financialProduct({
          name: `${p.name} (${s.name}, ${dc.shortLabel})`,
          description: p.oneLine,
          url,
          category: "Commercial Trucking Insurance",
        })}
      />

      <main id="main-content">
        <div className="container">
          <Breadcrumbs items={breadcrumbs} />
          <HeroZone
            product={p}
            state={s}
            dotClass={dc}
            observation={observation}
            today={today}
          />
        </div>
        <QuoteSection product={p} state={s} dotClass={dc} />
        {profile ? <ProfileSection profile={profile} /> : null}
        <CarriersSection state={s} carriers={carriers} />
        <EditorialSection state={s} dotClass={dc} editorial={editorial} />
        <ComplianceFooter state={s} product={p} />
      </main>
    </div>
  );
}

function HeroZone({
  product,
  state,
  dotClass,
  observation,
  today,
}: {
  product: Product;
  state: InsuranceState;
  dotClass: DotClass;
  observation: ReturnType<typeof getRate>;
  today: string;
}) {
  return (
    <section className="hero-zone" aria-labelledby="hero-h1">
      <div className="hero-tags">
        <span className="tag tag--accent">{product.shortLabel}</span>
        <span className="tag">{state.abbr}</span>
        <span className="tag">{dotClass.shortLabel}</span>
      </div>
      <h1 id="hero-h1" className="hero-h1">
        {product.name} for {state.abbr} {dotClass.shortLabel.toLowerCase()}{" "}
        owner-operators.
      </h1>
      <EditorialByline updated={today} />
      <p className="hero-lead">{product.oneLine}</p>
      {observation ? (
        <RatePanel
          observation={observation}
          state={state}
          product={product}
          dotClass={dotClass}
        />
      ) : (
        <RatePending state={state} product={product} dotClass={dotClass} />
      )}
    </section>
  );
}

function RatePanel({
  observation,
  state,
  product,
  dotClass,
}: {
  observation: NonNullable<ReturnType<typeof getRate>>;
  state: InsuranceState;
  product: Product;
  dotClass: DotClass;
}) {
  return (
    <div className="rate-panel">
      <div>
        <p className="rate-eyebrow">{proxyEyebrow(observation.proxyType)}</p>
        <h2
          className="rate-display"
          aria-label={`${fmtUsd.format(observation.premiumLowAnnual)} to ${fmtUsd.format(observation.premiumHighAnnual)} per year`}
        >
          {fmtUsd.format(observation.premiumLowAnnual)}
          <span className="rate-unit">to</span>
          {fmtUsd.format(observation.premiumHighAnnual)}
          <span className="rate-unit">/year</span>
        </h2>
        <p className="rate-disclosure">
          <strong>Indicative, not a quote.</strong>{" "}
          {proxyDisclosure(observation.proxyType, state)} Your actual premium
          depends on MVR, claims history, equipment, and underwriter appetite.
        </p>
        <div className="rate-source">
          {observation.source?.url ? (
            <span>
              Source:{" "}
              <a
                href={observation.source.url}
                target="_blank"
                rel="noopener"
              >
                {observation.source.label}
              </a>
            </span>
          ) : (
            <span>Source: {observation.source?.label ?? "Pending"}</span>
          )}
          <span>Sampled {observation.sampledAt}</span>
          <span>
            <Link href="/methodology">Read methodology</Link>
          </span>
        </div>
      </div>
      <BylineStrip observation={observation} />
    </div>
  );
}

function BylineStrip({
  observation,
}: {
  observation: NonNullable<ReturnType<typeof getRate>>;
}) {
  return (
    <div className="byline-strip">
      <div className="byline-row">
        <span className="byline-key">Last updated</span>
        <span>Sampled {observation.sampledAt}</span>
      </div>
      <div className="byline-row">
        <span className="byline-key">Methodology</span>
        <span>State DOI filings, no paid feeds</span>
      </div>
      <div className="byline-row">
        <span className="byline-key">Reviewer</span>
        <span>Pending attestation</span>
      </div>
      <div className="byline-row">
        <span className="byline-key">Source class</span>
        <span>{observation.proxyType.replace(/-/g, " ")}</span>
      </div>
    </div>
  );
}

function RatePending({
  state,
  product,
  dotClass,
}: {
  state: InsuranceState;
  product: Product;
  dotClass: DotClass;
}) {
  return (
    <div className="rate-panel">
      <div>
        <p className="rate-eyebrow">Rate band pending</p>
        <p className="rate-disclosure">
          We have not yet extracted a public {state.doi.name} filing for{" "}
          {product.shortLabel.toLowerCase()} on{" "}
          {dotClass.name.toLowerCase()} operators in {state.name}. The
          carriers writing the line are listed below; the band will publish
          here once a filing is reviewed.
        </p>
      </div>
      <div className="byline-strip">
        <div className="byline-row">
          <span className="byline-key">Last updated</span>
          <span>Pending DOI extraction</span>
        </div>
        <div className="byline-row">
          <span className="byline-key">Methodology</span>
          <span>State DOI filings, no paid feeds</span>
        </div>
        <div className="byline-row">
          <span className="byline-key">Reviewer</span>
          <span>Pending attestation</span>
        </div>
      </div>
    </div>
  );
}

function QuoteSection({
  product,
  state,
  dotClass,
}: {
  product: Product;
  state: InsuranceState;
  dotClass: DotClass;
}) {
  return (
    <section className="quote-section" aria-labelledby="quote-h2">
      <div className="container quote-grid">
        <QuoteCard product={product} state={state} dotClass={dotClass} />
        <ReadinessPanel />
      </div>
    </section>
  );
}

function QuoteCard({
  product,
  state,
  dotClass,
}: {
  product: Product;
  state: InsuranceState;
  dotClass: DotClass;
}) {
  return (
    <div className="quote-card">
      <p className="quote-eyebrow">Free quote · No credit pull · 1 minute</p>
      <h2 id="quote-h2" className="quote-h2">
        Send your operator profile to {BROKER_PARTNER_NAME}.
      </h2>

      <div className="preset-chips" aria-label="Preselected">
        <span className="preset-chip">
          <span className="preset-chip-key">Product</span> {product.shortLabel}
        </span>
        <span className="preset-chip">
          <span className="preset-chip-key">State</span> {state.name}
        </span>
        <span className="preset-chip">
          <span className="preset-chip-key">Class</span> {dotClass.shortLabel}
        </span>
      </div>

      <form
        method="post"
        action="/insurance/quote"
        aria-label="Insurance quote intake"
      >
        <input type="hidden" name="productSlug" value={product.slug} />
        <input type="hidden" name="stateSlug" value={state.slug} />
        <input type="hidden" name="dotClass" value={dotClass.slug} />
        <input
          type="hidden"
          name="sourceUrl"
          value={`/insurance/${product.slug}/${state.slug}/${dotClass.slug}`}
        />
        <input
          type="hidden"
          name="consentVersion"
          value={INSURANCE_CONSENT_VERSION}
        />
        <input type="hidden" name="consentText" value={INSURANCE_CONSENT_TEXT} />

        <div className="field-row field-row--two">
          <label className="field" htmlFor="zip">
            <span className="field-label">ZIP code</span>
            <input
              id="zip"
              className="field-input"
              name="zip"
              type="text"
              inputMode="numeric"
              pattern="[0-9]{5}"
              minLength={5}
              maxLength={5}
              required
              autoComplete="postal-code"
              placeholder="78701"
            />
          </label>
          <label className="field" htmlFor="radius">
            <span className="field-label">Typical radius</span>
            <select
              id="radius"
              className="field-input"
              name="radius"
              required
              defaultValue=""
            >
              <option value="" disabled>
                Pick one
              </option>
              <option value="local-100">Local — within 100 mi</option>
              <option value="regional-500">Regional — within 500 mi</option>
              <option value="long-haul-1000+">
                Long-haul — 1,000+ mi
              </option>
            </select>
          </label>
        </div>

        <div className="field-row">
          <label className="field" htmlFor="name">
            <span className="field-label">Full name</span>
            <input
              id="name"
              className="field-input"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="First and last"
            />
          </label>
        </div>

        <div className="field-row field-row--two">
          <label className="field" htmlFor="mobile">
            <span className="field-label">Mobile</span>
            <input
              id="mobile"
              className="field-input"
              name="mobile"
              type="tel"
              required
              autoComplete="tel"
              placeholder="(555) 010-4477"
            />
          </label>
          <label className="field" htmlFor="email">
            <span className="field-label">Email</span>
            <input
              id="email"
              className="field-input"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
            />
          </label>
        </div>

        <label className="deep-consent" htmlFor="consent">
          <input
            id="consent"
            name="oneToOneConsent"
            type="checkbox"
            value="true"
            required
          />
          <span>{INSURANCE_CONSENT_TEXT}</span>
        </label>

        <div className="submit-row">
          <button type="submit" className="btn btn--primary btn--full">
            Send to {BROKER_PARTNER_NAME}
          </button>
        </div>

        <p className="quote-foot">
          Consent is one-to-one with {BROKER_PARTNER_NAME}. We do not share
          your information beyond this named partner. Standard message and
          data rates may apply.
        </p>
      </form>
    </div>
  );
}

function ReadinessPanel() {
  return (
    <aside className="readiness" aria-labelledby="readiness-h3">
      <p className="readiness-eyebrow">Have these ready</p>
      <h3 id="readiness-h3" className="readiness-h3">
        Four artifacts most carriers ask for at first contact.
      </h3>
      <ul className="readiness-list">
        <li>
          <div>
            <strong>FMCSA MC and DOT numbers</strong>
            <span>
              Active authority status; the broker pulls SAFER for safety
              scores in the same call.
            </span>
          </div>
        </li>
        <li>
          <div>
            <strong>Driver MVR — last 36 months</strong>
            <span>
              Major violations and at-fault accidents drive the band more
              than anything else.
            </span>
          </div>
        </li>
        <li>
          <div>
            <strong>Equipment year and stated value</strong>
            <span>
              Tractor model year and the value you would insure to. Trailer
              too if owned.
            </span>
          </div>
        </li>
        <li>
          <div>
            <strong>Three months of bank statements</strong>
            <span>
              Carriers want to see operations stability, not credit. Soft
              pull only.
            </span>
          </div>
        </li>
      </ul>
      <p className="readiness-foot">
        Don&apos;t have all four yet? Submit anyway. {BROKER_PARTNER_NAME}{" "}
        will follow up to fill gaps.
      </p>
    </aside>
  );
}

function ProfileSection({
  profile,
}: {
  profile: NonNullable<ReturnType<typeof getProfileForObservation>>;
}) {
  return (
    <section className="profile-section" aria-labelledby="profile-h2">
      <div className="container">
        <p className="profile-eyebrow">Sampling profile</p>
        <h2 id="profile-h2" className="profile-h2">
          The exact operator scenario this band is anchored to.
        </h2>
        <p className="profile-lede">
          A premium band is meaningless without the operator profile it was
          sampled against. Below is the scenario we sampled — reproduced
          verbatim. Your actual band shifts as your profile diverges from
          this one.
        </p>
        <div className="profile-grid">
          <div className="profile-row">
            <span className="profile-key">Driver</span>
            <span className="profile-val">{profile.driver}</span>
          </div>
          <div className="profile-row">
            <span className="profile-key">Vehicle</span>
            <span className="profile-val">{profile.vehicle}</span>
          </div>
          <div className="profile-row">
            <span className="profile-key">Coverage</span>
            <span className="profile-val">{profile.coverage}</span>
          </div>
          <div className="profile-row">
            <span className="profile-key">Operations</span>
            <span className="profile-val">{profile.operations}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function CarriersSection({
  state,
  carriers,
}: {
  state: InsuranceState;
  carriers: Carrier[];
}) {
  return (
    <section className="carriers-section" aria-labelledby="carriers-h2">
      <div className="container">
        <p className="carriers-eyebrow">Carriers writing in {state.abbr}</p>
        <h2 id="carriers-h2" className="carriers-h2">
          {carriers.length === 1
            ? "One carrier"
            : `${carriers.length} carriers`}{" "}
          we expect to quote this risk in {state.name}.
        </h2>
        <p className="carriers-lede">
          AM Best ratings shown below were verified directly. Whether a
          specific carrier currently has open appetite for your operation is
          the producer&apos;s call at submission.
        </p>
        <CarrierCardList carriers={carriers} />
        <p className="carriers-foot">
          AM Best ratings change. Dispatched displays the rating only when
          verified against ambest.com and stamped with the verification date
          in our data layer. Pending entries reflect that we have not
          completed verification — not that the carrier&apos;s rating is
          missing or weak.
        </p>
      </div>
    </section>
  );
}

function EditorialSection({
  state,
  dotClass,
  editorial,
}: {
  state: InsuranceState;
  dotClass: DotClass;
  editorial: EditorialBody | null;
}) {
  // When a per-deep-page editorial entry exists, render its headline + body
  // + sources. Otherwise fall back to a class-context block sourced from
  // the DotClass + state regulatory notes.
  return (
    <section className="editorial-section" aria-labelledby="editorial-h2">
      <div className="container editorial-grid">
        <div>
          <p className="editorial-eyebrow">
            {editorial ? "Editorial" : `${dotClass.name} context`}
          </p>
          <h2 id="editorial-h2" className="editorial-h2">
            {editorial
              ? editorial.headline
              : `What drives premiums for ${dotClass.name.toLowerCase()} risks in ${state.name}.`}
          </h2>
          <div className="editorial-body">
            {editorial ? (
              editorial.paragraphs.map((p, i) => <p key={i}>{p}</p>)
            ) : (
              <>
                <p>
                  <strong>{dotClass.name}.</strong>{" "}
                  {dotClass.typicalOperation}. Typical GVWR range:{" "}
                  {dotClass.gvwrRange}. Example vehicles:{" "}
                  {dotClass.exampleVehicles.join(", ")}.{" "}
                  {dotClass.cdlRequired
                    ? "CDL required."
                    : "CDL often not required (verify by GVWR)."}
                </p>
                {state.tortReformNote ? <p>{state.tortReformNote}</p> : null}
                {state.surplusLinesNote ? (
                  <p>{state.surplusLinesNote}</p>
                ) : null}
                {state.fmcsaServiceCenter ? (
                  <p>
                    <strong>FMCSA jurisdiction:</strong>{" "}
                    {state.fmcsaServiceCenter}.
                  </p>
                ) : null}
              </>
            )}
          </div>
        </div>
        <aside className="deep-sources" aria-label="Sources">
          <p className="deep-sources-eyebrow">Sources</p>
          <ul>
            {editorial ? (
              editorial.sources.map((s, i) => (
                <li key={i}>
                  {s.url ? (
                    <a href={s.url} target="_blank" rel="noopener">
                      {s.label}
                    </a>
                  ) : (
                    <span>{s.label}</span>
                  )}
                </li>
              ))
            ) : (
              <>
                <li>
                  <a href={state.doi.url} target="_blank" rel="noopener">
                    {state.doi.name}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-387"
                    target="_blank"
                    rel="noopener"
                  >
                    FMCSA 49 CFR Part 387 — Minimum Levels of Financial
                    Responsibility
                  </a>
                </li>
                <li>
                  <Link href="/methodology">Dispatched methodology</Link>
                </li>
              </>
            )}
          </ul>
          {editorial?.reviewer && editorial.lastReviewedAt ? (
            <p className="reviewer-pending">
              Reviewed by {editorial.reviewer.name},{" "}
              {editorial.reviewer.credential}, on {editorial.lastReviewedAt}.
            </p>
          ) : (
            <p className="reviewer-pending">
              Reviewer attestation pending. The body above is sourced but
              has not yet been signed off by a credentialed reviewer.
            </p>
          )}
        </aside>
      </div>
    </section>
  );
}

function ComplianceFooter({
  state,
  product,
}: {
  state: InsuranceState;
  product: Product;
}) {
  return (
    <section className="compliance-section">
      <div className="container">
        <p className="compliance-text">
          Dispatched is a comparison and matching platform. In {state.name},
          coverage is placed by licensed producers and bound by carriers
          appointed in {state.abbr}; Dispatched does not bind coverage.
          Where we accept your contact information for a quote, that consent
          will be one-to-one with the named producer partner identified at
          submission.
        </p>
        <p className="compliance-text">
          <Link href={`/insurance/${product.slug}/${state.slug}`}>
            ← Back to {product.shortLabel.toLowerCase()} in {state.name}
          </Link>
        </p>
      </div>
    </section>
  );
}

