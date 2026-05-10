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
  title: "Apex Capital vs eCapital — Honest 2026 Comparison | Dispatched",
  description:
    "Apex vs eCapital: rates, contracts, funding speed, fuel programs, and customer reviews compared head-to-head. Which one fits owner-operators vs fleets in 2026?",
  alternates: { canonical: "/compare/apex-capital-vs-ecapital" },
  openGraph: {
    title: "Apex Capital vs eCapital — Honest 2026 Comparison | Dispatched",
    description:
      "Apex vs eCapital: rates, contracts, funding speed, fuel programs, and customer reviews compared head-to-head. Which one fits owner-operators vs fleets in 2026?",
    url: "/compare/apex-capital-vs-ecapital",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Apex Capital vs eCapital — Honest 2026 Comparison | Dispatched",
    description:
      "Apex vs eCapital: rates, contracts, funding speed, fuel programs, and customer reviews compared head-to-head. Which one fits owner-operators vs fleets in 2026?",
  },
};

const PAGE_URL = "https://dispatched.finance/compare/apex-capital-vs-ecapital";

const faqs = [
  {
    q: "Which is bigger, Apex or eCapital?",
    a: "eCapital. eCapital is the largest freight factoring company in North America, serving 30,000+ businesses across the US, Canada, and the UK. Apex serves a focused owner-operator and small-fleet base in the US, with 400+ employees and three decades in the market.",
  },
  {
    q: "Which has better rates, Apex or eCapital?",
    a: "Headline rates are similar (Apex 1–5%, eCapital 1.95–4.5%). Effective rates depend on your profile. Owner-operators with single-truck volume tend to get better effective rates from Apex due to volume-based fee structures favoring smaller operators. Mid-fleets (5+ trucks) sometimes negotiate better effective rates with eCapital.",
  },
  {
    q: "Which has faster funding?",
    a: "Apex's blynk® system funds in minutes, 24/7/365. eCapital's InstaPay typically funds within an hour during business hours. For weekend or holiday emergencies, Apex wins. For day-to-day funding, both are competitive.",
  },
  {
    q: "Which has better customer service?",
    a: "Reviews favor Apex strongly. Apex has 700+ 5-star reviews and won the BBB Torch Award for marketplace ethics. eCapital reviews are mixed — many positive (account managers praised by name), some complaints about fee transparency and contract exit difficulty.",
  },
  {
    q: "Which is better for bad credit or new authority?",
    a: "Both accept sub-580 FICO and new authority. Apex has a dedicated startup program for new operators with structured pre-approvals. eCapital's bad-credit programs work but are more rigid on minimum volume thresholds.",
  },
  {
    q: "Are the contract terms different?",
    a: "Both default to 12-month auto-renewal contracts. Apex is more transparent about the cancellation window. eCapital's exit terms vary by product line; some users report difficulty getting contracts terminated within the cancellation window.",
  },
  {
    q: "Should I just pick whichever has the lowest rate?",
    a: "No. Both companies advertise comparable rates; the difference is in fees, fuel programs, contract flexibility, and service quality. Two operators with identical volume can have meaningfully different total cost-of-factoring depending on which factor they pick. Match by use case, not by headline rate.",
  },
];

export default function ApexVsEcapitalPage() {
  const today = new Date().toISOString().slice(0, 10);
  return (
    <div className="landing">
      <JsonLd payload={breadcrumbList([
        { name: "Home", url: "https://dispatched.finance/" },
        { name: "Compare", url: "https://dispatched.finance/compare/apex-capital-vs-ecapital" },
        { name: "Apex vs eCapital", url: PAGE_URL },
      ])} />
      <JsonLd payload={article({
        headline: "Apex Capital vs eCapital — which trucking factor wins in 2026?",
        description:
          "Head-to-head comparison of Apex Capital and eCapital across rates, contract terms, funding speed, fuel programs, and customer service for 2026.",
        url: PAGE_URL,
        datePublished: today,
        dateModified: today,
      })} />
      <JsonLd payload={faqPage(faqs)} />

      <Nav />

      <main id="main-content" className="ins-page product-page">
        <section className="ins-hero product-hero">
          <div className="ins-container">
            <span className="ins-eyebrow">
              Dispatched · Updated May 2026 · Independent comparison
            </span>
            <h1 className="ins-hero-title">
              Apex Capital vs eCapital — which trucking factor wins in 2026?
            </h1>
            <p className="ins-hero-sub">
              Both are major freight factors with very different DNA.
              Apex is owner-operator native; eCapital is the largest
              factor in North America with deep fleet products.
              Here&rsquo;s the honest head-to-head.
            </p>
            <div className="product-hero-ctas">
              <Link href="/apply?useCase=factoring" className="btn btn--primary btn--lg">
                Get matched with the right factor →
              </Link>
              <Link href="/research/best-trucking-factoring-2026" className="btn btn--secondary btn--lg">
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
              Apex vs eCapital, in one paragraph.
            </h2>
            <p className="ins-hero-sub">
              Apex Capital and eCapital both sit on the Dispatched
              factoring panel, but they target different operators.
              Apex is the dominant choice for owner-operators and small
              fleets running 1&ndash;10 trucks: 30 years in the business,
              4.7+ average review score, the deepest fuel discount on
              the market (~51&cent;/gal), and a 24/7/365 instant funding
              product (blynk&reg;) that pays out in minutes. eCapital is
              the largest freight factor in North America, serving
              30,000+ businesses across financing, factoring, and
              asset-based lending. Where Apex is one product done well,
              eCapital is a multi-product platform that absorbs mid-
              fleets, brokers, and operators graduating into ABL.
              Effective rates are comparable; the real difference is
              fit. The rest of this page is the line-by-line comparison
              and a verdict by use case. If you&rsquo;d rather skip the
              read and have us match you to the right one based on your
              profile, that&rsquo;s what{" "}
              <Link href="/apply?useCase=factoring">
                /apply?useCase=factoring
              </Link>{" "}
              does in two minutes.
            </p>

            <table className="ins-carrier-table">
              <caption className="visually-hidden">
                Apex Capital vs eCapital — head-to-head comparison across
                key dimensions.
              </caption>
              <thead>
                <tr>
                  <th scope="col">Dimension</th>
                  <th scope="col">Apex Capital</th>
                  <th scope="col">eCapital</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="ins-carrier-name" data-label="Dimension">
                    <strong>Founded</strong>
                  </td>
                  <td data-label="Apex Capital">1995</td>
                  <td data-label="eCapital">2006</td>
                </tr>
                <tr>
                  <td className="ins-carrier-name" data-label="Dimension">
                    <strong>Best for</strong>
                  </td>
                  <td data-label="Apex Capital">Owner-operators, small fleets</td>
                  <td data-label="eCapital">Mid-fleets, brokers, asset-based</td>
                </tr>
                <tr>
                  <td className="ins-carrier-name" data-label="Dimension">
                    <strong>Headline rate</strong>
                  </td>
                  <td data-label="Apex Capital">1–5%</td>
                  <td data-label="eCapital">1.95–4.5%</td>
                </tr>
                <tr>
                  <td className="ins-carrier-name" data-label="Dimension">
                    <strong>Typical owner-op rate</strong>
                  </td>
                  <td data-label="Apex Capital">2.5–3.5%</td>
                  <td data-label="eCapital">3–4%</td>
                </tr>
                <tr>
                  <td className="ins-carrier-name" data-label="Dimension">
                    <strong>Contract</strong>
                  </td>
                  <td data-label="Apex Capital">12-month auto-renewal</td>
                  <td data-label="eCapital">Varies; auto-renewal common</td>
                </tr>
                <tr>
                  <td className="ins-carrier-name" data-label="Dimension">
                    <strong>Cancellation window</strong>
                  </td>
                  <td data-label="Apex Capital">30 days</td>
                  <td data-label="eCapital">30–90 days notice</td>
                </tr>
                <tr>
                  <td className="ins-carrier-name" data-label="Dimension">
                    <strong>Funding speed</strong>
                  </td>
                  <td data-label="Apex Capital">Minutes (blynk®)</td>
                  <td data-label="eCapital">1 hour (InstaPay)</td>
                </tr>
                <tr>
                  <td className="ins-carrier-name" data-label="Dimension">
                    <strong>Fuel discount</strong>
                  </td>
                  <td data-label="Apex Capital">~51¢/gal</td>
                  <td data-label="eCapital">~20¢/gal</td>
                </tr>
                <tr>
                  <td className="ins-carrier-name" data-label="Dimension">
                    <strong>Bad credit</strong>
                  </td>
                  <td data-label="Apex Capital">Yes</td>
                  <td data-label="eCapital">Yes (volume floors)</td>
                </tr>
                <tr>
                  <td className="ins-carrier-name" data-label="Dimension">
                    <strong>Customer reviews</strong>
                  </td>
                  <td data-label="Apex Capital">4.7+ avg, 700+ 5-star</td>
                  <td data-label="eCapital">Mixed (4.0–4.3)</td>
                </tr>
                <tr>
                  <td className="ins-carrier-name" data-label="Dimension">
                    <strong>Recourse / Non-recourse</strong>
                  </td>
                  <td data-label="Apex Capital">Both available</td>
                  <td data-label="eCapital">Both available</td>
                </tr>
                <tr>
                  <td className="ins-carrier-name" data-label="Dimension">
                    <strong>BBB / Awards</strong>
                  </td>
                  <td data-label="Apex Capital">A+, BBB Torch Award (2018)</td>
                  <td data-label="eCapital">A+, no marquee award</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">Background and scale</span>
            <h2 className="ins-hero-title">
              Two different companies, two different bets.
            </h2>

            <h3>Apex Capital — the owner-operator factor.</h3>
            <p className="ins-hero-sub">
              Apex Capital was founded in 1995 in Fort Worth, Texas and
              has stayed laser-focused on freight factoring for the same
              three decades. Roughly 400 employees, all U.S.-based, all
              specialized in trucking. The company was built around
              owner-operators &mdash; the segment most factors treat as
              an afterthought &mdash; and the product set reflects that
              focus: fuel cards, instant payouts, dispatch software,
              startup programs for new authorities. Apex doesn&rsquo;t
              cross-sell ABL, equipment loans, or healthcare receivables.
              They factor freight invoices for trucking companies. The
              concentration is the point. (See{" "}
              <a
                href="https://www.apexcapitalcorp.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                apexcapitalcorp.com
              </a>{" "}
              for company-stated details.)
            </p>

            <h3>eCapital &mdash; the multi-product giant.</h3>
            <p className="ins-hero-sub">
              eCapital was formed in 2006 and grew through aggressive
              acquisition into what it claims is the largest factoring
              company in North America. The platform absorbed
              Pavestone, FreightPath, Accutrac, Gateway Commercial
              Finance, and more. Today eCapital factors freight, but
              also offers asset-based lending, healthcare receivables,
              consumer financing, and freight broker financing across
              the U.S., Canada, and the U.K. The scale is real: 30,000+
              businesses funded, billions in advances annually. The
              trade-off is that freight is one of many product lines,
              not the only one. Mid-fleets and brokers benefit from
              that breadth (one provider for factoring + ABL + payroll).
              Single-truck owner-ops sometimes find the experience less
              tailored. (See{" "}
              <a
                href="https://ecapital.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                ecapital.com
              </a>{" "}
              for company-stated details.)
            </p>
          </div>
        </section>

        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">Rates compared</span>
            <h2 className="ins-hero-title">
              Headline rates are close. Effective rates aren&rsquo;t.
            </h2>

            <h3>Apex headline and effective rates.</h3>
            <p className="ins-hero-sub">
              Apex publishes a headline range of 1&ndash;5% per invoice.
              The 1% number is reserved for very high-volume fleets;
              owner-operators routinely land between 2.5% and 3.5%
              depending on broker mix, average invoice size, and recourse
              vs non-recourse election. Where Apex consistently wins on
              effective rate is the absence of common nickel-and-dime
              fees: most operators report no per-invoice processing fee
              on top of the discount, no monthly minimum penalties at
              the typical owner-op level, and predictable reserve
              releases. The 30&cent;-per-load handling fees that quietly
              push effective rates 30&ndash;60 basis points higher at
              other factors generally don&rsquo;t apply.
            </p>

            <h3>eCapital headline and effective rates.</h3>
            <p className="ins-hero-sub">
              eCapital publishes a headline range of 1.95&ndash;4.5%.
              Mid-fleets (5+ trucks, $200K+ monthly factored volume)
              quote toward the low end and sometimes negotiate inside it
              on whole-ledger contracts. Owner-ops typically land 3&ndash;
              4%. The fee structure is more layered than Apex&rsquo;s:
              wire fees, ACH fees, monthly minimums on certain product
              tiers, and credit-check fees per new broker can add 20&ndash;
              50 basis points to the effective rate. None of this is
              hidden &mdash; it&rsquo;s in the agreement &mdash; but
              operators who only compare headline numbers tend to
              under-budget the effective cost.
            </p>

            <h3>Winner by use case.</h3>
            <p className="ins-hero-sub">
              <strong>Owner-operators (1&ndash;4 trucks): Apex.</strong>{" "}
              Effective rates run 30&ndash;60 basis points lower for the
              single-truck profile, and the no-fee structure is more
              predictable for variable monthly volume.{" "}
              <strong>Mid-fleets (5+ trucks): eCapital.</strong>{" "}
              Volume-based negotiation can pull effective rates below
              Apex on whole-ledger contracts, and the multi-product
              relationship (factoring + ABL) creates pricing leverage
              Apex doesn&rsquo;t match. For a wider view of how factor
              pricing maps to operation size, see{" "}
              <Link href="/invoice-factoring-for-truckers">
                invoice factoring for truckers
              </Link>.
            </p>
          </div>
        </section>

        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">Contract terms</span>
            <h2 className="ins-hero-title">
              The contract is where the real money is decided.
            </h2>

            <h3>Apex contract terms.</h3>
            <p className="ins-hero-sub">
              Apex defaults to a 12-month auto-renewal contract with a
              30-day cancellation window before each renewal date. The
              cancellation mechanic is documented up front: written
              notice 30 days before the renewal anniversary terminates
              the relationship without penalty. Operators who miss the
              window get auto-renewed for another 12 months. There&rsquo;s
              no early-termination buyout clause for owner-op accounts
              in standard agreements; the 30-day window is the lever.
            </p>

            <h3>eCapital contract terms.</h3>
            <p className="ins-hero-sub">
              eCapital&rsquo;s contracts vary by product line and by
              which acquired entity is technically holding the paper.
              Most freight factoring agreements are 12-month auto-renewal,
              but cancellation windows range from 30 to 90 days
              depending on the specific contract. Some agreements include
              early-termination clauses tied to factored volume
              minimums &mdash; if you cancel before fulfilling the
              committed volume, a buyout fee applies. None of this is
              unusual for the industry, but the variance across eCapital
              product lines means the contract you sign matters more
              than the brochure.
            </p>

            <h3>Exit and cancellation friction.</h3>
            <p className="ins-hero-sub">
              The most common operator complaint about eCapital in
              public review platforms is exit friction: cancellation
              notices that get lost, renewal anniversaries that pass
              without confirmation, and Notice-of-Assignment reversal
              delays after termination. Apex&rsquo;s reviews on the same
              dimension are notably cleaner. <strong>Winner: Apex</strong>{" "}
              on contract clarity and exit experience. If you anticipate
              switching factors within 24 months, this matters more than
              the headline rate.
            </p>
          </div>
        </section>

        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">Funding speed and tech</span>
            <h2 className="ins-hero-title">
              How fast does the cash actually hit?
            </h2>

            <h3>Apex blynk® &mdash; minutes-level funding, 24/7/365.</h3>
            <p className="ins-hero-sub">
              Apex&rsquo;s blynk&reg; funding system is genuinely
              differentiated. Verified invoices submitted through the
              app fund in minutes, around the clock, including weekends
              and holidays. For a driver who delivers Friday at 6pm and
              needs fuel money before a Saturday morning departure, this
              is the product feature that ends the conversation.
              No business-hours dependency, no ACH cutoff, no &ldquo;next
              banking day.&rdquo; The infrastructure was built in-house
              and has been running at scale for several years.
            </p>

            <h3>eCapital InstaPay &mdash; 1-hour funding, business hours.</h3>
            <p className="ins-hero-sub">
              eCapital&rsquo;s InstaPay funds verified invoices within
              roughly an hour during business hours. That&rsquo;s
              competitive against the broader factoring market &mdash;
              most factors fund the next banking day at best &mdash; but
              it&rsquo;s a tier behind blynk&reg;. Submissions outside
              business hours wait for the next morning. For day-to-day
              steady-state funding, InstaPay is fine. For weekend
              emergencies, it isn&rsquo;t.
            </p>

            <h3>Winner by use case.</h3>
            <p className="ins-hero-sub">
              <strong>Apex on instant payouts.</strong> blynk&reg; is
              genuinely best-in-class for the owner-op profile that
              cares about Friday-night funding.{" "}
              <strong>eCapital on integrations and reporting.</strong>{" "}
              The eCapital portal exposes deeper analytics, multi-entity
              roll-ups, broker credit dashboards, and accounting
              integrations (QuickBooks, Sage, NetSuite) that are
              meaningful for fleets running back-office staff. A 4-truck
              owner-op doesn&rsquo;t need that. A 40-truck fleet does.
            </p>
          </div>
        </section>

        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">Fuel programs</span>
            <h2 className="ins-hero-title">
              Fuel discounts: where Apex genuinely wins.
            </h2>

            <h3>Apex fuel program.</h3>
            <p className="ins-hero-sub">
              Apex publishes an average fuel discount of approximately
              51&cent; per gallon across its accepted truck stop network,
              with a cumulative savings claim exceeding $1 billion since
              the program launched. The card works at TA, Petro,
              Pilot, Flying J, Loves, and the regional networks that
              owner-ops actually use. For a single truck running 10,000
              miles per month at 6.5 MPG, a 51&cent;/gal discount is
              roughly $785/month back &mdash; that alone can offset 50&ndash;
              80% of the factoring fee at typical revenue levels.
            </p>

            <h3>eCapital fuel program.</h3>
            <p className="ins-hero-sub">
              eCapital&rsquo;s fuel program advertises an average
              discount around 20&cent; per gallon across approximately
              16,000 locations including Pilot, Flying J, and TA Petro.
              That&rsquo;s a real discount &mdash; and the network is
              broad &mdash; but the per-gallon savings is materially
              less than Apex&rsquo;s. For the same 10,000-mile/month
              owner-op, that&rsquo;s closer to $310/month. A meaningful
              difference of about $475/month, before any other product
              consideration.
            </p>

            <h3>When fuel matters more than rate.</h3>
            <p className="ins-hero-sub">
              For high-mileage operators &mdash; long-haul OTR, team
              drivers, dedicated lanes &mdash; the fuel discount can
              outweigh a 25&ndash;50 basis point rate difference. Run the
              math: if the fuel program saves $475/month and the rate
              gap costs $200/month at typical owner-op volume,
              Apex&rsquo;s total cost-of-factoring is lower even if the
              headline rate is identical. This is the calculation most
              comparison content skips.
            </p>
          </div>
        </section>

        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">Service and reviews</span>
            <h2 className="ins-hero-title">
              Customer service is where the gap is widest.
            </h2>

            <h3>Apex &mdash; 700+ 5-star reviews and a Torch Award.</h3>
            <p className="ins-hero-sub">
              Apex carries 700+ five-star public reviews across
              Trustpilot, Google, and BBB, with an aggregate score above
              4.7. The company won the BBB Torch Award for Marketplace
              Ethics in 2018, an external endorsement that other factors
              don&rsquo;t hold. The structural feature that drives
              reviews: every account gets a dedicated account executive
              by name, with a direct phone number, and the executive
              survives the relationship. Operators don&rsquo;t bounce
              between call-center reps. That&rsquo;s the single change
              that most reliably explains the review delta.
            </p>

            <h3>eCapital &mdash; mixed reviews, 4.0&ndash;4.3 range.</h3>
            <p className="ins-hero-sub">
              eCapital&rsquo;s public reviews land in the 4.0&ndash;4.3
              band on Trustpilot, with a mix of strong and critical
              feedback. The positive reviews almost always name a
              specific account manager (which is consistent &mdash; the
              good account managers are great). The critical reviews
              cluster around two themes: fee transparency on contract
              addendums, and difficulty getting contracts terminated
              within the cancellation window. Neither of these is unique
              to eCapital, but the volume is higher than at Apex.
            </p>

            <h3>Winner: Apex, consistently.</h3>
            <p className="ins-hero-sub">
              On the customer-service dimension this isn&rsquo;t close.
              Apex&rsquo;s review profile, award credibility, and
              dedicated-account-exec model all stack the same direction.
              eCapital is fine for operators with strong back-office
              capacity who can self-advocate; Apex is the safer pick for
              operators who need their factor to act like a partner.
            </p>
          </div>
        </section>

        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">Bad credit and new authority</span>
            <h2 className="ins-hero-title">
              Both work. Apex is more flexible.
            </h2>

            <h3>Apex &mdash; structured startup program.</h3>
            <p className="ins-hero-sub">
              Apex runs a dedicated startup program for new authorities
              with structured pre-approvals: an operator can be
              pre-qualified before MC activation and start factoring
              from invoice one. Sub-580 FICO is approvable; prior
              bankruptcy isn&rsquo;t an automatic decline; minimum
              monthly volume is set low enough that single-truck
              owner-ops fit. This is the segment Apex was built for, and
              the underwriting reflects that.
            </p>

            <h3>eCapital &mdash; works, with volume floors.</h3>
            <p className="ins-hero-sub">
              eCapital factors operators with bad credit or new
              authority, but the programs are more rigid on minimum
              monthly volume thresholds. New authorities with under
              roughly $20K/month in projected factored volume sometimes
              don&rsquo;t clear underwriting. The product set is
              designed for operators with at least some operating
              history or fleet scale, not the day-one single-truck
              owner-op. For the broader category and what to expect
              when factoring with a thin or damaged file, see{" "}
              <Link href="/invoice-factoring-for-truckers/no-credit-check">
                no credit check trucking factoring
              </Link>.
            </p>
          </div>
        </section>

        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">Profile match</span>
            <h2 className="ins-hero-title">Who should pick Apex Capital.</h2>
            <ul className="product-list">
              <li>
                <strong>Owner-operators with 1&ndash;4 trucks.</strong>{" "}
                The product set, fee structure, and account-management
                model were built for this profile. Effective rates run
                30&ndash;60 basis points lower than eCapital at this
                scale.
              </li>
              <li>
                <strong>High-mileage operators.</strong> The ~51&cent;/gal
                fuel discount is the structural advantage. If you run
                8,000+ miles per month, the fuel savings alone can
                offset most of the factoring fee.
              </li>
              <li>
                <strong>Operators who need weekend funding.</strong>{" "}
                blynk&reg; pays in minutes, 24/7/365. If you deliver
                Friday night and need fuel by Saturday morning, this is
                the product.
              </li>
              <li>
                <strong>New authorities and bad-credit operators.</strong>{" "}
                The structured startup program clears underwriting paths
                that eCapital&rsquo;s volume thresholds don&rsquo;t.
              </li>
              <li>
                <strong>Operators who value contract clarity.</strong>{" "}
                The 30-day cancellation window is published, predictable,
                and consistently honored. Lower exit friction than
                eCapital across the review base.
              </li>
            </ul>
          </div>
        </section>

        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">Profile match</span>
            <h2 className="ins-hero-title">Who should pick eCapital.</h2>
            <ul className="product-list">
              <li>
                <strong>Mid-fleets (5+ trucks, $200K+ factored
                volume).</strong> Volume-based negotiation pulls
                effective rates below Apex on whole-ledger contracts.
                The pricing leverage gets real once you cross the
                threshold.
              </li>
              <li>
                <strong>Operators who want factoring + ABL under one
                roof.</strong> eCapital&rsquo;s asset-based lending
                product set is genuine and integrated with the factoring
                line. Apex doesn&rsquo;t offer ABL.
              </li>
              <li>
                <strong>Freight brokers.</strong> eCapital factors broker
                receivables specifically, with carrier-payment workflows
                built into the platform. Apex is carrier-only.
              </li>
              <li>
                <strong>Fleets with back-office staff.</strong> The
                eCapital portal&rsquo;s multi-entity reporting,
                accounting integrations, and broker credit dashboards
                meaningfully reduce admin time at fleet scale.
              </li>
              <li>
                <strong>Cross-border (US/Canada) operators.</strong>{" "}
                eCapital&rsquo;s footprint in Canada and the UK supports
                bilateral operations Apex doesn&rsquo;t cover.
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
              Apex and eCapital are the two biggest names operators
              ask about, but they&rsquo;re not the only options on the
              Dispatched panel. A few specific cases route to other
              factors first:
            </p>

            <h3>Small fleet wanting non-recourse + ABL: Triumph Financial.</h3>
            <p className="ins-hero-sub">
              Triumph (formerly Triumph Business Capital) is the
              specialist if you want true non-recourse factoring layered
              with an asset-based revolver. Mid-fleet pricing is
              competitive and the credit underwriting is conservative
              in a way that protects you on broker insolvency.
            </p>

            <h3>Brand-new authority, week one: TBS Factoring.</h3>
            <p className="ins-hero-sub">
              TBS is purpose-built for the new-authority segment. The
              startup program is the deepest in the industry &mdash;
              you can be approved before your MC is even active &mdash;
              and the per-load fee structure works for operators with
              irregular early-stage volume.
            </p>

            <h3>Pure spot factoring with no contract: OTR Capital.</h3>
            <p className="ins-hero-sub">
              OTR runs no-contract spot factoring with per-invoice
              pricing. Higher fees per load, but zero commitment, no
              auto-renewal, no whole-ledger requirement. For operators
              who want the cash-when-needed option without the
              relationship overhead, OTR is the cleanest fit.
            </p>

            <p className="ins-hero-sub">
              The full panel and the criteria we use to pick between
              them is in{" "}
              <Link href="/research/best-trucking-factoring-2026">
                best trucking factoring 2026
              </Link>. The methodology behind the rankings is in{" "}
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
              Apex Capital and eCapital are both on Dispatched&rsquo;s
              panel, and they&rsquo;re both legitimate factors. The
              question isn&rsquo;t whether either one will fund you
              &mdash; in most cases, both will. The question is which
              one fits the specific shape of your operation: how many
              trucks you run, how much you factor monthly, what your
              broker mix looks like, how much you spend on fuel, whether
              you want a 12-month commitment or spot flexibility, and
              whether you anticipate switching factors in the next 24
              months. Apply to both directly and you&rsquo;ll spend the
              next two weeks fielding sales calls from both, comparing
              term sheets in two different formats, and trying to
              reverse-engineer effective rates from disclosure language
              that wasn&rsquo;t designed to be compared. That&rsquo;s
              the reason{" "}
              <Link href="/apply?useCase=factoring">/apply?useCase=factoring</Link>{" "}
              exists. One application, profile-aware match to the right
              factor for your operation, no double-pull on your credit,
              and no spam from the one that isn&rsquo;t the fit. If you&rsquo;d
              rather check fit before going further, the two-question
              tool at <Link href="/qualify">/qualify</Link> takes about
              30 seconds and pulls no credit.
            </p>
          </div>
        </section>

        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">FAQ</span>
            <h2 className="ins-hero-title">
              Apex vs eCapital &mdash; common questions.
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
              Stop guessing. Get matched to the right factor.
            </h2>
            <p className="ins-hero-sub">
              One application, one profile-aware match, no spam from
              the one that isn&rsquo;t the fit.
            </p>
            <div className="product-hero-ctas">
              <Link href="/apply?useCase=factoring" className="btn btn--primary btn--lg">
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
              <li><Link href="/invoice-factoring-for-truckers">Invoice factoring for truckers →</Link></li>
              <li><Link href="/invoice-factoring-for-truckers/no-credit-check">No credit check trucking factoring →</Link></li>
              <li><Link href="/research/best-trucking-factoring-2026">Best trucking factoring 2026 →</Link></li>
              <li><Link href="/qualify">Two-question fit →</Link></li>
              <li><Link href="/methodology">How we describe rates →</Link></li>
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
