"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import posthog from "posthog-js";

/* Outbound affiliate/partner CTA link.

   Renders a normal new-tab anchor and fires a fire-and-forget PostHog
   `referral_click` event on click. The event matches the contract used on
   the mainline-app tenant blogs so a single network-wide referral funnel
   works in the shared PostHog project (super-property `site` distinguishes
   the originating app).

   The capture is wrapped in try/catch and never calls preventDefault — the
   browser opens the link normally regardless of whether analytics fire. */

type OutboundLinkProps = {
  href: string;
  /* Partner/lender display name (e.g. "Coverdash", "Apex Capital"). */
  partner: string;
  /* Extra cheap context to attach to the referral_click event. */
  eventProps?: Record<string, unknown>;
  children?: ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick">;

export default function OutboundLink({
  href,
  partner,
  eventProps,
  children,
  ...rest
}: OutboundLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        try {
          posthog.capture("referral_click", {
            partner,
            url: href,
            path: window.location.pathname,
            referrer: document.referrer || null,
            ...eventProps,
          });
        } catch {
          // Fire-and-forget: never let analytics break navigation.
        }
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
