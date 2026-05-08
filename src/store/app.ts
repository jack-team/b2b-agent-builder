import { create } from 'zustand';

type AppState = {
  menuCollapsed: boolean;
  toggleMenu: () => void;
  setMenuCollapsed: (s: boolean) => void;
};

export const useAppStore = create<AppState>((set, get) => ({
  menuCollapsed: false,
  setMenuCollapsed: s => set({ menuCollapsed: s }),
  toggleMenu: () => set({ menuCollapsed: !get().menuCollapsed }),
}));

export default useAppStore;