import Link from "next/link";
import QualificationCalc from "./QualificationCalc";
import { CTA_LABEL } from "./Nav";
import { IconArrowRight } from "./icons";

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div>
          <div className="hero-eyebrow">
            <span className="dot" aria-hidden="true" />
            <span className="eyebrow">Built for trucking — Est. 2024</span>
          </div>
          <h1>
            Working capital for owner-operators and small fleets.
          </h1>
          <p className="subhead">
            No collateral. Bank decline is fine. We route your file to the 3–5
            lenders most likely to fund it — you see the terms before anyone
            pulls your credit.
          </p>
          <div className="hero-ctas">
            <Link href="/apply" className="btn btn--secondary btn--lg">
              {CTA_LABEL}
              <IconArrowRight />
            </Link>
          </div>
          <a href="#how-it-works" className="hero-how-link">
            Or read how the money moves →
          </a>
          <div className="trust-bar">
            <div className="item">
              <span className="amt">$25K–$250K</span>
              <span className="lbl">
                loan range
                <sup>3</sup>
              </span>
            </div>
            <span className="divider" aria-hidden="true" />
            <div className="item">
              <span className="amt">24–48 hrs</span>
              <span className="lbl">
                typical time to funds
                <sup>4</sup>
              </span>
            </div>
            <span className="divider" aria-hidden="true" />
            <div className="item">
              <span className="amt">$47M</span>
              <span className="lbl">
                funded · last 30 days
                <sup>1</sup>
              </span>
            </div>
            <span className="divider" aria-hidden="true" />
            <div className="item">
              <span className="amt">31 hrs</span>
              <span className="lbl">
                median to funds
                <sup>2</sup>
              </span>
            </div>
          </div>
          <div className="trust-note">
            <sup>1</sup> Principal funded to Dispatched-matched borrowers, Mar
            20 – Apr 19, 2026. <sup>2</sup> Median hours from completed
            application to wire, last 90 days. <sup>3</sup> Loan amount range
            reflects offers issued by panel lenders to qualified borrowers;
            actual approval amount depends on revenue, time in business, and
            credit. <sup>4</sup> &ldquo;Typically funded in 24–48 hours&rdquo;
            refers to the span between a lender-signed application and funds
            wire across the trailing 90 days; individual timing depends on
            documentation completeness and banking-partner cutoffs.
          </div>
        </div>
        <QualificationCalc />
      </div>
    </section>
  );
}
