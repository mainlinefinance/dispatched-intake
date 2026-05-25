import type { Metadata } from "next";
import Link from "next/link";
import {
  JsonLd,
  article,
  breadcrumbList,
  faqPage,
} from "@/components/seo/JsonLd";
import PulseHero from "@/components/pulse/PulseHero";
import DataFreshnessBadge from "@/components/pulse/DataFreshnessBadge";
import PulseDigestSignup from "@/components/pulse/PulseDigestSignup";
import {
  getLatestDiesel,
  formatPrice,
  isDieselSnapshotStale,
} from "@/lib/data/intel/diesel";

/* Re-render the index hourly so the latest snapshot is reflected without
   waiting for a full deploy. The actual snapshot file is rotated by the
   /api/cron/pulse-* routes. */
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Dispatched Pulse — Trucking Market Intelligence",
  description:
    "Weekly diesel prices, freight rates, FMCSA enforcement, and lender appetite for trucking operators. Source-cited, free, no signup required.",
  alternates: { canonical: "/pulse" },
};

const PILLARS = [
  {
    slug: "diesel",
    label: "Diesel prices",
    cadence: "Weekly · Monday",
    description:
      "U.S. retail on-highway diesel — national headline plus PADD 1-5. Sourced from EIA's free public series; the same number every owner-op sees at the pump.",
    status: "live",
    href: "/pulse/diesel",
  },
  {
    slug: "freight-rates",
    label: "Freight rates",
    cadence: "Weekly · Tuesday",
    description:
      "Spot vs contract van, reefer, and flatbed indices. Public-tier data plus Dispatched commentary on the spread that drives the factoring vs. broker-pay decision.",
    status: "coming-soon",
    href: "/pulse/freight-rates",
  },
  {
    slug: "regulation",
    label: "FMCSA & regulation",
    cadence: "Monthly · 1st",
    description:
      "Out-of-service rates, enforcement campaigns, ELD/HOS updates, and new Federal Register rulemakings. Built from FMCSA public APIs and Federal Register feeds.",
    status: "coming-soon",
    href: "/pulse/regulation",
  },
  {
    slug: "lender-appetite",
    label: "Lender appetite",
    cadence: "Quarterly",
    description:
      "Anonymized approval rates, average APR bands, and credit thresholds by sub-vertical — built from Dispatched's own marketplace data. Publishing once monthly submissions cross N≥100.",
    status: "coming-soon",
    href: "/pulse/lender-appetite",
  },
] as const;

const INDEX_FAQS = [
  {
    q: "Why does Dispatched publish market data?",
    a: "Because the trucking-finance market runs on numbers (diesel, freight rates, FMCSA enforcement, lender appetite) and most operators have to triangulate them across five different sources. We publish what we already track for our matching engine — sourced from public data, methodology-disclosed, free.",
  },
  {
    q: "How often is Pulse updated?",
    a: "Diesel weekly on Mondays. Freight rates weekly on Tuesdays. FMCSA monthly on the 1st. Lender appetite quarterly. Every page shows the last-refreshed date and the next scheduled refresh.",
  },
  {
    q: "What sources do you use?",
    a: "EIA for diesel. DAT public weekly index and FreightWaves SONAR free tiles for freight rates. FMCSA SAFER/QCMobile and the Federal Register API for regulation. Dispatched's own marketplace data for lender appetite. Every dataset page links the upstream source.",
  },
  {
    q: "Can I cite Pulse data?",
    a: "Yes. Every dataset page is published with schema.org Dataset markup and a clear upstream citation. Please link the upstream source (EIA, FMCSA, etc.) alongside Dispatched when you do.",
  },
];

const ORIGIN = "https://dispatched.finance";

export default async function PulseIndexPage() {
  const diesel = await getLatestDiesel();
  const national = diesel.payload.regions.find((r) => r.slug === "national");
  const today = new Date().toISOString().slice(0, 10);
  const dieselStale = isDieselSnapshotStale(diesel.generatedAt);

  return (
    <div className="pulse-page">
      <JsonLd
        payload={breadcrumbList([
          { name: "Home", url: `${ORIGIN}/` },
          { name: "Pulse", url: `${ORIGIN}/pulse` },
        ])}
      />
      <JsonLd
        payload={article({
          headline: "Dispatched Pulse — Trucking Market Intelligence",
          description:
            "Weekly diesel prices, freight rates, FMCSA enforcement, and lender appetite for trucking operators.",
          url: `${ORIGIN}/pulse`,
          datePublished: "2026-05-18",
          dateModified: today,
        })}
      />
      <JsonLd payload={faqPage(INDEX_FAQS)} />
      <main id="main-content">
        <div className="pulse-container">
          <PulseHero
            eyebrow="Dispatched Pulse"
            headline="What's moving for trucking operators this week."
            subhead="Diesel, freight rates, FMCSA enforcement, lender appetite. Source-cited, methodology-disclosed, free. Updated on a fixed schedule — no AI-generated filler, no licensed-feed paywall."
            metric={
              national
                ? {
                    label: `U.S. diesel · ${new Date(diesel.payload.asOf).toLocaleDateString(
                      "en-US",
                      { month: "short", day: "numeric" },
                    )}`,
                    value: formatPrice(national.current),
                    delta: `${national.changeAbs >= 0 ? "+" : ""}${national.changeAbs.toFixed(3)} WoW`,
                    deltaDirection: national.changeAbs < 0 ? "down" : "up",
                  }
                : undefined
            }
          >
            <DataFreshnessBadge
              generatedAt={diesel.generatedAt}
              cadenceLabel="Weekly · Monday"
              isStale={dieselStale}
            />
          </PulseHero>

          <section className="pulse-section">
            <h2>Pillars</h2>
            <ul className="pulse-pillar-list">
              {PILLARS.map((p) => (
                <li key={p.slug} className={`pulse-pillar pulse-pillar--${p.status}`}>
                  {p.status === "live" ? (
                    <Link href={p.href} className="pulse-pillar-card">
                      <p className="pulse-pillar-cadence">{p.cadence}</p>
                      <h3>{p.label}</h3>
                      <p className="pulse-pillar-desc">{p.description}</p>
                      <p className="pulse-pillar-cta">Open dataset →</p>
                    </Link>
                  ) : (
                    <div className="pulse-pillar-card pulse-pillar-card--soon">
                      <p className="pulse-pillar-cadence">
                        {p.cadence} · <span className="pulse-soon-tag">Soon</span>
                      </p>
                      <h3>{p.label}</h3>
                      <p className="pulse-pillar-desc">{p.description}</p>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </section>

          <section className="pulse-section">
            <PulseDigestSignup defaultInterest="digest" source="pulse-index" />
          </section>

          <section className="pulse-section">
            <h2>Methodology</h2>
            <p>
              Every Pulse dataset references a public upstream source by URL.
              We do not republish licensed-feed data; we reproduce public
              indexes and add commentary on the spread, the lane mix, and what
              the data implies for owner-operator decisions (when to factor,
              when to fuel up, when to renew). When a refresh is delayed
              (upstream outage, holiday), the page shows the prior good
              snapshot and a delayed-refresh notice.
            </p>
            <p>
              <Link href="/methodology">Read the full methodology</Link>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
