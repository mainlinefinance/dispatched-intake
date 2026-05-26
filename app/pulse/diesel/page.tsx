import type { Metadata } from "next";
import Link from "next/link";
import {
  JsonLd,
  article,
  breadcrumbList,
  dataset,
  faqPage,
} from "@/components/seo/JsonLd";
import PulseHero from "@/components/pulse/PulseHero";
import DataFreshnessBadge from "@/components/pulse/DataFreshnessBadge";
import DieselTable from "@/components/pulse/DieselTable";
import PulseDigestSignup from "@/components/pulse/PulseDigestSignup";
import {
  getLatestDiesel,
  formatPrice,
  formatHeroDelta,
  isDieselSnapshotStale,
} from "@/lib/data/intel/diesel";

export const revalidate = 3600;

const ORIGIN = "https://dispatched.finance";

const DIESEL_TITLE = "U.S. Diesel Prices This Week — Dispatched Pulse";
const DIESEL_DESCRIPTION =
  "Weekly U.S. retail on-highway diesel — national plus PADD 1-5. Sourced from EIA, updated every Monday. The number truckers actually see at the pump.";

export const metadata: Metadata = {
  title: DIESEL_TITLE,
  description: DIESEL_DESCRIPTION,
  alternates: { canonical: "/pulse/diesel" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Dispatched",
    title: DIESEL_TITLE,
    description: DIESEL_DESCRIPTION,
    url: "/pulse/diesel",
  },
  twitter: {
    card: "summary_large_image",
    site: "@dispatchedfin",
    creator: "@dispatchedfin",
    title: DIESEL_TITLE,
    description: DIESEL_DESCRIPTION,
  },
};

const FAQS = [
  {
    q: "Where does Dispatched get diesel prices?",
    a: "The U.S. Energy Information Administration (EIA). Specifically the weekly retail on-highway diesel series — surveyed Monday, published Monday afternoon. National plus the five PADD regions. We re-publish the same numbers EIA does, with the methodology link and the upstream URL on every page.",
  },
  {
    q: "How is the on-highway diesel price calculated?",
    a: "EIA surveys roughly 400 retail diesel outlets every Monday morning, weights by gallons sold, and publishes the volume-weighted average for the U.S. and each PADD region by Monday afternoon. The price includes federal and state taxes paid at the pump.",
  },
  {
    q: "What does WoW and YoY mean here?",
    a: "WoW = week-over-week (this Monday vs. last Monday). YoY = year-over-year (this Monday vs. the same week one year ago). Both columns matter: WoW catches refining and supply shocks; YoY catches the cycle.",
  },
  {
    q: "Why is West Coast diesel always more expensive?",
    a: "PADD 5 (West Coast) carries CARB diesel specifications (California's low-aromatic blend), the highest state diesel taxes in the country (CA, WA, OR), and the longest supply lines. The spread vs. PADD 3 (Gulf Coast, the refining heart of the U.S.) is structural — it rarely closes below 70 cents and routinely runs over a dollar.",
  },
  {
    q: "How does this affect my fuel surcharge?",
    a: "Most broker fuel surcharge schedules anchor to the EIA national on-highway diesel number — the same number on this page. The schedule typically pays 1 cent per mile per $0.06 over a baseline (often $1.20-$1.30). When the headline number moves a nickel, your FSC moves about a penny per mile. Check your rate confirmation's FSC table — every broker has their own baseline and step size.",
  },
];

const PADD_SUMMARY = [
  { slug: "padd-1", label: "PADD 1 — East Coast" },
  { slug: "padd-2", label: "PADD 2 — Midwest" },
  { slug: "padd-3", label: "PADD 3 — Gulf Coast" },
  { slug: "padd-4", label: "PADD 4 — Rocky Mountain" },
  { slug: "padd-5", label: "PADD 5 — West Coast" },
] as const;

export default async function DieselIndexPage() {
  const snapshot = await getLatestDiesel();
  const stale = isDieselSnapshotStale(snapshot.generatedAt);
  const national = snapshot.payload.regions.find((r) => r.slug === "national");
  if (!national) {
    throw new Error("Diesel snapshot is missing the national region.");
  }

  return (
    <div className="pulse-page">
      <JsonLd
        payload={breadcrumbList([
          { name: "Home", url: `${ORIGIN}/` },
          { name: "Pulse", url: `${ORIGIN}/pulse` },
          { name: "Diesel", url: `${ORIGIN}/pulse/diesel` },
        ])}
      />
      <JsonLd
        payload={dataset({
          name: `U.S. retail diesel — week of ${snapshot.payload.asOf}`,
          description:
            "Weekly retail on-highway diesel for the U.S. national average and the five PADD regions. USD per gallon, including federal and state taxes.",
          url: `${ORIGIN}/pulse/diesel`,
          datePublished: snapshot.generatedAt,
          dateModified: snapshot.generatedAt,
          temporalCoverage: snapshot.period,
          variableMeasured: "Retail on-highway diesel price (USD/gal)",
          spatialCoverage: "United States",
          sourceName: "U.S. Energy Information Administration",
          sourceUrl: snapshot.sourceUrl,
          measurementTechnique:
            "Volume-weighted survey of ~400 U.S. retail diesel outlets, surveyed Mondays.",
        })}
      />
      <JsonLd
        payload={article({
          headline: `U.S. Diesel — Week of ${snapshot.payload.asOf}`,
          description:
            "U.S. weekly retail on-highway diesel — national plus PADD 1-5.",
          url: `${ORIGIN}/pulse/diesel`,
          datePublished: snapshot.generatedAt,
          dateModified: snapshot.generatedAt,
        })}
      />
      <JsonLd payload={faqPage(FAQS)} />

      <main id="main-content">
        <div className="pulse-container">
          <PulseHero
            eyebrow="Dispatched Pulse · Diesel"
            headline={`U.S. retail diesel — week of ${snapshot.payload.asOf}.`}
            subhead="EIA weekly survey, surveyed Monday morning, published Monday afternoon. National plus PADD 1-5. The headline number every broker's fuel surcharge schedule references."
            metric={{
              label: "U.S. national",
              value: formatPrice(national.current),
              delta: formatHeroDelta(national.changeAbs, national.yoyChangePct),
              deltaDirection: national.changeAbs < 0 ? "down" : "up",
            }}
          >
            <DataFreshnessBadge
              generatedAt={snapshot.generatedAt}
              cadenceLabel="Weekly · Monday"
              isStale={stale}
            />
          </PulseHero>

          <section className="pulse-section">
            <h2>By region</h2>
            <DieselTable regions={snapshot.payload.regions} />
            <p className="pulse-note">
              Source: <a href={snapshot.sourceUrl} rel="noopener noreferrer">EIA Weekly Petroleum Data</a>.
              Volume-weighted survey of ~400 retail outlets. Includes federal
              and state taxes at the pump.
            </p>
          </section>

          <section className="pulse-section">
            <h2>What it means for owner-operators</h2>
            <p>
              When the headline number moves more than two cents week-over-week,
              expect every broker rate confirmation to reflect it via the fuel
              surcharge. The structural West Coast premium (~80 cents above
              Gulf Coast) is not a rounding error — it is the floor of the
              spread. If you run intermodal in or out of LA/Long Beach and your
              broker&rsquo;s FSC table anchors to the national average, you are
              paying the spread out of your line-haul.
            </p>
            <ul className="pulse-bullets">
              <li>
                <strong>Factoring decision:</strong> when diesel climbs more
                than 5% in a month, fuel-card programs that bundle factoring +
                fuel discounts move from &ldquo;nice to have&rdquo; to &ldquo;do
                the math.&rdquo; See{" "}
                <Link href="/factoring">trucking factoring</Link>.
              </li>
              <li>
                <strong>Rate-con math:</strong> a broker that does not separate
                FSC from line-haul on the rate-con is harder to renegotiate
                when diesel moves. See the rate-con walkthrough in{" "}
                <Link href="/blog/reading-broker-rate-confirmation">
                  Reading the Broker Rate Confirmation
                </Link>
                .
              </li>
              <li>
                <strong>Cost-per-mile:</strong> with fuel economy around 6.5
                MPG, every $0.20/gal change shifts your CPM by roughly $0.03.
                Recalculate against your current rate floor. See the{" "}
                <Link href="/calculators/owner-operator-pl">
                  Owner-Operator P&L calculator
                </Link>
                .
              </li>
            </ul>
          </section>

          <section className="pulse-section">
            <h2>PADD pages</h2>
            <ul className="pulse-padd-grid">
              {PADD_SUMMARY.map((p) => {
                const region = snapshot.payload.regions.find(
                  (r) => r.slug === p.slug,
                );
                if (!region) return null;
                return (
                  <li key={p.slug}>
                    <Link
                      href={`/pulse/diesel/${p.slug}`}
                      className="pulse-padd-card"
                    >
                      <p className="pulse-padd-label">{p.label}</p>
                      <p className="pulse-padd-price">
                        {formatPrice(region.current)}
                      </p>
                      <p
                        className={`pulse-padd-delta ${
                          region.changeAbs < 0
                            ? "pulse-delta--down"
                            : "pulse-delta--up"
                        }`}
                      >
                        {region.changeAbs >= 0 ? "+" : ""}
                        {region.changeAbs.toFixed(3)} WoW
                      </p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="pulse-section">
            <h2>FAQ</h2>
            <dl className="pulse-faq">
              {FAQS.map((qa) => (
                <div key={qa.q}>
                  <dt>{qa.q}</dt>
                  <dd>{qa.a}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="pulse-section">
            <PulseDigestSignup
              defaultInterest="diesel"
              source="pulse-diesel"
              heading="Get diesel-price updates every Monday"
              description="One email every Monday afternoon with the new EIA number and what changed in your PADD. Free, no spam."
            />
          </section>

          <section className="pulse-section pulse-section--related">
            <h2>Related</h2>
            <ul>
              <li>
                <Link href="/research/state-of-trucking-fuel-costs-2026">
                  Research: State of Trucking Fuel Costs 2026
                </Link>
              </li>
              <li>
                <Link href="/factoring">Trucking factoring & fuel-card programs</Link>
              </li>
              <li>
                <Link href="/calculators/owner-operator-pl">
                  Owner-Operator P&L calculator
                </Link>
              </li>
              <li>
                <Link href="/topics/owner-operator-life">Topic: Owner-Operator Life</Link>
              </li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}
