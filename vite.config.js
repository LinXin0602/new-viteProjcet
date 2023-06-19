import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// https://vitejs.dev/config/
/* global process */
export default defineConfig({
  base:
    process.env.NODE_ENV === 'production'
      ? '/production-sub-path/'
      : '/new-viteProjcet/',
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/style/variables.scss";', // 可選，引入全域的 Sass 變量
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
