import type { FC } from 'react';
import { Suspense } from 'react';
import { Layout } from 'antd';
import AnimatedOutlet from '@/components/AnimatedOutlet';
import Spinner from '@/components/Spinner';
import LayoutHeader from './header';
import MainMenu from './menu';

const MainLayout: FC = () => {
  const renderLoading = () => (
    <div className="h-full flex items-center justify-center text-[48px] text-[var(--color-primary)]">
      <Spinner />
    </div>
  );

  return (
    <Layout className="h-full">
      <MainMenu />
      <Layout className="bg-[var(--bg-color-primary)]">
        <LayoutHeader />
        <Layout.Content>
          <Suspense fallback={renderLoading()}>
            <AnimatedOutlet />
          </Suspense>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
