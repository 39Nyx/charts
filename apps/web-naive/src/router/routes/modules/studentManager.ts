import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:layout-dashboard',
      keepAlive: true,
      order: 3,
      title: '学生信息管理',
    },
    name: 'StudentManager',
    path: '/plane',
    children: [
      {
        name: 'Student',
        path: 'student',
        component: () => import('#/views/student/index.vue'),
        meta: {
          affixTab: true,
          icon: 'lucide:user',
          title: '学生信息',
        },
      },
    ],
  },
];

export default routes;
