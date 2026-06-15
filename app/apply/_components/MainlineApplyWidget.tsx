"use client";

import { useEffect, useRef } from "react";

// dispatched.finance is a registered Mainline widget partner. Mainline serves
// the BTC funding quiz as an embeddable form at /w/<slug>.
const PARTNER_SLUG = "dispatched-finance";

// "standard" variant — Mainline's VARIANT_MIN_HEIGHT.standard is 500px, so we
// seed the iframe at that height before the first resize message lands.
const VARIANT = "standard";
const MIN_HEIGHT_PX = 500;

const WIDGET_HOST =
  process.env.NEXT_PUBLIC_MAINLINE_WIDGET_HOST ?? "mainline.tryoption.ai";

interface ResizeMessage {
  type: "mainline-widget-resize";
  height: number;
}

// The framed page posts its content height so we can size the iframe and avoid
// an inner scrollbar. We pass page= because, under a strict Referrer-Policy,
// the in-frame document.referrer is empty — Mainline can't otherwise attribute
// the embedding page.
function buildWidgetSrc(): string {
  const page = encodeURIComponent(window.location.href);
  return `https://${WIDGET_HOST}/w/${PARTNER_SLUG}?page=${page}&variant=${VARIANT}`;
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

  // src is assigned imperatively after mount: buildWidgetSrc() needs `window`,
  // which is absent during server render, so the iframe renders srcless on the
  // server. We mount the iframe directly (not widget.js) because that loader
  // keys off document.currentScript, which is null under Next.js.
  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) iframe.src = buildWidgetSrc();
  }, []);

  useEffect(() => {
    function onMessage(event: MessageEvent<unknown>): void {
      const iframe = iframeRef.current;
      if (!iframe || event.source !== iframe.contentWindow) return;
      if (!isResizeMessage(event.data)) return;
      iframe.style.height = `${Math.ceil(event.data.height)}px`;
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
