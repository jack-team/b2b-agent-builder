# B2B Agent Builder

基于 React + TypeScript + Vite 的 B2B 智能代理构建平台。

## 项目架构

```
├── env/                    # 环境配置文件
│   ├── .env               # 开发环境配置
│   └── .env.staging       # 预发布环境配置
├── public/                 # 静态资源
│   ├── locales/           # 国际化翻译文件
│   │   ├── en/            # 英文
│   │   ├── ja/            # 日文
│   │   ├── zh-CN/         # 简体中文
│   │   └── zh-TW/         # 繁体中文
│   └── favicon.svg        # 网站图标
├── src/                   # 源代码目录
│   ├── assets/            # 静态资源（图标、图片等）
│   │   ├── svg-icons/     # SVG 图标
│   │   └── icon_back.svg
│   ├── bsComponents/      # 业务组件
│   │   ├── AvailableTools/   # 可用工具列表
│   │   ├── KnowledgeSources/ # 知识源管理
│   │   ├── KnowledgeTypeManager/ # 知识类型管理
│   │   ├── KnowledgeTypeSelect/  # 知识类型选择
│   │   ├── MCPServerConfig/     # MCP 服务器配置
│   │   ├── MCPTools/            # MCP 工具
│   │   └── UpdateKnowledge/     # 更新知识
│   ├── components/        # 通用组件
│   │   ├── Drawer/        # 抽屉组件
│   │   ├── RemoteFormItem/ # 远程表单项
│   │   ├── Spinner/       # 加载指示器
│   │   ├── StyledVariables/ # 样式变量
│   │   ├── TableActions/  # 表格操作
│   │   └── TagsInput/     # 标签输入
│   ├── configs/           # 配置文件
│   │   ├── menu-icons.ts  # 菜单图标配置
│   │   └── menu-list.ts   # 菜单列表配置
│   ├── i18n/              # 国际化配置
│   ├── layouts/           # 布局组件
│   │   ├── MainLayout/    # 主布局
│   │   ├── RootLayout.tsx # 根布局
│   │   └── index.ts
│   ├── pages/             # 页面组件
│   │   ├── capabilities/  # 能力管理页面
│   │   ├── dashboard/     # 仪表盘页面
│   │   ├── knowledges/    # 知识库页面
│   │   ├── llm/           # 大语言模型配置页面
│   │   └── notFound/      # 404 页面
│   ├── routes/            # 路由配置
│   ├── store/             # 状态管理
│   │   └── theme/         # 主题配置
│   ├── styles/            # 全局样式
│   │   └── antd/          # Ant Design 样式覆盖
│   ├── utils/             # 工具函数
│   ├── App.less           # 应用样式
│   ├── App.tsx            # 应用入口组件
│   ├── global.css         # 全局 CSS
│   ├── main.tsx           # 应用入口文件
│   └── typing.d.ts        # TypeScript 类型定义
```

## 技术栈

- **框架**: React 19 + TypeScript
- **构建工具**: Vite 6
- **样式方案**: Less + TailwindCSS
- **UI 组件**: Ant Design
- **状态管理**: Zustand
- **国际化**: i18next
- **路由**: React Router

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动预发布环境
npm run r:staging
```

## 目录职责说明

| 目录 | 职责 | 说明 |
|------|------|------|
| `assets/` | 静态资源 | 存放图标、图片等静态文件 |
| `bsComponents/` | 业务组件 | 与业务强相关的可复用组件 |
| `components/` | 通用组件 | 不依赖业务的纯 UI 组件 |
| `configs/` | 配置文件 | 菜单、图标等应用配置 |
| `i18n/` | 国际化 | 多语言支持配置 |
| `layouts/` | 布局组件 | 页面布局结构 |
| `pages/` | 页面组件 | 各功能页面 |
| `routes/` | 路由配置 | 应用路由定义 |
| `store/` | 状态管理 | 全局状态存储 |
| `styles/` | 全局样式 | 主题和全局样式定义 |
| `utils/` | 工具函数 | 通用工具方法 |

---

## 原模板说明

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
