"use client";

import { useEffect } from "react";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

/* PostHog product analytics.

   Reports into the shared Mainline PostHog project (US region, project
   428185) — the same project that powers mainline-app's tenant blogs. The
   publishable project key is client-side safe, so it's baked in as the
   default and the app works on Render without provisioning any env var.
   Override via NEXT_PUBLIC_POSTHOG_KEY / NEXT_PUBLIC_POSTHOG_HOST if the
   project ever moves.

   defaults: "2025-05-24" opts into PostHog's current App Router behaviour,
   which wires automatic pageview + pageleave capture for client-side
   navigations — no manual router instrumentation needed. */

const POSTHOG_KEY =
  process.env.NEXT_PUBLIC_POSTHOG_KEY ??
  "phc_o5qp8URU8jp3hTPVGWkuABjdGKjpiHstuxqSvh39w5Uc";
const POSTHOG_HOST =
  process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      ui_host: "https://us.posthog.com",
      defaults: "2025-05-24",
      autocapture: true,
      persistence: "localStorage+cookie",
      loaded: (ph) => {
        // Tag every event so this app is attributable in the shared project.
        ph.register({ site: "dispatched-intake" });
      },
    });
  }, []);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
