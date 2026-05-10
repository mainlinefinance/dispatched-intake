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

/* /box-truck-financing — second-wave SEO landing.
   Template parent: /truck-repair-loans (#44). Section markers preserved
   ("// SECTION: HERO", etc.) so the swap surfaces are explicit.

   Editorial frame: box-truck operations are different from Class 8.
   Smaller loans on average ($15K-$75K typical), often last-mile /
   hot-shot / expediting work. The panel still funds the underlying
   credit and revenue, but the operator profile and equipment value
   differ from semi-truck financing. */

export const metadata: Metadata = {
  title:
    "Box truck financing for owner-operators and last-mile fleets — Dispatched",
  description:
    "Box truck loans for last-mile, hot-shot, and expediting operators. Soft-pull match first; one hard pull only with the lender you pick. We route to lenders that fund 1099 sole-prop and 6+ months of operating history.",
  alternates: { canonical: "/box-truck-financing" },
};

const PAGE_URL = "https://dispatched.finance/box-truck-financing";

const faqs = [
  {
    q: "Do I need a CDL to qualify for box truck financing?",
    a: "Not necessarily. Most box trucks under 26,001 lbs gross vehicle weight don't require a CDL to operate, and the lenders on our panel underwrite the operation, not the license class. If you're moving freight at-or-over CDL weight, you'll need either a CDL on file or a CDL-licensed driver on the payroll; that's an underwriting question on the application, not a panel-level disqualifier.",
  },
  {
    q: "What's the typical loan size for box truck financing?",
    a: "Box truck loans on our panel typically run smaller than Class 8 financing — most fall in the $15K to $75K range, depending on whether the loan covers a repair, a working-capital line, or an equipment purchase. Larger box-truck fleets and combined repair+equipment requests can go higher; the loan range overall is the same $25K to $250K shown elsewhere on the site.",
  },
  {
    q: "Can I finance a box truck without a DOT number?",
    a: "Operations under 10,001 lbs GVW running entirely intrastate may not require a USDOT number, and the panel still funds those operators — most often as a working-capital or equipment-secured loan rather than a traditional commercial freight loan. Operations over the FMCSA threshold need active authority in good standing; a recently revoked or out-of-service DOT routes the application to a smaller subset of lenders.",
  },
  {
    q: "I run for Amazon DSP / hot-shot. Does that qualify?",
    a: "Yes. Last-mile contracted operations (Amazon DSP, FedEx Ground, hot-shot, expediting) are the dominant box-truck operator profile our panel sees. The relevant signals are revenue stability (read from bank statements), the contract relationship (1099 income from a route or carrier), and credit. The lenders on our panel are familiar with this operator profile and don't underwrite it as an exception.",
  },
  {
    q: "Will a box truck loan show up on my credit report?",
    a: "Not at the start. The Dispatched application is a soft-pull match — soft inquiries are not visible to other lenders and do not affect your credit score. A hard pull only happens after you pick a specific lender and move forward on their term sheet. Multiple hard pulls inside a 14-day rate-shopping window count as a single inquiry under standard credit-bureau policies.",
  },
  {
    q: "What documents will I need?",
    a: "The basics: last 3 months of business bank statements, your EIN or SSN, your DOT number (if you have one), and a driver's license. For loans over $75K we'll also ask for your most recent Schedule C or 1120 and current settlement statements from your route partner or carrier. No business plan, no tax-preparer letter, no IFTA printouts unless a specific lender requests them.",
  },
  {
    q: "How fast can the wire actually land?",
    a: "Same banking day after the chosen lender signs off, when the wire instruction lands before that bank's cutoff. Wires that miss the cutoff settle the next banking day; weekend and federal-holiday wires settle the next banking day. We do not publish a median time-to-funds figure until the data layer can derive it from real signed-application and ACH-settled funding events.",
  },
];

export default function BoxTruckFinancingPage() {
  const today = new Date().toISOString().slice(0, 10);
  return (
    <div className="landing">
      <JsonLd
        payload={breadcrumbList([
          { name: "Home", url: "https://dispatched.finance/" },
          { name: "Box truck financing", url: PAGE_URL },
        ])}
      />
      <JsonLd
        payload={article({
          headline:
            "Box truck financing for owner-operators and last-mile fleets",
          description:
            "How box truck financing works on the Dispatched panel: who qualifies, how it differs from Class 8 financing, and what to expect from the application flow for last-mile, hot-shot, and expediting operators.",
          url: PAGE_URL,
          datePublished: today,
          dateModified: today,
        })}
      />
      <JsonLd
        payload={financialProduct({
          name: "Box truck financing",
          description:
            "Commercial financing for box truck operators — repair loans, working capital, and equipment loans routed to a panel of trucking-friendly lenders.",
          url: PAGE_URL,
          category: "BusinessLoan",
        })}
      />
      <JsonLd payload={faqPage(faqs)} />
      <JsonLd
        payload={financialService({
          name: "Box Truck Financing",
          // TODO(marketing): replace with copy from docs/seo/per-page-copy.md once landed
          description:
            "Commercial financing for box truck operators — last-mile, hot-shot, and expediting. Equipment loans, working capital, and repair financing routed to a panel of trucking-friendly lenders. Soft-pull match first.",
          url: PAGE_URL,
          serviceType: "Commercial trucking equipment financing",
        })}
      />

      <Nav />

      <main id="main-content" className="ins-page product-page">
        {/* SECTION: HERO ============================================== */}
        <section className="ins-hero product-hero">
          <div className="ins-container">
            <span className="ins-eyebrow">Box truck financing</span>
            <h1 className="ins-hero-title">
              Box truck financing for owner-operators and last-mile fleets.
            </h1>
            <p className="ins-hero-sub">
              Box-truck operations are not Class 8. Loan sizes are smaller,
              the equipment value is smaller, and the operator profile —
              last-mile, hot-shot, expediting, intrastate freight — is its
              own thing. We match you with lenders who underwrite this
              operator profile by default, not as an exception.
            </p>
            <div className="product-hero-ctas">
              <Link
                href="/apply?useCase=equipment"
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
            <span className="ins-eyebrow">The short answer</span>
            <h2 className="ins-hero-title">What box truck financing covers.</h2>
            <p className="ins-hero-sub">
              &ldquo;Box truck financing&rdquo; is shorthand for three
              distinct products on our panel — equipment financing for
              buying or upgrading the truck itself, working capital for
              fuel and operating expenses, and repair loans for keeping the
              truck running. Which one fits depends on what triggered the
              application: a truck purchase, an unexpected repair, or a
              cashflow gap during a slow lane.
            </p>
            <p className="ins-hero-sub">
              The defining difference from Class 8 financing isn&rsquo;t
              the loan structure — it&rsquo;s the underwriting fit. Many
              banks treat anything under a Class 8 tractor as a personal
              vehicle and decline accordingly. Our panel knows the
              difference between a personal Sprinter and a 26-foot box
              truck running an Amazon DSP route, and underwrites the
              operation behind the equipment.
            </p>
          </div>
        </section>

        {/* SECTION: ELIGIBILITY ====================================== */}
        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">Who qualifies</span>
            <h2 className="ins-hero-title">
              Eligibility floors for box-truck operators.
            </h2>
            <ul className="product-list">
              <li>
                <strong>500+ FICO.</strong> The marketing FAQ states the
                panel accepts applications starting at a 500 FICO. Below
                580, expect rates on the higher end of the observed panel
                range and a tighter maximum loan amount; 680+ unlocks the
                panel&rsquo;s full product set.
              </li>
              <li>
                <strong>6+ months of operating history.</strong> Includes
                contracted last-mile work (Amazon DSP, FedEx Ground,
                hot-shot, expediting) and freight-broker-sourced loads.
                New operators with under six months of history can still
                apply; panel routing narrows.
              </li>
              <li>
                <strong>Active DOT number when required.</strong>{" "}
                Operations over 10,001 lbs GVW running interstate need an
                active USDOT number in good standing. Intrastate
                under-10,001 lbs operations may not need one and route
                differently on the panel.
              </li>
              <li>
                <strong>1099 sole-prop fits the panel.</strong> Last-mile
                contractors are typically 1099 sole-prop with a Schedule
                C; that&rsquo;s the default operator profile on our
                panel, not an exception. The bank&rsquo;s
                two-year-tax-return DSCR test isn&rsquo;t how this panel
                underwrites.
              </li>
              <li>
                <strong>Active business bank account.</strong> The
                bank-account verification step is part of the application;
                lenders need three months of business statements and the
                account that will receive the wire.
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
                <strong>DOT number (if applicable).</strong> Used to
                confirm authority status with FMCSA. Sub-10,001 lbs
                intrastate operators may not have one; that&rsquo;s
                expected.
              </li>
              <li>
                <strong>Driver&rsquo;s license.</strong> Photo or scan,
                used for identity verification only.
              </li>
              <li>
                <strong>Schedule C or 1120 (loans over $75K).</strong>{" "}
                Most-recent year&rsquo;s tax return.
              </li>
              <li>
                <strong>
                  Settlement or 1099 statements (loans over $75K).
                </strong>{" "}
                For DSP / contracted last-mile applicants, the most recent
                income statements from the route partner or carrier.
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
              What a box-truck-funded request looks like.
            </h2>
            <p className="ins-hero-sub">
              Composite illustrative scenario — not a specific borrower.
              Built from the kinds of requests our intake routinely sees
              from last-mile and expediting operators. See{" "}
              <Link href="/methodology#composite-scenarios">methodology</Link>.
            </p>
            <div className="product-example">
              <div className="product-example-meta">
                <span className="product-example-label">Operator</span>
                <span className="product-example-value">
                  Owner-operator, 2 box trucks, 18 months running an
                  Amazon DSP route in the Dallas–Fort Worth metro.
                </span>
              </div>
              <div className="product-example-meta">
                <span className="product-example-label">Situation</span>
                <span className="product-example-value">
                  Adding a third truck to absorb route expansion. Used
                  2022 26-foot box truck, $42K purchase plus $3K in fit-out
                  for shelving and security.
                </span>
              </div>
              <div className="product-example-meta">
                <span className="product-example-label">
                  Estimator output
                </span>
                <span className="product-example-value">
                  Best fit: <strong>Equipment financing</strong>. Secured
                  by the new truck, longer payback, lower monthly payment
                  than a working-capital line of the same amount.
                </span>
              </div>
              <div className="product-example-meta">
                <span className="product-example-label">APR band</span>
                <span className="product-example-value mono">
                  9% – 18% APR (observed panel range for equipment
                  financing in this credit tier; final APR set by the
                  chosen lender)
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
                business, what you&rsquo;re financing, the truck.
                Soft-pull only.
              </li>
              <li>
                <strong>Soft-pull match.</strong> We route a redacted
                profile (no name or contact information) to the lenders
                most likely to fund the loan size and operator profile.
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
                the bank&rsquo;s cutoff. Direct-to-seller for equipment
                purchases; direct-to-business for working capital.
              </li>
            </ol>
          </div>
        </section>

        {/* SECTION: FAQ ============================================= */}
        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">FAQ</span>
            <h2 className="ins-hero-title">
              Questions box-truck operators ask.
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
              Buy the truck, fund the route, run the work.
            </h2>
            <p className="ins-hero-sub">
              Soft-pull match first. One hard pull only with the lender
              you choose. Wire same banking day after sign-off.
            </p>
            <div className="product-hero-ctas">
              <Link
                href="/apply?useCase=equipment"
                className="btn btn--primary btn--lg"
              >
                See my funding options →
              </Link>
              <Link href="/qualify" className="btn btn--secondary btn--lg">
                Or check my fit →
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
                <Link href="/truck-repair-loans">
                  Truck repair financing →
                </Link>
              </li>
              <li>
                <Link href="/owner-operator-financing">
                  Owner-operator financing →
                </Link>
              </li>
              <li>
                <Link href="/qualify">
                  Two-question funding fit (no credit check) →
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
