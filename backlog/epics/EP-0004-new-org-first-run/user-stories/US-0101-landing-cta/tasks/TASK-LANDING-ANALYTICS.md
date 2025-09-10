# Task: Analytics — Landing view event

## Goal
Fire `landing_view` analytics event on landing page mount with a unit test and schema reference.

## Acceptance Criteria
- [ ] `landing_view` event fires once on first render.
- [ ] Payload includes `{ source: 'landing', ts }` where `ts` is ISO string.
- [ ] No event fired during SSR (only on client).

## Implementation Notes
- Files:
  - `apps/landing/app/page.tsx` (useEffect to fire event)
  - `packages/shared/src/analytics/events.ts` (ensure event type)
  - `apps/landing/__tests__/landing.analytics.test.tsx`
- Use `useAnalytics().track()`; ensure no-op in test env.

## Test Plan
- Unit test mocks analytics and asserts single fire on mount.

## Code Assistant Prompt
You are implementing TASK-LANDING-ANALYTICS for US-0101-landing-cta.

Create/modify:
- apps/landing/app/page.tsx
- apps/landing/__tests__/landing.analytics.test.tsx
- packages/shared/src/analytics/events.ts

Requirements:
- Fire `landing_view` with `{ source: 'landing', ts: new Date().toISOString() }` in useEffect
- Ensure guard for `typeof window !== 'undefined'`
- Unit test with RTL + jest mocks to verify one call
