import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  JsonLd,
  article,
  breadcrumbList,
  dataset,
} from "@/components/seo/JsonLd";
import PulseHero from "@/components/pulse/PulseHero";
import DataFreshnessBadge from "@/components/pulse/DataFreshnessBadge";
import TrendSparkline from "@/components/pulse/TrendSparkline";
import PulseDigestSignup from "@/components/pulse/PulseDigestSignup";
import {
  getLatestDiesel,
  formatPrice,
  formatHeroDelta,
  isDieselSnapshotStale,
  PADD_LABELS,
  PADD_DESCRIPTIONS,
} from "@/lib/data/intel/diesel";
import { PADD_SLUGS, type PaddSlug } from "@/lib/validation/pulseSchema";

export const revalidate = 3600;

const ORIGIN = "https://dispatched.finance";

const PADD_PATH_SLUGS = PADD_SLUGS.filter((s) => s !== "national") as ReadonlyArray<
  Exclude<PaddSlug, "national">
>;

export function generateStaticParams(): Array<{ padd: string }> {
  return PADD_PATH_SLUGS.map((s) => ({ padd: s }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ padd: string }>;
}): Promise<Metadata> {
  const { padd } = await params;
  if (!isPaddPathSlug(padd)) return {};
  const label = PADD_LABELS[padd];
  const title = `${label} Diesel Prices This Week — Dispatched Pulse`;
  const description = PADD_DESCRIPTIONS[padd];
  const canonical = `/pulse/diesel/${padd}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: "Dispatched",
      title,
      description,
      url: canonical,
      images: ["/opengraph-image"],
    },
    twitter: {
      card: "summary_large_image",
      site: "@dispatchedfin",
      creator: "@dispatchedfin",
      title,
      description,
      images: ["/opengraph-image"],
    },
  };
}

function isPaddPathSlug(s: string): s is Exclude<PaddSlug, "national"> {
  return (PADD_PATH_SLUGS as ReadonlyArray<string>).includes(s);
}

export default async function PaddDieselPage({
  params,
}: {
  params: Promise<{ padd: string }>;
}) {
  const { padd } = await params;
  if (!isPaddPathSlug(padd)) {
    notFound();
  }

  const snapshot = await getLatestDiesel();
  const stale = isDieselSnapshotStale(snapshot.generatedAt);
  const region = snapshot.payload.regions.find((r) => r.slug === padd);
  const national = snapshot.payload.regions.find((r) => r.slug === "national");
  if (!region || !national) notFound();

  const label = PADD_LABELS[padd];
  const description = PADD_DESCRIPTIONS[padd];
  const spread = region.current - national.current;

  return (
    <div className="pulse-page">
      <JsonLd
        payload={breadcrumbList([
          { name: "Home", url: `${ORIGIN}/` },
          { name: "Pulse", url: `${ORIGIN}/pulse` },
          { name: "Diesel", url: `${ORIGIN}/pulse/diesel` },
          { name: label, url: `${ORIGIN}/pulse/diesel/${padd}` },
        ])}
      />
      <JsonLd
        payload={dataset({
          name: `${label} retail diesel — week of ${snapshot.payload.asOf}`,
          description: `Weekly retail on-highway diesel for ${label}. USD per gallon, including federal and state taxes.`,
          url: `${ORIGIN}/pulse/diesel/${padd}`,
          datePublished: snapshot.generatedAt,
          dateModified: snapshot.generatedAt,
          temporalCoverage: snapshot.period,
          variableMeasured: "Retail on-highway diesel price (USD/gal)",
          spatialCoverage: label,
          sourceName: "U.S. Energy Information Administration",
          sourceUrl: snapshot.sourceUrl,
          measurementTechnique:
            "Volume-weighted survey of retail diesel outlets in PADD region.",
        })}
      />
      <JsonLd
        payload={article({
          headline: `${label} Diesel — Week of ${snapshot.payload.asOf}`,
          description,
          url: `${ORIGIN}/pulse/diesel/${padd}`,
          datePublished: snapshot.generatedAt,
          dateModified: snapshot.generatedAt,
        })}
      />

      <main id="main-content">
        <div className="pulse-container">
          <PulseHero
            eyebrow={`Dispatched Pulse · ${label}`}
            headline={`${label} diesel — week of ${snapshot.payload.asOf}.`}
            subhead={description}
            metric={{
              label,
              value: formatPrice(region.current),
              delta: formatHeroDelta(region.changeAbs, region.yoyChangePct),
              deltaDirection: region.changeAbs < 0 ? "down" : "up",
            }}
          >
            <DataFreshnessBadge
              generatedAt={snapshot.generatedAt}
              cadenceLabel="Weekly · Monday"
              isStale={stale}
            />
          </PulseHero>

          <section className="pulse-section">
            <h2>This week vs. last week</h2>
            <dl className="pulse-stat-grid">
              <div>
                <dt>This Monday</dt>
                <dd>{formatPrice(region.current)}</dd>
              </div>
              <div>
                <dt>Last Monday</dt>
                <dd>{formatPrice(region.previous)}</dd>
              </div>
              <div>
                <dt>Week-over-week</dt>
                <dd className={region.changeAbs < 0 ? "pulse-delta--down" : "pulse-delta--up"}>
                  {region.changeAbs >= 0 ? "+" : ""}
                  {region.changeAbs.toFixed(3)} ({region.changePct >= 0 ? "+" : ""}
                  {region.changePct.toFixed(1)}%)
                </dd>
              </div>
              <div>
                <dt>Year ago</dt>
                <dd>{region.yearAgo ? formatPrice(region.yearAgo) : "—"}</dd>
              </div>
              <div>
                <dt>Year-over-year</dt>
                <dd
                  className={
                    region.yoyChangePct === undefined
                      ? undefined
                      : region.yoyChangePct < 0
                        ? "pulse-delta--down"
                        : "pulse-delta--up"
                  }
                >
                  {region.yoyChangePct === undefined
                    ? "—"
                    : `${region.yoyChangePct >= 0 ? "+" : ""}${region.yoyChangePct.toFixed(1)}%`}
                </dd>
              </div>
              <div>
                <dt>Spread vs. U.S. national</dt>
                <dd className={spread < 0 ? "pulse-delta--down" : "pulse-delta--up"}>
                  {spread >= 0 ? "+" : ""}
                  {spread.toFixed(3)}
                </dd>
              </div>
            </dl>
          </section>

          <section className="pulse-section">
            <h2>9-week trend</h2>
            <div className="pulse-sparkline-large">
              <TrendSparkline
                series={region.series}
                width={640}
                height={160}
                ariaLabel={`${label} nine-week diesel price trend`}
              />
            </div>
            <table className="pulse-table">
              <thead>
                <tr>
                  <th scope="col">Week of</th>
                  <th scope="col" className="num">{label}</th>
                </tr>
              </thead>
              <tbody>
                {region.series.map((p) => (
                  <tr key={p.period}>
                    <th scope="row">{p.period}</th>
                    <td className="num">{formatPrice(p.pricePerGallon)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="pulse-note">
              Source:{" "}
              <a href={snapshot.sourceUrl} rel="noopener noreferrer">
                EIA Weekly Petroleum Data
              </a>
              . PADD-level weighting reflects EIA&rsquo;s published methodology.
            </p>
          </section>

          <section className="pulse-section">
            <PulseDigestSignup
              defaultInterest="diesel"
              source={`pulse-diesel-${padd}`}
              heading="Get diesel-price updates every Monday"
              description="One email every Monday afternoon with the new EIA number and what changed in your PADD. Free, no spam."
            />
          </section>

          <section className="pulse-section pulse-section--related">
            <h2>Related</h2>
            <ul>
              <li>
                <Link href="/pulse/diesel">All regions — Diesel Pulse</Link>
              </li>
              <li>
                <Link href="/research/state-of-trucking-fuel-costs-2026">
                  Research: State of Trucking Fuel Costs 2026
                </Link>
              </li>
              <li>
                <Link href="/calculators/owner-operator-pl">
                  Owner-Operator P&L calculator
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}
