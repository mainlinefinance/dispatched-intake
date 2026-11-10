import type { Kit, Segment } from "./types.ts";

/* ===========================================================================
   Outbound email kits for FMCSA-sourced carriers.

   One kit per segment, four steps each: an opener plus three follow-ups
   sent as replies in the same thread (day 3, 7, 14).

   Copy rules — the same ones the public site follows after the Google Ads
   compliance pass (#123). tests/outreach-kits.test.ts enforces them:
     - Dispatched is a referral service, never "the lender".
     - No speed promises (same-day, 24 hours, instant, fast funding).
     - No approval promises (guaranteed, pre-approved, everyone qualifies).
     - No rate or dollar figures; partners set terms.
     - Subjects describe the email. No fake "Re:" / "Fwd:".
     - Every step tells the reader how to stop the emails.
   The legal footer (entity, postal address, FMCSA source, unsubscribe) is
   appended by render.ts so no step can ship without it.
   =========================================================================== */

const BREAKUP_OPT_OUT =
  "If you'd rather not hear from us at all, reply \"unsubscribe\" and that's the end of it.";

export const KITS: Record<Segment, Kit> = {
  "owner-operator": {
    segment: "owner-operator",
    audience: "One power unit, authority older than 12 months.",
    steps: [
      {
        step: 1,
        dayOffset: 0,
        subjects: [
          "Capital options for {{company}}",
          "DOT {{dot}}: financing built for one-truck operations",
        ],
        body: [
          "Hi, {{sender}} here from Dispatched.",
          "I found {{company}} (DOT {{dot}}) in the public FMCSA registry. We're a referral service that introduces owner-operators to financing partners who work with trucking: working capital, repair loans, equipment financing, and factoring.",
          "If a repair bill, a slow-paying broker, or a truck payment is squeezing cash right now, you can see what may be available in about two minutes. There's no fee to apply and no hard credit pull to start.",
          "Not relevant? Reply \"no thanks\" and I won't write again.",
        ],
        cta: { label: "See my funding options", path: "/apply" },
      },
      {
        step: 2,
        dayOffset: 3,
        body: [
          "Following up on my note from earlier this week.",
          "Something we hear a lot from one-truck operations: the repair doesn't wait for the broker to pay. The financing partners we introduce often weigh what the truck earns alongside credit history, so a bank decline isn't always the end of the road.",
          "Approval isn't guaranteed and terms are set by the partner, but the first step is a soft pull that doesn't touch your credit score.",
          "If this isn't for you, reply \"no thanks\" and I'll stop.",
        ],
        cta: { label: "How truck repair loans work", path: "/truck-repair-loans" },
      },
      {
        step: 3,
        dayOffset: 7,
        body: [
          "No pitch this time, just a free tool.",
          "Our owner-operator P&L calculator takes your rate per mile, miles, fuel, and fixed costs and shows net per week, cost per mile, and breakeven miles. No signup.",
          "Worth five minutes whether or not {{company}} ever needs financing.",
          "Reply \"no thanks\" any time and I'll stop writing.",
        ],
        cta: {
          label: "Open the P&L calculator",
          path: "/calculators/owner-operator-pl",
        },
      },
      {
        step: 4,
        dayOffset: 14,
        body: [
          "Last note from me.",
          "If capital isn't a need for {{company}} right now, no problem. I'll close this out and you won't get more emails in this thread.",
          "If that changes, the application takes about two minutes, and you can reply here to reach a person.",
          BREAKUP_OPT_OUT,
        ],
        cta: { label: "Check my options", path: "/apply" },
      },
    ],
  },

  "new-authority": {
    segment: "new-authority",
    audience: "Added to the FMCSA census within the last 12 months, 1-10 power units.",
    steps: [
      {
        step: 1,
        dayOffset: 0,
        subjects: [
          "Financing options for a new authority",
          "{{company}}: capital in your first year",
        ],
        body: [
          "Hi, {{sender}} here from Dispatched.",
          "I saw in the public FMCSA registry that {{company}} (DOT {{dot}}) is a fairly new authority. Congratulations on getting it running.",
          "The first year is the hardest one to finance, because many banks want to see a longer operating history. We're a referral service that introduces new authorities to financing partners who work with trucking, including factors who underwrite the broker that owes the invoice.",
          "You can see what may be available in about two minutes. No fee to apply, no hard credit pull to start, and approval isn't guaranteed.",
          "Not relevant? Reply \"no thanks\" and I won't write again.",
        ],
        cta: {
          label: "New authority financing",
          path: "/new-authority-truck-financing",
        },
      },
      {
        step: 2,
        dayOffset: 3,
        body: [
          "Following up on my note from earlier this week.",
          "The most common cash problem for a new authority is the gap between delivering a load and getting paid for it. Factoring closes that gap by advancing against the invoice, and the factor looks mainly at the broker's credit rather than how long you've been in business.",
          "It isn't free and it isn't right for every operation, so we wrote up how the fees and holdbacks work before you talk to anyone.",
          "If this isn't for you, reply \"no thanks\" and I'll stop.",
        ],
        cta: { label: "How factoring works", path: "/factoring" },
      },
      {
        step: 3,
        dayOffset: 7,
        body: [
          "No pitch this time, just a free tool.",
          "If you're already getting factoring quotes, our factoring fee calculator shows the all-in cost of an invoice: the fee, the advance, the holdback, and the effective annualized rate. Five inputs, no signup.",
          "It's a quick way to compare offers for {{company}} on the same footing.",
          "Reply \"no thanks\" any time and I'll stop writing.",
        ],
        cta: {
          label: "Open the factoring fee calculator",
          path: "/calculators/factoring-fee",
        },
      },
      {
        step: 4,
        dayOffset: 14,
        body: [
          "Last note from me.",
          "If {{company}} is covered on cash flow for now, good. I'll close this out and you won't get more emails in this thread.",
          "If that changes as you add loads or equipment, the application takes about two minutes, and you can reply here to reach a person.",
          BREAKUP_OPT_OUT,
        ],
        cta: { label: "Check my options", path: "/apply" },
      },
    ],
  },

  "small-fleet": {
    segment: "small-fleet",
    audience: "Two to ten power units, authority older than 12 months.",
    steps: [
      {
        step: 1,
        dayOffset: 0,
        subjects: [
          "Capital options for {{company}}",
          "Financing for a {{units}}-truck fleet",
        ],
        body: [
          "Hi, {{sender}} here from Dispatched.",
          "The public FMCSA registry lists {{company}} (DOT {{dot}}) with {{units}} power units. We're a referral service that introduces small fleets to financing partners who work with trucking: working capital, equipment financing, repair loans, and factoring.",
          "If you're covering payroll and fuel ahead of broker payments, or looking at adding a truck, you can see what may be available in about two minutes. There's no fee to apply and no hard credit pull to start.",
          "Not relevant? Reply \"no thanks\" and I won't write again.",
        ],
        cta: { label: "See my funding options", path: "/apply" },
      },
      {
        step: 2,
        dayOffset: 3,
        body: [
          "Following up on my note from earlier this week.",
          "For fleets your size, the usual question is equipment: finance the next truck or trailer, or keep the cash for operations. Equipment financing is secured by the unit itself, which is why partners often treat it differently from an unsecured working capital loan.",
          "Approval isn't guaranteed and each partner sets its own terms. You see the full term sheet before you sign anything.",
          "If this isn't for you, reply \"no thanks\" and I'll stop.",
        ],
        cta: {
          label: "How equipment financing works",
          path: "/equipment-financing",
        },
      },
      {
        step: 3,
        dayOffset: 7,
        body: [
          "No pitch this time, just a free tool.",
          "If {{company}} is weighing its next unit, our lease vs. buy calculator puts both options side by side so you can compare the total cost before talking to a dealer or a lender. No signup.",
          "Reply \"no thanks\" any time and I'll stop writing.",
        ],
        cta: {
          label: "Open the lease vs. buy calculator",
          path: "/calculators/lease-vs-buy",
        },
      },
      {
        step: 4,
        dayOffset: 14,
        body: [
          "Last note from me.",
          "If capital isn't a need for {{company}} right now, no problem. I'll close this out and you won't get more emails in this thread.",
          "If that changes, the application takes about two minutes, and you can reply here to reach a person.",
          BREAKUP_OPT_OUT,
        ],
        cta: { label: "Check my options", path: "/apply" },
      },
    ],
  },
};

export const SEGMENTS = Object.keys(KITS) as Segment[];

/** Last step number; every kit has the same length. */
export const SEQUENCE_LENGTH = KITS["owner-operator"].steps.length;
