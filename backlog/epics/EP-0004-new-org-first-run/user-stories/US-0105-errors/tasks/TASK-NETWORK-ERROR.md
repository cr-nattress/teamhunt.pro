# Task: Network — Error UX and retry

## Goal
Handle 500/server errors with retry and non-blocking UI.

## Acceptance Criteria
- [ ] 500 error displays inline toast or message with retry button.
- [ ] Retry prevents duplicate submissions and follows idempotency.
- [ ] Analytics `org_submit_error` includes errorCode `server_error`.

## Implementation Notes
- Files:
  - `packages/ui/components/forms/OrgForm.tsx`
  - `apps/organizer/__tests__/org.new.network.test.tsx`

## Test Plan
- RTL tests simulate 500 then retry to success.

## Code Assistant Prompt
You are implementing TASK-NETWORK-ERROR for US-0105-errors.

Create/modify:
- packages/ui/components/forms/OrgForm.tsx
- apps/organizer/__tests__/org.new.network.test.tsx

Requirements:
- Show retry UI on 500
- Prevent double submits
- Emit analytics with errorCode
