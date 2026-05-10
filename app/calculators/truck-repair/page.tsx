import type { Metadata } from "next";
import Link from "next/link";
import TruckRepairCalculator from "@/components/calculators/TruckRepairCalculator";
import Footer from "@/components/landing/Footer";
import Nav from "@/components/landing/Nav";
import { JsonLd, article, breadcrumbList, faqPage } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Truck repair financing calculator — fit",
  description:
    "Estimate the right financing for a truck repair. Five inputs, no credit pull, no personal info. Returns the product fit and typical APR for your profile.",
  alternates: { canonical: "/calculators/truck-repair" },
  openGraph: {
    title: "Truck repair financing calculator — fit",
    description:
      "Estimate the right financing for a truck repair. Five inputs, no credit pull, no personal info. Returns the product fit and typical APR for your profile.",
    url: "/calculators/truck-repair",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Truck repair financing calculator — fit",
    description:
      "Estimate the right financing for a truck repair. Five inputs, no credit pull, no personal info. Returns the product fit and typical APR for your profile.",
  },
};

const truckRepairCalcFaqs = [
  {
    q: "How do I use the truck repair financing calculator?",
    a: "Enter five inputs: the shop's repair quote, the truck's age, your monthly business revenue range, your FICO band, and whether the truck is paid off. The calculator returns the Dispatched product category that fits (working-capital repair loan, equipment-secured refinance, or pay-cash recommendation) and the typical panel APR range for borrowers with your profile.",
  },
  {
    q: "When does the calculator recommend financing versus paying cash?",
    a: "The calculator recommends financing when the repair cost exceeds roughly one month of net operating income or when paying cash would drain reserves below a 30-day operating buffer. It recommends paying cash when the repair is a fraction of monthly net and reserves are healthy — the financing fee on a small repair often costs more than the cashflow benefit.",
  },
  {
    q: "What APR should I expect on a truck repair loan?",
    a: "The observed panel range is 14% to 34% APR for working-capital-style repair loans, and 9% to 18% APR when the repair is rolled into an equipment-secured product on a tractor with sufficient remaining value. The calculator shows which range applies to your profile based on the inputs.",
  },
  {
    q: "Does the calculator pull my credit?",
    a: "No. The calculator asks for a credit band (a range like \"580 to 619\"), not a specific score, and does not touch your credit file. Nothing about the calculator is reported to the credit bureaus.",
  },
  {
    q: "When does the calculator tell me to replace the truck instead of repairing?",
    a: "When the repair cost exceeds roughly 50% of the truck's current market value and the truck is older than 8 years, the calculator flags replacement as the math-favored path. The flag is directional — the operator's specific situation (lane fit, downtime cost, prior repair history on the same systems) often justifies repair even when the math marginally favors replacement.",
  },
];

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
      <JsonLd payload={faqPage(truckRepairCalcFaqs)} />
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
