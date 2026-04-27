import type { Carrier } from "@/lib/data/carriers";

type Props = {
  carrier: Carrier;
};

export default function CarrierScoreCard({ carrier }: Props) {
  const ratingLabel =
    carrier.notRated === true
      ? "Not Rated by AM Best"
      : carrier.amBestRating && carrier.amBestVerifiedAt
        ? `${carrier.amBestRating} (verified ${carrier.amBestVerifiedAt})`
        : "Rating pending verification";
  return (
    <article className="ins-product-card" aria-label={carrier.name}>
      <h3>{carrier.name}</h3>
      {carrier.parentGroup ? (
        <p>
          <span className="ins-state-tile-tag">Parent group:</span>{" "}
          {carrier.parentGroup}
        </p>
      ) : null}
      {carrier.notes ? <p>{carrier.notes}</p> : null}
      <span className="ins-product-card-footer">{ratingLabel}</span>
    </article>
  );
}
