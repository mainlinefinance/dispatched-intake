import { fitDescription, fitTitle } from "@/lib/seo/meta";
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

/* What each Petroleum Administration for Defense District covers and what
   moves its diesel price. State lists follow the EIA's PADD definitions; the
   supply notes are structural (where the fuel comes from), not forecasts. */
const PADD_NOTES: Record<
  Exclude<PaddSlug, "national">,
  { states: string; supply: string; reading: string }
> = {
  "padd-1": {
    states:
      "PADD 1 is the East Coast. The EIA splits it into three sub-districts: 1A, New England (Connecticut, Maine, Massachusetts, New Hampshire, Rhode Island, Vermont); 1B, Central Atlantic (Delaware, the District of Columbia, Maryland, New Jersey, New York, Pennsylvania); and 1C, Lower Atlantic (Florida, Georgia, North Carolina, South Carolina, Virginia, West Virginia).",
    supply:
      "The region uses far more diesel than it refines. Most of the difference arrives by pipeline from the Gulf Coast and by tanker at the ports, so anything that interrupts those two routes shows up at the pump here before it shows up elsewhere. Winter adds a second pull on the same barrel: heating oil is a distillate, like diesel, and the Northeast burns a lot of it.",
    reading:
      "A single PADD 1 average hides a wide range between the Lower Atlantic and New England. If you run I-95 end to end, treat the regional figure as a midpoint and expect to pay more the farther north you fuel.",
  },
  "padd-2": {
    states:
      "PADD 2 is the Midwest: Illinois, Indiana, Iowa, Kansas, Kentucky, Michigan, Minnesota, Missouri, Nebraska, North Dakota, Ohio, Oklahoma, South Dakota, Tennessee, and Wisconsin.",
    supply:
      "The Midwest has substantial refining of its own, much of it running Canadian crude, and takes additional product by pipeline from the Gulf Coast. Demand has a farm calendar: planting in spring and harvest in fall both raise distillate use across the region, which is why prices here can firm up while the national number is flat.",
    reading:
      "Because the region is large and well connected by pipeline, the PADD 2 average usually sits close to the national one. A widening gap between the two is the thing to watch; it tends to mean a refinery outage or a seasonal demand peak rather than a change in crude prices.",
  },
  "padd-3": {
    states:
      "PADD 3 is the Gulf Coast: Alabama, Arkansas, Louisiana, Mississippi, New Mexico, and Texas.",
    supply:
      "More than half of U.S. refining capacity sits in this region, and it ships product by pipeline to the East Coast and the Midwest. Fuel sold here has the shortest trip from refinery to pump, which is the main reason the Gulf Coast average is usually the lowest of the five. The exposure is weather: a hurricane that shuts refineries or ports on the Texas or Louisiana coast moves prices in every region the Gulf supplies.",
    reading:
      "For carriers running long hauls out of Texas, the spread between PADD 3 and the destination region is a planning number: it tells you how much it is worth to leave with full tanks.",
  },
  "padd-4": {
    states:
      "PADD 4 is the Rocky Mountain region: Colorado, Idaho, Montana, Utah, and Wyoming.",
    supply:
      "This is the smallest of the five districts by fuel consumption. It is supplied mostly by a handful of small refineries inside the region and has limited pipeline links to the rest of the country, so local supply and local demand set the price more than they do elsewhere. A maintenance shutdown at one refinery can move the regional average on its own.",
    reading:
      "Expect the PADD 4 average to lag the national number in both directions. Long distances between truck stops also mean the price you actually pay can differ from the regional average more than it does in denser regions.",
  },
  "padd-5": {
    states:
      "PADD 5 is the West Coast: Alaska, Arizona, California, Hawaii, Nevada, Oregon, and Washington.",
    supply:
      "The West Coast is largely cut off from the rest of the U.S. fuel system: few pipelines cross the Rockies, so the region depends on its own refineries and on imports by sea. California also requires its own diesel formulation under California Air Resources Board rules and carries higher fuel taxes and program costs than most states, which lifts the regional average.",
    reading:
      "The PADD 5 figure is pulled up by California. If you fuel in Arizona or Nevada before crossing the state line, your cost will sit below the regional average; the EIA publishes a separate California number for exactly this reason.",
  },
};

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
  const title = fitTitle(
    `${label} Diesel Prices This Week — Dispatched Pulse`,
  );
  const description = fitDescription(PADD_DESCRIPTIONS[padd]);
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
            <h2>About {label}</h2>
            <p>{PADD_NOTES[padd].states}</p>
            <p>{PADD_NOTES[padd].supply}</p>
            <h3>Reading this number</h3>
            <p>{PADD_NOTES[padd].reading}</p>
            <p>
              The spread against the U.S. average in the table above is this
              region&rsquo;s price minus the national price for the same
              week. If your fuel surcharge is keyed to the national average
              and you buy most of your fuel here, a positive spread is cost
              the surcharge does not return to you.
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
