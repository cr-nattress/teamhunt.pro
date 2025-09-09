# End-to-End Tests

This directory contains E2E tests for the TeamHunt monorepo using Playwright.

## Test Suites

### E2E UI Tests (`tests/e2e-ui`)
Tests the user interface and user flows across the Next.js applications.

**Test coverage:**
- Landing page to organizer navigation flow
- Organizer dashboard functionality  
- Cross-app integration tests

**Run commands:**
```bash
# From repository root
pnpm --filter @teamhunt/e2e-ui test          # Run headless
pnpm --filter @teamhunt/e2e-ui test:headed   # Run with browser UI
pnpm --filter @teamhunt/e2e-ui codegen       # Generate new tests
```

### E2E API Tests (`tests/e2e-api`)
Tests the API endpoints and service integration.

**Test coverage:**
- Health checks for all services (api, email, media)
- Core API functionality (organizations, events)
- Email service functionality
- Media service functionality

**Run commands:**
```bash
# From repository root  
pnpm --filter @teamhunt/e2e-api test         # Run API tests
```

## Environment Variables

Tests use the following environment variables (defined in `.env`):

- `APP_BASE_URL` - Organizer app URL (default: http://localhost:3001)
- `LANDING_BASE_URL` - Landing page URL (default: http://localhost:3000)  
- `API_BASE_URL` - API service URL (default: http://localhost:8888)
- `EMAIL_BASE_URL` - Email service URL (default: http://localhost:8889)
- `MEDIA_BASE_URL` - Media service URL (default: http://localhost:8890)

## Prerequisites

For UI tests to work properly, you need:
1. Landing app running on port 3000: `pnpm dev:landing`
2. Organizer app running on port 3001: `pnpm dev:organizer`

For API tests to work properly, you need:
1. API service running on port 8888: `pnpm dev:api`
2. Email service running on port 8889: `pnpm dev:email`  
3. Media service running on port 8890: `pnpm dev:media`

## CI/CD Integration

Tests are configured to run in CI environments with:
- Increased retry attempts (2 retries in CI)
- Single worker in CI for stability
- Automatic server startup disabled in CI (assumes services are already running)

## Reports

Test results are generated as HTML reports:
- UI tests: `tests/e2e-ui/playwright-report/`
- API tests: `tests/e2e-api/playwright-report/`

View reports with:
```bash
pnpm --filter @teamhunt/e2e-ui show-report
pnpm --filter @teamhunt/e2e-api show-report
```