import type { brandTokens } from './tokens/brand';
import type { layoutTokens } from './tokens/layout';

/** 主题模式：浅色 / 深色 */
export type ThemeMode = 'light' | 'dark';

/** 随主题切换的语义色板（文本、背景、边框、阴影） */
export type ThemeColorPalette = {
  textColorPrimary: string;
  textColorSecondary: string;
  textColorDisabled: string;
  textColorInverse: string;
  bgColorPrimary: string;
  bgColorSecondary: string;
  bgColorSurface: string;
  bgColorHover: string;
  bgColorActive: string;
  colorBorder: string;
  borderColorPrimary: string;
  boxColor: string;
  shadowSm: string;
  shadowMd: string;
  shadowLg: string;
};

export type BrandTokens = typeof brandTokens;
export type LayoutTokens = typeof layoutTokens;

/** 完整应用主题：品牌色 + 布局 token + 语义色板 */
export type AppTheme = BrandTokens & LayoutTokens & ThemeColorPalette;

export type ThemeBundle = {
  mode: ThemeMode;
  appTheme: AppTheme;
  antdTheme: import('./antdTheme').AntdThemeConfig;
};
