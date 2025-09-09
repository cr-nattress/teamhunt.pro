import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  guideSidebar: [
    {
      type: 'category',
      label: 'Guides',
      items: [
        'guides/getting-started',
        'guides/project-structure',
        'guides/contributing',
        'guides/state-management',
        'guides/security',
        'guides/lessons-learned',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      items: [
        'reference/README',
      ],
    },
    {
      type: 'category',
      label: 'ADRs',
      items: [
        'adr/docs-stack',
      ],
    },
  ],
};

export default sidebars;