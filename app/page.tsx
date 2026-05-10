import type { Metadata } from "next";
import DeclineSection from "@/components/landing/DeclineSection";
import FAQ from "@/components/landing/FAQ";
import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/Hero";
import HomeStatStrip from "@/components/landing/HomeStatStrip";
import HowItWorks from "@/components/landing/HowItWorks";
import InsuranceCrossSell from "@/components/landing/InsuranceCrossSell";
import Nav from "@/components/landing/Nav";
import ProductCards from "@/components/landing/ProductCards";
import ProofSection from "@/components/landing/ProofSection";
import TruckerVocab from "@/components/landing/TruckerVocab";

/* Organization + WebSite JSON-LD now ship from app/layout.tsx and apply to
   every route. Don't re-render them here — duplicates confuse entity graphs
   in some validators. */
export const metadata: Metadata = {
  title:
    "Dispatched — Capital built for truckers",
  description:
    "Capital built for truckers. No collateral. Bank decline is okay. We match owner-operators and small fleets with trucking-friendly lenders for repair loans, working capital, equipment financing, and commercial truck insurance.",
  alternates: { canonical: "/" },
};

export default function LandingPage() {
  return (
    <div className="landing">
      <Nav />
      <main id="main-content">
        <Hero />
        <TruckerVocab />
        <ProductCards />
        <HomeStatStrip />
        <HowItWorks />
        <DeclineSection />
        <ProofSection />
        <InsuranceCrossSell />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
