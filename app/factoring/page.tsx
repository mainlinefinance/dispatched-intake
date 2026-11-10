import { contentDates } from "@/lib/seo/contentDates";
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
  { id: "what-it-is", label: "Factoring isn't a loan" },
  { id: "when-it-fits", label: "When factoring fits" },
  { id: "when-it-doesnt", label: "When working capital is better" },
  { id: "composite-scenario", label: "Composite scenario" },
  { id: "onboarding", label: "Onboarding to first advance" },
  { id: "faq", label: "FAQ" },
] as const;

export const metadata: Metadata = {
  title: "Invoice Factoring for Truckers | Dispatched",
  description:
    "Turn broker and shipper invoices into working cash. Recourse and non-recourse factoring matched to your lanes; factors underwrite your brokers' credit.",
  alternates: { canonical: "/factoring" },
  openGraph: {
    images: ["/opengraph-image"],
    title: "Invoice Factoring for Truckers | Dispatched",
    description:
      "Turn broker and shipper invoices into working cash. Recourse and non-recourse factoring matched to your lanes; factors underwrite your brokers' credit.",
    url: "/factoring",
    type: "website",
  },
  twitter: {
    images: ["/opengraph-image"],
    card: "summary_large_image",
    title: "Invoice Factoring for Truckers | Dispatched",
    description:
      "Turn broker and shipper invoices into working cash. Recourse and non-recourse factoring matched to your lanes; factors underwrite your brokers' credit.",
  },
};

const PAGE_URL = "https://dispatched.finance/factoring";

const faqs = [
  {
    q: "How does invoice factoring for truckers work?",
    a: "You submit a paid load's bill of lading and broker invoice to the factoring company. The factor advances 85% to 97% of the invoice face value, then collects the full payment from the broker on net-30 to net-90 terms. Once the broker pays, the factor releases the reserve (the 3% to 15% held back) minus their fee. You get most of the invoice up front instead of waiting out the broker's payment terms; advance timing depends on the factor and your invoices.",
  },
  {
    q: "How much does invoice factoring cost?",
    a: "Factoring fees on the Dispatched panel typically run 1% to 4% of the invoice face value, depending on whether the structure is recourse or non-recourse, the broker's credit, the volume you factor monthly, and the average days-to-pay. Higher-volume operators with strong broker mixes quote toward 1% to 2%; smaller operators or weaker broker mixes quote toward 3% to 4%.",
  },
  {
    q: "What is the difference between recourse and non-recourse factoring?",
    a: "With recourse factoring, you are on the hook to repay the advance if the broker does not pay the invoice. With non-recourse factoring, the factor absorbs the credit loss when a broker goes insolvent. Non-recourse costs more (typically 0.5% to 1.5% higher) but eliminates the operator's exposure to broker bankruptcy. Most non-recourse contracts still leave the operator liable for disputes that are not credit failures.",
  },
  {
    q: "Can I factor invoices with bad credit?",
    a: "Yes. Factoring underwrites the broker's credit, not the operator's, because the broker is the entity actually paying the invoice. Operators with lower credit profiles regularly use factoring. The factor checks the operator for fraud history and active bankruptcies, but FICO score itself is not the underwriting driver.",
  },
  {
    q: "How fast does invoice factoring fund?",
    a: "Advance timing depends on the factor and your invoices. Each factor has a daily submission cutoff, and late or weekend submissions roll to a later cycle. Initial setup with a new factor takes longer because of credit checks, broker verification, and notice of assignment.",
  },
  {
    q: "Do I have to factor every load?",
    a: "It depends on the contract. Some factors require all-load (whole-ledger) factoring, where every invoice goes through them; others allow spot factoring, where you pick which invoices to submit. Whole-ledger contracts come with lower fees because the factor has predictable volume; spot contracts cost more per invoice but give the operator full control. The application asks which structure fits the operation.",
  },
  {
    q: "How is factoring different from a working-capital loan?",
    a: "Factoring is selling specific receivables for an advance; working capital is borrowing a lump sum you repay from operations over time. Factoring scales with revenue (the more you haul, the more cash you can pull) and has no APR — it has a flat fee per invoice. Working capital is fixed-amount, has a payment schedule, and reports as debt on the balance sheet. Different cost structures for different cashflow problems.",
  },
];

export default function InvoiceFactoringPage() {
  const { published, modified: today } = contentDates("app/factoring/page.tsx");
  return (
    <div className="landing">
      <JsonLd payload={breadcrumbList([
        { name: "Home", url: "https://dispatched.finance/" },
        { name: "Invoice factoring for truckers", url: PAGE_URL },
      ])} />
      <JsonLd payload={article({
        headline: "Invoice factoring for truckers",
        description:
          "How invoice factoring works for trucking operations: how it differs from a loan, recourse vs non-recourse, broker visibility, fee structures, and what to expect from the panel routing.",
        url: PAGE_URL,
        datePublished: published,
        dateModified: today,
      })} />
      <JsonLd payload={financialProduct({
        name: "Invoice factoring for truckers",
        description:
          "Turn broker and shipper invoices into working cash. Recourse and non-recourse factoring matched to your lanes; factors underwrite your brokers' credit.",
        url: PAGE_URL,
        category: "Invoice factoring",
      })} />
      <JsonLd payload={faqPage(faqs)} />

      <Nav />

      <main id="main-content" className="ins-page product-page">
        <section className="ins-hero product-hero">
          <div className="ins-container">
            <span className="ins-eyebrow">Invoice factoring</span>
            <h1 className="ins-hero-title">
              Invoice factoring for trucking operations.
            </h1>
            <EditorialByline updated={today} />
            <p className="ins-hero-sub">
              Sell broker or carrier invoices for a cash advance instead of waiting 30–60 days for payment.
              Different product class than a loan: no APR, no monthly
              payment, no debt on the books — but the fee comes out of
              the invoice. <Link href="/glossary/recourse-factoring">Recourse</Link>{" "}
              and <Link href="/glossary/non-recourse-factoring">non-recourse factoring</Link>{" "}
              routed to a panel of trucking-specific factors.
            </p>
            <div className="product-hero-ctas">
              <Link href="/apply?useCase=other" className="btn btn--primary btn--lg">
                See my factoring options →
              </Link>
              <Link href="/qualify" className="btn btn--secondary btn--lg">
                Two-question fit (no credit pull)
              </Link>
            </div>
            <p className="product-hero-note">
              Soft-pull match.
            </p>
          </div>
        </section>

        <PageTOC items={TOC_ITEMS} />

        <section id="what-it-is" className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">The short answer</span>
            <h2 className="ins-hero-title">Factoring isn&rsquo;t a loan.</h2>
            <p className="ins-hero-sub">
              Invoice factoring is the sale of a specific outstanding
              invoice to a third party (the factor) at a discount, in
              exchange for a cash advance. The factor collects
              the full invoice amount from your broker or carrier when
              the invoice matures; you keep the difference between the
              <Link href="/glossary/advance-rate">{" "}advance rate</Link> and the face value, minus the factoring fee.
              Verification of the load typically requires a clean{" "}
              <Link href="/glossary/bol">bill of lading</Link> and proof of delivery (
              <Link href="/glossary/pod">POD</Link>).
            </p>
            <p className="ins-hero-sub">
              Mechanically that&rsquo;s very different from a <Link href="/glossary/working-capital">working capital</Link>{" "}
              loan. There&rsquo;s no APR, no monthly payment, no
              debt on the balance sheet. The cost is the factoring fee
              (typically 1%–5% of invoice face value depending on broker
              payment terms and risk profile). The trade-off is that
              factoring works at the invoice level, not the operation
              level — you can fund what&rsquo;s already invoiced, not
              what you&rsquo;ll need next month.
            </p>
          </div>
        </section>

        <section id="when-it-fits">
          <div className="ins-container">
            <span className="ins-eyebrow">When factoring fits</span>
            <h2 className="ins-hero-title">Use cases.</h2>
            <ul className="product-list">
              <li>
                <strong>Brokers paying on long terms (Net-30, Net-45, Net-60).</strong>{" "}
                Factoring trades a 1%–4% fee for getting paid ahead of the broker&rsquo;s terms. The longer the broker&rsquo;s
                payment terms, the more factoring is worth.
              </li>
              <li>
                <strong>Steady freight, lumpy cashflow.</strong>{" "}
                Operators with predictable revenue but unpredictable
                broker payment timing use factoring to smooth
                receivables. Particularly useful for owner-ops running
                multiple brokers — often booked through a{" "}
                <Link href="/glossary/load-board">load board</Link> — with
                different payment cycles.
              </li>
              <li>
                <strong>New authorities (under 6 months).</strong>{" "}
                Factoring is sometimes the only product available to
                operators with under six months of operating history,
                because the factor underwrites the broker&rsquo;s credit
                rather than the trucker&rsquo;s. This is also why{" "}
                <Link href="/factoring/no-credit-check">
                  no credit check trucking factoring
                </Link>{" "}
                is the standard path for challenged-credit and post-BK
                operators.
              </li>
              <li>
                <strong>Operators who don&rsquo;t want debt.</strong>{" "}
                Factoring keeps the balance sheet clean — there&rsquo;s no
                loan to disclose on subsequent applications, no monthly
                payment to schedule. Some operators prefer this even at
                a higher per-dollar cost than a working-capital line.
              </li>
              <li>
                <strong>1099 sole-prop owner-ops.</strong> Operators
                whose carrier or broker pays them via{" "}
                <Link href="/glossary/1099-nec">1099-NEC</Link> and whose
                relationship qualifies under standard{" "}
                <Link href="/glossary/independent-contractor-classification">independent contractor classification</Link>{" "}
                tend to use factoring more than W-2 drivers, because
                they own the receivable directly.
              </li>
            </ul>
          </div>
        </section>

        <section id="when-it-doesnt" className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">When factoring doesn&rsquo;t fit</span>
            <h2 className="ins-hero-title">When working capital is the better path.</h2>
            <ul className="product-list">
              <li>
                <strong>Predictable monthly expenses.</strong> Fuel,
                payroll, insurance — costs that don&rsquo;t map cleanly
                to specific invoices fit a working-capital line better.
                Factoring works at the invoice level; working capital
                works at the operation level.
              </li>
              <li>
                <strong>Brokers paying quickly.</strong> If your brokers
                are 7-day or QuickPay terms, the factoring fee may
                exceed the financing benefit of getting paid even
                faster.
              </li>
              <li>
                <strong>Equipment purchases or repairs.</strong>{" "}
                Equipment loans (secured) and repair financing (direct-
                to-shop) are designed for asset-tied financing.
                Factoring isn&rsquo;t.
              </li>
              <li>
                <strong>Brokers who refuse factor relationships.</strong>{" "}
                Some brokers won&rsquo;t work with factors. If your
                primary lanes are with broker(s) like that, factoring
                isn&rsquo;t available for those receivables. The
                application step asks which brokers you work with so
                the factor can confirm.
              </li>
            </ul>
          </div>
        </section>

        <section id="composite-scenario">
          <div className="ins-container">
            <span className="ins-eyebrow">Composite scenario</span>
            <h2 className="ins-hero-title">
              What a factoring relationship looks like.
            </h2>
            <p className="ins-hero-sub">
              Composite illustrative scenario — not a specific borrower.
              See <Link href="/methodology#composite-scenarios">methodology</Link>.
            </p>
            <div className="product-example">
              <div className="product-example-meta">
                <span className="product-example-label">Operator</span>
                <span className="product-example-value">
                  Owner-operator, 1 truck, 14 months operating, primarily
                  Texas–Florida produce lanes through 3 brokers (Net-30,
                  Net-45, Net-60).
                </span>
              </div>
              <div className="product-example-meta">
                <span className="product-example-label">Situation</span>
                <span className="product-example-value">
                  Tired of waiting 45 days for the largest broker. Wants
                  to smooth receivables across all three brokers.
                </span>
              </div>
              <div className="product-example-meta">
                <span className="product-example-label">Estimator output</span>
                <span className="product-example-value">
                  Best fit: <strong>Spot factoring</strong> with the
                  Net-45 and Net-60 broker invoices, paying the
                  Net-30 broker through normal AR. Recourse vs
                  non-recourse depends on the brokers&rsquo; credit
                  profile.
                </span>
              </div>
              <div className="product-example-meta">
                <span className="product-example-label">Fee band</span>
                <span className="product-example-value mono">
                  ~2.5% – 3.5% per invoice (typical trucking-factor range
                  for these payment terms; final fee on the factoring
                  agreement)
                </span>
              </div>
            </div>
          </div>
        </section>

        <section id="onboarding" className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">How the relationship moves</span>
            <h2 className="ins-hero-title">Onboarding to first advance.</h2>
            <ol className="product-process">
              <li><strong>Application.</strong> Start inside <Link href="/apply">/apply</Link>. Brokers, payment terms, average invoice size, time in business. Soft-pull where applicable.</li>
              <li><strong>Factor match.</strong> A redacted profile goes to the trucking factors most likely to fund your broker mix and ticket size.</li>
              <li><strong>Onboarding.</strong> Notice of Assignment goes to your brokers; account setup; factoring agreement signed. The factor files a <Link href="/glossary/ucc-1">UCC-1</Link> against your receivables and may route broker payments through a <Link href="/glossary/lockbox">lockbox</Link>.</li>
              <li><strong>First invoice.</strong> Submit a verified invoice; the factor advances 90–98% of face value, typically sent via <Link href="/glossary/ach">ACH</Link>.</li>
              <li><strong>Ongoing.</strong> Submit invoices as they&rsquo;re generated; factor advances and collects from the broker on the original payment terms. Operators running a{" "}
                <Link href="/glossary/tms">TMS</Link> can often auto-export the
                BOL and invoice on delivery.</li>
            </ol>
          </div>
        </section>

        <section id="faq">
          <div className="ins-container">
            <span className="ins-eyebrow">FAQ</span>
            <h2 className="ins-hero-title">Questions about factoring.</h2>
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
              Trade waiting on invoice age for cashflow.
            </h2>
            <p className="ins-hero-sub">
              Soft-pull match. One factoring agreement only with the
              factor you choose.
            </p>
            <div className="product-hero-ctas">
              <Link href="/apply?useCase=other" className="btn btn--primary btn--lg">
                See my factoring options →
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
              <li><Link href="/trucking-working-capital">Working capital →</Link></li>
              <li><Link href="/factoring-vs-working-capital-loan">Factoring vs a working capital loan →</Link></li>
              <li><Link href="/new-authority-truck-financing">New authority financing →</Link></li>
              <li><Link href="/owner-operator-financing">Owner-operator financing →</Link></li>
              <li><Link href="/methodology">Methodology →</Link></li>
            </ul>
          </div>
        </section>
      </main>

      <StickyCTABar
        text="Get matched with the right factor"
        primaryCtaHref="/apply?useCase=factoring"
        primaryCtaLabel="See my factoring options →"
      />

      <Footer />
    </div>
  );
}
