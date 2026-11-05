import Image from "next/image";
import Link from "next/link";
import { HAS_SUPPORT_PHONE, PHONE_TEL } from "@/lib/contact";
import { IconArrowRight, IconPhone } from "./icons";

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
          Built for trucking
        </span>
        <h1 className="hero-title">Trucking capital built for owner-operators.</h1>
        <p className="hero-sub">
          Options may be available even if a bank has declined you; approval
          is not guaranteed. We introduce you to trucking-friendly financing
          partners who work with owner-operators and small fleets.
        </p>
        <p className="hero-disclosure">
          Dispatched is a referral service for commercial / business financing
          only — not a lender and not consumer credit. We are paid by financing
          partners when a loan is funded; we do not charge businesses a fee to
          apply.
        </p>
        <div className="hero-ctas">
          <Link
            href="/apply"
            className="btn btn--cta-green btn--lg hero-cta-primary"
          >
            See my funding options
            <IconArrowRight />
          </Link>
          <Link href="/qualify" className="hero-call-cta">
            Check your funding fit
            <IconArrowRight />
          </Link>
        </div>
        <p className="hero-cta-note">
          No hard credit pull to start.{" "}
          <span aria-hidden="true" className="hero-cta-note-sep">
            ·
          </span>{" "}
          Timing depends on the lender and your documents.
        </p>
        <div className="hero-quietlinks">
          {HAS_SUPPORT_PHONE ? (
            <a href={PHONE_TEL} className="hero-secondary-link">
              <IconPhone />
              Call a funding specialist
            </a>
          ) : (
            <a
              href="mailto:support@dispatched.finance"
              className="hero-secondary-link"
            >
              Email a funding specialist
            </a>
          )}
          <a href="#how-it-works" className="hero-secondary-link">
            How it works <IconArrowRight />
          </a>
        </div>
      </div>
    </section>
  );
}
