# User Story: New Organization Setup Form (Typeform-style)

## Overview
- ID: US-0102-org-form
- Epic: [EP-0004-new-org-first-run](../../README.md)
- Owner: Product Engineering
- Priority: High
- Status: Draft
- Story Points: 8
- Created: 2025-09-10
- Last Updated: 2025-09-10

## Story
As a new organizer, I want a mobile-first, stepwise form to create my organization so that I can quickly complete setup with clear guidance and minimal errors.

## Context
Fields: `name`, `adminEmail`, `adminFirstName`, `adminLastName`. Client+server validation. Mobile keyboard optimization. Idle/loading/success/error states. Optimistic UI. Inline errors.

## Acceptance Criteria
### Functional
- [ ] Form path `/org/new` exists and renders Typeform-style stepper with four steps.
- [ ] Validation rules: name 2–80 chars; email valid; first/last non-empty.
- [ ] On submit: optimistic UI; disables submit; server validation; shows inline errors.
- [ ] Success redirects/focuses to success state and fires `org_submit_success`.
- [ ] `org_form_view` fires on mount; `org_submit_attempt`/`org_submit_error` on submit outcomes.

### Non-Functional
- [ ] Accessibility: labels, `aria-invalid`, `aria-describedby`, step change announced to screen readers.
- [ ] Performance: input latency < 50ms on mid-tier mobile; TTI < 2.5s.
- [ ] Observability: error logging hook captures server 4xx/5xx.

## Definition of Done
- Components implemented in `packages/ui` where reusable.
- Unit/RTL tests for validation, states, and submit flows.
- Docs updated in `docs/flows/new-org.md`.

## Dependencies
- Analytics hooks/util (or stub).
- Data layer abstraction for Organization (or stub).

## Tasks Breakdown
- [ ] [TASK-FORM-SCAFFOLD](./tasks/TASK-FORM-SCAFFOLD.md)
- [ ] [TASK-FORM-FIELDS](./tasks/TASK-FORM-FIELDS.md)
- [ ] [TASK-FORM-STATE](./tasks/TASK-FORM-STATE.md)
- [ ] [TASK-PERSIST-ORG](./tasks/TASK-PERSIST-ORG.md)
- [ ] [TASK-FORM-TESTS](./tasks/TASK-FORM-TESTS.md)

## Testing Strategy
- Happy Path: Complete all steps with valid inputs; submit; success.
- Edge Cases: Duplicate org name; empty fields; invalid email; slow network.
- Error Handling: Server 400 shows inline messages; 500 shows retry/inline toast.

## Risks & Assumptions
- Risk: Server contract changes — Mitigation: centralize types in `packages/shared`.

## Code Assistant Prompt
You are implementing US-0102-org-form.

Create/modify:
- apps/organizer/app/org/new/page.tsx
- packages/ui/components/forms/OrgForm.tsx
- packages/shared/src/types/organization.ts
- packages/shared/src/analytics/events.ts

Requirements:
- Stepwise Typeform-style UI with progress affordance
- Fields: name, adminEmail, adminFirstName, adminLastName
- Client validation: required; email format; name length 2–80
- A11y: labels, aria-invalid, aria-describedby; announce step changes
- States: idle/loading/success/error; optimistic submit
- Analytics: org_form_view, org_submit_attempt/success/error
- Tests: RTL for validation + success + server error
- Docs: update `docs/flows/new-org.md`
