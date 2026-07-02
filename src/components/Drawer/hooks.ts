import * as uuid from 'uuid';
import { useContext, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useMemoizedFn, useUpdateEffect } from 'ahooks';
import { DrawerContext } from './context';
import { useDrawerStore } from './store';
import type { DrawerEventType, CustomDrawerSize } from './types';

export const useDrawerContext = () => {
  return useContext(DrawerContext);
};

/** 供 DrawerContainer 等子组件触发关闭，通过 EventEmitter 通知外层 Drawer 同步 open 状态 */
export const useDrawerClose = () => {
  const { emitter } = useDrawerContext();
  return useMemoizedFn(() => emitter?.emit('close'));
};

/** 监听 Drawer 生命周期事件（打开/关闭动画结束后触发） */
export const useListenEvent = (type: DrawerEventType, listener: () => void) => {
  const { emitter } = useDrawerContext();
  const _listener = useMemoizedFn(() => listener());

  const removeListener = useMemoizedFn(() => {
    emitter?.off(type, _listener);
  });

  useEffect(() => {
    emitter?.on(type, _listener);
    return () => removeListener();
  }, [emitter, _listener, removeListener, type]);

  return removeListener;
};

/**
 * 管理单个 Drawer 实例在全局栈中的位置与视觉状态。
 * 每个实例持有唯一 uid，用于精确入栈/出栈。
 */
export const useTopMost = (size: CustomDrawerSize) => {
  const uid = useMemo(() => uuid.v4(), []);
  const { pathname } = useLocation();
  const items = useDrawerStore((state) => state.items);
  const openDrawerAction = useDrawerStore((state) => state.openDrawer);
  const closeDrawerAction = useDrawerStore((state) => state.closeDrawer);
  const clear = useDrawerStore((state) => state.clear);

  const openDrawer = useMemoizedFn(() => {
    openDrawerAction(uid, size);
  });

  const closeDrawer = useMemoizedFn(() => {
    closeDrawerAction(uid);
  });

  const result = useMemo(() => {
    const i = items.findIndex((v) => v.id === uid);
    // 未入栈或位于栈顶时，显示遮罩
    const isTopMost = i === -1 || i + 1 === items.length;
    // 非顶层且与下一层同尺寸时，隐藏阴影以减少叠加感
    const hasShadow = isTopMost || !!items[i]?.shadow;

    return {
      isTopMost,
      hasShadow,
    };
  }, [items, uid]);

  // 路由切换时重置栈，配合 Drawer 内部的 setOpen(false) 关闭所有实例
  useUpdateEffect(() => clear(), [pathname]);

  return {
    ...result,
    openDrawer,
    closeDrawer,
  };
};
