/* Label and destination of the funding-application CTA, shared by every
   placement (nav, hero, section prompts, closing band, mobile bar).

   Kept out of Nav.tsx on purpose: that file is a "use client" module, and a
   Server Component that imports a plain value from a client module gets a
   client reference instead of the string. */
export const CTA_LABEL = "See my funding options";
export const APPLY_HREF = "/apply";

/* Elements the mobile sticky bar watches on the home page. It stands in for
   the hero's apply form once that scrolls away, and steps aside again while
   the closing band's own CTA is on screen. */
export const HERO_CTA_ID = "hero-cta";
export const CLOSING_CTA_ID = "closing-cta";

/* PostHog autocapture copies every data-ph-capture-attribute-<name> on the
   clicked element onto the event as the property <name>. Tagging each
   placement lets the funnel be split by where the click happened without
   shipping any client code for it. */
export function ctaPlacement(placement: string) {
  return { "data-ph-capture-attribute-cta": placement } as const;
}
