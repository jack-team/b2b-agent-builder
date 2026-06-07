import type { BackendModule, ReadCallback } from 'i18next';

const lazyLocaleLoaders = {
  'en': () => import('@/locales/en.json'),
  'ja': () => import('@/locales/ja.json'),
  'zh-CN': () => import('@/locales/zh-CN.json'),
  'zh-TW': () => import('@/locales/zh-TW.json')
} as const;

type LazyLocaleKey = keyof typeof lazyLocaleLoaders;

const localeBackend: BackendModule = {
  type: 'backend',
  init: () => undefined,
  read: (language: string, _namespace: string, callback: ReadCallback) => {
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
