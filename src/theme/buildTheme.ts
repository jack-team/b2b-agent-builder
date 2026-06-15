import { DEFAULT_THEME_MODE } from './constants';
import { createAppTheme } from './appTheme';
import { createAntdTheme } from './antdTheme';
import type { ThemeBundle, ThemeMode } from './types';

const createThemeBundle = (mode: ThemeMode): ThemeBundle => {
  const appTheme = createAppTheme(mode);

  return {
    mode,
    appTheme,
    antdTheme: createAntdTheme(appTheme, mode),
  };
};

/** 预缓存两套主题，保证引用稳定、避免重复计算 */
const themeCache: Record<ThemeMode, ThemeBundle> = {
  light: createThemeBundle('light'),
  dark: createThemeBundle('dark'),
};

/** 获取预缓存的主题 bundle */
export const getTheme = (mode: ThemeMode): ThemeBundle => themeCache[mode];

/** 根据 mode 获取主题 bundle（getTheme 别名，保持向后兼容） */
export const buildTheme = getTheme;

/** 默认浅色主题 bundle，供静态场景或初始化使用 */
export const defaultTheme = themeCache[DEFAULT_THEME_MODE];
