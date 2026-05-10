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
    "Semi truck financing — Class 8 tractors — Dispatched",
  description:
    "Class 8 semi truck financing for owner-operators and small fleets. Cascadias, Kenworths, Peterbilts, Volvos. Secured by the truck; 9% – 18% observed APR band. Soft-pull match first.",
  alternates: { canonical: "/semi-truck-financing" },
};

const PAGE_URL = "https://dispatched.finance/semi-truck-financing";

const faqs = [
  {
    q: "What's the difference between semi truck financing and general equipment financing?",
    a: "Semi truck financing is a subset of equipment financing focused specifically on Class 8 tractors — the over-26,001-lbs heavy-duty trucks used for OTR freight. The lender mechanics are the same as general equipment financing (secured by the truck, lien held until paid off), but the panel routing, term lengths, and pricing reflect the specific equipment class. See /equipment-financing for the broader category that includes box trucks, trailers, and add-ons.",
  },
  {
    q: "Can I finance a used Cascadia / Kenworth / Peterbilt / Volvo?",
    a: "Yes. Used Class 8 tractors are routinely funded across our panel. Lenders look at year, mileage, and condition — not just model. Trucks under 5 years old with under 600,000 miles are the easiest to finance; older trucks or higher-mileage units route to a smaller subset and price closer to the high end of the observed 9% – 18% APR band. Pre-emissions trucks (pre-2010 EPA) and some early-2010s units have narrower availability because of resale value concerns.",
  },
  {
    q: "What's the typical loan amount for semi truck financing?",
    a: "Used Class 8 tractor purchases on our panel typically run $40K–$120K depending on year, model, mileage, and condition. New tractor purchases often exceed the published $25K–$250K loan range and route to separate products not shown on the landing page. Repair and equipment-upgrade loans against a truck you already own can run smaller.",
  },
  {
    q: "How much down payment will I need on a Class 8 truck?",
    a: "Down payment requirements vary by credit band, time in business, and truck age. For seasoned operators (2+ years operating) with 680+ FICO buying a used truck under 5 years old, some lenders waive down payment entirely. For sub-680 borrowers or older trucks, expect 10%–20% down. The exact down payment requirement is on the term sheet before any hard pull.",
  },
  {
    q: "Can I finance a Class 8 truck as a new-authority operator?",
    a: "Yes, with caveats. Equipment financing for first-truck Class 8 purchases by new-authority operators routes to a narrower subset of the panel, with higher down payments (often 20%+) and shorter terms (24–36 months instead of 48–60). See /new-authority-truck-financing for a deeper read on the under-12-month-authority routing.",
  },
  {
    q: "Will the lender pay the dealer directly?",
    a: "Usually yes for dealer purchases. Most semi truck loans on our panel are issued direct-to-dealer with title work coordinated between the lender, the dealer, and the borrower. For private-party purchases (auctions, marketplace sales, direct-from-driver deals), lenders typically wire to escrow or to the seller after title transfer. Disbursement method is on the term sheet.",
  },
  {
    q: "What documents will I need?",
    a: "Last 3 months of business bank statements, EIN or SSN, DOT number, driver's license. For the equipment loan: bill of sale or dealer purchase quote, vehicle inspection report (some lenders require for trucks over 7 years old), and most-recent Schedule C or 1120 for loans over $75K. The lender may also request a copy of the title or an independent appraisal for older equipment.",
  },
];

export default function SemiTruckFinancingPage() {
  const today = new Date().toISOString().slice(0, 10);
  return (
    <div className="landing">
      <JsonLd payload={breadcrumbList([
        { name: "Home", url: "https://dispatched.finance/" },
        { name: "Semi truck financing", url: PAGE_URL },
      ])} />
      <JsonLd payload={article({
        headline: "Semi truck financing — Class 8 tractors",
        description:
          "How Class 8 semi truck financing works on the Dispatched panel: which makes are funded, used vs new, down payment expectations, and what to expect from the application flow.",
        url: PAGE_URL,
        datePublished: today,
        dateModified: today,
      })} />
      <JsonLd payload={financialProduct({
        name: "Semi truck financing",
        description:
          "Equipment financing for Class 8 tractors — Cascadias, Kenworths, Peterbilts, Volvos, Macks — routed to a panel of trucking-friendly lenders.",
        url: PAGE_URL,
        category: "BusinessLoan",
      })} />
      <JsonLd payload={faqPage(faqs)} />
      <JsonLd payload={financialService({
        name: "Semi-Truck Financing",
        // TODO(marketing): replace with copy from docs/seo/per-page-copy.md once landed
        description:
          "Class 8 semi-truck financing for owner-operators and small fleets — Cascadias, Kenworths, Peterbilts, Volvos, Macks. Secured by the truck; 9% – 18% observed APR band. Soft-pull match first.",
        url: PAGE_URL,
        serviceType: "Commercial trucking equipment financing",
      })} />

      <Nav />

      <main id="main-content" className="ins-page product-page">
        <section className="ins-hero product-hero">
          <div className="ins-container">
            <span className="ins-eyebrow">Semi truck financing</span>
            <h1 className="ins-hero-title">
              Class 8 semi truck financing for owner-operators.
            </h1>
            <p className="ins-hero-sub">
              Cascadias, Kenworths, Peterbilts, Volvos, Macks. Secured
              by the truck, longer terms than working capital, lower
              monthly payment. The marketing FAQ documents 9% – 18% as
              the observed panel APR band for equipment loans secured
              by the truck.
            </p>
            <div className="product-hero-ctas">
              <Link href="/apply?useCase=equipment" className="btn btn--primary btn--lg">
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
            <h2 className="ins-hero-title">What semi truck financing is.</h2>
            <p className="ins-hero-sub">
              Semi truck financing is the Class 8 subset of equipment
              financing — secured by the truck, with the lender holding
              a lien until the loan is paid off. The structure is the
              same as the broader equipment-loan product (
              <Link href="/equipment-financing">/equipment-financing</Link>),
              but the panel routing reflects the specific equipment
              class: term lengths, pricing, and down-payment
              expectations are calibrated to Class 8 resale dynamics.
            </p>
            <p className="ins-hero-sub">
              The defining trade-off vs a working-capital line is the
              lien. Equipment financing has a security interest in the
              truck; selling or replacing the truck requires
              coordinating with the lender. In exchange, the
              equipment-loan APR band runs 9%–18% versus the 14%–34%
              band on working capital, and term lengths run 36–60
              months instead of 6–24 (see{" "}
              <Link href="/methodology#finance-rates">methodology</Link>).
            </p>
          </div>
        </section>

        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">Common makes and conditions</span>
            <h2 className="ins-hero-title">What the panel routinely finances.</h2>
            <ul className="product-list">
              <li>
                <strong>Freightliner Cascadia.</strong> The most-
                financed Class 8 tractor on our panel by volume. Wide
                lender availability across model years 2018–2024;
                pre-2018 routes to a smaller subset.
              </li>
              <li>
                <strong>Kenworth T680, T880, W990.</strong> Strong panel
                coverage across model years. T680s and T880s in
                day-cab and sleeper configurations both fund routinely.
              </li>
              <li>
                <strong>Peterbilt 579, 389, 567.</strong> 579s and 567s
                fund across the panel; 389s (the chrome-heavy classic)
                fund on a slightly narrower panel due to higher resale
                value variance.
              </li>
              <li>
                <strong>Volvo VNL, VNR.</strong> Wide panel coverage.
                Pre-2017 emissions packages route to a smaller subset
                because of CARB and resale concerns.
              </li>
              <li>
                <strong>Mack Anthem, Pinnacle.</strong> Stable panel
                coverage; older Pinnacles route to a narrower subset.
              </li>
              <li>
                <strong>International LT, LoneStar.</strong> Funds across
                most of the panel. Some pre-2017 models route narrower.
              </li>
            </ul>
          </div>
        </section>

        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">Used vs new</span>
            <h2 className="ins-hero-title">How loan terms shift by truck age.</h2>
            <ul className="product-list">
              <li>
                <strong>0–4 years old, under 400K miles.</strong> Best
                pricing, longest terms (up to 60 months on our panel),
                lowest down payment expectations. Most lenders fund
                these without an inspection report.
              </li>
              <li>
                <strong>5–7 years old, 400K–600K miles.</strong> Mid-
                pricing tier. Most lenders require a vehicle inspection
                report; terms typically 48 months. Down payment
                expectations 10%–15% for sub-680 credit.
              </li>
              <li>
                <strong>8–10 years old, 600K–900K miles.</strong> Higher-
                end of the observed APR range; terms shorter (36–48
                months). Down payment expectations 15%–25%. Inspection
                report typically required.
              </li>
              <li>
                <strong>10+ years old or 900K+ miles.</strong> Narrow
                panel. Salvage and rebuilt titles usually unfundable.
                Down payment expectations 20%+, terms 24–36 months,
                APR at the top of the observed range.
              </li>
              <li>
                <strong>New (current model year).</strong> Often above
                the published $25K–$250K loan range and routes to
                separate products not shown on the landing page.
              </li>
            </ul>
          </div>
        </section>

        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">Composite scenario</span>
            <h2 className="ins-hero-title">
              A used Class 8 purchase request.
            </h2>
            <p className="ins-hero-sub">
              Composite illustrative scenario — not a specific borrower.
              See <Link href="/methodology#composite-scenarios">methodology</Link>.
            </p>
            <div className="product-example">
              <div className="product-example-meta">
                <span className="product-example-label">Operator</span>
                <span className="product-example-value">
                  Owner-operator, 1 truck, 3 years operating under own
                  authority, FICO 695, $60K monthly revenue.
                </span>
              </div>
              <div className="product-example-meta">
                <span className="product-example-label">Situation</span>
                <span className="product-example-value">
                  Replacing aging truck with a 2021 Cascadia, $78K from
                  a regional dealer, 380K miles, clean title. 10% down
                  available from operating cash.
                </span>
              </div>
              <div className="product-example-meta">
                <span className="product-example-label">Estimator output</span>
                <span className="product-example-value">
                  Best fit: <strong>Equipment financing</strong>. Direct-
                  to-dealer wire after title work coordinates. 60-month
                  term, lien held until paid off.
                </span>
              </div>
              <div className="product-example-meta">
                <span className="product-example-label">APR band</span>
                <span className="product-example-value mono">
                  9% – 13% APR (observed panel range for this credit
                  tier and equipment age; final APR set by the chosen
                  lender)
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">How the money moves</span>
            <h2 className="ins-hero-title">From application to title.</h2>
            <ol className="product-process">
              <li><strong>Application.</strong> Two minutes inside <Link href="/apply">/apply</Link>. Revenue, time in business, the truck, the seller. Soft-pull only.</li>
              <li><strong>Soft-pull match.</strong> Redacted profile to the panel subset that funds the truck&rsquo;s make / age / mileage and your credit band.</li>
              <li><strong>Offers.</strong> APR, term, total cost, down payment requirement on each term sheet, side by side, before any hard pull.</li>
              <li><strong>One hard pull.</strong> Only after you pick a specific lender and decide to move forward.</li>
              <li><strong>Title work + wire.</strong> Lender coordinates the title and lien filing with the seller and the state. Wire goes out once title clears.</li>
            </ol>
          </div>
        </section>

        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">FAQ</span>
            <h2 className="ins-hero-title">
              Questions about semi truck financing.
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
              Buy the tractor. Run the freight. Pay it off.
            </h2>
            <p className="ins-hero-sub">
              Soft-pull match first. One hard pull only with the lender
              you choose.
            </p>
            <div className="product-hero-ctas">
              <Link href="/apply?useCase=equipment" className="btn btn--primary btn--lg">
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
              <li><Link href="/equipment-financing">Equipment financing (broader category) →</Link></li>
              <li><Link href="/box-truck-financing">Box truck financing →</Link></li>
              <li><Link href="/owner-operator-financing">Owner-operator financing →</Link></li>
              <li><Link href="/new-authority-truck-financing">New authority truck financing →</Link></li>
              <li><Link href="/methodology">How we describe APR ranges →</Link></li>
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
