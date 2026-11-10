import Form from "next/form";
import Image from "next/image";
import {
  MONTHLY_REVENUE_OPTIONS,
  MONTHLY_REVENUE_PARAM,
  TIME_IN_BUSINESS_OPTIONS,
  TIME_IN_BUSINESS_PARAM,
} from "@/lib/quickStart";
import { APPLY_HREF, CTA_LABEL, HERO_CTA_ID, ctaPlacement } from "./cta";
import {
  IconArrowRight,
  IconDollarCircle,
  IconLock,
  IconShieldCheck,
} from "./icons";
import SpecialistLink from "./SpecialistLink";

/* Mobile-first photo hero. The image lives at
   /public/trucker-owner-operator-hero.jpg — when missing the navy scrim
   shows through and the headline still reads.

   One primary action (apply) and one secondary (a human). Anything else a
   visitor might want from here is in the nav.

   The apply CTA is the submit button of a two-question form, so the first
   step of the application happens here instead of one click away. It is a
   plain GET form: /apply receives the answers as query params (see
   lib/quickStart.ts), it works before hydration, and next/form upgrades it
   to a client-side navigation. Both questions are optional — an unanswered
   select sends nothing, and the button always goes to /apply.

   Every figure and promise in this block is one of the "structural facts
   published on the home" that /methodology accounts for. Add a claim here
   only after it is substantiated there. */

const facts = [
  {
    icon: <IconShieldCheck size={20} />,
    title: "Soft pull to start",
    detail: "No impact on your credit",
  },
  {
    icon: <IconDollarCircle size={20} />,
    title: "No fee to apply",
    detail: "Financing partners pay us",
  },
  {
    icon: <IconLock size={20} />,
    title: "One hard pull",
    detail: "From the lender you pick",
  },
];

export default function Hero() {
  return (
    <section className="hero hero--photo">
      <div className="hero-media" aria-hidden="true">
        <Image
          src="/trucker-owner-operator-hero.jpg"
          alt=""
          fill
          sizes="100vw"
          className="hero-photo"
          loading="eager"
          fetchPriority="high"
        />
        <div className="hero-scrim" />
      </div>
      <div className="container">
        <div className="hero-content">
          <span className="hero-pill">
            <span className="dot" aria-hidden="true" />
            Built for trucking
          </span>
          <h1 className="hero-title">
            $25K–$250K in trucking capital, built for owner-operators.
          </h1>
          <p className="hero-sub">
            Options may be available even if a bank has declined you; approval
            is not guaranteed. We introduce you to trucking-friendly financing
            partners who work with owner-operators and small fleets.
          </p>
          <Form id={HERO_CTA_ID} action={APPLY_HREF} className="hero-start">
            <div
              className="hero-start-fields"
              role="group"
              aria-labelledby="hero-start-title"
            >
              <p className="hero-start-title" id="hero-start-title">
                Start here · 2 quick questions
              </p>
              <div className="hero-start-field">
                <label htmlFor="hero-monthly-revenue">Monthly revenue</label>
                <select
                  id="hero-monthly-revenue"
                  name={MONTHLY_REVENUE_PARAM}
                  className="select"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Pick a range
                  </option>
                  {MONTHLY_REVENUE_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="hero-start-field">
                <label htmlFor="hero-time-in-business">Time in business</label>
                <select
                  id="hero-time-in-business"
                  name={TIME_IN_BUSINESS_PARAM}
                  className="select"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Pick a range
                  </option>
                  {TIME_IN_BUSINESS_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="hero-ctas">
              {/* Placement goes on the button, not the form: PostHog lets an
                  ancestor's capture attribute override a descendant's, which
                  would relabel clicks on the specialist link next to it. */}
              <button
                type="submit"
                className="btn btn--cta-green btn--lg hero-cta-primary"
                {...ctaPlacement("home-hero")}
              >
                {CTA_LABEL}
                <IconArrowRight />
              </button>
              <SpecialistLink
                className="hero-call-cta"
                placement="home-hero"
              />
            </div>
          </Form>
          <p className="hero-cta-note">
            No hard credit pull to start.{" "}
            <span aria-hidden="true" className="hero-cta-note-sep">
              ·
            </span>{" "}
            Timing depends on the lender and your documents.
          </p>
          {/* Compliance disclosure: keep it in the hero, next to the CTA. */}
          <p className="hero-disclosure">
            Dispatched is a referral service for commercial / business
            financing only — not a lender and not consumer credit. We are paid
            by financing partners when a loan is funded; we do not charge
            businesses a fee to apply.
          </p>
          <ul className="hero-facts">
            {facts.map((f) => (
              <li key={f.title} className="hero-fact">
                <span className="hero-fact-icon" aria-hidden="true">
                  {f.icon}
                </span>
                <span className="hero-fact-title">{f.title}</span>
                <span className="hero-fact-detail">{f.detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
