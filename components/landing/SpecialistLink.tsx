import { HAS_SUPPORT_PHONE, PHONE_DISPLAY, PHONE_TEL } from "@/lib/contact";
import { ctaPlacement } from "./cta";
import { IconPhone } from "./icons";

/* The one secondary action offered next to the apply CTA: a human. Calls
   when a support phone is configured, falls back to email when it is not
   (see lib/contact.ts). */
export default function SpecialistLink({
  className,
  placement,
}: {
  className: string;
  placement: string;
}) {
  if (HAS_SUPPORT_PHONE) {
    return (
      <a
        href={PHONE_TEL}
        className={className}
        {...ctaPlacement(`${placement}-call`)}
      >
        <IconPhone />
        <span>
          Talk to a specialist{" "}
          <span className="specialist-link-number">{PHONE_DISPLAY}</span>
        </span>
      </a>
    );
  }
  return (
    <a
      href="mailto:support@dispatched.finance"
      className={className}
      {...ctaPlacement(`${placement}-email`)}
    >
      Email a funding specialist
    </a>
  );
}
