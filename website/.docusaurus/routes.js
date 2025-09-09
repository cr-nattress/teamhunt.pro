import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/',
    component: ComponentCreator('/', '010'),
    routes: [
      {
        path: '/',
        component: ComponentCreator('/', 'c8b'),
        routes: [
          {
            path: '/',
            component: ComponentCreator('/', 'c2a'),
            routes: [
              {
                path: '/adr/docs-stack',
                component: ComponentCreator('/adr/docs-stack', '4ee'),
                exact: true,
                sidebar: "guideSidebar"
              },
              {
                path: '/guides/contributing',
                component: ComponentCreator('/guides/contributing', '3ea'),
                exact: true,
                sidebar: "guideSidebar"
              },
              {
                path: '/guides/getting-started',
                component: ComponentCreator('/guides/getting-started', '6e3'),
                exact: true,
                sidebar: "guideSidebar"
              },
              {
                path: '/guides/lessons-learned',
                component: ComponentCreator('/guides/lessons-learned', '3de'),
                exact: true,
                sidebar: "guideSidebar"
              },
              {
                path: '/guides/project-structure',
                component: ComponentCreator('/guides/project-structure', '598'),
                exact: true,
                sidebar: "guideSidebar"
              },
              {
                path: '/guides/security',
                component: ComponentCreator('/guides/security', '925'),
                exact: true,
                sidebar: "guideSidebar"
              },
              {
                path: '/guides/state-management',
                component: ComponentCreator('/guides/state-management', '393'),
                exact: true,
                sidebar: "guideSidebar"
              },
              {
                path: '/reference/',
                component: ComponentCreator('/reference/', '6fb'),
                exact: true,
                sidebar: "guideSidebar"
              },
              {
                path: '/reference/functions/validateClientEnv',
                component: ComponentCreator('/reference/functions/validateClientEnv', '615'),
                exact: true
              },
              {
                path: '/reference/functions/validateServerEnv',
                component: ComponentCreator('/reference/functions/validateServerEnv', 'c51'),
                exact: true
              },
              {
                path: '/reference/interfaces/ApiResponse',
                component: ComponentCreator('/reference/interfaces/ApiResponse', '28f'),
                exact: true
              },
              {
                path: '/reference/interfaces/Hunt',
                component: ComponentCreator('/reference/interfaces/Hunt', '906'),
                exact: true
              },
              {
                path: '/reference/interfaces/Team',
                component: ComponentCreator('/reference/interfaces/Team', 'e24'),
                exact: true
              },
              {
                path: '/reference/interfaces/User',
                component: ComponentCreator('/reference/interfaces/User', '866'),
                exact: true
              },
              {
                path: '/reference/type-aliases/ClientEnv',
                component: ComponentCreator('/reference/type-aliases/ClientEnv', '51d'),
                exact: true
              },
              {
                path: '/reference/type-aliases/ServerEnv',
                component: ComponentCreator('/reference/type-aliases/ServerEnv', '160'),
                exact: true
              },
              {
                path: '/reference/variables/clientEnvSchema',
                component: ComponentCreator('/reference/variables/clientEnvSchema', 'b35'),
                exact: true
              },
              {
                path: '/reference/variables/serverEnvSchema',
                component: ComponentCreator('/reference/variables/serverEnvSchema', '967'),
                exact: true
              },
              {
                path: '/',
                component: ComponentCreator('/', '50f'),
                exact: true
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
