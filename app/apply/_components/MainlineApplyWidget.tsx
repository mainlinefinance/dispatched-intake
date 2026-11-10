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
import { parseQuickStartAnswers } from "@/lib/quickStart";

// dispatched.finance is operated by Dispatched, Inc. Mainline hosts the
// funding quiz for Big Think Capital at /w/<slug>. The frame posts to that
// host's /api/widget-lead. This repo does not call that API, does not see
// Big Think Capital's HTTP response, and does not treat the widget host's
// 2xx as acceptance. A conversion waits for the message defined in
// lib/ads/widget-events.ts, which the widget repository has to send.

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
  //
  // Answers a visitor gave before landing here (home hero, /qualify) ride
  // along on the frame URL. Whether the quiz starts from them is up to the
  // widget: see the contract note in lib/quickStart.ts.
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const attribution = persistAdsAttributionFromBrowser();
    const prefill = parseQuickStartAnswers(
      new URLSearchParams(window.location.search),
    );
    const src = buildMainlineWidgetSrc({
      widgetHost: WIDGET_HOST,
      attribution,
      prefill,
    });
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
      const leadId = leadIdFromAcceptedMessage({
        data: event.data,
        origin: event.origin,
        source: event.source,
        iframeWindow: iframe.contentWindow,
        widgetOrigin: WIDGET_ORIGIN,
      });
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
