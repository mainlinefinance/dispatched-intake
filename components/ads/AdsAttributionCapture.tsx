"use client";

import { useLayoutEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { persistAdsAttributionFromBrowser } from "@/lib/ads/attribution";

// Runs on each URL so a landing click is stored before the operator follows
// an internal link that does not keep the query string.
export default function AdsAttributionCapture() {
  const pathname = usePathname();
  const search = useSearchParams();

  useLayoutEffect(() => {
    persistAdsAttributionFromBrowser();
  }, [pathname, search]);

  return null;
}
