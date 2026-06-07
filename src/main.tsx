import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './i18n';
import './global.css';
import App from './App';
import Spinner from '@/components/Spinner';

createRoot(document.getElementById('root')!).render(
  <Suspense
    fallback={(
      <div className="h-[100vh] flex items-center justify-center text-[48px] text-[var(--color-primary)]">
        <Spinner />
      </div>
    )}
  >
    <App />
  </Suspense>,
);
