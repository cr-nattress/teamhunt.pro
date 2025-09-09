Prompt 2 — Next.js apps (landing + organizer) with TS and Netlify config

Goal: Scaffold Next.js App Router apps with TypeScript, basic pages, and Netlify plugin config.

Within `teamhunt-monorepo`, scaffold two Next.js apps:

## apps/landing (teamhunt.pro)
- package.json (name @teamhunt/landing) with next 14.x, react 18.x, scripts dev/build/start/lint/typecheck/format
- tsconfig.json extends @teamhunt/config/tsconfig.base
- next.config.mjs: { reactStrictMode: true, output: "standalone" }
- app/page.tsx: simple homepage with link to https://app.teamhunt.pro
- netlify.toml:
  [build]
    command = "pnpm build"
    publish = ".next"
  [[plugins]]
    package = "@netlify/plugin-nextjs"

## apps/organizer (app.teamhunt.pro)
- same package setup (name @teamhunt/organizer)
- app/page.tsx: "Organizer Dashboard" heading
- netlify.toml identical

Ensure both compile with TypeScript strict. Add minimal *.d.ts only if required by Next types. Do not break `next dev`.
