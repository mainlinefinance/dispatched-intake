import type { Metadata } from "next";
import Link from "next/link";
import {
  JsonLd,
  article,
  breadcrumbList,
  definedTermSet,
} from "@/components/seo/JsonLd";
import { getAllTerms, getTermsByCategory } from "@/lib/data/glossary";

const CANONICAL = "/glossary";
const ABS_URL = "https://dispatched.finance/glossary";

const TITLE = "Trucking Finance Glossary | Dispatched";
const DESCRIPTION =
  "Trucking finance and operating authority terms explained: MC#, DOT#, BOC-3, IRP, IFTA, UCR, factoring, owner-operator, and more.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: CANONICAL,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function GlossaryIndexPage() {
  const today = new Date().toISOString().slice(0, 10);
  const groups = getTermsByCategory();
  const allTerms = getAllTerms();

  return (
    <div className="research-page">
      <JsonLd
        payload={breadcrumbList([
          { name: "Home", url: "https://dispatched.finance/" },
          { name: "Glossary", url: ABS_URL },
        ])}
      />
      <JsonLd
        payload={article({
          headline: "Trucking Finance Glossary",
          description: DESCRIPTION,
          url: ABS_URL,
          datePublished: today,
          dateModified: today,
        })}
      />
      <JsonLd
        payload={definedTermSet({
          name: "Dispatched Trucking Finance Glossary",
          description: DESCRIPTION,
          url: ABS_URL,
          hasDefinedTerms: allTerms.map((t) => ({
            name: t.term,
            url: `${ABS_URL}/${t.slug}`,
          })),
        })}
      />

      <main id="main-content">
        <div className="research-container">
          <header className="research-header">
            <p className="research-eyebrow">Dispatched · Glossary</p>
            <h1 className="research-h1">Trucking finance glossary.</h1>
            <p className="research-subhead">
              Operating authority, factoring, and operator-type terms — the
              vocabulary every owner-operator and small fleet uses but few
              sites explain clearly.
            </p>
            <p className="research-meta">
              {allTerms.length} terms · Source-cited · Updated {today}
            </p>
          </header>

          {groups.map((g) => (
            <section
              key={g.category}
              className="research-section"
              id={g.category}
            >
              <h2>{g.label}</h2>
              <ul className="research-list">
                {g.terms.map((t) => (
                  <li key={t.slug}>
                    <Link href={`/glossary/${t.slug}`}>
                      <strong>
                        {t.term}
                        {t.abbreviation && t.abbreviation !== t.term
                          ? ` (${t.abbreviation})`
                          : ""}
                      </strong>
                    </Link>{" "}
                    — {t.shortDefinition}
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <section className="research-section research-cta">
            <h2>Ready to put the vocabulary to work?</h2>
            <p>
              The glossary is the upper-funnel layer underneath the money
              pages. If you are an owner-operator or small fleet ready to
              move on financing or factoring, start the matching flow.
            </p>
            <div className="research-cta-grid">
              <Link href="/qualify" className="research-cta-card">
                <h3>Qualify in 3 minutes</h3>
                <p>
                  Soft pull, no credit impact. We route you to the lender
                  panel matching your authority age, credit profile, and
                  capital need.
                </p>
              </Link>
              <Link
                href="/invoice-factoring-for-truckers"
                className="research-cta-card"
              >
                <h3>Compare factoring</h3>
                <p>
                  Recourse vs. non-recourse, fuel-card programs, and
                  broker-credit infrastructure across the major
                  trucking-factoring desks.
                </p>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
