import Link from "next/link";

export default function InsuranceNotFound() {
  return (
    <div className="ins-page">
      <main id="main-content">
        <section className="ins-hero">
          <div className="ins-container">
            <span className="ins-eyebrow">404</span>
            <h1 className="ins-hero-title">
              That insurance page hasn&apos;t been published yet.
            </h1>
            <p className="ins-hero-sub">
              We publish state and DOT-class pages only after the editorial
              body and reviewer attestation are complete. The URL you visited
              isn&apos;t on the live list yet.
            </p>
            <p>
              <Link href="/insurance">← Back to all insurance products</Link>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
