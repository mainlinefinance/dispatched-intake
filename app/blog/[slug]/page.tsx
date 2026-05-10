import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  JsonLd,
  article,
  breadcrumbList,
  faqPage,
} from "@/components/seo/JsonLd";
import {
  BLOG_TOPICS,
  getAllPosts,
  getPost,
  type BlogPost,
} from "@/lib/data/blog";
import { getTerm } from "@/lib/data/glossary";

type Params = { slug: string };

export const dynamicParams = false;

export async function generateStaticParams(): Promise<Params[]> {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

const ORIGIN = "https://dispatched.finance";
const BLOG_URL = `${ORIGIN}/blog`;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  const canonical = `/blog/${p.slug}`;
  return {
    title: p.metaTitle,
    description: p.metaDescription,
    alternates: { canonical },
    openGraph: {
      title: p.metaTitle,
      description: p.metaDescription,
      url: canonical,
      type: "article",
      publishedTime: p.publishedDate,
      modifiedTime: p.updatedDate,
    },
    twitter: {
      card: "summary_large_image",
      title: p.metaTitle,
      description: p.metaDescription,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();

  const url = `${ORIGIN}/blog/${p.slug}`;
  const relatedPosts = p.relatedPosts
    .map((rs) => getPost(rs))
    .filter((x): x is BlogPost => Boolean(x));
  const relatedGlossaryTerms = p.relatedGlossary
    .map((s) => getTerm(s))
    .filter((x): x is NonNullable<ReturnType<typeof getTerm>> => Boolean(x));

  return (
    <div className="research-page">
      <JsonLd
        payload={breadcrumbList([
          { name: "Home", url: `${ORIGIN}/` },
          { name: "Blog", url: BLOG_URL },
          { name: p.title, url },
        ])}
      />
      <JsonLd
        payload={article({
          headline: p.title,
          description: p.metaDescription,
          url,
          datePublished: p.publishedDate,
          dateModified: p.updatedDate,
        })}
      />
      {p.faqs && p.faqs.length > 0 ? (
        <JsonLd payload={faqPage(p.faqs.map((f) => ({ q: f.q, a: f.a })))} />
      ) : null}

      <main id="main-content">
        <div className="research-container">
          <header className="research-header">
            <p className="research-eyebrow">
              Blog · {BLOG_TOPICS[p.topic]} · {p.readTimeMinutes} min read ·{" "}
              {p.publishedDate}
            </p>
            <h1 className="research-h1">{p.title}</h1>
            <p className="research-subhead">{p.subhead}</p>
            <p className="research-meta">
              <Link href="/blog">All blog posts</Link>
            </p>
          </header>

          {p.sections.map((s, i) => (
            <section key={i} className="research-section">
              <h2>{s.h2}</h2>
              {s.body.split("\n\n").map((para, j) => (
                <p key={j}>{para}</p>
              ))}
            </section>
          ))}

          {p.faqs && p.faqs.length > 0 ? (
            <section className="research-section">
              <h2>FAQ</h2>
              {p.faqs.map((f, i) => (
                <div key={i}>
                  <h3>{f.q}</h3>
                  <p>{f.a}</p>
                </div>
              ))}
            </section>
          ) : null}

          {relatedGlossaryTerms.length > 0 ? (
            <section className="research-section">
              <h2>Related glossary terms</h2>
              <ul className="research-list">
                {relatedGlossaryTerms.map((rt) => (
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

          {p.relatedProducts.length > 0 ? (
            <section className="research-section">
              <h2>Related Dispatched products</h2>
              <ul className="research-list">
                {p.relatedProducts.map((rp) => (
                  <li key={rp.url}>
                    <Link href={rp.url}>
                      <strong>{rp.label}</strong>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {relatedPosts.length > 0 ? (
            <section className="research-section">
              <h2>Related posts</h2>
              <ul className="research-list">
                {relatedPosts.map((rp) => (
                  <li key={rp.slug}>
                    <Link href={`/blog/${rp.slug}`}>
                      <strong>{rp.title}</strong>
                    </Link>{" "}
                    — {rp.subhead}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <section className="research-section research-cta">
            <h2>Ready to qualify?</h2>
            <p>
              The post above is the upper-funnel layer. If you are ready to
              move on financing, factoring, or insurance, start the matching
              flow — soft pull, no credit impact to begin.
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
              <Link href="/blog" className="research-cta-card">
                <h3>Browse the full blog</h3>
                <p>
                  Trucking finance, factoring, equipment, insurance, and
                  operations — practical, source-cited articles for
                  owner-operators and small fleets.
                </p>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
