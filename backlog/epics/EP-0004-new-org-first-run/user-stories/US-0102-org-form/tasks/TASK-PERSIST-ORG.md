# Task: Persist — Hook to data layer with optimistic UI

## Goal
Persist the new Organization via data abstraction with optimistic UI and server validation.

## Acceptance Criteria
- [ ] Submit triggers optimistic UI and pending state.
- [ ] On 200, confirm success and emit `org_submit_success`.
- [ ] On 400, map validation errors to fields; emit `org_submit_error` with code.
- [ ] On 500, show retry path; emit `org_submit_error` with `server_error`.

## Implementation Notes
- Files:
  - `packages/shared/src/api/organizations.ts` (createOrganization)
  - `apps/organizer/app/org/new/page.tsx`
  - `packages/ui/components/forms/OrgForm.tsx`
- If no API exists, create a stub that resolves/rejects with typed errors.

## Test Plan
- Unit: createOrganization happy and error mapping.
- RTL: submit hooks and error mapping displayed.

## Code Assistant Prompt
You are implementing TASK-PERSIST-ORG for US-0102-org-form.

Create/modify:
- packages/shared/src/api/organizations.ts
- packages/ui/components/forms/OrgForm.tsx

Requirements:
- Define `createOrganization(input)` returning `{ id, ... }`
- Error mapping for duplicate name and validation errors
- Optimistic UI while pending
- Analytics fires on attempt/success/error
