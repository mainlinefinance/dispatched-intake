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

export const metadata: Metadata = {
  title: "New authority truck financing — under 12mo | Dispatched",
  description:
    "Truck financing for operators with new MC authority (under 12 months). Equipment loans and working capital. FICO from 500. Soft-pull match. Apply now.",
  alternates: { canonical: "/new-authority-truck-financing" },
  openGraph: {
    title: "New authority truck financing — under 12mo | Dispatched",
    description:
      "Truck financing for operators with new MC authority (under 12 months). Equipment loans and working capital. FICO from 500. Soft-pull match. Apply now.",
    url: "/new-authority-truck-financing",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "New authority truck financing — under 12mo | Dispatched",
    description:
      "Truck financing for operators with new MC authority (under 12 months). Equipment loans and working capital. FICO from 500. Soft-pull match. Apply now.",
  },
};

const PAGE_URL = "https://dispatched.finance/new-authority-truck-financing";

const faqs = [
  {
    q: "Just got my MC authority — how do I finance my first truck?",
    a: "Equipment-secured loans are the dominant first-truck product for new MC authority — typically 14% to 18% APR with a 15% to 25% down payment requirement. The loan is secured by the financed tractor or trailer, which compensates for the limited operating history; the lender files a UCC-1 against the equipment and underwrites the deal on the asset value plus the operator's down payment, personal credit, and any existing deposit history. Apply at /qualify; the soft-pull match returns 2 to 4 lender offers in roughly 20 minutes.",
  },
  {
    q: "Can I get truck financing with new MC authority?",
    a: "Yes. The Dispatched panel includes lenders who specifically underwrite operators under 12 months of MC authority. Programs are narrower than for seasoned operators — primarily equipment-secured loans and smaller working-capital lines — and expect a higher APR and a larger down payment requirement until the revenue history matures past the 12-month mark.",
  },
  {
    q: "How long do I need to have my MC authority before I can borrow?",
    a: "There is no fixed minimum on the Dispatched panel; lenders underwrite as early as the first month of active authority if the operator has trucking-related industry experience (prior W-2 driving, dispatched fleet ownership, or prior owner-operator history). Operators with zero prior trucking experience and a brand-new authority typically wait 90 to 180 days of revenue before lenders fund.",
  },
  {
    q: "What revenue do I need with a new authority?",
    a: "Most working-capital programs require a minimum of $15K to $20K in monthly business deposits over the trailing three months — the same threshold as seasoned operators. Equipment loans size against the asset, not against revenue minimums. New-authority operators below the working-capital threshold should start with equipment-secured products or factoring.",
  },
  {
    q: "What APR should I expect as a new authority?",
    a: "Expect rates at the higher end of the panel ranges. Working capital quotes toward the 24% to 34% APR end of the 14% to 34% range; equipment-secured quotes toward the 14% to 18% APR end of the 9% to 18% range. As your operating history extends past 12 and 24 months, the same panel re-prices toward the lower end on subsequent applications.",
  },
  {
    q: "Can I get equipment financing as a new authority?",
    a: "Yes. Equipment-secured loans are the most accessible product for new authorities because the financed truck or trailer is collateral. Expect a 15% to 25% down payment requirement (versus 10% to 15% for seasoned operators) and a maximum term tied to the equipment's expected residual value at payoff. New-authority operators routinely fund tractors, trailers, and box trucks.",
  },
  {
    q: "What documents do I need as a new authority?",
    a: "Three months of business bank statements (or whatever you have if the authority is younger than 90 days), your EIN, MC and DOT numbers, a driver's license, and your most recent personal tax return. The personal tax return helps lenders bridge the underwriting gap when business history is short. For equipment loans, also include the title or dealer purchase order.",
  },
  {
    q: "Why are most lenders declining my new authority application?",
    a: "Most banks and dealer financing arms require 2 years of MC authority to fund. The Dispatched panel includes lenders who underwrite shorter histories because they evaluate revenue, equipment, and prior trucking experience instead of using authority age as a hard cutoff. That is the gap the new-authority program fills.",
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
          "Truck financing for operators with new MC authority (under 12 months). Equipment loans and working capital. FICO from 500. Soft-pull match.",
        url: PAGE_URL,
        category: "Commercial trucking financing",
      })} />
      <JsonLd payload={faqPage(faqs)} />

      <Nav />

      <main id="main-content" className="ins-page product-page">
        <section className="ins-hero product-hero">
          <div className="ins-container">
            <span className="ins-eyebrow">New authority financing</span>
            <h1 className="ins-hero-title">
              Equipment loans and working capital for new MC authority (under 12 months).
            </h1>
            <EditorialByline updated={today} />
            <p className="ins-hero-sub">
              The first 6–12 months under your own <Link href="/glossary/mc-number">MC number</Link> are the
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
              broker&rsquo;s credit, not yours) and higher-down-payment{" "}
              <Link href="/glossary/equipment-loan">equipment loan</Link> financing
              (where the truck itself is the lender&rsquo;s primary collateral).{" "}
              <Link href="/glossary/working-capital">Working capital</Link> lines
              are typically not available to under-6-month operators and
              available only on a narrow panel for 6–12 month operators.
            </p>
            <p className="ins-hero-sub">
              The honest version: rates on this panel run toward the high
              end of every observed band because the lenders pricing for
              new authority are pricing for the absence of operating
              history. Once you cross 12 months, the full panel becomes
              available — particularly once compliance items like the{" "}
              <Link href="/glossary/boc-3">BOC-3</Link> process agent,{" "}
              <Link href="/glossary/ucr">UCR</Link> registration,{" "}
              <Link href="/glossary/irp">IRP</Link> apportionment, and{" "}
              <Link href="/glossary/ifta">IFTA</Link> filings are clean —
              and the same operator profile prices materially lower. Most
              new-authority operators on our panel use factoring through
              their first 6–12 months and then move to working capital.
            </p>
            <p className="ins-hero-sub">
              Driver-side compliance matters too. Lenders look for a
              current <Link href="/glossary/dot-physical">DOT physical</Link>{" "}
              and valid <Link href="/glossary/medc-card">medical examiner&rsquo;s certificate (Med Card)</Link>{" "}
              on file, plus a daily{" "}
              <Link href="/glossary/dvir">DVIR</Link> habit that shows the
              truck is being inspected as required.
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
              <Link href="/factoring">
                /factoring
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
              <li><strong>Application.</strong> Two minutes inside <Link href="/apply">/apply</Link>. MC authority date, your <Link href="/glossary/dot-number">DOT number</Link>, the truck, brokers (if you have them). Soft-pull only.</li>
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
              <li><Link href="/trucking">All trucking financing products →</Link></li>
              <li><Link href="/factoring">Invoice factoring for truckers →</Link></li>
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
