import { create } from 'zustand';

export type ItemType = {
  id: string;
  size: string;
  shadow: boolean;
}

type DrawerState = {
  items: ItemType[];
  closeDrawer: () => void;
  openDrawer: (id: string, size: string) => void;
};

export const useDrawerStore = create<DrawerState>((set, get) => ({
  items: [],
  openDrawer: (id, size) => {
    const { items } = get();
    const laster = items[items.length - 1];

    if (laster) {
      laster.shadow = laster.size !== size;
    }

    items.push({ id, size, shadow: true });

    set({ items: [...items] });
  },
  closeDrawer: () => {
    const { items } = get();
    items.pop();

    const lasterIndex = items.length - 1;
    const laster = items[lasterIndex];


    if (laster) {
      laster.shadow = true;
      
      const lasterPrevIndex = lasterIndex - 1;
      const lasterPrev = items[lasterPrevIndex];

      if (lasterPrev) {
        lasterPrev.shadow = lasterPrev.size !== laster.size;
      }
    }

    set({ items: [...items] });
  }
}));

export default useDrawerStore;