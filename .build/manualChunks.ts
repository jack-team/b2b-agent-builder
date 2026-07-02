export const manualChunks = (id: string) => {
  // React 核心需优先于 pro-components，避免 jsx-runtime 被误打入 pro-components chunk
  if (id.includes('node_modules/react-dom')) {
    return 'react-dom';
  }

  // react jsx 相关库
  if ([
    'node_modules/react/jsx-runtime',
    'node_modules/react/jsx-dev-runtime',
    'node_modules/react/cjs/react-jsx-runtime',
    'node_modules/react/cjs/react-jsx-dev-runtime'
  ].some(path => id.includes(path))) {
    return 'react-jsx';
  }

  // react 核心库
  if ([
    'node_modules/react/',
    'node_modules/react\\'
  ].some(path => id.includes(path))) {
    return 'react';
  }

  // pro-components 不做强制合包，避免 jsx-runtime 被绑定到该 chunk 导致首屏误加载
  if (id.includes('node_modules/@ant-design/icons')) {
    return 'antd-icons';
  }

  // antd 语言包
  if (id.includes('node_modules/antd/es/locale')) {
    return 'antd-locale';
  }

  // antd 运行时核心（ConfigProvider / cssinjs / theme），组件随路由按需拆分
  if (
    id.includes('node_modules/@ant-design/cssinjs') ||
    id.includes('node_modules/@ant-design/colors') ||
    id.includes('node_modules/@ant-design/fast-color')
  ) {
    return 'antd-core';
  }

  if ([
    'node_modules/antd/es/config-provider',
    'node_modules/antd/es/theme',
    'node_modules/antd/es/app',
    'node_modules/antd/es/locale',
  ].some(path => id.includes(path))) {
    return 'antd-core';
  }

  // react-router 相关库
  if ([
    'node_modules/react-router',
    'node_modules/@remix-run'
  ].some(path => id.includes(path))) {
    return 'router';
  }

  // i18n 相关库
  if ([
    'node_modules/i18next',
    'node_modules/react-i18next'
  ].some(path => id.includes(path))) {
    return 'i18n';
  }

  // i18n 语言包
  if (id.includes('/src/i18n/locales/')) {
    return 'app-locales';
  }
};
