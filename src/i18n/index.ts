import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import localeBackend from './localeBackend';
import zhCN from './locales/zh-CN.json';

i18n
  .use(localeBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'zh-CN',
    debug: import.meta.env.DEV,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage', 'cookie'],
      lookupQuerystring: 'lng',
      lookupCookie: 'i18next',
      lookupLocalStorage: 'i18nextLng',
      lookupFromPathIndex: 0,
      lookupFromSubdomainIndex: 0,
    },
    supportedLngs: ['zh-CN', 'zh-TW', 'en', 'ja'],
    defaultNS: 'translation',
    nonExplicitSupportedLngs: false,
    partialBundledLanguages: true,
    resources: {
      'zh-CN': {
        translation: zhCN,
      },
    },
    react: {
      useSuspense: true,
    },
  });

export default i18n;
