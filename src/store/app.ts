import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { DexieStorage } from '@/utils/dexieStorage';

type AppState = {
  menuCollapsed: boolean;
  toggleMenu: () => void;
};

const storage = new DexieStorage('app');

export const useAppStore = create(persist<AppState>(
  (set) => ({
    menuCollapsed: false,
    toggleMenu: () => set(s => ({ menuCollapsed: !s.menuCollapsed })),
  }),
  {
    name: 'app-store',
    storage: createJSONStorage(() => storage)
  }
));

export default useAppStore;