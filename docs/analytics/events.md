# Analytics Events — New Org First-Run

This document defines event names and payloads for the New Organization first-run flow.

## Event Catalog

### landing_view
- When: Landing page mounts on client
- Payload:
```ts
interface LandingViewEvent { 
  source: 'landing';
  ts: string; // ISO timestamp
}
```

### cta_create_hunt_click
- When: User clicks the primary CTA on landing
- Payload:
```ts
interface CtaCreateHuntClickEvent {
  source: 'landing';
  ts: string; // ISO timestamp
}
```

### org_form_view
- When: `/org/new` mounts
- Payload:
```ts
interface OrgFormViewEvent {
  ts: string; // ISO timestamp
}
```

### org_submit_attempt
- When: User submits the org form
- Payload:
```ts
interface OrgSubmitAttemptEvent {
  ts: string; // ISO timestamp
}
```

### org_submit_success
- When: Server accepts org creation
- Payload:
```ts
interface OrgSubmitSuccessEvent {
  orgId: string;
  ts: string; // ISO timestamp
}
```

### org_submit_error
- When: Submit fails
- Payload:
```ts
type OrgErrorCode = 'duplicate_name' | 'validation_error' | 'server_error';
interface OrgSubmitErrorEvent {
  errorCode: OrgErrorCode;
  field?: 'name' | 'adminEmail' | 'adminFirstName' | 'adminLastName';
  ts: string; // ISO timestamp
}
```

## Implementation Notes
- Types should live in `packages/shared/src/analytics/events.ts`.
- Hooks in `packages/shared/src/analytics/hooks.ts`. Default provider must be no-op in test.
- Do not log PII (no raw email addresses).

## Testing
- Unit: validate payload creators enforce required fields.
- Integration: assert events fire in stories US-0101 and US-0102.
