# Task: Fields — Org form fields and validation

## Goal
Add fields (name, adminEmail, adminFirstName, adminLastName) with client-side validation and mobile keyboard optimization.

## Acceptance Criteria
- [ ] All four fields present with labels and placeholders where appropriate.
- [ ] Validation: name 2–80 chars; email format; first/last non-empty.
- [ ] Email input uses `inputMode="email"` and `autoComplete="email"`.
- [ ] A11y: labels, `aria-invalid` on error, `aria-describedby` linked.

## Implementation Notes
- Files:
  - `packages/ui/components/forms/OrgForm.tsx`
  - `packages/shared/src/types/organization.ts`
- Use internal validators or zod/yup if present; otherwise a light util in shared.

## Test Plan
- RTL: invalid states show errors; valid enables submit.

## Code Assistant Prompt
You are implementing TASK-FORM-FIELDS for US-0102-org-form.

Create/modify:
- packages/ui/components/forms/OrgForm.tsx
- packages/shared/src/types/organization.ts

Requirements:
- Render four fields with validation and accessible error text
- Email input uses `inputMode="email"`, `autoComplete` hints
- Export `Organization` type
- Add minimal validation helpers if no lib exists
