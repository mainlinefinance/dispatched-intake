type Props = {
  eyebrow: string;
  headline: string;
  subhead: string;
  metric?: {
    label: string;
    value: string;
    delta?: string;
    deltaDirection?: "up" | "down" | "flat";
  };
  children?: React.ReactNode;
};

export default function PulseHero({
  eyebrow,
  headline,
  subhead,
  metric,
  children,
}: Props) {
  return (
    <header className="pulse-hero">
      <div className="pulse-hero-text">
        <p className="pulse-eyebrow">{eyebrow}</p>
        <h1 className="pulse-h1">{headline}</h1>
        <p className="pulse-subhead">{subhead}</p>
        {children}
      </div>
      {metric ? (
        <div
          className={`pulse-hero-metric pulse-hero-metric--${metric.deltaDirection ?? "flat"}`}
        >
          <p className="pulse-metric-label">{metric.label}</p>
          <p className="pulse-metric-value">{metric.value}</p>
          {metric.delta ? (
            <p className="pulse-metric-delta">{metric.delta}</p>
          ) : null}
        </div>
      ) : null}
    </header>
  );
}
