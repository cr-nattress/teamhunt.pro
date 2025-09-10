# Task: Validation — Inline errors and a11y bindings

## Goal
Implement inline validation errors and proper aria bindings.

## Acceptance Criteria
- [ ] Errors rendered inline with ids bound via `aria-describedby`.
- [ ] First error focused on submit failure.

## Implementation Notes
- Files:
  - `packages/ui/components/forms/OrgForm.tsx`
  - `apps/organizer/__tests__/org.new.errors.test.tsx`

## Test Plan
- RTL for inline error rendering and focus move to first error.

## Code Assistant Prompt
You are implementing TASK-VALIDATION-ERRORS for US-0105-errors.

Create/modify:
- packages/ui/components/forms/OrgForm.tsx
- apps/organizer/__tests__/org.new.errors.test.tsx

Requirements:
- Bind errors via aria-describedby and set aria-invalid
- Focus management for first error
- Tests to assert
