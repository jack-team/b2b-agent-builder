import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { applyThemeToDom, withViewTransition } from '@/theme/applyThemeToDom';

import {
  getTheme,
  type AppTheme,
  type ThemeMode,
  type AntdThemeConfig,
  DEFAULT_THEME_MODE,
  THEME_STORAGE_KEY,
} from '@/theme';

type ThemeState = {
  mode: ThemeMode;
  appTheme: AppTheme;
  antdTheme: AntdThemeConfig;
};

type ThemeActions = {
  toggleMode: () => void;
  setMode: (mode: ThemeMode) => void;
};

type ThemeStoreType = ThemeState & ThemeActions;

// 应用主题变化
const applyThemeChange = (mode: ThemeMode) => {
  applyThemeToDom(mode);
  return getTheme(mode);
};

export const useThemeStore = create(persist<ThemeStoreType>(
  (set, get) => ({
    ...getTheme(DEFAULT_THEME_MODE),
    setMode: mode => withViewTransition(
      () => set(applyThemeChange(mode))
    ),
    toggleMode: () => {
      const nextMode = get().mode === 'light' ? 'dark' : 'light';
      withViewTransition(() => set(applyThemeChange(nextMode)));
    },
  }),
  {
    name: THEME_STORAGE_KEY,
    storage: createJSONStorage(() => localStorage),
    merge: (persisted, current) => {
      const s = persisted as Partial<ThemeState>;
      const mode = s?.mode ?? DEFAULT_THEME_MODE;
      return { ...current, ...getTheme(mode) };
    },
    partialize: s => {
      return { mode: s.mode } as ThemeStoreType;
    },
    onRehydrateStorage: () => s => {
      applyThemeToDom(s?.mode);
    },
  }
));

export default useThemeStore;
