import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import viteSSR from 'vite-ssr/plugin';
import autoImport from 'unplugin-auto-import/vite';

import pages from 'vite-plugin-pages';
import layouts from 'vite-plugin-vue-layouts';
import Unocss from 'unocss/vite';
import { presetUno, presetAttributify } from 'unocss';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({ refTransform: true }),
    viteSSR(),
    autoImport({
      dts: 'typings/auto-imports.d.ts',
      include: [/\.vue\??/],
      imports: [
        'vue',
        'vue-router',
        {
          '@vueuse/core': [],
        },
        {
          '~/shared/common': ['get', 'set', 'templateRef'],
        },
      ],
    }),
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
