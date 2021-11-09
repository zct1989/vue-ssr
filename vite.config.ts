import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import viteSSR from 'vite-ssr/plugin';

import pages from 'vite-plugin-pages';
import layouts from 'vite-plugin-vue-layouts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteSSR({}),
    pages({
      pagesDir: 'src/views',
    }),
  ],
});
