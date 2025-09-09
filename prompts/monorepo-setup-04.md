Prompt 4 — E2E test workspaces (Playwright for UI and API)

Goal: Add Playwright configs targeting local & prod via env vars.

Create two workspaces:

## tests/e2e-ui
- package.json (name @teamhunt/e2e-ui) with scripts: test, test:headed, codegen
- playwright.config.ts:
  - loads dotenv
  - baseURL from APP_BASE_URL default http://localhost:3001
  - projects: Desktop Chrome + Desktop Firefox
  - reporter: list + html
  - trace: on-first-retry
- src/smoke.spec.ts:
  - visit LANDING_BASE_URL (default http://localhost:3000)
  - click "Open the Organizer" link
  - assert organizer heading visible

## tests/e2e-api
- package.json (name @teamhunt/e2e-api) with script test
- playwright.config.ts with baseURL from API_BASE_URL default http://localhost:8888
- src/core.spec.ts:
  - GET /v1/healthz on api/email/media (EMAIL_BASE_URL default :8889, MEDIA_BASE_URL default :8890)
  - POST /v1/events to api (201) and validate id or echo (as implemented)

Document required env:
- APP_BASE_URL, LANDING_BASE_URL, API_BASE_URL, EMAIL_BASE_URL, MEDIA_BASE_URL
