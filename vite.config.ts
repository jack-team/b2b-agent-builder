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
            if (id.includes('@xyflow')) {
              return 'xyflow';
            }
            if (id.includes('@ant-design/pro')) {
              return 'pro-components';
            }
            if (id.includes('node_modules/antd') || id.includes('node_modules/@ant-design/icons')) {
              return 'antd';
            }
            if (id.includes('node_modules/react-router') || id.includes('node_modules/@remix-run')) {
              return 'router';
            }
            if (id.includes('node_modules/i18next') || id.includes('node_modules/react-i18next')) {
              return 'i18n';
            }
          },
        },
      },
    },
  }
})
