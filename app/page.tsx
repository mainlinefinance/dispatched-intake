import type { Metadata } from "next";
import ClosingCta from "@/components/landing/ClosingCta";
import DeclineSection from "@/components/landing/DeclineSection";
import FAQ from "@/components/landing/FAQ";
import { homepageFaqs } from "@/components/landing/FAQ.data";
import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/Hero";
import HomeStickyCta from "@/components/landing/HomeStickyCta";
import HowItWorks from "@/components/landing/HowItWorks";
import InsuranceCrossSell from "@/components/landing/InsuranceCrossSell";
import Nav from "@/components/landing/Nav";
import ProductCards from "@/components/landing/ProductCards";
import ProofSection from "@/components/landing/ProofSection";
import TruckerVocab from "@/components/landing/TruckerVocab";
import { JsonLd, faqPage } from "@/components/seo/JsonLd";

/* Organization + WebSite JSON-LD now ship from app/layout.tsx and apply to
   every route. Don't re-render them here — duplicates confuse entity graphs
   in some validators. The FAQPage payload IS page-specific (it describes the
   homepage's visible FAQ section), so it stays here. */
export const metadata: Metadata = {
  // Keyword-first per 2026-05-23 SEO audit. Brand at the end keeps brand
  // recognition while letting the head terms (trucking capital, equipment,
  // repair, factoring) land in the first 30 chars where Google clips SERP
  // titles. Was: "Dispatched — Capital built for truckers" (brand-first,
  // 39 chars under the 50-60 ideal).
  title: "Trucking Capital, Equipment, Repair, Factoring | Dispatched",
  description:
    "Capital and insurance for truckers. Soft pull, lender-paid. Match with trucking-friendly lenders for working capital, equipment, repair, factoring.",
  alternates: { canonical: "/" },
};

/* Section order is the funnel, top to bottom:
     offer (Hero) → how it works → why a bank said no → products and example
     requests → objections (FAQ) → closing apply CTA.
   Every stretch of it ends on a way to apply: the hero and the closing band
   carry the CTA, HowItWorks and DeclineSection end on one, and on phones
   HomeStickyCta covers the gaps in between. Insurance is a different funnel,
   so it sits below the close instead of interrupting the pitch. */
export default function LandingPage() {
  return (
    <div className="landing landing--sticky-cta">
      <JsonLd
        payload={faqPage(
          homepageFaqs.map((f) => ({ q: f.q, a: f.aText })),
        )}
      />
      <Nav />
      <main id="main-content">
        <Hero />
        <TruckerVocab />
        <HowItWorks />
        <DeclineSection />
        <ProductCards />
        <ProofSection />
        <FAQ />
        <ClosingCta />
        <InsuranceCrossSell />
      </main>
      <Footer />
      <HomeStickyCta />
    </div>
  );
}
