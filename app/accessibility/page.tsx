import type { Metadata } from "next";
import Link from "next/link";

/* ===========================================================================
   Accessibility statement.

   Unlike the (legal)/* pages, this one is a real published commitment, not
   a counsel-review draft — so it lives outside the (legal) route group
   (which auto-wraps children in a "Draft pending counsel review" notice)
   and is indexable. ADA Title III and Section 508 expectations for a
   lending intake site: name the conformance target, be honest about gaps,
   give a working contact, name the responsible party, and date it.

   LAST_REVIEWED is a literal so renders are deterministic across SSR and
   ISR; do NOT replace it with a runtime date call. Bump it each time the
   page is meaningfully re-reviewed.
   =========================================================================== */

const LAST_REVIEWED = "2026-05-26";
const LAST_REVIEWED_DISPLAY = "May 26, 2026";
const CONTACT_EMAIL = "angelo@dispatched.finance";

export const metadata: Metadata = {
  title: "Accessibility statement — Dispatched",
  description:
    "Dispatched, Inc.'s commitment to WCAG 2.2 Level AA conformance on dispatched.finance, the known gaps we are working on, and how to report an accessibility barrier.",
  alternates: { canonical: "/accessibility" },
};

export default function AccessibilityPage() {
  return (
    <div className="disclosures">
      <Link href="/" className="back-link">
        ← Back to Dispatched
      </Link>

      <h1>Accessibility statement</h1>
      <p className="lead">
        Last reviewed{" "}
        <time dateTime={LAST_REVIEWED}>{LAST_REVIEWED_DISPLAY}</time>.
      </p>

      <nav aria-label="Sections">
        <ul>
          <li><a href="#commitment">1. Our commitment</a></li>
          <li><a href="#standard">2. Conformance target</a></li>
          <li><a href="#measures">3. Measures we take</a></li>
          <li><a href="#known-gaps">4. Known gaps</a></li>
          <li><a href="#third-party">5. Third-party content</a></li>
          <li><a href="#feedback">6. Report a barrier</a></li>
          <li><a href="#responsible-party">7. Responsible party</a></li>
        </ul>
      </nav>

      <section id="commitment">
        <h2>1. Our commitment</h2>
        <p>
          Dispatched is a funding-and-insurance intake used by owner-operators
          and small fleets to find capital. A driver who cannot read the page,
          tab through the form, or hear a phone prompt is a driver we have
          locked out of the service. We treat accessibility as a baseline
          requirement of the product, not a finishing touch.
        </p>
        <p>
          We design and build dispatched.finance to be usable by operators
          who rely on screen readers, keyboard navigation, voice control,
          captions, high-contrast modes, and reduced-motion settings. When
          we fall short, we want to hear about it &mdash; see &sect;6.
        </p>
      </section>

      <section id="standard">
        <h2>2. Conformance target</h2>
        <p>
          Our target is <strong>WCAG 2.2 Level AA</strong> conformance across
          the public site, the intake forms on /apply and /insurance/quote,
          and the marketing and content pages linked from the site footer.
          We also work toward the relevant Section 508 requirements that
          apply when our partners or customers are federal contractors.
        </p>
        <p>
          &ldquo;Target&rdquo; means we may not be fully conformant at every
          moment on every page. The known-gaps section below names where we
          are not yet there.
        </p>
      </section>

      <section id="measures">
        <h2>3. Measures we take</h2>
        <ul>
          <li>
            <strong>Semantic HTML and ARIA.</strong> Pages use real headings,
            landmarks, lists, and form labels. ARIA is used to fill genuine
            gaps in the platform, not as a replacement for native elements.
          </li>
          <li>
            <strong>Keyboard reachability.</strong> Every interactive control
            &mdash; navigation, form fields, dialogs, the embedded intake
            widget &mdash; is reachable and operable with a keyboard alone.
            A &ldquo;skip to main content&rdquo; link is the first
            focusable element on every page.
          </li>
          <li>
            <strong>Color and contrast.</strong> Body text and interactive
            controls meet the WCAG 2.2 AA contrast minimums (4.5:1 for body
            text, 3:1 for large text and UI components). Color is never the
            sole indicator of meaning.
          </li>
          <li>
            <strong>Motion and animation.</strong> Decorative motion respects
            the <code>prefers-reduced-motion</code> user setting.
          </li>
          <li>
            <strong>Form accessibility.</strong> Inputs have visible labels,
            descriptive error messages, and programmatic associations
            between labels, hints, and errors so assistive technology
            announces them correctly.
          </li>
          <li>
            <strong>Non-visual access to phone-first paths.</strong> A
            phone-call CTA appears on every primary page so an operator who
            cannot complete the visual form can reach a human directly.
          </li>
          <li>
            <strong>Manual testing.</strong> New pages and interactive flows
            are checked with keyboard-only navigation and with at least one
            screen reader (VoiceOver on macOS, NVDA on Windows) before they
            ship.
          </li>
        </ul>
      </section>

      <section id="known-gaps">
        <h2>4. Known gaps</h2>
        <p>
          Being honest about what is not yet conformant is more useful than
          claiming we are. As of the last-reviewed date above, these are the
          gaps we know about and are working on:
        </p>
        <ul>
          <li>
            <strong>Lendflow intake widget (/apply).</strong> The funding
            intake is an embedded third-party widget. We have not completed
            an independent accessibility audit of that widget. Operators who
            hit a barrier inside the widget can reach a human by calling
            the phone number listed on the page or by emailing the address
            in &sect;6, and we will complete the application by phone.
          </li>
          <li>
            <strong>Coverdash insurance widget (/insurance/quote).</strong>{" "}
            Same posture as the funding widget: an embedded third-party
            quote form whose internal accessibility we do not control. Phone
            and email fallbacks are available on the page.
          </li>
          <li>
            <strong>Data-dense Pulse pages and tables.</strong> The diesel,
            rate, and insurance-pulse pages contain tables and charts where
            we are still improving programmatic table semantics and
            non-visual summaries of the chart data.
          </li>
          <li>
            <strong>PDF research reports.</strong> Long-form research
            published as downloadable PDF is not yet tagged for full
            accessibility. The HTML version on the site is the accessible
            source of record; if you need an accessible alternative for a
            specific PDF, ask us using the contact in &sect;6.
          </li>
          <li>
            <strong>No formal independent audit yet.</strong> Conformance is
            self-assessed. We intend to commission an independent WCAG 2.2
            AA audit; until then, treat this statement as a description of
            intent and current best effort, not a third-party certification.
          </li>
        </ul>
      </section>

      <section id="third-party">
        <h2>5. Third-party content</h2>
        <p>
          Parts of the site embed content or tooling from third parties &mdash;
          notably the Lendflow funding intake and the Coverdash insurance
          quote widget. We do not control the internal markup of those
          embeds. We escalate accessibility issues to those vendors when we
          find them, and we maintain phone and email fallbacks so an
          operator is never blocked from applying because of a widget bug.
        </p>
      </section>

      <section id="feedback">
        <h2>6. Report a barrier</h2>
        <p>
          If something on dispatched.finance is hard or impossible to use
          with your assistive technology, please tell us. We treat
          accessibility reports as bugs and prioritize them on the same
          severity ladder as a broken intake form.
        </p>
        <p>
          Email{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>{" "}
          with as much detail as you can share: the page URL, what you were
          trying to do, what assistive technology and browser you were
          using, and what happened (or did not happen). We will acknowledge
          within two business days and tell you when to expect a fix or a
          workaround.
        </p>
        <p>
          You can also reach a human by phone using the number listed in
          the site footer; tell whoever answers that you are calling about
          an accessibility issue.
        </p>
      </section>

      <section id="responsible-party">
        <h2>7. Responsible party</h2>
        <p>
          The accessibility of dispatched.finance is the responsibility of{" "}
          <strong>Dispatched, Inc.</strong>, the same entity that publishes
          the <Link href="/privacy">privacy policy</Link> and{" "}
          <Link href="/terms">terms of service</Link>. Day-to-day
          accessibility decisions and triage are owned by Angelo Orru Neto,
          founder, reachable at the email above.
        </p>
        <address>
          Dispatched, Inc.<br />
          12895 Josey Lane #124<br />
          Dallas, TX 75234<br />
          United States
        </address>
      </section>
    </div>
  );
}
