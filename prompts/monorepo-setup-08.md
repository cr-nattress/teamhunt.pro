Prompt 8 — CI guardrails (GitHub Actions), PR template, and hooks

Goal: Build Storybook + TypeDoc + Docs on PR; optional Vercel preview; add PR template; add husky/lint-staged/commitlint.

Add:
## .github/pull_request_template.md
- Sections: What changed, Why, Checks (unit/E2E/docs/API/ADR)

## .github/workflows/ci-docs-storybook.yml
name: Docs & Storybook CI
on:
  pull_request:
    branches: [ main, develop ]
jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with: { version: 9 }
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: 'pnpm' }
      - run: pnpm install --frozen-lockfile
      - run: pnpm sb:build
      - run: pnpm api:build
      - run: pnpm docs:build
      - uses: actions/upload-artifact@v4
        with: { name: storybook-static, path: storybook-static }
      - uses: actions/upload-artifact@v4
        with: { name: docs-build, path: website/build }

# (Optional) Add a second job for Vercel previews if VERCEL_* secrets exist.

## Husky & lint-staged
- Configure .husky/pre-commit to run: `pnpm lint-staged`
- lint-staged.config.mjs:
  {
    "*.{ts,tsx,js,jsx,json,md,mdx}": ["prettier -w"],
    "*.{ts,tsx,js,jsx}": ["eslint --fix"]
  }

## commitlint.config.cjs
module.exports = { extends: ["@commitlint/config-conventional"] };
