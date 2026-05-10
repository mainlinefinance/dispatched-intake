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
    "New authority truck financing — Dispatched",
  description:
    "Trucking financing for owner-operators in the first year of MC authority. Narrower panel than seasoned operators; factoring is often the right first product. Soft-pull match first.",
  alternates: { canonical: "/new-authority-truck-financing" },
};

const PAGE_URL = "https://dispatched.finance/new-authority-truck-financing";

const faqs = [
  {
    q: "What counts as 'new authority' on this panel?",
    a: "New authority generally means under 12 months from the date your USDOT or MC authority went active. Some lenders draw the line at 6 months. Operating history before authority (driving as a company driver, leased to a carrier) doesn't count toward the under-authority clock for most panel lenders, though some weigh it positively in underwriting.",
  },
  {
    q: "Why is new authority harder to finance?",
    a: "Most commercial lenders use 12–24 months of independent operating history as a baseline underwriting input. Without that history, lenders are pricing on credit and equipment alone, which produces a smaller panel and higher rates. The panel that does fund new-authority operators specializes in this segment and typically requires either factoring (where the broker's credit substitutes for the trucker's history) or higher-down-payment equipment financing.",
  },
  {
    q: "What's the most common product for a new-authority operator?",
    a: "Invoice factoring. The factor underwrites the broker's credit (the entity paying the invoice) rather than the trucker's operating history, which makes factoring available to operators that traditional lenders won't fund yet. Many new-authority owner-ops use factoring for their first 6–12 months and graduate to working-capital lines once they have a track record.",
  },
  {
    q: "Can I finance my first truck purchase as a new-authority operator?",
    a: "Yes, but with caveats. Equipment financing for first-truck purchases by new-authority operators routes to a smaller subset of the panel — typically lenders that fund this segment with higher down payments (often 20%+ for sub-680 credit) and shorter loan terms. The truck's age and condition matter more than for seasoned operators because the equipment is the lender's primary collateral.",
  },
  {
    q: "What credit score do I need as a new-authority operator?",
    a: "Credit weighs more heavily for new-authority files because operating history is the missing input. The 500 FICO panel floor still applies, but rates land toward the high end of every observed band. 620+ noticeably widens the panel; 680+ unlocks pricing closer to the seasoned-operator equivalent.",
  },
  {
    q: "Will applying hurt my credit?",
    a: "Not at the start. The Dispatched application is a soft-pull match — soft inquiries are not visible to other lenders and do not affect your credit score. A hard pull only happens after you pick a specific lender (or factor) and move forward.",
  },
  {
    q: "What documents will I need?",
    a: "MC authority letter from FMCSA, last 3 months of business bank statements (even if minimal), EIN or SSN, driver's license. For factoring applications, also a list of the brokers you're working with. For first-truck equipment purchases, the bill of sale or dealer quote. Some lenders may request the operating agreement if you're an LLC and the entity formation paperwork.",
  },
];

export default function NewAuthorityFinancingPage() {
  const today = new Date().toISOString().slice(0, 10);
  return (
    <div className="landing">
      <JsonLd payload={breadcrumbList([
        { name: "Home", url: "https://dispatched.finance/" },
        { name: "New authority financing", url: PAGE_URL },
      ])} />
      <JsonLd payload={article({
        headline: "New authority truck financing for first-year operators",
        description:
          "Financing options for trucking owner-operators in the first year under their own MC authority: factoring, equipment financing, and the panel routing for under-12-month operators.",
        url: PAGE_URL,
        datePublished: today,
        dateModified: today,
      })} />
      <JsonLd payload={financialProduct({
        name: "New authority truck financing",
        description:
          "Commercial financing options for trucking operators in the first year of MC authority — factoring, equipment financing, and limited working-capital products.",
        url: PAGE_URL,
        category: "BusinessLoan",
      })} />
      <JsonLd payload={faqPage(faqs)} />
      <JsonLd payload={financialService({
        name: "New Authority Truck Financing",
        // TODO(marketing): replace with copy from docs/seo/per-page-copy.md once landed
        description:
          "Trucking financing for owner-operators in the first year of MC authority. Narrower panel than seasoned operators; factoring and equipment financing are the most accessible products. Soft-pull match first.",
        url: PAGE_URL,
        serviceType: "Commercial trucking financing",
      })} />

      <Nav />

      <main id="main-content" className="ins-page product-page">
        <section className="ins-hero product-hero">
          <div className="ins-container">
            <span className="ins-eyebrow">New authority financing</span>
            <h1 className="ins-hero-title">
              Financing in your first year under your own authority.
            </h1>
            <p className="ins-hero-sub">
              The first 6–12 months under your own MC authority are the
              hardest to finance. Most commercial lenders want 12+
              months of independent history; the panel that does fund
              new-authority operators specializes in this segment, and
              factoring is usually the right first product.
            </p>
            <div className="product-hero-ctas">
              <Link href="/apply?useCase=other" className="btn btn--primary btn--lg">
                See my financing options →
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
            <h2 className="ins-hero-title">
              How new-authority operators get capital.
            </h2>
            <p className="ins-hero-sub">
              Two products dominate the new-authority segment on our
              panel: invoice factoring (where the factor underwrites the
              broker&rsquo;s credit, not yours) and higher-down-payment
              equipment financing (where the truck itself is the
              lender&rsquo;s primary collateral). Working-capital lines
              are typically not available to under-6-month operators and
              available only on a narrow panel for 6–12 month operators.
            </p>
            <p className="ins-hero-sub">
              The honest version: rates on this panel run toward the high
              end of every observed band because the lenders pricing for
              new authority are pricing for the absence of operating
              history. Once you cross 12 months, the full panel becomes
              available and the same operator profile prices materially
              lower. Most new-authority operators on our panel use
              factoring through their first 6–12 months and then move to
              working capital.
            </p>
          </div>
        </section>

        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">Path A — Invoice factoring</span>
            <h2 className="ins-hero-title">
              The most common first product.
            </h2>
            <p className="ins-hero-sub">
              Factoring sells your outstanding invoices to a factor for
              an immediate cash advance — usually 90–98% of face value,
              minus a per-invoice fee. The factor underwrites the
              broker&rsquo;s credit (the entity paying the invoice),
              which means a new-authority trucker working with strong
              brokers can get factored at competitive fees from day one.
            </p>
            <p className="ins-hero-sub">
              For a deeper read on factoring mechanics, recourse vs
              non-recourse, and what the fees actually look like, see{" "}
              <Link href="/invoice-factoring-for-truckers">
                /invoice-factoring-for-truckers
              </Link>.
            </p>
          </div>
        </section>

        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">Path B — Equipment financing</span>
            <h2 className="ins-hero-title">
              Buying the first truck under new authority.
            </h2>
            <p className="ins-hero-sub">
              Equipment financing for new-authority first-truck purchases
              routes to a narrower subset of the panel. The truck&rsquo;s
              condition and age, the borrower&rsquo;s credit, and the
              down payment all weigh more heavily than for seasoned
              operators.
            </p>
            <ul className="product-list">
              <li>
                <strong>Down payment expectation: 15%–25%.</strong> Higher
                than seasoned-operator equipment loans. Stronger credit
                (680+) and newer equipment can push the requirement
                lower.
              </li>
              <li>
                <strong>Term lengths: 24–48 months.</strong> Shorter
                than the 60-month terms available to seasoned operators
                on the same equipment.
              </li>
              <li>
                <strong>APR band: 12% – 22% APR.</strong> Top of the
                observed equipment-loan range; factor in the down
                payment and the shorter term when comparing total cost
                versus a working-capital line later in your operating
                history.
              </li>
              <li>
                <strong>
                  Salvage and rebuilt titles are usually unfundable.
                </strong>{" "}
                For new-authority first-truck purchases, the equipment
                needs a clean title and verifiable condition.
              </li>
            </ul>
          </div>
        </section>

        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">Composite scenario</span>
            <h2 className="ins-hero-title">
              A 4-month new-authority operator file.
            </h2>
            <p className="ins-hero-sub">
              Composite illustrative scenario — not a specific borrower.
              See <Link href="/methodology#composite-scenarios">methodology</Link>.
            </p>
            <div className="product-example">
              <div className="product-example-meta">
                <span className="product-example-label">Operator</span>
                <span className="product-example-value">
                  Owner-operator, 1 truck (financed), 4 months under own
                  MC authority, 6 years prior driving experience as a
                  company driver, FICO 640.
                </span>
              </div>
              <div className="product-example-meta">
                <span className="product-example-label">Situation</span>
                <span className="product-example-value">
                  Cash flow gap. Brokers paying Net-30 to Net-45;
                  operator needs capital to cover fuel between
                  receivables. Working capital is too early at 4 months.
                </span>
              </div>
              <div className="product-example-meta">
                <span className="product-example-label">Estimator output</span>
                <span className="product-example-value">
                  Best fit: <strong>Invoice factoring</strong> for the
                  Net-30 and Net-45 broker invoices. Working capital
                  becomes available after the operator crosses 6 months
                  with consistent revenue.
                </span>
              </div>
              <div className="product-example-meta">
                <span className="product-example-label">Fee band</span>
                <span className="product-example-value mono">
                  ~3% – 4% per invoice (typical trucking-factor range
                  for new authority with these payment terms; final
                  fee on the factoring agreement)
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">How the money moves</span>
            <h2 className="ins-hero-title">From application to first advance.</h2>
            <ol className="product-process">
              <li><strong>Application.</strong> Two minutes inside <Link href="/apply">/apply</Link>. MC authority date, the truck, brokers (if you have them). Soft-pull only.</li>
              <li><strong>Soft-pull match.</strong> Redacted profile to the panel subset that funds new-authority operators (factors and the equipment-finance subset).</li>
              <li><strong>Offers.</strong> Factor agreements + equipment loan term sheets, side by side, before any hard pull or factoring agreement signature.</li>
              <li><strong>One commitment.</strong> Pick a factor or a lender. Factoring agreements aren&rsquo;t loans, but they are commitments — read the recourse clause.</li>
              <li><strong>Onboarding + advance.</strong> Factoring: Notice of Assignment + first invoice within days. Equipment: title work + dealer wire.</li>
            </ol>
          </div>
        </section>

        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">FAQ</span>
            <h2 className="ins-hero-title">
              Questions new-authority operators ask.
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
              Run the first 12 months. The panel widens after.
            </h2>
            <p className="ins-hero-sub">
              Soft-pull match first. One factoring agreement or term
              sheet only with the partner you choose.
            </p>
            <div className="product-hero-ctas">
              <Link href="/apply?useCase=other" className="btn btn--primary btn--lg">
                See my financing options →
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
              <li><Link href="/invoice-factoring-for-truckers">Invoice factoring for truckers →</Link></li>
              <li><Link href="/equipment-financing">Equipment financing →</Link></li>
              <li><Link href="/owner-operator-financing">Owner-operator financing →</Link></li>
              <li><Link href="/methodology">Methodology →</Link></li>
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
