import Link from "next/link";

export default function CarrierNotFound() {
  return (
    <div className="ins-page">
      <main id="main-content">
        <section className="ins-hero">
          <div className="ins-container">
            <span className="ins-eyebrow">404</span>
            <h1 className="ins-hero-title">Carrier not found.</h1>
            <p className="ins-hero-sub">
              We list a curated set of carriers writing commercial trucking
              insurance. The slug you visited isn&apos;t one of them.
            </p>
            <p>
              <Link href="/insurance">← Back to commercial trucking insurance</Link>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
