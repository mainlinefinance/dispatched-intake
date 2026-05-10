import type { Metadata } from "next";
import Link from "next/link";
import EquipmentLoanCalculator from "@/components/calculators/EquipmentLoanCalculator";
import Footer from "@/components/landing/Footer";
import Nav from "@/components/landing/Nav";
import { JsonLd, article, breadcrumbList } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Semi truck loan calculator — Dispatched",
  description:
    "Estimate the monthly payment on a semi truck loan in seconds. Five inputs, no credit pull, no personal info. APR bands match the observed Dispatched lender panel.",
  alternates: { canonical: "/calculators/semi-truck-loan" },
};

export default function SemiTruckLoanCalculatorPage() {
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
          {
            name: "Semi truck loan calculator",
            url: "https://dispatched.finance/calculators/semi-truck-loan",
          },
        ])}
      />
      <JsonLd
        payload={article({
          headline: "Semi truck loan calculator",
          description:
            "Estimate monthly payments on a semi truck loan based on price, down payment, term, equipment condition, and credit band. Returns the indicative payment and APR band drawn from the Dispatched lender panel.",
          url: "https://dispatched.finance/calculators/semi-truck-loan",
          datePublished: today,
          dateModified: today,
        })}
      />
      <Nav />
      <main id="main-content" className="calc-page">
        <section className="calc-hero">
          <div className="container">
            <span className="eyebrow">Calculators</span>
            <h1>Semi truck loan calculator.</h1>
            <p>
              Five inputs, no credit pull, no personal info. We&rsquo;ll return
              the estimated monthly payment for a semi truck purchase based on
              your price, down payment, term, equipment condition, and credit
              band. APR bands are observed panel ranges — the chosen lender
              sets the final APR on the term sheet.
            </p>
          </div>
        </section>

        <section className="calc-form-wrap">
          <div className="container">
            <EquipmentLoanCalculator
              equipmentNoun="semi truck"
              defaultPrice={80_000}
            />
          </div>
        </section>

        <section className="calc-explainer">
          <div className="container">
            <h2>How the estimate is built</h2>
            <p>
              The calculator uses the standard amortization formula on your
              loan amount (price minus down payment) at the midpoint of the
              APR band that matches your credit. Used equipment carries a
              small APR adder; older trucks (5+ years) more so. None of these
              factors guarantee the rate you&rsquo;ll see — they reflect what
              we observe on the Dispatched lender panel today.
            </p>
            <ul className="calc-explainer-list">
              <li>
                <strong>Loan amount</strong> — the truck price you enter, minus
                the down payment. Most semi truck lenders on the panel want at
                least 10% down for owner-operators with established history.
              </li>
              <li>
                <strong>APR band</strong> — drawn from the same observed panel
                ranges shown at <Link href="/methodology#finance-rates">methodology</Link>.
                The calculator runs the math at the midpoint to keep the
                estimate honest.
              </li>
              <li>
                <strong>Term</strong> — common semi truck loan terms run 48 to
                72 months. Longer terms lower the monthly payment but increase
                total interest paid; the calculator shows both so the
                trade-off is visible.
              </li>
              <li>
                <strong>Equipment condition</strong> — newer trucks tend to
                qualify for tighter APRs because the collateral is stronger.
                Older trucks (typically 5+ years from new) carry an adder
                because resale value is lower if the lender ever has to
                repossess.
              </li>
            </ul>
            <p>
              Want to skip the calculator and start the real application?{" "}
              <Link href="/apply?useCase=equipment">Apply now</Link>. The
              application matches you with the Dispatched lender panel for an
              actual term sheet — soft pull, no impact to your credit.
            </p>
          </div>
        </section>

        <section className="calc-related">
          <div className="container">
            <h2>Related</h2>
            <ul>
              <li>
                <Link href="/semi-truck-financing">
                  Semi truck financing — Class 8 tractors →
                </Link>
              </li>
              <li>
                <Link href="/owner-operator-financing">
                  Owner-operator financing →
                </Link>
              </li>
              <li>
                <Link href="/bad-credit-truck-financing">
                  Bad credit truck financing →
                </Link>
              </li>
              <li>
                <Link href="/calculators/truck-repair">
                  Truck repair financing fit estimator →
                </Link>
              </li>
              <li>
                <Link href="/qualify">
                  Two-question funding fit (no credit check) →
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
