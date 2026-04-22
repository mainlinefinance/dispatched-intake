"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "./Logo";
import { IconClose, IconMenu, IconPhone } from "./icons";

export const PHONE_DISPLAY = "(555) 555-0100";
export const PHONE_TEL = "tel:+15555550100";
export const CTA_LABEL = "See what I qualify for";

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const close = () => setMobileOpen(false);

  return (
    <>
      <nav className="nav">
        <div className="container nav-inner">
          <Logo />
          <div className="nav-links">
            <a href="#" className="active">
              Trucking
            </a>
            <a href="#" className="soon">
              Construction <span className="soon-tag">Soon</span>
            </a>
            <a href="#how-it-works">How it works</a>
            <a href="#faq">FAQ</a>
          </div>
          <div className="nav-right">
            <a href={PHONE_TEL} className="nav-phone">
              <IconPhone />
              {PHONE_DISPLAY}
            </a>
            <Link href="/apply" className="btn-primary nav-cta sm">
              {CTA_LABEL}
            </Link>
            <button
              type="button"
              className="mobile-menu-btn"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <IconClose /> : <IconMenu />}
            </button>
          </div>
        </div>
      </nav>
      <div className={`mobile-menu ${mobileOpen ? "open" : ""}`}>
        <a href="#" onClick={close}>
          Trucking
        </a>
        <a href="#" onClick={close}>
          Construction — soon
        </a>
        <a href="#how-it-works" onClick={close}>
          How it works
        </a>
        <a href="#faq" onClick={close}>
          FAQ
        </a>
        <div className="mobile-foot">
          <a href={PHONE_TEL} className="mobile-phone" onClick={close}>
            Call {PHONE_DISPLAY}
          </a>
          <Link href="/apply" className="btn-primary" onClick={close}>
            {CTA_LABEL}
          </Link>
        </div>
      </div>
    </>
  );
}
