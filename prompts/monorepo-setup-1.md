Prompt 1 — Initialize the monorepo (workspaces, structure, baseline configs)

Goal: Create teamhunt-monorepo with pnpm workspaces, shared config, empty apps/services, DX tooling, and repo hygiene.

You are a repository scaffolder. Create a new folder named `teamhunt-monorepo` and populate it with the following, preserving paths and file contents exactly.

## Package manager & workspaces
- Root uses pnpm workspaces. Create:
  - `package.json` with scripts and dev deps below
  - `pnpm-workspace.yaml` listing apps/*, services/*, packages/*, tests/*, website
  - `turbo.json` for caching
  - `.gitignore` (node_modules, .next, dist, build, .netlify, .vercel, .env*)

## Directory layout
teamhunt-monorepo/
  apps/            # Next.js apps (landing, organizer)
  services/        # Express APIs (api, email, media)
  packages/
    config/        # shared tsconfig/eslint/prettier
    shared/        # shared types + env
    ui/            # shared UI lib (for Storybook)
  tests/
    e2e-ui/        # Playwright (UI)
    e2e-api/       # Playwright (API)
  docs/            # MDX narrative docs + ADRs + TypeDoc output
    guides/
    reference/
    adr/
  website/         # Docusaurus app
  .storybook/      # Storybook config
  scripts/         # DX scripts (new component, etc.)
  backlog/         # epics, stories, tasks (with prompts)
  .github/
    workflows/
  .claude          # keep existing file at repo root (do not delete)

## Root package.json (merge-safe)
{
  "name": "teamhunt-monorepo",
  "private": true,
  "packageManager": "pnpm@9.0.0",
  "scripts": {
    "dev:landing": "pnpm --filter @teamhunt/landing dev",
    "dev:organizer": "pnpm --filter @teamhunt/organizer dev",
    "dev:api": "pnpm --filter @teamhunt/api dev",
    "dev:email": "pnpm --filter @teamhunt/email dev",
    "dev:media": "pnpm --filter @teamhunt/media dev",
    "build": "turbo build",
    "build:all": "pnpm -r build",
    "lint": "pnpm -r lint",
    "format": "pnpm -r format",
    "typecheck": "pnpm -r typecheck",
    "clean": "turbo clean && git clean -fdX",
    "docs:dev": "pnpm --filter @teamhunt/website start",
    "docs:build": "pnpm --filter @teamhunt/website build",
    "docs:serve": "pnpm --filter @teamhunt/website serve",
    "sb:dev": "storybook dev -p 6006",
    "sb:build": "storybook build",
    "api:build": "typedoc --options typedoc.json",
    "scripts:new:component": "node scripts/new-component.mjs",
    "test": "pnpm -r test"
  },
  "devDependencies": {
    "turbo": "^2.0.0",
    "typescript": "^5.6.2",
    "@storybook/addon-docs": "^8.2.6",
    "@storybook/nextjs": "^8.2.6",
    "@storybook/react": "^8.2.6",
    "@storybook/test": "^8.2.6",
    "react-docgen-typescript-plugin": "^2.2.0",
    "@docusaurus/core": "^3.5.2",
    "@docusaurus/preset-classic": "^3.5.2",
    "@docusaurus/plugin-content-docs": "^3.5.2",
    "@mdx-js/react": "^3.0.1",
    "typedoc": "^0.26.11",
    "typedoc-plugin-markdown": "^4.2.3",
    "prettier": "^3.3.3",
    "eslint": "^9.10.0",
    "husky": "^9.1.6",
    "lint-staged": "^15.2.10",
    "commitlint": "^19.3.0",
    "@commitlint/config-conventional": "^19.2.2",
    "dotenv": "^16.4.5",
    "@playwright/test": "^1.47.2",
    "concurrently": "^9.0.1"
  }
}

## pnpm-workspace.yaml
packages:
  - "apps/*"
  - "services/*"
  - "packages/*"
  - "tests/*"
  - "website"

## turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": { "dependsOn": ["^build"], "outputs": [".next/**", "dist/**", "build/**", "storybook-static/**", "website/build/**", "docs/reference/**"] },
    "dev": { "cache": false },
    "lint": {},
    "typecheck": {},
    "test": {}
  }
}

## .gitignore
node_modules
.next
dist
build
.storybook-out
storybook-static
website/build
.netlify
.vercel
.env
.env.*
.DS_Store

## Husky + lint-staged + commitlint
- Add .husky/pre-commit running lint-staged
- Add lint-staged.config.mjs formatting TS/JS/MD/JSON with Prettier + ESLint fix
- Add commitlint.config.cjs extending conventional

## packages/config: tsconfig/eslint/prettier exports
- tsconfig.base.json (strict TS, module ESNext)
- eslint.config.js (typescript-eslint basic)
- prettier.config.cjs

## packages/shared: env + types
- src/env.ts: zod schema for server/client env
- src/index.ts: export env + shared types

## scripts/new-component.mjs
- Create a React component, story, README under packages/ui/src/components/<Name>/

Keep files empty-but-valid where content isn’t specified yet; do not throw errors on missing deps. Output the full file tree and all created files.
