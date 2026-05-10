import type { Metadata } from "next";
import Link from "next/link";
import { getAllProducts } from "@/lib/data/products";
import {
  JsonLd,
  article,
  breadcrumbList,
  insuranceAgency,
} from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Commercial Trucking Insurance — Dispatched",
  description:
    "Compare commercial trucking insurance products — primary liability, cargo, physical damage, and the rest of the stack — across carriers and states.",
  alternates: { canonical: "/insurance" },
};

export default function InsurancePillarPage() {
  const products = getAllProducts();
  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="ins-page">
      <JsonLd payload={insuranceAgency()} />
      <JsonLd
        payload={breadcrumbList([
          { name: "Home", url: "https://dispatched.finance/" },
          {
            name: "Commercial Trucking Insurance",
            url: "https://dispatched.finance/insurance",
          },
        ])}
      />
      <JsonLd
        payload={article({
          headline:
            "Commercial Trucking Insurance: Products, Carriers, and Coverage",
          description:
            "Pillar overview of commercial trucking insurance products — primary liability, cargo, physical damage, GL, NTL, occupational accident, and reefer breakdown.",
          url: "https://dispatched.finance/insurance",
          datePublished: today,
          dateModified: today,
        })}
      />

      <main id="main-content">
        <section className="ins-hero">
          <div className="ins-container">
            <span className="ins-eyebrow">Insurance · pillar</span>
            <h1 className="ins-hero-title">
              Commercial trucking insurance, by product and by state.
            </h1>
            <p className="ins-hero-sub">
              Seven coverage types operators actually shop for, mapped to the
              carriers writing them and the regulatory rules that vary
              state-to-state. Compare what you need before you call a broker.
            </p>
          </div>
        </section>

        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">Coverage products</span>
            <h2 className="ins-hero-title">All seven products</h2>
            <div className="ins-product-grid">
              {products.map((p) => (
                <Link
                  key={p.slug}
                  href={`/insurance/${p.slug}`}
                  className="ins-product-card"
                >
                  <h3>{p.name}</h3>
                  <p>{p.oneLine}</p>
                  <span className="ins-product-card-footer">
                    {p.fmcsaMinimum
                      ? `FMCSA minimum: ${p.fmcsaMinimum}`
                      : "Optional / contractually required"}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">How we compare</span>
            <h2 className="ins-hero-title">Methodology, not marketing.</h2>
            <p className="ins-hero-sub">
              Premium ranges on this site are sampled from public state DOI
              filings against named operator profiles. We do not invent rates
              and we do not paraphrase regulators. Where we have not yet
              extracted a filing for a given state-product-class combination,
              the page says so plainly.
            </p>
            <p className="ins-compliance-note">
              Dispatched is a comparison and matching platform. Coverage is
              placed by licensed producers and bound by carriers. We are not a
              carrier and we do not bind coverage.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
