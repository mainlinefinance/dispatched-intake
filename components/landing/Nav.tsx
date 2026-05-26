"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/contact";
import Logo from "@/components/site/Logo";
import { IconClose, IconMenu, IconPhone } from "./icons";

export const CTA_LABEL = "See my funding options";

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const truckingActive =
    pathname === "/" ||
    pathname === "/trucking" ||
    pathname === "/trucking-working-capital";
  const insuranceActive =
    (pathname?.startsWith("/insurance") ?? false) ||
    (pathname?.startsWith("/carriers") ?? false);
  const pulseActive = pathname?.startsWith("/pulse") ?? false;
  /* Anchor sections (#how-it-works, #faq) live on the home page only.
     Off-home, ship a "/#anchor" so clicking navigates to home + scrolls
     instead of dead-anchoring on the current page and emitting a noise
     pageview to analytics. */
  const onHome = pathname === "/";
  const howItWorksHref = onHome ? "#how-it-works" : "/#how-it-works";
  const faqHref = onHome ? "#faq" : "/#faq";
  const close = () => setMobileOpen(false);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <>
      <nav className="nav">
        <div className="container nav-inner">
          <Logo />
          <div className="nav-links">
            <Link
              href="/trucking"
              className={truckingActive ? "active" : undefined}
              aria-current={truckingActive ? "page" : undefined}
            >
              Trucking capital
            </Link>
            <Link
              href="/insurance"
              className={insuranceActive ? "active" : undefined}
              aria-current={insuranceActive ? "page" : undefined}
            >
              Insurance
            </Link>
            <Link
              href="/pulse"
              className={pulseActive ? "active" : undefined}
              aria-current={pulseActive ? "page" : undefined}
            >
              Pulse
            </Link>
            <a href={howItWorksHref}>How it works</a>
            <a href={faqHref}>FAQ</a>
          </div>
          <div className="nav-right">
            <a href={PHONE_TEL} className="nav-phone">
              <IconPhone />
              {PHONE_DISPLAY}
            </a>
            <Link href="/apply" className="btn btn--primary btn--sm nav-cta">
              {CTA_LABEL}
            </Link>
            <button
              ref={triggerRef}
              type="button"
              className="mobile-menu-btn"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <IconClose /> : <IconMenu />}
            </button>
          </div>
        </div>
      </nav>
      <div
        id="mobile-menu"
        className={`mobile-menu ${mobileOpen ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        hidden={!mobileOpen}
      >
        <Link
          href="/trucking"
          onClick={close}
          className={truckingActive ? "active" : undefined}
          aria-current={truckingActive ? "page" : undefined}
        >
          Trucking capital
        </Link>
        <Link
          href="/insurance"
          onClick={close}
          className={insuranceActive ? "active" : undefined}
          aria-current={insuranceActive ? "page" : undefined}
        >
          Insurance
        </Link>
        <Link
          href="/pulse"
          onClick={close}
          className={pulseActive ? "active" : undefined}
          aria-current={pulseActive ? "page" : undefined}
        >
          Pulse
        </Link>
        <a href={howItWorksHref} onClick={close}>
          How it works
        </a>
        <a href={faqHref} onClick={close}>
          FAQ
        </a>
        <div className="mobile-foot">
          <a href={PHONE_TEL} className="mobile-phone" onClick={close}>
            Call {PHONE_DISPLAY}
          </a>
          <Link href="/apply" className="btn btn--primary" onClick={close}>
            {CTA_LABEL}
          </Link>
        </div>
      </div>
    </>
  );
}
