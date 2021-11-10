import App from './App.vue';
import viteSSR from 'vite-ssr';
import router from './router';
import { SSRContext } from './types';
import bootstrap from './bootstrap';

import 'uno.css';

function installModules(ctx: SSRContext) {
  // 加载模块
  Object.values(import.meta.globEager('./modules/*.ts')).map((i) =>
    i.install?.(ctx),
  );
}

export default viteSSR(App, router, (ctx: SSRContext) => {
  installModules(ctx);

  // 安装启动模块
  // TODO: 更新为中间件模式启动
  if (!import.meta.env.SSR) {
    bootstrap(ctx);
  }
});
