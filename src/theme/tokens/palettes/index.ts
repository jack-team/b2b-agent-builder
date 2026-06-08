import type { ThemeMode } from '../../types';
import { darkColorPalette } from './dark';
import { lightColorPalette } from './light';

export { darkColorPalette, lightColorPalette };

/** 按主题模式索引的语义色板 */
export const colorPalettes: Record<ThemeMode, typeof lightColorPalette> = {
  light: lightColorPalette,
  dark: darkColorPalette,
};
