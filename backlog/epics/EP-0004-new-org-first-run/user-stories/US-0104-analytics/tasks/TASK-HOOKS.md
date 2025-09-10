# Task: Hooks — Implement analytics hooks with unit tests

## Goal
Implement `useAnalytics` hook with a pluggable provider and no-op defaults.

## Acceptance Criteria
- [ ] `useAnalytics().track(name, payload)` available.
- [ ] No-op in dev/test; provider interface documented.
- [ ] Unit tests validate call-through and no-op behavior.

## Implementation Notes
- Files:
  - `packages/shared/src/analytics/hooks.ts`
  - `packages/shared/src/analytics/__tests__/hooks.test.ts`

## Test Plan
- Unit tests cover provider injection and default no-op.

## Code Assistant Prompt
You are implementing TASK-HOOKS for US-0104-analytics.

Create/modify:
- packages/shared/src/analytics/hooks.ts
- packages/shared/src/analytics/__tests__/hooks.test.ts

Requirements:
- Implement context/provider pattern
- Default provider logs to console in dev, no-op in test
- Tests for both behaviors
