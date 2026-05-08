import { create } from 'zustand';
import type { ConfigProviderProps } from 'antd';

type ThemeState = {
  antdTheme: ConfigProviderProps['theme'];
};

export const colorPrimary = '#7948EA';

export const useThemeStore = create<ThemeState>((set, get) => ({
  antdTheme: {
    token: {
      colorPrimary,
    },
    components: {
      Menu: {
        itemHeight: 55,
        itemSelectedColor: colorPrimary,
      }
    }
  }
}));

export default useThemeStore;