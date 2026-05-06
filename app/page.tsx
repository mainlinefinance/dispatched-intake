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
import { JsonLd, organization, website } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title:
    "Dispatched — Capital built for truckers",
  description:
    "Capital built for truckers. No collateral. Bank decline is okay. We match owner-operators and small fleets with trucking-friendly lenders for repair loans, working capital, equipment financing, and commercial truck insurance.",
};

export default function LandingPage() {
  return (
    <div className="landing">
      <JsonLd payload={organization()} />
      <JsonLd payload={website()} />
      <Nav />
      <main id="main-content">
        <Hero />
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
