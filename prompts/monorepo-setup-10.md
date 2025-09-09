Prompt 10 — Unit test scaffolding (Vitest) + API contract check

Goal: Quick unit test harness and OpenAPI placeholder to grow into.

Add Vitest configs:

## For services/api:
- package.json add: "test": "vitest --run"
- vitest.config.ts (ts esm config, test include "test/**/*.spec.ts")
- test/events.spec.ts: import app, test POST /v1/events and GET /v1/healthz using supertest or undici

## For apps/organizer:
- add vitest + @testing-library/react, jsdom environment
- basic component test for a trivial component

## OpenAPI placeholders
- services/api/openapi.yaml with /v1/events (GET/POST minimal), /v1/healthz
- Add root script "openapi:validate" that for now checks file existence (TODO for swagger-cli later)
