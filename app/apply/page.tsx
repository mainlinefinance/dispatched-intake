import type { Metadata } from "next";
import LendflowWidget from "./_components/LendflowWidget";

export const metadata: Metadata = {
  title: "Apply for funding — Dispatched",
  description:
    "Get matched with funding partners in minutes. Soft match, no impact to your credit.",
};

export default function ApplyPage() {
  return (
    <main
      id="main-content"
      style={{
        maxWidth: 760,
        margin: "0 auto",
        padding: "var(--space-12) var(--gutter-mobile)",
      }}
    >
      <header style={{ marginBottom: "var(--space-8)" }}>
        <h1 className="t-h1">Apply for funding</h1>
        <p
          className="t-body-lg"
          style={{ color: "var(--color-ink-secondary)" }}
        >
          Get matched with funding partners in minutes. No impact to your
          credit.
        </p>
      </header>
      <LendflowWidget />
    </main>
  );
}
