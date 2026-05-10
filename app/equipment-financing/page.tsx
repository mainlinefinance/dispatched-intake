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
  title: "Trucking equipment financing 9–18% APR | Dispatched",
  description:
    "Equipment loans for tractors, trailers, reefers, and lift gates. Panel APR 9%–18%, terms to 72 months, FICO from 500. Soft-pull match. Get matched today.",
  alternates: { canonical: "/equipment-financing" },
  openGraph: {
    title: "Trucking equipment financing 9–18% APR | Dispatched",
    description:
      "Equipment loans for tractors, trailers, reefers, and lift gates. Panel APR 9%–18%, terms to 72 months, FICO from 500. Soft-pull match. Get matched today.",
    url: "/equipment-financing",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trucking equipment financing 9–18% APR | Dispatched",
    description:
      "Equipment loans for tractors, trailers, reefers, and lift gates. Panel APR 9%–18%, terms to 72 months, FICO from 500. Soft-pull match. Get matched today.",
  },
};

const PAGE_URL = "https://dispatched.finance/equipment-financing";

const faqs = [
  {
    q: "What can I finance with a trucking equipment loan?",
    a: "Any titled commercial vehicle or attached equipment used in the operation. Tractors, day cabs, sleepers, dry vans, reefers, flatbeds, dump trailers, lowboys, lift gates, APUs, and on-board reefer units all qualify. The lender takes a first-position lien on the financed asset, and the asset's market value supports a longer term and a lower APR than working capital.",
  },
  {
    q: "What APR should I expect on a trucking equipment loan?",
    a: "The observed panel range is 9% to 18% APR for equipment loans secured by the financed asset. APR depends on credit band, age and mileage of the equipment, term length, and down payment. New equipment with a higher down payment and a 600+ FICO quotes toward the low end; older equipment, no down payment, or sub-580 FICO quotes toward the high end.",
  },
  {
    q: "How much down payment do I need on an equipment loan?",
    a: "Most equipment loans on the Dispatched panel fund with 10% to 20% down. Programs exist for zero-down and first-payment-deferred structures depending on the asset, the operator's revenue history, and the lender. Higher down payments lower the APR and shorten the term needed to keep the monthly payment manageable.",
  },
  {
    q: "Can I get equipment financing with bad credit?",
    a: "Yes. Programs route from a 500 FICO. Equipment loans are easier to underwrite at lower credit bands than working capital because the lender holds collateral on the asset. Sub-580 borrowers should expect a higher APR, a larger down payment requirement, and a shorter maximum term, but approval rates are higher than on unsecured products.",
  },
  {
    q: "How long are typical trucking equipment loan terms?",
    a: "Terms run 24 to 72 months for tractors and 24 to 60 months for trailers. Newer equipment supports the longer end; equipment over five years old typically caps at 48 months. The lender sets the maximum term based on the asset's expected residual value at payoff — a 2018 tractor financed in 2026 will not stretch to 72 months.",
  },
  {
    q: "Can I finance used equipment from a private seller?",
    a: "Yes, with conditions. The lender requires a clean title, a current inspection (DOT or independent), and a bill of sale that matches the appraised value. Private-party sales close more slowly than dealer sales because the lender needs the title pulled and the lien recorded before funds release. Plan for an extra 3 to 5 banking days versus a dealer transaction.",
  },
  {
    q: "Will applying for equipment financing hurt my credit?",
    a: "Not at the start. The Dispatched application is a soft-pull match — soft inquiries are not visible to other lenders and do not affect your score. A hard pull only happens after you pick a specific lender and move forward on their term sheet.",
  },
];

export default function EquipmentFinancingPage() {
  const today = new Date().toISOString().slice(0, 10);
  return (
    <div className="landing">
      <JsonLd payload={breadcrumbList([
        { name: "Home", url: "https://dispatched.finance/" },
        { name: "Equipment financing", url: PAGE_URL },
      ])} />
      <JsonLd payload={article({
        headline: "Equipment financing for commercial trucking",
        description:
          "How equipment financing works on the Dispatched panel: which equipment types are funded, how it differs from working capital, and what to expect from the application flow.",
        url: PAGE_URL,
        datePublished: today,
        dateModified: today,
      })} />
      <JsonLd payload={financialProduct({
        name: "Trucking equipment financing",
        description:
          "Equipment loans for tractors, trailers, reefers, and lift gates. Panel APR 9%–18%, terms to 72 months, FICO from 500. Soft-pull match.",
        url: PAGE_URL,
        category: "Equipment financing",
      })} />
      <JsonLd payload={faqPage(faqs)} />

      <Nav />

      <main id="main-content" className="ins-page product-page">
        {/* SECTION: HERO */}
        <section className="ins-hero product-hero">
          <div className="ins-container">
            <span className="ins-eyebrow">Equipment financing</span>
            <h1 className="ins-hero-title">
              Equipment financing for trucks, trailers, and trucking gear.
            </h1>
            <p className="ins-hero-sub">
              Secured by the equipment, longer payback than{" "}
              <Link href="/glossary/working-capital">working capital</Link>,
              lower monthly payment. We route to lenders that
              fund Class 8 tractors, trailers, <Link href="/glossary/reefer">reefers</Link>,
              lift gates, and <Link href="/glossary/eld">ELDs</Link> without the bank&rsquo;s two-year DSCR test.
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

        {/* SECTION: SHORT ANSWER */}
        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">The short answer</span>
            <h2 className="ins-hero-title">What equipment financing covers.</h2>
            <p className="ins-hero-sub">
              Equipment financing is a secured commercial loan — a classic{" "}
              <Link href="/glossary/equipment-loan">equipment loan</Link> structure where the lender
              holds a lien on the equipment until the loan is paid off, in
              exchange for a longer payback term and a lower APR than an
              unsecured working-capital line of the same amount. On our
              panel, equipment financing covers tractors,{" "}
              <Link href="/glossary/dry-van">dry vans</Link>,{" "}
              <Link href="/glossary/flatbed">flatbeds</Link>, reefer
              units, lift gates, ELDs, telematics, and most other
              revenue-generating trucking equipment.
            </p>
            <p className="ins-hero-sub">
              The structural trade-off is the lien. While the loan is
              outstanding, the lender has a security interest in the
              equipment; selling or replacing the equipment requires
              coordinating with the lender. In exchange, the equipment-loan
              APR band on our panel runs 9% – 18% versus the 14% – 34%
              band on working-capital lines (see{" "}
              <Link href="/methodology#finance-rates">methodology</Link>).
              Most structures are fixed-payment <Link href="/glossary/term-loan">term loans</Link>;
              a smaller subset offers a <Link href="/glossary/balloon-payment">balloon payment</Link> at maturity to keep monthly cost lower.
            </p>
          </div>
        </section>

        {/* SECTION: ELIGIBILITY */}
        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">Who qualifies</span>
            <h2 className="ins-hero-title">Eligibility floors.</h2>
            <ul className="product-list">
              <li>
                <strong>1+ year of operating history.</strong> Equipment
                financing is the panel product with the strongest tenure
                requirement; most lenders want at least 12 months of
                business operation under your authority. New-authority
                operators route to{" "}
                <Link href="/new-authority-truck-financing">
                  /new-authority-truck-financing
                </Link>
                .
              </li>
              <li>
                <strong>500+ FICO panel floor.</strong> Below 580, expect
                rates on the higher end of the 9%–18% range, a tighter
                maximum loan amount, and a higher down payment requirement.
                680+ unlocks the panel&rsquo;s best equipment-loan pricing.
              </li>
              <li>
                <strong>Active <Link href="/glossary/dot-number">DOT number</Link>.</strong> The borrower&rsquo;s
                authority needs to be in good standing with <Link href="/glossary/fmcsa">FMCSA</Link>.
                Recently revoked or out-of-service authorities go to a
                smaller subset of lenders.
              </li>
              <li>
                <strong>Equipment with a clean title.</strong> Used
                equipment is fundable on most lenders; salvage-title or
                rebuilt-title trucks may not have a panel match.
                Equipment more than 10 years old or with very high
                mileage routes to a smaller subset.
              </li>
              <li>
                <strong>Bill of sale or purchase quote.</strong> Required
                at the application step — equipment loans need to be
                anchored to a specific piece of equipment with a
                documented price.
              </li>
            </ul>
          </div>
        </section>

        {/* SECTION: COMPOSITE EXAMPLE */}
        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">Composite scenario</span>
            <h2 className="ins-hero-title">
              What an equipment-financed request looks like.
            </h2>
            <p className="ins-hero-sub">
              Composite illustrative scenario — not a specific borrower.
              See <Link href="/methodology#composite-scenarios">methodology</Link>.
            </p>
            <div className="product-example">
              <div className="product-example-meta">
                <span className="product-example-label">Operator</span>
                <span className="product-example-value">
                  Small fleet, 4 tractors + 6 trailers, 5 years operating,
                  primarily Midwest van freight, fleet owner FICO 685.
                </span>
              </div>
              <div className="product-example-meta">
                <span className="product-example-label">Situation</span>
                <span className="product-example-value">
                  Adding a fifth tractor — used 2021 Cascadia, $85K
                  purchase from a regional dealer. 15% down available
                  from operating cash.
                </span>
              </div>
              <div className="product-example-meta">
                <span className="product-example-label">
                  Estimator output
                </span>
                <span className="product-example-value">
                  Best fit: <strong>Equipment financing</strong>. Direct-to-
                  dealer wire after title work coordinates. 48-month term,
                  lien held until paid off.
                </span>
              </div>
              <div className="product-example-meta">
                <span className="product-example-label">APR band</span>
                <span className="product-example-value mono">
                  9% – 12% APR (observed panel range for this credit tier
                  with stable revenue and clean equipment; final APR set
                  by the chosen lender)
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: PROCESS */}
        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">How the money moves</span>
            <h2 className="ins-hero-title">From application to title.</h2>
            <ol className="product-process">
              <li>
                <strong>Application.</strong> Two minutes inside{" "}
                <Link href="/apply">/apply</Link>. Revenue, time in
                business, the equipment, the seller. Soft-pull only.
              </li>
              <li>
                <strong>Soft-pull match.</strong> Redacted profile to the
                panel subset that funds the equipment type and your
                credit band.
              </li>
              <li>
                <strong>Offers.</strong> APR, term, total cost, down
                payment requirement on each term sheet, side by side,
                before any hard pull.
              </li>
              <li>
                <strong>One hard pull.</strong> Only after you pick a
                specific lender and move forward.
              </li>
              <li>
                <strong>Title work + wire.</strong> Lender coordinates the
                title and lien filing with the seller and the state.
                Wire goes out to the dealer (or escrow for private-party
                deals) once title clears.
              </li>
            </ol>
          </div>
        </section>

        {/* SECTION: FAQ */}
        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">FAQ</span>
            <h2 className="ins-hero-title">
              Questions about equipment financing.
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

        {/* SECTION: FINAL CTA */}
        <section>
          <div className="ins-container">
            <h2 className="ins-hero-title">
              Buy the equipment, finance the lien, run the work.
            </h2>
            <p className="ins-hero-sub">
              Soft-pull match first. One hard pull only with the lender
              you choose.
            </p>
            <div className="product-hero-ctas">
              <Link
                href="/apply?useCase=equipment"
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

        {/* SECTION: RELATED */}
        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">Related</span>
            <ul className="product-related">
              <li><Link href="/trucking">All trucking financing products →</Link></li>
              <li><Link href="/semi-truck-financing">Semi truck financing →</Link></li>
              <li><Link href="/box-truck-financing">Box truck financing →</Link></li>
              <li><Link href="/owner-operator-financing">Owner-operator financing →</Link></li>
              <li><Link href="/trucking-working-capital">Trucking working capital →</Link></li>
              <li><Link href="/methodology">How we describe APR ranges →</Link></li>
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
