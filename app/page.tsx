import type { Metadata } from "next";
import DeclineSection from "@/components/landing/DeclineSection";
import FAQ from "@/components/landing/FAQ";
import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import InsuranceCrossSell from "@/components/landing/InsuranceCrossSell";
import Nav from "@/components/landing/Nav";
import ProofSection from "@/components/landing/ProofSection";
import { JsonLd, organization, website } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title:
    "Dispatched — Working capital for owner-operators and small fleets",
  description:
    "$25K–$250K working capital, typically funded in 24–48 hours. No collateral. Bank decline is fine. We route your file to the 3–5 lenders most likely to fund it — you see terms before anyone pulls your credit.",
};

export default function LandingPage() {
  return (
    <div className="landing">
      <JsonLd payload={organization()} />
      <JsonLd payload={website()} />
      <Nav />
      <main id="main-content">
        <Hero />
        <DeclineSection />
        <HowItWorks />
        <ProofSection />
        <InsuranceCrossSell />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
