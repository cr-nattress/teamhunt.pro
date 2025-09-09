Prompt 3 — Express APIs on Netlify Functions (api, email, media)

Goal: Express + serverless-http adapters, versioned routes, health checks, per-service netlify.toml.

In `services/`, create three services: api, email, media. For each:
- package.json (name @teamhunt/<svc>, private)
  deps: express, serverless-http, zod, @supabase/supabase-js
  devDeps: @netlify/functions, esbuild, typescript
  scripts: dev ("netlify dev --port <unique>"), build (tsc), typecheck, lint, format
- tsconfig.json extends @teamhunt/config/tsconfig.base with outDir dist
- src/app.ts: express app with express.json(), GET /v1/healthz, Supabase client setup
- src/lib/supabase.ts: Supabase client configuration using SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
- netlify/functions/http.ts: wraps app with serverless-http and exports handler
- netlify.toml:
  [build]
    command = "pnpm build"
    publish = "dist"
    functions = "netlify/functions"
  [functions]
    node_bundler = "esbuild"
    external_node_modules = ["express","serverless-http","zod"]
  [[redirects]]
    from = "/v1/*"
    to = "/.netlify/functions/http"
    status = 200

Add one representative route per service:
- api: GET /v1/orgs → { data: [{ id:"org_demo", name:"Demo Org" }] } (with Supabase query example)
- api: POST /v1/events → { id: "event_123", status: "created" } (insert into Supabase)
- email: POST /v1/send → { status:"queued", to: body.to }
- media: POST /v1/uploads/sign → { uploadUrl:"https://example/upload/signed" }

Include Supabase client setup in src/lib/supabase.ts:
```typescript
import { createClient } from '@supabase/supabase-js';
import { validateServerEnv } from '@teamhunt/shared';

const env = validateServerEnv();
export const supabase = createClient(
  env.SUPABASE_URL!,
  env.SUPABASE_SERVICE_ROLE_KEY!
);
```

Use TypeScript everywhere.
