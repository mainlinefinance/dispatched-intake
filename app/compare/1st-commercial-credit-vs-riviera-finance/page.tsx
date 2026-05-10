import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/landing/Footer";
import Nav from "@/components/landing/Nav";
import {
  JsonLd,
  article,
  breadcrumbList,
  faqPage,
} from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title:
    "1st Commercial Credit vs Riviera Finance — 2026 Comparison | Dispatched",
  description:
    "Mid-tier factoring head-to-head: 1st Commercial Credit (Austin TX, ABL + factoring) vs Riviera Finance (1969, established service). Rates, contracts, and ABL compared.",
  alternates: {
    canonical: "/compare/1st-commercial-credit-vs-riviera-finance",
  },
  openGraph: {
    title:
      "1st Commercial Credit vs Riviera Finance — 2026 Comparison | Dispatched",
    description:
      "Mid-tier factoring head-to-head: 1st Commercial Credit (Austin TX, ABL + factoring) vs Riviera Finance (1969, established service). Rates, contracts, and ABL compared.",
    url: "/compare/1st-commercial-credit-vs-riviera-finance",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "1st Commercial Credit vs Riviera Finance — 2026 Comparison | Dispatched",
    description:
      "Mid-tier factoring head-to-head: 1st Commercial Credit (Austin TX, ABL + factoring) vs Riviera Finance (1969, established service). Rates, contracts, and ABL compared.",
  },
};

const PAGE_URL =
  "https://dispatched.finance/compare/1st-commercial-credit-vs-riviera-finance";

const faqs = [
  {
    q: "Which has lower rates?",
    a: "1st Commercial Credit, on headline. 1st Commercial Credit's range is 1.5–3.5%; Riviera Finance typically runs 3–5%. For mid-fleets shopping primarily on rate, 1st Commercial Credit is the cleaner choice. Riviera's premium reflects its tenure-driven relationship model and service depth rather than pure pricing competitiveness.",
  },
  {
    q: "What's the difference in industry focus?",
    a: "1st Commercial Credit is multi-industry (trucking, staffing, manufacturing, oilfield, distribution). Riviera Finance is more focused on trucking within a broader factoring portfolio. For carriers wanting a factor that understands trucking-specific issues (broker payment cycles, IFTA timing, fuel program structures), Riviera's specialization is the edge. For diversified businesses with both trucking and non-trucking revenue streams, 1st Commercial Credit's multi-industry reach matters more.",
  },
  {
    q: "Which has ABL graduation available?",
    a: "1st Commercial Credit, clearly. They offer asset-based lending alongside factoring — meaning factoring graduates into ABL at scale without changing lenders. Riviera Finance has limited ABL offerings; carriers wanting ABL graduation typically need to migrate to a different lender. For mid-fleets approaching the $5M annual revenue threshold where ABL becomes economical, 1st Commercial Credit provides the path.",
  },
  {
    q: "Which is better for cross-border carriers?",
    a: "1st Commercial Credit serves US, Canada, and Mexico operations. Riviera Finance is US-focused. For carriers running freight across either Canadian or Mexican borders, 1st Commercial Credit is the structural choice. The trade-off: cross-border factoring is operationally more complex, and Riviera's US-only focus means deeper expertise in US-specific broker payment cycles and IFTA.",
  },
  {
    q: "How does Riviera's 55+ year history actually matter?",
    a: "Long tenure means deep broker relationships (some Riviera-financed carriers have been factoring through the same broker network for 20+ years), stable infrastructure (no acquisition-related service disruption), and established CSA/CSP credit underwriting on common broker counterparts. For new carriers entering a market with thin track record, Riviera's institutional broker-credit knowledge can reduce friction at intake. For carriers wanting the latest technology stack, the trade-off is real — Riviera moves slower than newer entrants.",
  },
  {
    q: "Which is better for mid-fleets?",
    a: "Both serve mid-fleets, but for different reasons. 1st Commercial Credit's ABL graduation path makes it the better choice for mid-fleets planning to scale toward $5M+ annual revenue (factoring transitions to ABL internally). Riviera Finance's service depth makes it the better choice for stable mid-fleets in the $1-3M range that prioritize relationship continuity over rate optimization.",
  },
  {
    q: "Should I pick the cheaper option?",
    a: "Rate alone is misleading. 1st Commercial Credit's lower headline rate is real, but Riviera Finance's established broker relationships can reduce broker-payment-dispute friction in ways that don't show up in rate. The decision often comes down to: do you need ABL graduation (1st Commercial Credit)? Or do you prioritize relationship-driven service over rate (Riviera)?",
  },
];

export default function FirstCommercialCreditVsRivieraFinancePage() {
  const today = new Date().toISOString().slice(0, 10);
  return (
    <div className="landing">
      <JsonLd
        payload={breadcrumbList([
          { name: "Home", url: "https://dispatched.finance/" },
          { name: "Compare", url: PAGE_URL },
          {
            name: "1st Commercial Credit vs Riviera Finance",
            url: PAGE_URL,
          },
        ])}
      />
      <JsonLd
        payload={article({
          headline:
            "1st Commercial Credit vs Riviera Finance — mid-tier factoring in 2026?",
          description:
            "Head-to-head comparison of 1st Commercial Credit and Riviera Finance across rates, ABL availability, industry focus, geographic reach, and service tenure for 2026.",
          url: PAGE_URL,
          datePublished: today,
          dateModified: today,
        })}
      />
      <JsonLd payload={faqPage(faqs)} />

      <Nav />

      <main id="main-content" className="ins-page product-page">
        <section className="ins-hero product-hero">
          <div className="ins-container">
            <span className="ins-eyebrow">
              Dispatched · Updated May 2026 · Independent comparison
            </span>
            <h1 className="ins-hero-title">
              1st Commercial Credit vs Riviera Finance — mid-tier factoring
              in 2026?
            </h1>
            <p className="ins-hero-sub">
              Both 1st Commercial Credit and Riviera Finance serve the
              mid-tier factoring market that sits between owner-operator
              specialists (Apex, OTR) and enterprise-scale operations
              (eCapital, Triumph). 1st Commercial Credit offers ABL
              graduation; Riviera Finance brings 55+ years of factoring
              tenure. Different strengths for different growing fleets.
            </p>
            <div className="product-hero-ctas">
              <Link
                href="/apply?useCase=factoring"
                className="btn btn--primary btn--lg"
              >
                Get matched with the right factor →
              </Link>
              <Link
                href="/research/best-trucking-factoring-2026"
                className="btn btn--secondary btn--lg"
              >
                Read our 2026 factoring ranking →
              </Link>
            </div>
            <p className="product-hero-note">
              Soft-pull match. · Two minutes. · No spam from both at once.
            </p>
          </div>
        </section>

        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">At-a-glance</span>
            <h2 className="ins-hero-title">
              1st Commercial Credit vs Riviera Finance, in one paragraph.
            </h2>
            <p className="ins-hero-sub">
              1st Commercial Credit and Riviera Finance occupy the same
              mid-tier slot &mdash; growing-fleet factors that sit
              between owner-op specialists and enterprise platforms
              &mdash; from opposite directions. 1st Commercial Credit
              (Austin, ~2003) factors across trucking, staffing,
              manufacturing, oilfield, and distribution, prices
              1.5&ndash;3.5%, advances up to 95%, and offers ABL
              alongside factoring. Riviera Finance (1969, California)
              focuses on trucking within a broader portfolio, prices
              3&ndash;5%, advances 90&ndash;95%, and is one of the
              longest-tenured factors in the U.S. Headline rate favors
              1st Commercial Credit; service depth and U.S.
              trucking-specialty favor Riviera. The rest of this page is
              the line-by-line comparison. If you&rsquo;d rather skip
              the read,{" "}
              <Link href="/apply?useCase=factoring">
                /apply?useCase=factoring
              </Link>{" "}
              matches you in two minutes.
            </p>

            <table className="ins-carrier-table">
              <caption className="visually-hidden">
                1st Commercial Credit vs Riviera Finance &mdash;
                head-to-head comparison across key dimensions.
              </caption>
              <thead>
                <tr>
                  <th scope="col">Dimension</th>
                  <th scope="col">1st Commercial Credit</th>
                  <th scope="col">Riviera Finance</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="ins-carrier-name" data-label="Dimension">
                    <strong>Founded</strong>
                  </td>
                  <td data-label="1st Commercial Credit">~2003</td>
                  <td data-label="Riviera Finance">1969</td>
                </tr>
                <tr>
                  <td className="ins-carrier-name" data-label="Dimension">
                    <strong>HQ</strong>
                  </td>
                  <td data-label="1st Commercial Credit">Austin, TX</td>
                  <td data-label="Riviera Finance">
                    California (multi-region)
                  </td>
                </tr>
                <tr>
                  <td className="ins-carrier-name" data-label="Dimension">
                    <strong>Best for</strong>
                  </td>
                  <td data-label="1st Commercial Credit">
                    Mid-fleets, multi-industry operators, ABL graduation
                  </td>
                  <td data-label="Riviera Finance">
                    Established carriers, long-history factoring
                    relationships
                  </td>
                </tr>
                <tr>
                  <td className="ins-carrier-name" data-label="Dimension">
                    <strong>Headline rate</strong>
                  </td>
                  <td data-label="1st Commercial Credit">1.5–3.5%</td>
                  <td data-label="Riviera Finance">3–5% typical</td>
                </tr>
                <tr>
                  <td className="ins-carrier-name" data-label="Dimension">
                    <strong>Industry focus</strong>
                  </td>
                  <td data-label="1st Commercial Credit">
                    Multi-industry (trucking is one of several)
                  </td>
                  <td data-label="Riviera Finance">
                    Trucking-specialty within broader portfolio
                  </td>
                </tr>
                <tr>
                  <td className="ins-carrier-name" data-label="Dimension">
                    <strong>Funding speed</strong>
                  </td>
                  <td data-label="1st Commercial Credit">Same-day typical</td>
                  <td data-label="Riviera Finance">Standard same-day</td>
                </tr>
                <tr>
                  <td className="ins-carrier-name" data-label="Dimension">
                    <strong>Advance</strong>
                  </td>
                  <td data-label="1st Commercial Credit">Up to 95%</td>
                  <td data-label="Riviera Finance">90–95%</td>
                </tr>
                <tr>
                  <td className="ins-carrier-name" data-label="Dimension">
                    <strong>Contract</strong>
                  </td>
                  <td data-label="1st Commercial Credit">
                    12-month standard
                  </td>
                  <td data-label="Riviera Finance">12-month standard</td>
                </tr>
                <tr>
                  <td className="ins-carrier-name" data-label="Dimension">
                    <strong>Geographic reach</strong>
                  </td>
                  <td data-label="1st Commercial Credit">
                    US, Canada, Mexico (cross-border)
                  </td>
                  <td data-label="Riviera Finance">US-focused</td>
                </tr>
                <tr>
                  <td className="ins-carrier-name" data-label="Dimension">
                    <strong>ABL available</strong>
                  </td>
                  <td data-label="1st Commercial Credit">Yes</td>
                  <td data-label="Riviera Finance">Limited</td>
                </tr>
                <tr>
                  <td className="ins-carrier-name" data-label="Dimension">
                    <strong>Tenure</strong>
                  </td>
                  <td data-label="1st Commercial Credit">~23 years</td>
                  <td data-label="Riviera Finance">55+ years</td>
                </tr>
                <tr>
                  <td className="ins-carrier-name" data-label="Dimension">
                    <strong>Recourse / Non-recourse</strong>
                  </td>
                  <td data-label="1st Commercial Credit">Both</td>
                  <td data-label="Riviera Finance">Recourse default</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">Background and tenure</span>
            <h2 className="ins-hero-title">
              Two paths to the same mid-tier spot.
            </h2>

            <h3>1st Commercial Credit &mdash; broad-industry mid-tier.</h3>
            <p className="ins-hero-sub">
              1st Commercial Credit was founded around 2003 in Austin,
              Texas. The business model is deliberately diversified:
              trucking sits next to staffing, manufacturing, oilfield,
              and distribution receivables on the same underwriting
              platform. Rather than going deep on a single vertical, 1CC
              competes on rate, advance percentage, and the ability to
              layer asset-based lending on top of the factoring line as
              the borrower scales. Roughly 23 years in the market is
              long enough to have weathered the 2008 crisis, the 2015
              oil-patch downturn, and the 2020&ndash;2022 freight cycle
              &mdash; but materially shorter than the legacy factors.
              The trade-off for breadth is depth: 1CC is not
              trucking-native in the way Apex or TBS is, the fuel card
              program is narrower, and the broker-credit tooling is less
              mature than a trucking-specialty platform. (See{" "}
              <a
                href="https://www.1stcommercialcredit.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                1stcommercialcredit.com
              </a>{" "}
              for company-stated details.)
            </p>

            <h3>Riviera Finance &mdash; the 55-year tenure factor.</h3>
            <p className="ins-hero-sub">
              Riviera Finance has been factoring receivables since 1969,
              making it one of the oldest factoring companies still
              actively operating in the United States. Headquartered in
              California with multiple regional offices, Riviera built
              its franchise on relationship-driven service: dedicated
              account managers, in-person branch presence in core
              markets, and underwriting that emphasizes long-term
              carrier relationships. Trucking is the most prominent
              vertical within the broader factoring portfolio &mdash;
              the company has been factoring freight invoices
              continuously since before deregulation. That tenure shows
              up two ways: broker-credit underwriting on common
              counterparts is informed by 50+ years of payment history,
              and no private-equity recapitalization has disrupted the
              service model the way it has for roll-up factors. The
              trade-off: the technology stack moves slower than newer
              entrants. (See{" "}
              <a
                href="https://www.rivierafinance.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                rivierafinance.com
              </a>{" "}
              for company-stated details.)
            </p>
          </div>
        </section>

        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">Rates compared</span>
            <h2 className="ins-hero-title">
              Headline rate gap is real. Effective rate gap is smaller.
            </h2>

            <h3>1st Commercial Credit headline and effective rates.</h3>
            <p className="ins-hero-sub">
              1CC publishes 1.5&ndash;3.5%. The 1.5% number is reserved
              for high-volume fleets (20+ trucks, $300K+ monthly volume,
              recourse, clean broker mix); typical mid-fleets
              (5&ndash;15 trucks) land 2.0&ndash;3.0% depending on
              broker concentration and invoice size. Advance runs up to
              95%. Cross-industry accounts sometimes get a blended rate
              that doesn&rsquo;t map cleanly to either vertical &mdash;
              a feature for diversified borrowers, an irrelevance for
              pure-trucking ones.
            </p>

            <h3>Riviera Finance headline and effective rates.</h3>
            <p className="ins-hero-sub">
              Riviera publishes 3&ndash;5%. The bottom applies to
              long-tenured relationships with stable broker mix; new
              carriers quote middle-to-upper end. Advance runs
              90&ndash;95%. The premium isn&rsquo;t hidden &mdash;
              it&rsquo;s explicit in the relationship-driven model.
              Riviera&rsquo;s argument is that effective cost-of-factoring
              (rate plus dispute losses plus operational overhead) is
              competitive once you back out dispute-related write-offs.
              That holds for specific carrier profiles but not
              universally; clean-broker-mix mid-fleets pay a real
              premium for Riviera&rsquo;s service depth.
            </p>

            <h3>Winner by use case.</h3>
            <p className="ins-hero-sub">
              <strong>
                Mid-fleets shopping primarily on rate: 1st Commercial
                Credit.
              </strong>{" "}
              The 100&ndash;150 basis point headline gap is real and
              translates to meaningful annual dollars at $200K+ monthly
              factored volume.{" "}
              <strong>
                Mid-fleets where broker-payment-dispute friction is a
                recurring problem: Riviera.
              </strong>{" "}
              The premium is sometimes recovered in reduced dispute
              losses. For the broader mapping of factor pricing to
              operation size, see{" "}
              <Link href="/invoice-factoring-for-truckers">
                invoice factoring for truckers
              </Link>.
            </p>
          </div>
        </section>

        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">Industry focus</span>
            <h2 className="ins-hero-title">
              Cross-industry breadth vs trucking specialization.
            </h2>

            <h3>1st Commercial Credit &mdash; multi-industry by design.</h3>
            <p className="ins-hero-sub">
              1CC factors trucking alongside staffing, manufacturing,
              oilfield, distribution, and other receivable-driven
              industries. For a diversified borrower &mdash; say, a
              trucking company that also runs a brokerage or a
              warehousing operation &mdash; that breadth means one
              relationship covers multiple revenue streams without
              maintaining separate factoring lines. The trade-off is
              depth: a 1CC account executive may manage a trucking
              account next to a staffing-firm account, and
              trucking-specific instincts aren&rsquo;t always present.
            </p>

            <h3>Riviera Finance &mdash; trucking-specialty desk.</h3>
            <p className="ins-hero-sub">
              Riviera factors broadly but maintains a trucking-specialty
              desk that has been continuously operating since the 1970s.
              Account managers carry decades of context on broker
              payment cycles (the 30/45/60/90 patterns by broker
              category), IFTA timing and fuel-program intersection with
              factoring, and the specific dispute patterns that emerge
              when a broker rejects a load. For carriers whose factoring
              workflow is tightly coupled to operations, that
              specialization translates to fewer back-and-forth
              clarifications.
            </p>

            <h3>When breadth matters more than depth.</h3>
            <p className="ins-hero-sub">
              Single-vertical pure-trucking operators benefit from
              Riviera&rsquo;s depth. Diversified operators with material
              non-trucking revenue benefit from 1CC&rsquo;s breadth
              &mdash; one relationship across verticals beats parallel
              vertical-specific factoring relationships.
            </p>
          </div>
        </section>

        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">ABL graduation</span>
            <h2 className="ins-hero-title">
              The asset-based lending question.
            </h2>

            <h3>1st Commercial Credit ABL &mdash; the graduation path.</h3>
            <p className="ins-hero-sub">
              The clearest structural advantage 1CC holds over Riviera
              is asset-based lending. Past roughly $3&ndash;5M in annual
              revenue, ABL against receivables plus inventory plus
              equipment becomes cheaper than per-invoice factoring.
              1CC&rsquo;s in-house ABL means a factoring borrower can
              graduate with the same lender, same relationship team,
              and same collateral perfection &mdash; no new
              due-diligence cycle, no UCC-1 termination and re-filing,
              no operational disruption. For mid-fleets on a
              24&ndash;36 month growth plan, that continuity is real.
            </p>

            <h3>Riviera Finance ABL &mdash; limited.</h3>
            <p className="ins-hero-sub">
              Riviera&rsquo;s ABL offering is limited. Carriers that
              grow past the factoring threshold typically source ABL
              from a different lender &mdash; usually a regional bank
              &mdash; meaning a relationship transition at exactly the
              moment the borrower has least patience for it. Not unique
              to Riviera; most pure factoring shops have the same
              constraint. But a real structural difference vs 1CC.
            </p>

            <h3>When ABL graduation matters.</h3>
            <p className="ins-hero-sub">
              <strong>It matters if you&rsquo;re growing.</strong>{" "}
              Carriers planning to scale toward $5M+ annual revenue
              should pick the factor that carries an ABL product
              in-house; the alternative is a forced relationship
              transition mid-growth.{" "}
              <strong>
                It doesn&rsquo;t matter if you&rsquo;re stable.
              </strong>{" "}
              Carriers comfortably operating in the $1&ndash;3M revenue
              band with no plans to scale past the factoring-economics
              threshold can pick either factor on other dimensions; ABL
              availability is a non-issue.
            </p>
          </div>
        </section>

        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">Contract terms</span>
            <h2 className="ins-hero-title">
              Standard 12-month contracts, different exit experience.
            </h2>

            <h3>1st Commercial Credit contract terms.</h3>
            <p className="ins-hero-sub">
              1CC defaults to a 12-month auto-renewal with a cancellation
              window before each anniversary. Recourse and non-recourse
              both available, reserve release tied to broker payment
              clearance. Straightforward by mid-tier standards;
              operators report fewer exit-friction complaints than at
              larger roll-up factors. Cross-industry accounts sometimes
              have non-standard provisions tied to the diversified
              collateral pool &mdash; worth reading if you&rsquo;re
              factoring multiple revenue streams.
            </p>

            <h3>Riviera Finance contract terms.</h3>
            <p className="ins-hero-sub">
              Riviera defaults to a 12-month auto-renewal as well.
              Recourse is the default; non-recourse is priced as a
              premium product. Exit-friction complaints are rare,
              partly because the relationship-driven underwriting
              retains carriers longer, so fewer exits are attempted.
              Where Riviera differs is on contract amendment: a
              long-tenured carrier renegotiating mid-contract has more
              standing with Riviera&rsquo;s relationship model than
              with a transactional factor.
            </p>

            <h3>Exit and cancellation friction.</h3>
            <p className="ins-hero-sub">
              Neither factor has the industry&rsquo;s worst exit
              reputation &mdash; both default to standard 30-day-window
              cancellation and both honor written notice when delivered
              correctly. Riviera&rsquo;s review profile on exits is
              marginally cleaner; 1CC&rsquo;s is comparable.
            </p>
          </div>
        </section>

        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">Service and reviews</span>
            <h2 className="ins-hero-title">
              Service depth is the Riviera differentiator.
            </h2>

            <h3>1st Commercial Credit &mdash; transactional but functional.</h3>
            <p className="ins-hero-sub">
              1CC&rsquo;s customer-service reviews land in a respectable
              range &mdash; not best-in-class, not problematic. The
              model is transactional by design: account executives
              manage portfolios across industries, and the relationship
              operates at the functional-vendor level. For mid-fleets
              that want factoring as a financing utility, that&rsquo;s
              appropriate. Operators needing more hand-holding (new
              authorities, thin track records, first major broker
              dispute) sometimes find the service depth lighter than
              expected.
            </p>

            <h3>Riviera Finance &mdash; 55-year relationship model.</h3>
            <p className="ins-hero-sub">
              Riviera&rsquo;s service model is the inverse. Dedicated
              account managers carry trucking accounts for multi-year
              tenure, sometimes through multiple business cycles. Branch
              offices in core markets provide in-person relationship
              continuity. Carriers with 10+ year tenure routinely cite
              relationship managers by name, multi-decade payment-history
              context, and willingness to work through difficult periods
              (recession volume drops, broker insolvencies) without the
              immediate covenant-violation hammer. For carriers who
              think of their factor as a strategic partner, Riviera is
              the more aligned choice.
            </p>

            <h3>Winner: depends on what you want from a factor.</h3>
            <p className="ins-hero-sub">
              On pure service depth, Riviera. On rate-driven efficiency
              with adequate service, 1st Commercial Credit. The
              underlying decision is really about the role you want the
              factor to play: utility vendor or strategic partner.
            </p>
          </div>
        </section>

        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">Funding speed and tech</span>
            <h2 className="ins-hero-title">
              Both fund same-day. The gap is on tech stack depth.
            </h2>

            <h3>1st Commercial Credit funding and tech.</h3>
            <p className="ins-hero-sub">
              1CC funds verified invoices same-day under normal
              conditions. The platform is functional but not
              category-leading: BOL imaging, portal-based load
              submission, ACH disbursement. No instant-payment product
              in the Apex blynk&reg; tier. For steady-state weekday
              operations, same-day is enough. For weekend or holiday
              cash-flow timing, the lack of 24/7 instant funding is a
              real gap relative to owner-op-focused factors.
            </p>

            <h3>Riviera Finance funding and tech.</h3>
            <p className="ins-hero-sub">
              Riviera also funds same-day on verified invoices. Tech
              stack is comparable on funding mechanics &mdash; both run
              standard ACH rather than instant-payment rails &mdash;
              but lighter on integrations and broker-credit query
              tools. Riviera&rsquo;s legacy is relationship-driven
              workflow, not tech-driven workflow.
            </p>

            <h3>Winner by use case.</h3>
            <p className="ins-hero-sub">
              <strong>Same-day funding: both work.</strong>{" "}
              Funding-speed gap is negligible in normal operations.{" "}
              <strong>Tech-stack depth: neither is the answer.</strong>{" "}
              Tech-first factoring workflows are better served by
              eCapital or Truckstop Go.
            </p>
          </div>
        </section>

        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">Mid-tier fit</span>
            <h2 className="ins-hero-title">
              Who graduates into this tier, and from where.
            </h2>
            <p className="ins-hero-sub">
              The mid-tier slot is a real graduation destination.
              Carriers arrive from two directions: upward from
              owner-op-focused factors (Apex, OTR, TBS) when they scale
              past 5&ndash;10 trucks and want broader product depth or
              ABL graduation, and downward from enterprise factors
              (eCapital, Triumph) when they want simpler pricing without
              multi-product overhead.
            </p>

            <h3>From owner-op factors: graduating up.</h3>
            <p className="ins-hero-sub">
              A 6-truck fleet that started with Apex at the single-truck
              stage often finds Apex&rsquo;s owner-op-built product set
              starts to feel narrow as it scales &mdash; no ABL
              graduation, limited cross-industry capability,
              single-product focus. 1st Commercial Credit is the
              natural step up for growth-oriented fleets. Riviera is
              the natural step up for stable fleets that want deeper
              relationship continuity.
            </p>

            <h3>From enterprise factors: graduating sideways.</h3>
            <p className="ins-hero-sub">
              A 25-truck fleet tired of eCapital&rsquo;s multi-product
              overhead &mdash; account-executive churn, contract
              amendment complexity, pricing-tier opacity &mdash;
              sometimes moves down-market to mid-tier. 1CC is the
              choice for fleets that still want ABL alongside factoring.
              Riviera is the choice for fleets that want pure factoring
              with deep service.
            </p>
          </div>
        </section>

        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">Geographic reach</span>
            <h2 className="ins-hero-title">
              Cross-border vs U.S.-focused.
            </h2>

            <h3>1st Commercial Credit &mdash; tri-country footprint.</h3>
            <p className="ins-hero-sub">
              1CC factors carriers operating in the U.S., Canada, and
              Mexico. For cross-border freight, that footprint is a
              real structural advantage. Cross-border factoring carries
              additional operational complexity (currency conversion on
              advance and reserve, multi-jurisdictional UCC perfection,
              broker-credit underwriting across national payment cycles)
              that not every factor handles in-house. 1CC&rsquo;s
              tri-country reach is genuinely operational rather than
              aspirational.
            </p>

            <h3>Riviera Finance &mdash; U.S.-focused expertise.</h3>
            <p className="ins-hero-sub">
              Riviera is U.S.-focused. Cross-border carriers typically
              handle the cross-border leg through a different
              financing arrangement &mdash; the same relationship-split
              friction that ABL graduation creates. The trade-off is
              depth: 55+ years on U.S. broker payment cycles, IFTA
              timing, and regulatory environment translates to deeper
              U.S.-specific expertise.
            </p>

            <h3>When cross-border matters.</h3>
            <p className="ins-hero-sub">
              Run any cross-border freight regularly, 1CC is the
              structural choice. Purely U.S.: cross-border capability
              is irrelevant and shouldn&rsquo;t factor into the
              decision.
            </p>
          </div>
        </section>

        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">Profile match</span>
            <h2 className="ins-hero-title">
              Who should pick 1st Commercial Credit.
            </h2>
            <ul className="product-list">
              <li>
                <strong>Mid-fleets planning to scale past $5M
                annual.</strong> The in-house ABL graduation path is the
                structural advantage. A factor-then-ABL transition with
                the same lender removes the relationship-transition
                friction at the worst possible moment.
              </li>
              <li>
                <strong>Carriers shopping primarily on headline
                rate.</strong> The 1.5&ndash;3.5% range is meaningfully
                tighter than Riviera&rsquo;s 3&ndash;5%, and the
                100&ndash;150 basis point gap translates to real annual
                dollars at $200K+ monthly factored volume.
              </li>
              <li>
                <strong>Diversified operators with non-trucking revenue
                streams.</strong> The multi-industry underwriting
                platform makes a single relationship cover trucking
                alongside staffing, manufacturing, oilfield, or
                distribution &mdash; cleaner than parallel
                vertical-specific factoring relationships.
              </li>
              <li>
                <strong>Cross-border carriers (US/Canada/Mexico).</strong>{" "}
                The tri-country footprint is operational rather than
                aspirational. For carriers with material cross-border
                freight, this is the structural choice.
              </li>
              <li>
                <strong>Operators who want factoring as a financing
                utility.</strong> Functional service depth at competitive
                rate is what 1st Commercial Credit delivers; not deep
                relationship management, but enough.
              </li>
            </ul>
          </div>
        </section>

        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">Profile match</span>
            <h2 className="ins-hero-title">
              Who should pick Riviera Finance.
            </h2>
            <ul className="product-list">
              <li>
                <strong>Stable mid-fleets in the $1&ndash;3M revenue
                band.</strong> Carriers not planning to scale past the
                factoring-economics threshold benefit more from
                Riviera&rsquo;s service depth than from 1st Commercial
                Credit&rsquo;s ABL graduation path. The premium is worth
                it when service is the deliverable.
              </li>
              <li>
                <strong>Carriers who value relationship-driven service
                over rate.</strong> Dedicated account managers, multi-year
                tenure, in-person branch presence &mdash; Riviera&rsquo;s
                model is structurally different from transactional
                factors and delivers a different kind of value.
              </li>
              <li>
                <strong>Pure-U.S. trucking-specialty operators.</strong>{" "}
                55+ years of U.S. broker-payment-cycle expertise and
                continuous trucking-desk operation is real depth. For a
                pure-U.S. trucking operator, that specialization beats
                cross-industry breadth.
              </li>
              <li>
                <strong>Operators who&rsquo;ve been burned by factor
                acquisitions.</strong> Riviera has not been recapitalized
                into a multi-brand roll-up. Carriers who&rsquo;ve gone
                through eCapital&rsquo;s acquisition-driven service
                changes specifically value the institutional continuity.
              </li>
              <li>
                <strong>Carriers with broker-payment-dispute
                history.</strong> Riviera&rsquo;s long-tenure
                broker-credit underwriting on common counterparts can
                reduce dispute-related friction in ways that
                don&rsquo;t show up in the headline rate.
              </li>
            </ul>
          </div>
        </section>

        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">When neither fits</span>
            <h2 className="ins-hero-title">
              The other names on the panel.
            </h2>
            <p className="ins-hero-sub">
              1st Commercial Credit and Riviera Finance are both
              legitimate mid-tier factors, but they&rsquo;re not the only
              options on the Dispatched panel. A few specific cases
              route to different factors first:
            </p>

            <h3>
              Owner-operator with 1&ndash;4 trucks: Apex Capital or TBS.
            </h3>
            <p className="ins-hero-sub">
              Single-truck and small-fleet owner-operators benefit more
              from an owner-op-native factor than either 1st Commercial
              Credit or Riviera. Apex Capital&rsquo;s ~51&cent;/gal fuel
              discount and 24/7 blynk&reg; instant funding are
              specifically built for that profile. TBS is the leader for
              brand-new authorities with thin track records.
            </p>

            <h3>
              Enterprise-scale carrier wanting multi-product depth:
              eCapital or Triumph.
            </h3>
            <p className="ins-hero-sub">
              At 50+ trucks with material brokerage or
              freight-broker-financing needs alongside carrier factoring,
              the enterprise factors carry more product depth than
              either mid-tier option. eCapital&rsquo;s factoring-plus-ABL
              platform and Triumph&rsquo;s non-recourse-plus-revolver
              combination are both more capable at scale.
            </p>

            <h3>
              Pure spot factoring with no contract: OTR Capital.
            </h3>
            <p className="ins-hero-sub">
              Both 1st Commercial Credit and Riviera Finance default to
              12-month contracts with auto-renewal. Carriers who
              specifically want no-contract per-invoice factoring should
              look at OTR Capital instead.
            </p>

            <p className="ins-hero-sub">
              The full panel and the criteria we use to pick between
              them is in{" "}
              <Link href="/research/best-trucking-factoring-2026">
                best trucking factoring 2026
              </Link>
              . The methodology behind the rankings is in{" "}
              <Link href="/methodology">/methodology</Link>.
            </p>
          </div>
        </section>

        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">How Dispatched picks</span>
            <h2 className="ins-hero-title">
              You don&rsquo;t need to apply to both.
            </h2>
            <p className="ins-hero-sub">
              Both 1CC and Riviera are on Dispatched&rsquo;s panel, and
              both are legitimate. The question isn&rsquo;t whether
              either will fund you &mdash; in most cases, both will. The
              question is which fits the shape of your operation: how
              many trucks, growing toward the ABL threshold or
              stabilizing in mid-tier, purely U.S. or cross-border,
              multiple verticals or pure trucking, factoring as utility
              or as strategic partnership. Apply to both directly and
              you&rsquo;ll spend two weeks fielding sales calls and
              reverse-engineering effective rates from disclosure
              language that wasn&rsquo;t designed to be compared.
              That&rsquo;s why{" "}
              <Link href="/apply?useCase=factoring">
                /apply?useCase=factoring
              </Link>{" "}
              exists. One application, profile-aware match, no
              double-pull on your credit, no spam from the one
              that isn&rsquo;t the fit. To check fit first,{" "}
              <Link href="/qualify">/qualify</Link> takes 30 seconds
              and pulls no credit.
            </p>
          </div>
        </section>

        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">FAQ</span>
            <h2 className="ins-hero-title">
              1st Commercial Credit vs Riviera Finance &mdash; common
              questions.
            </h2>
            <dl className="product-faq">
              {faqs.map((qa) => (
                <div key={qa.q} className="product-faq-item">
                  <dt>{qa.q}</dt>
                  <dd>{qa.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section>
          <div className="ins-container">
            <h2 className="ins-hero-title">
              Stop guessing. Get matched to the right mid-tier factor.
            </h2>
            <p className="ins-hero-sub">
              One application, one profile-aware match, no spam from the
              one that isn&rsquo;t the fit.
            </p>
            <div className="product-hero-ctas">
              <Link
                href="/apply?useCase=factoring"
                className="btn btn--primary btn--lg"
              >
                Get matched with the right factor →
              </Link>
              <Link href="/qualify" className="btn btn--secondary btn--lg">
                Or check fit first (no credit pull) →
              </Link>
            </div>
          </div>
        </section>

        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">Related</span>
            <ul className="product-related">
              <li>
                <Link href="/invoice-factoring-for-truckers">
                  Invoice factoring for truckers →
                </Link>
              </li>
              <li>
                <Link href="/invoice-factoring-for-truckers/no-credit-check">
                  No credit check trucking factoring →
                </Link>
              </li>
              <li>
                <Link href="/research/best-trucking-factoring-2026">
                  Best trucking factoring 2026 →
                </Link>
              </li>
              <li>
                <Link href="/qualify">Two-question fit →</Link>
              </li>
              <li>
                <Link href="/methodology">How we describe rates →</Link>
              </li>
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
