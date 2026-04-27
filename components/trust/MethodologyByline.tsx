type Props = {
  lastUpdated?: string;
  methodology?: string;
  reviewerName?: string;
};

export default function MethodologyByline({
  lastUpdated,
  methodology,
  reviewerName,
}: Props) {
  return (
    <p className="ins-byline">
      <span>
        {lastUpdated
          ? `Last updated: ${lastUpdated}`
          : "Last updated: pending DOI extraction"}
      </span>
      <span>
        {methodology ?? "Methodology: state DOI public filings, no paid feeds"}
      </span>
      <span>{reviewerName ? `Reviewer: ${reviewerName}` : "Reviewer: pending"}</span>
    </p>
  );
}
