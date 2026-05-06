import type { Metadata } from "next";
import Footer from "@/components/landing/Footer";
import Nav from "@/components/landing/Nav";
import QualificationCalc from "@/components/landing/QualificationCalc";
import { JsonLd, breadcrumbList } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Check your funding fit — Dispatched",
  description:
    "Two questions, no credit check. We'll show the type of lenders most likely to fund you and the typical APR range for borrowers with your profile.",
  alternates: { canonical: "/qualify" },
};

export default function QualifyPage() {
  return (
    <div className="landing">
      <JsonLd
        payload={breadcrumbList([
          { name: "Home", url: "https://dispatched.finance/" },
          { name: "Funding fit", url: "https://dispatched.finance/qualify" },
        ])}
      />
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
