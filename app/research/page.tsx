import type { Metadata } from "next";
import Link from "next/link";
import {
  JsonLd,
  article,
  breadcrumbList,
} from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Dispatched Research — Commercial Trucking Insurance",
  description:
    "Dispatched Research publishes annual reports and quarterly updates on the commercial-trucking insurance market. Source-cited, regulator-anchored, no proprietary feeds.",
  alternates: { canonical: "/research" },
};

const REPORTS = [
  {
    slug: "state-of-commercial-trucking-insurance-2026",
    title: "State of Commercial Trucking Insurance 2026",
    description:
      "Annual report — legal-environment shifts, commodity hotspots, AM Best context, broker market shape, FMCSA rules to watch.",
    published: "2026-04-27",
    kind: "annual",
  },
] as const;

export default function ResearchIndexPage() {
  const today = new Date().toISOString().slice(0, 10);
  return (
    <div className="research-page">
      <JsonLd
        payload={breadcrumbList([
          { name: "Home", url: "https://dispatched.finance/" },
          { name: "Research", url: "https://dispatched.finance/research" },
        ])}
      />
      <JsonLd
        payload={article({
          headline: "Dispatched Research",
          description:
            "Annual reports and quarterly updates on the commercial-trucking insurance market.",
          url: "https://dispatched.finance/research",
          datePublished: today,
          dateModified: today,
        })}
      />
      <main id="main-content">
        <div className="research-container">
          <header className="research-header">
            <p className="research-eyebrow">Dispatched Research</p>
            <h1 className="research-h1">Reports on the trucking insurance market.</h1>
            <p className="research-subhead">
              Source-cited, regulator-anchored. No proprietary or
              vendor-licensed feeds; every quantitative claim references a
              public source you can audit yourself.
            </p>
          </header>
          <section className="research-section">
            <h2>Reports</h2>
            <ul className="research-report-list">
              {REPORTS.map((r) => (
                <li key={r.slug}>
                  <Link href={`/research/${r.slug}`} className="research-report-card">
                    <span className="research-report-eyebrow">
                      {r.kind === "annual" ? "Annual report" : "Quarterly update"}
                      {" · "}
                      {r.published}
                    </span>
                    <h3>{r.title}</h3>
                    <p>{r.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <section className="research-section">
            <h2>Methodology</h2>
            <p>
              Reports draw on three categories of source: published public
              regulatory data and filings, industry-association published
              research (ATRI, ATA, AM Best market segment reports), and
              Dispatched&apos;s own observation of the broker / lead-buyer
              market shape. Every claim is auditable against a public source.
            </p>
            <p>
              <Link href="/methodology">Read our full rate methodology</Link>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
