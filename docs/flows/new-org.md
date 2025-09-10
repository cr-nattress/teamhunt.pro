# New Organization Flow — Mobile, Typeform-style

## Overview
A first-run experience enabling a new organizer to create an organization and start a hunt. Mobile-first and Typeform-style.

## Screens & States
- Landing (CTA visible above the fold)
- Org Form — Steps
  1) Organization Name
  2) Admin Email
  3) Admin First Name
  4) Admin Last Name
- Submit — Loading
- Success — Confirmation
- Error — Inline validation; network/server with retry

## Routes
- `/` (apps/landing/)
- `/org/new` (apps/organizer/)

## Components
- `packages/ui/components/forms/OrgForm.tsx`
- `packages/ui/src/components/Stepper.tsx`

## A11y Notes
- Focus moves to `#org-form-heading` on navigation
- Labels bound to inputs; `aria-invalid` when errors
- Error text bound with `aria-describedby`
- Stepper announces changes via aria-live polite
- Respect `prefers-reduced-motion` in transitions

## Analytics
- `landing_view` { source: 'landing', ts }
- `cta_create_hunt_click` { source: 'landing', ts }
- `org_form_view` { ts }
- `org_submit_attempt` { ts }
- `org_submit_success` { orgId, ts }
- `org_submit_error` { errorCode, field?, ts }

## Validation
- Org name: 2–80 chars; unique per account
- Email: valid format
- First/Last: non-empty

## Data Contract
```ts
export type Organization = {
  id: string;
  name: string;
  adminEmail: string;
  adminFirstName: string;
  adminLastName: string;
  createdAt: string;
  updatedAt: string;
}
```

## Open Questions
- Do we reserve org names globally or per account only? (MVP: per account)

## Links
- Epic: `backlog/epics/EP-0004-new-org-first-run/README.md`
- ADR: `docs/adr/0002-new-org-flow.md`
