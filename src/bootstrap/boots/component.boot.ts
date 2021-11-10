import { App } from 'vue';
import PageContainer from '@/shared/components/page-container.vue';

export default function (app: App<Element>) {
  app.component('page-container', PageContainer);
}

declare global {
  interface __VLS_GlobalComponents {
    PageContainer: typeof PageContainer;
  }
}
