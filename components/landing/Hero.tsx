import Link from "next/link";
import HeroDataFlow from "./HeroDataFlow";
import QualificationCalc from "./QualificationCalc";
import { CTA_LABEL } from "./Nav";
import { IconArrowRight } from "./icons";

export default function Hero() {
  return (
    <section className="hero" data-screen-label="01 Hero">
      <div className="container hero-grid">
        <div>
          <div className="hero-eyebrow">
            <span className="dot" aria-hidden="true" />
            <span className="eyebrow">Built for trucking — Est. 2024</span>
          </div>
          <h1>
            Working capital for owner-operators and small fleets.{" "}
            <span
              className="mono"
              style={{
                fontSize: "inherit",
                color: "var(--color-steel-600)",
                fontWeight: 500,
              }}
            >
              $25K–$250K
            </span>
            , typically funded in 24–48 hours.
          </h1>
          <p className="subhead">
            No collateral. Bank decline is fine. We route your file to the 3–5
            lenders most likely to fund it — you see the terms before anyone
            pulls your credit.
          </p>
          <div className="hero-ctas">
            <Link href="/apply" className="btn btn--primary btn--lg">
              {CTA_LABEL}
              <IconArrowRight />
            </Link>
            <a href="#how-it-works" className="btn btn--secondary">
              How it works
            </a>
          </div>
          <HeroDataFlow />
          <div className="trust-bar" style={{ marginTop: 24 }}>
            <div className="item">
              <span className="amt">$47M</span>
              <span className="lbl">
                funded · last 30 days
                <sup style={{ fontSize: 10 }}>1</sup>
              </span>
            </div>
            <span className="divider" aria-hidden="true" />
            <div className="item">
              <span className="amt">31 hrs</span>
              <span className="lbl">
                median to funds
                <sup style={{ fontSize: 10 }}>2</sup>
              </span>
            </div>
          </div>
          <div className="trust-note">
            <sup>1</sup> Principal funded to Dispatched-matched borrowers, Mar
            20 – Apr 19, 2026. <sup>2</sup> Median hours from completed
            application to wire, last 90 days. Typical experience varies.
          </div>
        </div>
        <QualificationCalc />
      </div>
    </section>
  );
}
