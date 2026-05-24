import type { Metadata } from "next";
import Link from "next/link";
import EditorialByline from "@/components/landing/EditorialByline";
import Footer from "@/components/landing/Footer";
import Nav from "@/components/landing/Nav";
import {
  JsonLd,
  article,
  breadcrumbList,
  faqPage,
  financialProduct,
} from "@/components/seo/JsonLd";

/* /owner-operator-repair-loans — combo of /owner-operator-financing and
   /truck-repair-loans. The editorial center: one truck = total revenue
   stop while the repair runs, which is a different underwriting question
   than the small-fleet case both parent pages cover generically. */

export const metadata: Metadata = {
  title:
    "Owner-operator repair loans — same-day funds for the one-truck operation | Dispatched",
  description:
    "Repair financing built around how owner-operators actually run. Schedule C income fits. Sole-prop and LLC both fit. Underwriting accounts for revenue interruption while the truck is down. Same-banking-day funds.",
  alternates: { canonical: "/owner-operator-repair-loans" },
  openGraph: {
    title:
      "Owner-operator repair loans — same-day funds for the one-truck operation | Dispatched",
    description:
      "Repair financing built around how owner-operators actually run. Schedule C income fits. Sole-prop and LLC both fit. Underwriting accounts for revenue interruption while the truck is down. Same-banking-day funds.",
    url: "/owner-operator-repair-loans",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Owner-operator repair loans — same-day funds for the one-truck operation | Dispatched",
    description:
      "Repair financing built around how owner-operators actually run. Schedule C income fits. Sole-prop and LLC both fit. Underwriting accounts for revenue interruption while the truck is down. Same-banking-day funds.",
  },
};

const PAGE_URL = "https://dispatched.finance/owner-operator-repair-loans";

const faqs = [
  {
    q: "Can I get a repair loan as a sole proprietor with no LLC?",
    a: "Yes. Sole proprietorship is the default owner-operator structure on the panel. The application uses your SSN in place of an EIN. The financing is the same product class with the same APR ranges. The legal mechanics — the operator personally guaranteeing the financing — are automatic in a sole prop because the operation and the operator are the same legal entity.",
  },
  {
    q: "My income is all 1099 from one broker. Will that disqualify me?",
    a: "Single-broker operations do not disqualify, but they tend to price slightly higher to reflect concentration risk. Three or more brokers in the 90-day deposit history underwrites cleaner. If you are currently single-broker and planning to diversify, the diversification work is worth doing before applying for a larger repair amount — the rate improvement frequently more than covers a few weeks of slower load-booking.",
  },
  {
    q: "My Schedule C from last year showed a loss. Does that disqualify the loan?",
    a: "Not automatically. The Dispatched panel does not run the bank's two-year-tax-return DSCR test as the primary underwriting input. The bank statements, the deposit history, and the current operating run-rate weight more than the prior-year Schedule C. Operators who had a documented one-time event in the prior year — a major repair, a missed quarter for personal reasons, a startup ramp — routinely fund through this panel even with a prior-year loss.",
  },
  {
    q: "The truck isn't running. Does that block the application?",
    a: "No. The Dispatched workflow is built specifically for the case where the truck is at the shop, not running, and the operator needs the wire today. There is no roadworthiness or inspection requirement at application time. The lender funds the approved amount; the operator pays the shop; the truck moves.",
  },
  {
    q: "Can I bundle the repair plus operating-expense buffer into one loan?",
    a: "Yes, on request. The repair loan can be sized to include the shop estimate plus one to four weeks of operating expenses to absorb downtime. This is a common request on owner-operator applications because the one-truck economics make a thin margin during downtime untenable. The lender prices the larger loan accordingly — the additional buffer carries the same APR as the repair portion.",
  },
  {
    q: "Will this show up on my personal credit?",
    a: "The hard pull at the lender-selection step shows up as an inquiry. The funded loan itself, on a sole prop, may appear on the personal report depending on the lender's reporting practices — some report to commercial bureaus only, some report to both. LLC and S-corp operators with a personal guarantee may see the guarantee reported but not the balance. The lender's term sheet specifies how they report; you see it before signing.",
  },
  {
    q: "What if I'm leasing the truck rather than owning?",
    a: "Lease-purchase and lease-on operators are eligible. The financing is unsecured against the operation, not the truck, so ownership of the equipment is not a requirement. Lease-on operators driving for a carrier (where the carrier holds the authority) route through a slightly different lender subset that underwrites the lease structure; the product class and rate bands are the same.",
  },
  {
    q: "How long does the repair-loan application take?",
    a: "Two minutes to submit inside /apply. Soft approval and lender match typically come back within 20 minutes. Term sheets show APR, term, and total cost. The hard pull and funding step happen after the operator picks a lender. The wire lands the same banking day after the chosen lender countersigns, provided the wire instruction lands before that bank's cutoff.",
  },
];

export default function OwnerOperatorRepairLoansPage() {
  const today = new Date().toISOString().slice(0, 10);
  return (
    <div className="landing">
      <JsonLd
        payload={breadcrumbList([
          { name: "Home", url: "https://dispatched.finance/" },
          { name: "Owner-operator repair loans", url: PAGE_URL },
        ])}
      />
      <JsonLd
        payload={article({
          headline: "Owner-operator repair loans for the one-truck operation",
          description:
            "How owner-operator repair financing differs from small-fleet repair financing on the Dispatched panel: revenue-interruption underwriting, Schedule C acceptance, broker-concentration pricing, and the application-to-wire flow.",
          url: PAGE_URL,
          datePublished: today,
          dateModified: today,
        })}
      />
      <JsonLd
        payload={financialProduct({
          name: "Owner-operator truck repair financing",
          description:
            "Truck repair financing of $5K–$150K for one-truck owner-operators. Schedule C income fits; sole-prop and LLC both fit. Underwriting accounts for revenue interruption while the truck is down. Same-banking-day funds after sign-off.",
          url: PAGE_URL,
          category: "Commercial trucking financing",
        })}
      />
      <JsonLd payload={faqPage(faqs)} />

      <Nav />

      <main id="main-content" className="ins-page product-page">
        <section className="ins-hero product-hero">
          <div className="ins-container">
            <span className="ins-eyebrow">Owner-operator repair loans</span>
            <h1 className="ins-hero-title">
              Repair financing built around the one-truck economics.
            </h1>
            <EditorialByline updated={today} />
            <p className="ins-hero-sub">
              Most repair-loan products on the wider market are written for
              fleets where one truck going down is a small revenue dent.
              Owner-operator repair financing is a different underwriting
              question: the truck going down stops all the revenue. The
              Dispatched panel handles owner-op repair loans on a lender
              subset that prices this in — they look at the operator&rsquo;s
              deposit consistency, broker diversification, and equipment
              maintenance history rather than running a fleet-style DSCR test
              that an owner-op cannot pass during a downtime week.
            </p>
            <div className="product-hero-ctas">
              <Link
                href="/apply?useCase=repairs"
                className="btn btn--primary btn--lg"
              >
                See my funding options →
              </Link>
              <Link href="/qualify" className="btn btn--secondary btn--lg">
                Two-question fit (no credit pull)
              </Link>
            </div>
            <p className="product-hero-note">
              Sole-prop and LLC both fit. · Schedule C income underwrites.
            </p>
          </div>
        </section>

        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">The short answer</span>
            <h2 className="ins-hero-title">
              Same product class. Different underwriting question.
            </h2>
            <p className="ins-hero-sub">
              An owner-operator repair loan is the same product class as the
              broader{" "}
              <Link href="/truck-repair-loans">truck repair financing</Link> —
              short unsecured commercial term lending against working
              capital, $5K to $150K, soft-pull-first, same-banking-day wire
              after sign-off. The structural difference is the underwriting
              question.
            </p>
            <p className="ins-hero-sub">
              For a small fleet, one truck off the road is a partial revenue
              interruption — the other trucks still generate. The
              lender&rsquo;s underwriting model treats the operation as a
              continuing concern through the downtime. For an owner-operator,
              one truck off the road is a 100% revenue interruption for the
              duration of the repair. The lender&rsquo;s underwriting has to
              account for that: the repayment schedule has to absorb a
              downtime period that is part of the financing event.
            </p>
            <p className="ins-hero-sub">
              Trucking-friendly lenders on the panel handle this in two ways.
              First, they look at how the operation has historically absorbed
              downtime — operators with three or more brokers and a
              documented history of running through small repair
              interruptions underwrite cleaner than single-broker operators
              who have not yet faced a multi-day downtime. Second, they size
              the loan to include a downtime buffer on request — the operator
              can ask for the repair amount plus one to four weeks of
              operating expenses bundled, which keeps the monthly payment
              matched to revenue rather than to a thin margin.
            </p>
            <p className="ins-hero-sub">
              The{" "}
              <Link href="/glossary/owner-operator">Schedule C 1099 income</Link>{" "}
              picture is the default operator profile on this panel, not an
              exception. Operators sometimes worry that not having two years
              of W-2 income or a partnership return will disqualify them. It
              does not.
            </p>
          </div>
        </section>

        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">How owner-op underwriting differs</span>
            <h2 className="ins-hero-title">What the panel weighs.</h2>
            <ul className="product-list">
              <li>
                <strong>Schedule C or 1099 income — both fit.</strong>{" "}
                Sole-prop with a 1099 income stream and a Schedule C is the
                default profile, not an edge case. The bank&rsquo;s
                two-year-tax-return DSCR test is not how this panel
                underwrites.
              </li>
              <li>
                <strong>Single-truck operations get a downtime adjustment.</strong>{" "}
                The repayment schedule absorbs one to four weeks of
                zero-revenue downtime as part of the financing event. The
                lender does not pretend the operator will be hauling on the
                day the wire lands.
              </li>
              <li>
                <strong>Broker diversification matters more than for a fleet.</strong>{" "}
                Three or more brokers in the 90-day deposit history
                underwrites cleaner than one broker. Single-broker operations
                are not declined — they price slightly higher to reflect
                concentration risk.
              </li>
              <li>
                <strong>Equipment maintenance history is a real input.</strong>{" "}
                A documented daily <Link href="/glossary/dvir">DVIR</Link> log
                plus{" "}
                <Link href="/glossary/vehicle-telematics">vehicle telematics</Link>{" "}
                on the truck both reduce the lender&rsquo;s concern that
                today&rsquo;s breakdown is the first of many.
              </li>
              <li>
                <strong>Personal guarantee is the default.</strong>{" "}
                Owner-operator LLCs typically carry a personal guarantee on
                the repair loan. Sole proprietorships are functionally always
                guaranteed by the operator anyway because the operation and
                the operator are the same legal entity.
              </li>
              <li>
                <strong>The truck itself is not collateral.</strong> The
                repair loan is unsecured working capital underwritten against
                the operation&rsquo;s revenue. Existing financing on the
                tractor does not block the repair loan and the loan does not
                generate a UCC-1 filing.
              </li>
            </ul>
          </div>
        </section>

        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">Who qualifies</span>
            <h2 className="ins-hero-title">Owner-operator panel floors.</h2>
            <ul className="product-list">
              <li>
                <strong>Active DOT number</strong> in good standing with{" "}
                <Link href="/glossary/fmcsa">FMCSA</Link>.
              </li>
              <li>
                <strong>500+ FICO.</strong> Programs route from 500. Sub-580
                borrowers price higher; see{" "}
                <Link href="/bad-credit-truck-repair-financing">
                  bad credit truck repair financing
                </Link>{" "}
                for the sub-580-specific guidance.
              </li>
              <li>
                <strong>6+ months operating</strong> under the current
                authority. Under six months routes through new-authority
                financing instead — see{" "}
                <Link href="/new-authority-truck-financing">
                  /new-authority-truck-financing
                </Link>
                .
              </li>
              <li>
                <strong>Active business bank account</strong> with three
                months of statements available.
              </li>
              <li>
                <strong>Sole prop, LLC, or S-corp.</strong> All three
                organizational structures fit. The personal guarantee
                mechanics differ but the underwriting math is the same.
              </li>
              <li>
                <strong>One to three trucks.</strong> Above three, the
                operation is typically a small fleet rather than an owner-op
                for underwriting purposes; the same panel handles it but the
                lender mix shifts.
              </li>
            </ul>
          </div>
        </section>

        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">Documents</span>
            <h2 className="ins-hero-title">Standard repair-loan set.</h2>
            <p className="ins-hero-sub">
              Owner-operator applications routinely close with these and
              nothing else.
            </p>
            <ul className="product-list">
              <li>Last 3 months of business bank statements</li>
              <li>
                <Link href="/glossary/ein">EIN</Link> (LLC, S-corp) or SSN
                (sole prop)
              </li>
              <li>DOT number</li>
              <li>Driver&rsquo;s license</li>
              <li>Shop estimate or work order</li>
              <li>Schedule C or 1120 — loans over $75K</li>
              <li>
                90-day settlement statements — by lender request, common
                above $75K
              </li>
            </ul>
          </div>
        </section>

        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">Common scenarios</span>
            <h2 className="ins-hero-title">
              What owner-operators finance through this product.
            </h2>
            <ul className="product-list">
              <li>
                <strong>Engine work.</strong> Detroit DD13/DD15, Cummins X15,
                Paccar MX-13 — head gasket, EGR, after-treatment work.
                Typical financing band $15K to $60K.
              </li>
              <li>
                <strong>Transmission.</strong> Eaton manual, Eaton UltraShift,
                Detroit DT12, Allison automatic in box-truck applications.
                Typical band $10K to $35K.
              </li>
              <li>
                <strong>After-treatment.</strong> DEF system, DPF, SCR, NOx
                sensors. Smaller-ticket, $3K to $15K, but the truck is
                hard-derated and revenue is fully stopped.
              </li>
              <li>
                <strong>Accident repair.</strong> Body, frame, cab corner,
                hood. Often runs in parallel with an insurance claim; the
                financing covers the cash gap while the claim adjudicates.
              </li>
              <li>
                <strong>Reefer unit work.</strong> Thermo King and Carrier
                work, $5K to $40K. See also{" "}
                <Link href="/reefer-breakdown-coverage">
                  reefer breakdown coverage
                </Link>{" "}
                for the cargo-side of the same event.
              </li>
              <li>
                <strong>Drivetrain — axles, drivelines, suspension.</strong>{" "}
                Lower frequency, $5K to $25K typical.
              </li>
              <li>
                <strong>Cab and electrical.</strong> Wiring harness corrosion
                on higher-mileage tractors, HVAC, instrument cluster. $2K to
                $12K typical.
              </li>
            </ul>
          </div>
        </section>

        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">Composite scenario</span>
            <h2 className="ins-hero-title">
              What a single-truck X15 rebuild request looks like.
            </h2>
            <p className="ins-hero-sub">
              Composite illustrative scenario — not a specific borrower. See{" "}
              <Link href="/methodology#composite-scenarios">methodology</Link>.
            </p>
            <div className="product-example">
              <div className="product-example-meta">
                <span className="product-example-label">Operator</span>
                <span className="product-example-value">
                  Owner-op, single 2019 Peterbilt 579 with a Cummins X15,
                  three brokers, 3 years operating authority under an LLC.
                  642 FICO. Monthly revenue $28K average.
                </span>
              </div>
              <div className="product-example-meta">
                <span className="product-example-label">Situation</span>
                <span className="product-example-value">
                  Coolant in the oil, X15 confirmed in-frame rebuild needed.
                  Estimate $42,000 plus an additional $3,800 in associated
                  injector and head-gasket work. Truck expected to be down 8
                  to 10 days.
                </span>
              </div>
              <div className="product-example-meta">
                <span className="product-example-label">Match output</span>
                <span className="product-example-value">
                  $48,000 (rebuild + 2-week operating buffer) at 24% APR,
                  24-month term, $2,540 monthly. Funded same banking day
                  after sign-off.
                </span>
              </div>
              <div className="product-example-meta">
                <span className="product-example-label">Outcome</span>
                <span className="product-example-value mono">
                  Operator absorbs the downtime week without missing fuel
                  cards or insurance. First payment 30 days after the wire,
                  by which time the truck is back hauling.
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">FAQ</span>
            <h2 className="ins-hero-title">
              Questions on owner-operator repair loans.
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
            <h2 className="ins-hero-title">Built for the one-truck operation.</h2>
            <p className="ins-hero-sub">
              Schedule C fits. Sole-prop fits. The lender accounts for
              downtime. Soft-pull-first, same-banking-day wire after
              sign-off.
            </p>
            <div className="product-hero-ctas">
              <Link
                href="/apply?useCase=repairs"
                className="btn btn--primary btn--lg"
              >
                See my funding options →
              </Link>
              <Link href="/qualify" className="btn btn--secondary btn--lg">
                Or check my fit first (no credit pull) →
              </Link>
            </div>
          </div>
        </section>

        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">Related</span>
            <ul className="product-related">
              <li>
                <Link href="/owner-operator-financing">
                  Owner-operator financing →
                </Link>
              </li>
              <li>
                <Link href="/truck-repair-loans">Truck repair loans →</Link>
              </li>
              <li>
                <Link href="/bad-credit-truck-repair-financing">
                  Bad credit truck repair financing →
                </Link>
              </li>
              <li>
                <Link href="/factoring">Factoring →</Link>
              </li>
              <li>
                <Link href="/trucking-working-capital">
                  Trucking working capital →
                </Link>
              </li>
              <li>
                <Link href="/new-authority-truck-financing">
                  New authority truck financing →
                </Link>
              </li>
              <li>
                <Link href="/methodology">Methodology →</Link>
              </li>
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
