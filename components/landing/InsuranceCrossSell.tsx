import Link from "next/link";

/* Rendered after the closing apply CTA, as an "also" for visitors who are
   done with the funding pitch. The button is the secondary variant so it
   does not compete with the apply CTA directly above it. */
export default function InsuranceCrossSell() {
  return (
    <section className="section sunken">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Also from Dispatched</span>
          <h2>Commercial trucking insurance, by product and by state.</h2>
          <p>
            Compare primary liability, motor-truck-cargo, and the rest of the
            coverage stack across the carriers writing your DOT class — with
            the regulatory context that actually moves rates state to state.
            Same operator-first reporting discipline as the financing side.
          </p>
        </div>
        <div className="cross-sell-actions">
          <Link href="/insurance" className="btn btn--secondary">
            See trucking insurance
          </Link>
          <Link href="/methodology" className="cross-sell-secondary">
            Read our rate methodology →
          </Link>
        </div>
      </div>
    </section>
  );
}
