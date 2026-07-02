import cls from 'classnames';
import EventEmitter from 'eventemitter3';
import { Drawer as AntdDrawer } from 'antd';
import { useSafeState, useMemoizedFn, useUpdateEffect, useUnmount } from 'ahooks';
import {
  type FC,
  type MouseEvent,
  cloneElement,
  useMemo,
  useEffect,
  useRef,
} from 'react';
import { useLocation } from 'react-router-dom';
import type { CustomDrawerProps, DrawerEventType } from './types';
import { DrawerContext } from './context';
import { useTopMost } from './hooks';
import styles from './styles.module.less';

/**
 * 命令式触发的 Drawer 封装。
 *
 * 架构：
 * - 本地 open 状态驱动 Ant Design Drawer 显隐
 * - Zustand 全局栈（useTopMost）协调多层嵌套的遮罩/阴影
 * - EventEmitter（Context）供 DrawerContainer 等子组件触发关闭
 */
const Drawer: FC<CustomDrawerProps> = (props) => {
  const {
    trigger,
    children,
    size = 'large',
    closable = false,
    ...rest
  } = props;

  const { pathname } = useLocation();
  const [open, setOpen] = useSafeState(false);
  const { isTopMost, hasShadow, openDrawer, closeDrawer } = useTopMost(size);
  const emitter = useMemo(() => new EventEmitter<DrawerEventType>(), []);
  const openRef = useRef(open);

  // 缓存 open 状态
  openRef.current = open;

  const onOpen = useMemoizedFn(() => setOpen(true));
  const onClose = useMemoizedFn(() => setOpen(false));

  const afterOpenChange = useMemoizedFn((nextOpen: boolean) => {
    emitter.emit(nextOpen ? 'afterOpen' : 'afterClose');
  });

  const triggerElement = useMemo(() => {
    const triggerOnClick = trigger.props.onClick as
      | ((event: MouseEvent<HTMLElement>) => void)
      | undefined;

    // 保留 trigger 原有 onClick，仅在未被 preventDefault 时打开 Drawer
    return cloneElement(trigger, {
      onClick: (event: MouseEvent<HTMLElement>) => {
        triggerOnClick?.(event);
        if (!event.defaultPrevented) {
          onOpen();
        }
      },
    });
  }, [trigger, onOpen]);

  const contextValue = useMemo(() => ({ emitter }), [emitter]);

  // 子组件通过 emitter.emit('close') 关闭时，同步本地 open 状态
  useEffect(() => {
    emitter.on('close', onClose);
    return () => {
      emitter.off('close', onClose);
    };
  }, [emitter, onClose]);

  // open 变化时同步全局栈（遮罩/阴影依赖栈状态）
  useUpdateEffect(() => {
    if (open) {
      openDrawer();
    } else {
      closeDrawer();
    }
  }, [open]);

  // 路由切换时关闭 Drawer
  useUpdateEffect(() => {
    setOpen(false);
  }, [pathname]);

  // 组件卸载时若仍打开，从全局栈中移除，避免残留
  useUnmount(() => {
    if (openRef.current) {
      closeDrawer();
    }
  });

  return (
    <DrawerContext.Provider value={contextValue}>
      <AntdDrawer
        {...rest}
        open={open}
        onClose={onClose}
        destroyOnHidden
        closable={closable}
        push={{ distance: 0 }}
        afterOpenChange={afterOpenChange}
        size={`var(--drawer-width-${size})`}
        mask={{ closable: true, blur: true }}
        rootClassName={cls(
          styles.drawer,
          !isTopMost && styles.transparent,
          !hasShadow && styles.no_shadow,
        )}
      >
        {children}
      </AntdDrawer>
      {triggerElement}
    </DrawerContext.Provider>
  );
};

export default Drawer;

export { default as DrawerContainer } from './container';
export * from './hooks';
