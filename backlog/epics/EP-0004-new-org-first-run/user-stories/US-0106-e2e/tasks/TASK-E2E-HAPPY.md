# Task: E2E — Happy path

## Goal
Automate happy path on mobile viewport.

## Acceptance Criteria
- [ ] Playwright test covers Landing → CTA → Org form → Submit → Success.
- [ ] Runs in CI within 60s and is stable.

## Implementation Notes
- Files:
  - `tests/e2e-ui/src/new-org.happy.spec.ts`
  - `tests/e2e-ui/playwright.config.ts` (ensure mobile viewport)

## Test Plan
- Use accessible roles/names for selectors; store traces on failure.

## Code Assistant Prompt
You are implementing TASK-E2E-HAPPY for US-0106-e2e.

Create/modify:
- tests/e2e-ui/src/new-org.happy.spec.ts

Requirements:
- Emulate iPhone 14 viewport
- Navigate, click CTA, fill form, submit, assert success content
- Save trace on failure
