import type { FC, PropsWithChildren } from 'react';
import { useMemoizedFn } from 'ahooks';
import { useDrawerClose } from './hooks';
import Spinner from '@/components/Spinner';
import type { DrawerContainerProps } from './types';
import { IconBack } from '@/components/BaseIcons';

import styles from './styles.module.less';

/**
 * Drawer 内容区标准布局（Header + Content）。
 * 必须作为 Drawer 的 children 使用，以便通过 Context 触发关闭。
 */
const DrawerContainer: FC<PropsWithChildren<DrawerContainerProps>> = (props) => {
  const { onCloseBefore, loading = false, onClose, title, extra, children } = props;
  const closeDrawer = useDrawerClose();

  const handleClose = useMemoizedFn(async () => {
    const shouldClose = (await onCloseBefore?.()) ?? true;
    if (shouldClose) {
      closeDrawer();
      onClose?.();
    }
  });

  return (
    <div className={styles.drawer_container}>
      <div className={styles.drawer_header}>
        <button
          type="button"
          className={styles.drawer_header_back}
          onClick={handleClose}
          aria-label="Back"
        >
          <IconBack />
        </button>
        <div className={styles.drawer_header_title}>{title}</div>
        <div className={styles.drawer_header_extra}>{extra}</div>
      </div>
      <div className={styles.drawer_content}>
        <div className={styles.drawer_content_children}>
          {children}
        </div>
        {loading && (
          <div className={styles.drawer_loading}>
            <Spinner type="rotating-lines" />
          </div>
        )}
      </div>
    </div>
  );
};

export default DrawerContainer;
