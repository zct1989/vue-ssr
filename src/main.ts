import App from './App.vue';
import viteSSR from 'vite-ssr';
import routes from 'virtual:generated-pages';

export default viteSSR(App, { routes }, (context) => {
  // if (import.meta.env.SSR) {
  console.log(import.meta, context.initialState);
  // }
  /* Vite SSR main hook for custom logic */
  /* const { app, router, initialState, ... } = context */
});
