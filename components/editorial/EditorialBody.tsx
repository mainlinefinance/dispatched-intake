import type { EditorialBody as EditorialBodyType } from "@/lib/data/editorial";

type Props = {
  body: EditorialBodyType;
};

export default function EditorialBody({ body }: Props) {
  return (
    <section>
      <div className="ins-container">
        <span className="ins-eyebrow">Editorial</span>
        <h2 className="ins-hero-title">{body.headline}</h2>
        {body.paragraphs.map((p, i) => (
          <p key={i} className="ins-hero-sub">
            {p}
          </p>
        ))}
        {body.sources.length > 0 ? (
          <div className="ins-sources">
            <h3 className="ins-eyebrow">Sources</h3>
            <ul>
              {body.sources.map((s, i) => (
                <li key={i}>
                  {s.url ? (
                    <a href={s.url} rel="noopener" target="_blank">
                      {s.label}
                    </a>
                  ) : (
                    <span>{s.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        {body.reviewer && body.lastReviewedAt ? (
          <p className="ins-compliance-note">
            Reviewed by {body.reviewer.name}, {body.reviewer.credential}, on{" "}
            {body.lastReviewedAt}.
          </p>
        ) : (
          <p className="ins-compliance-note">
            Reviewer attestation pending. The editorial body above is sourced
            but has not yet been signed off by a credentialed reviewer.
          </p>
        )}
      </div>
    </section>
  );
}
