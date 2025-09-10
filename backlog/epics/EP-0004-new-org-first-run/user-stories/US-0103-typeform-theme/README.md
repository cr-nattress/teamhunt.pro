# User Story: Typeform-Style Theming & Navigation

## Overview
- ID: US-0103-typeform-theme
- Epic: [EP-0004-new-org-first-run](../../README.md)
- Owner: Product Engineering
- Priority: High
- Status: Draft
- Story Points: 5
- Created: 2025-09-10
- Last Updated: 2025-09-10

## Story
As a user, I want the organization setup to feel like a polished Typeform-style flow so that it’s easy, delightful, and accessible on mobile.

## Context
Focus on design tokens, progress affordances, motion, and reduced-motion compliance. Ensure dark-mode readiness.

## Acceptance Criteria
### Functional
- [ ] Step indicator visible and announced on step change.
- [ ] Consistent tokens (colors, spacing, typography) across the flow.
- [ ] Smooth micro-transitions between steps with sensible durations/easing.

### Non-Functional
- [ ] Accessibility: supports `prefers-reduced-motion`; step changes are announced; focus order predictable.
- [ ] Performance: animation frames don’t drop on mid-tier mobile.
- [ ] Design Consistency: uses `packages/ui` tokens/components.

## Definition of Done
- Tokens verified/extended; docs updated.
- Stepper component added and accessible.
- Motion added with reduced-motion fallback; basic tests.

## Dependencies
- `packages/ui` tokens.

## Tasks Breakdown
- [ ] [TASK-TOKENS-VERIFY](./tasks/TASK-TOKENS-VERIFY.md)
- [ ] [TASK-STEPPER](./tasks/TASK-STEPPER.md)
- [ ] [TASK-MOTION](./tasks/TASK-MOTION.md)

## Testing Strategy
- Snapshot/visual tests for theme.
- Unit tests for stepper announcements and reduced-motion behavior.

## Risks & Assumptions
- Risk: Token gaps — Mitigation: minimally extend with docs.

## Code Assistant Prompt
You are implementing US-0103-typeform-theme.

Create/modify:
- packages/ui/src/styles/tokens.css
- packages/ui/src/components/Stepper.tsx
- packages/ui/src/styles/motion.css

Requirements:
- Ensure token coverage for spacing, color, typography used by OrgForm
- Accessible stepper with aria-live polite announcement of step labels
- Motion: 150–250ms ease-out transitions; respect prefers-reduced-motion
- Tests: basic unit tests for Stepper announcements and reduced-motion class behavior
- Docs: update `docs/flows/new-org.md` theming section
