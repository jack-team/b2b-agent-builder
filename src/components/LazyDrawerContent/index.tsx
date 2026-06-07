import type { FC, ReactNode } from 'react';
import { Suspense } from 'react';
import Spinner from '@/components/Spinner';
import styles from './styles.module.less';

type LazyDrawerContentProps = {
  children: ReactNode;
};

const LazyDrawerContent: FC<LazyDrawerContentProps> = ({ children }) => (
  <Suspense
    fallback={(
      <div className={styles.fallback}>
        <Spinner type="infinity-spin" />
      </div>
    )}
  >
    {children}
  </Suspense>
);

export default LazyDrawerContent;
