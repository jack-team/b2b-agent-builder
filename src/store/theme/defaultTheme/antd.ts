import type { ConfigProviderProps } from 'antd';
import appTheme from './app';

const colorPrimary = appTheme.colorPrimary;
const bgColorPrimary = appTheme.bgColorPrimary;

export default<ConfigProviderProps['theme']> {
  token: {
    colorPrimary,
    colorText: appTheme.textColorPrimary
  },
  components: {
    Menu: {
      itemHeight: 55,
      itemSelectedColor: colorPrimary,
    },
    Form: {
      itemMarginBottom: 16,
      labelFontSize: 14
    },
    Button: {
      borderRadiusSM: 6,
      paddingInlineSM: 8,
      defaultBg: bgColorPrimary,
      defaultBorderColor: bgColorPrimary,
    },
    Tabs: {
      cardBg: bgColorPrimary,
      cardActiveBg: bgColorPrimary,
    },
    Table: {
      headerBg: 'transparent',
      headerSplitColor: 'transparent'
    },
    Input: {
      borderRadius: 4,
      colorBorder: '#E5E5E5'
    },
    Card: {
      paddingLG: 16
    },
  }
};