import type { BackendModule, ReadCallback } from 'i18next';
import zhCN from './locales/zh-CN.json';

const lazyLocaleLoaders = {
  en: () => import('./locales/en.json'),
  'zh-TW': () => import('./locales/zh-TW.json'),
  ja: () => import('./locales/ja.json'),
} as const;

type LazyLocaleKey = keyof typeof lazyLocaleLoaders;

const localeBackend: BackendModule = {
  type: 'backend',
  init: () => undefined,
  read: (language: string, namespace: string, callback: ReadCallback) => {
    if (language === 'zh-CN' && namespace === 'translation') {
      callback(null, zhCN);
      return;
    }

    const loader = lazyLocaleLoaders[language as LazyLocaleKey];
    if (!loader) {
      callback(new Error(`Missing locale: ${language}`), null);
      return;
    }

    loader()
      .then((module) => callback(null, module.default))
      .catch((error: Error) => callback(error, null));
  },
};

export default localeBackend;
