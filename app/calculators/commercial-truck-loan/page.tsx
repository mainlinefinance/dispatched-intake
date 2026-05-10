import type { Metadata } from "next";
import Link from "next/link";
import EquipmentLoanCalculator from "@/components/calculators/EquipmentLoanCalculator";
import Footer from "@/components/landing/Footer";
import Nav from "@/components/landing/Nav";
import { JsonLd, article, breadcrumbList } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Commercial truck loan calculator — Dispatched",
  description:
    "Estimate the monthly payment on a commercial truck loan — box trucks, dump trucks, vocational, cargo. Five inputs, no credit pull, no personal info.",
  alternates: { canonical: "/calculators/commercial-truck-loan" },
};

export default function CommercialTruckLoanCalculatorPage() {
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
            name: "Commercial truck loan calculator",
            url: "https://dispatched.finance/calculators/commercial-truck-loan",
          },
        ])}
      />
      <JsonLd
        payload={article({
          headline: "Commercial truck loan calculator",
          description:
            "Estimate monthly payments on a commercial truck loan — box trucks, dump trucks, vocational vehicles, and cargo vans. Returns the indicative monthly payment and APR band drawn from the Dispatched lender panel.",
          url: "https://dispatched.finance/calculators/commercial-truck-loan",
          datePublished: today,
          dateModified: today,
        })}
      />
      <Nav />
      <main id="main-content" className="calc-page">
        <section className="calc-hero">
          <div className="container">
            <span className="eyebrow">Calculators</span>
            <h1>Commercial truck loan calculator.</h1>
            <p>
              Box trucks, dump trucks, vocational vehicles, cargo vans —
              estimate the monthly payment for any commercial truck purchase.
              Five inputs, no credit pull, no personal info. APR bands are
              observed panel ranges; the chosen lender sets the final APR on
              the term sheet.
            </p>
          </div>
        </section>

        <section className="calc-form-wrap">
          <div className="container">
            <EquipmentLoanCalculator
              equipmentNoun="commercial truck"
              defaultPrice={55_000}
            />
          </div>
        </section>

        <section className="calc-explainer">
          <div className="container">
            <h2>How the estimate is built</h2>
            <p>
              The math is the same standard amortization formula a lender uses
              to build the term sheet. We take your loan amount (price minus
              down payment) and apply the midpoint of the APR band that
              matches your credit, with a small adder for used or older
              equipment. The output is an estimate, not a guarantee — the
              lender sets the final APR after a full underwriting review.
            </p>
            <ul className="calc-explainer-list">
              <li>
                <strong>Vehicle type</strong> — the calculator works for any
                commercial truck. Box trucks and cargo vans typically come in
                lower than Class 8 semis, so default values reflect that
                broader mix.
              </li>
              <li>
                <strong>Loan amount</strong> — most commercial truck lenders
                want at least 10% down. First-time buyers and operators with
                under a year of history may need 15–20% down to qualify.
              </li>
              <li>
                <strong>APR band</strong> — observed panel ranges, same as
                shown on{" "}
                <Link href="/methodology#finance-rates">methodology</Link>.
                The calculator runs the math at the midpoint of the band, not
                the floor.
              </li>
              <li>
                <strong>Term</strong> — typical commercial truck loans run 36
                to 72 months. Vocational and cargo vans skew shorter; semis
                and dumps skew longer.
              </li>
            </ul>
            <p>
              Want to skip the calculator and start the real application?{" "}
              <Link href="/apply?useCase=equipment">Apply now</Link> to match
              with the Dispatched lender panel for an actual term sheet.
            </p>
          </div>
        </section>

        <section className="calc-related">
          <div className="container">
            <h2>Related</h2>
            <ul>
              <li>
                <Link href="/box-truck-financing">
                  Box truck financing →
                </Link>
              </li>
              <li>
                <Link href="/equipment-financing">
                  Equipment financing overview →
                </Link>
              </li>
              <li>
                <Link href="/calculators/semi-truck-loan">
                  Semi truck loan calculator →
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
