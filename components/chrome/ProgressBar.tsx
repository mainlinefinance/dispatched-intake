type Props = { pct: number };

export default function ProgressBar({ pct }: Props) {
  const clamped = Math.max(0, Math.min(100, pct));
  return (
    <div
      className="progress"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clamped}
    >
      <div className="fill" style={{ width: `${clamped}%` }} />
    </div>
  );
}
