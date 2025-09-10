# User Story: E2E Happy Path + Critical Errors (Mobile)

## Overview
- ID: US-0106-e2e
- Epic: [EP-0004-new-org-first-run](../../README.md)
- Owner: QA Engineering
- Priority: High
- Status: Draft
- Story Points: 3
- Created: 2025-09-10
- Last Updated: 2025-09-10

## Story
As the team, we need automated E2E tests on a mobile viewport to ensure the first-run flow works end-to-end and handles critical error paths.

## Context
Use Playwright with an iPhone 14/15 logical size. Cover Landing → CTA → Org form → Submit → Success and simulated 400/500 errors.

## Acceptance Criteria
### Functional
- [ ] Playwright test for happy path passes on CI.
- [ ] Playwright test for 400 (validation) and 500 (server) errors asserts messaging and retry behavior.
- [ ] Mobile viewport emulation used.

### Non-Functional
- [ ] Tests are stable and run under 60s total.
- [ ] Screenshots/video artifacts saved on failure.

## Definition of Done
- Tests added under `tests/e2e-ui/` with clear selectors and a11y-aware expectations.
- CI picks up and runs tests.

## Dependencies
- Routes and forms from other stories.

## Tasks Breakdown
- [ ] [TASK-E2E-HAPPY](./tasks/TASK-E2E-HAPPY.md)
- [ ] [TASK-E2E-ERRORS](./tasks/TASK-E2E-ERRORS.md)

## Testing Strategy
- Use data-testids or accessible roles/names to select elements.

## Risks & Assumptions
- Risk: Flaky network — Mitigation: mock API in e2e or use test server.

## Code Assistant Prompt
You are implementing US-0106-e2e.

Create/modify:
- tests/e2e-ui/src/new-org.happy.spec.ts
- tests/e2e-ui/src/new-org.errors.spec.ts

Requirements:
- Emulate mobile viewport (iPhone 14 logical size)
- Happy path: load landing, click CTA, fill form, submit, assert success
- Errors: mock 400 duplicate name and 500 server error; assert error messages and retry
- Save trace on failure
- Ensure GitHub Action or CI job picks up tests
