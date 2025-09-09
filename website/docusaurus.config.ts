import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'TeamHunt Docs',
  tagline: 'Documentation for TeamHunt platform',
  favicon: 'img/favicon.ico',

  url: 'https://docs.teamhunt.pro',
  baseUrl: '/',

  organizationName: 'teamhunt',
  projectName: 'teamhunt-monorepo',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          path: '../docs',
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'TeamHunt Docs',
      logo: {
        alt: 'TeamHunt Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'guideSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          href: 'https://storybook.teamhunt.pro',
          label: 'Storybook',
          position: 'left',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} TeamHunt. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    algolia: process.env.ALGOLIA_APP_ID ? {
      appId: process.env.ALGOLIA_APP_ID,
      apiKey: process.env.ALGOLIA_SEARCH_KEY || '',
      indexName: process.env.ALGOLIA_INDEX || 'teamhunt-docs',
      contextualSearch: true,
      searchPagePath: 'search',
    } : undefined,
  } satisfies Preset.ThemeConfig,
};

export default config;