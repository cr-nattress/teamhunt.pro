Quick how-to (once all prompts are applied)

cd teamhunt-monorepo && pnpm i

Dev locally:

pnpm dev:landing (Next on :3000)

pnpm dev:organizer (Next on :3001)

pnpm dev:api (Netlify dev on :8888), similarly email (:8889), media (:8890)

E2E locally:

pnpm -F @teamhunt/e2e-ui test

pnpm -F @teamhunt/e2e-api test

Docs & Storybook:

pnpm docs:dev (Docusaurus)

pnpm sb:dev (Storybook)

TypeDoc:

pnpm api:build → writes to docs/reference/

Short version: run prompts 1→10, install, and you’ve got a production-grade scaffold with Next.js (App Router), Express APIs on Netlify Functions, Playwright E2E, Vitest unit tests, Docusaurus + Storybook + TypeDoc docs, ADRs, and CI guards.