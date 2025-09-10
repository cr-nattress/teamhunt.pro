# User Story: Landing Page CTA — Create New Hunt

## Overview
- ID: US-0101-landing-cta
- Epic: [EP-0004-new-org-first-run](../../README.md)
- Owner: Product Engineering
- Priority: High
- Status: Draft
- Story Points: 3
- Created: 2025-09-10
- Last Updated: 2025-09-10

## Story
As a prospective organizer on mobile, I want a clear primary CTA on the landing page to create a new hunt so that I can immediately start the organization setup flow.

## Context
This connects `apps/landing/` to the organizer setup flow via `/org/new` with analytics tracking and a11y-first behavior.

## Acceptance Criteria
### Functional
- [ ] CTA labeled "Create New Hunt" is visible above the fold on 390px width.
- [ ] Clicking CTA routes to `/org/new` using Next.js router.
- [ ] Focus moves to the org form heading after navigation.
- [ ] Analytics event `cta_create_hunt_click` fires with `{ source: "landing" }`.
- [ ] `landing_view` fires on mount.

### Non-Functional
- [ ] Accessibility: CTA has accessible name; focus outline visible; target size ≥ 44x44.
- [ ] Performance: No CLS > 0.1 during transition.
- [ ] Observability: Errors are logged via error hook if routing fails.

## Definition of Done
- Code complete with tests (unit + RTL + basic e2e hook).
- Documentation updated in `docs/flows/new-org.md`.

## Dependencies
- Design tokens in `packages/ui/`.
- Router availability in `apps/landing/` and `apps/organizer/`.

## Design & Research
- Refer to `knowledge/ui-ux-playbook.md`.

## Tasks Breakdown
- [ ] [TASK-ROUTE-LANDING](./tasks/TASK-ROUTE-LANDING.md) — Ensure `/` renders Landing in mobile-first layout; smoke test.
- [ ] [TASK-CTA-CREATE-HUNT](./tasks/TASK-CTA-CREATE-HUNT.md) — Primary CTA routes to `/org/new`; track click.
- [ ] [TASK-LANDING-ANALYTICS](./tasks/TASK-LANDING-ANALYTICS.md) — Fire `landing_view`; unit test and schema.

## Testing Strategy
- Happy Path: Landing loads, CTA visible, click routes to `/org/new`, focus moves.
- Edge Cases: Slow network; router error; SSR vs CSR.
- Error Handling: Log routing errors; do not break page.

## Risks & Assumptions
- Risk: Design drift from tokens — Mitigation: use `packages/ui` components.

## Code Assistant Prompt
You are implementing US-0101-landing-cta. Create the CTA and tracking.

Create/modify:
- apps/landing/app/page.tsx (ensure CTA above the fold)
- apps/landing/app/_components/CreateHuntCTA.tsx
- packages/shared/src/analytics/events.ts (ensure event types)

Requirements:
- CTA accessible name "Create New Hunt"
- onClick → route to `/org/new` and fire `cta_create_hunt_click` with `{ source: 'landing' }`
- Fire `landing_view` on mount
- Focus moves to org form heading on navigation
- Tests: RTL for CTA presence and click; unit test for analytics calls
- Docs: update `docs/flows/new-org.md` CTA section
