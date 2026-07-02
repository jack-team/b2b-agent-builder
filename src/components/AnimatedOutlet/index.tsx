import type { FC } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './styles.module.less';

const AnimatedOutlet: FC = () => {
  return (
    <div className={styles.page}>
      <Outlet />
    </div>
  );
};

export default AnimatedOutlet;
