import { hexToRgba } from '@/utils';

const colorPrimary = '#7948EA';

export default {
  colorPrimary,
  bgColorPrimary: hexToRgba(colorPrimary, 0.05),
  textColorPrimary: '#383838',
  borderColorPrimary: '#e8e8e8'
}