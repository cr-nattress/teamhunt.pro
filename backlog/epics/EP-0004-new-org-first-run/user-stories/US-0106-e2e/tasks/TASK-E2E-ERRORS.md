# Task: E2E — Critical errors

## Goal
Automate critical error scenarios on mobile viewport.

## Acceptance Criteria
- [ ] Playwright test mocks 400 duplicate name; asserts inline error.
- [ ] Test mocks 500 server error; asserts retry works.

## Implementation Notes
- Files:
  - `tests/e2e-ui/src/new-org.errors.spec.ts`

## Test Plan
- Use route interception/mocking in Playwright.

## Code Assistant Prompt
You are implementing TASK-E2E-ERRORS for US-0106-e2e.

Create/modify:
- tests/e2e-ui/src/new-org.errors.spec.ts

Requirements:
- Mock server 400 and 500
- Assert error messaging and retry path
- Mobile viewport
