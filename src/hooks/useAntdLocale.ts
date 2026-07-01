import { useEffect, useState, useRef } from 'react';
import { useMemoizedFn } from 'ahooks';
import type { Locale } from 'antd/es/locale';
import { useTranslation } from 'react-i18next';

type AntdLocaleLoader = () => Promise<{ default: Locale }>;

/** 动态 import 各语言包，避免将全部 Ant Design locale 打入首屏 bundle */
const antdLocaleLoaders: Record<string, AntdLocaleLoader> = {
  'en': () => import('antd/es/locale/en_US'),
  'ja': () => import('antd/es/locale/ja_JP'),
  'zh-CN': () => import('antd/es/locale/zh_CN'),
  'zh-TW': () => import('antd/es/locale/zh_TW')
};

/** 将 i18n 语言码映射为 Ant Design locale key，依次回退：精确匹配 → 主语言 → en */
const resolveAntdLocaleKey = (language: string) => {
  if (antdLocaleLoaders[language]) {
    return language;
  }

  const baseLanguage = language.split('-')[0];

  if (antdLocaleLoaders[baseLanguage]) {
    return baseLanguage;
  }

  return 'en';
};

/**
 * 按需加载 Ant Design ConfigProvider 所需的 locale，与 i18n.language 同步。
 * 加载完成前返回 undefined，调用方应据此决定是否渲染依赖 locale 的内容。
 */
export const useAntdLocale = () => {
  const { i18n } = useTranslation();
  // 语言快速切换时，丢弃已过期的异步加载结果
  const cancelledRef = useRef(false);
  const [locale, setLocale] = useState<Locale>();

  const loadAntdLocale = useMemoizedFn(async (key: string) => {
    try {
      const module = await antdLocaleLoaders[key]();
      if (!cancelledRef.current) setLocale(module.default);
    } catch (error) {
      // 加载失败时回退到英文 locale
      if (!cancelledRef.current) {
        loadAntdLocale('en');
      }
    }
  });

  useEffect(() => {
    cancelledRef.current = false;
    const localeKey = resolveAntdLocaleKey(i18n.language);
    loadAntdLocale(localeKey);

    return () => {
      cancelledRef.current = true;
    };
  }, [i18n.language]);

  return locale;
};
