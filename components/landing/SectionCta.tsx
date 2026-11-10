import Link from "next/link";
import { APPLY_HREF, CTA_LABEL, ctaPlacement } from "./cta";
import { IconArrowRight } from "./icons";

/* Apply prompt that closes a persuasion section, so a visitor who has just
   been convinced does not have to scroll back to the hero to act on it. */
export default function SectionCta({
  placement,
  lead,
  note,
}: {
  /* Reported to analytics as the `cta` property of the click. */
  placement: string;
  lead: string;
  note: string;
}) {
  return (
    <div className="section-cta">
      <p className="section-cta-lead">{lead}</p>
      <Link
        href={APPLY_HREF}
        className="btn btn--primary btn--lg"
        {...ctaPlacement(placement)}
      >
        {CTA_LABEL}
        <IconArrowRight />
      </Link>
      <p className="section-cta-note">{note}</p>
    </div>
  );
}
