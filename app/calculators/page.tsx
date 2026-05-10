import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/landing/Footer";
import Nav from "@/components/landing/Nav";
import { JsonLd, breadcrumbList, faqPage } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Trucking finance calculators — fit tools",
  description:
    "Fit estimators and decision tools for trucking owner-operators and small fleets. No credit pull, no personal info collected. Try a calculator now.",
  alternates: { canonical: "/calculators" },
  openGraph: {
    title: "Trucking finance calculators — fit tools",
    description:
      "Fit estimators and decision tools for trucking owner-operators and small fleets. No credit pull, no personal info collected. Try a calculator now.",
    url: "/calculators",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trucking finance calculators — fit tools",
    description:
      "Fit estimators and decision tools for trucking owner-operators and small fleets. No credit pull, no personal info collected. Try a calculator now.",
  },
};

const calculatorsFaqs = [
  {
    q: "What do the trucking finance calculators do?",
    a: "Each calculator takes a small set of operational inputs (revenue, equipment age, repair cost, FICO band, or down payment depending on the tool) and returns the Dispatched product category that fits along with the typical panel APR range for borrowers with that profile. Calculators are fit estimators, not pre-approvals — the answer is directional, not a binding offer.",
  },
  {
    q: "Do the calculators pull my credit?",
    a: "No. The calculators ask for a credit band (a range, not a specific score) and do not touch your credit file. Nothing about the calculators is reported to the credit bureaus. The first credit-bureau interaction happens on the application at /apply, and that is a soft pull.",
  },
  {
    q: "Do I need to enter contact information to use a calculator?",
    a: "No. Calculators run entirely in the browser — no name, no email, no phone number, no SSN. You can model scenarios all afternoon without leaving any contact information with Dispatched. Contact details are only collected when you start an application.",
  },
  {
    q: "How accurate are the APR estimates from the calculators?",
    a: "The APR estimates are the observed band of rates that lenders on the Dispatched panel have actually quoted to borrowers with similar profiles over the trailing 12 months. They are descriptive, not predictive. The exact APR you receive will depend on your full underwriting picture (revenue, deposit consistency, equipment specifics) which the calculators do not capture in full.",
  },
  {
    q: "Which calculator should I use first?",
    a: "If a truck is at the shop and you have a quote, use the truck repair calculator. If you are sizing a working-capital line for fuel, payroll, or slow-month gaps, use the working-capital calculator (when published). If you are buying equipment, use the equipment-loan calculator (when published). If you are not sure which product fits, use /qualify — it routes you to the right product in two questions.",
  },
];

type Tool = {
  href: string;
  title: string;
  description: string;
  inputs: string;
};

const tools: Tool[] = [
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
      <JsonLd payload={faqPage(calculatorsFaqs)} />
      <Nav />
      <main id="main-content" className="calc-page">
        <section className="calc-hero">
          <div className="container">
            <span className="eyebrow">Calculators</span>
            <h1>Decision tools, not lead forms.</h1>
            <p>
              Fit estimators that tell you which Dispatched product category
              you fit, given your operator profile. None of these collect
              personal information or pull credit. They are reasoning aids,
              not underwriting decisions.
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
