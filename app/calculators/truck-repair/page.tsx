import type { Metadata } from "next";
import Link from "next/link";
import TruckRepairCalculator from "@/components/calculators/TruckRepairCalculator";
import Footer from "@/components/landing/Footer";
import Nav from "@/components/landing/Nav";
import { JsonLd, article, breadcrumbList } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Truck repair financing calculator — Dispatched",
  description:
    "Estimate the right financing product for a truck repair. Five inputs, no credit pull, no personal info. Returns the Dispatched product category that fits and the typical APR band for your profile.",
  alternates: { canonical: "/calculators/truck-repair" },
};

export default function TruckRepairCalculatorPage() {
  const today = new Date().toISOString().slice(0, 10);
  return (
    <div className="landing">
      <JsonLd
        payload={breadcrumbList([
          { name: "Home", url: "https://dispatched.finance/" },
          { name: "Calculators", url: "https://dispatched.finance/calculators" },
          {
            name: "Truck repair financing",
            url: "https://dispatched.finance/calculators/truck-repair",
          },
        ])}
      />
      <JsonLd
        payload={article({
          headline: "Truck repair financing fit estimator",
          description:
            "A fit estimator for trucking owner-operators and small fleets that returns the most likely Dispatched product category for a given repair amount and operator profile.",
          url: "https://dispatched.finance/calculators/truck-repair",
          datePublished: today,
          dateModified: today,
        })}
      />
      <Nav />
      <main id="main-content" className="calc-page">
        <section className="calc-hero">
          <div className="container">
            <span className="eyebrow">Calculators</span>
            <h1>Truck repair financing fit estimator.</h1>
            <p>
              Five inputs, no credit pull, no personal info. We&rsquo;ll tell
              you which Dispatched product category fits your repair amount
              and operator profile, and the typical APR band for borrowers
              with your credit. Not a rate quote — the chosen lender sets the
              final APR on the term sheet.
            </p>
          </div>
        </section>

        <section className="calc-form-wrap">
          <div className="container">
            <TruckRepairCalculator />
          </div>
        </section>

        <section className="calc-explainer">
          <div className="container">
            <h2>What this calculator actually decides</h2>
            <p>
              The estimator looks at three signals. The repair amount versus
              monthly revenue tells us whether the repair is a small expense
              for the operation or a major shock. Time in business tells us
              whether longer-term equipment-secured financing is realistic.
              Credit band sets the APR ceiling and floor based on observed
              panel pricing.
            </p>
            <ul className="calc-explainer-list">
              <li>
                <strong>Truck repair financing</strong> — direct-to-shop loan
                for the repair amount. Always shown; it&rsquo;s the topical
                product. Term and APR set by the chosen lender.
              </li>
              <li>
                <strong>Working capital</strong> — only shown when the repair
                is under ~80% of one month&rsquo;s revenue and the operator
                has at least six months of history. Use case: cover the
                repair plus operating expenses, repay from receivables.
              </li>
              <li>
                <strong>Equipment financing</strong> — only shown for
                operators with at least one year in business and a repair
                amount of $15,000 or more. Use case: secured by the repaired
                truck, longer payback, lower monthly payment than a
                short-term repair loan.
              </li>
            </ul>
            <p>
              The APR bands are the same observed panel ranges shown in the
              FAQ and at{" "}
              <Link href="/methodology#finance-rates">/methodology</Link>.
              They are not guarantees. The exact APR a borrower sees is set
              by the chosen lender on the term sheet and depends on the
              full application.
            </p>
          </div>
        </section>

        <section className="calc-related">
          <div className="container">
            <h2>Related</h2>
            <ul>
              <li>
                <Link href="/qualify">
                  Two-question funding fit (no credit check) →
                </Link>
              </li>
              <li>
                <Link href="/methodology#finance-rates">
                  How we describe APR ranges →
                </Link>
              </li>
              <li>
                <Link href="/apply?product=repair">
                  Skip the calculator, start the application →
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
