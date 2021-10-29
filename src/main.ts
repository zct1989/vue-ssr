import App from './App.vue';
import routes from './routes';
import viteSSR from 'vite-ssr';

export default viteSSR(App, { routes }, (context) => {
  /* Vite SSR main hook for custom logic */
  /* const { app, router, initialState, ... } = context */
});
