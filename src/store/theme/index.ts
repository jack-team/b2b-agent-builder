import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  type AppTheme,
  type ThemeMode,
  type AntdThemeConfig,
  buildTheme,
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

export const useThemeStore = create<ThemeState & ThemeActions>()(
  persist(
    (set, get) => ({
      ...buildTheme(DEFAULT_THEME_MODE),
      setMode: mode => set(buildTheme(mode)),
      toggleMode: () => {
        const nextMode = get().mode === 'light' ? 'dark' : 'light';
        set(buildTheme(nextMode));
      },
    }),
    {
      name: THEME_STORAGE_KEY,
      // 仅持久化 mode，避免序列化完整主题对象
      partialize: state => ({ mode: state.mode }),
      storage: createJSONStorage(() => localStorage),
      // 从 localStorage 恢复后，按 mode 重新构建完整主题
      merge: (persisted, current) => {
        const s = persisted as Partial<ThemeState>;
        const mode = s?.mode ?? DEFAULT_THEME_MODE;
        return { ...current, ...buildTheme(mode) };
      },
    },
  ),
);

export default useThemeStore;
