import { useContext, useEffect } from 'react';
import { useMemoizedFn } from 'ahooks';
import { DrawerContext } from './context';
import type { DrawerEventType } from './types';

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