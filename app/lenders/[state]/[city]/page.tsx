import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  JsonLd,
  article,
  breadcrumbList,
  faqPage,
  itemList,
} from "@/components/seo/JsonLd";
import {
  getAllCities,
  getCity,
  LOW_COVERAGE_THRESHOLD,
  type City,
} from "@/lib/cities";
import {
  LENDER_TYPE_LABELS,
  getAllLenders,
  type LenderEntry,
  type LenderType,
} from "@/lib/data/lenders";
import {
  getStateContext,
  type StateContextEntry,
} from "@/lib/data/lenderStateContext";

type Params = { state: string; city: string };

export const dynamicParams = false;

const ORIGIN = "https://dispatched.finance";
const SET_URL = `${ORIGIN}/lenders`;

export async function generateStaticParams(): Promise<Params[]> {
  return getAllCities().map((c) => ({
    state: c.stateSlug,
    city: c.citySlug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { state, city } = await params;
  const entry = getCity(state, city);
  if (!entry) return {};
  const title = `Trucking Lenders in ${entry.city}, ${entry.state} 2026 | Dispatched`;
  const description = `Curated trucking lenders serving ${entry.city}, ${entry.state} carriers: factoring, equipment, working capital, and ABL. City freight context and state compliance.`;
  const canonical = `/lenders/${entry.stateSlug}/${entry.citySlug}`;
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

function lenderCard(l: LenderEntry) {
  const types = l.types
    .map((t) => LENDER_TYPE_LABELS[t as LenderType])
    .join(" · ");
  return (
    <article key={l.slug} className="research-cta-card">
      <h3>{l.name}</h3>
      <p>
        <strong>Best for:</strong> {l.bestFor}
        {l.founded ? ` · Founded ${l.founded}` : ""}
        {l.hqState ? ` · HQ ${l.hqState}` : ""}
      </p>
      <p>{l.blurb}</p>
      <p>
        <strong>Products:</strong> {types}
      </p>
      <p>
        <a href={l.url} target="_blank" rel="noopener noreferrer">
          {l.name} website →
        </a>
      </p>
    </article>
  );
}

function filterByBestFor(
  lenders: ReadonlyArray<LenderEntry>,
  needles: ReadonlyArray<string>,
): ReadonlyArray<LenderEntry> {
  return lenders.filter((l) =>
    needles.some((n) => l.bestFor.toLowerCase().includes(n)),
  );
}

function cityFAQs(entry: City) {
  return [
    {
      q: `Which lenders serve trucking businesses in ${entry.city}?`,
      a: `All 12 lenders on the Dispatched panel serve ${entry.city}, including factoring (Apex, eCapital, RTS, Triumph, TBS, OTR), equipment financing (Lendio, Bluevine), and working capital. The right match depends on your operational profile — see the use-case sections above.`,
    },
    {
      q: `Are there ${entry.city}-specific lenders besides the national ones?`,
      a: `Regional lenders sometimes serve ${entry.city} carriers in addition to the national panel. Examples of regional players in some states are listed in our state pages. For most owner-operators, the national panel offers competitive rates and broader scale; regional lenders typically fit specific use cases (regional bank relationships, state-specific programs).`,
    },
    {
      q: `What's the typical APR range for trucking loans in ${entry.state}?`,
      a: `Working capital APR runs roughly ${entry.aprRangeLow}-${entry.aprRangeHigh}% on the Dispatched panel for ${entry.state} carriers, with equipment financing in the 9-18% band. Rates depend on credit, revenue history, down payment, and equipment age.`,
    },
    {
      q: `How fast can I get funded for a truck loan in ${entry.city}?`,
      a: `Pre-qualification takes 6-9 minutes (soft pull, no credit impact). After accepting a term sheet, equipment loans typically fund in 5-10 business days for ${entry.city} buyers; working capital loans fund in 24-72 hours from approval.`,
    },
    {
      q: `Do ${entry.city}-based factoring companies pay faster than national ones?`,
      a: `Funding speed depends on the factor, not the city. National factors (Apex blynk®, OTR BOLT) fund in minutes 24/7/365 regardless of carrier location. ${entry.city}-area regional factors may have slightly faster onboarding but typically don't beat the national factors on funding speed at scale.`,
    },
  ];
}

export default async function CityLendersPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { state, city } = await params;
  const entry = getCity(state, city);
  if (!entry) notFound();
  if (entry.stateLenderPanelCount < LOW_COVERAGE_THRESHOLD) {
    redirect(`/lenders/${entry.stateSlug}`);
  }

  const today = new Date().toISOString().slice(0, 10);
  const url = `${ORIGIN}/lenders/${entry.stateSlug}/${entry.citySlug}`;
  const stateUrl = `${ORIGIN}/lenders/${entry.stateSlug}`;
  const stateContext: StateContextEntry | undefined = getStateContext(
    entry.stateSlug,
  );
  const lenders = getAllLenders();
  const faqs = cityFAQs(entry);

  const ownerOpLenders = filterByBestFor(lenders, ["owner-operator"]);
  const fleetLenders = filterByBestFor(lenders, ["fleet"]);
  const newAuthorityLenders = filterByBestFor(lenders, ["new-authority"]);
  const badCreditLenders = filterByBestFor(lenders, [
    "bad-credit",
    "transparency-first",
    "marketplace",
  ]);

  const corridors =
    stateContext?.curated?.corridors ?? [
      entry.statePrimaryCorridor,
      entry.stateSecondaryCorridor,
    ];

  return (
    <div className="research-page">
      <JsonLd
        payload={breadcrumbList([
          { name: "Home", url: `${ORIGIN}/` },
          { name: "Lenders", url: SET_URL },
          { name: entry.state, url: stateUrl },
          { name: entry.city, url },
        ])}
      />
      <JsonLd
        payload={article({
          headline: `Trucking Lenders in ${entry.city}, ${entry.state} 2026`,
          description: `Curated trucking lenders serving ${entry.city}, ${entry.state} carriers: factoring, equipment financing, working capital, and ABL.`,
          url,
          datePublished: today,
          dateModified: today,
        })}
      />
      <JsonLd
        payload={itemList({
          name: `Trucking Lenders in ${entry.city}, ${entry.state} 2026`,
          description: `Lenders serving ${entry.city}, ${entry.state} for factoring, equipment financing, working capital, and asset-based lending.`,
          items: lenders.map((l) => ({
            name: l.name,
            url: l.url,
            description: l.bestFor,
          })),
        })}
      />
      <JsonLd payload={faqPage(faqs)} />

      <main id="main-content">
        <div className="research-container">
          <header className="research-header">
            <p className="research-eyebrow">
              Dispatched · Lenders · {entry.state} · {entry.city}
            </p>
            <h1 className="research-h1">
              Trucking lenders in {entry.city}, {entry.state}, 2026.
            </h1>
            <p className="research-subhead">
              Curated lenders serving {entry.city} carriers: factoring,
              equipment, working capital, and ABL. City freight context and{" "}
              {entry.state} compliance reminders. Updated May 2026.
            </p>
            <p className="research-meta">
              {lenders.length} lenders ·{" "}
              {entry.localStatOperatorCount} registered owner-operators in{" "}
              {entry.state} · {entry.localStatFundedCount} matched in last 90
              days · Updated {entry.dataRefreshDate} ·{" "}
              <Link href={`/lenders/${entry.stateSlug}`}>
                Back to {entry.state}
              </Link>
            </p>
          </header>

          <section className="research-section" id="city-market">
            <h2>The {entry.city} freight market</h2>
            <p>
              {entry.cityWeatherContext}. That shows up as{" "}
              {entry.cityCostPressure} on a {entry.city} carrier&apos;s P&amp;L,
              with the seasonal peak landing in {entry.citySeasonalMonth} and a
              tracked average repair ticket near ${entry.cityAvgRepairCost}.
              {entry.state} hosts roughly {entry.localStatOperatorCount}{" "}
              registered owner-operators; Dispatched has matched{" "}
              {entry.localStatFundedCount} of them with capital in the last 90
              days at a median amount of ${entry.localStatMedianAmount} and a
              median time to funds of {entry.localStatMedianHours} hours.
            </p>
            <p>
              Working-capital APR on the {entry.state} panel typically falls
              in the {entry.aprRangeLow}-{entry.aprRangeHigh}% band, with
              equipment financing tracking the 9-18% national range. Rates
              depend on credit, revenue history, down payment, and equipment
              age — not on which {entry.state} city you operate out of.
            </p>
            <h3>Major freight corridors near {entry.city}</h3>
            <ul className="research-list">
              {corridors.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </section>

          {stateContext?.curated?.regulatoryNote ? (
            <section className="research-section" id="state-regulatory">
              <h2>{entry.state} regulatory considerations</h2>
              <p>{stateContext.curated.regulatoryNote}</p>
            </section>
          ) : (
            <section className="research-section" id="state-summary">
              <h2>The {entry.state} trucking-finance picture</h2>
              <p>
                {entry.state} carriers operate under the same federal regime —
                MC#, DOT#, BOC-3, UCR — as every other state, with{" "}
                {entry.state}-administered IRP apportioned registration and
                IFTA quarterly fuel-tax filing on top. Commercial lending
                activity in {entry.state} is regulated under{" "}
                {entry.stateLicensingAuthority} ({entry.stateLicensingCitation}
                ), and every lender on the panel either holds the required{" "}
                {entry.stateLicenseType} or operates under the applicable
                exemption.
              </p>
            </section>
          )}

          <section className="research-section" id="lenders">
            <h2>
              Lenders serving {entry.city}, {entry.state}
            </h2>
            <p>
              All 12 directory lenders serve {entry.city} carriers. The lender
              list is the same nationwide; the operational answer changes
              city-by-city because of corridor mix, freight seasonality, and
              {" "}
              {entry.state}-specific compliance. Links open the lender&apos;s
              own site in a new tab; we do not get paid for these placements.
            </p>
            <div className="research-cta-grid">
              {lenders.map((l) => lenderCard(l))}
            </div>
          </section>

          <section className="research-section" id="use-cases">
            <h2>
              By use case in {entry.city}
            </h2>
            <p>
              Lender fit follows operator profile, not city. The buckets below
              localize the same 12-lender panel to a {entry.city} carrier&apos;s
              starting point: single-truck owner-operator, mid-fleet, new
              authority inside the first year, or operators with non-traditional
              underwriting needs.
            </p>

            {ownerOpLenders.length > 0 ? (
              <>
                <h3>Owner-operators in {entry.city}</h3>
                <p>
                  Single-truck and two-truck operators with their own MC# get
                  the most leverage from factoring + fuel-card economics. The
                  lenders below are owner-operator-native: rate, contract
                  terms, and ancillary value are tuned for the single-truck
                  profile.
                </p>
                <ul className="research-list">
                  {ownerOpLenders.map((l) => (
                    <li key={l.slug}>
                      <strong>{l.name}</strong> — {l.blurb}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            {fleetLenders.length > 0 ? (
              <>
                <h3>Mid-fleets in {entry.city}</h3>
                <p>
                  Fleets of 5 or more trucks running out of {entry.city} need
                  factoring + ancillary credit products (asset-based lending,
                  equipment financing) under one roof. The lenders below scale
                  cleanly from a 5-truck operation into 50+ trucks without
                  forcing a product change at each tier.
                </p>
                <ul className="research-list">
                  {fleetLenders.map((l) => (
                    <li key={l.slug}>
                      <strong>{l.name}</strong> — {l.blurb}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            {newAuthorityLenders.length > 0 ? (
              <>
                <h3>New authority in {entry.city}</h3>
                <p>
                  First-year MC# operators based in {entry.city} (under 90 days
                  of broker history) struggle with most working-capital lenders.
                  Factoring is often the only working-capital tool available,
                  and a small subset of factors specializes in funding brand-new
                  authority inside the first 30 days.
                </p>
                <ul className="research-list">
                  {newAuthorityLenders.map((l) => (
                    <li key={l.slug}>
                      <strong>{l.name}</strong> — {l.blurb}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            {badCreditLenders.length > 0 ? (
              <>
                <h3>
                  Bad credit / non-traditional underwriting in {entry.city}
                </h3>
                <p>
                  Sub-580 FICOs, recent bankruptcies, and thin-credit-file
                  operators in {entry.city} should start with factors that
                  underwrite the broker, not the trucker — and with
                  marketplaces that shop across multiple lender appetites
                  rather than locking you into one underwriting box.
                </p>
                <ul className="research-list">
                  {badCreditLenders.map((l) => (
                    <li key={l.slug}>
                      <strong>{l.name}</strong> — {l.blurb}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </section>

          <section className="research-section" id="compliance">
            <h2>{entry.state} compliance reminders</h2>
            <p>
              State-level compliance matters more to lenders than most{" "}
              {entry.city} owner-operators expect. A clean DOT pull, current
              MCS-150, correct BOC-3 process-agent designation, and unbroken
              UCR + IFTA filings are what get the lender past intake. Bookmark
              these glossary entries:
            </p>
            <ul className="research-list">
              <li>
                <Link href="/glossary/dot-number">
                  <strong>DOT Number</strong>
                </Link>{" "}
                — federal safety registration; pull is the first thing a
                lender checks.
              </li>
              <li>
                <Link href="/glossary/mc-number">
                  <strong>MC Number</strong>
                </Link>{" "}
                — for-hire interstate operating authority; required for
                factoring on any standard lender panel.
              </li>
              <li>
                <Link href="/glossary/ifta">
                  <strong>IFTA</strong>
                </Link>{" "}
                — quarterly fuel-tax filing administered by {entry.state};
                audit triggers compress cash flow fast.
              </li>
              <li>
                <Link href="/glossary/irp">
                  <strong>IRP</strong>
                </Link>{" "}
                — apportioned registration; required for most interstate
                Class 8 operations out of {entry.city}.
              </li>
              <li>
                <Link href="/glossary/ucr">
                  <strong>UCR</strong>
                </Link>{" "}
                — annual federal fee funding state-level enforcement; lapses
                flag during underwriting.
              </li>
            </ul>
          </section>

          <section className="research-section" id="faq">
            <h2>FAQ — Trucking lenders in {entry.city}</h2>
            {faqs.map((qa) => (
              <div key={qa.q}>
                <h3>{qa.q}</h3>
                <p>{qa.a}</p>
              </div>
            ))}
          </section>

          <section className="research-section research-cta">
            <h2>Ready to qualify in {entry.city}?</h2>
            <p>
              The directory is the upper-funnel layer. If you are a{" "}
              {entry.city} carrier ready to move on financing or factoring,
              start the matching flow — soft pull, no credit impact to begin.
              We route you to the lender panel matching your authority age,
              credit profile, and capital need.
            </p>
            <div className="research-cta-grid">
              <Link href="/qualify" className="research-cta-card">
                <h3>Qualify in 3 minutes</h3>
                <p>
                  Soft pull, no credit impact. Routed to the lender panel
                  matching your authority age, credit profile, and capital
                  need.
                </p>
              </Link>
              <Link
                href={`/lenders/${entry.stateSlug}`}
                className="research-cta-card"
              >
                <h3>All of {entry.state}</h3>
                <p>
                  Same 12 lenders, {entry.state}-wide operational context.
                  Compliance reminders, regional lenders, and corridor notes
                  for the full state.
                </p>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
