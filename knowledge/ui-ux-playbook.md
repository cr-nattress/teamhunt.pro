# TeamHunt UI/UX Playbook (LLM-Optimized)

Purpose: a concise, implementation-ready guide for designers, engineers, and LLMs to produce consistent UI that is fast, accessible, and brand-aligned across:

- apps/landing (Next.js 14)
- apps/organizer (Next.js 14)
- website (Docusaurus 3)

This playbook distills principles inspired by Typeform’s clean, conversion-focused marketing and adds concrete implementation recipes for our stack.

---

## 1) Design Tokens (single source of truth)

Define tokens once and apply across apps. Prefer CSS variables at :root for runtime theming. Mirror in TS for component props when needed.

Suggested file locations (no code changes yet):

- packages/ui/src/tokens.css (CSS variables)
- packages/ui/src/tokens.ts (TS token exports for components)
- apps/*/app/globals.css import the CSS tokens
- website/src/css/custom.css import the CSS tokens

Baseline token set:

- Colors
  - --color-bg: #ffffff
  - --color-fg: #0a0a0a
  - --color-fg-muted: #3a3a3a
  - --color-primary: #6f3ef6 (example accent)
  - --color-primary-ink: #ffffff
  - --color-border: #e6e6e6
  - --color-success: #16a34a, --color-warning: #f59e0b, --color-danger: #ef4444

- Typography
  - --font-sans: system-ui, -apple-system, Segoe UI, Roboto, Inter, Arial, sans-serif
  - Size scale (mobile-first, fluid):
    - --font-1: clamp(0.875rem, 0.82rem + 0.2vw, 0.95rem)
    - --font-2: clamp(1rem, 0.95rem + 0.3vw, 1.125rem)
    - --font-3: clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem)
    - --font-4: clamp(1.75rem, 1.4rem + 1.2vw, 2.25rem)
    - --font-5: clamp(2.25rem, 1.8rem + 1.8vw, 3rem)
  - Line-height: 1.1 for display, 1.3 for headings, 1.6 for body

- Spacing (8-based)
  - --space-1: 4px, --space-2: 8px, --space-3: 12px, --space-4: 16px, --space-5: 24px, --space-6: 32px, --space-7: 48px, --space-8: 64px

- Radius & Shadow
  - --radius-sm: 6px, --radius-md: 10px, --radius-lg: 16px, --radius-full: 999px
  - --shadow-1: 0 1px 2px rgba(0,0,0,0.06)
  - --shadow-2: 0 4px 12px rgba(0,0,0,0.08)

- Motion
  - --ease-standard: cubic-bezier(.2,.8,.2,1)
  - --dur-fast: 120ms, --dur-med: 200ms, --dur-slow: 320ms

Accessibility constraints:

- Maintain WCAG AA contrast for text/background combinations.
- Respect prefers-reduced-motion; reduce or disable transforms.

---

## 2) Typography System

- Headings: bold to semi-bold, generous letter-spacing for large display.
- Body: regular weight, comfortable line length (60–75ch on desktop).
- Implementation (Next.js)
  - Use next/font for Inter or Geist Sans and fallback to --font-sans.
  - Apply font variables on html:class for easy theming.
- Implementation (Docusaurus)
  - Override theme font-family in website/src/css/custom.css and import via @font-face or system stack.

---

## 3) Color & Theming

- Default theme is high-contrast: white backgrounds, near-black text, accent primary for CTAs.
- Keep accent usage intentional: primary buttons and key links.
- Provide dark mode later by swapping variable values (prefers-color-scheme: dark) without changing component code.

---

## 4) Layout & Grid

- Container widths: 1200px max, 16px–24px gutters on mobile, 32px–40px on desktop.
- Breakpoints: 576, 768, 992, 1200 (align with content and Next/Image usage).
- Section pattern: generous whitespace, clear hierarchy. Two-column on desktop; stack on mobile.

---

## 5) Core Components (behavioral contract)

Keep components minimal, accessible, and token-driven. Implement in packages/ui and consume in apps.

- Button
  - Variants: primary, secondary, link
  - States: hover, active, focus-visible outline, disabled
  - Size: sm, md, lg based on --space-*
  - Hit target >= 44px height

- Navigation (Header)
  - Desktop: left logo, grouped links, right auth CTA
  - Mobile: hamburger -> aria-controlled drawer, focus trapping, ESC to close
  - Sticky on scroll, shadow on elevate

- Card
  - Padding 16–24px, --radius-md, --shadow-1 by default
  - Optional media top, content stack, actions footer

- Form Controls
  - Label + input pairing, visible focus ring
  - Error state: border + text in --color-danger, aria-describedby for messages

- Toggle/Switch
  - Keyboard accessible (space/enter), aria-checked

- Accordion
  - Button with aria-expanded, panel id/controls linking

- Modal
  - Portal, aria-modal, role=dialog, focus trap, ESC to close, overlay click optional

---

## 6) Accessibility (must-have)

- Keyboard: all interactive elements reachable in logical order, :focus-visible styles.
- Semantics: use <button>, <nav>, <header>, <main>, <footer>, <section>, <ul>/<li>.
- Motion: prefers-reduced-motion queries for all transitions/animations.
- Images: descriptive alt; decorative images with empty alt.
- Forms: labels, describedby for errors, meaningful placeholders.

---

## 7) Motion & Microinteractions

- Use opacity/translateY small values for reveal; keep under 12px travel.
- Durations: fast (120ms) for hovers, 200ms for toggles, 320ms for modals.
- Easing: --ease-standard.
- Disable transforms if prefers-reduced-motion: reduce.

---

## 8) Performance

- Use next/image for responsive images in Next apps; supply width/height to avoid CLS.
- Preload critical fonts via next/font; avoid FOUT/FOIT.
- Defer non-critical scripts; ship minimal JS in marketing pages.
- Optimize Docusaurus images with modern formats; leverage static asset pipeline.

---

## 9) Content & Tone

- Clear, concise, benefit-led headlines.
- First CTA above the fold. Social proof follows (logos, testimonials), then features.
- Use scannable structure: short paragraphs, bullets, meaningful subheads.
- Avoid figurative language when clarity is needed.

---

## 10) Information Architecture (per surface)

- apps/landing (marketing)
  - Hero: value prop + primary CTA
  - Problem/solution: brief copy + image/illustration
  - Social proof: logos, stats
  - Features: 3–4 blocks, two-column pattern
  - Integrations/How it works
  - Pricing preview + link to full pricing
  - Footer: sitemap, newsletter

- apps/organizer (product dashboard)
  - Sidebar nav or top tabs: Hunts, Clues, Participants, Settings
  - Primary actions surfaced contextually (Create Hunt, Add Clue)
  - Empty states with guidance and primary CTA
  - Inline validation and toasts for actions

- website (docs via Docusaurus)
  - Left nav: clear categories; search visible
  - Content width readable; code blocks themed and copyable
  - Next/Previous pagination links at bottom

---

## 11) Implementation Recipes

- Next.js (apps/landing, apps/organizer)
  1) Tokens
     - Create packages/ui/src/tokens.css and import in apps/*/app/globals.css
  2) Fonts
     - Use next/font to load Inter; set body { font-family: var(--font-sans) }
  3) Components
     - Create packages/ui/src/components/Button.tsx, Card.tsx, Header.tsx using tokens
  4) Accessibility
     - Use useId for aria attributes; apply :focus-visible outlines via tokens
  5) Motion
     - CSS transitions with --ease-standard; prefers-reduced-motion guards

- Docusaurus (website)
  1) Import tokens into website/src/css/custom.css
  2) Override theme variables to use our tokens
  3) Style navbar/footer to match tokens; ensure heading/body sizes map to --font-* scale

---

## 12) Checklists (PR Review)

- Visual
  - Uses tokens only (no hard-coded hex, px where tokens exist)
  - Spacing aligns to 8-based scale
  - Contrast meets WCAG AA

- Accessibility
  - Keyboard and screen reader tested
  - Labels and roles correct; focus visible everywhere

- Performance
  - Images optimized and sized
  - Fonts loaded via next/font; minimal JS

- Responsiveness
  - Breakpoints tested at 375, 768, 992, 1200

---

## 13) LLM Prompts (copy/paste)

- Component generation
  - "Create a React Button component that uses CSS variables for color, spacing, radius, and supports primary/secondary/link variants, with focus-visible styles and prefers-reduced-motion guards. Export a .tsx component and minimal CSS module using our token names."

- Page section
  - "Generate a hero section for a Next.js app with: value prop headline (<= 12 words), subhead (<= 24 words), primary CTA, logos row, responsive two-column layout on desktop and stacked on mobile, using tokens for spacing/typography."

---

## 14) Adoption Plan (sequenced tasks)

1) Create token files in packages/ui and import into apps and website.
2) Implement Button, Header, Card in packages/ui and replace local implementations in apps.
3) Convert landing hero + features sections to token-based CSS.
4) Ensure accessibility review across interactive components.
5) Apply tokens and typography to Docusaurus website theme.

---

## 15) Acceptance Criteria Examples

- A primary Button renders with --color-primary background, --color-primary-ink text, 44px min height, focus-visible outline, keyboard operable, and meets contrast AA.
- Header collapses to an accessible drawer on < 992px, with aria-controls/expanded and ESC to close.
- Landing hero passes Lighthouse 90+ for Performance, Accessibility, Best Practices, SEO on mobile.

---

References for inspiration: Typeform marketing (clean, high-contrast, conversion-first), accessible motion patterns, and mobile-first responsiveness.
