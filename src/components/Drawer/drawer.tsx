import EventEmitter from 'eventemitter3';
import { Drawer as AntdDrawer } from 'antd';
import { useSafeState, useMemoizedFn } from 'ahooks';
import { type FC, cloneElement, Fragment, useMemo, useEffect } from 'react';
import type { CustomDrawerProps, DrawerEventType } from './types';
import { DrawerContext } from './context';
import styles from './styles.module.less';

const Drawer: FC<CustomDrawerProps> = (props) => {
  const { trigger, closable = false, children, ...rest } = props;

  const [open, setOpen] = useSafeState(false);
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

  return (
    <Fragment>
      <AntdDrawer
        {...rest}
        open={open}
        onClose={onClose}
        destroyOnHidden
        push={{ distance: 100 }}
        rootClassName={styles.drawer}
        afterOpenChange={afterOpenChange}
        mask={{ closable: false, blur: false }}
      >
        <DrawerContext.Provider value={{ emitter }}>
          {children}
        </DrawerContext.Provider>
      </AntdDrawer>
      {triggerElement}
    </Fragment>
  )
};

export default Drawer;

export { default as DrawerContainer } from './container';
export * from './hooks';
