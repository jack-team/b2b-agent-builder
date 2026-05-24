import * as uuid from 'uuid';
import { useContext, useEffect, useMemo } from 'react';
import { useMemoizedFn } from 'ahooks';
import { DrawerContext } from './context';
import { useDrawerStore } from './store'
import type { DrawerEventType, CustomDrawerSize } from './types';

export const useDrawerContext = () => {
  return useContext(DrawerContext);
}

// 关闭抽屉
export const useDrawerClose = () => {
  const { emitter } = useDrawerContext();
  return useMemoizedFn(() => emitter?.emit('close'));
}

export const useListenEvent = (type: DrawerEventType, listener: () => void) => {
  const { emitter } = useDrawerContext();
  const _listener = useMemoizedFn(() => listener());

  const removeListener = useMemoizedFn(() => {
    emitter?.off(type, _listener)
  });

  useEffect(() => {
    emitter?.on(type, _listener)
    return () => removeListener();
  }, [_listener, type]);

  return removeListener;
}

export const useTopMost = (size: CustomDrawerSize) => {
  const uid = useMemo(() => uuid.v4(), []);
  const { items = [], ...actions } = useDrawerStore();

  const openDrawer = useMemoizedFn(() => {
    actions.openDrawer(uid, size);
  });

  const result = useMemo(() => {
    const i = items.findIndex(v => v.id === uid);
    const isTopMost = i === -1 || i + 1 === items.length;
    const hasShadow = isTopMost || !!items[i]?.shadow;

    return {
      isTopMost,
      hasShadow
    }
  }, [items, uid]);

  return {
    ...result,
    openDrawer,
    closeDrawer: actions.closeDrawer
  }
}