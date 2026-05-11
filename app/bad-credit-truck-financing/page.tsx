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
  title: "Bad credit truck financing — FICO 500+ | Dispatched",
  description:
    "Truck financing for sub-650 FICO. Programs route from 500. Equipment loans, working capital, repair loans. Soft-pull match. Apply or call (307) 317-0801.",
  alternates: { canonical: "/bad-credit-truck-financing" },
  openGraph: {
    title: "Bad credit truck financing — FICO 500+ | Dispatched",
    description:
      "Truck financing for sub-650 FICO. Programs route from 500. Equipment loans, working capital, repair loans. Soft-pull match. Apply or call (307) 317-0801.",
    url: "/bad-credit-truck-financing",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bad credit truck financing — FICO 500+ | Dispatched",
    description:
      "Truck financing for sub-650 FICO. Programs route from 500. Equipment loans, working capital, repair loans. Soft-pull match. Apply or call (307) 317-0801.",
  },
};

const PAGE_URL = "https://dispatched.finance/bad-credit-truck-financing";

const faqs = [
  {
    q: "Can I get truck financing with a 500 credit score?",
    a: "Yes. Programs on the Dispatched panel route from a 500 FICO. Most banks decline below 650 because they underwrite on credit alone; the Dispatched panel underwrites on revenue, debt service coverage, equipment value, and deposit history first, with FICO second. Sub-580 borrowers should expect a higher APR and tighter loan amounts, but approval is realistic.",
  },
  {
    q: "What APR will I pay with bad credit?",
    a: "Expect rates toward the high end of the published panel ranges. For working capital, that is the 28% to 34% APR end of the 14% to 34% range. For equipment-secured loans, that is the 14% to 18% APR end of the 9% to 18% range. The exact APR depends on revenue, time in business, equipment age, and down payment. The term sheet shows the exact rate before you sign.",
  },
  {
    q: "Why does Dispatched approve sub-650 borrowers when banks decline them?",
    a: "Banks underwrite on FICO and personal financial statements. The Dispatched panel underwrites on the operation's bank deposits, equipment value, and time in business — credit is a secondary signal. A trucker pulling $30K a month in deposits with a 580 FICO is a different risk than the FICO alone suggests, and the panel's lenders price for that distinction.",
  },
  {
    q: "What documents do I need for bad credit truck financing?",
    a: "Three months of business bank statements, your EIN or SSN, DOT and MC number, and a driver's license. For equipment loans, also include a copy of the title or dealer purchase order. The bank statements are the central document — they tell the lender what the operation actually moves through deposits, which is the underwriting signal that matters most for sub-650 applications.",
  },
  {
    q: "Will applying with bad credit hurt my score further?",
    a: "Not at the start. The Dispatched application is a soft-pull match — soft inquiries are not visible to other lenders and do not affect your score. A hard pull only happens after you pick a specific lender and move forward on their term sheet. If you compare offers, hard pulls inside a 14-day rate-shopping window count as one inquiry on most scoring models.",
  },
  {
    q: "Is there a minimum FICO to apply?",
    a: "500. Below 500, the Dispatched panel does not currently have a program that funds. Operators below 500 should focus on rebuilding the score (paying down revolving balances, settling charge-offs) before reapplying. Active Chapter 13 plans are reviewed case-by-case; active Chapter 7 cases inside the 12-month post-discharge window are typically declined across the panel.",
  },
  {
    q: "Can I refinance an existing high-rate truck loan with bad credit?",
    a: "Yes, if the operation's revenue and the truck's remaining value support the refinance. Refinancing makes sense when the existing rate is materially above the current panel range and the truck has at least 24 months of payments left. The application step asks about existing obligations so the lender can underwrite the refinance accurately.",
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
            "Truck financing for sub-650 FICO. Programs route from 500. Equipment loans, working capital, repair loans. Soft-pull match.",
          url: PAGE_URL,
          category: "Commercial trucking financing",
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
                <strong>Active <Link href="/glossary/dot-number">DOT number</Link>.</strong> The borrower&rsquo;s
                authority needs to be in good standing with <Link href="/glossary/fmcsa">FMCSA</Link>.
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
              <li>
                <strong>Clean compliance record.</strong> A clear{" "}
                <Link href="/glossary/drug-alcohol-clearinghouse">Drug &amp; Alcohol Clearinghouse</Link>{" "}
                query and clean{" "}
                <Link href="/glossary/pre-employment-screening">pre-employment screening</Link>{" "}
                history weigh in your favor on equipment-secured files,
                because they reduce the lender&rsquo;s perceived risk
                that the operator loses authority to drive the truck.
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
                opens <Link href="/glossary/working-capital">working capital</Link>; crossing 36 months opens{" "}
                <Link href="/glossary/equipment-loan">equipment loan</Link> pricing
                on the better-priced tier. Both are moves
                you&rsquo;ll make once and benefit from for the next loan.
              </li>
              <li>
                <strong>Lower amount, shorter term.</strong> A $20K loan
                over 12 months is easier to underwrite for a sub-580
                borrower than a $80K loan over 36. A short-duration{" "}
                <Link href="/glossary/term-loan">term loan</Link> at the amount
                you actually need tightens the rate versus a higher-cost{" "}
                <Link href="/glossary/mca">MCA</Link> structure.
              </li>
              <li>
                <strong>Co-signer with better credit.</strong> Some
                lenders on the panel accept a co-borrower with stronger
                credit, which routes the file to a wider lender set with
                lower-tier pricing.
              </li>
              <li>
                <strong>A current{" "}
                <Link href="/glossary/dot-physical">DOT physical</Link> on file.</strong>{" "}
                An unexpired medical certificate confirms the operator
                is legally able to drive and reduces the lender&rsquo;s
                worry about loss of authority mid-loan.
              </li>
              <li>
                <strong>Equipment as collateral.</strong> For
                equipment-secured loans, the truck&rsquo;s value and
                clean title pull the rate down materially versus an
                unsecured working-capital line of the same amount. The
                lender will file a <Link href="/glossary/ucc-1">UCC-1</Link> against
                the truck to perfect the security interest.
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
                <Link href="/trucking">
                  All trucking financing products →
                </Link>
              </li>
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
