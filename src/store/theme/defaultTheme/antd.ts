import type { ConfigProviderProps } from 'antd';
import appTheme from './app';

const colorPrimary = appTheme.colorPrimary;

export default<ConfigProviderProps['theme']> {
  token: {
    colorPrimary,
    colorText: appTheme.textColorPrimary
  },
  components: {
    Menu: {
      itemHeight: 55,
      itemSelectedColor: colorPrimary,
    }
  }
};