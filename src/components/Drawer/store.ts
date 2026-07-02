import { create } from 'zustand';
import type { CustomDrawerSize } from './types';

/** 全局 Drawer 栈中的单个条目，用于多层嵌套时的视觉分层 */
export type ItemType = {
  id: string;
  size: CustomDrawerSize;
  /** 非顶层 Drawer 是否显示阴影（与下一层尺寸不同时隐藏，避免视觉叠加） */
  shadow: boolean;
};

/**
 * 关闭或乱序移除后，重新计算各层 shadow 状态。
 * 顶层始终 shadow=true；其余层在与下一层尺寸不同时才显示阴影。
 */
const recalculateShadows = (items: ItemType[]): ItemType[] =>
  items.map((item, index) => {
    if (index === items.length - 1) {
      return { ...item, shadow: true };
    }
    return { ...item, shadow: item.size !== items[index + 1].size };
  });

type DrawerState = {
  items: ItemType[];
  /** 路由切换时清空整个栈 */
  clear: () => void;
  closeDrawer: (id: string) => void;
  openDrawer: (id: string, size: CustomDrawerSize) => void;
};

/** 全局 Drawer 栈，协调多层嵌套时的遮罩透明度与阴影 */
export const useDrawerStore = create<DrawerState>((set) => ({
  items: [],
  clear: () => set({ items: [] }),
  openDrawer: (id, size) =>
    set((state) => {
      const items = [...state.items];
      const last = items.at(-1);

      // 新层打开时，若与当前顶层尺寸不同，则隐藏顶层阴影
      if (last) {
        items[items.length - 1] = { ...last, shadow: last.size !== size };
      }

      items.push({ id, size, shadow: true });
      return { items };
    }),
  closeDrawer: (id) =>
    set((state) => ({
      items: recalculateShadows(state.items.filter((item) => item.id !== id)),
    })),
}));

export default useDrawerStore;
