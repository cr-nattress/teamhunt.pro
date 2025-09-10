# User Story: Error States & Empty States

## Overview
- ID: US-0105-errors
- Epic: [EP-0004-new-org-first-run](../../README.md)
- Owner: Product Engineering
- Priority: High
- Status: Draft
- Story Points: 3
- Created: 2025-09-10
- Last Updated: 2025-09-10

## Story
As a user, I need clear and accessible error states during organization setup so that I can correct issues and successfully complete the flow.

## Context
Covers validation errors, duplicate org name, and network/server errors with retry patterns and non-blocking UI.

## Acceptance Criteria
### Functional
- [ ] Inline validation errors shown with `aria-describedby` bound to error text.
- [ ] Duplicate organization name shows a specific message and suggestion to try another name.
- [ ] Network/server errors show inline or toast with retry.
- [ ] Analytics `org_submit_error` fires with an `errorCode` and `field` if applicable.

### Non-Functional
- [ ] Accessibility: Screen readers announce errors; focus moves to first error.
- [ ] Reliability: Retry does not duplicate submissions; idempotent server behavior assumed.

## Definition of Done
- Error views implemented; RTL tests; e2e coverage for 400/500.
- Docs updated in `docs/flows/new-org.md`.

## Dependencies
- Analytics hooks; data layer error codes.

## Tasks Breakdown
- [ ] [TASK-VALIDATION-ERRORS](./tasks/TASK-VALIDATION-ERRORS.md)
- [ ] [TASK-NETWORK-ERROR](./tasks/TASK-NETWORK-ERROR.md)

## Testing Strategy
- Unit/RTL for inline errors and focus management.
- E2E for 400/500 scenarios with retry.

## Risks & Assumptions
- Risk: Unclear server error codes — Mitigation: map codes to user-friendly messages and document.

## Code Assistant Prompt
You are implementing US-0105-errors.

Create/modify:
- packages/ui/components/forms/OrgForm.tsx
- packages/shared/src/errors/index.ts

Requirements:
- Inline validation errors with `aria-describedby`
- Duplicate org name error path with specific copy
- Network/server error handling with retry
- Analytics: `org_submit_error` with errorCode
- Tests: RTL for inline/focus and error mapping
- Docs: update `docs/flows/new-org.md` error section
