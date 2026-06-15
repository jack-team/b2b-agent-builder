import type { AppTheme, ThemeMode } from './types';
import { brandTokens, colorPalettes, layoutTokens } from './tokens';

/** 合并共享 token 与对应色板，生成 CSS 变量源数据 */
export const createAppTheme = (mode: ThemeMode): AppTheme => ({
  ...brandTokens,
  ...layoutTokens,
  ...colorPalettes[mode],
});
