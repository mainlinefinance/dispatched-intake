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
  title:
    "Owner-operator financing — Dispatched",
  description:
    "Trucking finance for 1099 owner-operators: working capital, repair loans, equipment financing, and factoring. The panel underwrites Schedule C revenue, not the bank's two-year DSCR test. Soft-pull match first.",
  alternates: { canonical: "/owner-operator-financing" },
};

const PAGE_URL = "https://dispatched.finance/owner-operator-financing";

const faqs = [
  {
    q: "I'm a 1099 sole-prop with no W-2 history. Can I qualify?",
    a: "Yes. 1099 sole-prop with a Schedule C is the default operator profile on our panel — it isn't an exception, it's the norm. The lenders we route to don't run the bank's two-year-tax-return DSCR test. They underwrite ELD miles, settlement statements, and bank-statement deposits as the primary signals. If your wheels are turning, the revenue is real.",
  },
  {
    q: "Do I need to form an LLC to qualify?",
    a: "No. Sole-prop applications under your SSN are eligible across the panel. Forming an LLC is your call for liability and tax reasons; it doesn't change panel routing or APR. If you want to apply under a brand-new LLC EIN, the lenders will look at the operating history you ran under your SSN before the entity change — that history transfers to the application.",
  },
  {
    q: "Can I finance the truck I want to buy as my first one?",
    a: "Yes, but a first-truck purchase as a brand-new operator (zero operating history) routes to a much smaller subset of the panel — typically lenders that fund new-authority and first-truck operators with a heavier emphasis on credit and down payment. The fit estimator at /calculators/truck-repair handles repair scenarios; for purchase scenarios, the apply flow with useCase=equipment is the right path.",
  },
  {
    q: "What if I haven't filed taxes for the last business year yet?",
    a: "For loans under $75K the panel doesn't require the most-recent year's Schedule C. Bank statements over the last 3 months substitute for tax-return revenue verification at that loan size. Above $75K, lenders typically want the Schedule C; if you're between filings, the prior year's return plus current bank statements is generally accepted while the new return is in extension.",
  },
  {
    q: "How much can a 1-truck owner-operator typically borrow?",
    a: "The site's published range is $25K–$250K for the working-capital product. One-truck owner-ops most often land in the $25K–$100K band on our panel, depending on revenue and time in business. The working-capital range and methodology are at /methodology — for borrowers who qualify outside the published $25K–$250K band, separate products apply that aren't shown on the landing page.",
  },
  {
    q: "Will applying hurt my credit?",
    a: "Not at the start. The Dispatched application is a soft-pull match — soft inquiries are not visible to other lenders and do not affect your credit score. A hard pull only happens after you pick a specific lender and move forward on their term sheet. Multiple hard pulls inside a 14-day rate-shopping window count as a single inquiry under standard credit-bureau policies.",
  },
  {
    q: "What documents will I need?",
    a: "The basics: last 3 months of business bank statements, your EIN or SSN, your DOT number, and a driver's license. For loans over $75K we'll also ask for your most recent Schedule C or 1120 and current settlement statements from your carrier or broker. No business plan, no tax-preparer letter, no IFTA printouts unless a specific lender requests them.",
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
          // TODO(marketing): replace with copy from docs/seo/per-page-copy.md once landed
          description:
            "Commercial trucking financing for 1099 owner-operators — repair loans, working capital, equipment financing, and invoice factoring routed to a panel of lenders that underwrite sole-prop carriers as the default profile, not an exception.",
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
