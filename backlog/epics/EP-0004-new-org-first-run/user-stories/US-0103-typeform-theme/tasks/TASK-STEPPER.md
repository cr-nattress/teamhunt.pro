# Task: Stepper — Accessible progress indicator

## Goal
Add a minimal progress indicator that announces step changes for screen readers.

## Acceptance Criteria
- [ ] Stepper renders current step/total and label.
- [ ] Announces step changes via aria-live polite.
- [ ] Keyboard focus order remains logical.

## Implementation Notes
- Files:
  - `packages/ui/src/components/Stepper.tsx`
  - `packages/ui/src/components/__tests__/Stepper.test.tsx`

## Test Plan
- Unit tests for announcement and rendering.

## Code Assistant Prompt
You are implementing TASK-STEPPER for US-0103-typeform-theme.

Create/modify:
- packages/ui/src/components/Stepper.tsx
- packages/ui/src/components/__tests__/Stepper.test.tsx

Requirements:
- Render step label and counts
- aria-live polite region to announce changes
- Tests to verify announcements
