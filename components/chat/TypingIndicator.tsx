export default function TypingIndicator() {
  return (
    <div className="sys-row" aria-live="polite" aria-label="Dispatched is typing">
      <div className="sys-avatar" aria-hidden="true">D</div>
      <div className="dots" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}
