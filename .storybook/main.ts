import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  framework: "@storybook/nextjs",
  stories: [
    "../packages/ui/src/**/*.stories.@(ts|tsx|mdx)",
    "../apps/**/components/**/*.stories.@(ts|tsx|mdx)"
  ],
  addons: ["@storybook/addon-docs", "@storybook/test"],
  core: { builder: "@storybook/builder-vite" },
  docs: { autodocs: true },
  viteFinal: async (config) => {
    config.define = {
      ...config.define,
      global: 'globalThis',
      'process.env': 'import.meta.env',
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.browser': 'true',
      'process.version': JSON.stringify('v18.0.0')
    };
    return config;
  }
};

export default config;