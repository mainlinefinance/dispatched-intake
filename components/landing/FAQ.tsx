"use client";

import { useState } from "react";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/contact";
import { IconChevronDown } from "./icons";
import { homepageFaqs } from "./FAQ.data";

export default function FAQ() {
  const [open, setOpen] = useState<number>(0);
  return (
    <section className="section sunken" id="faq">
      <div className="container">
        <div className="section-head centered">
          <span className="eyebrow">Questions we get asked</span>
          <h2>Frequently asked.</h2>
          <p className="faq-centered-foot">
            Still stuck? Call <a href={PHONE_TEL}>{PHONE_DISPLAY}</a> — a
            human picks up.
          </p>
        </div>
        <div className="faq-wrap">
          {homepageFaqs.map((f, i) => {
            const isOpen = open === i;
            const buttonId = `faq-btn-${i}`;
            const panelId = `faq-panel-${i}`;
            return (
              <div className={`faq-item ${isOpen ? "open" : ""}`} key={i}>
                <button
                  type="button"
                  id={buttonId}
                  className="faq-button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  <span>{f.q}</span>
                  <IconChevronDown className="chev" />
                </button>
                <div
                  id={panelId}
                  className="faq-answer"
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                >
                  <div className="faq-answer-inner">{f.aJsx}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
