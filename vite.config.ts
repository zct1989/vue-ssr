import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import viteSSR from 'vite-ssr/plugin';
import tsconfigPaths from 'vite-tsconfig-paths';

import pages from 'vite-plugin-pages';
import layouts from 'vite-plugin-vue-layouts';
import Unocss from 'unocss/vite';
import { presetUno, presetAttributify } from 'unocss';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteSSR(),
    tsconfigPaths(),
    pages({
      pagesDir: [{ dir: 'src/views', baseRoute: '' }],
      exclude: ['**/components/*.vue'],
      extensions: ['vue'],
      nuxtStyle: true,
    }),
    layouts({
      layoutsDir: 'src/layouts',
    }),
    Unocss({
      presets: [presetAttributify(), presetUno()],
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
});
