import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/landing/Footer";
import Nav from "@/components/landing/Nav";
import {
  JsonLd,
  article,
  breadcrumbList,
  faqPage,
  financialProduct,
  financialService,
} from "@/components/seo/JsonLd";

/* /owner-operator-financing — second-wave SEO landing.
   Template parent: /truck-repair-loans (#44).

   Editorial frame: the broad owner-op vertical landing. Covers all four
   products (repair, working capital, equipment, factoring) from the
   1-truck owner-op perspective. The differentiator is "the panel
   underwrites 1099 sole-prop as the default operator profile, not as an
   exception." */

export const metadata: Metadata = {
  title: "Owner-operator financing — single truck up",
  description:
    "Financing built for owner-operators: working capital, equipment loans, repair loans. FICO from 500, soft-pull match, funds same banking day. Get matched.",
  alternates: { canonical: "/owner-operator-financing" },
  openGraph: {
    title: "Owner-operator financing — single truck up",
    description:
      "Financing built for owner-operators: working capital, equipment loans, repair loans. FICO from 500, soft-pull match, funds same banking day. Get matched.",
    url: "/owner-operator-financing",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Owner-operator financing — single truck up",
    description:
      "Financing built for owner-operators: working capital, equipment loans, repair loans. FICO from 500, soft-pull match, funds same banking day. Get matched.",
  },
};

const PAGE_URL = "https://dispatched.finance/owner-operator-financing";

const faqs = [
  {
    q: "What financing is available for owner-operators?",
    a: "The Dispatched panel covers four core products for owner-operators: working capital ($25K to $250K, 14% to 34% APR), equipment financing for tractors and trailers ($20K to $200K, 9% to 18% APR), repair loans ($5K to $150K, same banking day funding), and invoice factoring for receivables. One application routes to the right product based on the operator's situation.",
  },
  {
    q: "Can I get a loan as a sole proprietor with no LLC?",
    a: "Yes. Sole proprietors with an active DOT and MC number qualify on the Dispatched panel. Lenders underwrite the operator's business bank statements and Schedule C. LLCs and S-corps with two-plus years operating history typically see a slightly lower APR because the entity's books are easier to underwrite, but both structures fund.",
  },
  {
    q: "How much revenue do I need to qualify as an owner-operator?",
    a: "Most working-capital programs on the Dispatched panel require a minimum of $15K to $20K in monthly business deposits over the trailing three months. Equipment loans have no published revenue minimum because the asset is collateral; the lender sizes the loan to fit the operation's cashflow. Operators below the working-capital threshold should look at factoring or equipment-secured products first.",
  },
  {
    q: "Can a new MC authority owner-operator get financing?",
    a: "Yes, with caveats. Operators under 12 months of MC authority qualify for a narrower set of programs, primarily equipment-secured loans, and should expect a higher APR and a larger down payment requirement than seasoned operators. The Dispatched panel includes lenders who specifically underwrite new authorities.",
  },
  {
    q: "What documents do I need as an owner-operator?",
    a: "Three months of business bank statements, your EIN or SSN, DOT and MC number, and a driver's license. For loans above $75K the chosen lender also asks for the most recent Schedule C or 1120 and current settlement statements from your carrier or broker. No business plan, no tax preparer letter.",
  },
  {
    q: "How long does owner-operator financing take to fund?",
    a: "Soft approval and lender match typically come back within 20 minutes of submitting the application. Working capital and repair loans fund the same banking day after the chosen lender countersigns and the wire lands before cutoff. Equipment loans take 2 to 5 banking days because the lender has to verify the title and record the lien before funds release.",
  },
  {
    q: "Will applying as an owner-operator hurt my credit?",
    a: "Not at the start. The Dispatched application is a soft-pull match — soft inquiries are not visible to other lenders and do not affect your credit score. A hard pull only happens after you pick a specific lender and move forward on their term sheet.",
  },
];

export default function OwnerOperatorFinancingPage() {
  const today = new Date().toISOString().slice(0, 10);
  return (
    <div className="landing">
      <JsonLd
        payload={breadcrumbList([
          { name: "Home", url: "https://dispatched.finance/" },
          { name: "Owner-operator financing", url: PAGE_URL },
        ])}
      />
      <JsonLd
        payload={article({
          headline:
            "Owner-operator financing — repair loans, working capital, equipment, factoring",
          description:
            "Trucking finance for 1099 owner-operators across the four products on the Dispatched panel. The default operator profile, not an exception.",
          url: PAGE_URL,
          datePublished: today,
          dateModified: today,
        })}
      />
      <JsonLd
        payload={financialProduct({
          name: "Owner-operator financing",
          description:
            "Commercial trucking financing routed to a panel of lenders that fund 1099 sole-prop owner-operators — working capital, repair loans, equipment financing, and factoring.",
          url: PAGE_URL,
          category: "BusinessLoan",
        })}
      />
      <JsonLd payload={faqPage(faqs)} />
      <JsonLd
        payload={financialService({
          name: "Owner-Operator Financing",
          description:
            "Financing built for owner-operators: working capital, equipment loans, repair loans, and factoring. FICO from 500, soft-pull match, funds same banking day on approval.",
          url: PAGE_URL,
          serviceType: "Commercial trucking financing",
        })}
      />

      <Nav />

      <main id="main-content" className="ins-page product-page">
        {/* SECTION: HERO ============================================== */}
        <section className="ins-hero product-hero">
          <div className="ins-container">
            <span className="ins-eyebrow">Owner-operator financing</span>
            <h1 className="ins-hero-title">
              Capital for the operator behind the truck.
            </h1>
            <p className="ins-hero-sub">
              1099 sole-prop is the default profile on our panel, not the
              exception. The lenders we route to underwrite ELD miles and
              settlement statements, not the bank&rsquo;s two-year DSCR
              test. Whether the truck is down, the route is slow, or
              you&rsquo;re buying number two — the application flow is the
              same.
            </p>
            <div className="product-hero-ctas">
              <Link
                href="/apply?vertical=owner-operator"
                className="btn btn--primary btn--lg"
              >
                See my funding options →
              </Link>
              <Link href="/qualify" className="btn btn--secondary btn--lg">
                Two-question fit (no credit pull)
              </Link>
            </div>
            <p className="product-hero-note">
              No hard credit pull to start. · Takes about 2 minutes.
            </p>
          </div>
        </section>

        {/* SECTION: SHORT ANSWER ===================================== */}
        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">The four products</span>
            <h2 className="ins-hero-title">What an owner-operator can finance.</h2>
            <p className="ins-hero-sub">
              The Dispatched panel funds four product categories for
              owner-operators. Most one-truck operators end up using two
              or three of them across a year — the truck breaks down once,
              there&rsquo;s a slow month, the trailer needs replacing.
            </p>
            <ul className="product-list">
              <li>
                <strong>Truck repair financing.</strong> Direct-to-shop
                loan for a specific repair amount. Term lengths typically
                6–36 months. <Link href="/truck-repair-loans">Details</Link>.
              </li>
              <li>
                <strong>Working capital.</strong> $25K–$250K line for fuel,
                payroll, tolls, insurance, and bridging slow months.
                Repaid from receivables.
              </li>
              <li>
                <strong>Equipment financing.</strong> Secured by the truck
                or trailer being purchased or upgraded. Longer payback,
                lower monthly payment.
              </li>
              <li>
                <strong>Invoice factoring.</strong> Cash advance against
                outstanding invoices from your carrier or broker. Settles
                in days, not weeks. Different cost structure from a loan.
              </li>
            </ul>
          </div>
        </section>

        {/* SECTION: ELIGIBILITY ====================================== */}
        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">Who qualifies</span>
            <h2 className="ins-hero-title">
              Eligibility floors for owner-operators.
            </h2>
            <ul className="product-list">
              <li>
                <strong>500+ FICO panel floor.</strong> Below 580, expect
                rates on the higher end of the observed panel range and a
                tighter maximum loan amount; 680+ unlocks the panel&rsquo;s
                full product set.
              </li>
              <li>
                <strong>6+ months of operating history.</strong> Drivers
                with under six months under their own authority can still
                apply; the working-capital fit goes away and the
                repair-loan fit narrows. New-authority financing has its
                own panel routing.
              </li>
              <li>
                <strong>Active DOT number.</strong> The driver&rsquo;s
                authority needs to be in good standing with FMCSA.
                Recently revoked or out-of-service authorities go to a
                smaller subset of lenders.
              </li>
              <li>
                <strong>Active business bank account.</strong> Lenders
                need three months of business statements and the account
                that will receive the wire. Personal-bank-account-only
                operators should set up a business account before
                applying.
              </li>
              <li>
                <strong>1099 sole-prop or LLC, both fit.</strong> No W-2
                requirement. No two-year-tax-return requirement under
                $75K. Schedule C with $40K+ monthly revenue is a profile
                the panel underwrites every day.
              </li>
            </ul>
          </div>
        </section>

        {/* SECTION: DOCUMENTS ======================================= */}
        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">Documents</span>
            <h2 className="ins-hero-title">What you&rsquo;ll need to apply.</h2>
            <ul className="product-list">
              <li>
                <strong>Last 3 months of business bank statements.</strong>{" "}
                PDF exports from online banking work.
              </li>
              <li>
                <strong>EIN or SSN.</strong> Sole-prop applications use
                SSN; LLCs and corporations use the EIN on file with the
                IRS.
              </li>
              <li>
                <strong>DOT number.</strong> Used to confirm authority
                status and operating history with FMCSA.
              </li>
              <li>
                <strong>Driver&rsquo;s license.</strong> Photo or scan,
                used for identity verification only.
              </li>
              <li>
                <strong>Schedule C or 1120 (loans over $75K).</strong>{" "}
                Most-recent year&rsquo;s tax return for the operating
                entity.
              </li>
              <li>
                <strong>
                  Settlement statements (loans over $75K, by lender request).
                </strong>{" "}
                Current statements from your carrier or broker, used to
                corroborate revenue against the bank statements.
              </li>
            </ul>
            <p className="ins-compliance-note">
              We don&rsquo;t collect any of these documents until you
              reach the application step inside{" "}
              <Link href="/apply">/apply</Link>. The two-question fit at{" "}
              <Link href="/qualify">/qualify</Link> doesn&rsquo;t collect
              any personal information.
            </p>
          </div>
        </section>

        {/* SECTION: COMPOSITE EXAMPLE =============================== */}
        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">Composite scenario</span>
            <h2 className="ins-hero-title">
              What an owner-operator funded request looks like.
            </h2>
            <p className="ins-hero-sub">
              Composite illustrative scenario — not a specific borrower.
              Built from the kinds of requests our intake routinely sees
              from one-truck owner-operators. See{" "}
              <Link href="/methodology#composite-scenarios">methodology</Link>.
            </p>
            <div className="product-example">
              <div className="product-example-meta">
                <span className="product-example-label">Operator</span>
                <span className="product-example-value">
                  Owner-operator, 1 Class 8 tractor, 4 years under own
                  authority, primarily Texas–Midwest van freight, 660 FICO,
                  $55K monthly revenue.
                </span>
              </div>
              <div className="product-example-meta">
                <span className="product-example-label">Situation</span>
                <span className="product-example-value">
                  Slow January between dedicated lanes. Looking for a
                  $40K working-capital line to cover fuel and a truck
                  payment while February freight builds.
                </span>
              </div>
              <div className="product-example-meta">
                <span className="product-example-label">
                  Estimator output
                </span>
                <span className="product-example-value">
                  Best fit: <strong>Working capital</strong>. Operator has
                  more than two years of history and consistent revenue.
                  Factoring also fits if there are outstanding invoices to
                  draw against.
                </span>
              </div>
              <div className="product-example-meta">
                <span className="product-example-label">APR band</span>
                <span className="product-example-value mono">
                  18% – 28% APR (observed panel range for working capital
                  in this credit tier; final APR set by the chosen lender)
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: PROCESS ========================================= */}
        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">How the money moves</span>
            <h2 className="ins-hero-title">From application to wire.</h2>
            <ol className="product-process">
              <li>
                <strong>Application.</strong> Two minutes inside{" "}
                <Link href="/apply">/apply</Link>. Revenue, time in
                business, DOT number, what you&rsquo;re financing.
                Soft-pull only.
              </li>
              <li>
                <strong>Soft-pull match.</strong> A redacted profile (no
                name or contact information) goes to the lenders most
                likely to fund your operator profile and product.
              </li>
              <li>
                <strong>Offers.</strong> APR, term, total cost on each
                term sheet, side by side, before any hard pull.
              </li>
              <li>
                <strong>One hard pull.</strong> Only after you pick a
                specific lender and decide to move forward.
              </li>
              <li>
                <strong>Wire.</strong> Same banking day after the chosen
                lender signs off, when the wire instruction lands before
                the bank&rsquo;s cutoff.
              </li>
            </ol>
          </div>
        </section>

        {/* SECTION: FAQ ============================================= */}
        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">FAQ</span>
            <h2 className="ins-hero-title">
              Questions one-truck owner-operators ask.
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

        {/* SECTION: FINAL CTA ======================================= */}
        <section className="ins-sunken">
          <div className="ins-container">
            <h2 className="ins-hero-title">
              Owner-operator is the default profile.
            </h2>
            <p className="ins-hero-sub">
              Soft-pull match first. One hard pull only with the lender
              you choose. Wire same banking day after sign-off.
            </p>
            <div className="product-hero-ctas">
              <Link
                href="/apply?vertical=owner-operator"
                className="btn btn--primary btn--lg"
              >
                See my funding options →
              </Link>
              <Link href="/qualify" className="btn btn--secondary btn--lg">
                Or check my fit first →
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION: RELATED ========================================= */}
        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">Related</span>
            <ul className="product-related">
              <li>
                <Link href="/truck-repair-loans">Truck repair loans →</Link>
              </li>
              <li>
                <Link href="/box-truck-financing">Box truck financing →</Link>
              </li>
              <li>
                <Link href="/bad-credit-truck-financing">
                  Bad credit truck financing →
                </Link>
              </li>
              <li>
                <Link href="/calculators/truck-repair">
                  Truck repair fit estimator →
                </Link>
              </li>
              <li>
                <Link href="/methodology">
                  How we describe APR ranges →
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
