import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  framework: "@storybook/nextjs",
  stories: [
    "../packages/ui/src/**/*.stories.@(ts|tsx|mdx)",
    "../apps/**/components/**/*.stories.@(ts|tsx|mdx)"
  ],
  addons: ["@storybook/addon-docs", "@storybook/test"],
  core: { builder: "@storybook/builder-vite" },
  docs: { autodocs: true }
};

export default config;