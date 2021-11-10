import { SharedContext } from 'vite-ssr/utils/types';
import { App } from 'vue';
import { Router, RouteRecordRaw } from 'vue-router';

export interface SSRContext<HasRouter extends boolean = true>
  extends SharedContext {
  app: App<Element>;
  router: HasRouter extends true ? Router : undefined;
  initialRoute: any;
}
