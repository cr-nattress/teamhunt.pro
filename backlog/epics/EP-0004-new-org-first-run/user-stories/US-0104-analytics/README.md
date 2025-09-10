# User Story: Analytics & Telemetry

## Overview
- ID: US-0104-analytics
- Epic: [EP-0004-new-org-first-run](../../README.md)
- Owner: Product Engineering
- Priority: High
- Status: Draft
- Story Points: 3
- Created: 2025-09-10
- Last Updated: 2025-09-10

## Story
As a product team member, I want core analytics events emitted during the first-run flow so that we can measure conversion, friction, and sources of drop-off.

## Context
Events: `landing_view`, `cta_create_hunt_click`, `org_form_view`, `org_submit_attempt`, `org_submit_success`, `org_submit_error` (+ properties including source, device, errorCode).

## Acceptance Criteria
### Functional
- [ ] Event payload types defined in shared package.
- [ ] Analytics hook(s) available and used in stories that require events.
- [ ] Events are no-op safe in dev/test to avoid noise.

### Non-Functional
- [ ] Privacy: No PII beyond event metadata; no raw email logging.
- [ ] Performance: Analytics calls are non-blocking.
- [ ] Observability: Console/logging wrapper available in dev.

## Definition of Done
- Event schema documented in `docs/analytics/events.md`.
- Unit tests for payload creators and hooks.

## Dependencies
- None blocking; can stub provider integration.

## Tasks Breakdown
- [ ] [TASK-SCHEMA](./tasks/TASK-SCHEMA.md)
- [ ] [TASK-HOOKS](./tasks/TASK-HOOKS.md)

## Testing Strategy
- Unit tests for payload validation and required fields.
- Integration tests to ensure events fire on navigation/submit.

## Risks & Assumptions
- Risk: Provider changes — Mitigation: keep provider behind a small interface.

## Code Assistant Prompt
You are implementing US-0104-analytics.

Create/modify:
- packages/shared/src/analytics/events.ts
- packages/shared/src/analytics/hooks.ts
- docs/analytics/events.md

Requirements:
- Define types and payload creators for listed events
- Implement `useAnalytics()` with `track(eventName, payload)`
- No-op provider in dev/test; pluggable real provider later
- Unit tests for payload shape and required fields
- Update docs
