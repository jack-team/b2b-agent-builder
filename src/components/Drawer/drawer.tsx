import cls from 'classnames';
import EventEmitter from 'eventemitter3';
import { Drawer as AntdDrawer } from 'antd';
import { useSafeState, useMemoizedFn, useUpdateEffect } from 'ahooks';
import { type FC, cloneElement, useMemo, useEffect } from 'react';
import type { CustomDrawerProps, DrawerEventType } from './types';
import { DrawerContext } from './context';
import { useTopMost } from './hooks';
import styles from './styles.module.less';

const Drawer: FC<CustomDrawerProps> = (props) => {
  const {
    trigger,
    children,
    size = 'large',
    closable = false,
    ...rest
  } = props;

  const [open, setOpen] = useSafeState(false);
  const { isTopMost, hasShadow, ...actions } = useTopMost(size);
  const emitter = useMemo(() => new EventEmitter<DrawerEventType>(), []);

  const onOpen = useMemoizedFn(() => setOpen(true));
  const onClose = useMemoizedFn(() => setOpen(false));

  const afterOpenChange = useMemoizedFn((open: boolean) => {
    emitter.emit(open ? 'afterOpen' : 'afterClose');
  });

  const triggerElement = useMemo(() => {
    return cloneElement(trigger, { onClick: onOpen })
  }, [trigger, onOpen]);

  useEffect(() => {
    emitter.on('close', onClose);
    return () => {
      emitter.off('close', onClose);
    }
  }, [emitter]);

  useUpdateEffect(() => {
    if (open) {
      actions.openDrawer();
    } else {
      actions.closeDrawer();
    }
  }, [open]);

  return (
    <DrawerContext.Provider value={{ emitter, isRoot: false }}>
      <AntdDrawer
        {...rest}
        open={open}
        onClose={onClose}
        destroyOnHidden
        push={{ distance: 0 }}
        afterOpenChange={afterOpenChange}
        size={`var( --drawer-width-${size})`}
        mask={{ closable: false, blur: false }}
        rootClassName={cls(
          styles.drawer, 
          !isTopMost && styles.transparent,
          !hasShadow && styles.no_shadow
        )}
      >
        {children}
      </AntdDrawer>
      {triggerElement}
    </DrawerContext.Provider>
  )
};

export default Drawer;

export { default as DrawerContainer } from './container';
export * from './hooks';
