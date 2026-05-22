import type { ConfigProviderProps } from 'antd';
import appTheme from './app';

const colorPrimary = appTheme.colorPrimary;
const bgColorPrimary = appTheme.bgColorPrimary;

export default <ConfigProviderProps['theme']>{
  token: {
    colorPrimary,
    colorText: appTheme.textPrimary
  },
  components: {
    Menu: {
      fontSize: 15,
      itemHeight: 48,
      darkItemColor: '#999'
    },
    Form: {
      itemMarginBottom: 16,
      labelFontSize: 14
    },
    Button: {
      borderRadiusSM: 6,
      paddingInlineSM: 8,
      primaryShadow: 'none',
      fontSize: 12,
      fontWeight: 550,
      borderRadius: 8
    },
    Tabs: {
      cardBg: bgColorPrimary,
      cardActiveBg: bgColorPrimary,
    },
    Input: {
      borderRadius: 8
    },
    Select: {
      borderRadius: 8
    },
    Card: {
      paddingLG: 16
    },
    Layout: {
      headerBg: '#fff',
      headerPadding: '0 16px'
    }
  }
};