# Task: Tests — Org form RTL coverage

## Goal
Add RTL tests covering validation, submit success, and server error.

## Acceptance Criteria
- [ ] Invalid inputs show inline errors and prevent submit.
- [ ] Valid inputs submit and show success.
- [ ] Server 400/500 are shown appropriately with retry for 500.

## Implementation Notes
- Files:
  - `apps/organizer/__tests__/org.new.form.test.tsx`
- Mock `createOrganization` and analytics hooks.

## Test Plan
- RTL tests for each scenario; ensure focus moves to error/success headings.

## Code Assistant Prompt
You are implementing TASK-FORM-TESTS for US-0102-org-form.

Create/modify:
- apps/organizer/__tests__/org.new.form.test.tsx

Requirements:
- Cover validation errors, success, server 400/500
- Mock analytics and API
- Assert focus management and aria attributes
