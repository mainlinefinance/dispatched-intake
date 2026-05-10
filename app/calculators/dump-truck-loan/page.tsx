import type { Metadata } from "next";
import Link from "next/link";
import EquipmentLoanCalculator from "@/components/calculators/EquipmentLoanCalculator";
import Footer from "@/components/landing/Footer";
import Nav from "@/components/landing/Nav";
import { JsonLd, article, breadcrumbList } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Dump truck loan calculator — Dispatched",
  description:
    "Estimate the monthly payment on a dump truck loan — single-axle, tandem, tri-axle, articulated. Five inputs, no credit pull, no personal info.",
  alternates: { canonical: "/calculators/dump-truck-loan" },
};

export default function DumpTruckLoanCalculatorPage() {
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
            name: "Dump truck loan calculator",
            url: "https://dispatched.finance/calculators/dump-truck-loan",
          },
        ])}
      />
      <JsonLd
        payload={article({
          headline: "Dump truck loan calculator",
          description:
            "Estimate monthly payments on a dump truck loan — single-axle, tandem, tri-axle, and articulated dump configurations. Returns the indicative payment and APR band drawn from the Dispatched lender panel.",
          url: "https://dispatched.finance/calculators/dump-truck-loan",
          datePublished: today,
          dateModified: today,
        })}
      />
      <Nav />
      <main id="main-content" className="calc-page">
        <section className="calc-hero">
          <div className="container">
            <span className="eyebrow">Calculators</span>
            <h1>Dump truck loan calculator.</h1>
            <p>
              Single-axle, tandem, tri-axle, articulated — estimate the monthly
              payment for any dump truck purchase. Five inputs, no credit pull,
              no personal info. APR bands are observed panel ranges; the chosen
              lender sets the final APR on the term sheet.
            </p>
          </div>
        </section>

        <section className="calc-form-wrap">
          <div className="container">
            <EquipmentLoanCalculator
              equipmentNoun="dump truck"
              defaultPrice={110_000}
            />
          </div>
        </section>

        <section className="calc-explainer">
          <div className="container">
            <h2>How the estimate is built</h2>
            <p>
              Dump truck financing follows the same standard amortization
              math as any other commercial truck loan. We take your loan
              amount (price minus down payment), apply the midpoint of the
              APR band that matches your credit, and add a small adder for
              used or older equipment. The output is an estimate — the
              chosen lender sets the final APR after a full underwriting
              review.
            </p>
            <ul className="calc-explainer-list">
              <li>
                <strong>Configuration matters</strong> — single-axle dumps
                are typically newer and run cheaper to finance; tri-axle
                and articulated configurations skew higher in price and
                often require more time-in-business history.
              </li>
              <li>
                <strong>Down payment</strong> — most dump truck lenders on
                the panel want at least 10–15% down. First-time vocational
                operators may need closer to 20%.
              </li>
              <li>
                <strong>APR band</strong> — same observed panel ranges
                shown at{" "}
                <Link href="/methodology#finance-rates">methodology</Link>.
                The calculator runs the math at the midpoint of the band,
                not the floor.
              </li>
              <li>
                <strong>Term</strong> — typical dump truck loans run 48 to
                84 months. Longer terms lower the monthly payment but
                increase total interest paid; the calculator shows both so
                the trade-off is visible.
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
                <Link href="/calculators/commercial-truck-loan">
                  Commercial truck loan calculator →
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
