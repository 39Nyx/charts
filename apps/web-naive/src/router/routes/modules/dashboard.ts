import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '#/layouts';
import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'lucide:layout-dashboard',
      order: -1,
      title: $t('page.dashboard.title'),
    },
    name: 'Dashboard',
    path: '/',
    children: [
      {
        name: 'Analytics',
        path: '/analytics',
        component: () => import('#/views/dashboard/analytics/index.vue'),
        meta: {
          affixTab: true,
          icon: 'lucide:area-chart',
          title: $t('page.dashboard.analytics'),
        },
      },
      {
        name: 'Workspace',
        path: '/workspace',
        component: () => import('#/views/dashboard/workspace/index.vue'),
        meta: {
          icon: 'carbon:workspace',
          title: $t('page.dashboard.workspace'),
        },
      },
      {
        name: 'Charts',
        path: '/charts',
        component: () => import('#/views/dashboard/charts/charts.vue'),
        meta: {
          icon: 'carbon:workspace',
          title: $t('page.charts.title'),
          keepAlive: true,
        },
      },
      {
        name: 'ChartsPreview',
        path: '/charts/preview',
        component: () => import('#/views/dashboard/preview/preview.vue'),
        meta: {
          icon: 'carbon:workspace',
          title: $t('page.charts.title'),
          keepAlive: true,
          hideInMenu: true,
        },
        props: (route) => {
          return {
            cid: route.query.cid,
          };
        },
      },
    ],
  },
];

export default routes;
