import type { Metadata } from "next";
import Link from "next/link";

/* ===========================================================================
   Privacy policy — substantive draft for counsel review.

   The (legal)/layout.tsx wrapper adds the "Draft pending counsel review"
   disclaimer below this content; do not duplicate it inside the page.

   Effective date is a literal so renders are deterministic across SSR
   and ISR; do NOT replace EFFECTIVE_DATE with a runtime date call. The
   byline prints EFFECTIVE_DATE_DISPLAY.

   [COUNSEL REVIEW: ...] markers are intentional — every one is an open
   jurisdiction-specific question counsel needs to resolve. Grep for them.

   See: docs/superpowers/specs/2026-05-17-privacy-terms-and-footer-cleanup-design.md §4
   =========================================================================== */

const EFFECTIVE_DATE = "2026-05-17";
const EFFECTIVE_DATE_DISPLAY = "May 17, 2026";
const CONTACT_EMAIL = "angelo@mainline.finance";

export const metadata: Metadata = {
  title: "Privacy policy — Dispatched",
  description:
    "How Dispatched, Inc. collects, uses, shares, and protects information from operators using the dispatched.finance intake and matching service.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <h1>Privacy policy</h1>
      <p className="lead">
        Effective {EFFECTIVE_DATE_DISPLAY}. Last updated {EFFECTIVE_DATE_DISPLAY}.
      </p>

      <nav aria-label="Sections">
        <ul>
          <li><a href="#who-we-are">1. Who we are</a></li>
          <li><a href="#scope">2. Scope</a></li>
          <li><a href="#what-we-collect">3. What we collect and why</a></li>
          <li><a href="#how-we-use-it">4. How we use it</a></li>
          <li><a href="#who-we-share-with">5. Who we share it with</a></li>
          <li><a href="#cookies">6. Cookies and tracking</a></li>
          <li><a href="#communications">7. Communications consent (TCPA / CAN-SPAM)</a></li>
          <li><a href="#credit-reporting">8. Credit reporting (FCRA)</a></li>
          <li><a href="#retention">9. Data retention</a></li>
          <li><a href="#security">10. Security</a></li>
          <li><a href="#children">11. Children</a></li>
          <li><a href="#your-rights">12. Your privacy rights</a></li>
          <li><a href="#international">13. International users</a></li>
          <li><a href="#changes">14. Changes to this policy</a></li>
          <li><a href="#contact">15. Contact</a></li>
        </ul>
      </nav>

      <section id="who-we-are">
        <h2>1. Who we are</h2>
        <p>
          This policy is published by <strong>Dispatched, Inc.</strong>, a
          Wyoming corporation with its principal place of business at 12895
          Josey Lane #124, Dallas, TX 75234, United States. Dispatched
          operates dispatched.finance, an intake and matching service that
          connects U.S. trucking operators with trucking-friendly commercial
          lenders and insurance producers.
        </p>
        <p>
          When this policy says &ldquo;Dispatched,&rdquo; &ldquo;we,&rdquo;
          &ldquo;us,&rdquo; or &ldquo;our,&rdquo; it means Dispatched, Inc.
          When it says &ldquo;you&rdquo; or &ldquo;your,&rdquo; it means the
          individual using the site &mdash; typically an owner-operator,
          small-fleet owner, or someone authorized to submit a funding or
          insurance application on behalf of a trucking business.
        </p>
        <p>
          Questions about this policy or how your information is handled can
          be sent to{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </section>

      <section id="scope">
        <h2>2. Scope</h2>
        <p>
          This policy covers the dispatched.finance website, the intake forms
          on that site (including the funding application and the insurance
          quote request), and the follow-up phone, text, and email
          communications that flow from a submission. It also covers the
          analytics and error-monitoring tools we run on the site.
        </p>
        <p>
          This policy does <strong>not</strong> cover what happens after you
          choose to move forward with a specific lender or insurance carrier.
          Once you select a lender from your shortlist, that lender&rsquo;s
          own privacy policy and disclosures govern the documents you sign
          with them and the data they collect from you directly. The same is
          true for any insurance carrier that issues a policy through our
          insurance producer partner. We&rsquo;ll tell you who that lender or
          carrier is at the point of selection so you can read their policy
          before signing.
        </p>
      </section>

      <section id="what-we-collect">
        <h2>3. What we collect and why</h2>
        <p>
          We collect only what we need to route your application to lenders
          whose underwriting appetite fits your business. The categories
          below describe what we collect on the site and through the intake
          flow. Anything beyond this &mdash; for example, bank statements
          and tax returns &mdash; is uploaded directly to the lender you
          select, not to Dispatched.
        </p>
        <ul>
          <li>
            <strong>Identifiers.</strong> Your name, business email address,
            phone number, and mailing or business address. We use these to
            contact you about your application and to verify identity for
            lender routing.
          </li>
          <li>
            <strong>Business identifiers.</strong> Legal entity name, EIN
            (or SSN for sole proprietors), DOT number, and MC number. These
            are the underwriting keys lenders use to look up your business
            and motor-carrier record.
          </li>
          <li>
            <strong>Financial information.</strong> Monthly revenue range,
            time in business, requested funding amount, and what the funds
            are for. Bank statements and tax documents are <strong>not</strong>{" "}
            uploaded to Dispatched &mdash; once you select a lender, those
            documents are uploaded directly to that lender&rsquo;s portal.
          </li>
          <li>
            <strong>Internet and device data.</strong> IP address, browser
            user agent, referrer, page path, and basic interaction signals.
            See &sect;6 for what we do (and do not) use this for.
          </li>
          <li>
            <strong>Credit information.</strong> At intake, our intake
            partner Lendflow performs a <em>soft pull</em> &mdash; an
            inquiry that is not visible to other lenders and does not
            affect your credit score. A <em>hard pull</em> only happens
            after you select a specific lender from your shortlist and
            authorize that lender to proceed. We explain this on the apply
            page before any inquiry runs.
          </li>
          <li>
            <strong>Communications metadata.</strong> When we call, text, or
            email you about your application, we keep records of those
            communications &mdash; timestamps, channel, and whether you
            opted out. We use this to honor unsubscribe and STOP requests
            and to maintain auditable consent records.
          </li>
        </ul>
      </section>

      <section id="how-we-use-it">
        <h2>4. How we use it</h2>
        <p>
          We use your information to operate the matching service and to
          stay compliant with the laws that apply to it. Specifically:
        </p>
        <ul>
          <li>
            Match your application to lenders on our panel whose published
            appetite fits your business profile and your stated funding
            purpose.
          </li>
          <li>
            Service your application &mdash; respond to your questions,
            answer your calls, and coordinate handoffs between you and your
            selected lender.
          </li>
          <li>
            Send funding-related communications by phone, text, and email
            within the scope of the consent you gave at intake (see &sect;7).
          </li>
          <li>
            Comply with applicable law, respond to lawful requests from
            regulators, and meet our recordkeeping obligations.
          </li>
          <li>
            Prevent fraud and abuse, investigate suspected misuse of the
            service, and protect the rights and safety of Dispatched, our
            partners, and other operators.
          </li>
          <li>
            Improve how the site works &mdash; for example, by reviewing
            aggregated traffic patterns and error logs to find and fix
            broken flows.
          </li>
        </ul>
      </section>

      <section id="who-we-share-with">
        <h2>5. Who we share it with</h2>
        <p>
          We share your information with a small set of named partners, each
          with a specific role. We do not sell or trade your information to
          data brokers, ad networks, or any other third party for marketing
          purposes.
        </p>
        <ul>
          <li>
            <strong>Lender panel.</strong> The trucking-friendly lenders we
            route your application to receive the underwriting fields they
            need to make an appetite decision. We describe the panel by
            category &mdash; working capital, equipment, repair, factoring
            &mdash; rather than by name because the panel rotates. The
            lender you ultimately select is named to you at selection time,
            and that lender&rsquo;s own privacy policy governs the
            information you submit to them after that point.
          </li>
          <li>
            <strong>Lendflow.</strong> The third-party processor for the
            intake widget on /apply and the webhook receiver at
            /api/webhooks/lendflow. Lendflow receives the intake fields
            described in &sect;3 and runs the initial soft pull on our
            behalf.
          </li>
          <li>
            <strong>Coverdash.</strong> The named licensed insurance
            producer for the commercial trucking insurance funnel. If you
            request an insurance quote, Coverdash receives the information
            necessary to produce that quote and to issue a policy if you
            bind coverage.
          </li>
          <li>
            <strong>Sentry.</strong> Our error monitoring provider. Sentry
            receives pseudonymous error reports &mdash; stack traces, page
            paths, and the minimal context needed to debug a broken flow.
            We avoid attaching identifiers like name or email to Sentry
            events.
          </li>
          <li>
            <strong>Mainline (tryoption.ai).</strong> Our analytics
            provider, which is focused on AI and search-crawler visibility.
            Page request metadata (path, user agent, referrer, IP) is sent
            to Mainline so we can see when AI assistants and search engines
            visit the site. Mainline filters by user agent to focus on
            crawler traffic; we do not use this signal to profile
            individual human visitors.
          </li>
          <li>
            <strong>Service providers.</strong> Render hosts the site and
            its infrastructure. Email and SMS delivery providers send the
            transactional communications described in &sect;7. As we add or
            change providers in these categories, we will update this
            section.
          </li>
          <li>
            <strong>Legal and safety.</strong> We may disclose information
            in response to a valid subpoena, court order, or other lawful
            request; to investigate suspected fraud; or to protect the
            rights, property, or safety of Dispatched, our partners, or
            other operators.
          </li>
        </ul>
      </section>

      <section id="cookies">
        <h2>6. Cookies and tracking</h2>
        <p>
          The site uses minimal first-party browser storage. The Coverdash
          insurance widget uses{" "}
          <code>localStorage</code> to hold widget state between page loads,
          so a partially filled quote can be resumed without re-typing.
          Other than that, the site does not set behavioral tracking
          cookies of its own.
        </p>
        <p>
          As of the effective date of this policy, the site does{" "}
          <strong>not</strong> use Google Analytics, Meta Pixel, LinkedIn
          Insight Tag, or any third-party advertising tracker. If that
          changes &mdash; for example, if we add an analytics tool that
          uses cookies or a similar identifier &mdash; this section will
          be updated and the effective date at the top will move.
        </p>
      </section>

      <section id="communications">
        <h2>7. Communications consent (TCPA / CAN-SPAM)</h2>
        <p>
          When you submit an application or quote request, you consent to
          receive phone calls, text messages, and emails from Dispatched
          and from the partner identified at submission, using the contact
          information you provide. For the insurance funnel, this consent
          is captured as one-to-one TCPA consent under FCC rules &mdash; the
          consent text is versioned in our codebase (version{" "}
          <code>v1-2026-04-27</code>) and stored with your lead so the exact
          language you agreed to is preserved.
        </p>
        <p>
          Some calls and messages may be made using automated technology or
          pre-recorded messages. Standard message and data rates may apply.
          Your consent is not a condition of any purchase &mdash; you can
          opt out at any time without losing access to the matching service
          or the information on the site.
        </p>
        <p>
          To opt out:
        </p>
        <ul>
          <li>
            <strong>Text messages.</strong> Reply STOP to any SMS to opt out
            of that sender. Reply HELP for assistance.
          </li>
          <li>
            <strong>Email.</strong> Use the unsubscribe link at the bottom
            of any marketing email, or reply with &ldquo;unsubscribe.&rdquo;
            Transactional emails about an active application may continue
            until that application is closed.
          </li>
          <li>
            <strong>Phone.</strong> Tell us on the call, or email{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Oral
            revocation is honored.
          </li>
        </ul>
      </section>

      <section id="credit-reporting">
        <h2>8. Credit reporting (FCRA)</h2>
        <p>
          When you submit a funding application, our intake partner Lendflow
          performs a <em>soft pull</em> on the business credit profile and,
          where applicable, the owner&rsquo;s personal credit. A soft pull
          is an inquiry that is not visible to other lenders, does not
          affect your credit score, and is used solely to match you to
          lenders whose appetite fits your profile.
        </p>
        <p>
          A <em>hard pull</em> only happens after you select a specific
          lender from your shortlist and authorize that lender to proceed.
          The selected lender, not Dispatched, performs the hard pull, and
          its permissible purpose is the credit transaction you have
          initiated with them. If you compare offers from multiple lenders,
          hard pulls inside a 14-day rate-shopping window count as a single
          inquiry on most scoring models.
        </p>
        <p>
          Under the Fair Credit Reporting Act (FCRA) you have the right to
          a free copy of your credit report from each of the three
          nationwide credit reporting agencies once every 12 months at
          annualcreditreport.com, the right to dispute inaccurate
          information in your credit file, and the right to know who has
          pulled your credit. If a lender takes adverse action on your
          application based on information in your credit report, that
          lender is required by FCRA to send you an adverse action notice
          identifying the credit reporting agency it used.
        </p>
      </section>

      <section id="retention">
        <h2>9. Data retention</h2>
        <p>
          We keep application data only as long as we need to operate the
          matching service and to satisfy applicable lender-recordkeeping,
          tax, and consumer-financial laws. Specific retention windows
          depend on whether an application was ultimately funded and on the
          jurisdictions involved.
        </p>
        <ul>
          <li>
            <strong>Funded applications.</strong> [COUNSEL REVIEW: 7 years
            post-funding] for the loan-file records that lenders, auditors,
            and regulators may need to review.
          </li>
          <li>
            <strong>Non-funded applications.</strong> [COUNSEL REVIEW: 2
            years from last activity] for applications that did not result
            in funding, after which the underlying intake data is deleted
            or de-identified.
          </li>
          <li>
            <strong>Marketing communications.</strong> Until you
            unsubscribe, plus a short cool-down period during which your
            contact information is held on a suppression list so we do not
            accidentally re-contact you after you have opted out.
          </li>
          <li>
            <strong>Aggregated and de-identified data.</strong> Statistics
            derived from application data &mdash; with all identifiers
            removed &mdash; may be retained indefinitely for the purpose
            of describing the panel and refreshing the rate ranges
            published on the site.
          </li>
        </ul>
      </section>

      <section id="security">
        <h2>10. Security</h2>
        <p>
          We use reasonable administrative, technical, and physical
          safeguards designed to protect the information described in this
          policy &mdash; including encryption in transit, access controls
          on internal systems, and limited access to production data on a
          need-to-know basis. No system is perfect, and we do not promise
          that our safeguards will prevent every possible unauthorized
          access. If a breach affecting your information occurs, we will
          notify you and any required regulator as required by applicable
          law. [COUNSEL REVIEW: confirm notification windows for each state
          where we operate.]
        </p>
      </section>

      <section id="children">
        <h2>11. Children</h2>
        <p>
          Dispatched is a business-to-business service intended for adults
          authorized to act on behalf of a trucking business. The site is
          not directed to children under 18, and we do not knowingly
          collect personal information from minors. If you believe a child
          has submitted information through the site, contact us at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> and we
          will delete it.
        </p>
      </section>

      <section id="your-rights">
        <h2>12. Your privacy rights</h2>
        <p>
          The rights you have over the information we hold depend on where
          you live. The subsections below summarize the rights that apply
          under each state&rsquo;s privacy law as of the effective date of
          this policy. The &ldquo;How to submit a request&rdquo;
          subsection at the end applies to all of them.
        </p>

        <h3>California (CCPA / CPRA)</h3>
        <p>
          If you are a California resident, the California Consumer Privacy
          Act as amended by the California Privacy Rights Act (collectively
          &ldquo;CCPA&rdquo;) gives you the right to:
        </p>
        <ul>
          <li>
            <strong>Know</strong> the categories and specific pieces of
            personal information we have collected about you, the sources
            we collected it from, the purposes for which we use it, and the
            categories of third parties with whom we share it.
          </li>
          <li>
            <strong>Delete</strong> personal information we collected from
            you, subject to exceptions for transactions, fraud prevention,
            and legal compliance.
          </li>
          <li>
            <strong>Correct</strong> inaccurate personal information we
            hold about you.
          </li>
          <li>
            <strong>Opt out of &ldquo;sale&rdquo; or &ldquo;sharing&rdquo;</strong>{" "}
            of personal information as those terms are defined under CCPA.
          </li>
          <li>
            <strong>Opt out of profiling</strong> for decisions that
            produce legal or similarly significant effects about you and
            that are made solely by automated means.
          </li>
          <li>
            <strong>Limit use and disclosure of sensitive personal
            information</strong> to what is necessary to provide the
            service you requested.
          </li>
          <li>
            <strong>Non-discrimination</strong> for exercising any of these
            rights &mdash; we will not deny you the service, charge you a
            different price, or provide you a lower quality experience
            because you exercised a CCPA right.
          </li>
        </ul>
        <p>
          To be specific about how this applies to Dispatched:{" "}
          <strong>we do not sell or share your personal information</strong>{" "}
          as the terms &ldquo;sell&rdquo; and &ldquo;share&rdquo; are
          defined under CCPA (i.e., we do not exchange personal information
          for monetary or other valuable consideration, and we do not share
          personal information for cross-context behavioral advertising).
          The disclosures we make to the lender panel and to the partners
          listed in &sect;5 are business-purpose disclosures made to
          process the application you submitted. Because we do not engage
          in &ldquo;sale&rdquo; or &ldquo;sharing&rdquo; as defined, we do
          not publish a standalone &ldquo;Do Not Sell or Share My Personal
          Information&rdquo; link &mdash; the CCPA disclosure lives here,
          in this section, and any opt-out request you wish to make can
          be sent through the process described below.
        </p>

        <h3>Texas (TDPSA)</h3>
        <p>
          If you are a Texas resident, the Texas Data Privacy and Security
          Act (TDPSA) gives you the right to:
        </p>
        <ul>
          <li>
            <strong>Confirm</strong> whether we are processing your
            personal data.
          </li>
          <li>
            <strong>Access</strong> the personal data we hold about you.
          </li>
          <li>
            <strong>Correct</strong> inaccuracies in that data.
          </li>
          <li>
            <strong>Delete</strong> personal data you have provided or that
            we have obtained about you.
          </li>
          <li>
            <strong>Port</strong> the personal data you provided, in a
            portable and (to the extent technically feasible) readily
            usable format.
          </li>
          <li>
            <strong>Opt out</strong> of (i) targeted advertising,
            (ii) the sale of personal data, and (iii) profiling in
            furtherance of decisions that produce legal or similarly
            significant effects about you.
          </li>
        </ul>
        <p>
          If we deny a request you submitted under TDPSA, you may appeal
          that decision by replying to our response email or by emailing{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> with the
          subject line &ldquo;Privacy Appeal &mdash; Texas.&rdquo; We will
          review the appeal and respond in writing. If the appeal is
          denied, we will explain why and tell you how to contact the
          Texas Attorney General to submit a complaint. Dispatched is
          based in Dallas, so this section gets a dedicated subsection
          regardless of the size of our Texas resident base.
        </p>

        <h3>Other state residents</h3>
        <p>
          If you reside in one of the states listed below, you have a
          substantially similar set of rights under that state&rsquo;s
          privacy law: the right to confirm and access the personal data
          we hold about you, the right to correct it, the right to delete
          it, the right to port it, and the right to opt out of targeted
          advertising, sale, and profiling for decisions that produce
          legal or similarly significant effects. The exact scope and
          mechanics vary by state &mdash; the table below identifies the
          governing statute and effective date for each. To exercise any
          of these rights, use the process described below.
        </p>
        <table>
          <thead>
            <tr>
              <th>State</th>
              <th>Law</th>
              <th>Effective</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Virginia</td>
              <td>Virginia Consumer Data Protection Act (VCDPA)</td>
              <td>January 1, 2023</td>
            </tr>
            <tr>
              <td>Colorado</td>
              <td>Colorado Privacy Act (CPA)</td>
              <td>July 1, 2023</td>
            </tr>
            <tr>
              <td>Connecticut</td>
              <td>Connecticut Data Privacy Act (CTDPA)</td>
              <td>July 1, 2023</td>
            </tr>
            <tr>
              <td>Utah</td>
              <td>Utah Consumer Privacy Act (UCPA)</td>
              <td>December 31, 2023</td>
            </tr>
            <tr>
              <td>Oregon</td>
              <td>Oregon Consumer Privacy Act (OCPA)</td>
              <td>July 1, 2024</td>
            </tr>
            <tr>
              <td>Montana</td>
              <td>Montana Consumer Data Privacy Act (MTCDPA)</td>
              <td>October 1, 2024</td>
            </tr>
            <tr>
              <td>Iowa</td>
              <td>Iowa Consumer Data Protection Act (ICDPA)</td>
              <td>January 1, 2025</td>
            </tr>
            <tr>
              <td>Delaware</td>
              <td>Delaware Personal Data Privacy Act (DPDPA)</td>
              <td>January 1, 2025</td>
            </tr>
            <tr>
              <td>New Hampshire</td>
              <td>New Hampshire Privacy Act (NHPA)</td>
              <td>January 1, 2025</td>
            </tr>
            <tr>
              <td>New Jersey</td>
              <td>New Jersey Data Privacy Act (NJDPA)</td>
              <td>January 15, 2025</td>
            </tr>
            <tr>
              <td>Minnesota</td>
              <td>Minnesota Consumer Data Privacy Act (MCDPA)</td>
              <td>July 31, 2025</td>
            </tr>
            <tr>
              <td>Maryland</td>
              <td>Maryland Online Data Privacy Act (MODPA)</td>
              <td>October 1, 2025</td>
            </tr>
          </tbody>
        </table>

        <h3>How to submit a request</h3>
        <p>
          To exercise any of the rights described above, email{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> with the
          subject line &ldquo;Privacy Request &mdash; [state],&rdquo;
          replacing [state] with the U.S. state of your residence (for
          example, &ldquo;Privacy Request &mdash; California&rdquo;). In
          the body of the message, tell us which right you want to
          exercise and provide the email address and, if applicable, the
          business name on file so we can locate your records.
        </p>
        <p>
          To protect your information, we may ask you to confirm the email
          address we have on file plus one additional verification element
          before we act on the request. We will not ask for sensitive
          information solely for the purpose of verification. An
          authorized agent may submit a request on your behalf with
          written authorization &mdash; we may contact you to confirm the
          authorization before acting.
        </p>
        <p>
          We will acknowledge your request promptly and respond within the
          window required by your state&rsquo;s law. [COUNSEL REVIEW:
          45-day response window with one 45-day extension applies to most
          state laws; verify per state for the final.] If we cannot honor
          a request &mdash; for example, because it would require us to
          delete records we are legally required to keep &mdash; we will
          tell you why and (where applicable) explain how to appeal.
        </p>
      </section>

      <section id="international">
        <h2>13. International users</h2>
        <p>
          Dispatched is a United States service for U.S. trucking
          operators. The site is not directed to residents of the European
          Union, the United Kingdom, or any other non-U.S. jurisdiction,
          and we have not designed the intake or our data-handling
          practices to satisfy the GDPR, UK GDPR, or other non-U.S.
          frameworks. If you are located outside the United States, please
          do not submit information through the intake forms on this site.
        </p>
      </section>

      <section id="changes">
        <h2>14. Changes to this policy</h2>
        <p>
          We update this policy from time to time. When we do, the
          effective date at the top of the page moves and the body
          reflects the change. Material changes &mdash; for example, a new
          category of partner that receives your information &mdash; will
          also be flagged with an in-product notice at the top of the
          intake flow so you see the change before submitting. Your
          continued use of the site after the new effective date means you
          accept the updated policy.
        </p>
      </section>

      <section id="contact">
        <h2>15. Contact</h2>
        <p>
          Privacy questions, requests, or complaints:{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
        <address>
          Dispatched, Inc.<br />
          12895 Josey Lane #124<br />
          Dallas, TX 75234<br />
          United States
        </address>
      </section>

      <p>
        <Link href="/terms">Read the Terms of Service →</Link>
      </p>
    </>
  );
}
