"use client";

import { useState, type FormEvent } from "react";
import {
  HDYHAU_CHANNELS,
  HDYHAU_CHANNEL_LABELS,
  HDYHAU_WRITE_IN_MAX,
  type HdyhauChannel,
  type HdyhauSource,
} from "@/lib/validation/hdyhauSchema";

/* HDYHAU survey — chip-style single-select. One tap on a chip submits
   the event. The "Other" chip opens an inline text input. Optional
   for the user: no submit required if they ignore it.

   AEO context: this closes D5 of the audit. Channels are ordered
   AI-first because copy-paste-from-ChatGPT arrivals are the slice
   GA4 channel grouping cannot see. */

type Props = {
  source: HdyhauSource;
  heading?: string;
};

const DEFAULT_HEADINGS: Record<HdyhauSource, string> = {
  apply: "Before you start — how'd you find Dispatched?",
  qualify: "Quick one — how'd you find Dispatched?",
};

export default function HdyhauSurvey({ source, heading }: Props) {
  const [selected, setSelected] = useState<HdyhauChannel | null>(null);
  const [writeIn, setWriteIn] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const headingText = heading ?? DEFAULT_HEADINGS[source];

  async function submit(channel: HdyhauChannel, writeInValue?: string) {
    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/hdyhau", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          channel,
          ...(writeInValue ? { writeIn: writeInValue } : {}),
          source,
        }),
      });
      if (!res.ok) {
        setErrorMsg("Could not save your answer. Refresh and try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setErrorMsg("Network error. Try again in a moment.");
      setStatus("error");
    }
  }

  function handleChipClick(channel: HdyhauChannel) {
    setSelected(channel);
    if (channel === "other") {
      // Wait for write-in submit
      return;
    }
    submit(channel);
  }

  function handleOtherSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = writeIn.trim();
    if (!trimmed) return;
    submit("other", trimmed);
  }

  if (status === "success") {
    return (
      <aside
        className="hdyhau hdyhau--success"
        aria-live="polite"
        data-source={source}
      >
        <p>Thanks — recorded.</p>
      </aside>
    );
  }

  return (
    <aside
      className="hdyhau"
      aria-labelledby="hdyhau-heading"
      data-source={source}
    >
      <h2 id="hdyhau-heading" className="hdyhau-heading">
        {headingText}
      </h2>
      <p className="hdyhau-sub">
        Optional. Helps us know which channels are sending the right
        operators.
      </p>
      <ul className="hdyhau-chips" role="list">
        {HDYHAU_CHANNELS.map((channel) => {
          const isActive = selected === channel;
          const isDisabled = status === "submitting" && !isActive;
          return (
            <li key={channel}>
              <button
                type="button"
                className={`hdyhau-chip${isActive ? " hdyhau-chip--active" : ""}`}
                aria-pressed={isActive}
                disabled={isDisabled}
                onClick={() => handleChipClick(channel)}
              >
                {HDYHAU_CHANNEL_LABELS[channel]}
              </button>
            </li>
          );
        })}
      </ul>

      {selected === "other" && (
        <form className="hdyhau-other-form" onSubmit={handleOtherSubmit}>
          <label htmlFor="hdyhau-other-input" className="visually-hidden">
            Tell us where you heard about Dispatched
          </label>
          <input
            id="hdyhau-other-input"
            type="text"
            maxLength={HDYHAU_WRITE_IN_MAX}
            placeholder="Where did you hear about us?"
            value={writeIn}
            onChange={(e) => setWriteIn(e.target.value)}
            disabled={status === "submitting"}
            className="hdyhau-other-input"
            autoFocus
          />
          <button
            type="submit"
            className="btn btn--secondary"
            disabled={status === "submitting" || writeIn.trim().length === 0}
          >
            {status === "submitting" ? "Sending…" : "Send"}
          </button>
        </form>
      )}

      {status === "error" && (
        <p className="hdyhau-error" role="alert">
          {errorMsg}
        </p>
      )}
    </aside>
  );
}
