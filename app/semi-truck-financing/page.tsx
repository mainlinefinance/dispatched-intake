import type { Metadata } from "next";
import Link from "next/link";
import EditorialByline from "@/components/landing/EditorialByline";
import Footer from "@/components/landing/Footer";
import Nav from "@/components/landing/Nav";
import PageTOC from "@/components/landing/PageTOC";
import StickyCTABar from "@/components/landing/StickyCTABar";
import {
  JsonLd,
  article,
  breadcrumbList,
  faqPage,
  financialProduct,
} from "@/components/seo/JsonLd";

const TOC_ITEMS = [
  { id: "what-it-is", label: "What semi truck financing is" },
  { id: "common-makes", label: "Common makes and conditions" },
  { id: "used-vs-new", label: "Used vs new" },
  { id: "composite-scenario", label: "Composite scenario" },
  { id: "how-the-money-moves", label: "How the money moves" },
  { id: "faq", label: "FAQ" },
] as const;

export const metadata: Metadata = {
  title: "Semi truck financing — Class 8 truck loans | Dispatched",
  description:
    "Class 8 semi truck loans for owner-operators and small fleets. Panel APR 9%–18%, terms to 72 months, FICO from 500. Soft-pull match. See your rate today.",
  alternates: { canonical: "/semi-truck-financing" },
  openGraph: {
    title: "Semi truck financing — Class 8 truck loans | Dispatched",
    description:
      "Class 8 semi truck loans for owner-operators and small fleets. Panel APR 9%–18%, terms to 72 months, FICO from 500. Soft-pull match. See your rate today.",
    url: "/semi-truck-financing",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Semi truck financing — Class 8 truck loans | Dispatched",
    description:
      "Class 8 semi truck loans for owner-operators and small fleets. Panel APR 9%–18%, terms to 72 months, FICO from 500. Soft-pull match. See your rate today.",
  },
};

const PAGE_URL = "https://dispatched.finance/semi-truck-financing";

const faqs = [
  {
    q: "Owner-operator buying a used Class 8 — how much down payment and what APR should I expect?",
    a: "Most used Class 8 tractor loans on the Dispatched panel fund with 10% to 20% down. Operators with 600+ FICO and 12+ months of MC authority typically quote 11% to 15% APR on tractors under 5 years old; older trucks (5 to 8 years), sub-580 FICO, or zero-down structures quote toward the 16% to 18% top of the 9% to 18% panel range. The lender appraises the truck and funds up to appraised value minus down payment — they do not finance over-market sticker prices, so confirm the VIN-level appraisal before signing with the seller.",
  },
  {
    q: "How much can I borrow for a semi truck?",
    a: "Loans on the Dispatched panel for Class 8 tractors typically range from $40K for older sleeper trucks to $200K for newer day cabs and premium sleepers. The amount is set by the truck's appraised value, the down payment, and the operator's revenue. Lenders fund up to the appraised value minus down payment; they do not finance over-market sticker prices.",
  },
  {
    q: "What APR should I expect on a semi truck loan?",
    a: "The observed equipment-loan panel range is 9% to 18% APR for tractors. Newer trucks (under 5 years), 600+ FICO, and a 15%+ down payment quote toward the low end. Trucks over 8 years old, sub-580 FICO, or zero-down structures quote toward the high end. The exact APR is on the term sheet before you sign.",
  },
  {
    q: "Can I get semi truck financing with bad credit?",
    a: "Yes. Programs route from a 500 FICO. The truck itself is collateral, so lenders on the Dispatched panel underwrite sub-650 borrowers more readily on tractors than on unsecured working capital. Sub-580 borrowers should plan for a higher APR, a larger down payment, and a shorter maximum term, but approval rates are higher than on unsecured products.",
  },
  {
    q: "Can I finance a used semi truck from a private seller?",
    a: "Yes. The lender requires a clean title, a current inspection, and a bill of sale that matches the appraised value. Private-party deals close more slowly than dealer sales because the title has to be pulled and the lien recorded before funds release. Plan for an extra 3 to 5 banking days versus a dealer transaction.",
  },
  {
    q: "What down payment do I need on a semi truck loan?",
    a: "Most semi truck loans on the Dispatched panel fund with 10% to 20% down. Zero-down and first-payment-deferred structures exist for operators with strong revenue history. Higher down payments lower the APR and shorten the term needed to keep the monthly payment manageable for the operation's revenue.",
  },
  {
    q: "How long can I finance a semi truck for?",
    a: "Terms run 24 to 72 months for tractors. Newer trucks (under 4 years) support the full 72 months; trucks 5 to 8 years old typically cap at 48 to 60 months; trucks over 8 years cap at 36 months. The lender sets the maximum term based on the truck's expected residual value at payoff.",
  },
  {
    q: "Do I need to be incorporated to finance a semi truck?",
    a: "No. Sole proprietors with an active DOT and MC number qualify on the Dispatched panel. LLCs and S-corps with two-plus years operating history typically see a slightly lower APR because the lender can underwrite the entity's bank statements directly. Both structures fund.",
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
          "Class 8 semi truck loans for owner-operators and small fleets. Panel APR 9%–18%, terms to 72 months, FICO from 500. Soft-pull match.",
        url: PAGE_URL,
        category: "Equipment financing",
      })} />
      <JsonLd payload={faqPage(faqs)} />

      <Nav />

      <main id="main-content" className="ins-page product-page">
        <section className="ins-hero product-hero">
          <div className="ins-container">
            <span className="ins-eyebrow">Semi truck financing</span>
            <h1 className="ins-hero-title">
              Class 8 semi truck loans for owner-operators — Cascadia, T680, 579, VNL, Anthem.
            </h1>
            <EditorialByline updated={today} />
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

        <PageTOC items={TOC_ITEMS} />

        <section id="what-it-is" className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">The short answer</span>
            <h2 className="ins-hero-title">What semi truck financing is.</h2>
            <p className="ins-hero-sub">
              Semi truck financing is the Class 8 subset of equipment
              financing — secured by the truck, with the lender holding
              a lien until the loan is paid off. The structure is the
              same as the broader <Link href="/glossary/equipment-loan">equipment loan</Link> product (
              <Link href="/equipment-financing">/equipment-financing</Link>),
              but the panel routing reflects the specific equipment
              class: term lengths, pricing, and down-payment
              expectations are calibrated to Class 8 resale dynamics.
            </p>
            <p className="ins-hero-sub">
              The defining trade-off vs a <Link href="/glossary/working-capital">working capital</Link> line is the
              lien. Equipment financing has a security interest in the
              truck; selling or replacing the truck requires
              coordinating with the lender. In exchange, the
              equipment-loan APR band runs 9%–18% versus the 14%–34%
              band on working capital, and term lengths run 36–60
              months instead of 6–24 (see{" "}
              <Link href="/methodology#finance-rates">methodology</Link>).
              On the tax side, the truck itself is depreciable property
              eligible for <Link href="/glossary/macrs-depreciation">MACRS depreciation</Link> and, in many cases,{" "}
              <Link href="/glossary/section-179">Section 179</Link> expensing in the year placed in service.
            </p>
          </div>
        </section>

        <section id="common-makes">
          <div className="ins-container">
            <span className="ins-eyebrow">Common makes and conditions</span>
            <h2 className="ins-hero-title">What the panel routinely finances.</h2>
            <ul className="product-list">
              <li>
                <strong>Freightliner Cascadia.</strong> The most-
                financed Class 8 tractor on our panel by volume — the
                workhorse for <Link href="/glossary/otr">OTR</Link> <Link href="/glossary/sleeper-berth">sleeper berth</Link> operations.
                Wide lender availability across model years 2018–2024;
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

        <section id="used-vs-new" className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">Used vs new</span>
            <h2 className="ins-hero-title">How loan terms shift by truck age.</h2>
            <ul className="product-list">
              <li>
                <strong>0–4 years old, under 400K miles.</strong> Best
                pricing, longest terms (up to 60 months on our panel),
                lowest down payment expectations. Most lenders fund
                these without an inspection report. See our deeper guide
                on{" "}
                <Link href="/semi-truck-financing/no-money-down">
                  no money down semi truck financing
                </Link>{" "}
                for which profiles qualify for zero-down structures.
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
            <p className="ins-hero-sub">
              A <Link href="/glossary/dash-cam">dash cam</Link> and a clean log of
              compliance with the <Link href="/glossary/hos-11-hour-rule">HOS 11-hour rule</Link> both
              show up in underwriting as positive signals — they reduce
              perceived loss frequency and can move the APR within the
              observed band.
            </p>
          </div>
        </section>

        <section id="composite-scenario">
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
                  <Link href="/glossary/owner-operator">Owner-operator</Link>, 1 truck, 3 years operating under own
                  authority with an active <Link href="/glossary/mc-number">MC number</Link> and{" "}
                  <Link href="/glossary/dot-number">DOT number</Link>, FICO 695, $60K monthly revenue.
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

        <section id="how-the-money-moves" className="ins-sunken">
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

        <section id="faq">
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
              <li><Link href="/trucking">All trucking financing products →</Link></li>
              <li><Link href="/equipment-financing">Equipment financing (broader category) →</Link></li>
              <li><Link href="/box-truck-financing">Box truck financing →</Link></li>
              <li><Link href="/owner-operator-financing">Owner-operator financing →</Link></li>
              <li><Link href="/new-authority-truck-financing">New authority truck financing →</Link></li>
              <li><Link href="/methodology">How we describe APR ranges →</Link></li>
            </ul>
          </div>
        </section>
      </main>

      <StickyCTABar
        text="See your semi truck financing options"
        primaryCtaHref="/apply?useCase=equipment"
        primaryCtaLabel="See my options →"
      />

      <Footer />
    </div>
  );
}
