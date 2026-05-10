import type { Metadata } from "next";
import Link from "next/link";
import { SAMPLING_PROFILES } from "@/lib/data/profiles";
import {
  JsonLd,
  article,
  breadcrumbList,
  faqPage,
} from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Methodology — how Dispatched matches you | Dispatched",
  description:
    "How Dispatched defines, sources, and refreshes the rate ranges and structural promises it publishes. Finance and insurance methodology in one place.",
  alternates: { canonical: "/methodology" },
  openGraph: {
    title: "Methodology — how Dispatched matches you | Dispatched",
    description:
      "How Dispatched defines, sources, and refreshes the rate ranges and structural promises it publishes. Finance and insurance methodology in one place.",
    url: "/methodology",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Methodology — how Dispatched matches you | Dispatched",
    description:
      "How Dispatched defines, sources, and refreshes the rate ranges and structural promises it publishes. Finance and insurance methodology in one place.",
  },
};

const faqs = [
  {
    q: "How does Dispatched match operators to lenders?",
    a: "The intake form collects the underwriting fields lenders care about — monthly business deposits, time in business, FICO band, equipment type, and what the funds are for. The matching engine routes the application to the lenders on the panel whose published appetite rules accept the operator's profile. The operator sees a shortlist of 2 to 4 matched lenders and picks one to move forward with.",
  },
  {
    q: "Where do the panel APR ranges come from?",
    a: "The 14% to 34% working-capital range and 9% to 18% equipment-loan range are the observed band of APRs that lenders on the Dispatched panel have actually quoted to funded borrowers over the trailing 12 months. The ranges are not a forecast and not a guarantee — they are descriptive of what the panel has done. Bands are reviewed quarterly and updated when the underlying data shifts materially.",
  },
  {
    q: "What underwriting signals do the panel lenders weight most?",
    a: "For working capital and repair loans: monthly business deposits, deposit consistency over the trailing 3 to 6 months, debt service coverage ratio (DSCR), and time in business. FICO is secondary. For equipment loans: the asset's appraised value and remaining useful life, the operator's down payment, and revenue. For factoring: the broker's credit, not the operator's.",
  },
  {
    q: "Is Dispatched a direct lender?",
    a: "No. Dispatched is a matching platform. Loans are originated and funded by the lenders on the panel. Dispatched is paid a referral fee by the lender on funded loans — the operator pays nothing to apply, match, or receive a term sheet. Dispatched is also not a direct insurer; insurance quotes route to a named producer partner.",
  },
  {
    q: "How is the lender panel curated?",
    a: "Lenders are vetted on three dimensions before joining the panel: licensing and disclosure compliance in the states they fund, transparent fee and APR disclosure on term sheets, and willingness to underwrite trucking-specific signals (DOT, MC, settlement statements) instead of generic small-business templates. Lenders that price-gouge or bury fees in the fine print are removed from the panel.",
  },
  {
    q: "Does Dispatched accept compensation that biases the match?",
    a: "Lenders pay Dispatched on funded loans, but the matching engine routes on appetite fit, not on pay rate. The shortlist returned to the operator is the set of lenders whose published appetite accepts the operator's profile — it is not sorted by which lender pays Dispatched the most. Operators always see at least 2 lenders to compare, where 2 or more pass appetite.",
  },
  {
    q: "How often are the rate ranges and program rules updated?",
    a: "The panel APR ranges are reviewed quarterly against the trailing 12 months of funded-loan data. Program rules (FICO floors, loan amount bands, document requirements) are updated within 14 days of a material panel change — for example, if a lender exits the panel or changes their FICO floor. Updates are reflected on this page and on the affected money pages.",
  },
];

export default function MethodologyPage() {
  const today = new Date().toISOString().slice(0, 10);
  return (
    <div className="ins-page">
      <JsonLd
        payload={breadcrumbList([
          { name: "Home", url: "https://dispatched.finance/" },
          { name: "Methodology", url: "https://dispatched.finance/methodology" },
        ])}
      />
      <JsonLd
        payload={article({
          headline: "Dispatched Methodology",
          description:
            "Definitions, sourcing, refresh cadence, and publication discipline for the trucking finance and commercial trucking insurance content Dispatched publishes.",
          url: "https://dispatched.finance/methodology",
          datePublished: today,
          dateModified: today,
        })}
      />
      <JsonLd payload={faqPage(faqs)} />

      <main id="main-content">
        <section className="ins-hero">
          <div className="ins-container">
            <span className="ins-eyebrow">Methodology</span>
            <h1 className="ins-hero-title">
              How Dispatched defines, sources, and refreshes what it publishes.
            </h1>
            <p className="ins-hero-sub">
              Two surfaces, one discipline. Trucking finance content sticks to
              structural promises about how the application flow works and to
              ranges anchored to observed lender pricing. Commercial trucking
              insurance content anchors every premium band to a named operator
              profile and a public state Department of Insurance filing.
            </p>
            <nav className="ins-toc" aria-label="Methodology sections">
              <a href="#finance">Trucking finance</a>
              <a href="#insurance">Commercial trucking insurance</a>
            </nav>
          </div>
        </section>

        {/* ====================== TRUCKING FINANCE ====================== */}
        <section id="finance">
          <div className="ins-container">
            <span className="ins-eyebrow">Trucking finance</span>
            <h2 className="ins-hero-title">
              What every claim on the trucking finance home means
            </h2>
            <p className="ins-hero-sub">
              The trucking home publishes a small set of facts: a working
              capital range, three structural promises about the application
              flow, and a set of composite scenarios. We do not publish a
              &ldquo;median time to funds&rdquo; figure or a rolling 30-day
              funded total until the data layer can derive it from real
              signed-application and funding events. The promises below are
              what we are willing to stand behind today.
            </p>
          </div>
        </section>

        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">What we measure</span>
            <h2 className="ins-hero-title">
              The structural facts published on the home
            </h2>
            <ul className="ins-sources-typed">
              <li>
                <strong>Soft-pull match.</strong> Dispatched runs a soft credit
                inquiry to find lender matches. Soft inquiries are not visible
                to other lenders and do not affect the borrower&apos;s credit
                score. This is a property of the application flow, not a
                statistical claim.
              </li>
              <li>
                <strong>One hard pull, only with the lender you pick.</strong>{" "}
                A hard credit pull happens after the borrower selects a
                specific lender and moves forward on that lender&apos;s term
                sheet. Multiple hard pulls inside a 14-day rate-shopping window
                count as a single inquiry under standard credit-bureau
                policies.
              </li>
              <li>
                <strong>Wire same banking day after lender sign-off.</strong>{" "}
                Same-banking-day wires occur when the chosen lender signs off
                and the wire instruction lands before the partner bank&apos;s
                cutoff. Wires that miss the cutoff settle the next banking day;
                weekend and federal-holiday wires settle the next banking day.
                This is constrained by the Federal Reserve&apos;s wire window
                and partner banking cutoffs, not a Dispatched-controlled
                throughput target.
              </li>
              <li>
                <strong>$25K–$250K working capital range.</strong> Reflects
                offers issued by panel lenders to qualified trucking borrowers.
                Actual approval depends on monthly revenue, time in business,
                credit band, and lender underwriting. Some borrowers qualify
                for less than $25K or more than $250K via separate products not
                shown on the landing page.
              </li>
              <li>
                <strong>Composite illustrative scenarios.</strong> Cards on the
                home labeled &ldquo;composite scenarios&rdquo; are illustrative
                examples constructed from the categories and amount bands our
                intake commonly sees. They do not represent specific borrowers,
                transactions, or guaranteed outcomes.
              </li>
            </ul>
          </div>
        </section>

        <section id="finance-rates">
          <div className="ins-container">
            <span className="ins-eyebrow">Finance rates</span>
            <h2 className="ins-hero-title">
              How we describe APR ranges
            </h2>
            <p className="ins-hero-sub">
              Two APR bands appear in the marketing FAQ:{" "}
              <code>14% – 34% APR</code> for working capital and{" "}
              <code>9% – 18% APR</code> for equipment loans secured by the
              truck. These are observed panel ranges — the spread of pricing
              the lenders on our routing panel currently quote to qualified
              trucking borrowers. They are not Dispatched-set rates,
              guarantees, or pre-qualifications. The exact APR a borrower sees
              is set by the chosen lender on the term sheet and depends on
              revenue, time in business, credit band, and the lender&apos;s
              own underwriting.
            </p>
            <p className="ins-compliance-note">
              Working capital APRs vary widely because the product covers
              short-term lines and longer-term term loans across multiple
              underwriting models. Equipment loan APRs are tighter because the
              truck itself is the collateral and pricing is more
              standardized. We do not publish an &ldquo;average&rdquo; APR
              within either band — averages compress meaningful credit-band
              variance and would mislead borrowers above and below it.
            </p>
          </div>
        </section>

        <section className="ins-sunken" id="composite-scenarios">
          <div className="ins-container">
            <span className="ins-eyebrow">Composite scenarios</span>
            <h2 className="ins-hero-title">
              How we label illustrative scenarios
            </h2>
            <p className="ins-hero-sub">
              The four cards in the &ldquo;What a Dispatched-funded request
              actually looks like&rdquo; section on the home are illustrative
              composites. Each is built from the kinds of repair, payroll,
              equipment, and bridge-capital requests our intake routinely
              sees, paired with a realistic loan-amount band and the
              borrower-archetype the request typically comes from. They are
              not specific transactions and are not anonymized real loans.
            </p>
            <p className="ins-compliance-note">
              When the data layer can produce real anonymized funded-loan
              records with a stamped sourcing date, we will replace these
              composites with real records and re-label the section to make
              the change explicit. Until then the section is labeled
              &ldquo;Composite scenarios&rdquo; and every card carries an
              &ldquo;Illustrative&rdquo; badge so readers can place the
              content correctly.
            </p>
          </div>
        </section>

        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">What we do not publish</span>
            <h2 className="ins-hero-title">
              Numbers we keep off the marketing surfaces until they are real
            </h2>
            <ul className="ins-sources-typed">
              <li>
                <strong>Rolling-window funded totals</strong> (e.g., &ldquo;$XM
                funded in the last 30 days&rdquo;). Will publish only when
                derived from signed-application and funding events with a
                computation date stamped in the data layer and an independent
                monthly verification step.
              </li>
              <li>
                <strong>Median time to funds.</strong> Will publish only when
                derived from real lender-signed-application and ACH-settled
                funding events across a defined trailing window, with the
                computation date and exclusions disclosed inline.
              </li>
              <li>
                <strong>Panel-size counts</strong> (e.g., &ldquo;X lenders on
                our panel&rdquo;). Currently described qualitatively
                (&ldquo;trucking-friendly lenders on our panel&rdquo;) until
                the panel registry is published with last-verified dates per
                lender.
              </li>
            </ul>
          </div>
        </section>

        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">Refresh</span>
            <h2 className="ins-hero-title">
              When the finance content changes
            </h2>
            <p className="ins-hero-sub">
              Structural promises change only when the application flow
              changes — for example, if the soft-pull behavior, the
              one-hard-pull rule, or the wire-timing constraint changes. The
              loan range and APR bands are reviewed at least quarterly against
              actual lender-issued offers on the routing panel and updated if
              the observed band shifts materially.
            </p>
          </div>
        </section>

        {/* ================== COMMERCIAL TRUCKING INSURANCE ================== */}
        <section id="insurance">
          <div className="ins-container">
            <span className="ins-eyebrow">Commercial trucking insurance</span>
            <h2 className="ins-hero-title">
              How we source and publish commercial trucking insurance rates
            </h2>
            <p className="ins-hero-sub">
              Every premium band on this site is anchored to a named operator
              profile and a public state Department of Insurance filing. We do
              not invent rates, we do not paraphrase regulators, and we do not
              ship a programmatic page until the editorial body and reviewer
              attestation are in place.
            </p>
          </div>
        </section>

        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">Sourcing</span>
            <h2 className="ins-hero-title">
              Where the rate observations come from
            </h2>
            <p className="ins-hero-sub">
              Phase 1 ships with three source classes. Each is labelled
              distinctly on every page that uses it; the eyebrow on the rate
              band and the disclosure paragraph beneath it tell you which one
              you are reading.
            </p>
            <ul className="ins-sources-typed">
              <li>
                <strong>State DOI filing.</strong> Sampled directly from a
                public Department of Insurance rate filing for the named
                state. The strongest source class. The eyebrow reads
                &ldquo;Sampled premium band — state DOI filing&rdquo;.
              </li>
              <li>
                <strong>Carrier-published guidance.</strong> Sourced from a
                carrier&apos;s own publicly-disclosed rate ranges
                (commercial-marketing pages, owner-operator FAQs). Used as a
                transitional proxy when we have not yet extracted a
                state-specific filing. The eyebrow reads &ldquo;Indicative
                band — carrier-published guidance&rdquo;.
              </li>
              <li>
                <strong>National-average proxy.</strong> Sourced from
                industry surveys (e.g., ATRI operating-cost reports). Used
                when no state or carrier source is available. The eyebrow
                reads &ldquo;Indicative band — national-average proxy&rdquo;.
              </li>
            </ul>
            <p className="ins-compliance-note">
              We are not licensing a paid wholesale broker rate feed in Phase
              1. That decision keeps every number on the site auditable
              against a regulator-published or carrier-published source and
              avoids the temptation to paper over coverage gaps with
              vendor-proprietary numbers we cannot show. Proxy bands
              (carrier-published, national-average) carry an explicit note
              that a state-specific filing is pending and will replace the
              proxy when extracted.
            </p>
          </div>
        </section>

        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">Sampling profiles</span>
            <h2 className="ins-hero-title">
              The operator scenarios our premiums are anchored to
            </h2>
            <p className="ins-hero-sub">
              A premium band is meaningless without the operator profile it
              was sampled against. Below are the named profiles. Every
              premium band on the site references one of them by id, and the
              profile is reproduced verbatim on the page that uses it.
            </p>
            {Object.values(SAMPLING_PROFILES).map((p) => (
              <article key={p.id} className="ins-profile">
                <h4>{p.label}</h4>
                <dl>
                  <dt>Driver</dt>
                  <dd>{p.driver}</dd>
                  <dt>Vehicle</dt>
                  <dd>{p.vehicle}</dd>
                  <dt>Coverage</dt>
                  <dd>{p.coverage}</dd>
                  <dt>Operations</dt>
                  <dd>{p.operations}</dd>
                </dl>
              </article>
            ))}
          </div>
        </section>

        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">Refresh cadence</span>
            <h2 className="ins-hero-title">
              When numbers on the site update
            </h2>
            <p className="ins-hero-sub">
              Each rate observation carries a <code>sampledAt</code> date.
              When the underlying DOI filing changes, the observation is
              re-sampled and the date advances. Pages display the sampling
              date in the byline, and any page whose latest observation is
              older than 12 months is flagged for re-sampling before any
              monetization decisions are made on it.
            </p>
            <p className="ins-compliance-note">
              FMCSA rule and federal-minimum-limit changes are tracked
              separately. Any change to 49 CFR Part 387 minimums is reflected
              in the product hub on or before the rule&apos;s effective date.
            </p>
          </div>
        </section>

        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">Publication discipline</span>
            <h2 className="ins-hero-title">
              When a programmatic page is allowed to ship
            </h2>
            <p className="ins-hero-sub">
              A state-by-DOT-class money page is only generated when its
              entry exists in our internal money-page index. The index is
              not auto-populated by the data layer; an entry is added by a
              human after the editorial body is written, the data is sourced,
              and an expert reviewer has signed off on the page. Until that
              entry is added, the URL returns a 404 — not a thin or
              placeholder page.
            </p>
            <p className="ins-compliance-note">
              When a product&times;state&times;DOT-class combination has not
              yet been sampled, the corresponding money page renders an
              explicit &ldquo;rate band pending&rdquo; notice rather than a
              fabricated number. Carrier listings on those pages are sourced
              from the carriers&apos; own appointment and license footprints,
              and they are unaffected by a pending rate band.
            </p>
          </div>
        </section>

        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">Carrier ratings</span>
            <h2 className="ins-hero-title">
              How we display AM Best ratings
            </h2>
            <p className="ins-hero-sub">
              An AM Best rating is shown on a carrier row only when a
              specific human has verified it on{" "}
              <a href="https://web.ambest.com/" rel="noopener" target="_blank">
                ambest.com
              </a>{" "}
              and stamped the verification date in the data layer. Where the
              row reads &ldquo;Pending verification&rdquo;, we have not
              completed that step — it is not a statement that the
              carrier&apos;s rating is missing or weak. Carriers that AM Best
              has classified as Not Rated will be displayed as such once the
              data layer distinguishes &ldquo;not rated&rdquo; from &ldquo;not
              yet verified by us&rdquo;.
            </p>
          </div>
        </section>

        <section>
          <div className="ins-container">
            <p>
              <Link href="/insurance/tools/premium-estimator">
                → Try the premium estimator
              </Link>
            </p>
            <p>
              <Link href="/insurance">← Back to commercial trucking insurance</Link>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
