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
} from "@/components/seo/JsonLd";

/* /truck-repair-loans — the reference SEO landing.
   This file is the template for the second-wave product pages
   (/box-truck-financing, /bad-credit-truck-financing,
   /owner-operator-financing, /invoice-factoring-for-truckers,
   /new-authority-truck-financing, /equipment-financing,
   /trucking-working-capital, /semi-truck-financing).

   Per-section comment markers below ("// SECTION: ...") indicate the
   blocks each future page swaps when batched. Editorial discipline:
   no fabricated specifics (volumes, lender counts, median time-to-funds);
   ranges are observed panel ranges already documented at /methodology;
   examples are explicitly composite, never "real loans". */

export const metadata: Metadata = {
  title:
    "Truck repair loans for owner-operators and small fleets — Dispatched",
  description:
    "Truck repair financing routed to lenders that fund owner-operators. No collateral beyond the truck. Soft-pull match first; one hard pull only with the lender you pick. Wire same banking day after lender sign-off.",
  alternates: { canonical: "/truck-repair-loans" },
};

const PAGE_URL = "https://dispatched.finance/truck-repair-loans";

// SECTION: FAQ (also drives FAQPage JSON-LD)
const faqs = [
  {
    q: "Will a truck repair loan show up on my credit report?",
    a: "Not at the start. The Dispatched application is a soft-pull match — soft inquiries are not visible to other lenders and do not affect your credit score. A hard pull only happens after you pick a specific lender and move forward on their term sheet. Multiple hard pulls inside a 14-day rate-shopping window count as a single inquiry under standard credit-bureau policies.",
  },
  {
    q: "Can the lender pay my repair shop directly?",
    a: "Yes. Most truck-repair loans on our panel are issued direct-to-shop: the lender wires the funds to the shop after you've signed the term sheet and provided the repair quote and shop banking details. Some lenders will instead deposit funds in your business account and ask you to pay the shop. The disbursement method is set on the term sheet so you can see it before signing.",
  },
  {
    q: "What if the repair is over $50,000?",
    a: "Repairs over $50,000 are still financeable on our panel, but two of the three product fits become more relevant: an equipment loan secured by the truck you're repairing (longer payback, lower monthly payment) or a working-capital line if you have at least a year in business and meaningful monthly revenue. Use the truck repair calculator to see the fit for your specific amount and operator profile.",
  },
  {
    q: "Can I qualify with a 580 credit score?",
    a: "Yes. The lenders on our panel underwrite on revenue and equipment, not just credit. The marketing FAQ states the panel routes applications starting at a 500 FICO; below 580 expect rates on the higher end of the observed panel range and a tighter maximum. Above 680 you qualify for the full product set. APR ranges and the methodology behind them are documented at /methodology.",
  },
  {
    q: "How fast can the wire actually land?",
    a: "Same banking day after the chosen lender signs off, when the wire instruction lands before that bank's cutoff. Wires that miss the cutoff settle the next banking day; weekend and federal-holiday wires settle the next banking day. We do not publish a median time-to-funds figure until the data layer can derive it from real signed-application and ACH-settled funding events.",
  },
  {
    q: "What if my truck is on a lien?",
    a: "An existing lien doesn't disqualify the application. Truck repair loans on our panel are typically unsecured (paid back from operations), so the existing lien on the equipment is unaffected. If the fit estimator routes you to equipment financing because of the repair size, the new loan would be secured by the same truck — in that case the lender will work with the existing lienholder on the priority and the new loan structure is documented on the term sheet before any hard pull.",
  },
  {
    q: "What documents will I need to apply?",
    a: "The basics: last 3 months of business bank statements, your EIN or SSN, your DOT number, and a driver's license. For loans over $75K we'll also ask for your most recent Schedule C or 1120 and current settlement statements from your carrier or broker. No business plan, no tax-preparer letter, no IFTA printouts unless a specific lender requests them.",
  },
];

export default function TruckRepairLoansPage() {
  const today = new Date().toISOString().slice(0, 10);
  return (
    <div className="landing">
      <JsonLd
        payload={breadcrumbList([
          { name: "Home", url: "https://dispatched.finance/" },
          { name: "Truck repair loans", url: PAGE_URL },
        ])}
      />
      <JsonLd
        payload={article({
          headline:
            "Truck repair loans for owner-operators and small fleets",
          description:
            "How truck repair financing works on the Dispatched panel: soft-pull match, one hard pull only with the chosen lender, direct-to-shop disbursement, and what to expect from the application flow.",
          url: PAGE_URL,
          datePublished: today,
          dateModified: today,
        })}
      />
      <JsonLd
        payload={financialProduct({
          name: "Truck repair financing",
          description:
            "Direct-to-shop financing for commercial truck repairs, routed to a panel of trucking-friendly lenders that fund owner-operators and small fleets.",
          url: PAGE_URL,
          category: "BusinessLoan",
        })}
      />
      <JsonLd payload={faqPage(faqs)} />

      <Nav />

      <main id="main-content" className="ins-page product-page">
        {/* SECTION: HERO ============================================== */}
        <section className="ins-hero product-hero">
          <div className="ins-container">
            <span className="ins-eyebrow">Truck repair loans</span>
            <h1 className="ins-hero-title">
              Truck repair financing for owner-operators and small fleets.
            </h1>
            <p className="ins-hero-sub">
              When the truck is down, the wire can land same banking day
              after the chosen lender signs off. We match you with
              trucking-friendly lenders who fund repairs without the
              bank&rsquo;s two-year DSCR test. No collateral beyond the
              truck, no hard pull until you pick a lender.
            </p>
            <div className="product-hero-ctas">
              <Link
                href="/apply?useCase=repairs"
                className="btn btn--primary btn--lg"
              >
                See my funding options →
              </Link>
              <Link
                href="/calculators/truck-repair"
                className="btn btn--secondary btn--lg"
              >
                Try the calculator
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
            <h2 className="ins-hero-title">What a truck repair loan is.</h2>
            <p className="ins-hero-sub">
              A truck repair loan is short-term commercial financing for a
              specific truck repair — engine work, transmission, brakes,
              after-treatment systems, accident damage. The proceeds go to
              the repair shop (or to your business account, depending on
              the lender) and you pay the loan back over a fixed term.
              Term lengths on our panel typically run from 6 to 36 months
              depending on the loan size, your credit band, and the
              chosen lender&rsquo;s underwriting.
            </p>
            <p className="ins-hero-sub">
              Repair loans on our panel are usually unsecured commercial
              loans — the lender underwrites the operation&rsquo;s
              cashflow, not the equipment. That&rsquo;s the operational
              difference from equipment financing (where the truck itself
              is collateral). It&rsquo;s also the reason these loans fund
              quickly: there&rsquo;s no UCC filing, no title work, no
              equipment appraisal in the way of a wire.
            </p>
          </div>
        </section>

        {/* SECTION: ELIGIBILITY ====================================== */}
        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">Who qualifies</span>
            <h2 className="ins-hero-title">
              Eligibility floors on our panel.
            </h2>
            <ul className="product-list">
              <li>
                <strong>Active DOT number.</strong> The borrower&rsquo;s
                authority needs to be in good standing with FMCSA.
                Recently revoked or out-of-service authorities are routed
                to a smaller subset of lenders that specialize in
                rebuild-from-decline situations.
              </li>
              <li>
                <strong>500+ FICO.</strong> The marketing FAQ states the
                panel accepts applications starting at a 500 FICO.
                Borrowers under 580 should expect rates on the higher end
                of the observed panel range and a tighter maximum loan
                amount; 680+ unlocks the panel&rsquo;s full product set.
              </li>
              <li>
                <strong>6+ months of business history.</strong> Operators
                with under six months of operating history can still
                apply; the working-capital fit goes away and the
                repair-loan fit narrows. New-authority financing has its
                own panel routing.
              </li>
              <li>
                <strong>Active business bank account.</strong> The
                bank-account verification step is part of the
                application; lenders need three months of business
                statements and the account that will receive the wire.
              </li>
              <li>
                <strong>Schedule C or W-2 income — both fit.</strong>{" "}
                Sole-prop with a 1099 income stream and a Schedule C
                isn&rsquo;t a disqualifier on our panel; it&rsquo;s the
                default operator profile. The bank&rsquo;s
                two-year-tax-return DSCR test is not how this panel
                underwrites.
              </li>
            </ul>
          </div>
        </section>

        {/* SECTION: DOCUMENTS ======================================= */}
        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">Documents</span>
            <h2 className="ins-hero-title">What you&rsquo;ll need to apply.</h2>
            <p className="ins-hero-sub">
              The basics first; the additional documents are only asked
              for at higher loan sizes or by specific lender request.
            </p>
            <ul className="product-list">
              <li>
                <strong>Last 3 months of business bank statements.</strong>{" "}
                PDF exports from online banking work; we don&rsquo;t need
                originals.
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
                <strong>Driver&rsquo;s license.</strong> Photo or scan of
                the front of the license; used for identity verification
                only.
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
              We do not collect any of these documents until you reach
              the application step inside <Link href="/apply">/apply</Link>.
              The two-question fit at <Link href="/qualify">/qualify</Link>{" "}
              and the five-input estimator at{" "}
              <Link href="/calculators/truck-repair">
                /calculators/truck-repair
              </Link>{" "}
              don&rsquo;t collect any personal information.
            </p>
          </div>
        </section>

        {/* SECTION: COMPOSITE EXAMPLE =============================== */}
        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">Composite scenario</span>
            <h2 className="ins-hero-title">
              What a Dispatched-funded repair request looks like.
            </h2>
            <p className="ins-hero-sub">
              Composite illustrative scenario — not a specific borrower.
              Built from the kinds of repair requests our intake
              routinely sees. See{" "}
              <Link href="/methodology#composite-scenarios">
                methodology
              </Link>
              .
            </p>
            <div className="product-example">
              <div className="product-example-meta">
                <span className="product-example-label">Operator</span>
                <span className="product-example-value">
                  Owner-op, 1 truck, 2.5 years in business
                </span>
              </div>
              <div className="product-example-meta">
                <span className="product-example-label">Situation</span>
                <span className="product-example-value">
                  Engine rebuild on a 2019 Cascadia after a coolant
                  failure outside Amarillo. Estimate from the shop:
                  $50K–$75K range.
                </span>
              </div>
              <div className="product-example-meta">
                <span className="product-example-label">
                  Estimator output
                </span>
                <span className="product-example-value">
                  Best fit: <strong>Truck repair financing</strong>.
                  Direct-to-shop disbursement once the term sheet is
                  signed. Working capital also fits if the operator wants
                  to cover operating expenses while the truck is down.
                </span>
              </div>
              <div className="product-example-meta">
                <span className="product-example-label">APR band</span>
                <span className="product-example-value mono">
                  14% – 24% APR (observed panel range for this credit
                  tier; final APR is set by the chosen lender)
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
                business, DOT number, the truck, the repair amount, the
                shop. Soft-pull only.
              </li>
              <li>
                <strong>Soft-pull match.</strong> We route a redacted
                profile (no name or contact information) to the lenders
                most likely to fund the repair amount and operator
                profile.
              </li>
              <li>
                <strong>Offers.</strong> You see APR, term, and total
                cost on each term sheet, side by side, before any hard
                pull. No bait-and-switch.
              </li>
              <li>
                <strong>One hard pull.</strong> Only after you pick a
                specific lender and decide to move forward.
              </li>
              <li>
                <strong>Wire.</strong> Same banking day after the chosen
                lender signs off, when the wire instruction lands before
                the bank&rsquo;s cutoff. Direct-to-shop or
                direct-to-business, depending on the term sheet.
              </li>
            </ol>
          </div>
        </section>

        {/* SECTION: FAQ ============================================= */}
        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">FAQ</span>
            <h2 className="ins-hero-title">
              Questions we get on truck repair financing.
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
              Get the truck back on the road.
            </h2>
            <p className="ins-hero-sub">
              Soft-pull match first. One hard pull only with the lender
              you choose. Wire same banking day after sign-off.
            </p>
            <div className="product-hero-ctas">
              <Link
                href="/apply?useCase=repairs"
                className="btn btn--primary btn--lg"
              >
                See my funding options →
              </Link>
              <Link
                href="/calculators/truck-repair"
                className="btn btn--secondary btn--lg"
              >
                Or estimate your fit →
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
                <Link href="/owner-operator-financing">
                  Owner-operator financing →
                </Link>
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
                <Link href="/equipment-financing">Equipment financing →</Link>
              </li>
              <li>
                <Link href="/trucking-working-capital">
                  Trucking working capital →
                </Link>
              </li>
              <li>
                <Link href="/calculators/truck-repair">
                  Truck repair fit estimator →
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
              <li>
                <Link href="/disclosures">Disclosures →</Link>
              </li>
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
