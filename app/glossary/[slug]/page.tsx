import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  JsonLd,
  article,
  breadcrumbList,
  definedTerm,
} from "@/components/seo/JsonLd";
import {
  CATEGORY_LABELS,
  getAllTerms,
  getTerm,
  type GlossaryTerm,
} from "@/lib/data/glossary";

type Params = { slug: string };

export const dynamicParams = false;

export async function generateStaticParams(): Promise<Params[]> {
  return getAllTerms().map((t) => ({ slug: t.slug }));
}

const ORIGIN = "https://dispatched.finance";
const SET_URL = `${ORIGIN}/glossary`;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const t = getTerm(slug);
  if (!t) return {};
  const titleBase =
    t.abbreviation && t.abbreviation !== t.term
      ? `${t.term} (${t.abbreviation}) — Trucking Glossary | Dispatched`
      : `${t.term} — Trucking Glossary | Dispatched`;
  const description = `${t.shortDefinition} | Dispatched trucking glossary`;
  const canonical = `/glossary/${t.slug}`;
  return {
    title: titleBase,
    description,
    alternates: { canonical },
    openGraph: {
      title: titleBase,
      description,
      url: canonical,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: titleBase,
      description,
    },
  };
}

export default async function GlossaryTermPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const t = getTerm(slug);
  if (!t) notFound();

  const today = new Date().toISOString().slice(0, 10);
  const url = `${ORIGIN}/glossary/${t.slug}`;
  const relatedTerms = t.relatedTerms
    .map((rs) => getTerm(rs))
    .filter((x): x is GlossaryTerm => Boolean(x));

  return (
    <div className="research-page">
      <JsonLd
        payload={breadcrumbList([
          { name: "Home", url: `${ORIGIN}/` },
          { name: "Glossary", url: SET_URL },
          { name: t.term, url },
        ])}
      />
      <JsonLd
        payload={article({
          headline: t.term,
          description: t.shortDefinition,
          url,
          datePublished: today,
          dateModified: today,
        })}
      />
      <JsonLd
        payload={definedTerm({
          name: t.term,
          description: t.shortDefinition,
          url,
          ...(t.termCode ? { termCode: t.termCode } : {}),
          inDefinedTermSetUrl: SET_URL,
        })}
      />

      <main id="main-content">
        <div className="research-container">
          <header className="research-header">
            <p className="research-eyebrow">
              Glossary · {CATEGORY_LABELS[t.category]}
            </p>
            <h1 className="research-h1">
              {t.term}
              {t.abbreviation && t.abbreviation !== t.term ? (
                <span> ({t.abbreviation})</span>
              ) : null}
              .
            </h1>
            <p className="research-subhead">{t.shortDefinition}</p>
            <p className="research-meta">
              <Link href="/glossary">All glossary terms</Link>
            </p>
          </header>

          {t.sections.map((s, i) => (
            <section key={i} className="research-section">
              <h2>{s.h2}</h2>
              {s.body.split("\n\n").map((para, j) => (
                <p key={j}>{para}</p>
              ))}
            </section>
          ))}

          {relatedTerms.length > 0 ? (
            <section className="research-section">
              <h2>Related terms</h2>
              <ul className="research-list">
                {relatedTerms.map((rt) => (
                  <li key={rt.slug}>
                    <Link href={`/glossary/${rt.slug}`}>
                      <strong>
                        {rt.term}
                        {rt.abbreviation && rt.abbreviation !== rt.term
                          ? ` (${rt.abbreviation})`
                          : ""}
                      </strong>
                    </Link>{" "}
                    — {rt.shortDefinition}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {t.relatedProducts.length > 0 ? (
            <section className="research-section">
              <h2>Related Dispatched products</h2>
              <ul className="research-list">
                {t.relatedProducts.map((p) => (
                  <li key={p.url}>
                    <Link href={p.url}>
                      <strong>{p.label}</strong>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <section className="research-section research-cta">
            <h2>Ready to qualify?</h2>
            <p>
              The vocabulary above is the upper-funnel layer. If you are
              ready to move on financing, factoring, or insurance, start the
              matching flow — soft pull, no credit impact to begin.
            </p>
            <div className="research-cta-grid">
              <Link href="/qualify" className="research-cta-card">
                <h3>Qualify in 3 minutes</h3>
                <p>
                  Soft pull, no credit impact. Routed to the lender panel
                  matching your authority age, credit profile, and capital
                  need.
                </p>
              </Link>
              <Link href="/glossary" className="research-cta-card">
                <h3>Browse the full glossary</h3>
                <p>
                  Operating authority, factoring, and operator-type terms —
                  the vocabulary every owner-operator and small fleet uses.
                </p>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
