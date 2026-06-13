import { theme as antdThemeAlgorithm } from 'antd';
import type { ConfigProviderProps } from 'antd';
import type { AppTheme, ThemeMode } from './types';

export type AntdThemeConfig = NonNullable<ConfigProviderProps['theme']>;

const CONTROL_HEIGHT = 34;
const BORDER_RADIUS = 6;

const createComponentTokens = (appTheme: AppTheme, mode: ThemeMode) => {
  const isDark = mode === 'dark';
  return <AntdThemeConfig['components']>{
    Menu: {
      iconSize: 20,
      itemHeight: 36,
      itemMarginInline: 0,
      groupTitleFontSize: 12,
      itemBorderRadius: BORDER_RADIUS,
      darkItemBg: appTheme.bgColorSurface,
      itemSelectedBg: appTheme.colorPrimary,
      itemColor: appTheme.textColorSecondary,
      darkSubMenuItemBg: appTheme.bgColorSurface,
      itemSelectedColor: appTheme.textColorInverse,
      groupTitleColor: appTheme.textColorDisabled
    },
    Form: {
      itemMarginBottom: 16,
      labelFontSize: 13,
    },
    Button: {
      fontSize: 13,
      borderRadius: BORDER_RADIUS,
      controlHeight: CONTROL_HEIGHT,
      boxShadow: 'none',
    },
    Tabs: {
      fontSize: 16,
      cardBg: appTheme.bgColorPrimary,
      itemColor: appTheme.textColorSecondary,
    },
    Input: {
      borderRadius: BORDER_RADIUS,
      colorTextPlaceholder: appTheme.textColorDisabled,
    },
    Select: {
      borderRadius: BORDER_RADIUS,
      controlHeight: CONTROL_HEIGHT,
      colorTextPlaceholder: appTheme.textColorDisabled,
    },
    Card: {
      padding: 16,
    },
    Layout: {
      headerBg: appTheme.bgColorSurface,
      bodyBg: appTheme.bgColorPrimary,
      siderBg: appTheme.bgColorSurface,
      headerHeight: appTheme.headerHeight,
      headerPadding: '0 24px',
    },
    Tag: {
      fontSize: 12,
      fontSizeSM: 12,
      colorText: appTheme.textColorSecondary,
    },
    Drawer: {
      // 深色模式下遮罩需更深，避免内容穿透感
      colorBgMask: `rgba(0, 0, 0, ${isDark ? 0.7 : 0.15})`,
    },
    Cascader: {
      dropdownHeight: 'auto',
      controlHeight: CONTROL_HEIGHT,
    },
    Table: {
      borderColor: appTheme.borderColorPrimary
    }
  };
};

/** 基于 appTheme 生成 Ant Design ConfigProvider 主题配置 */
export const createAntdTheme = (appTheme: AppTheme, mode: ThemeMode) => {
  return <AntdThemeConfig>{
    token: {
      colorPrimary: appTheme.colorPrimary,
      colorBorder: appTheme.colorBorder,
      colorBorderDisabled: appTheme.colorBorder,
      colorText: appTheme.textColorPrimary,
      colorTextSecondary: appTheme.textColorSecondary,
      colorBgContainer: appTheme.bgColorSurface,
      colorBgLayout: appTheme.bgColorPrimary,
      colorBgElevated: appTheme.bgColorSurface,
    },
    components: createComponentTokens(appTheme, mode),
    // 深色模式使用 darkAlgorithm 自动推导组件色值
    algorithm: mode === 'dark' ?
      antdThemeAlgorithm.darkAlgorithm :
      antdThemeAlgorithm.defaultAlgorithm,
  }
};
