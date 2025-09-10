# Task: CTA — Create New Hunt button routes to /org/new with tracking

## Goal
Add a primary CTA with accessible name and route to `/org/new`, tracking clicks.

## Acceptance Criteria
- [ ] CTA with accessible name "Create New Hunt" is rendered above the fold.
- [ ] Clicking CTA routes to `/org/new`.
- [ ] Event `cta_create_hunt_click` fires with `{ source: 'landing' }`.
- [ ] Focus moves to the org form heading on navigation.

## Implementation Notes
- Files:
  - `apps/landing/app/_components/CreateHuntCTA.tsx`
  - `apps/landing/app/page.tsx` (import and place CTA)
  - `packages/shared/src/analytics/hooks.ts` (useAnalytics)
- Use Next.js App Router `useRouter()` for navigation.

## Test Plan
- RTL: CTA is visible and clickable; navigation mocked; analytics tracked.

## Code Assistant Prompt
You are implementing TASK-CTA-CREATE-HUNT for US-0101-landing-cta.

Create/modify:
- apps/landing/app/_components/CreateHuntCTA.tsx
- apps/landing/app/page.tsx

Requirements:
- Render a `<button>` or `<a>` with accessible name "Create New Hunt"
- onClick: `track('cta_create_hunt_click', { source: 'landing' })` then route to `/org/new`
- After navigation, focus the org form heading via `document.getElementById('org-form-heading')?.focus()`
- RTL tests mocking `useRouter` and `useAnalytics`
