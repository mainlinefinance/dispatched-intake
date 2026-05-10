import type { Metadata } from "next";
import Link from "next/link";
import FactoringFeeCalculator from "@/components/calculators/FactoringFeeCalculator";
import Footer from "@/components/landing/Footer";
import Nav from "@/components/landing/Nav";
import {
  JsonLd,
  article,
  breadcrumbList,
  softwareApplication,
} from "@/components/seo/JsonLd";

const PAGE_URL = "https://dispatched.finance/calculators/factoring-fee";

export const metadata: Metadata = {
  title: "Factoring fee calculator — Dispatched",
  description:
    "Estimate the all-in cost of factoring an invoice. Five inputs, no signup. Get the fee, advance, hold-back, and effective annualized rate in seconds.",
  alternates: { canonical: "/calculators/factoring-fee" },
};

export default function FactoringFeeCalculatorPage() {
  const today = new Date().toISOString().slice(0, 10);
  return (
    <div className="landing">
      <JsonLd
        payload={breadcrumbList([
          { name: "Home", url: "https://dispatched.finance/" },
          {
            name: "Calculators",
            url: "https://dispatched.finance/calculators",
          },
          { name: "Factoring fee calculator", url: PAGE_URL },
        ])}
      />
      <JsonLd
        payload={article({
          headline: "Factoring fee calculator",
          description:
            "Estimate the all-in cost of factoring an invoice — fee, advance, hold-back reserve, and effective annualized rate.",
          url: PAGE_URL,
          datePublished: today,
          dateModified: today,
        })}
      />
      <JsonLd
        payload={softwareApplication({
          name: "Factoring fee calculator",
          description:
            "Interactive web tool that estimates the factoring fee, advance amount, hold-back reserve, and effective annualized rate on a trucking invoice.",
          url: PAGE_URL,
          applicationCategory: "FinanceApplication",
        })}
      />
      <Nav />
      <main id="main-content" className="calc-page">
        <section className="calc-hero">
          <div className="container">
            <span className="eyebrow">Calculators</span>
            <h1>Factoring fee calculator.</h1>
            <p>
              Five inputs, no signup, no credit pull. Estimate the factoring
              fee on an invoice plus the advance amount, hold-back reserve,
              and the effective annualized cost — the number that lets you
              compare factoring against a working-capital loan apples-to-apples.
            </p>
          </div>
        </section>

        <section className="calc-form-wrap">
          <div className="container">
            <FactoringFeeCalculator />
          </div>
        </section>

        <section className="calc-explainer">
          <div className="container">
            <h2>How this calculator works</h2>
            <p>
              Factoring is priced &ldquo;per 30 days&rdquo; for a reason: most
              factors quote a headline rate that assumes the broker pays within
              the standard net-30 window, then prorate the rate daily for
              invoices that pay faster or slower. A 3% rate on a 30-day invoice
              and a 3% rate on a 60-day invoice are <em>not</em> the same cost
              — the second one is twice the fee in dollars, because you&rsquo;ve
              tied up the cash twice as long.
            </p>
            <p>
              The five inputs the calculator uses:
            </p>
            <ul className="calc-explainer-list">
              <li>
                <strong>Invoice amount</strong> — face value of the load you
                hauled. The factor never advances more than this number.
              </li>
              <li>
                <strong>Rate per 30 days</strong> — the factor&rsquo;s headline
                rate. Industry median for owner-operators sits around 3%; spot
                factoring runs 4 – 5%, long-term contract factoring 1.5 – 2.5%.
              </li>
              <li>
                <strong>Advance rate</strong> — the percent the factor wires to
                you within 24 hours of invoice upload. The rest is held back
                until the broker actually pays.
              </li>
              <li>
                <strong>Days outstanding</strong> — calendar days from upload
                to broker payment. Most brokers pay 25 – 45 days; the slow ones
                stretch to 60+.
              </li>
              <li>
                <strong>Recourse vs non-recourse</strong> — recourse means you
                owe the factor back if the broker doesn&rsquo;t pay.
                Non-recourse means the factor eats that loss in exchange for
                a 0.5 – 1% premium on the rate. The calculator surfaces this as
                a UI note rather than auto-modifying the rate, so the comparison
                stays apples-to-apples and you choose the markup consciously.
              </li>
            </ul>
            <p>
              The math under the hood: <strong>fee</strong> = invoice × rate ×
              (days ÷ 30); <strong>advance</strong> = invoice × advance%;
              <strong> hold-back</strong> = invoice − advance;{" "}
              <strong>effective annualized rate</strong> = (fee ÷ advance) ×
              (365 ÷ days) × 100. That last formula is the one carriers should
              tattoo on their forearms.
            </p>
          </div>
        </section>

        <section className="calc-explainer">
          <div className="container">
            <h2>Why effective annualized rate matters</h2>
            <p>
              A 3% factoring rate doesn&rsquo;t look like much next to a 12% APR
              line of credit. Until you annualize it. A 3% fee on a 30-day
              invoice with a 95% advance is roughly a <strong>38% effective
              APR</strong> on the cash you actually had at risk — comparable to
              the high end of working-capital loan pricing, and meaningfully
              more expensive than a bank line for a carrier who qualifies for
              one.
            </p>
            <p>
              That said, effective APR is the right number for comparing, but
              the wrong number for shaming factoring. Factoring isn&rsquo;t a
              loan — there&rsquo;s no debt on your balance sheet, no personal
              guarantee in most cases, no minimum payments. The fee comes out
              of the broker pay, not your operating account. For new authorities
              that can&rsquo;t qualify for a line yet, or for carriers running
              brokers with 60-day pay cycles, factoring is the only realistic
              tool that bridges the cash-flow gap. The right framing isn&rsquo;t
              &ldquo;is factoring expensive&rdquo; — it&rsquo;s &ldquo;is the
              cash-flow speedup worth the spread.&rdquo;
            </p>
            <p>
              The 0.5 – 1% non-recourse premium is, in this frame, cheap
              insurance for carriers hauling for one or two concentrated
              brokers. One broker default on a recourse contract can wipe out
              a quarter of fee savings. Run the numbers on both lines.
            </p>
          </div>
        </section>

        <section className="calc-explainer">
          <div className="container">
            <h2>Limitations</h2>
            <ul className="calc-explainer-list">
              <li>
                <strong>No broker credit pull.</strong> Real factors screen
                broker creditworthiness before funding an invoice. The
                calculator assumes the broker will pay — which is the default
                outcome, but not universal.
              </li>
              <li>
                <strong>No contract-specific fees.</strong> ACH fees,
                same-day-funding upcharges, fuel-advance fees, lockbox fees,
                and monthly minimums are not modeled. Read the contract.
              </li>
              <li>
                <strong>Linear daily proration assumed.</strong> Some factors
                tier rates in 15-day or 30-day blocks (a 31-day invoice pays
                the 60-day rate). Ask the factor how their proration works.
              </li>
              <li>
                <strong>Reserve release timing varies.</strong> Most factors
                release the reserve within 1 – 2 business days of broker pay;
                some hold for 5 – 10 days. Cash-flow modeling should add a
                buffer.
              </li>
              <li>
                <strong>Not a quote.</strong> Real terms come from a contract.
                This is a planning tool.
              </li>
            </ul>
          </div>
        </section>

        <section className="calc-related">
          <div className="container">
            <h2>Related</h2>
            <ul>
              <li>
                <Link href="/invoice-factoring-for-truckers">
                  Invoice factoring for truckers — parent product →
                </Link>
              </li>
              <li>
                <Link href="/invoice-factoring-for-truckers/no-credit-check">
                  Factoring without a credit check →
                </Link>
              </li>
              <li>
                <Link href="/research/best-trucking-factoring-2026">
                  Best trucking factoring companies, 2026 →
                </Link>
              </li>
              <li>
                <Link href="/calculators">All calculators →</Link>
              </li>
              <li>
                <Link href="/methodology">Methodology →</Link>
              </li>
            </ul>
          </div>
        </section>

        <section className="calc-disclosures">
          <div className="container">
            <p>
              See <Link href="/disclosures">disclosures</Link> for advertising,
              referral, and editorial-independence policies.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
