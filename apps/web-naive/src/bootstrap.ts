import { createApp, watchEffect } from 'vue';

import { registerAccessDirective } from '@vben/access';
import {
  initTippy,
  setDefaultDrawerProps,
  setDefaultModalProps,
} from '@vben/common-ui';
import { preferences } from '@vben/preferences';
import { initStores } from '@vben/stores';
import '@vben/styles';
import '@vben/styles/naive';

import { useTitle } from '@vueuse/core';
import lazyPlugin from 'vue3-lazy';

import { $t, setupI18n } from '#/locales';

import { initComponentAdapter } from './adapter/component';
import App from './app.vue';
import { router } from './router';

async function bootstrap(namespace: string) {
  // 初始化组件适配器
  initComponentAdapter();

  // 设置弹窗的默认配置
  setDefaultModalProps({
    fullscreenButton: false,
    zIndex: 2000,
  });
  // 设置抽屉的默认配置
  setDefaultDrawerProps({
    zIndex: 2000,
  });

  const app = createApp(App);

  // 国际化 i18n 配置
  await setupI18n(app);

  // 配置 pinia-tore
  await initStores(app, { namespace });

  // 安装权限指令
  registerAccessDirective(app);

  // 初始化 tippy
  initTippy(app);

  // 配置路由及路由守卫
  app.use(router);
  app.use(lazyPlugin, {});

  // 动态更新标题
  watchEffect(() => {
    if (preferences.app.dynamicTitle) {
      const routeTitle = router.currentRoute.value.meta?.title;
      const pageTitle =
        (routeTitle ? `${$t(routeTitle)} - ` : '') + preferences.app.name;
      useTitle(pageTitle);
    }
  });

  app.mount('#app');
}

export { bootstrap };
