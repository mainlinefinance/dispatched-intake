import type { Metadata } from "next";
import Footer from "@/components/landing/Footer";
import Nav from "@/components/landing/Nav";
import QualificationCalc from "@/components/landing/QualificationCalc";
import { JsonLd, breadcrumbList, faqPage } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Check your trucking funding fit — soft pull",
  description:
    "Two questions, no credit check. See the lender type most likely to fund your operation and the typical APR range for your profile. No commitment.",
  alternates: { canonical: "/qualify" },
  openGraph: {
    title: "Check your trucking funding fit — soft pull",
    description:
      "Two questions, no credit check. See the lender type most likely to fund your operation and the typical APR range for your profile. No commitment.",
    url: "/qualify",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Check your trucking funding fit — soft pull",
    description:
      "Two questions, no credit check. See the lender type most likely to fund your operation and the typical APR range for your profile. No commitment.",
  },
};

const qualifyFaqs = [
  {
    q: "What does the qualifier actually do?",
    a: "The qualifier asks two questions about your operation — monthly revenue range and credit band — and returns the Dispatched product category most likely to fit (working capital, equipment financing, repair loan, or factoring) along with the observed panel APR range for borrowers with your profile. It does not pull credit, does not collect personal information, and does not return a binding offer.",
  },
  {
    q: "Will the qualifier affect my credit?",
    a: "No. The qualifier asks for a credit band (a range like \"580 to 619\"), not a specific score, and does not pull a credit report. Nothing about the qualifier touches your credit file. The first credit-bureau interaction happens later, on the application — and that is a soft pull, not a hard pull.",
  },
  {
    q: "Is the qualifier the same as applying?",
    a: "No. The qualifier is a fit estimator, not an application. You see the product category that matches your inputs and the typical panel APR range, but you do not get a soft-approval, a lender shortlist, or a term sheet. Those come from the full application at /apply, which takes about 7 minutes and runs a soft pull.",
  },
  {
    q: "What information do you collect on the qualifier?",
    a: "Two pieces of information — monthly revenue range and credit band. No name, no email, no phone number, no SSN, no DOT number. The qualifier is built to give you a useful answer with the minimum information possible. Contact details are only collected on the application.",
  },
];

export default function QualifyPage() {
  return (
    <div className="landing">
      <JsonLd
        payload={breadcrumbList([
          { name: "Home", url: "https://dispatched.finance/" },
          { name: "Funding fit", url: "https://dispatched.finance/qualify" },
        ])}
      />
      <JsonLd payload={faqPage(qualifyFaqs)} />
      <Nav />
      <main id="main-content" className="qualify-page">
        <section className="qualify-hero">
          <div className="container">
            <span className="eyebrow">Funding fit</span>
            <h1>Check your funding fit.</h1>
            <p>
              Answer 2 questions. No hard pull. We&rsquo;ll show the
              Dispatched product categories you fit and the typical APR range
              for borrowers with your profile.
            </p>
          </div>
        </section>
        <section className="qualify-form-wrap">
          <div className="container">
            <QualificationCalc />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
