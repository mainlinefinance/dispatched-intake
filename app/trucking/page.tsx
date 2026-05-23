import type { Metadata } from "next";
import Link from "next/link";
import EditorialByline from "@/components/landing/EditorialByline";
import Footer from "@/components/landing/Footer";
import Nav from "@/components/landing/Nav";
import { getAllFinancingProducts } from "@/lib/data/financingProducts";
import {
  JsonLd,
  article,
  breadcrumbList,
  faqPage,
  financialService,
} from "@/components/seo/JsonLd";

/* ===========================================================================
   /trucking — pillar hub for the nine financing money pages.

   Replaces the legacy 308 redirect to /trucking-working-capital. The page
   summarizes the panel of products, hosts the FinancialService entity (its
   @id has always pointed here), and routes operators to the right product
   page by situation rather than by guessed loan type.

   Schema rendered (in order, matching /insurance precedent):
     1. FinancialService — entity-level wrapper (@id pinned to this URL)
     2. BreadcrumbList — Home → Trucking financing
     3. Article — pillar editorial
     4. FAQPage — 7 hub-level Q&As (different angle from per-product FAQs)
   Organization + WebSite ship from app/layout.tsx. Do NOT re-render here.

   Structural mirror: app/insurance/page.tsx. Difference: /insurance has its
   own layout with Nav/Footer; /trucking does not, so this page renders them
   directly the way /trucking-working-capital does.
   =========================================================================== */

const PAGE_URL = "https://dispatched.finance/trucking";

export const metadata: Metadata = {
  title:
    "Trucking financing — working capital, equipment, repair loans — Dispatched",
  description:
    "9 trucking loan products: working capital, equipment, repair, factoring, semi-truck, owner-op, new-authority, bad-credit. Soft-pull first.",
  alternates: { canonical: "/trucking" },
  openGraph: {
    title:
      "Trucking financing — working capital, equipment, repair loans — Dispatched",
    description:
      "9 trucking loan products: working capital, equipment, repair, factoring, semi-truck, owner-op, new-authority, bad-credit. Soft-pull first.",
    url: "/trucking",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Trucking financing — working capital, equipment, repair loans — Dispatched",
    description:
      "9 trucking loan products: working capital, equipment, repair, factoring, semi-truck, owner-op, new-authority, bad-credit. Soft-pull first.",
  },
};

const faqs = [
  {
    q: "Which trucking loan should I apply for?",
    a: "Pick by situation, not by loan name. Cash gap for fuel or payroll: working capital. Truck broken down: a truck repair loan. Buying a tractor or trailer: equipment financing. Slow-paying broker invoices: invoice factoring. Class 8 tractor: semi-truck financing. Straight or box truck: box-truck financing. FICO under 600 or under 12 months MC: the bad-credit and new-authority routes inside the same panel. The decision matrix on this page maps each situation to the right product page; the application then routes to the lenders that fund that product for your profile.",
  },
  {
    q: "Do I need good credit to qualify for trucking financing?",
    a: "No. The published panel floor is a 500 FICO. Below 580 the lender mix narrows and APRs sit on the high end of the observed band, but routing exists. The lenders we match to underwrite revenue and equipment, not just FICO — three months of bank statements, time in business, and the operation itself carry meaningful weight. We do not invent a panel floor under 500: below that score there is no routing on this panel.",
  },
  {
    q: "How fast can I get funded?",
    a: "Soft approval and lender match typically come back within 20 minutes of finishing the application. Funds hit your account the same banking day after the chosen lender countersigns and the wire instruction lands before that bank's cutoff. Wires after the cutoff settle the next banking day; weekend and federal-holiday wires settle the next banking day. We do not publish a median time-to-funds figure until the data layer can derive it from real signed-application and ACH-settled funding events.",
  },
  {
    q: "Can I apply for more than one product at the same time?",
    a: "Yes — and most one-truck operators end up using two or three of these products across a year. The application captures one situation at a time so the lender match stays clean, but resubmitting for a second product (e.g. equipment financing after a separate working-capital draw) does not cost anything and runs through the same soft-pull path. The lenders on our panel evaluate stacked obligations in their underwriting; existing balances reduce capacity rather than disqualify.",
  },
  {
    q: "Will applying hurt my credit score?",
    a: "Not at the start. The Dispatched application is a soft-pull match — soft inquiries are not visible to other lenders and do not affect your credit score. A hard pull only happens after you pick a specific lender and move forward on their term sheet. If you compare offers from multiple lenders, hard pulls inside a 14-day rate-shopping window count as one inquiry on most scoring models.",
  },
  {
    q: "What's the difference between a working-capital loan and invoice factoring?",
    a: "Working capital is a loan you pay back from operations over a fixed term; factoring is selling specific outstanding invoices for an immediate cash advance. Working capital costs more in APR (the panel range is 14%–34% APR) but gives you cash that is not tied to specific receivables and does not require notifying the broker or shipper. Factoring settles in days rather than weeks but eats into the margin on every invoice you sell. Different cost structures for different cashflow problems — both live on this panel.",
  },
  {
    q: "Does Dispatched fund the loans, or who does?",
    a: "Dispatched is a matching platform. Loans are funded by third-party commercial lenders on the panel. We are not a lender, we do not underwrite, and we do not fund loans. The chosen lender is disclosed on the term sheet and is the entity bound to you on the loan. Dispatched is paid a referral fee on funded loans.",
  },
];

export default function TruckingHubPage() {
  const products = getAllFinancingProducts();
  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="landing">
      <JsonLd payload={financialService()} />
      <JsonLd
        payload={breadcrumbList([
          { name: "Home", url: "https://dispatched.finance/" },
          { name: "Trucking financing", url: PAGE_URL },
        ])}
      />
      <JsonLd
        payload={article({
          headline:
            "Trucking Financing: Products, Eligibility, and How to Pick the Right One",
          description:
            "Pillar overview of trucking financing on the Dispatched panel — nine products spanning working capital, equipment, repair loans, factoring, and operator-profile cuts.",
          url: PAGE_URL,
          datePublished: today,
          dateModified: today,
        })}
      />
      <JsonLd payload={faqPage(faqs)} />

      <Nav />

      <main id="main-content" className="ins-page product-page">
        <section className="ins-hero product-hero">
          <div className="ins-container">
            <span className="ins-eyebrow">Trucking financing · pillar</span>
            <h1 className="ins-hero-title">
              Trucking financing, by product and by situation.
            </h1>
            <EditorialByline updated={today} />
            <p className="ins-hero-sub">
              Nine financing products operators actually shop for, mapped to
              the cashflow situation each one solves. Pick the situation
              first; the product follows. Soft-pull match first; one hard
              pull only with the lender you choose.
            </p>
            <div className="product-hero-ctas">
              <Link
                href="/qualify"
                className="btn btn--primary btn--lg"
              >
                See my funding options →
              </Link>
              <Link
                href="/apply"
                className="btn btn--secondary btn--lg"
              >
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
            <span className="ins-eyebrow">Financing products</span>
            <h2 className="ins-hero-title">All nine products.</h2>
            <div className="ins-product-grid">
              {products.map((p) => (
                <Link
                  key={p.slug}
                  href={p.url}
                  className="ins-product-card"
                >
                  <h3>{p.name}</h3>
                  <p>{p.oneLine}</p>
                  <span className="ins-product-card-footer">
                    {p.aprBand
                      ? `${p.rangeLabel} · ${p.aprBand}`
                      : p.rangeLabel}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">Pick by situation</span>
            <h2 className="ins-hero-title">
              Which product fits which situation.
            </h2>
            <p className="ins-hero-sub">
              The panel routes by what triggered the cash need, not by
              loan-product label. Pick the row that matches the moment;
              the linked product page covers the mechanics, eligibility
              floors, and the lender mix.
            </p>
            <ul className="product-list">
              <li>
                <strong>Cash for fuel or payroll →</strong>{" "}
                <Link href="/trucking-working-capital">
                  working capital
                </Link>
                . Unsecured line, $25K–$250K, 14%–34% APR. Funds operations
                rather than equipment.
              </li>
              <li>
                <strong>Broken truck →</strong>{" "}
                <Link href="/truck-repair-loans">truck repair loans</Link>.
                Short-term, repair-specific financing for engine, transmission,
                brakes, after-treatment, and accident damage.
              </li>
              <li>
                <strong>Buying a tractor or trailer →</strong>{" "}
                <Link href="/equipment-financing">equipment financing</Link>.
                Secured by the equipment, 9%–18% APR, terms to 72 months.
              </li>
              <li>
                <strong>Outstanding broker invoices →</strong>{" "}
                <Link href="/factoring">
                  invoice factoring
                </Link>
                . Sell specific invoices for immediate cash. Recourse and
                non-recourse routes available.
              </li>
              <li>
                <strong>Financing a Class 8 →</strong>{" "}
                <Link href="/semi-truck-financing">semi-truck financing</Link>.
                The Class 8 subset of equipment financing — Cascadias,
                Kenworths, Peterbilts, Volvos, Macks.
              </li>
              <li>
                <strong>Financing a straight truck →</strong>{" "}
                <Link href="/box-truck-financing">box-truck financing</Link>.
                16ft to 26ft equipment for last-mile, expediting, hot-shot,
                and Amazon Relay operators.
              </li>
              <li>
                <strong>FICO under 600 →</strong>{" "}
                <Link href="/bad-credit-truck-financing">
                  bad-credit truck financing
                </Link>
                . Same panel, narrower lender mix; 500 is the panel floor.
              </li>
              <li>
                <strong>Under 12 months MC →</strong>{" "}
                <Link href="/new-authority-truck-financing">
                  new-authority financing
                </Link>
                . Factoring and higher-down-payment equipment loans dominate
                this segment.
              </li>
              <li>
                <strong>One-truck operator →</strong>{" "}
                <Link href="/owner-operator-financing">
                  owner-operator financing
                </Link>
                . 1099 sole-prop is the default profile here, not the
                exception.
              </li>
            </ul>
          </div>
        </section>

        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">How we describe rates</span>
            <h2 className="ins-hero-title">Methodology, not marketing.</h2>
            <p className="ins-hero-sub">
              APR ranges on this site come from the panel&rsquo;s published
              bands and the marketing FAQs that document them — 9%–18% on
              equipment-secured loans, 14%–34% on unsecured working capital.
              We do not invent rates and we do not paraphrase a number a
              lender did not publish. Where a per-product page does not yet
              carry a rate band, the page says so plainly. Read the full
              note at{" "}
              <Link href="/methodology">/methodology</Link>.
            </p>
            <p className="ins-compliance-note">
              Dispatched is a matching platform. Loans are funded by
              third-party commercial lenders. We are not a lender and we do
              not underwrite or fund loans.
            </p>
          </div>
        </section>

        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">FAQ</span>
            <h2 className="ins-hero-title">
              Questions about picking a product.
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

        <section className="ins-sunken">
          <div className="ins-container">
            <h2 className="ins-hero-title">
              Match to the right product, then to the right lender.
            </h2>
            <p className="ins-hero-sub">
              Soft-pull match first. One hard pull only with the lender you
              choose.
            </p>
            <div className="product-hero-ctas">
              <Link
                href="/qualify"
                className="btn btn--primary btn--lg"
              >
                See my funding options →
              </Link>
              <Link
                href="/apply"
                className="btn btn--secondary btn--lg"
              >
                Two-question fit (no credit pull)
              </Link>
            </div>
          </div>
        </section>

        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">Related</span>
            <ul className="product-related">
              <li>
                <Link href="/insurance">
                  Commercial trucking insurance →
                </Link>
              </li>
              <li>
                <Link href="/qualify">Two-question fit check →</Link>
              </li>
              <li>
                <Link href="/calculators">Loan calculators →</Link>
              </li>
              <li>
                <Link href="/methodology">
                  How we describe APR ranges →
                </Link>
              </li>
              <li>
                <Link href="/research">Research and data →</Link>
              </li>
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
