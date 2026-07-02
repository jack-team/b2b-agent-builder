import { defineConfig, loadEnv, type PluginOption } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import autoprefixer from 'autoprefixer'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer'
import { fileURLToPath, URL } from 'node:url'
import { createHtmlPlugin } from 'vite-plugin-html'
import { manualChunks } from './.build/manualChunks';

const envDir = './env';
// 例子: ENV_TEST_AVL=12233
const envPrefix = 'ENV';
const isAnalyze = process.env.ANALYZE === 'true';

// https://vite.dev/config/
export default defineConfig(conf => {

  const getEnv = (key: string) => {
    return loadEnv(conf.mode, envDir, envPrefix)[key];
  }

  return {
    envDir,
    envPrefix,
    plugins: [
      // React Compiler 必须在 react() 之前：v6 已移除内置 Babel，由 Oxc 负责 JSX/Fast Refresh
      babel({ presets: [reactCompilerPreset()] }),
      react(),
      tailwindcss(),
      svgr(),
      createHtmlPlugin({
        inject: {
          data: {
            appName: getEnv('ENV_APP_NAME')
          }
        }
      }),
      isAnalyze &&
        visualizer({
          filename: '.build/stats.html',
          template: 'treemap',
          gzipSize: true,
          brotliSize: true,
          open: false,
        }) as PluginOption,
    ].filter(Boolean),
    // 开发服务器配置
    server: {
      port: 5999,
      host: '0.0.0.0',
      allowedHosts: true
    },
    // 样式配置
    css: {
      postcss: {
        plugins: [autoprefixer(["Last 5 versions"])],
      }
    },
    // 路径别名配置
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        'antd/es/config-provider',
        'antd/es/app',
        '@ant-design/pro-components',
        '@xyflow/react',
      ],
    },
    build: {
      // 与 tsconfig.app.json target (ES2023) 对齐，减少 legacy polyfill
      target: 'es2023',
      sourcemap: isAnalyze,
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        output: {
          manualChunks
        },
      },
    },
  }
})
