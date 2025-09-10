# Task: Scaffold — /org/new page and step container

## Goal
Create `/org/new` route and Typeform-style step container.

## Acceptance Criteria
- [ ] Next.js page at `/org/new` exists.
- [ ] Step container renders one field per step with Next/Back.
- [ ] `org_form_view` fires on mount.

## Implementation Notes
- Files:
  - `apps/organizer/app/org/new/page.tsx`
  - `packages/ui/components/forms/OrgForm.tsx`
- Use App Router conventions; export metadata as needed.

## Test Plan
- RTL: page renders and contains step container; analytics fired.

## Code Assistant Prompt
You are implementing TASK-FORM-SCAFFOLD for US-0102-org-form.

Create/modify:
- apps/organizer/app/org/new/page.tsx
- packages/ui/components/forms/OrgForm.tsx

Requirements:
- Step container with Next/Back; accepts children steps
- Fire `org_form_view` on mount
- Provide heading with id `org-form-heading` for focus
