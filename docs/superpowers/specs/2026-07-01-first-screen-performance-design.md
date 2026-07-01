# 首屏加载性能优化设计

**日期:** 2026-07-01  
**方案:** A — 轻量首屏 + 延迟重型依赖  
**目标路径:** `/auth`（未登录）与 `/dashboard`（已登录）

## 背景

生产构建中 `antd`（454KB gzip）与 `pro-components`（161KB gzip）是首屏最大瓶颈。登录页仅使用少量 Form 组件却加载完整 pro-components；路由层静态 import `MainLayout` 导致登录页也下载侧边栏代码。

## 目标

| 指标 | 目标 |
|------|------|
| Auth 首屏 JS (gzip) | 减少 ~180KB+ |
| Dashboard 首屏 JS (gzip) | 减少 ~160KB+（延迟 pro-components） |
| 功能回归 | 登录/注册/Dashboard 视觉与交互不变 |

## 改动清单

1. **MainLayout 懒加载** — `router/index.tsx` 改为 `React.lazy`，Auth 路径不再下载 Layout/Menu
2. **Auth 表单改用 antd Form** — `SignInForm` / `RegisterForm` 移除 pro-components 依赖
3. **Register Tab 懒加载** — 仅点击注册 Tab 时加载 `RegisterForm`
4. **Dashboard 移除 PageContainer** — 用原生 div + CSS 替代，首屏不加载 pro-components
5. **登录后预取** — Auth 页 idle prefetch + 登录成功 prefetch `/dashboard`
6. **useAntdLocale 修复** — 移除 `en_US` 静态 import，避免 locale 打入主包
7. **Vite 分包修复** — 独立 `react-jsx` chunk，取消 `pro-components` 强制合包（避免 jsx-runtime 被绑定导致首屏误加载 531KB）

## 不在范围

- antd 全库体积优化（需更大范围重构）
- 运行时渲染优化（Flow 画布、表格等）
- SSR / 双入口

## 验收

- `npm run build` 通过
- Auth chunk 不再依赖 pro-components
- Dashboard chunk 不再依赖 pro-components
- 登录/注册/Dashboard 功能正常
