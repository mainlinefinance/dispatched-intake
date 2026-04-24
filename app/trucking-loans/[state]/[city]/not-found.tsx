import Link from "next/link";

export default function GeoNotFound() {
  return (
    <div className="geo-page">
      <section className="geo-hero">
        <div className="geo-container">
          <span className="geo-eyebrow">Page not found</span>
          <h1 className="geo-hero-title">
            We don&apos;t have a local page for that city yet.
          </h1>
          <p className="geo-hero-sub">
            Dispatched matches capital for truckers and owner-operators
            nationwide. The flagship application works from any state — same 6-
            to 9-minute intake, same panel.
          </p>
          <div className="geo-hero-cta-row">
            <Link href="/trucking" className="btn btn--primary btn--lg">
              Go to the trucking page
            </Link>
            <Link href="/" className="btn btn--secondary btn--lg">
              Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
