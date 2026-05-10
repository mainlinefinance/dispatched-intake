import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  JsonLd,
  article,
  breadcrumbList,
  faqPage,
  itemList,
} from "@/components/seo/JsonLd";
import {
  LENDER_TYPE_LABELS,
  STATE_INFO,
  getAllStateSlugs,
  getLendersByState,
  getStateBySlug,
  type LenderEntry,
  type LenderType,
  type StateInfo,
} from "@/lib/data/lenders";

type Params = { state: string };

export const dynamicParams = false;

export async function generateStaticParams(): Promise<Params[]> {
  return getAllStateSlugs().map((slug) => ({ state: slug }));
}

const ORIGIN = "https://dispatched.finance";
const SET_URL = `${ORIGIN}/lenders`;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { state } = await params;
  const s = getStateBySlug(state);
  if (!s) return {};
  const title = `Best Trucking Lenders in ${s.name} 2026 | Dispatched`;
  const description = `Curated trucking lenders serving ${s.name} carriers: factoring, equipment financing, working capital, and ABL. State-specific compliance context. Updated May 2026.`;
  const canonical = `/lenders/${s.slug}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
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

/* Group the lenders that fit a particular operator profile within a state.
   Returns lenders that match any of the supplied bestFor keywords. */
function filterByBestFor(
  lenders: ReadonlyArray<LenderEntry>,
  needles: ReadonlyArray<string>,
): ReadonlyArray<LenderEntry> {
  return lenders.filter((l) =>
    needles.some((n) => l.bestFor.toLowerCase().includes(n)),
  );
}

function stateFAQs(s: StateInfo) {
  return [
    {
      q: `Which trucking lenders serve ${s.name}?`,
      a: `All 12 lenders in the Dispatched directory serve ${s.name}: Apex Capital, eCapital, RTS Financial, Triumph Business Capital, TBS Factoring, OTR Solutions, Porter Freight Funding, Truckstop Go Capital, 1st Commercial Credit, Riviera Finance, Bluevine, and Lendio. Each is nationwide — the operational answer changes state-by-state because of IRP base state, IFTA filing, UCR, and state DOT requirements, but the lender list is the same.`,
    },
    {
      q: `What's different about financing a trucking business in ${s.name}?`,
      a: `The lender panel is the same nationwide, but compliance is local. ${s.name} carriers need to file the federal MC# and DOT#, then handle ${s.name}-administered IRP apportioned registration, IFTA fuel-tax filing (if running interstate), UCR registration (paid through your base state), and any ${s.name}-specific commercial-financing disclosure rules. Lenders underwriting equipment financing on Class 8 tractors expect IRP and IFTA in place, particularly for first-year owner-operators ramping into multi-state operations.`,
    },
    {
      q: `Is invoice factoring legal in ${s.name}?`,
      a: `Yes. Invoice factoring is legal in all 50 states including ${s.name}. The factoring contract is a commercial-receivables purchase, not a loan, so most state lending licenses do not apply. California, New York, and a handful of other states have commercial-financing disclosure laws (California SB 1235 is the most prescriptive) that require certain rate and total-cost disclosures before a small business signs a factoring or merchant-cash-advance contract.`,
    },
    {
      q: `Do I need to be based in ${s.name} to factor through these lenders?`,
      a: `No. All 12 lenders in this directory underwrite based on your operating authority and broker mix, not your physical address. If you have an active MC# and run loads through brokers, the lender will factor your invoices regardless of which state houses your DOT-registered base of operations.`,
    },
  ];
}

export default async function LendersStatePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { state } = await params;
  const s = getStateBySlug(state);
  if (!s) notFound();

  const today = new Date().toISOString().slice(0, 10);
  const url = `${ORIGIN}/lenders/${s.slug}`;
  const lenders = getLendersByState(s.code);
  const faqs = stateFAQs(s);

  const ownerOpLenders = filterByBestFor(lenders, ["owner-operator"]);
  const fleetLenders = filterByBestFor(lenders, ["fleet"]);
  const newAuthorityLenders = filterByBestFor(lenders, ["new-authority"]);
  const badCreditLenders = filterByBestFor(lenders, [
    "bad-credit",
    "transparency-first",
    "marketplace",
  ]);

  return (
    <div className="research-page">
      <JsonLd
        payload={breadcrumbList([
          { name: "Home", url: `${ORIGIN}/` },
          { name: "Lenders", url: SET_URL },
          { name: s.name, url },
        ])}
      />
      <JsonLd
        payload={article({
          headline: `Best Trucking Lenders in ${s.name} 2026`,
          description: `Curated trucking lenders serving ${s.name} carriers: factoring, equipment financing, working capital, and ABL.`,
          url,
          datePublished: today,
          dateModified: today,
        })}
      />
      <JsonLd
        payload={itemList({
          name: `Trucking Lenders in ${s.name} 2026`,
          description: `Lenders serving ${s.name} for factoring, equipment financing, working capital, and asset-based lending.`,
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
              Dispatched · Lenders · {s.name}
            </p>
            <h1 className="research-h1">
              Trucking lenders in {s.name}, 2026.
            </h1>
            <p className="research-subhead">
              Curated lenders serving {s.name} carriers: factoring,
              equipment, working capital, and ABL. State-specific context
              on registration, IFTA, and IRP. Updated May 2026.
            </p>
            <p className="research-meta">
              {lenders.length} lenders · Updated {today} ·{" "}
              <Link href="/lenders">All states</Link>
            </p>
          </header>

          <section className="research-section" id="state-context">
            <h2>The {s.name} trucking-finance picture</h2>
            <p>
              {s.name} carriers operate under the same federal regime —
              MC#, DOT#, BOC-3, UCR — as every other state, with{" "}
              {s.name}-administered IRP apportioned registration and IFTA
              quarterly fuel-tax filing on top. Lenders underwriting
              equipment financing on Class 8 tractors expect IRP and IFTA
              in place, particularly for first-year owner-operators
              ramping into multi-state operations.
            </p>
            <p>
              Lender appetite in {s.name} does not differ materially from
              the national picture because the 12 lenders in this
              directory all underwrite nationally. The practical
              difference between operating out of {s.name} versus a
              neighboring state is your IRP base state, your IFTA filing
              jurisdiction, and any state-level commercial-financing
              disclosure rules that bind contracts signed in {s.name}.
              California, New York, Utah, Virginia, and Georgia all have
              commercial-financing disclosure laws on the books (with
              California SB 1235 being the most prescriptive); other
              states have not yet legislated comparable rules.
            </p>
            <p>
              For owner-operators with new authority in {s.name}, the
              critical first six months are about establishing clean
              broker-payment history and getting the MCS-150 biennial
              update and BOC-3 filings correct before the FMCSA New
              Entrant Safety Assurance Program closes. Once you cross
              the 90-day broker-history threshold, the lender panel that
              underwrites owner-operators inside the first year opens
              up materially.
            </p>
          </section>

          <section className="research-section" id="lenders">
            <h2>Lenders serving {s.name}</h2>
            <p>
              All 12 directory lenders serve {s.name} carriers. Each card
              names the lender&apos;s strength and the trade-off you accept
              by choosing them. Links open the lender&apos;s own site in a
              new tab; we do not get paid for these placements.
            </p>
            <div className="research-cta-grid">
              {lenders.map((l) => lenderCard(l))}
            </div>
          </section>

          {ownerOpLenders.length > 0 ? (
            <section className="research-section" id="owner-operators">
              <h2>Owner-operators in {s.name}</h2>
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
            </section>
          ) : null}

          {fleetLenders.length > 0 ? (
            <section className="research-section" id="mid-fleets">
              <h2>Mid-fleets in {s.name}</h2>
              <p>
                Fleets of 5 or more trucks need factoring + ancillary credit
                products (asset-based lending, equipment financing) under one
                roof. The lenders below scale cleanly from a 5-truck
                operation into 50+ trucks without forcing a product change
                at each tier.
              </p>
              <ul className="research-list">
                {fleetLenders.map((l) => (
                  <li key={l.slug}>
                    <strong>{l.name}</strong> — {l.blurb}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {newAuthorityLenders.length > 0 ? (
            <section className="research-section" id="new-authority">
              <h2>New authority in {s.name}</h2>
              <p>
                First-year MC# operators (under 90 days of broker history)
                struggle with most working-capital lenders. Factoring is
                often the only working-capital tool available, and a small
                subset of factors specializes in funding brand-new authority
                inside the first 30 days.
              </p>
              <ul className="research-list">
                {newAuthorityLenders.map((l) => (
                  <li key={l.slug}>
                    <strong>{l.name}</strong> — {l.blurb}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {badCreditLenders.length > 0 ? (
            <section className="research-section" id="bad-credit">
              <h2>Bad credit / non-traditional underwriting in {s.name}</h2>
              <p>
                Sub-580 FICOs, recent bankruptcies, and thin-credit-file
                operators in {s.name} should start with factors that
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
            </section>
          ) : null}

          <section className="research-section" id="compliance">
            <h2>{s.name} compliance reminders</h2>
            <p>
              State-level compliance matters more to lenders than most
              owner-operators expect. A clean DOT pull, current MCS-150,
              correct BOC-3 process-agent designation, and unbroken UCR +
              IFTA filings are what get the lender past intake. Bookmark
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
                — quarterly fuel-tax filing administered by your base state;
                audit triggers compress cash flow fast.
              </li>
              <li>
                <Link href="/glossary/irp">
                  <strong>IRP</strong>
                </Link>{" "}
                — apportioned registration; required for most interstate
                Class 8 operations.
              </li>
              <li>
                <Link href="/glossary/ucr">
                  <strong>UCR</strong>
                </Link>{" "}
                — annual federal fee funding state-level enforcement;
                lapses flag during underwriting.
              </li>
              <li>
                <Link href="/glossary/boc-3">
                  <strong>BOC-3</strong>
                </Link>{" "}
                — process-agent designation; required to activate operating
                authority and to keep it active.
              </li>
            </ul>
          </section>

          <section className="research-section" id="faq">
            <h2>FAQ — trucking lenders in {s.name}</h2>
            {faqs.map((qa) => (
              <div key={qa.q}>
                <h3>{qa.q}</h3>
                <p>{qa.a}</p>
              </div>
            ))}
          </section>

          <section className="research-section research-cta">
            <h2>Ready to qualify in {s.name}?</h2>
            <p>
              The directory is the upper-funnel layer. If you are an{" "}
              {s.name} carrier ready to move on financing or factoring,
              start the matching flow — soft pull, no credit impact to
              begin. We route you to the lender panel matching your
              authority age, credit profile, and capital need.
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
              <Link href="/lenders" className="research-cta-card">
                <h3>Browse all 50 states</h3>
                <p>
                  Same 12 lenders, state-specific operational context. Pick
                  your state to see the compliance reminders that change
                  what lenders care about at intake.
                </p>
              </Link>
            </div>
            <p style={{ marginTop: "1.25rem" }}>
              Nearby states:{" "}
              {STATE_INFO.filter((x) => x.code !== s.code)
                .slice(0, 6)
                .map((x, i, arr) => (
                  <span key={x.code}>
                    <Link href={`/lenders/${x.slug}`}>{x.name}</Link>
                    {i < arr.length - 1 ? ", " : ""}
                  </span>
                ))}
              .
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
