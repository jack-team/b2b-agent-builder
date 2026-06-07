import type { FC } from 'react';
import { useOutlet } from 'react-router-dom';
import styles from './styles.module.less';

const AnimatedOutlet: FC = () => {
  const outlet = useOutlet();

  return (
    <div className={styles.page}>
      {outlet}
    </div>
  );
};

export default AnimatedOutlet;
