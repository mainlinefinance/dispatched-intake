import { withSocial } from "@/lib/seo/social";
import { contentDates } from "@/lib/seo/contentDates";
import type { Metadata } from "next";
import Link from "next/link";
import {
  JsonLd,
  article,
  breadcrumbList,
} from "@/components/seo/JsonLd";

export const metadata: Metadata = withSocial({
  title: "Dispatched Research — Commercial Trucking Insurance",
  description:
    "Dispatched Research publishes annual reports and quarterly updates on the commercial trucking insurance market. Source-cited and regulator-anchored.",
  alternates: { canonical: "/research" },
}, "/research");

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
  const { published, modified: today } = contentDates("app/research/page.tsx");
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
          datePublished: published,
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
            <h2>What the reports cover</h2>
            <p>
              Each annual report takes one part of running a trucking
              business (capital, insurance, fuel, regulation, technology,
              broker relations, owner-operator economics) and sets out what
              changed over the year and what it means for a one-truck
              operator or a small fleet. The reports are written to be read
              start to finish, but every section stands on its own, so you
              can go straight to the question you have.
            </p>
            <h2>How to read a report</h2>
            <p>
              Numbers in a report come with the source they were taken from
              and the period they describe. Where a figure is our own
              estimate or an illustration, the text says so. Where public
              sources disagree, we show the range instead of picking one.
              Treat a report as background for a decision, then check the
              current figure at the source before you act on it: rates,
              rules, and prices move between editions.
            </p>
            <h2>Corrections</h2>
            <p>
              If you find an error or a source that has been superseded,
              email{" "}
              <a href="mailto:support@dispatched.finance">
                support@dispatched.finance
              </a>
              . Corrections are made in the report itself and the page&apos;s
              updated date changes with them.
            </p>
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
