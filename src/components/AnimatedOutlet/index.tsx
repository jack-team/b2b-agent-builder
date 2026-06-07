import type { FC } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import styles from './styles.module.less';

const AnimatedOutlet: FC = () => {
  const { pathname} = useLocation();

  return (
    <div key={pathname} className={styles.page}>
      <Outlet />
    </div>
  );
};

export default AnimatedOutlet;
