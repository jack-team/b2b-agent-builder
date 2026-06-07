import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import zhCN from 'antd/es/locale/zh_CN';
import type { Locale } from 'antd/es/locale';

type AntdLocaleLoader = () => Promise<{ default: Locale }>;

const antdLocaleLoaders: Record<string, AntdLocaleLoader> = {
  'zh-CN': () => import('antd/es/locale/zh_CN'),
  'zh-TW': () => import('antd/es/locale/zh_TW'),
  en: () => import('antd/es/locale/en_US'),
  ja: () => import('antd/es/locale/ja_JP'),
};

const resolveAntdLocaleKey = (language: string) => {
  if (antdLocaleLoaders[language]) {
    return language;
  }

  const baseLanguage = language.split('-')[0];
  if (antdLocaleLoaders[baseLanguage]) {
    return baseLanguage;
  }

  return 'zh-CN';
};

export const useAntdLocale = () => {
  const { i18n } = useTranslation();
  const [locale, setLocale] = useState<Locale>(zhCN);

  useEffect(() => {
    const localeKey = resolveAntdLocaleKey(i18n.language);
    let cancelled = false;

    antdLocaleLoaders[localeKey]()
      .then((module) => {
        if (!cancelled) {
          setLocale(module.default);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setLocale(zhCN);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [i18n.language]);

  return locale;
};
