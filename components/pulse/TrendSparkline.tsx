type Point = { period: string; pricePerGallon: number };

type Props = {
  series: ReadonlyArray<Point>;
  width?: number;
  height?: number;
  ariaLabel: string;
};

export default function TrendSparkline({
  series,
  width = 160,
  height = 40,
  ariaLabel,
}: Props) {
  if (series.length < 2) {
    return null;
  }
  const values = series.map((p) => p.pricePerGallon);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const stepX = width / (series.length - 1);
  const pts = series.map((p, i) => {
    const x = i * stepX;
    const y = height - ((p.pricePerGallon - min) / range) * height;
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  });
  const last = series[series.length - 1];
  const first = series[0];
  if (!last || !first) return null;
  const directionUp = last.pricePerGallon >= first.pricePerGallon;
  return (
    <svg
      role="img"
      aria-label={ariaLabel}
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      className={`pulse-sparkline pulse-sparkline--${directionUp ? "up" : "down"}`}
    >
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={pts.join(" ")}
      />
    </svg>
  );
}
