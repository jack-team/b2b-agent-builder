import { defineConfig, loadEnv } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import autoprefixer from 'autoprefixer'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'
import { createHtmlPlugin } from 'vite-plugin-html'

const envDir = './env';
// 例子: ENV_TEST_AVL=12233
const envPrefix = 'ENV';

// https://vite.dev/config/
export default defineConfig(conf => {

  const getEnv = (key: string) => {
    return loadEnv(conf.mode, envDir, envPrefix)[key];
  }

  return {
    envDir,
    envPrefix,
    plugins: [
      react(),
      tailwindcss(),
      babel({ presets: [reactCompilerPreset()] }),
      svgr(),
      createHtmlPlugin({
        inject: {
          data: {
            appName: getEnv('ENV_APP_NAME')
          }
        }
      }),
    ],
    server: {
      port: 5999,
      host: '0.0.0.0',
      allowedHosts: true
    },
    css: {
      postcss: {
        plugins: [autoprefixer(["Last 5 versions"])],
      }
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            // React 核心需优先于 pro-components，避免 jsx-runtime 被误打入 pro-components chunk
            if (id.includes('node_modules/react-dom')) {
              return 'react-dom';
            }
            if (
              id.includes('node_modules/react/jsx-runtime') ||
              id.includes('node_modules/react/jsx-dev-runtime') ||
              id.includes('node_modules/react/cjs/react-jsx-runtime') ||
              id.includes('node_modules/react/cjs/react-jsx-dev-runtime')
            ) {
              return 'react-jsx';
            }
            if (
              id.includes('node_modules/react/') ||
              id.includes('node_modules/react\\')
            ) {
              return 'react';
            }
            if (id.includes('node_modules/scheduler')) {
              return 'react';
            }
            if (id.includes('@xyflow')) {
              return 'xyflow';
            }
            // pro-components 不做强制合包，避免 jsx-runtime 被绑定到该 chunk 导致首屏误加载
            if (id.includes('node_modules/@ant-design/icons')) {
              return 'antd-icons';
            }
            if (id.includes('node_modules/antd/es/locale')) {
              return 'antd-locale';
            }
            if (id.includes('node_modules/antd')) {
              return 'antd';
            }
            if (
              id.includes('node_modules/react-router') ||
              id.includes('node_modules/@remix-run')
            ) {
              return 'router';
            }
            if (
              id.includes('node_modules/i18next') ||
              id.includes('node_modules/react-i18next')
            ) {
              return 'i18n';
            }
            if (id.includes('/src/i18n/locales/')) {
              return 'app-locales';
            }
          },
        },
      },
    },
  }
})
