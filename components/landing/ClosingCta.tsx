import Link from "next/link";
import {
  APPLY_HREF,
  CLOSING_CTA_ID,
  CTA_LABEL,
  ctaPlacement,
} from "./cta";
import { IconArrowRight } from "./icons";
import SpecialistLink from "./SpecialistLink";

/* Last word of the funding pitch: sits right under the FAQ, where the
   visitor's remaining objections have just been answered. */
export default function ClosingCta() {
  return (
    <section className="closing-cta" aria-labelledby="closing-cta-title">
      <div className="container closing-cta-inner">
        <span className="closing-cta-eyebrow">Ready when you are</span>
        <h2 className="closing-cta-title" id="closing-cta-title">
          See your funding options.
        </h2>
        <p className="closing-cta-sub">
          One application, one soft check. Approval is not guaranteed, and
          you see full terms before you sign anything.
        </p>
        <div className="closing-cta-actions">
          <Link
            id={CLOSING_CTA_ID}
            href={APPLY_HREF}
            className="btn btn--cta-green btn--lg closing-cta-primary"
            {...ctaPlacement("home-closing")}
          >
            {CTA_LABEL}
            <IconArrowRight />
          </Link>
          <SpecialistLink
            className="closing-cta-secondary"
            placement="home-closing"
          />
        </div>
        <p className="closing-cta-note">
          No hard credit pull to start.{" "}
          <span aria-hidden="true" className="closing-cta-note-sep">
            ·
          </span>{" "}
          Timing depends on the lender and your documents.
        </p>
      </div>
    </section>
  );
}
