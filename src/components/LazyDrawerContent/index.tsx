import type { FC, PropsWithChildren } from 'react';
import Suspense from '@/components/Suspense';

const LazyDrawerContent: FC<PropsWithChildren> = (props) => (
  <Suspense>{props.children}</Suspense>
);

export default LazyDrawerContent;
