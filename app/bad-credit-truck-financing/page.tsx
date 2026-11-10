import { contentDates } from "@/lib/seo/contentDates";
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

/* /bad-credit-truck-financing — second-wave SEO landing.
   Template parent: /truck-repair-loans (#44).

   Editorial frame: borrower-side framing for lower credit profiles
   (no numeric score floors — those are set by each financing partner). Same panel,
   different positioning. The trust pass discipline is especially
   important here: do not promise what we can't deliver, do not paper
   over the rate trade-off, do not pretend credit doesn't matter at all.
   The honest pitch is "the panel underwrites revenue and equipment too,
   not just credit" — which is true and is what differentiates the
   Dispatched panel from a bank. */

export const metadata: Metadata = {
  title: "Bad Credit Truck Financing | Dispatched",
  description:
    "Truck financing for lower credit profiles: equipment loans, working capital, repair loans. Soft-pull match; approval is not guaranteed.",
  alternates: { canonical: "/bad-credit-truck-financing" },
  openGraph: {
    images: ["/opengraph-image"],
    title: "Bad Credit Truck Financing | Dispatched",
    description:
      "Truck financing for lower credit profiles: equipment loans, working capital, repair loans. Soft-pull match; approval is not guaranteed.",
    url: "/bad-credit-truck-financing",
    type: "website",
  },
  twitter: {
    images: ["/opengraph-image"],
    card: "summary_large_image",
    title: "Bad Credit Truck Financing | Dispatched",
    description:
      "Truck financing for lower credit profiles: equipment loans, working capital, repair loans. Soft-pull match; approval is not guaranteed.",
  },
};

const PAGE_URL = "https://dispatched.finance/bad-credit-truck-financing";

const faqs = [
  {
    q: "Owner-operator with fair credit — can I actually get a truck loan?",
    a: "Options may be available; approval is not guaranteed. Fair credit sits in the middle of the panel's working-capital pricing band, with APRs typically quoting in the 24% to 30% range on working capital and 12% to 15% on equipment-secured loans. The Dispatched panel weighs monthly business deposits, debt service coverage, and equipment value alongside credit — which is why an operator a bank declined may still see offers on the panel.",
  },
  {
    q: "Can I get truck financing with a low credit score?",
    a: "Options may be available. Many banks decline lower credit profiles because they underwrite on credit alone; the Dispatched panel weighs revenue, debt service coverage, equipment value, and deposit history alongside credit. Credit requirements are set by each financing partner and approval is not guaranteed. Borrowers with lower credit profiles should expect a higher APR and tighter loan amounts.",
  },
  {
    q: "What APR will I pay with bad credit?",
    a: "Expect rates toward the high end of the published panel ranges. For working capital, that is the 28% to 34% APR end of the 14% to 34% range. For equipment-secured loans, that is the 14% to 18% APR end of the 9% to 18% range. The exact APR depends on revenue, time in business, equipment age, and down payment. The term sheet shows the exact rate before you sign.",
  },
  {
    q: "Why can panel lenders consider borrowers that banks decline?",
    a: "Dispatched is not a lender and does not approve anyone; the financing partners decide. Banks underwrite on credit score and personal financial statements. The panel's lenders also weigh the operation's bank deposits, equipment value, and time in business. A trucker pulling $30K a month in deposits with a low score is a different risk than the score alone suggests, and the panel's lenders price for that distinction.",
  },
  {
    q: "What documents do I need for bad credit truck financing?",
    a: "Three months of business bank statements, your EIN or SSN, DOT and MC number, and a driver's license. For equipment loans, also include a copy of the title or dealer purchase order. The bank statements are the central document — they tell the lender what the operation actually moves through deposits, which is the underwriting signal that matters most for lower-credit applications.",
  },
  {
    q: "Will applying with bad credit hurt my score further?",
    a: "Not at the start. The Dispatched application is a soft-pull match — soft inquiries are not visible to other lenders and do not affect your score. A hard pull only happens after you pick a specific lender and move forward on their term sheet. If you compare offers, hard pulls inside a 14-day rate-shopping window count as one inquiry on most scoring models.",
  },
  {
    q: "Is there a minimum credit score to apply?",
    a: "Dispatched does not set one; credit requirements are set by each financing partner, and approval is not guaranteed. Operators with very low scores may find no program on the panel and should focus on rebuilding the score (paying down revolving balances, settling charge-offs) before reapplying. Active Chapter 13 plans are reviewed case-by-case; active Chapter 7 cases inside the 12-month post-discharge window are typically declined across the panel.",
  },
  {
    q: "Can I refinance an existing high-rate truck loan with bad credit?",
    a: "Yes, if the operation's revenue and the truck's remaining value support the refinance. Refinancing makes sense when the existing rate is materially above the current panel range and the truck has at least 24 months of payments left. The application step asks about existing obligations so the lender can underwrite the refinance accurately.",
  },
];

export default function BadCreditTruckFinancingPage() {
  const { published, modified: today } = contentDates("app/bad-credit-truck-financing/page.tsx");
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
            "How borrowers with lower credit profiles move on the Dispatched panel: which lenders consider them, what compensating factors matter, and what to expect from the application flow.",
          url: PAGE_URL,
          datePublished: published,
          dateModified: today,
        })}
      />
      <JsonLd
        payload={financialProduct({
          name: "Bad credit truck financing",
          description:
            "Truck financing for lower credit profiles: equipment loans, working capital, repair loans. Soft-pull match; approval is not guaranteed.",
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
              Trucking loans for owner-operators with bad credit.
            </h1>
            <EditorialByline updated={today} />
            <p className="ins-hero-sub">
              The lenders on our panel underwrite revenue and equipment,
              not just credit score. For lower credit profiles the panel
              narrows and rates land on the higher end — but the
              bank&rsquo;s two-year DSCR test isn&rsquo;t how this panel
              decides. Credit requirements are set by each financing
              partner, and approval is not guaranteed.
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
              No hard credit pull to start.
            </p>
          </div>
        </section>

        {/* SECTION: SHORT ANSWER ===================================== */}
        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">The short answer</span>
            <h2 className="ins-hero-title">
              How borrowers with lower credit move on this panel.
            </h2>
            <p className="ins-hero-sub">
              Bad-credit truck financing is the same panel, the same
              products, and the same application flow as any other
              borrower — what changes is which lenders see the file and
              what APR they quote. The lenders on our panel that work with
              lower credit profiles do so because the operation behind the
              credit score is healthy: consistent revenue, a track record,
              equipment that holds value.
            </p>
            <p className="ins-hero-sub">
              The honest version of the rate trade-off: a borrower with
              a low score, $40K in monthly revenue and 18 months of operating
              history will quote on the higher end of the observed
              14%–34% APR working-capital range. The same borrower with
              stronger credit would quote in the middle. We don&rsquo;t hide
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
              What the panel looks at on a lower-credit file.
            </h2>
            <ul className="product-list">
              <li>
                <strong>Credit profile.</strong> Credit requirements are
                set by each financing partner. With a lower credit profile
                a smaller subset of lenders sees the application; rates are
                at the high end and the maximum loan amount is tighter.
                Operators with active credit events or very low scores
                may still find cash flow through{" "}
                <Link href="/factoring/broker-credit">
                  factoring that underwrites your brokers </Link> {" "}— the factor underwrites mainly on the broker who owes the invoice, and approval is not guaranteed.
              </li>
              <li>
                <strong>6+ months of operating history.</strong> The
                shorter your history, the heavier credit weighs in
                underwriting. With 12+ months of consistent bank-statement
                revenue, the working-capital fit can become available even
                for lower credit profiles.
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
                over 12 months is easier to underwrite for a lower-credit
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
              What a lower-credit application looks like on this panel.
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
                  Owner-operator, 1 truck, 22 months in business, a lower
                  credit profile, $35K monthly revenue.
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
                <strong>Application.</strong> Inside{" "}
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
                <strong>Wire.</strong> After the chosen
                lender signs off, timing depends on the lender and your documents.
              </li>
            </ol>
          </div>
        </section>

        {/* SECTION: FAQ ============================================= */}
        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">FAQ</span>
            <h2 className="ins-hero-title">
              Questions borrowers with bad credit ask.
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
              See which panel lenders may consider your profile.
            </h2>
            <p className="ins-hero-sub">
              Soft-pull match first. One hard pull only with the lender
              you choose. Timing depends on the lender and your documents.
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
                <Link href="/bad-credit-truck-financing/chapter-7-discharge">
                  Truck financing after a Chapter 7 discharge →
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
                  Two-question funding fit (no credit pull) →
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
