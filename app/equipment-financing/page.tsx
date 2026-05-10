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
    "Equipment financing for trucking — trucks, trailers, gear — Dispatched",
  description:
    "Equipment financing for commercial trucking: tractors, trailers, reefers, lift gates, ELDs. Secured by the equipment, longer terms than working capital. Soft-pull match first; one hard pull only with the chosen lender.",
  alternates: { canonical: "/equipment-financing" },
};

const PAGE_URL = "https://dispatched.finance/equipment-financing";

const faqs = [
  {
    q: "What kinds of equipment can be financed?",
    a: "Class 8 tractors, day cabs, sleeper cabs, dry vans, reefers, flatbeds, step decks, lowboys, and box trucks are the dominant equipment types on our panel. Specialty trailers (tankers, bulk pneumatic, auto carriers) and add-ons (lift gates, ELDs, telematics, refrigeration units) are also financeable on most lenders, often as add-ons to the truck or trailer loan rather than standalone equipment.",
  },
  {
    q: "How does equipment financing differ from a working-capital line?",
    a: "Equipment financing is secured by the equipment being purchased; working capital is unsecured. The collateral changes the math: equipment loans typically have lower APRs (the marketing FAQ documents 9% – 18% APR for equipment loans secured by the truck, versus 14% – 34% for working capital), longer payback terms (24–60 months versus 6–24 months), and lower monthly payments. The trade-off is that the lender holds a lien on the equipment until the loan is paid off.",
  },
  {
    q: "Can I finance a used truck?",
    a: "Yes. Used Class 8 tractors are routinely financed on our panel; lenders look at the truck's age, mileage, and condition rather than only model year. Trucks more than 10 years old or with high mileage route to a smaller subset of the panel and price closer to the high end of the equipment-loan APR range. Salvage-title or rebuilt-title equipment is harder to finance and may not have a panel match.",
  },
  {
    q: "How much down payment will I need?",
    a: "Down payment requirements vary by lender, credit band, and equipment age. The published $25K–$250K range is the loan amount, not the purchase price; lenders often expect 10–20% down on used trucks for borrowers with 580–679 credit, and may waive down payment for stronger files (680+ FICO, 2+ years operating). The exact down payment requirement is on the term sheet before any hard pull.",
  },
  {
    q: "Will the lender pay the seller directly?",
    a: "Usually yes for dealer purchases — most equipment loans on our panel are issued direct-to-dealer with the title work coordinated between the lender, the dealer, and the borrower. For private-party purchases, lenders typically wire to an escrow or direct to the seller after title transfer, depending on state. The disbursement method is documented on the term sheet so you can see it before signing.",
  },
  {
    q: "Will applying hurt my credit?",
    a: "Not at the start. The Dispatched application is a soft-pull match — soft inquiries are not visible to other lenders and do not affect your credit score. A hard pull only happens after you pick a specific lender and move forward on their term sheet. Multiple hard pulls inside a 14-day rate-shopping window count as a single inquiry under standard credit-bureau policies.",
  },
  {
    q: "What documents will I need?",
    a: "The basics: last 3 months of business bank statements, EIN or SSN, DOT number, driver's license. For equipment loans we'll also need the bill of sale or purchase quote from the dealer/seller, and for loans over $75K the most-recent Schedule C or 1120. The lender may also request a vehicle inspection report or an independent appraisal for older equipment.",
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
        name: "Equipment financing for trucking",
        description:
          "Secured commercial financing for trucks, trailers, and trucking equipment, routed to a panel of trucking-friendly lenders.",
        url: PAGE_URL,
        category: "BusinessLoan",
      })} />
      <JsonLd payload={faqPage(faqs)} />
      <JsonLd payload={financialService({
        name: "Equipment Financing",
        // TODO(marketing): replace with copy from docs/seo/per-page-copy.md once landed
        description:
          "Equipment financing for commercial trucking — tractors, trailers, reefers, lift gates, ELDs. Secured by the equipment, longer terms than working capital. Soft-pull match first; one hard pull only with the lender you pick.",
        url: PAGE_URL,
        serviceType: "Commercial trucking equipment financing",
      })} />

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
              Secured by the equipment, longer payback than working
              capital, lower monthly payment. We route to lenders that
              fund Class 8 tractors, trailers, reefers, lift gates, and
              ELDs without the bank&rsquo;s two-year DSCR test.
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
              Equipment financing is a secured commercial loan: the lender
              holds a lien on the equipment until the loan is paid off, in
              exchange for a longer payback term and a lower APR than an
              unsecured working-capital line of the same amount. On our
              panel, equipment financing covers tractors, trailers, refer
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
                <strong>Active DOT number.</strong> The borrower&rsquo;s
                authority needs to be in good standing with FMCSA.
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
