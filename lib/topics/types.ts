import "server-only";

/* ===========================================================================
   Topic taxonomy types. Cross-cuts glossary/blog/comparisons/research/
   calculators/verticals — every content asset on the site rolls up to one or
   more canonical topics. The "I want everything about factoring" use case
   demanded a tag-based browse layer that surface-level navigation could not
   support.

   The 10 canonical topics are stable IDs. Adding a topic is a coordinated
   change: update ContentTopic, TOPIC_INFO, and the mapping in index.ts.
   =========================================================================== */

export type ContentTopic =
  | "factoring"
  | "equipment-financing"
  | "working-capital"
  | "insurance"
  | "owner-operator-life"
  | "compliance"
  | "operations"
  | "tech-and-telematics"
  | "new-authority"
  | "industry-trends";

export type TopicContentType =
  | "glossary"
  | "blog"
  | "comparison"
  | "research"
  | "calculator"
  | "vertical";

export type TopicInfo = {
  readonly slug: ContentTopic;
  readonly label: string;
  readonly description: string;
};

export type TopicContentItem = {
  readonly url: string;
  readonly title: string;
  readonly description: string;
  readonly contentType: TopicContentType;
};

export const CONTENT_TYPE_LABELS: Record<TopicContentType, string> = {
  glossary: "Glossary terms",
  blog: "Blog posts",
  comparison: "Comparisons",
  research: "Research reports",
  calculator: "Calculators",
  vertical: "Verticals & money pages",
};
