# Accessibility remediation — Claude Code handoff plan

**Source audit:** `docs/accessibility-audit-2026-04-23.md`
**Target:** the landing page at `/` (and one token-level change that touches the rest of the app)
**Date:** 2026-04-23

This plan converts the audit's 16 findings into seven reviewable PRs, ordered by dependency and impact. Each PR is self-contained, land-able independently, and ends with explicit verification steps so Claude Code can confirm completion before moving on.

---

## Ground rules for Claude Code

1. **Treat this codebase as a pre-release Next.js build with breaking changes from what you know.** Before touching any Next.js API (routing, `metadata`, `next/link`, `next/font`, server/client boundaries), read the relevant guide in `node_modules/next/dist/docs/` — see the repo's `AGENTS.md`. The PRs below are mostly CSS and plain JSX, so this matters less, but if a change crosses into Next.js surface area, verify the API against local docs first.
2. **Branch per PR.** Use `a11y/<kebab-summary>` branches (e.g. `a11y/focus-visible`, `a11y/contrast-tokens`). Land them in the order below; later PRs assume earlier ones.
3. **One PR = one concern.** Don't fold follow-ups. If you discover an adjacent issue mid-work, file a follow-up ticket instead of bundling.
4. **No new dependencies.** Everything here can be done with the tools already in `package.json` (Next, React, Tailwind, local CSS tokens). Do not add axe/jest-axe etc. as part of these PRs — that's a separate later proposal.
5. **Verify on both desktop (≥1200px) and mobile (≤480px) viewports.** The landing page has three breakpoint tiers (900/720/480).
6. **Never delete the existing focus styles in `intake.css`.** The intake flow is a separate surface; do not refactor it.
7. **Do not commit unless explicitly asked.** Push the branch, open a draft PR, and tag the author for review.

---

## Shared verification toolkit

After each PR (or pair of PRs) run this short checklist. Every item should pass before moving on.

- `npm run lint` — ESLint passes.
- `npm run build` — Next build completes without new warnings.
- **Manual keyboard pass.** Open `/`, Tab from the top, confirm: (a) a visible focus ring appears on every interactive element in order; (b) activating Enter/Space on the FAQ button toggles the panel; (c) the mobile hamburger opens + closes on Enter, and Esc closes it.
- **Screen-reader spot check.** Load `/` in Safari + VoiceOver (macOS: Cmd+F5). Confirm: main landmark announced, skip link reachable as first Tab, FAQ buttons announce expanded/collapsed state, mobile menu announces open state.
- **Contrast sanity.** Pop open devtools color picker on: one `.qual-steps` label, one `.decline-card .num`, one input border, and one `.faq-button` focus ring. Each should report ≥4.5:1 (text) or ≥3:1 (component boundary).
- **Reduced motion.** macOS: System Settings → Accessibility → Display → Reduce Motion. Reload `/`. Confirm the hero dot, FAQ chevron, and mobile-menu slide have no visible animation.

---

## PR 1 — `a11y/landmark-and-skip-link`

**Why first:** every other PR builds on this landmark. It's tiny, reviewable in 30 seconds, and unblocks PR 2's skip-link target.

**Files to touch**

| File | Change |
|---|---|
| `app/page.tsx` | Wrap everything below `<Nav />` in `<main id="main-content">…</main>` |
| `app/layout.tsx` | Add a visually-hidden skip link as the first child inside `<body>` |
| `app/styles/landing.css` | Add `.skip-link` visually-hidden + focus-reveal styles |

**Exact change — `app/page.tsx`**

```diff
 export default function LandingPage() {
   return (
     <div className="landing">
       <Nav />
-      <Hero />
-      <DeclineSection />
-      <HowItWorks />
-      <ProofSection />
-      <LenderStrip />
-      <FAQ />
-      <Footer />
+      <main id="main-content">
+        <Hero />
+        <DeclineSection />
+        <HowItWorks />
+        <ProofSection />
+        <LenderStrip />
+        <FAQ />
+      </main>
+      <Footer />
     </div>
   );
 }
```

Footer stays outside `<main>` — it's a sibling landmark. Nav is already inside a `<nav>` element.

**Exact change — `app/layout.tsx`**

```diff
     <html lang="en" className={`${archivo.variable} ${plexSans.variable} ${plexMono.variable}`}>
-      <body>{children}</body>
+      <body>
+        <a href="#main-content" className="skip-link">Skip to main content</a>
+        {children}
+      </body>
     </html>
```

**Exact change — `app/styles/landing.css`** (append, near the top-level rules around line 14)

```css
/* Skip link — visible on keyboard focus only. */
.skip-link {
  position: absolute;
  top: 0;
  left: 0;
  padding: 12px 16px;
  background: var(--color-ink-primary);
  color: var(--color-ink-inverse);
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 14px;
  border-radius: 0 0 var(--radius-md) 0;
  z-index: 100;
  transform: translateY(-100%);
  transition: transform var(--motion-hover) var(--ease-out);
}
.skip-link:focus-visible {
  transform: translateY(0);
  outline: 2px solid var(--color-hiviz-400);
  outline-offset: 2px;
}
@media (prefers-reduced-motion: reduce) {
  .skip-link { transition: none; }
}
```

**Verify PR 1**

- Load `/`. Tab once — the skip link should slide into the top-left corner and be clearly readable.
- Press Enter — focus should jump to the hero area (first focusable child of `<main>`).
- Check page source: exactly one `<main id="main-content">` and one `<a class="skip-link">` exist.

---

## PR 2 — `a11y/focus-visible`

**Why second:** largest keyboard-UX win in the whole project; needs PR 1 only for the skip-link rule. All subsequent PRs get validated more easily once you can see focus.

**File to touch:** `app/styles/landing.css` only.

**Pattern:** port the intake flow's pattern (`intake.css:554-556`). Add one global rule plus two per-component overrides where the default outline clashes with layout.

**Change — append to the bottom of `landing.css` (after the `::selection` block)**

```css
/* ---------- FOCUS VISIBLE (a11y) ----------
   Scoped under .landing so the intake flow (intake.css) keeps its own rules.
   Anything focusable inside .landing that doesn't override this inherits it. */
.landing a:focus-visible,
.landing button:focus-visible,
.landing [role="button"]:focus-visible,
.landing summary:focus-visible {
  outline: 2px solid var(--color-hiviz-600);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

/* Preserve rounded-corner shape on pill-ish components */
.landing .btn-primary:focus-visible,
.landing .btn-secondary:focus-visible {
  outline-offset: 3px;
  border-radius: var(--radius-md);
}

/* Footer dark-background focus: flip ring to hiviz-400 for contrast */
.landing .footer a:focus-visible,
.landing .footer button:focus-visible,
.landing .feat-card.median :focus-visible {
  outline-color: var(--color-hiviz-400);
}

/* Inputs already have a focus style (border + halo) — keep it, but add a
   fallback outline for forced-colors / high-contrast mode users. */
.landing .input:focus-visible,
.landing .select:focus-visible {
  outline: 2px solid transparent; /* visible under forced-colors only */
}
```

**Verify PR 2**

- Keyboard-only: Tab through the entire page. Every link, button, FAQ row, mobile menu trigger, footer link, and nav item should show a 2px amber ring.
- Confirm no visual regression around `.btn-primary` (ring should sit 3px outside the button; the button itself should not gain extra padding).
- In Firefox: Settings → Accessibility → **Always underline links** — confirm this still works alongside the new focus styles.
- Forced-colors test (Windows High Contrast or Chrome DevTools → Rendering → "Emulate CSS media feature forced-colors"): focus ring still visible.

---

## PR 3 — `a11y/contrast-tokens`

**Why third:** pure token-level change. The design values in `tokens.css` feed both landing and intake surfaces; this PR is the riskiest for visual regression, which is why it ships after focus-visible — you need to *see* where you're tabbing when you do the visual diff.

**Files to touch:** `app/styles/tokens.css`, `app/styles/landing.css` (two focused spots).

**Change — `app/styles/tokens.css`**

```diff
   /* Ink */
   --color-ink-primary:   #0E1A22;
   --color-ink-secondary: #3B4750;
-  --color-ink-tertiary:  #6F7A82;
+  /* Tertiary darkened from #6F7A82 → #5A6369 to pass WCAG AA (4.5:1) on
+     bg-paper (5.74:1), bg-surface (6.13:1), and bg-sunken (5.30:1). */
+  --color-ink-tertiary:  #5A6369;
   --color-ink-inverse:   #FAF7F2;
```

```diff
   /* Borders */
-  --color-border:        #E0D8CA;
-  --color-border-strong: #C8BDA7;
+  /* Cosmetic hairline — keeps the warm putty tone for card outlines where
+     3:1 is not required (decorative boundary against large fills). */
+  --color-border:          #E0D8CA;
+  --color-border-strong:   #C8BDA7;
+  /* Interactive-field boundary — darkened to meet 1.4.11 (3:1) so input,
+     select, and pressable components have a perceivable edge. */
+  --color-border-field:    #8F7F64; /* 3.90:1 on white, 3.65:1 on paper */
```

**Change — `app/styles/landing.css`** (two spots)

Replace the input/select border token at line 239 and the `.soon-tag` border at line 58:

```diff
 .landing .input, .landing .select {
   height: 52px;
   background: var(--color-bg-surface);
-  border: 1px solid var(--color-border);
+  border: 1px solid var(--color-border-field);
```

```diff
 .landing .nav-links a.soon .soon-tag {
   font-size: 10px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase;
   color: var(--color-ink-tertiary);
-  padding: 2px 6px; border: 1px solid var(--color-border); border-radius: 4px;
+  padding: 2px 6px; border: 1px solid var(--color-border-field); border-radius: 4px;
   line-height: 1;
 }
```

**Also update the input focus state in the same file** (around line 248 — the current 2.93:1 border becomes crisper once the idle state is darker; keep the halo but thicken the border):

```diff
 .landing .input:focus, .landing .select:focus {
-  border-color: var(--color-hiviz-400);
+  border-color: var(--color-hiviz-600);
+  border-width: 1px; /* keep layout stable */
   box-shadow: 0 0 0 3px var(--color-hiviz-50);
 }
```

(`--color-hiviz-600` on white = 4.66:1, comfortably above the 3:1 non-text threshold.)

**Verify PR 3**

- Visual diff: compare before/after screenshots of the hero (nav's "Construction — Soon" tag), the qualification calc, the decline cards, the flow diagram (`.flow-who`), and the proof cards (`.state-tag`). Confirm: (a) text is darker but still unmistakably the "tertiary" tier, (b) input borders are now visibly defined.
- Use Chrome DevTools color-picker on: one `.qual-steps` span, one `.trust-note` line, one idle `.input` border. All three should show "AA: pass" in the color picker.
- Check that the intake flow (`/apply`) visually holds — tokens are shared. If anything breaks there, the intake styles should be scoped under `.phone` / `.intake` class selectors and unaffected; verify by loading `/apply` and scanning for off-kilter text colors.

---

## PR 4 — `a11y/html-semantics-fixes`

**Why fourth:** pure JSX, no CSS dependencies. Can land in parallel with PR 5 if split across two reviewers.

**Files to touch:** `components/landing/Hero.tsx`, `components/landing/Nav.tsx`, `components/landing/Footer.tsx`, `components/landing/icons.tsx`, `components/landing/Logo.tsx`, `components/landing/HowItWorks.tsx`.

### 4a. Un-nest `<a><button>` in the hero

**`components/landing/Hero.tsx:40-44`**

```diff
-            <a href="#how-it-works">
-              <button type="button" className="btn-secondary">
-                How it works
-              </button>
-            </a>
+            <a href="#how-it-works" className="btn-secondary">
+              How it works
+            </a>
```

Verify `.btn-secondary` styles already apply to anchors (check `landing.css:104-115` — they do, because the selectors are class-only).

### 4b. Add `aria-current="page"` to the active nav link

**`components/landing/Nav.tsx:22-24`**

```diff
-            <a href="#" className="active">
+            <a href="#" className="active" aria-current="page">
               Trucking
             </a>
```

### 4c. Mark decorative icons as `aria-hidden`

Every icon in `components/landing/icons.tsx` is stroke-only decoration that sits next to text. The simplest fix is at the source — add `aria-hidden="true"` to the `<svg>` element in each exported component.

**`components/landing/icons.tsx`** — add `aria-hidden="true"` to every `<svg>` in the file (11 exports: `IconPhone`, `IconArrowRight`, `IconLock`, `IconMenu`, `IconClose`, `IconChevronDown`, `IconTruck`, `IconDollar`, `IconClock`, `IconFlowArrow`, `LogoMark`).

**Exception:** the hamburger `<IconMenu />` / `<IconClose />` render inside `.mobile-menu-btn`, which already has a visible-text `aria-label`. Adding `aria-hidden="true"` to the inner SVGs is still correct — the label supplies the name.

Same treatment for `components/landing/Logo.tsx`:

```diff
 export default function Logo({ color, className = "" }: Props) {
   return (
     <span className={`logo ${className}`} style={color ? { color } : undefined}>
-      <LogoMark />
+      <LogoMark aria-hidden="true" />
       Dispatched
     </span>
   );
 }
```

(`LogoMark` will need to accept and spread an `aria-hidden` prop — either spread `...rest` on the `<svg>`, or just hard-code `aria-hidden="true"` inside `LogoMark` itself since it's always decorative.)

### 4d. Handle placeholder `href="#"` links

Two-step approach. For the **"Coming soon" / unavailable** items, convert to `<span aria-disabled="true">` with the same visual treatment. For **links that will exist** but don't yet, add a TODO comment and leave as-is (focus-visible already makes them navigable).

**`components/landing/Nav.tsx` — the "Construction" link** (lines 25-27)

```diff
-            <a href="#" className="soon">
+            <span className="soon" aria-disabled="true">
               Construction <span className="soon-tag">Soon</span>
-            </a>
+            </span>
```

Repeat for the mobile menu entry (line 55-57) with the same treatment.

Update `.landing .nav-links a.soon` selectors in `landing.css` to also match `span.soon`:

```diff
-.landing .nav-links a.soon { ... }
+.landing .nav-links .soon { ... }
-.landing .nav-links a.soon .soon-tag { ... }
+.landing .nav-links .soon .soon-tag { ... }
```

**`components/landing/Footer.tsx`** — leave the placeholder links in the footer **as-is for this PR** but add a TODO at the top of the file:

```tsx
// TODO(a11y): href="#" placeholder links below — wire to real routes or convert
// to <span aria-disabled="true"> per docs/accessibility-audit-2026-04-23.md #11.
```

File a separate tracking issue to replace them in a follow-up (this keeps the PR small and reviewable — footer link destinations are a product decision, not an a11y decision).

### 4e. Decorative flow-icon wrappers

In `components/landing/HowItWorks.tsx:90-92` (and the sibling `.feat-icon` spans), the wrapping `<span className="feat-icon">` is presentational. No JSX change needed — the inner SVGs get `aria-hidden` via 4c above.

**Verify PR 4**

- Validate HTML: `npx html-validate` against a built `next export` output (or run Chrome DevTools → Lighthouse → Accessibility — should drop the "button descendant of anchor" warning).
- VoiceOver: navigate into the hero. The "How it works" button should announce exactly once as "How it works, link" (not "link, button").
- Nav rotor in VoiceOver: the "Trucking" item should announce "current page".
- Tab into the nav: "Construction — Soon" should be skipped (non-focusable span); if you keep the "Coming soon" focusable, announce includes "dimmed".

---

## PR 5 — `a11y/disclosure-widgets`

**Why fifth:** needs PR 2 (focus-visible) to verify the UX. Touches two interactive patterns: the FAQ accordion and the mobile menu.

**Files to touch:** `components/landing/FAQ.tsx`, `components/landing/Nav.tsx`.

### 5a. FAQ accordion — `aria-controls` + panel IDs

**`components/landing/FAQ.tsx`** — the mapped faq items:

```diff
           {faqs.map((f, i) => {
             const isOpen = open === i;
+            const buttonId = `faq-btn-${i}`;
+            const panelId = `faq-panel-${i}`;
             return (
               <div className={`faq-item ${isOpen ? "open" : ""}`} key={i}>
                 <button
                   type="button"
+                  id={buttonId}
                   className="faq-button"
                   aria-expanded={isOpen}
+                  aria-controls={panelId}
                   onClick={() => setOpen(isOpen ? -1 : i)}
                 >
                   <span>{f.q}</span>
                   <IconChevronDown className="chev" />
                 </button>
-                <div className="faq-answer">
+                <div
+                  id={panelId}
+                  className="faq-answer"
+                  role="region"
+                  aria-labelledby={buttonId}
+                  hidden={!isOpen}
+                >
                   <div className="faq-answer-inner">{f.a}</div>
                 </div>
               </div>
             );
           })}
```

**Watch out:** the `hidden` attribute toggles `display: none`, which will conflict with the current `max-height` transition. Two paths:

1. **Simple (recommended for this PR):** remove the `max-height` transition in `landing.css:568-572` and let `hidden` do the work. Lose the slide animation, keep correctness.
2. **Keep animation:** omit `hidden`, keep the visual transition. You still get the proper semantics from `role="region"` + `aria-labelledby` + `aria-expanded` — the answer is always in the DOM, just clipped. Screen readers will hear the content either way but will also announce the collapsed one. Less ideal but acceptable.

Pick (1) if you want rigor; (2) if you want to preserve the motion design. Either choice is audit-compliant — document the choice in the PR description.

### 5b. Mobile menu — `aria-controls` + id, Esc to close, focus trap

**`components/landing/Nav.tsx`**

```diff
   const [mobileOpen, setMobileOpen] = useState(false);
   const close = () => setMobileOpen(false);

+  // Close on Esc when open
+  useEffect(() => {
+    if (!mobileOpen) return;
+    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
+    window.addEventListener("keydown", onKey);
+    return () => window.removeEventListener("keydown", onKey);
+  }, [mobileOpen]);
+
```

Don't forget to add `useEffect` to the React import.

Update the toggle button:

```diff
             <button
               type="button"
               className="mobile-menu-btn"
               aria-label={mobileOpen ? "Close menu" : "Open menu"}
               aria-expanded={mobileOpen}
+              aria-controls="mobile-menu"
               onClick={() => setMobileOpen((v) => !v)}
             >
```

Update the menu container:

```diff
-      <div className={`mobile-menu ${mobileOpen ? "open" : ""}`}>
+      <div
+        id="mobile-menu"
+        className={`mobile-menu ${mobileOpen ? "open" : ""}`}
+        role="dialog"
+        aria-modal="true"
+        aria-label="Mobile navigation"
+        hidden={!mobileOpen}
+      >
```

**Focus trap is optional for this PR.** The menu contains only links + a CTA, so Tab already cycles through them. Setting `hidden={!mobileOpen}` removes the closed menu from the tab order, which was the actual bug. If you want a proper trap later, file a follow-up to extract a reusable `useFocusTrap` hook.

**CSS adjustment — `landing.css:656-665`:** the existing `display: none` / `.open { display: flex }` toggle now duplicates the `hidden` attribute. Simplify:

```diff
 .landing .mobile-menu {
-  display: none;
+  display: flex;
   position: fixed; inset: 72px 0 0 0;
   background: var(--color-bg-paper);
   z-index: 40;
   padding: 32px var(--gutter-mobile);
   flex-direction: column;
   gap: 4px;
 }
-.landing .mobile-menu.open { display: flex; }
+.landing .mobile-menu[hidden] { display: none; }
```

**Verify PR 5**

- Keyboard: tab to FAQ row 1 → Enter → panel opens, focus remains on the header, Tab moves into the links inside the answer.
- Close mobile menu with Esc — verify focus returns to the hamburger button (React will do this automatically because the button was the last focused element; if not, add `triggerRef.current?.focus()` in the `onKey` handler).
- VoiceOver: navigate into an FAQ row. Announce should read "What rates can I actually expect?, collapsed, button". Expand — "expanded". Move forward — "region, What rates can I actually expect?" then the content.
- Collapsed FAQ panels should not appear in the VoiceOver rotor's "form controls" or "text" list.

---

## PR 6 — `a11y/touch-targets-and-motion`

**Why sixth:** low-risk polish. Land after PRs 1-5 are in so the visual diff is against the final shape.

**Files to touch:** `app/styles/landing.css`.

### 6a. Enlarge small interactive elements

```diff
 .landing .mobile-menu-btn {
-  display: none; background: transparent; border: 0; padding: 8px;
+  display: none; background: transparent; border: 0; padding: 10px;
   color: var(--color-ink-primary); cursor: pointer;
+  min-width: 44px; min-height: 44px;
+  display: inline-flex; align-items: center; justify-content: center;
 }
```

(Note: there are two `display` properties now — the `@media (max-width: 720px)` rule at line 80 flips it to `inline-flex`. Either keep the media-query flip or restructure; simplest is to move `display: none` into the media query it belongs to and leave `inline-flex` as default. Do that cleanup here.)

```diff
 .landing .nav-links a {
   font-family: var(--font-body); font-weight: 500; font-size: 15px;
   color: var(--color-ink-secondary);
+  padding: 8px 0;
   transition: color var(--motion-hover) var(--ease-out);
 }
```

```diff
 .landing .footer .col a {
   font-size: 14px; color: rgba(250, 247, 242, 0.85);
+  padding: 4px 0;
+  display: inline-block;
   transition: color var(--motion-hover) var(--ease-out);
 }
```

```diff
 .landing .qual-result .back-link {
   font-size: 13px; color: var(--color-ink-secondary);
-  cursor: pointer; background: none; border: 0; padding: 0;
+  cursor: pointer; background: none; border: 0; padding: 8px 0;
+  min-height: 36px;
   text-decoration: underline; text-underline-offset: 3px;
-  margin-top: 14px;
+  margin-top: 6px;
 }
```

```diff
 .landing .legal-links a {
+  padding: 4px 0;
+  display: inline-block;
 }
```

### 6b. Global reduced-motion wrap

Add at the bottom of `landing.css`:

```css
/* ---------- REDUCED MOTION ---------- */
@media (prefers-reduced-motion: reduce) {
  .landing *,
  .landing *::before,
  .landing *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

The hero dot's existing `@media (prefers-reduced-motion)` rule at line 155 becomes redundant — delete it.

**Verify PR 6**

- Dev tools device toolbar → iPhone 14 profile. Long-press-simulate (just tap) each: mobile menu button, each footer link, the "Change my answers" back-link. All should have a hit area ≥ 36x36 minimum (ideally 44).
- macOS Reduce Motion on → reload. Hero dot doesn't pulse, chevron doesn't rotate (snaps), mobile menu doesn't slide.

---

## PR 7 — `a11y/form-polish` (optional, low priority)

**Why last:** minor polish, would only delay the high-value fixes if bundled earlier.

**Files to touch:** `components/landing/QualificationCalc.tsx`.

### 7a. Remove native `title=` tooltip

```diff
-        <div className="safe" title="No credit check at this step">
+        <div className="safe">
           <IconLock />
           No pull
         </div>
```

The `.qual-foot` paragraph below already explains "Zero credit impact at this step" — the tooltip was redundant and keyboard-inaccessible.

### 7b. Required-field indicators

```diff
-        <label htmlFor="revenue">Monthly revenue</label>
+        <label htmlFor="revenue">
+          Monthly revenue <span aria-hidden="true" className="req">*</span>
+          <span className="sr-only">(required)</span>
+        </label>
```

Repeat for the `yrs` label. Add the CSS:

```css
.landing .field label .req {
  color: var(--color-hiviz-600);
  margin-left: 2px;
}
.landing .sr-only {
  position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;
}
```

**Verify PR 7**

- VoiceOver on the two selects: announces "Monthly revenue, required, pop-up button" etc.
- Visual: red asterisk is barely visible inline but present.

---

## Suggested rollout schedule

| Day | PR | Owner | Reviewer | Notes |
|-----|----|-------|----------|-------|
| 1 | PR 1 landmark + skip link | Claude Code | Angelo | ~15 min work |
| 1 | PR 2 focus-visible | Claude Code | Angelo | ~20 min; biggest visible change |
| 2 | PR 3 contrast tokens | Claude Code | Angelo + design | Visual regression sensitive; bring design in for review |
| 2 | PR 4 semantics fixes | Claude Code | Angelo | Can parallel PR 5 |
| 3 | PR 5 disclosure widgets | Claude Code | Angelo | Requires a11y-aware review |
| 3 | PR 6 touch targets + motion | Claude Code | Angelo | Polish |
| later | PR 7 form polish | Claude Code | Angelo | Optional, ship when bandwidth permits |

Total engineering time: **~6-8 focused hours** including reviews and QA, spread over 3 calendar days.

---

## After the plan lands — follow-ups (file as separate tickets)

1. **Wire up footer placeholder links to real routes** (audit finding #11). Product decision, not a11y.
2. **Add axe-core to CI** via `@axe-core/playwright` or `jest-axe` — regression gate.
3. **Full audit of `/apply` intake flow** — the source already has better focus styles but has not been separately reviewed.
4. **Zoom to 200% / 400% reflow test** (WCAG 1.4.10) — the `.flow-diagram` and `.hero-grid` are the likely break points.
5. **Live axe / Lighthouse run against prod once deployed** — confirms the source-level audit matches rendered reality.
6. **Consider migrating landing CSS to CSS Modules** — would make the `.landing` scope boundary enforced by the compiler rather than by convention.

---

## Copy-paste starter prompt for Claude Code

Paste this into the first Claude Code session to bootstrap PR 1:

> Read `docs/accessibility-handoff-plan-2026-04-23.md` and `docs/accessibility-audit-2026-04-23.md`. Implement PR 1 (`a11y/landmark-and-skip-link`) exactly as specified — no scope creep, no other PRs bundled in. When done, run the PR 1 verification checklist, commit on a new branch `a11y/landmark-and-skip-link`, and open a draft PR tagging Angelo for review. Stop and ask before starting PR 2. Remember: this repo uses a pre-release Next.js — consult `node_modules/next/dist/docs/` before touching any Next.js API.

Then for each subsequent PR:

> Continue with PR {N} from `docs/accessibility-handoff-plan-2026-04-23.md`. Same rules — match the spec, run the verification checklist, open a draft PR, stop and wait for review.
