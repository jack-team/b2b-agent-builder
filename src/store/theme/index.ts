import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { DexieStorage } from '@/utils/dexieStorage';

import {
  buildTheme,
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

const storage = new DexieStorage('theme');

export const useThemeStore = create(persist<ThemeStoreType>(
  (set) => ({
    ...buildTheme(DEFAULT_THEME_MODE),
    setMode: mode => set(buildTheme(mode)),
    toggleMode: () => set(s => {
      const nextMode = s.mode === 'light' ? 'dark' : 'light';
      return buildTheme(nextMode);
    }),
  }),
  {
    name: THEME_STORAGE_KEY,
    storage: createJSONStorage(() => storage),
    // 从 localStorage 恢复后，按 mode 重新构建完整主题
    merge: (persisted, current) => {
      const s = persisted as Partial<ThemeState>;
      const mode = s?.mode ?? DEFAULT_THEME_MODE;
      return { ...current, ...buildTheme(mode) };
    },
    // 仅持久化 mode，避免序列化完整主题对象
    partialize: s => {
      return { mode: s.mode } as ThemeStoreType;
    }
  }
));

export default useThemeStore;
