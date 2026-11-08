"use client";

import { useEffect, useRef } from "react";
import {
  buildMainlineWidgetSrc,
  persistAdsAttributionFromBrowser,
  resolveWidgetHost,
  widgetOriginForHost,
} from "@/lib/ads/attribution";
import { reportBrowserLeadConversion } from "@/lib/ads/google-ads";
import { leadIdFromAcceptedMessage } from "@/lib/ads/widget-events";

// dispatched.finance is a registered Mainline widget partner. Mainline serves
// the BTC funding quiz as an embeddable form at /w/<slug>. The framed page
// posts the application to that host's /api/widget-lead. This repo does not
// call that API and does not guess a WithFunded route.

// "standard" variant — Mainline's VARIANT_MIN_HEIGHT.standard is 500px, so we
// seed the iframe at that height before the first resize message lands.
const MIN_HEIGHT_PX = 500;

const WIDGET_HOST = resolveWidgetHost(process.env.NEXT_PUBLIC_MAINLINE_WIDGET_HOST);
const WIDGET_ORIGIN = widgetOriginForHost(WIDGET_HOST);

interface ResizeMessage {
  type: "mainline-widget-resize";
  height: number;
}

function isResizeMessage(data: unknown): data is ResizeMessage {
  if (typeof data !== "object" || data === null) return false;
  const candidate = data as Record<string, unknown>;
  return (
    candidate.type === "mainline-widget-resize" &&
    typeof candidate.height === "number" &&
    Number.isFinite(candidate.height)
  );
}

export default function MainlineApplyWidget() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // src is assigned after mount because it reads window and stored click
  // parameters. The iframe renders without a src on the server. We mount the
  // iframe directly (not widget.js) because that loader keys off
  // document.currentScript, which is null under Next.js.
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const attribution = persistAdsAttributionFromBrowser();
    const src = buildMainlineWidgetSrc({ widgetHost: WIDGET_HOST, attribution });
    if (src) iframe.src = src;
  }, []);

  useEffect(() => {
    function onMessage(event: MessageEvent<unknown>): void {
      const iframe = iframeRef.current;
      if (!iframe || event.source !== iframe.contentWindow) return;
      if (isResizeMessage(event.data)) {
        iframe.style.height = `${Math.ceil(event.data.height)}px`;
        return;
      }
      // Lead messages have to come from the widget origin. Resize stays
      // source-checked only, which is the behavior this frame already had.
      const leadId = leadIdFromAcceptedMessage(
        event.data,
        event.origin,
        WIDGET_ORIGIN,
      );
      if (!leadId) return;
      reportBrowserLeadConversion(leadId);
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <iframe
      ref={iframeRef}
      title="Funding application form"
      // Transparent so the page's cream background shows through instead of the
      // iframe painting an opaque white block behind Mainline's card. The framed
      // document must also keep a transparent <body> for this to take full
      // effect.
      allowTransparency
      style={{
        width: "100%",
        minHeight: MIN_HEIGHT_PX,
        border: 0,
        display: "block",
        background: "transparent",
      }}
    />
  );
}
