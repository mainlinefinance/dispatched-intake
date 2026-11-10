import { fitTitle } from "@/lib/seo/meta";
import { contentDates } from "@/lib/seo/contentDates";
import type { Metadata } from "next";
import Link from "next/link";
import { getAllCities, LOW_COVERAGE_THRESHOLD } from "@/lib/cities";
import { notFound } from "next/navigation";
import {
  JsonLd,
  article,
  breadcrumbList,
  faqPage,
  itemList,
} from "@/components/seo/JsonLd";
import {
  STATE_INFO,
  getAllStateSlugs,
  getLendersByState,
  getStateBySlug,
  type StateInfo,
} from "@/lib/data/lenders";
import { getStateContext } from "@/lib/data/lenderStateContext";

type Params = { state: string };

export const dynamicParams = false;

export async function generateStaticParams(): Promise<Params[]> {
  return getAllStateSlugs().map((slug) => ({ state: slug }));
}

const ORIGIN = "https://dispatched.finance";
const SET_URL = `${ORIGIN}/lenders`;

function sentenceCase(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { state } = await params;
  const s = getStateBySlug(state);
  if (!s) return {};
  const title = fitTitle(
    `Best Trucking Lenders in ${s.name} 2026 | Dispatched`,
  );
  const description = `Trucking lenders serving ${s.name} carriers: factoring, equipment financing, working capital, and ABL, with state compliance context.`;
  const canonical = `/lenders/${s.slug}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      images: ["/opengraph-image"],
      title,
      description,
      url: canonical,
      type: "article",
    },
    twitter: {
      images: ["/opengraph-image"],
      card: "summary_large_image",
      title,
      description,
    },
  };
}

function stateFAQs(s: StateInfo) {
  return [
    {
      q: `Which trucking lenders serve ${s.name}?`,
      a: `All 12 lenders in the Dispatched directory are nationwide and serve ${s.name}-based carriers. The directory page compares them by operator profile.`,
    },
    {
      q: `What's different about financing a trucking business in ${s.name}?`,
      a: `The lender list is the same as in every state. What is local is compliance: registration and fuel-tax filings (IRP, IFTA and UCR, where they apply) run through your base state, and any ${s.name} commercial-financing disclosure rules may apply to your contracts.`,
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

  const { published, modified: today } = contentDates("app/lenders/[state]/page.tsx");
  const url = `${ORIGIN}/lenders/${s.slug}`;
  const lenders = getLendersByState(s.code);
  const ctx = getStateContext(s.slug);
  // City pages under this state. Same coverage floor the city route and the
  // sitemap use, so nothing links to a page that redirects away.
  const cities = getAllCities().filter(
    (c) =>
      c.stateSlug === s.slug &&
      c.stateLenderPanelCount >= LOW_COVERAGE_THRESHOLD,
  );
  const faqs = stateFAQs(s);

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
          datePublished: published,
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

          {cities.length > 0 ? (
            <section className="research-section" id="cities">
              <h2>Freight markets in {s.name}</h2>
              <p>
                The lender list is the same in every {s.name} city. What
                changes locally is the freight mix and the costs that put
                pressure on cash flow.
              </p>
              <ul className="research-list">
                {cities.map((c) => (
                  <li key={c.citySlug} id={c.citySlug}>
                    <strong>{c.city}.</strong>{" "}
                    {sentenceCase(c.cityWeatherContext)}. Carriers based
                    here typically budget for {c.cityCostPressure}.
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {ctx?.curated ? (
            <section className="research-section" id="state-market">
              <h2>The {s.name} trucking market</h2>
              <p>{ctx.curated.market}</p>
              {ctx.curated.economicNote ? (
                <p>{ctx.curated.economicNote}</p>
              ) : null}
              <h3>Major freight corridors in {s.name}</h3>
              <ul className="research-list">
                {ctx.curated.corridors.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </section>
          ) : (
            <section className="research-section" id="state-summary">
              <h2>The {s.name} trucking market</h2>
              <p>{ctx?.procedural.summary}</p>
            </section>
          )}

          {ctx?.curated?.regulatoryNote ? (
            <section className="research-section" id="state-regulatory">
              <h2>{s.name} regulatory considerations</h2>
              <p>{ctx.curated.regulatoryNote}</p>
            </section>
          ) : null}

          {ctx?.curated?.regionalLenders &&
          ctx.curated.regionalLenders.length > 0 ? (
            <section className="research-section" id="regional-lenders">
              <h2>Regional lenders in {s.name}</h2>
              <p>
                Beyond the 12 national lenders below, these regional or
                state-specific lenders maintain meaningful presence in{" "}
                {s.name}. We do not vet them with the same rigor as the
                directory — but their existence is worth knowing when
                comparing offers.
              </p>
              <ul className="research-list">
                {ctx.curated.regionalLenders.map((name) => (
                  <li key={name}>
                    <strong>{name}</strong>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <section className="research-section" id="state-context">
            <h2>What changes for lenders in {s.name}</h2>
            <p>
              The 12 lenders in this directory all underwrite nationally,
              so what changes in {s.name} is where your registration and
              fuel-tax filings run and which state commercial-financing
              disclosure rules apply. The{" "}
              <Link href="/lenders">directory overview</Link> covers the
              national picture and compares lenders by operator profile.
            </p>
          </section>

          <section className="research-section" id="lenders">
            <h2>Lenders serving {s.name}</h2>
            <p>
              All 12 directory lenders serve {s.name} carriers. The{" "}
              <Link href="/lenders#lenders">national directory</Link> has
              the full write-up on each one, including the trade-off you
              accept by choosing them. We do not get paid for these
              placements.
            </p>
            <p>{lenders.map((l) => l.name).join(", ")}.</p>
          </section>

          <section className="research-section" id="compliance">
            <h2>{s.name} compliance reminders</h2>
            <p>
              Lenders look at the same filings in {s.name} as anywhere
              else: an active <Link href="/glossary/mc-number">MC number</Link>,
              a current <Link href="/glossary/mcs-150">MCS-150</Link>, a{" "}
              <Link href="/glossary/boc-3">BOC-3</Link> on file, and
              unbroken <Link href="/glossary/ucr">UCR</Link>,{" "}
              <Link href="/glossary/ifta">IFTA</Link> and{" "}
              <Link href="/glossary/irp">IRP</Link> filings where they
              apply to your operation.
            </p>
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
              The directory is the upper-funnel layer. If your operation is based in{" "}
              {s.name} and you are ready to move on financing or factoring,
              start the matching flow — soft pull, no credit impact to
              begin. We route you to the lender panel matching your
              authority age, credit profile, and capital need.
            </p>
            <div className="research-cta-grid">
              <Link href="/qualify" className="research-cta-card">
                <h3>See your funding options</h3>
                <p>
                  Soft pull, no credit impact. Routed to the lender panel
                  matching your authority age, credit profile, and capital
                  need.
                </p>
              </Link>
              <Link href="/lenders" className="research-cta-card">
                <h3>Browse all states</h3>
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
