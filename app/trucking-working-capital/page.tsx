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

export const metadata: Metadata = {
  title: "Trucking working capital — fuel & payroll fast | Dispatched",
  description:
    "Working capital for trucking: $25K–$250K to cover fuel, payroll, tolls, and slow-month gaps. Soft-pull match, funds same banking day. Apply in minutes.",
  alternates: { canonical: "/trucking-working-capital" },
  openGraph: {
    title: "Trucking working capital — fuel & payroll fast | Dispatched",
    description:
      "Working capital for trucking: $25K–$250K to cover fuel, payroll, tolls, and slow-month gaps. Soft-pull match, funds same banking day. Apply in minutes.",
    url: "/trucking-working-capital",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trucking working capital — fuel & payroll fast | Dispatched",
    description:
      "Working capital for trucking: $25K–$250K to cover fuel, payroll, tolls, and slow-month gaps. Soft-pull match, funds same banking day. Apply in minutes.",
  },
};

const PAGE_URL = "https://dispatched.finance/trucking-working-capital";

const faqs = [
  {
    q: "How fast can I get a trucking working capital loan?",
    a: "Soft approval and lender match typically come back within 20 minutes of finishing the application. Funds hit your account the same banking day after the chosen lender countersigns, provided the wire instruction lands before that bank's cutoff. Wires that miss the cutoff settle the next banking day; weekend and federal-holiday wires settle the next banking day. We do not publish a median time-to-funds figure until the data layer can derive it from real signed-application and ACH-settled funding events.",
  },
  {
    q: "What can I use a trucking working capital loan for?",
    a: "Anything operational. Fuel, driver payroll, tolls, insurance premiums, broker fees, IFTA, IRP, factoring fees, repair deductibles, and bridging slow months between dedicated lanes are all common uses. Working-capital lines on the Dispatched panel do not restrict use of funds at the line-item level — the lender underwrites the operation's ability to repay, and the proceeds are flexible.",
  },
  {
    q: "How is working capital different from invoice factoring?",
    a: "Working capital is a loan you pay back from operations over time; factoring is selling specific outstanding invoices for an immediate cash advance. Working capital costs more in APR but gives you cash that is not tied to specific receivables and does not require notifying the broker or shipper. Factoring settles in days rather than weeks but eats into the margin on every invoice you sell. Different cost structures for different cashflow problems.",
  },
  {
    q: "What APR can I expect on a trucking working capital loan?",
    a: "The observed panel range is 14% to 34% APR for working capital. The exact APR depends on credit band, time in business, monthly revenue, and the chosen lender's underwriting. Higher credit bands and longer operating histories quote toward the lower end; sub-580 borrowers quote toward the high end. You see the exact APR, term length, and total cost on the term sheet before signing.",
  },
  {
    q: "How much can a trucking operation borrow?",
    a: "The published range is $25K to $250K for the working capital product. Actual approval depends on monthly revenue, time in business, credit band, and lender underwriting. Some operators qualify for less than $25K or more than $250K via separate products not shown on the landing page. The application step asks the questions a lender needs to size the offer accurately.",
  },
  {
    q: "Can I use working capital to pay off a higher-rate loan?",
    a: "Yes. Refinancing higher-cost debt is a common use case on the Dispatched panel, particularly for borrowers consolidating multiple short-term cash advances into a single working-capital line at a lower blended cost. The application step asks about existing obligations so the lender can underwrite the consolidation accurately.",
  },
  {
    q: "Will applying for working capital hurt my credit?",
    a: "Not at the start. The Dispatched application is a soft-pull match — soft inquiries are not visible to other lenders and do not affect your credit score. A hard pull only happens after you pick a specific lender and move forward on their term sheet. If you compare offers from multiple lenders, hard pulls inside a 14-day rate-shopping window count as one inquiry on most scoring models.",
  },
  {
    q: "What documents do I need for a working capital loan?",
    a: "Three months of business bank statements, your EIN or SSN, DOT number, and a driver's license. For loan amounts above $75K the chosen lender will also ask for the most recent Schedule C or 1120 and current settlement statements from your carrier or broker. No business plan, no tax preparer letter, no IFTA printouts unless a specific lender requests them.",
  },
];

export default function TruckingWorkingCapitalPage() {
  const today = new Date().toISOString().slice(0, 10);
  return (
    <div className="landing">
      <JsonLd payload={breadcrumbList([
        { name: "Home", url: "https://dispatched.finance/" },
        { name: "Trucking working capital", url: PAGE_URL },
      ])} />
      <JsonLd payload={article({
        headline: "Trucking working capital for owner-operators and small fleets",
        description:
          "How working-capital financing works on the Dispatched panel: the loan range, observed APR band, who qualifies, and what the funds typically cover.",
        url: PAGE_URL,
        datePublished: today,
        dateModified: today,
      })} />
      <JsonLd payload={financialProduct({
        name: "Trucking working capital",
        description:
          "Working capital for trucking: $25K–$250K to cover fuel, payroll, tolls, and slow-month gaps. Soft-pull match, funds same banking day.",
        url: PAGE_URL,
        category: "Commercial trucking financing",
      })} />
      <JsonLd payload={faqPage(faqs)} />

      <Nav />

      <main id="main-content" className="ins-page product-page">
        <section className="ins-hero product-hero">
          <div className="ins-container">
            <span className="ins-eyebrow">Working capital</span>
            <h1 className="ins-hero-title">
              Working capital for fuel, payroll, and daily operations.
            </h1>
            <p className="ins-hero-sub">
              $25K–$250K unsecured commercial lines for trucking
              owner-operators and small fleets. Cover fuel, driver
              payroll, tolls, insurance premiums, and the gap during a
              slow month. Soft-pull match first; one hard pull only with
              the lender you pick.
            </p>
            <div className="product-hero-ctas">
              <Link href="/apply?useCase=bridge" className="btn btn--primary btn--lg">
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

        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">The short answer</span>
            <h2 className="ins-hero-title">What working capital actually is.</h2>
            <p className="ins-hero-sub">
              A trucking working-capital line is an unsecured commercial
              loan in the $25K–$250K range that the borrower can use for
              any operational expense. The lender underwrites the
              operation&rsquo;s cashflow — bank-statement deposits over
              the last three months, time in business, credit band — and
              the loan is repaid from operations over a fixed term, most
              often 6 to 24 months.
            </p>
            <p className="ins-hero-sub">
              The defining trade-off vs equipment financing is the lien.
              Working capital has no security interest, which is why APRs
              run higher (the marketing FAQ documents 14%–34% versus
              9%–18% for equipment-secured loans). For trucking
              operators, working capital is the right product when the
              cashflow problem isn&rsquo;t tied to a specific piece of
              equipment — fuel during a slow stretch, payroll across a
              broker default, insurance premium due, IFTA filing.
            </p>
          </div>
        </section>

        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">Who qualifies</span>
            <h2 className="ins-hero-title">Eligibility floors.</h2>
            <ul className="product-list">
              <li>
                <strong>500+ FICO panel floor.</strong> Below 580 expect
                rates on the higher end of the 14%–34% range and a tighter
                maximum.
              </li>
              <li>
                <strong>6+ months of operating history.</strong> The
                shorter your history, the heavier credit weighs.
                12+ months opens the full working-capital range to most
                borrowers.
              </li>
              <li>
                <strong>$10K+ monthly revenue.</strong> Below that, panel
                routing narrows considerably regardless of credit band.
                Above $25K monthly revenue, panel access widens and the
                approved amount scales.
              </li>
              <li>
                <strong>Active DOT number.</strong> Authority in good
                standing with FMCSA.
              </li>
              <li>
                <strong>Active business bank account.</strong> Lenders
                need three months of statements and the account that
                will receive the wire.
              </li>
            </ul>
          </div>
        </section>

        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">What the funds cover</span>
            <h2 className="ins-hero-title">Typical use cases.</h2>
            <ul className="product-list">
              <li>
                <strong>Fuel during slow stretches</strong> — most common
                use case on our panel. Operators bridge between dedicated
                lanes or at the start of a broker relationship before
                receivables ramp.
              </li>
              <li>
                <strong>Driver payroll</strong> — fleet operators covering
                a payroll cycle that lands before broker payment cycles.
                Particularly common after a broker default on a sizable
                receivable.
              </li>
              <li>
                <strong>Insurance premiums</strong> — annual or semi-
                annual premium payments that don&rsquo;t fit comfortably
                into one month&rsquo;s cashflow.
              </li>
              <li>
                <strong>IFTA, IRP, registration, permits</strong> —
                quarterly and annual regulatory expenses, particularly
                multi-state operations with stacked filings.
              </li>
              <li>
                <strong>Broker default bridges</strong> — covering
                operations after a non-paying broker leaves a sizable
                receivable in collections.
              </li>
              <li>
                <strong>Refinancing higher-cost debt</strong> —
                consolidating MCAs or short-term advances into a single
                lower-APR working-capital line.
              </li>
            </ul>
          </div>
        </section>

        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">Composite scenario</span>
            <h2 className="ins-hero-title">
              What a working-capital request looks like.
            </h2>
            <p className="ins-hero-sub">
              Composite illustrative scenario — not a specific borrower.
              See <Link href="/methodology#composite-scenarios">methodology</Link>.
            </p>
            <div className="product-example">
              <div className="product-example-meta">
                <span className="product-example-label">Operator</span>
                <span className="product-example-value">
                  Fleet owner, 4 trucks, 3.5 years operating, primarily
                  Ohio Valley dedicated van freight, FICO 670, $90K
                  monthly revenue.
                </span>
              </div>
              <div className="product-example-meta">
                <span className="product-example-label">Situation</span>
                <span className="product-example-value">
                  Slow January between dedicated lane renewals.
                  $120K to cover fuel and payroll for 6 weeks while
                  February freight rebuilds.
                </span>
              </div>
              <div className="product-example-meta">
                <span className="product-example-label">Estimator output</span>
                <span className="product-example-value">
                  Best fit: <strong>Working capital</strong>. Repaid from
                  operations over 12–18 months as receivables build back.
                </span>
              </div>
              <div className="product-example-meta">
                <span className="product-example-label">APR band</span>
                <span className="product-example-value mono">
                  16% – 24% APR (observed panel range for this credit tier
                  and time-in-business; final APR set by the chosen lender)
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">How the money moves</span>
            <h2 className="ins-hero-title">From application to wire.</h2>
            <ol className="product-process">
              <li><strong>Application.</strong> Two minutes inside <Link href="/apply">/apply</Link>. Revenue, time in business, what you&rsquo;re covering. Soft-pull only.</li>
              <li><strong>Soft-pull match.</strong> Redacted profile to the panel subset that funds your credit band and revenue range.</li>
              <li><strong>Offers.</strong> APR, term, total cost on each term sheet, side by side, before any hard pull.</li>
              <li><strong>One hard pull.</strong> Only after you pick a specific lender and decide to move forward.</li>
              <li><strong>Wire.</strong> Same banking day after the chosen lender signs off, before the bank&rsquo;s cutoff.</li>
            </ol>
          </div>
        </section>

        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">FAQ</span>
            <h2 className="ins-hero-title">Questions about working capital.</h2>
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

        <section className="ins-sunken">
          <div className="ins-container">
            <h2 className="ins-hero-title">
              Cover the gap, run the work, repay from operations.
            </h2>
            <p className="ins-hero-sub">
              Soft-pull match first. One hard pull only with the lender
              you choose.
            </p>
            <div className="product-hero-ctas">
              <Link href="/apply?useCase=bridge" className="btn btn--primary btn--lg">
                See my funding options →
              </Link>
              <Link href="/qualify" className="btn btn--secondary btn--lg">
                Or check my fit first →
              </Link>
            </div>
          </div>
        </section>

        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">Related</span>
            <ul className="product-related">
              <li><Link href="/trucking">All trucking financing products →</Link></li>
              <li><Link href="/invoice-factoring-for-truckers">Invoice factoring →</Link></li>
              <li><Link href="/equipment-financing">Equipment financing →</Link></li>
              <li><Link href="/truck-repair-loans">Truck repair loans →</Link></li>
              <li><Link href="/owner-operator-financing">Owner-operator financing →</Link></li>
              <li><Link href="/methodology">How we describe APR ranges →</Link></li>
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
