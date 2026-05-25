"use client";

import { useState, type FormEvent } from "react";

export type PulseInterest =
  | "diesel"
  | "freight"
  | "regulation"
  | "lender-appetite"
  | "digest";

type Props = {
  defaultInterest: PulseInterest;
  source: string;
  heading?: string;
  description?: string;
};

const INTEREST_OPTIONS: ReadonlyArray<{ id: PulseInterest; label: string }> = [
  { id: "digest", label: "Weekly digest (all pillars)" },
  { id: "diesel", label: "Diesel prices" },
  { id: "freight", label: "Freight rates" },
  { id: "regulation", label: "FMCSA & regulation" },
  { id: "lender-appetite", label: "Lender appetite" },
];

export default function PulseDigestSignup({
  defaultInterest,
  source,
  heading = "Subscribe to the Dispatched Pulse digest",
  description = "Operational intelligence for trucking businesses — diesel, freight, FMCSA, lender appetite. Weekly. Unsubscribe anytime.",
}: Props) {
  const [email, setEmail] = useState("");
  const [interests, setInterests] = useState<Set<PulseInterest>>(
    new Set([defaultInterest]),
  );
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function toggle(id: PulseInterest): void {
    setInterests((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function onSubmit(e: FormEvent): Promise<void> {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source,
          interests: Array.from(interests),
        }),
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
      <div className="pulse-digest pulse-digest--success">
        <p>Subscribed — your first digest will land next Monday.</p>
      </div>
    );
  }

  return (
    <form className="pulse-digest" onSubmit={onSubmit} aria-live="polite">
      <div className="pulse-digest-copy">
        <h3 className="pulse-digest-heading">{heading}</h3>
        <p className="pulse-digest-description">{description}</p>
      </div>
      <fieldset className="pulse-digest-interests">
        <legend className="visually-hidden">Topics</legend>
        {INTEREST_OPTIONS.map((o) => (
          <label key={o.id} className="pulse-digest-interest">
            <input
              type="checkbox"
              checked={interests.has(o.id)}
              onChange={() => toggle(o.id)}
              disabled={status === "submitting"}
            />
            <span>{o.label}</span>
          </label>
        ))}
      </fieldset>
      <div className="pulse-digest-row">
        <label htmlFor="pulse-digest-email" className="visually-hidden">
          Email address
        </label>
        <input
          id="pulse-digest-email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "submitting"}
          className="pulse-digest-input"
        />
        <button
          type="submit"
          disabled={status === "submitting" || interests.size === 0}
          className="btn btn--primary"
        >
          {status === "submitting" ? "Subscribing…" : "Subscribe"}
        </button>
      </div>
      {status === "error" ? (
        <p className="pulse-digest-error" role="alert">
          {errorMsg}
        </p>
      ) : null}
    </form>
  );
}
