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

export const metadata: Metadata = {
  title:
    "Trucking working capital — fuel, payroll, daily expenses — Dispatched",
  description:
    "Working capital for trucking operations: $25K–$250K to cover fuel, payroll, tolls, insurance, and slow-month gaps. Soft-pull match first; one hard pull only with the lender you pick.",
  alternates: { canonical: "/trucking-working-capital" },
};

const PAGE_URL = "https://dispatched.finance/trucking-working-capital";

const faqs = [
  {
    q: "What can a trucking working-capital line actually be used for?",
    a: "Anything operational: fuel, driver payroll, tolls, insurance premiums, broker fees, IFTA, IRP, factoring fees, and bridging slow months between dedicated lanes. Working-capital lines on our panel don't restrict the use of funds at the line-item level — the lender underwrites the operation's ability to repay, and the proceeds are flexible.",
  },
  {
    q: "How is this different from invoice factoring?",
    a: "Working capital is a loan you pay back from operations over time; factoring is selling specific outstanding invoices for an immediate cash advance. Working capital costs more in APR but gives you cash that isn't tied to specific receivables and doesn't require the carrier or broker to be notified. Factoring settles in days rather than weeks but eats into the margin on each invoice. Different cost structures for different cashflow problems.",
  },
  {
    q: "How fast does the working-capital line fund?",
    a: "Same banking day after the chosen lender signs off, when the wire instruction lands before that bank's cutoff. Wires that miss the cutoff settle the next banking day; weekend and federal-holiday wires settle the next banking day. We do not publish a median time-to-funds figure until the data layer can derive it from real signed-application and ACH-settled funding events.",
  },
  {
    q: "What's the typical APR for a trucking working-capital line?",
    a: "The marketing FAQ documents the observed panel range as 14% – 34% APR for working capital. The exact APR depends on credit band, time in business, monthly revenue, and the chosen lender's underwriting; see /methodology#finance-rates for how we describe the bands. Higher credit bands and longer operating histories quote toward the lower end; sub-580 borrowers quote toward the high end.",
  },
  {
    q: "Can I use working capital to pay off a higher-rate loan I already have?",
    a: "Yes. Refinancing higher-cost debt is one of the common use cases on our panel, particularly for borrowers consolidating multiple shorter-term advances into a single working-capital line at a lower blended cost. The application step asks about existing obligations so the lender can underwrite the consolidation accurately.",
  },
  {
    q: "Will applying hurt my credit?",
    a: "Not at the start. The Dispatched application is a soft-pull match — soft inquiries are not visible to other lenders and do not affect your credit score. A hard pull only happens after you pick a specific lender and move forward on their term sheet.",
  },
  {
    q: "How much can a trucking operation typically borrow?",
    a: "The published range is $25K–$250K for the working-capital product. Actual approval depends on monthly revenue, time in business, credit band, and lender underwriting. Some borrowers qualify for less than $25K or more than $250K via separate products not shown on the landing page.",
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
          "Unsecured working-capital lines for trucking operations, $25K–$250K, routed to a panel of trucking-friendly lenders.",
        url: PAGE_URL,
        category: "BusinessLoan",
      })} />
      <JsonLd payload={faqPage(faqs)} />
      <JsonLd payload={financialService({
        name: "Trucking Working Capital",
        // TODO(marketing): replace with copy from docs/seo/per-page-copy.md once landed
        description:
          "Unsecured working-capital financing for trucking operations: $25K–$250K to cover fuel, payroll, tolls, insurance, and slow-month gaps. Soft-pull match first; one hard pull only with the lender you pick.",
        url: PAGE_URL,
        serviceType: "Commercial trucking financing",
        offerCatalog: [
          { name: "Truck repair loans", url: "https://dispatched.finance/truck-repair-loans" },
          { name: "Equipment financing", url: "https://dispatched.finance/equipment-financing" },
          { name: "Invoice factoring for truckers", url: "https://dispatched.finance/invoice-factoring-for-truckers" },
          { name: "Owner-operator financing", url: "https://dispatched.finance/owner-operator-financing" },
        ],
      })} />

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
