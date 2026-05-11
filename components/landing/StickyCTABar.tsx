"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Props = {
  text: string;
  primaryCtaHref: string;
  primaryCtaLabel: string;
  showAfterScrollY?: number;
};

export default function StickyCTABar({
  text,
  primaryCtaHref,
  primaryCtaLabel,
  showAfterScrollY = 500,
}: Props) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > showAfterScrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [showAfterScrollY]);

  if (!isVisible) return null;

  return (
    <div className="sticky-cta-bar" role="region" aria-label="Quick action">
      <p className="sticky-cta-text">{text}</p>
      <Link href={primaryCtaHref} className="btn btn--primary">
        {primaryCtaLabel}
      </Link>
    </div>
  );
}
