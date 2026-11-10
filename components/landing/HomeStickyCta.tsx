"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { HAS_SUPPORT_PHONE, PHONE_TEL } from "@/lib/contact";
import {
  APPLY_HREF,
  CLOSING_CTA_ID,
  CTA_LABEL,
  HERO_CTA_ID,
  ctaPlacement,
} from "./cta";
import { IconArrowRight, IconPhone } from "./icons";

/* Phone-only apply bar for the home page (CSS hides it above 720px, where
   the sticky nav already carries the CTA).

   The rule is "one apply CTA on screen, never two": the bar is up whenever
   neither the hero CTA nor the closing band's CTA is visible. It is always
   in the DOM so it can slide in; while down it is inert, which keeps it out
   of the tab order and the accessibility tree. */
export default function HomeStickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const targets = [HERO_CTA_ID, CLOSING_CTA_ID]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    const onScreen = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) onScreen.add(entry.target);
        else onScreen.delete(entry.target);
      }
      setVisible(onScreen.size === 0);
    });
    for (const target of targets) observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="home-sticky-cta"
      data-visible={visible ? "true" : "false"}
      inert={!visible}
    >
      {HAS_SUPPORT_PHONE ? (
        <a
          href={PHONE_TEL}
          className="btn btn--secondary home-sticky-cta-call"
          {...ctaPlacement("home-sticky-call")}
        >
          <IconPhone />
          <span className="home-sticky-cta-call-label">Call</span>
        </a>
      ) : null}
      <Link
        href={APPLY_HREF}
        className="btn btn--primary home-sticky-cta-apply"
        {...ctaPlacement("home-sticky")}
      >
        {CTA_LABEL}
        <IconArrowRight />
      </Link>
    </div>
  );
}
