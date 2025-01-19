import { defineConfig } from '@vben/vite-config';

import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig(async () => {
  // eslint-disable-next-line n/prefer-global/process
  const base = process.env.VITE_BASE_URL;
  return {
    application: {},
    vite: {
      base,
      server: {
        proxy: {
          '/api': {
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
            // mock代理目标地址
            target: 'http://localhost:5320/api',
            ws: true,
          },
          '/mock-charts': {
            changeOrigin: true,
            target: 'http://localhost:5173',
          },
          '/monaco-editor': {
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/monaco-editor/, ''),
            target:
              'https://registry.npmmirror.com/monaco-editor/0.52.2/files/',
          },
        },
      },
    },
  };
});
