# ADR 0002: New Organization First-Run Flow — Routing, Validation, and Form Library

## Status
Proposed — 2025-09-10

## Context
We are adding a mobile-first, Typeform-style organization creation flow. Decisions are needed for:
- Routing (Next.js App Router conventions)
- Validation approach (client + server)
- Form state management and accessibility
- Analytics hooks design

The repository uses Next.js (App Router), TypeScript, and a shared `packages/ui/` library. There is no mandated validation/form lib visible; we can use light-weight helpers or `zod` if present.

## Decisions
1. Routing: Use Next.js App Router paths under `apps/organizer/app/org/new/page.tsx`.
2. Validation: Use a light-weight custom validator (or `zod` if already in repo). Client validates length/format; server re-validates and returns typed error codes.
3. Form State: Local React state + simple state enum (idle/loading/success/error). Stepper and focus management implemented for a11y.
4. Analytics: Implement `useAnalytics()` in `packages/shared/src/analytics/hooks.ts` with pluggable provider; default no-op in test, console in dev.
5. Design Tokens: Verify/extend tokens in `packages/ui/src/styles/tokens.css` and document any changes.
6. Motion: Provide small CSS utilities in `packages/ui/src/styles/motion.css` with `prefers-reduced-motion` support.

## Consequences
- Minimal dependencies; easy to maintain.
- Strong a11y: explicit focus management and ARIA bindings.
- Clear analytics interface for future provider integrations.

## Alternatives Considered
- Formik/React Hook Form — more overhead than needed for a 4-field flow.
- Third-party analytics SDK coupling — opted for interface pattern to avoid vendor lock-in.

## Links
- Epic: `backlog/epics/EP-0004-new-org-first-run/README.md`
- Flow Docs: `docs/flows/new-org.md`
- Events: `docs/analytics/events.md`
