import Image from "next/image";
import Link from "next/link";
import { IconArrowRight } from "./icons";

/* Mobile-first photo hero. The image lives at
   /public/trucker-owner-operator-hero.jpg — when missing the navy scrim
   shows through and the headline still reads. */

export default function Hero() {
  return (
    <section className="hero hero--photo">
      <div className="hero-media" aria-hidden="true">
        <Image
          src="/trucker-owner-operator-hero.jpg"
          alt=""
          fill
          sizes="100vw"
          className="hero-photo"
          loading="eager"
          fetchPriority="high"
        />
        <div className="hero-scrim" />
      </div>
      <div className="container hero-content">
        <span className="hero-pill">
          <span className="dot" aria-hidden="true" />
          Built for trucking — Est. 2024
        </span>
        <h1 className="hero-title">Capital built for truckers.</h1>
        <p className="hero-sub">
          No collateral. Bank decline is okay. We match you with
          trucking-friendly lenders who fund owner-operators and small
          fleets.
        </p>
        <div className="hero-ctas">
          <Link
            href="/apply"
            className="btn btn--cta-green btn--lg hero-cta-primary"
          >
            See my options
            <IconArrowRight />
          </Link>
        </div>
        <a href="#how-it-works" className="hero-secondary-link">
          How it works <IconArrowRight />
        </a>
      </div>
    </section>
  );
}
