import { DEFAULT_THEME_MODE } from './constants';
import { createAntdTheme } from './createAntdTheme';
import { createAppTheme } from './createAppTheme';
import type { ThemeBundle, ThemeMode } from './types';

/** 根据 mode 一次性生成完整主题 bundle，保证 appTheme 与 antdTheme 同步 */
export const buildTheme = (mode: ThemeMode = DEFAULT_THEME_MODE): ThemeBundle => {
  const appTheme = createAppTheme(mode);

  return {
    mode,
    appTheme,
    antdTheme: createAntdTheme(appTheme, mode),
  };
};

/** 默认浅色主题 bundle，供静态场景或初始化使用 */
export const defaultTheme = buildTheme(DEFAULT_THEME_MODE);
