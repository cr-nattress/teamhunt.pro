# Task: ROUTE — Landing renders mobile-first layout

## Goal
Ensure `/` renders the Landing page with a mobile-first layout and a basic smoke test.

## Acceptance Criteria
- [ ] Route `/` renders without errors (SSR/CSR) in `apps/landing/`.
- [ ] Viewport ≤ 390px shows layout without horizontal scroll.
- [ ] Basic smoke test renders main landmark and heading.

## Implementation Notes
- Files:
  - `apps/landing/app/page.tsx`
  - `apps/landing/__tests__/landing.smoke.test.tsx`
- Use existing design tokens and components from `packages/ui/`.
- Ensure `<main role="main">` with an h1 is present.

## Test Plan
- Unit/RTL smoke test checks render, main role, and heading visible.
- Lint and typecheck pass.

## Code Assistant Prompt
You are implementing TASK-ROUTE-LANDING for STORY-LANDING-CTA (US-0101-landing-cta).

Create/modify:
- apps/landing/app/page.tsx
- apps/landing/__tests__/landing.smoke.test.tsx

Requirements:
- Export a functional component with `<main role="main">` and h1
- Ensure mobile-first styles; no horizontal overflow at 390px
- Add RTL test that renders page and asserts role=main and heading
