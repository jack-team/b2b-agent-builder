import { type FC } from 'react';
import { themeVariablesCss } from '@/theme/cssVariables';

/** 一次性注入静态 + palette CSS 变量，切换主题时无需更新 */
const ThemeStyles: FC = () => (
  <style data-styled-name="theme-variables">{themeVariablesCss}</style>
);

export default ThemeStyles;
