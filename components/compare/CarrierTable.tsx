import type { Carrier } from "@/lib/data/carriers";

type Props = {
  carriers: Carrier[];
  caption?: string;
};

function amBestLabel(c: Carrier): string {
  if (c.notRated === true) return "Not Rated by AM Best";
  if (c.amBestRating && c.amBestVerifiedAt) {
    return `${c.amBestRating} (verified ${c.amBestVerifiedAt})`;
  }
  return "Pending verification";
}

export default function CarrierTable({ carriers, caption }: Props) {
  return (
    <>
      {caption ? <span className="ins-eyebrow">{caption}</span> : null}
      <table className="ins-carrier-table">
        <thead>
          <tr>
            <th scope="col">Carrier</th>
            <th scope="col">Parent group</th>
            <th scope="col">AM Best</th>
            <th scope="col">Notes</th>
          </tr>
        </thead>
        <tbody>
          {carriers.map((c) => (
            <tr key={c.slug}>
              <td className="ins-carrier-name" data-label="Carrier">
                {c.name}
              </td>
              <td data-label="Parent group">{c.parentGroup ?? "—"}</td>
              <td data-label="AM Best">{amBestLabel(c)}</td>
              <td data-label="Notes">{c.notes ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="ins-compliance-note">
        AM Best ratings are populated only when verified against ambest.com.
        Pending entries reflect that we have not completed verification, not
        that the carrier&apos;s rating is missing or weak.
      </p>
    </>
  );
}
