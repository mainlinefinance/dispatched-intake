import type { Metadata } from "next";
import Link from "next/link";
import {
  JsonLd,
  article,
  breadcrumbList,
  itemList,
} from "@/components/seo/JsonLd";
import {
  BLOG_TOPICS,
  getAllPosts,
  getPostsByTopic,
} from "@/lib/data/blog";

const CANONICAL = "/blog";
const ABS_URL = "https://dispatched.finance/blog";

const TITLE = "Dispatched Blog — Trucking Finance & Operations";
const DESCRIPTION =
  "Practical, source-cited articles on trucking finance, factoring, equipment, insurance, and operations for owner-operators and small fleets.";

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

export default function BlogIndexPage() {
  const today = new Date().toISOString().slice(0, 10);
  const groups = getPostsByTopic();
  const allPosts = getAllPosts();

  // Featured: top 3 by recency (publishedDate desc). Tie-break by title.
  const featured = [...allPosts]
    .sort((a, b) => {
      if (a.publishedDate === b.publishedDate) {
        return a.title.localeCompare(b.title);
      }
      return a.publishedDate < b.publishedDate ? 1 : -1;
    })
    .slice(0, 3);

  return (
    <div className="research-page">
      <JsonLd
        payload={breadcrumbList([
          { name: "Home", url: "https://dispatched.finance/" },
          { name: "Blog", url: ABS_URL },
        ])}
      />
      <JsonLd
        payload={article({
          headline: "Dispatched Blog",
          description: DESCRIPTION,
          url: ABS_URL,
          datePublished: today,
          dateModified: today,
        })}
      />
      <JsonLd
        payload={itemList({
          name: "Dispatched Blog Posts",
          description: DESCRIPTION,
          items: allPosts.map((p) => ({
            name: p.title,
            url: `${ABS_URL}/${p.slug}`,
            description: p.metaDescription,
          })),
        })}
      />

      <main id="main-content">
        <div className="research-container">
          <header className="research-header">
            <p className="research-eyebrow">Dispatched · Blog</p>
            <h1 className="research-h1">Dispatched blog.</h1>
            <p className="research-subhead">
              Practical, source-cited articles on trucking finance, factoring,
              equipment, insurance, and operations. Updated regularly. Source
              for owner-operators and small fleets in 2026.
            </p>
            <p className="research-meta">
              {allPosts.length} posts · Source-cited · Updated {today}
            </p>
          </header>

          <section className="research-section" id="featured">
            <h2>Featured</h2>
            <ul className="research-list">
              {featured.map((p) => (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}`}>
                    <strong>{p.title}</strong>
                  </Link>{" "}
                  — {p.subhead}{" "}
                  <em>
                    ({BLOG_TOPICS[p.topic]} · {p.readTimeMinutes} min ·{" "}
                    {p.publishedDate})
                  </em>
                </li>
              ))}
            </ul>
          </section>

          {groups.map((g) => (
            <section
              key={g.topic}
              className="research-section"
              id={g.topic}
            >
              <h2>{g.label}</h2>
              <ul className="research-list">
                {g.posts.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/blog/${p.slug}`}>
                      <strong>{p.title}</strong>
                    </Link>{" "}
                    — {p.subhead}{" "}
                    <em>
                      ({p.readTimeMinutes} min · {p.publishedDate})
                    </em>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <section className="research-section research-cta">
            <h2>Ready to put the playbook to work?</h2>
            <p>
              The blog is the upper-funnel layer underneath the money pages.
              If you are an owner-operator or small fleet ready to move on
              financing, factoring, or insurance, start the matching flow.
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
                href="/factoring"
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
