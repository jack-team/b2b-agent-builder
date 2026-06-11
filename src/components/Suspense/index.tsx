import React, { Suspense as ReactSuspense } from 'react';
import Spinner from '@/components/Spinner';

const Suspense: React.FC<React.PropsWithChildren> = ({ children }) => {
  const renderSpinner = () => (
    <div className="h-full grid place-items-center text-[36px]">
      <Spinner type="rotating-lines" />
    </div>
  );

  return (
    <ReactSuspense fallback={renderSpinner()}>
      {children}
    </ReactSuspense>
  );
};

export default Suspense;