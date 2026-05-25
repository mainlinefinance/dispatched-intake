import Link from "next/link";
import type { DieselRegion } from "@/lib/validation/pulseSchema";
import { formatPrice } from "@/lib/data/intel/diesel";
import TrendSparkline from "./TrendSparkline";

type Props = {
  regions: ReadonlyArray<DieselRegion>;
};

export default function DieselTable({ regions }: Props) {
  return (
    <div className="pulse-table-wrap">
      <table className="pulse-table pulse-table--diesel">
        <thead>
          <tr>
            <th scope="col">Region</th>
            <th scope="col" className="num">Current</th>
            <th scope="col" className="num">WoW</th>
            <th scope="col" className="num">YoY</th>
            <th scope="col" className="num">9-week trend</th>
          </tr>
        </thead>
        <tbody>
          {regions.map((r) => {
            const downWoW = r.changeAbs < 0;
            return (
              <tr key={r.slug}>
                <th scope="row">
                  {r.slug === "national" ? (
                    <span>{r.label}</span>
                  ) : (
                    <Link href={`/pulse/diesel/${r.slug}`}>{r.label}</Link>
                  )}
                </th>
                <td className="num pulse-num--strong">{formatPrice(r.current)}</td>
                <td
                  className={`num ${downWoW ? "pulse-delta--down" : "pulse-delta--up"}`}
                >
                  {downWoW ? "" : "+"}
                  {r.changeAbs.toFixed(3)}{" "}
                  <span className="pulse-delta-pct">
                    ({downWoW ? "" : "+"}
                    {r.changePct.toFixed(1)}%)
                  </span>
                </td>
                <td className="num">
                  {r.yoyChangePct === undefined ? (
                    "—"
                  ) : (
                    <span
                      className={
                        r.yoyChangePct < 0
                          ? "pulse-delta--down"
                          : "pulse-delta--up"
                      }
                    >
                      {r.yoyChangePct >= 0 ? "+" : ""}
                      {r.yoyChangePct.toFixed(1)}%
                    </span>
                  )}
                </td>
                <td className="num">
                  <TrendSparkline
                    series={r.series}
                    ariaLabel={`${r.label} nine-week diesel price trend`}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
