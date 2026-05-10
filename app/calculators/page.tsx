import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/landing/Footer";
import Nav from "@/components/landing/Nav";
import { JsonLd, breadcrumbList } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Trucking finance calculators — Dispatched",
  description:
    "Fit estimators and decision tools for trucking owner-operators and small fleets. No credit pull, no personal info collected.",
  alternates: { canonical: "/calculators" },
};

type Tool = {
  href: string;
  title: string;
  description: string;
  inputs: string;
};

const tools: Tool[] = [
  {
    href: "/calculators/semi-truck-loan",
    title: "Semi truck loan calculator",
    description:
      "Estimate the monthly payment on a semi truck loan in seconds. Inputs: price, down payment, term, equipment condition, credit band. Returns the indicative monthly payment, APR band, and total interest.",
    inputs: "5 inputs · No credit pull",
  },
  {
    href: "/calculators/commercial-truck-loan",
    title: "Commercial truck loan calculator",
    description:
      "Box trucks, vocational vehicles, cargo vans — same math, broader equipment mix. Returns the indicative monthly payment based on your inputs and the observed lender panel APR bands.",
    inputs: "5 inputs · No credit pull",
  },
  {
    href: "/calculators/dump-truck-loan",
    title: "Dump truck loan calculator",
    description:
      "Single-axle, tandem, tri-axle, articulated — estimate the monthly payment for any dump truck purchase. Returns the indicative payment, APR band, and total interest based on your credit and equipment condition.",
    inputs: "5 inputs · No credit pull",
  },
  {
    href: "/calculators/truck-repair",
    title: "Truck repair financing fit estimator",
    description:
      "Pick the right product category for a specific truck repair. Returns repair financing, working capital, or equipment financing based on the repair amount and your operator profile.",
    inputs: "5 inputs · No credit pull",
  },
  {
    href: "/qualify",
    title: "Two-question funding fit",
    description:
      "Two questions about revenue and time in business. Returns the Dispatched product categories you fit and the typical APR band for your profile.",
    inputs: "2 inputs · No credit pull",
  },
];

export default function CalculatorsIndexPage() {
  return (
    <div className="landing">
      <JsonLd
        payload={breadcrumbList([
          { name: "Home", url: "https://dispatched.finance/" },
          {
            name: "Calculators",
            url: "https://dispatched.finance/calculators",
          },
        ])}
      />
      <Nav />
      <main id="main-content" className="calc-page">
        <section className="calc-hero">
          <div className="container">
            <span className="eyebrow">Calculators</span>
            <h1>Decision tools, not lead forms.</h1>
            <p>
              Payment estimators and fit estimators for trucking
              owner-operators and small fleets. None of these collect personal
              information or pull credit. They are reasoning aids, not
              underwriting decisions — the chosen lender sets the final APR
              on the term sheet.
            </p>
          </div>
        </section>

        <section className="calc-form-wrap">
          <div className="container">
            <ul className="calc-tool-grid">
              {tools.map((t) => (
                <li key={t.href} className="calc-tool-card">
                  <Link href={t.href} className="calc-tool-link">
                    <span className="calc-tool-eyebrow">{t.inputs}</span>
                    <h2 className="calc-tool-title">{t.title}</h2>
                    <p className="calc-tool-desc">{t.description}</p>
                    <span className="calc-tool-cta">Open the tool →</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
