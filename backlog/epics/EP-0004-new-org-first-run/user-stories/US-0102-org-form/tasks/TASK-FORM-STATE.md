# Task: State — idle/loading/success/error

## Goal
Implement form states; disable submit when invalid/loading; success screen.

## Acceptance Criteria
- [ ] Submit disabled when invalid or loading.
- [ ] Loading spinner or text on submit.
- [ ] Success state renders confirmation and focus moves appropriately.
- [ ] Error state renders inline and is announced.

## Implementation Notes
- Files:
  - `packages/ui/components/forms/OrgForm.tsx`
- Use React state machine or simple enum; ensure focus management.

## Test Plan
- RTL: asserts disabled states, loading indicator, success focus.

## Code Assistant Prompt
You are implementing TASK-FORM-STATE for US-0102-org-form.

Create/modify:
- packages/ui/components/forms/OrgForm.tsx

Requirements:
- Implement state enum: idle/loading/success/error
- Disable submit when invalid/loading
- On success, render success view and move focus to success heading
- Tests with RTL for states
