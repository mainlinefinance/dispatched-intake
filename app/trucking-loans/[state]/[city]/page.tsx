import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  getAllCities,
  getCity,
  LOW_COVERAGE_THRESHOLD,
  type City,
} from "@/lib/cities";
import { JsonLd, breadcrumbList } from "@/components/seo/JsonLd";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/seo/Breadcrumbs";
import { metaTruckingLoansCity } from "@/lib/seo/metadataPatterns";

type Params = { state: string; city: string };

export async function generateStaticParams(): Promise<Params[]> {
  return getAllCities().map((c) => ({ state: c.stateSlug, city: c.citySlug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { state, city } = await params;
  const entry = getCity(state, city);
  if (!entry) return {};
  const { title, description } = metaTruckingLoansCity({
    cityName: entry.city,
    stateAbbr: entry.stateAbbr,
  });
  const canonical = `/trucking-loans/${entry.stateSlug}/${entry.citySlug}`;
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

export default async function GeoLandingPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { state, city } = await params;
  const entry = getCity(state, city);

  if (!entry) notFound();

  // Handoff rule (template header, lines 15–21): do not publish a geo page
  // claiming "N lenders actively funding" when N is 0–2. Redirect to the
  // flagship trucking LP until coverage is confirmed.
  if (entry.stateLenderPanelCount < LOW_COVERAGE_THRESHOLD) redirect("/trucking");

  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Dispatched", url: "https://dispatched.finance/" },
    {
      name: "Trucking Loans",
      url: "https://dispatched.finance/trucking-working-capital",
    },
    {
      name: entry.state,
      url: `https://dispatched.finance/trucking-loans/${entry.stateSlug}`,
    },
    {
      name: entry.city,
      url: `https://dispatched.finance/trucking-loans/${entry.stateSlug}/${entry.citySlug}`,
    },
  ];

  return (
    <div className="geo-page">
      <JsonLd payload={breadcrumbList(breadcrumbs)} />
      <SiteNav />
      <div className="geo-container">
        <Breadcrumbs items={breadcrumbs} />
      </div>
      <Hero entry={entry} />
      <WhyLocalMatters entry={entry} />
      <WhyBanksDecline entry={entry} />
      <ProofCards entry={entry} />
      <DataFlow />
      <LocalFAQ entry={entry} />
      <FinalCTABand entry={entry} />
      <SiteFooter entry={entry} />
    </div>
  );
}

function DispatchedMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 17h2l1.5-9h9L17 17h2" />
      <circle cx={7.5} cy={17.5} r={1.8} />
      <circle cx={16.5} cy={17.5} r={1.8} />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

function SiteNav() {
  return (
    <header className="geo-nav">
      <div className="geo-nav-inner">
        <Link href="/" className="geo-logo" aria-label="Dispatched home">
          <DispatchedMark />
          Dispatched
        </Link>
        <nav className="geo-nav-links" aria-label="Primary">
          <a href="/trucking" className="geo-active">
            Trucking
          </a>
          <a href="/construction">Construction — soon</a>
          <a href="/how-it-works">How it works</a>
          <a href="/faq">FAQ</a>
        </nav>
        <div className="geo-nav-right">
          <a href="tel:+15550104477" className="geo-nav-phone">
            (555) 010‑4477
          </a>
          <a href="/apply" className="btn btn--primary">
            Get started
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero({ entry }: { entry: City }) {
  return (
    <section className="geo-hero">
      <div className="geo-container">
        <div className="geo-hero-grid">
          <div>
            <span className="geo-eyebrow">
              Working capital · {entry.city}, {entry.stateAbbr}
            </span>
            <h1 className="geo-hero-title">
              Working capital for {entry.city} truckers and owner-operators.
              $25K–$250K at {entry.aprRangeLow}–{entry.aprRangeHigh}% APR,
              typically funded in 24–48 hours.
            </h1>
            <p className="geo-hero-sub">
              {entry.state} has{" "}
              <strong>
                {entry.localStatOperatorCount} registered owner-operators.
              </strong>{" "}
              Dispatched has matched{" "}
              <strong>{entry.localStatFundedCount} of them</strong> with capital
              in the last 90 days.
            </p>
            <div className="geo-hero-cta-row">
              <a href="/apply" className="btn btn--primary btn--lg">
                Start — 6 to 9 minutes
                <ArrowRight />
              </a>
              <a
                href="/how-it-works"
                className="btn btn--secondary btn--lg"
              >
                How it works
              </a>
            </div>
            <div className="geo-hero-proofline">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
              {entry.aprRangeLow}–{entry.aprRangeHigh}% APR · No collateral ·
              Bank decline is fine · Soft credit pull only
            </div>
          </div>

          <aside className="geo-stat-card" aria-label="Local snapshot">
            <h4>
              <span className="geo-pin">●</span> {entry.city} snapshot — last 90
              days
            </h4>
            <div className="geo-stat-row">
              <div className="geo-stat-label">
                Registered owner-operators in {entry.state}
              </div>
              <div className="geo-stat-value">
                {entry.localStatOperatorCount}
              </div>
            </div>
            <div className="geo-stat-row">
              <div className="geo-stat-label">
                Matched with capital through Dispatched
              </div>
              <div className="geo-stat-value">{entry.localStatFundedCount}</div>
            </div>
            <div className="geo-stat-row">
              <div className="geo-stat-label">Median amount funded</div>
              <div className="geo-stat-value">
                ${entry.localStatMedianAmount}
              </div>
            </div>
            <div className="geo-stat-row">
              <div className="geo-stat-label">Median time to funds</div>
              <div className="geo-stat-value">
                {entry.localStatMedianHours}
                <span className="geo-unit">hrs</span>
              </div>
            </div>
            <div className="geo-stat-foot">
              <span className="geo-dot"></span>
              Lender panel active for {entry.state} registrations. Updated{" "}
              {entry.dataRefreshDate}.
              <span className="geo-stat-methodology">
                Funded volume measured as originated principal across partner
                lenders, 90-day rolling; excludes renewals. Median timing
                measured from completed application to first wire.{" "}
                <a href="/methodology">Methodology</a>.
              </span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function WhyLocalMatters({ entry }: { entry: City }) {
  return (
    <section className="geo-sunken">
      <div className="geo-container">
        <div className="geo-sec-head">
          <span className="geo-eyebrow">Why local matters</span>
          <h2>Built for the way {entry.state} trucking actually works</h2>
          <p>
            We&apos;re not a national form tuned for averages. The lenders on
            our panel price your business the way a local underwriter would —
            because that&apos;s usually who&apos;s funding it.
          </p>
        </div>

        <div className="geo-card-grid-3">
          <article className="geo-feature-card">
            <svg
              className="geo-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M3 12h4l3-8 4 16 3-8h4" />
            </svg>
            <h3>
              {entry.state} freight corridors and lane economics we understand
            </h3>
            <p>
              We track deadhead rates, backhaul availability, and seasonal
              demand on {entry.statePrimaryCorridor} and the{" "}
              {entry.stateSecondaryCorridor}. When your revenue dips because the
              lane dipped, underwriters on our panel know the difference between
              a soft month and a struggling business.
            </p>
            <div className="geo-local-tag">
              Corridors: {entry.statePrimaryCorridor} ·{" "}
              {entry.stateSecondaryCorridor}
            </div>
          </article>

          <article className="geo-feature-card">
            <svg
              className="geo-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M12 3v3M5.6 5.6l2.1 2.1M3 12h3M5.6 18.4l2.1-2.1M12 18v3M18.4 18.4l-2.1-2.1M21 12h-3M18.4 5.6l-2.1 2.1" />
              <circle cx={12} cy={12} r={3} />
            </svg>
            <h3>
              Weather, equipment, and repair cost context for {entry.city}
            </h3>
            <p>
              {entry.cityWeatherContext}. That shows up as{" "}
              {entry.cityCostPressure} on your P&amp;L. We account for it in the
              file we send to lenders, so &ldquo;revenue dropped in{" "}
              {entry.citySeasonalMonth}&rdquo; reads as seasonality, not risk.
            </p>
            <div className="geo-local-tag">
              Avg {entry.city} repair ticket tracked: ${entry.cityAvgRepairCost}
            </div>
          </article>

          <article className="geo-feature-card">
            <svg
              className="geo-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <rect x={3} y={6} width={18} height={13} rx={1.5} />
              <path d="M3 10h18M8 15h3" />
              <path d="M8 3v4M16 3v4" />
            </svg>
            <h3>
              Local lenders on our panel familiar with {entry.state}{" "}
              registrations
            </h3>
            <p>
              {entry.stateLenderPanelCount} lenders on our panel are actively
              funding {entry.state}-registered carriers this quarter, including{" "}
              {entry.stateLenderExample1} and {entry.stateLenderExample2}. They
              already know how your DOT and MC numbers look when
              everything&apos;s in order.
            </p>
            <div className="geo-local-tag">
              {entry.stateLenderPanelCount} lenders licensed in{" "}
              {entry.stateAbbr}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function WhyBanksDecline({ entry }: { entry: City }) {
  return (
    <section>
      <div className="geo-container">
        <div className="geo-explain-grid">
          <div>
            <span className="geo-eyebrow">Bank decline is fine</span>
            <h2 className="t-h1 geo-explain-title">
              Why banks decline trucking businesses (and why it&apos;s rarely a
              credit problem)
            </h2>
            <p className="geo-explain-lede">
              Most {entry.city} owner-operators who come through us were turned
              away by the same two or three {entry.state} banks. Not because
              they&apos;re bad borrowers — because of how banks underwrite.
            </p>
            <p className="geo-explain-copy">
              The lenders on our panel underwrite the <em>business</em>, not
              just the FICO. Your BOLs, factoring history, fuel card, and 1099s
              tell a story a bank&apos;s credit model was never built to read.
            </p>
          </div>

          <ol className="geo-reason-list">
            <li>
              <span className="geo-reason-num">01</span>
              <div>
                <h4>Banks want two years of clean tax returns.</h4>
                <p>
                  Half of {entry.state} owner-operators haven&apos;t filed the
                  way a bank wants to read it. Our lenders read bank statements
                  instead — and accept {entry.state} IFTA returns as revenue
                  verification.
                </p>
              </div>
            </li>
            <li>
              <span className="geo-reason-num">02</span>
              <div>
                <h4>Banks don&apos;t underwrite equipment they can&apos;t park at a branch.</h4>
                <p>
                  A {entry.city}-registered tractor is a balance-sheet risk to a
                  bank. To our lenders, it&apos;s a working asset they&apos;ve
                  seen a thousand times.
                </p>
              </div>
            </li>
            <li>
              <span className="geo-reason-num">03</span>
              <div>
                <h4>Banks treat factoring receivables as &ldquo;not real revenue.&rdquo;</h4>
                <p>
                  If you&apos;re factoring through {entry.stateCommonFactor} or
                  similar, our lenders already have those statements in their
                  pipeline format. It counts.
                </p>
              </div>
            </li>
            <li>
              <span className="geo-reason-num">04</span>
              <div>
                <h4>Banks need 60–90 days. You need it Thursday.</h4>
                <p>
                  Dispatched&apos;s median time to funds in {entry.state} over
                  the last 90 days is{" "}
                  <strong>{entry.localStatMedianHours} hours.</strong> From the
                  chat to the wire.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}

function ProofCards({ entry }: { entry: City }) {
  const [a, b, c] = entry.proofCards;
  return (
    <section className="geo-sunken">
      <div className="geo-container">
        <div className="geo-sec-head">
          <span className="geo-eyebrow">Recently funded near you</span>
          <h2>What {entry.city} operators used the capital for</h2>
          <p>
            Three anonymized matches from the last 90 days. Amounts and
            time-to-funds are actuals — names are not.
          </p>
        </div>

        <div className="geo-card-grid-3">
          <ProofCardArticle card={a} footer={`Owner-operator · 1 truck · ${a.truckType}`} />
          <ProofCardArticle
            card={b}
            footer={`Small fleet · ${b.fleetSize ?? "—"} trucks · ${b.truckType}`}
          />
          <ProofCardArticle card={c} footer={`Owner-operator · 1 truck · ${c.truckType}`} />
        </div>
      </div>
    </section>
  );
}

function ProofCardArticle({
  card,
  footer,
}: {
  card: City["proofCards"][number];
  footer: string;
}) {
  return (
    <article className="geo-proof-card">
      <span className="geo-tag">
        <svg
          width={12}
          height={12}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <circle cx={12} cy={10} r={3} />
          <path d="M12 21c-4-4-8-7.5-8-11a8 8 0 0 1 16 0c0 3.5-4 7-8 11z" />
        </svg>
        {card.cityNeighborhood}
      </span>
      <p className="geo-use">{card.use}</p>
      <div className="geo-metrics">
        <div>
          <span className="geo-m-label">Funded</span>
          <span className="geo-m-value">${card.amount}</span>
        </div>
        <div>
          <span className="geo-m-label">Time to funds</span>
          <span className="geo-m-value">{card.time}</span>
        </div>
      </div>
      <div className="geo-proof-footer">{footer}</div>
    </article>
  );
}

function DataFlow() {
  return (
    <section>
      <div className="geo-container">
        <div className="geo-flow-card">
          <div>
            <span className="geo-eyebrow">What happens with your data</span>
            <h3>
              One application. Soft credit pull. You see every term before you
              sign anything.
            </h3>
            <p className="geo-flow-lede">
              We&apos;re a matchmaker, not a lender. Your information only goes
              to lenders whose criteria you already fit — never to a broker
              pool, never sold, never to a scraper.
            </p>
          </div>
          <div className="geo-flow-steps">
            <FlowStep n="1" title="Chat intake takes 6–9 minutes">
              You tell our AI Capital Advisor what the money is for. No forms,
              no 40-field PDF.
            </FlowStep>
            <FlowStep n="2" title="Soft pull, never hard">
              We check eligibility without a hit to your score. Hard pulls only
              happen once you pick a lender and agree.
            </FlowStep>
            <FlowStep n="3" title="Only matched lenders see your file">
              Typically 2–4 lenders whose criteria you fit — not a blast to a
              broker pool. No 7am phone calls from people you never spoke to.
            </FlowStep>
            <FlowStep n="4" title="You see every term before you sign">
              APR, total cost, payment schedule, prepayment terms. Plain
              language. You pick, or you walk.
            </FlowStep>
          </div>
        </div>
      </div>
    </section>
  );
}

function FlowStep({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="geo-flow-step">
      <span className="geo-n">{n}</span>
      <div>
        <h5>{title}</h5>
        <p>{children}</p>
      </div>
    </div>
  );
}

function PlusIcon() {
  return (
    <svg
      className="geo-plus"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function LocalFAQ({ entry }: { entry: City }) {
  return (
    <section className="geo-sunken">
      <div className="geo-container">
        <div className="geo-faq-grid">
          <div>
            <span className="geo-eyebrow">FAQ · {entry.state}</span>
            <h2 className="t-h1 geo-faq-intro-title">
              Questions {entry.state} operators actually ask
            </h2>
            <p className="geo-faq-intro-copy">
              Can&apos;t find it? Call{" "}
              <a href="tel:+15550104477">(555) 010‑4477</a> — someone who funds
              trucking for a living will pick up.
            </p>
          </div>

          <div className="geo-faq-list">
            <details className="geo-faq-item">
              <summary>
                Do you actually fund me, or is this a broker site?
                <PlusIcon />
              </summary>
              <div className="geo-faq-answer">
                Neither. We&apos;re a matchmaker. Lenders on our panel fund you
                directly — we&apos;re paid by them on close, not by you. You
                never pay Dispatched, and your info does not go to a broker
                pool.
              </div>
            </details>

            <details className="geo-faq-item">
              <summary>
                How much can I get and how fast?
                <PlusIcon />
              </summary>
              <div className="geo-faq-answer">
                $25,000 to $250,000 for owner-operators and small fleets.
                Typically funded in 24–48 hours from the moment you finish the
                chat intake. In {entry.state} specifically, our 90-day median is{" "}
                {entry.localStatMedianHours} hours.
              </div>
            </details>

            <details className="geo-faq-item">
              <summary>
                What APR range should I expect?
                <PlusIcon />
              </summary>
              <div className="geo-faq-answer">
                Offers on our panel typically fall in the{" "}
                <strong>
                  {entry.aprRangeLow}–{entry.aprRangeHigh}% APR range
                </strong>{" "}
                for qualified owner-operators and small fleets. Your specific
                rate depends on time in business, monthly revenue, credit, and
                which lender matches. You&apos;ll see the full APR, total cost,
                payment schedule, and any prepayment terms on every offer{" "}
                <em>before</em> you agree to anything — not after. If a lender
                won&apos;t show those up front, we don&apos;t work with them.
              </div>
            </details>

            <details className="geo-faq-item">
              <summary>
                My bank declined me. Will that hurt my chances here?
                <PlusIcon />
              </summary>
              <div className="geo-faq-answer">
                No. It&apos;s the reason we built this. Most of our volume is
                operators the banks passed on. Our lenders read bank statements
                and freight documents, not just credit scores.
              </div>
            </details>

            <details className="geo-faq-item">
              <summary>
                Is the credit check a hard pull?
                <PlusIcon />
              </summary>
              <div className="geo-faq-answer">
                Soft pull to check eligibility. Hard pull only happens after you
                pick a specific lender and agree to move forward. No surprises.
              </div>
            </details>

            <details className="geo-faq-item">
              <summary>
                What documents do I need?
                <PlusIcon />
              </summary>
              <div className="geo-faq-answer">
                Three months of business bank statements, your MC and DOT
                numbers, EIN, and a recent BOL or factoring statement.
                That&apos;s usually it. No tax returns required for most offers.
              </div>
            </details>

            <details className="geo-faq-item">
              <summary>
                <span className="geo-faq-q-text">
                  <span className="geo-local-tag-inline">
                    Local to {entry.state}
                  </span>
                  Is commercial lending even licensed in {entry.state}?
                </span>
                <PlusIcon />
              </summary>
              <div className="geo-faq-answer">
                Yes. Commercial working-capital loans to {entry.state}
                -registered businesses are regulated under{" "}
                {entry.stateLicensingAuthority} ({entry.stateLicensingCitation}
                ). Every lender on our panel that funds in {entry.state} either
                holds the required {entry.stateLicenseType} or operates under
                the applicable exemption. You can request the license number on
                any offer before signing.
              </div>
            </details>

            <details className="geo-faq-item">
              <summary>
                <span className="geo-faq-q-text">
                  <span className="geo-local-tag-inline">
                    Local to {entry.state}
                  </span>
                  How do {entry.state} sales tax and fuel tax credits affect my
                  application?
                </span>
                <PlusIcon />
              </summary>
              <div className="geo-faq-answer">
                {entry.state} {entry.stateSalesTaxNote}, and your IFTA fuel tax
                credits show up in quarterly refunds that our lenders treat as
                part of your cash flow — not as a wash. If you&apos;re behind on{" "}
                {entry.stateTaxAuthority} filings, it&apos;s not an automatic
                decline; several lenders on our panel have funded borrowers with
                an active payment plan. Mention it in the chat and we&apos;ll
                route you to lenders who&apos;ve funded similar situations this
                quarter.
              </div>
            </details>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCTABand({ entry }: { entry: City }) {
  return (
    <div className="geo-cta-band">
      <div className="geo-container">
        <div>
          <h2>
            See what you qualify for — 6 to 9 minutes, soft pull only
          </h2>
          <p>
            Same universal intake every {entry.state} operator uses. No{" "}
            {entry.city}-specific form. We route you to the right lender behind
            the scenes.
          </p>
        </div>
        <a href="/apply" className="btn btn--primary btn--lg">
          Start my application
          <ArrowRight />
        </a>
      </div>
    </div>
  );
}

function SiteFooter({ entry }: { entry: City }) {
  return (
    <footer className="geo-footer">
      <div className="geo-container">
        <div className="geo-f-grid">
          <div className="geo-f-col geo-f-brand">
            <Link href="/" className="geo-logo" aria-label="Dispatched home">
              <DispatchedMark />
              Dispatched
            </Link>
            <p>
              Working capital for the small businesses banks turn away. First
              vertical: trucking. Next: construction and skilled trades.
            </p>
          </div>
          <div className="geo-f-col">
            <h6>Product</h6>
            <ul>
              <li>
                <a href="/trucking">Trucking</a>
              </li>
              <li>
                <a href="/construction">Construction — soon</a>
              </li>
              <li>
                <a href="/how-it-works">How it works</a>
              </li>
              <li>
                <a href="/rates">Rates &amp; terms</a>
              </li>
            </ul>
          </div>
          <div className="geo-f-col">
            <h6>Company</h6>
            <ul>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/lenders">For lenders</a>
              </li>
              <li>
                <a href="/careers">Careers</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </div>
          <div className="geo-f-col">
            <h6>Legal</h6>
            <ul>
              <li>
                <a href="/privacy">Privacy</a>
              </li>
              <li>
                <a href="/terms">Terms</a>
              </li>
              <li>
                <a href="/licenses">Licenses &amp; disclosures</a>
              </li>
              <li>
                <a href="/responsible-lending">Responsible lending</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="geo-f-legal">
          <div>
            <p>
              Dispatched is a technology platform that matches small businesses
              with licensed commercial lenders. Dispatched is not a lender and
              does not make credit decisions. Rates, amounts, and terms depend
              on your business and are disclosed in full by the lender before
              you sign. You will always see the APR, total cost, payment
              schedule, and prepayment terms before any agreement is executed.
            </p>
            <p>
              Loan products are offered by third-party lenders licensed to
              operate in your state. In {entry.state}, commercial lending
              activity is regulated under {entry.stateLicensingAuthority}.
              Lender license numbers are available on request. Not all
              applicants will qualify. Funding times are estimates based on
              90-day medians and are not guaranteed.
            </p>
            <p>
              &ldquo;Bank decline is fine&rdquo; refers to eligibility with
              Dispatched&apos;s lender panel, not a guarantee of approval.
            </p>
          </div>
          <div className="geo-copy">© 2026 Dispatched, Inc.</div>
        </div>
      </div>
    </footer>
  );
}
