Prompt 3 — Express APIs on Netlify Functions (api, email, media)

Goal: Express + serverless-http adapters, versioned routes, health checks, per-service netlify.toml.

In `services/`, create three services: api, email, media. For each:
- package.json (name @teamhunt/<svc>, private)
  deps: express, serverless-http, zod
  devDeps: @netlify/functions, esbuild, typescript
  scripts: dev ("netlify dev --port <unique>"), build (tsc), typecheck, lint, format
- tsconfig.json extends @teamhunt/config/tsconfig.base with outDir dist
- src/app.ts: express app with express.json(), GET /v1/healthz
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
- api: GET /v1/orgs → { data: [{ id:"org_demo", name:"Demo Org" }] }
- email: POST /v1/send → { status:"queued", to: body.to }
- media: POST /v1/uploads/sign → { uploadUrl:"https://example/upload/signed" }

Use TypeScript everywhere.
