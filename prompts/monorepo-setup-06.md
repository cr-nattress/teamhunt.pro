Prompt 6 — Storybook for Next.js (Vite builder) + UI library

Goal: Global Storybook that can read stories from packages/ui and app components.

Create Storybook config:

## .storybook/main.ts
import type { StorybookConfig } from "@storybook/nextjs";
const config: StorybookConfig = {
  framework: "@storybook/nextjs",
  stories: [
    "../packages/ui/src/**/*.stories.@(ts|tsx|mdx)",
    "../apps/**/components/**/*.stories.@(ts|tsx|mdx)"
  ],
  addons: ["@storybook/addon-docs","@storybook/test"],
  core: { builder: "@storybook/builder-vite" },
  docs: { autodocs: true }
};
export default config;

## .storybook/preview.tsx
import type { Preview } from "@storybook/react";
const preview: Preview = { parameters: { controls: { expanded: true } } };
export default preview;

## packages/ui scaffold
- package.json (name @teamhunt/ui, private, build script using tsc)
- src/index.ts re-exports components
- src/components/Example/Example.tsx (simple component)
- src/components/Example/Example.stories.tsx (basic story)
- src/components/Example/README.md

Make sure `pnpm sb:dev` runs and shows Example component.
