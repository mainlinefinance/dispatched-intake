"use client";

import { useState } from "react";
import { IconChevronDown } from "@/components/landing/icons";

type FaqItem = { q: string; a: string };

/* Visible FAQ accordion paired one-to-one with the FAQPage JSON-LD
   emitted on the same page. The page passes the same `faqs` array to
   both so visible answers and structured-data answers are byte-identical
   — Google penalizes meaningful divergence between schema and rendered
   FAQ content. */

export default function ApplyFaq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number>(0);
  return (
    <section className="apply-faq" aria-labelledby="apply-faq-heading">
      <h2 id="apply-faq-heading" className="apply-faq-heading">
        Questions before you apply
      </h2>
      {items.map((item, i) => {
        const isOpen = open === i;
        const buttonId = `apply-faq-btn-${i}`;
        const panelId = `apply-faq-panel-${i}`;
        return (
          <div
            className={`apply-faq-item${isOpen ? " open" : ""}`}
            key={item.q}
          >
            <button
              type="button"
              id={buttonId}
              className="apply-faq-button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen(isOpen ? -1 : i)}
            >
              <span>{item.q}</span>
              <IconChevronDown className="chev" />
            </button>
            <div
              id={panelId}
              className="apply-faq-answer"
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
            >
              <p>{item.a}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
}
