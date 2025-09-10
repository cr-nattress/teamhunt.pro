# Task: Motion — Micro-transitions with reduced-motion support

## Goal
Add subtle transitions (duration, easing) and handle `prefers-reduced-motion`.

## Acceptance Criteria
- [ ] Transitions 150–250ms ease-out for step transitions.
- [ ] `prefers-reduced-motion` disables non-essential motion.

## Implementation Notes
- Files:
  - `packages/ui/src/styles/motion.css`
  - `packages/ui/src/components/__tests__/motion.test.ts`

## Test Plan
- Unit: reduced-motion class toggles; minimal snapshot.

## Code Assistant Prompt
You are implementing TASK-MOTION for US-0103-typeform-theme.

Create/modify:
- packages/ui/src/styles/motion.css
- packages/ui/src/components/__tests__/motion.test.ts

Requirements:
- Define CSS classes for transitions respecting `prefers-reduced-motion`
- Basic unit test for class application
