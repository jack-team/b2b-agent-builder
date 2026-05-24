import type { FC, PropsWithChildren } from 'react';
import { useMemoizedFn } from 'ahooks';
import { useDrawerClose } from './hooks';
import Spinner from '@/components/Spinner';
import type { DrawerContainerProps } from './types';
import IconBack from '@/assets/icon_back.svg?react';
import styles from './styles.module.less';

const DrawerContainer: FC<PropsWithChildren<DrawerContainerProps>> = (props) => {
  const { onCloseBefore, loading = false } = props;
  const closeDrawer = useDrawerClose();

  const handleClose = useMemoizedFn(async () => {
    const isClose = await onCloseBefore?.() ?? true;
    if (isClose) closeDrawer();
  })

  return (
    <div className={styles.drawer_container}>
      <div className={styles.drawer_header}>
        <div className={styles.drawer_header_back} onClick={handleClose}>
          <IconBack onClick={props.onClose} />
        </div>
        <div className={styles.drawer_header_title}>{props.title}</div>
        <div className={styles.drawer_header_extra}>{props.extra}</div>
      </div>
      <div className={styles.drawer_content}>
        <div className={styles.drawer_content_children}>
          {props.children}
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