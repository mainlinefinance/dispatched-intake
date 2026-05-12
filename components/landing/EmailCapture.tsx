'use client';

import { useState, type FormEvent } from "react";

type Props = {
  variant?: "inline" | "card"; // visual layout — inline is single-line; card is centered with heading
  heading?: string; // default: "Get monthly Dispatched insights"
  description?: string; // default: "Practical trucking finance content. No spam, unsubscribe anytime."
  ctaLabel?: string; // default: "Subscribe"
  source?: string; // tracking source (e.g., "calculator-owner-op-pl"); passed to API for analytics
};

export default function EmailCapture({
  variant = "card",
  heading,
  description,
  ctaLabel,
  source,
}: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: source ?? "unknown" }),
      });
      if (!res.ok) {
        const data: { error?: string } = await res
          .json()
          .catch(() => ({ error: "Subscription failed." }));
        setErrorMsg(data.error ?? "Subscription failed.");
        setStatus("error");
        return;
      }
      setStatus("success");
      setEmail("");
    } catch {
      setErrorMsg("Network error. Try again in a moment.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className={`email-capture email-capture--${variant} email-capture--success`}
      >
        <p>Thanks — check your inbox for confirmation.</p>
      </div>
    );
  }

  return (
    <form
      className={`email-capture email-capture--${variant}`}
      onSubmit={onSubmit}
      aria-live="polite"
    >
      {variant === "card" && heading && (
        <h3 className="email-capture-heading">{heading}</h3>
      )}
      {variant === "card" && description && (
        <p className="email-capture-description">{description}</p>
      )}
      <div className="email-capture-row">
        <label htmlFor="email-capture-input" className="visually-hidden">
          Email address
        </label>
        <input
          id="email-capture-input"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "submitting"}
          className="email-capture-input"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn btn--primary"
        >
          {status === "submitting" ? "Subscribing…" : (ctaLabel ?? "Subscribe")}
        </button>
      </div>
      {status === "error" && (
        <p className="email-capture-error" role="alert">
          {errorMsg}
        </p>
      )}
    </form>
  );
}
