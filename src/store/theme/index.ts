import { create } from 'zustand';
import { appTheme, antdTheme } from './defaultTheme';

type ThemeState = {
  appTheme: typeof appTheme;
  antdTheme: typeof antdTheme;
};

export const useThemeStore = create<ThemeState>(() => ({
  appTheme,
  antdTheme
}));

export default useThemeStore;