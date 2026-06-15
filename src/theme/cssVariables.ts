import humps from 'humps';
import { brandTokens, colorPalettes, layoutTokens } from './tokens';

type TokenRecord = Record<string, string | number>;

const toCssVarBlock = (tokens: TokenRecord): string => {
  const decamelized = humps.decamelizeKeys(tokens, { separator: '-' }) as TokenRecord;

  return Object.entries(decamelized)
    .map(([key, value]) => `--${key}:${value};`)
    .join('');
};

const staticTokens: TokenRecord = { ...brandTokens, ...layoutTokens };

/** 模块加载时一次性生成，静态 token + 按 data-theme 切换的 palette */
export const themeVariablesCss = [
  `:root{${toCssVarBlock(staticTokens)}}`,
  `:root,[data-theme='light']{${toCssVarBlock(colorPalettes.light)}}`,
  `[data-theme='dark']{${toCssVarBlock(colorPalettes.dark)}}`,
].join('');
