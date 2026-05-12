import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/landing/Nav";
import Footer from "@/components/landing/Footer";
import { JsonLd, breadcrumbList } from "@/components/seo/JsonLd";
import SearchBar from "@/components/search/SearchBar";
import { searchAll } from "@/lib/search";
import {
  TYPE_DISPLAY_ORDER,
  TYPE_LABELS,
  type SearchableItem,
  type SearchableType,
} from "@/lib/search/types";

/* ===========================================================================
   Site-wide search results page.

   Server-rendered, no client JS. Reads ?q= from the URL, filters the
   in-memory search index built by lib/search/index.ts, and renders
   results grouped by type in TYPE_DISPLAY_ORDER.

   robots: noindex on this page — search-results URLs are not crawl
   targets. The form posts to /search?q=... so every query produces a
   unique URL we'd otherwise have to police out of the index. follow:
   true preserves the outbound link equity into the result pages.

   This page is intentionally NOT in app/sitemap.ts.
   =========================================================================== */

const TITLE = "Search — Dispatched.finance";
const DESCRIPTION =
  "Search the Dispatched library — glossary, comparisons, research reports, calculators, blog, and lender directory.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/search" },
  robots: { index: false, follow: true },
};

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export default async function SearchPage({ searchParams }: Props) {
  const params = await searchParams;
  const rawQuery = params.q ?? "";
  const query = rawQuery.trim();
  const results = query.length >= 2 ? searchAll(query) : [];

  const grouped = groupByType(results);

  return (
    <div className="research-page">
      <JsonLd
        payload={breadcrumbList([
          { name: "Home", url: "https://dispatched.finance/" },
          { name: "Search", url: "https://dispatched.finance/search" },
        ])}
      />
      <Nav />
      <main id="main-content">
        <div className="research-container">
          <header className="research-header">
            <p className="research-eyebrow">Dispatched · Search</p>
            <h1 className="research-h1">
              {query ? `Results for "${query}"` : "Search the Dispatched library"}
            </h1>
            <p className="research-subhead">
              {query
                ? `${results.length} ${results.length === 1 ? "match" : "matches"} across glossary, blog, lenders, comparisons, research reports, calculators, and financing pages.`
                : "Search 300+ pages — glossary terms, blog posts, lender profiles, head-to-head comparisons, research reports, calculators, and every financing and insurance page."}
            </p>
            <div className="mt-6">
              <SearchBar defaultValue={query} variant="hero" />
            </div>
          </header>

          {query.length > 0 && query.length < 2 && (
            <section className="research-section">
              <p>Type at least two characters to search.</p>
            </section>
          )}

          {query.length >= 2 && results.length === 0 && (
            <section className="research-section">
              <h2>No matches</h2>
              <p>
                We couldn&apos;t find anything for &quot;{query}&quot;. Try a
                broader keyword — common starts include{" "}
                <Link href="/search?q=factoring">factoring</Link>,{" "}
                <Link href="/search?q=mc%20number">MC number</Link>,{" "}
                <Link href="/search?q=equipment">equipment financing</Link>,
                or browse the{" "}
                <Link href="/glossary">glossary</Link> and{" "}
                <Link href="/research">research index</Link>.
              </p>
            </section>
          )}

          {TYPE_DISPLAY_ORDER.map((type) => {
            const group = grouped.get(type);
            if (!group || group.length === 0) return null;
            return (
              <section
                key={type}
                className="research-section"
                id={`results-${type}`}
              >
                <h2>
                  {TYPE_LABELS[type]} <span className="research-meta">({group.length})</span>
                </h2>
                <ul className="research-list">
                  {group.map((item) => (
                    <li key={item.url}>
                      <Link href={item.url}>
                        <strong>{item.title}</strong>
                      </Link>
                      {item.category ? (
                        <>
                          {" "}
                          <span className="research-meta">· {item.category}</span>
                        </>
                      ) : null}
                      {" "}— {item.description}
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}

          {query.length === 0 && (
            <section className="research-section research-cta">
              <h2>Popular starting points</h2>
              <div className="research-cta-grid">
                <Link href="/glossary" className="research-cta-card">
                  <h3>Glossary</h3>
                  <p>
                    MC#, DOT#, BOC-3, IRP, IFTA, factoring, owner-operator — every
                    operating-authority and trucking-finance term defined.
                  </p>
                </Link>
                <Link href="/research" className="research-cta-card">
                  <h3>Research reports</h3>
                  <p>
                    Annual reports on trucking capital, insurance, fuel, broker
                    relations, and owner-operator economics.
                  </p>
                </Link>
                <Link href="/lenders" className="research-cta-card">
                  <h3>Lender directory</h3>
                  <p>
                    Editorial directory of trucking lenders — factoring,
                    equipment, working capital, ABL, premium financing.
                  </p>
                </Link>
                <Link href="/calculators" className="research-cta-card">
                  <h3>Calculators</h3>
                  <p>
                    Loan ceiling, factoring rate, lease vs buy, owner-operator
                    P&amp;L — fit estimators with no credit pull.
                  </p>
                </Link>
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

function groupByType(
  items: ReadonlyArray<SearchableItem>,
): Map<SearchableType, SearchableItem[]> {
  const m = new Map<SearchableType, SearchableItem[]>();
  for (const item of items) {
    const bucket = m.get(item.type);
    if (bucket) {
      bucket.push(item);
    } else {
      m.set(item.type, [item]);
    }
  }
  return m;
}
