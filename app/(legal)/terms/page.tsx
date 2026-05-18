import type { Metadata } from "next";
import Link from "next/link";

/* ===========================================================================
   Terms of service — substantive draft for counsel review.

   The (legal)/layout.tsx wrapper adds the "Draft pending counsel review"
   disclaimer below this content; do not duplicate it inside the page.

   Effective date is a literal so renders are deterministic across SSR
   and ISR; do NOT replace EFFECTIVE_DATE with a runtime date call. The
   byline prints EFFECTIVE_DATE_DISPLAY inside a <time dateTime> wrapper
   so the date is machine-readable for assistive tech and crawlers.

   Governing law: Texas. Venue: Dallas County, TX. No arbitration.
   No class actions. (Founder confirmed during brainstorming
   2026-05-17.)

   See: docs/superpowers/specs/2026-05-17-privacy-terms-and-footer-cleanup-design.md §5
   =========================================================================== */

const EFFECTIVE_DATE = "2026-05-17";
const EFFECTIVE_DATE_DISPLAY = "May 17, 2026";
const CONTACT_EMAIL = "angelo@mainline.finance";

export const metadata: Metadata = {
  title: "Terms of service — Dispatched",
  description:
    "Terms governing use of dispatched.finance, the intake and matching service operated by Dispatched, Inc.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <h1>Terms of service</h1>
      <p className="lead">
        Effective{" "}
        <time dateTime={EFFECTIVE_DATE}>{EFFECTIVE_DATE_DISPLAY}</time>. Last
        updated{" "}
        <time dateTime={EFFECTIVE_DATE}>{EFFECTIVE_DATE_DISPLAY}</time>.
      </p>

      <nav aria-label="Sections">
        <ul>
          <li><a href="#acceptance">1. Acceptance</a></li>
          <li><a href="#who-we-are">2. Who we are</a></li>
          <li><a href="#what-dispatched-is">3. What Dispatched is &mdash; and isn&rsquo;t</a></li>
          <li><a href="#eligibility">4. Eligibility</a></li>
          <li><a href="#your-application">5. Your account and your application</a></li>
          <li><a href="#communications">6. Communications consent</a></li>
          <li><a href="#lender-relationships">7. Lender relationships</a></li>
          <li><a href="#acceptable-use">8. Acceptable use</a></li>
          <li><a href="#ip">9. Intellectual property</a></li>
          <li><a href="#third-party">10. Third-party services</a></li>
          <li><a href="#disclaimers">11. Disclaimers</a></li>
          <li><a href="#liability">12. Limitation of liability</a></li>
          <li><a href="#indemnification">13. Indemnification</a></li>
          <li><a href="#governing-law">14. Governing law and venue</a></li>
          <li><a href="#no-class-actions">15. No class actions</a></li>
          <li><a href="#termination">16. Termination</a></li>
          <li><a href="#changes">17. Changes to these Terms</a></li>
          <li><a href="#misc">18. Miscellaneous</a></li>
          <li><a href="#contact">19. Contact</a></li>
        </ul>
      </nav>

      <section id="acceptance">
        <h2>1. Acceptance</h2>
        <p>
          These Terms of Service (the &ldquo;Terms&rdquo;) govern your use of
          dispatched.finance and the related intake, matching, and follow-up
          communications offered by Dispatched, Inc. By using the site,
          submitting an application or quote request, or otherwise engaging
          with the service, you agree to these Terms and to our{" "}
          <Link href="/privacy">Privacy Policy</Link>. If you do not agree,
          do not use the site.
        </p>
      </section>

      <section id="who-we-are">
        <h2>2. Who we are</h2>
        <p>
          Dispatched is operated by <strong>Dispatched, Inc.</strong>, a
          Wyoming corporation with its principal place of business at 12895
          Josey Lane #124, Dallas, TX 75234, United States. When these Terms
          say &ldquo;Dispatched,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo;
          or &ldquo;our,&rdquo; they mean Dispatched, Inc. When they say
          &ldquo;you&rdquo; or &ldquo;your,&rdquo; they mean the individual
          using the site and the trucking business on whose behalf that
          individual is acting. Questions about these Terms can be sent to{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </section>

      <section id="what-dispatched-is">
        <h2>3. What Dispatched is &mdash; and isn&rsquo;t</h2>
        <p>
          Dispatched is a commercial loan <strong>matching service</strong>{" "}
          for U.S. trucking operators. We route eligible borrower
          applications to third-party lenders on our panel whose underwriting
          appetite fits your business profile. Rates, fees, loan amounts,
          and approval decisions are determined by each lender and depend on
          the borrower&rsquo;s business profile. You will see full terms
          before signing anything.
        </p>
        <p>
          Dispatched is <strong>not a lender</strong>. Dispatched is not a
          broker of consumer loans and does not extend credit to consumers.
          Dispatched is not an insurance carrier. For the commercial
          trucking insurance funnel, <strong>Coverdash</strong> is the
          named licensed insurance producer; any insurance policy is issued
          by the carrier identified at the time of binding, not by
          Dispatched.
        </p>
        <p>
          Dispatched receives a flat referral fee from lenders on funded
          loans. This fee is disclosed on every term sheet and does not
          affect the APR you are offered. Operators using the matching
          service typically pay nothing for the matching service itself.
          Loans are subject to credit approval, and any registration or
          licensing requirements for commercial loan brokering in your
          jurisdiction will be disclosed in the footer of the site prior
          to launch.
        </p>
      </section>

      <section id="eligibility">
        <h2>4. Eligibility</h2>
        <p>
          The service is offered for business-to-business use only. To use
          the site you must:
        </p>
        <ul>
          <li>Be at least 18 years old.</li>
          <li>
            Operate, or be authorized to act on behalf of, a U.S.-based
            trucking business (sole proprietor, LLC, S-corp, or
            partnership).
          </li>
          <li>
            Have the legal authority to bind that business to these Terms
            and to authorize the credit-related steps described in
            &sect;5 and &sect;6.
          </li>
        </ul>
        <p>
          The service is not directed to consumers, to residents of
          jurisdictions outside the United States, or to minors. If you do
          not meet the eligibility criteria above, you may not use the
          site.
        </p>
      </section>

      <section id="your-application">
        <h2>5. Your account and your application</h2>
        <p>
          When you submit an application or quote request, you agree that
          the information you provide is true, complete, and current to the
          best of your knowledge. You authorize Dispatched and the partners
          identified at submission to verify the information you submit,
          including by contacting third parties (for example, lenders,
          carriers, and consumer or business credit reporting agencies) for
          that purpose.
        </p>
        <p>
          You acknowledge that, at intake, our intake partner Lendflow may
          perform a <em>soft pull</em> on your business credit profile and,
          where applicable, the owner&rsquo;s personal credit. A soft pull
          is not visible to other lenders and does not affect your credit
          score. A <em>hard pull</em> only happens after you select a
          specific lender from your shortlist and authorize that lender to
          proceed; the selected lender, not Dispatched, performs the hard
          pull. See the Privacy Policy &sect;8 for the full credit-reporting
          disclosure.
        </p>
      </section>

      <section id="communications">
        <h2>6. Communications consent</h2>
        <p>
          When you submit an application or quote request, you consent to
          receive phone calls, text messages, and emails from Dispatched
          and from the partner identified at submission, using the contact
          information you provide. For the insurance funnel, this consent
          is captured as one-to-one TCPA consent under FCC rules and is
          versioned in our codebase (version{" "}
          <code>v1-2026-04-27</code>) so the exact language you agreed to
          is preserved with your record. Some calls and messages may be
          made using automated technology or pre-recorded messages.
          Standard message and data rates may apply.
        </p>
        <p>
          Your consent is <strong>not</strong> a condition of any purchase
          and you can opt out at any time. For text messages, reply{" "}
          <strong>STOP</strong> to any SMS to opt out of that sender or{" "}
          <strong>HELP</strong> for assistance. For email, use the
          unsubscribe link at the bottom of any marketing email. For phone
          calls, tell us on the call or email{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>; oral
          revocation is honored.
        </p>
      </section>

      <section id="lender-relationships">
        <h2>7. Lender relationships</h2>
        <p>
          Once you select a lender from your shortlist and proceed with
          that lender, the loan documents, disclosures, and privacy notices
          issued by that lender govern the loan. Dispatched is not a party
          to the loan, does not service the loan, and does not guarantee
          any lender&rsquo;s offer, APR, term, funding decision, or
          performance. Any commitments about funding, pricing, or timing
          come from the lender directly &mdash; not from Dispatched
          &mdash; and you should rely only on what the lender puts in
          writing in its own disclosures and contract.
        </p>
      </section>

      <section id="acceptable-use">
        <h2>8. Acceptable use</h2>
        <p>
          You agree not to use the site or the service to:
        </p>
        <ul>
          <li>
            Submit false, misleading, or fraudulent information about
            yourself, your business, your finances, or your authority to
            act.
          </li>
          <li>
            Scrape, harvest, or otherwise programmatically extract data
            from the site, except for ordinary search-engine and AI-
            assistant crawling that respects our robots directives.
          </li>
          <li>
            Reverse engineer, decompile, or attempt to derive the source
            of any non-public component of the service.
          </li>
          <li>
            Launder funds, evade economic sanctions, finance terrorism,
            or otherwise use the service in furtherance of any unlawful
            activity.
          </li>
          <li>
            Impersonate any person or business, or misrepresent your
            authority to apply on behalf of a business.
          </li>
          <li>
            Submit automated, bulk, or scripted applications, or use the
            site in a way that would interfere with its operation or with
            other operators&rsquo; use of it.
          </li>
          <li>
            Use the service in any way that would put Dispatched out of
            compliance with our contracts with lenders, insurance
            producers, or other partners.
          </li>
        </ul>
        <p>
          We may suspend or terminate access to any user who violates this
          section, with or without notice. See &sect;16.
        </p>
      </section>

      <section id="ip">
        <h2>9. Intellectual property</h2>
        <p>
          The dispatched.finance site &mdash; including its content,
          calculators, methodology copy, layout, source code, and visual
          design &mdash; is owned by Dispatched or licensed to Dispatched
          and is protected by U.S. and international intellectual-property
          laws. Subject to your compliance with these Terms, Dispatched
          grants you a limited, revocable, non-exclusive, non-transferable
          license to access and use the site for its intended purpose
          (researching financing options and submitting an application or
          quote request on behalf of your trucking business). You may not
          copy, redistribute, republish, scrape, or build a derivative
          product on top of the site or its content without our prior
          written permission.
        </p>
      </section>

      <section id="third-party">
        <h2>10. Third-party services</h2>
        <p>
          The service relies on a small set of third parties, each with a
          specific role:
        </p>
        <ul>
          <li>
            <strong>Lendflow</strong> &mdash; the intake widget on the
            apply flow and the partner that performs the initial soft
            credit pull.
          </li>
          <li>
            <strong>Coverdash</strong> &mdash; the named licensed
            insurance producer for the commercial trucking insurance
            funnel.
          </li>
          <li>
            <strong>The lender panel</strong> &mdash; the trucking-
            friendly commercial lenders we route applications to. The
            panel rotates; the lender you ultimately select is named to
            you at selection time.
          </li>
          <li>
            <strong>Render</strong> &mdash; our hosting and
            infrastructure provider.
          </li>
        </ul>
        <p>
          Your use of any third-party flow (for example, completing the
          Coverdash quote widget or signing a loan agreement with a
          selected lender) is subject to that party&rsquo;s own terms and
          privacy policy. Dispatched is not responsible for the
          performance, decisions, content, or omissions of any third
          party.
        </p>
      </section>

      <section id="disclaimers">
        <h2>11. Disclaimers</h2>
        <p>
          The site and the matching service are provided{" "}
          <strong>&ldquo;as is&rdquo; and &ldquo;as available&rdquo;</strong>,
          without warranties of any kind, whether express, implied, or
          statutory, including without limitation implied warranties of
          merchantability, fitness for a particular purpose, title, and
          non-infringement. Dispatched does not warrant that the site
          will be uninterrupted or error-free, that defects will be
          corrected, or that the site or the servers that make it
          available are free of harmful components.
        </p>
        <p>
          Dispatched does <strong>not</strong> warrant or guarantee any
          funding outcome, APR, term, approval, or funding timeline. Rate
          ranges described on the site (for example, the working-capital
          range of 14%&ndash;34% and the equipment range of 9%&ndash;18%)
          are descriptive of observations across our panel and are
          <strong> not</strong> offers, quotes, pre-qualifications, or
          commitments. Our calculators are estimation tools intended to
          help you scope a request and are <strong>not</strong> credit
          decisions or commitments by Dispatched or by any lender.
        </p>
      </section>

      <section id="liability">
        <h2>12. Limitation of liability</h2>
        <p>
          To the maximum extent permitted by applicable law, Dispatched&rsquo;s
          aggregate liability to you arising out of or relating to these
          Terms or the service, whether in contract, tort (including
          negligence), strict liability, or any other theory, will not
          exceed the greater of (a) one hundred U.S. dollars ($100) or
          (b) the total amount of fees you paid to Dispatched in the
          twelve (12) months preceding the event giving rise to the
          claim (typically zero, because operators using the matching
          service generally pay nothing to Dispatched). In no event will
          Dispatched be liable for any indirect, incidental, consequential,
          special, exemplary, or punitive damages &mdash; including lost
          profits, lost revenue, lost data, business interruption, or cost
          of substitute services &mdash; even if Dispatched has been
          advised of the possibility of such damages. Nothing in this
          section limits liability that cannot be waived or limited under
          Texas law, including liability for gross negligence, willful
          misconduct, or any non-waivable statutory liability.
        </p>
      </section>

      <section id="indemnification">
        <h2>13. Indemnification</h2>
        <p>
          You agree to defend, indemnify, and hold harmless Dispatched and
          its officers, directors, employees, contractors, and agents from
          and against any claims, liabilities, damages, losses, and
          expenses (including reasonable attorneys&rsquo; fees) arising
          out of or in any way connected with (a) your use or misuse of
          the site or the service, (b) information you submitted that was
          false, misleading, or unauthorized, (c) your breach of these
          Terms, or (d) your violation of any applicable law or the
          rights of any third party. Dispatched reserves the right, at
          its own expense, to assume the exclusive defense and control of
          any matter otherwise subject to indemnification by you, in
          which case you will cooperate with Dispatched&rsquo;s defense
          of that matter.
        </p>
      </section>

      <section id="governing-law">
        <h2>14. Governing law and venue</h2>
        <p>
          These Terms and any dispute arising out of or relating to them
          or to the service are governed by <strong>Texas law</strong>,
          without regard to its conflict-of-laws principles. Exclusive
          venue for any dispute is in the state and federal courts
          located in <strong>Dallas County</strong>, Texas, and each
          party irrevocably consents to the personal jurisdiction of
          those courts and waives any objection to venue or to
          inconvenient forum in Dallas County.
        </p>
      </section>

      <section id="no-class-actions">
        <h2>15. No class actions</h2>
        <p>
          All disputes between you and Dispatched must be brought
          individually. You and Dispatched agree that neither party will
          bring or participate in any <strong>class action</strong>,
          collective action, consolidated action, mass action, or other
          representative proceeding arising out of or relating to these
          Terms or to the service. The courts in Dallas County retain
          authority to hear and decide individual disputes; this section
          limits only the form in which those disputes are brought, not
          your right to bring an individual claim.
        </p>
      </section>

      <section id="termination">
        <h2>16. Termination</h2>
        <p>
          Dispatched may suspend or terminate your access to the site or
          the service at any time, with or without notice, for any
          reason, including (without limitation) suspected violation of
          &sect;8 (acceptable use) or breach of any other provision of
          these Terms. You may stop using the service at any time. Upon
          termination, the following sections survive according to their
          terms: &sect;9 (Intellectual property), &sect;12 (Limitation
          of liability), &sect;13 (Indemnification), &sect;14 (Governing
          law and venue), &sect;15 (No class actions), and &sect;18
          (Miscellaneous), together with any other provision that by its
          nature is intended to survive.
        </p>
      </section>

      <section id="changes">
        <h2>17. Changes to these Terms</h2>
        <p>
          We update these Terms from time to time. When we do, the
          effective date at the top of the page moves and the body
          reflects the change. Material changes will also be flagged
          with an in-product notice at the top of the intake flow so you
          see the change before submitting a new application. Your
          continued use of the site after the new effective date means
          you accept the updated Terms; if you do not accept an update,
          stop using the site.
        </p>
      </section>

      <section id="misc">
        <h2>18. Miscellaneous</h2>
        <ul>
          <li>
            <strong>Severability.</strong> If any provision of these
            Terms is held invalid or unenforceable, the remaining
            provisions remain in full force and effect, and the invalid
            provision will be reformed to the minimum extent necessary
            to make it enforceable while preserving its original intent.
          </li>
          <li>
            <strong>No waiver.</strong> A failure to enforce any
            provision of these Terms is not a waiver of that provision
            or of any other right.
          </li>
          <li>
            <strong>Entire agreement.</strong> These Terms, together
            with the Privacy Policy and any other policies referenced
            in them, constitute the entire agreement between you and
            Dispatched regarding the site and the service, and
            supersede any prior or contemporaneous understandings on the
            same subject.
          </li>
          <li>
            <strong>Assignment.</strong> Dispatched may assign these
            Terms or any rights under them, in whole or in part, at any
            time and without notice (for example, in connection with a
            merger, acquisition, or sale of assets). You may not assign
            or transfer these Terms or any rights under them without
            Dispatched&rsquo;s prior written consent; any attempt to do
            so without consent is void.
          </li>
          <li>
            <strong>Notices.</strong> Legal notices to Dispatched must
            be in writing and sent both by email to{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> and
            by certified mail or recognized overnight courier to
            Dispatched, Inc., 12895 Josey Lane #124, Dallas, TX 75234,
            United States. Notices to you may be sent to the email or
            mailing address you provided in your most recent
            application.
          </li>
          <li>
            <strong>Headings.</strong> Section headings are for
            convenience only and do not affect the interpretation of
            these Terms.
          </li>
        </ul>
      </section>

      <section id="contact">
        <h2>19. Contact</h2>
        <p>
          Questions about these Terms:{" "}
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
        <Link href="/privacy">Read the Privacy Policy →</Link>
      </p>
    </>
  );
}
