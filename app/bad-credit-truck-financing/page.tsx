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

/* /bad-credit-truck-financing — second-wave SEO landing.
   Template parent: /truck-repair-loans (#44).

   Editorial frame: borrower-side framing for sub-580 credit. Same panel,
   different positioning. The trust pass discipline is especially
   important here: do not promise what we can't deliver, do not paper
   over the rate trade-off, do not pretend credit doesn't matter at all.
   The honest pitch is "the panel underwrites revenue and equipment too,
   not just credit" — which is true and is what differentiates the
   Dispatched panel from a bank. */

export const metadata: Metadata = {
  title:
    "Bad credit truck financing for owner-operators — Dispatched",
  description:
    "Truck financing options for borrowers with sub-580 credit. The panel underwrites revenue and equipment, not just FICO. Soft-pull match first; one hard pull only with the lender you pick.",
  alternates: { canonical: "/bad-credit-truck-financing" },
};

const PAGE_URL = "https://dispatched.finance/bad-credit-truck-financing";

const faqs = [
  {
    q: "What's the lowest credit score that can qualify on the Dispatched panel?",
    a: "The marketing FAQ states the panel routes applications starting at a 500 FICO. That's the floor. Below 580, the panel narrows considerably — fewer lenders see the application and the ones that do quote on the higher end of the observed APR range. Above 580 the panel widens. Above 680 you qualify for the full product set.",
  },
  {
    q: "What rates can someone with bad credit actually expect?",
    a: "The marketing FAQ documents two observed panel ranges: 14% – 34% APR for working capital and 9% – 18% APR for equipment loans secured by the truck. Sub-580 borrowers should expect rates at or near the top of those ranges, depending on revenue and time in business. These are observed panel ranges, not guarantees — see /methodology#finance-rates for how we describe the bands.",
  },
  {
    q: "Will I be denied because of past business decline marks on my report?",
    a: "Past decline marks don't automatically disqualify the application. The Dispatched application is a soft-pull match — soft inquiries are not visible to other lenders and don't compound on your file. We route to the lenders most likely to fund your specific operator profile, which avoids the bank pattern where each new application accelerates the next decline.",
  },
  {
    q: "What compensating factors help with sub-580 credit?",
    a: "Three signals carry meaningful weight on our panel: revenue stability (consistent monthly bank-statement deposits over 6+ months), time in business (12+ months opens up the working-capital and equipment-financing fit), and the equipment itself (a truck with a clean title in good operating condition is collateral for an equipment-secured loan). The panel underwrites all three, not just FICO.",
  },
  {
    q: "Will applying hurt my credit score?",
    a: "Not at the start. The Dispatched application is a soft-pull match. A hard pull only happens after you choose a specific lender and move forward on their term sheet. Multiple hard pulls inside a 14-day rate-shopping window count as a single inquiry under standard credit-bureau policies, so shopping rates among matched lenders during that window doesn't compound damage.",
  },
  {
    q: "Can I use a co-signer or business partner with better credit?",
    a: "Some lenders on the panel accept co-signers; some don't. If you list a co-borrower or a business partner on the application, the panel routing widens to the lenders that underwrite jointly. The co-signer or partner consents to a hard pull only at the same point you do — after a specific lender is chosen and the term sheet is signed.",
  },
  {
    q: "I had a recent bankruptcy. Am I eligible?",
    a: "A bankruptcy on file doesn't automatically disqualify the application, but it narrows the panel. The lenders that fund post-bankruptcy borrowers usually require a documented period since discharge (often 12-24 months), proof of subsequent business revenue, and an explanation of the circumstances. The application step asks about it directly so the file gets routed to the right subset of the panel.",
  },
];

export default function BadCreditTruckFinancingPage() {
  const today = new Date().toISOString().slice(0, 10);
  return (
    <div className="landing">
      <JsonLd
        payload={breadcrumbList([
          { name: "Home", url: "https://dispatched.finance/" },
          { name: "Bad credit truck financing", url: PAGE_URL },
        ])}
      />
      <JsonLd
        payload={article({
          headline:
            "Bad credit truck financing for owner-operators",
          description:
            "How sub-580-credit borrowers move on the Dispatched panel: which lenders fund them, what compensating factors matter, and what to expect from the application flow.",
          url: PAGE_URL,
          datePublished: today,
          dateModified: today,
        })}
      />
      <JsonLd
        payload={financialProduct({
          name: "Bad credit truck financing",
          description:
            "Commercial trucking loan options for borrowers with sub-580 credit, routed to a panel of trucking-friendly lenders that underwrite revenue and equipment in addition to FICO.",
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
            <span className="ins-eyebrow">Bad credit truck financing</span>
            <h1 className="ins-hero-title">
              Truck financing when your credit is the problem.
            </h1>
            <p className="ins-hero-sub">
              The lenders on our panel underwrite revenue and equipment,
              not just FICO. The marketing FAQ states the panel routes
              applications starting at a 500 FICO. Below 580 the panel
              narrows and rates land on the higher end — but the door
              isn&rsquo;t closed, and the bank&rsquo;s two-year DSCR test
              isn&rsquo;t how this panel decides.
            </p>
            <div className="product-hero-ctas">
              <Link
                href="/apply?useCase=other"
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
            <h2 className="ins-hero-title">
              How sub-580 borrowers move on this panel.
            </h2>
            <p className="ins-hero-sub">
              Bad-credit truck financing is the same panel, the same
              products, and the same application flow as any other
              borrower — what changes is which lenders see the file and
              what APR they quote. The lenders on our panel that fund
              sub-580 borrowers do so because the operation behind the
              credit score is healthy: consistent revenue, a track record,
              equipment that holds value.
            </p>
            <p className="ins-hero-sub">
              The honest version of the rate trade-off: a borrower at 540
              FICO with $40K in monthly revenue and 18 months of operating
              history will quote on the higher end of the observed
              14%–34% APR working-capital range. The same borrower with a
              680 FICO would quote in the middle. We don&rsquo;t hide
              that. We do route to the lenders that quote at all in that
              band, which is the part that&rsquo;s hard to do alone.
            </p>
          </div>
        </section>

        {/* SECTION: ELIGIBILITY ====================================== */}
        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">Who qualifies</span>
            <h2 className="ins-hero-title">
              What the panel needs to fund a sub-580 file.
            </h2>
            <ul className="product-list">
              <li>
                <strong>500+ FICO panel floor.</strong> Below 500 the
                panel does not have routing. At 500–579 a smaller subset
                of lenders sees the application; rates are at the high end
                and the maximum loan amount is tighter.
              </li>
              <li>
                <strong>6+ months of operating history.</strong> The
                shorter your history, the heavier credit weighs in
                underwriting. With 12+ months of consistent bank-statement
                revenue, the working-capital fit becomes available even
                for sub-580 borrowers.
              </li>
              <li>
                <strong>$10K+ monthly revenue (panel-level baseline).</strong>{" "}
                Below that, most panel lenders won&rsquo;t fund a
                commercial loan to any credit tier. Above $20K monthly
                revenue, panel routing widens.
              </li>
              <li>
                <strong>Active DOT number.</strong> The borrower&rsquo;s
                authority needs to be in good standing with FMCSA.
                Recently revoked or out-of-service authorities go to a
                smaller subset of lenders.
              </li>
              <li>
                <strong>Equipment with a clean title.</strong> For
                equipment-secured loans, the truck&rsquo;s title and
                operating condition matter more than credit. A clean
                title and a maintained truck unlock pricing the
                unsecured-credit-only path doesn&rsquo;t.
              </li>
            </ul>
          </div>
        </section>

        {/* SECTION: COMPENSATING FACTORS ============================ */}
        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">What helps</span>
            <h2 className="ins-hero-title">
              Compensating factors that move the rate.
            </h2>
            <ul className="product-list">
              <li>
                <strong>Consistent revenue (no skip months).</strong>{" "}
                Three months of bank statements showing stable deposits
                outweighs a single quarter of strong revenue followed by
                a slow stretch. Lenders read the pattern, not just the
                number.
              </li>
              <li>
                <strong>Time in business.</strong> Crossing 12 months
                opens working capital; crossing 36 months opens equipment
                financing on the better-priced tier. Both are moves
                you&rsquo;ll make once and benefit from for the next loan.
              </li>
              <li>
                <strong>Lower amount, shorter term.</strong> A $20K loan
                over 12 months is easier to underwrite for a sub-580
                borrower than a $80K loan over 36. Asking for what you
                actually need and choosing a shorter term tightens the
                rate.
              </li>
              <li>
                <strong>Co-signer with better credit.</strong> Some
                lenders on the panel accept a co-borrower with stronger
                credit, which routes the file to a wider lender set with
                lower-tier pricing.
              </li>
              <li>
                <strong>Equipment as collateral.</strong> For
                equipment-secured loans, the truck&rsquo;s value and
                clean title pull the rate down materially versus an
                unsecured working-capital line of the same amount.
              </li>
            </ul>
          </div>
        </section>

        {/* SECTION: COMPOSITE EXAMPLE =============================== */}
        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">Composite scenario</span>
            <h2 className="ins-hero-title">
              What a sub-580 application looks like on this panel.
            </h2>
            <p className="ins-hero-sub">
              Composite illustrative scenario — not a specific borrower.
              Built from the kinds of files our intake routinely sees in
              this credit band. See{" "}
              <Link href="/methodology#composite-scenarios">methodology</Link>.
            </p>
            <div className="product-example">
              <div className="product-example-meta">
                <span className="product-example-label">Operator</span>
                <span className="product-example-value">
                  Owner-operator, 1 truck, 22 months in business, FICO
                  ~545, $35K monthly revenue.
                </span>
              </div>
              <div className="product-example-meta">
                <span className="product-example-label">Situation</span>
                <span className="product-example-value">
                  Truck repair and a slow January. Bank declined. Looking
                  for $20K to bridge the gap and clear the repair invoice.
                </span>
              </div>
              <div className="product-example-meta">
                <span className="product-example-label">
                  Estimator output
                </span>
                <span className="product-example-value">
                  Best fit: <strong>Truck repair financing</strong> for
                  the invoice; working-capital line as alternative if the
                  borrower wants to cover both the repair and the slow
                  month from one product.
                </span>
              </div>
              <div className="product-example-meta">
                <span className="product-example-label">APR band</span>
                <span className="product-example-value mono">
                  ~26% – 34% APR (top of the observed panel range for this
                  credit tier; final APR set by the chosen lender)
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
                <Link href="/apply">/apply</Link>. We route on revenue,
                time in business, equipment, and credit — in that order.
                Soft-pull only.
              </li>
              <li>
                <strong>Soft-pull match.</strong> A redacted profile (no
                name or contact information) goes to the panel subset
                that funds your credit band.
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
              Questions sub-580 borrowers ask.
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
              Bad credit isn&rsquo;t a no on this panel.
            </h2>
            <p className="ins-hero-sub">
              Soft-pull match first. One hard pull only with the lender
              you choose. Wire same banking day after sign-off.
            </p>
            <div className="product-hero-ctas">
              <Link
                href="/apply?useCase=other"
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
                <Link href="/methodology#finance-rates">
                  How we describe APR ranges →
                </Link>
              </li>
              <li>
                <Link href="/qualify">
                  Two-question funding fit (no credit check) →
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
