import type { ConfigProviderProps } from 'antd';
import appTheme from './app';

const colorBorder = appTheme.colorBorder;
const colorPrimary = appTheme.colorPrimary;
const bgColorPrimary = appTheme.bgColorPrimary;
const textColorSecondary = appTheme.textColorSecondary;

const controlHeight = 34;

export default <ConfigProviderProps['theme']>{
  token: {
    colorPrimary,
    colorBorder: colorBorder,
    colorBorderDisabled: colorBorder,
    colorText: appTheme.textColorPrimary,
    colorTextSecondary: textColorSecondary
  },
  components: {
    Menu: {
      iconSize: 20,
      itemHeight: 36,
      itemMarginInline: 0,
      itemBorderRadius: 6,
      groupTitleFontSize: 12,
      itemSelectedColor: appTheme.textColorInverse,
      groupTitleColor: appTheme.textColorDisabled,
      itemSelectedBg: colorPrimary,
      itemColor: textColorSecondary
    },
    Form: {
      itemMarginBottom: 16,
      labelFontSize: 13
    },
    Button: {
      fontSize: 13,
      borderRadius: 6,
      controlHeight,
    },
    Tabs: {
      fontSize: 16,
      cardBg: bgColorPrimary,
      cardActiveBg: bgColorPrimary,
      itemColor: textColorSecondary,
    },
    Input: {
      borderRadius: 6,
      colorTextPlaceholder: appTheme.textColorDisabled
    },
    Select: {
      borderRadius: 6,
      controlHeight,
      colorTextPlaceholder: appTheme.textColorDisabled
    },
    Card: {
      padding: 16
    },
    Layout: {
      headerBg: appTheme.bgColorSurface,
      headerPadding: '0 24px'
    },
    Tag: {
      fontSize: 12,
      fontSizeSM: 12,
      colorText: textColorSecondary
    },
    Drawer: {
      colorBgMask: 'rgba(0,0,0,.15)'
    },
    Cascader: {
      dropdownHeight: 'auto',
      controlHeight,
    }
  }
};