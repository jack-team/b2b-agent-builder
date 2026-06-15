import type { ThemeMode } from './types';

const $doc = document.documentElement;
const $body = document.body;

/** 同步 DOM 主题属性，CSS 变量由 themeVariablesCss 的 [data-theme] 选择器驱动 */
export const applyThemeToDom = (mode: ThemeMode) => {
  $doc.setAttribute('data-theme', mode);
  $body.setAttribute('data-theme', mode);
  $doc.style.colorScheme = mode;
};

/** 在支持的浏览器上使用 View Transition 平滑切换主题 */
export const withViewTransition = (callback: () => void) => {
  if (typeof document.startViewTransition === 'function') {
    document.startViewTransition(callback);
    return;
  }
  callback();
};
