export default function Home() {
  return (
    <main
      style={{
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--space-6)",
        background: "var(--color-bg-paper)",
      }}
    >
      <div style={{ maxWidth: 480, textAlign: "center" }}>
        <div className="t-eyebrow">AI Capital Advisor</div>
        <h1 className="t-h1" style={{ marginTop: "var(--space-2)" }}>
          Working capital, matched in minutes.
        </h1>
        <p
          className="t-body"
          style={{
            color: "var(--color-ink-secondary)",
            marginTop: "var(--space-4)",
          }}
        >
          Checkpoint 1 — scaffold ready. The intake flow lands next.
        </p>
        <div
          className="t-mono"
          style={{
            marginTop: "var(--space-6)",
            color: "var(--color-hiviz-400)",
          }}
        >
          $47M funded · 31 hours average
        </div>
      </div>
    </main>
  );
}
