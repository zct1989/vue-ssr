import { RouteRecordRaw } from 'vue-router';
export default [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: () => import('./pages/home.vue'),
  },
] as RouteRecordRaw[];
