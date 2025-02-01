import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import svgLoader from 'vite-svg-loader';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    svgLoader(),
    AutoImport({
      resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
      imports: [
        'vue',
        {
          'element-plus': ['ElMessageBox', 'ElMessage', 'ElNotification'],
        },
      ],
    }),

    Components({
      resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        additionalData: `
        @use "@/assets/index.scss" as *;
         @use "element-plus/theme-chalk/src/message-box.scss" as *;
          @use "element-plus/theme-chalk/src/message.scss" as *;
          @use "element-plus/theme-chalk/src/notification.scss" as *;
          @use "element-plus/theme-chalk/display.css" as *;
        `,
      },
    },
  },
});
