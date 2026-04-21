"use client";

import { IconArrowRight, IconPhone } from "@/components/icons";
import { BRAND, SCREEN7, SCREEN8 } from "@/lib/copy";

type Props =
  | { screen: "screen07"; onContinue: () => void }
  | { screen: "screen08"; isSubmitting: boolean }
  | { screen: "none" };

export default function BottomActions(props: Props) {
  if (props.screen === "none") return null;

  if (props.screen === "screen07") {
    return (
      <div className="bottom-actions">
        <button
          type="button"
          className="btn btn-primary"
          onClick={props.onContinue}
        >
          {SCREEN7.primaryCta} <IconArrowRight size={16} />
        </button>
        <a
          href={`tel:${BRAND.phone.replace(/\D/g, "")}`}
          className="btn btn-secondary"
        >
          <IconPhone size={14} /> {SCREEN7.secondaryCta}
        </a>
      </div>
    );
  }

  return (
    <div className="bottom-actions">
      <button
        type="submit"
        form="contact-form"
        className="btn btn-primary"
        disabled={props.isSubmitting}
      >
        {SCREEN8.submitCta} <IconArrowRight size={16} />
      </button>
      <div className="micro-copy">
        {SCREEN8.microcopyLead}{" "}
        <a href="#" aria-label="Terms of service">
          {SCREEN8.microcopyLink}
        </a>
        {SCREEN8.microcopyTail}
      </div>
    </div>
  );
}
