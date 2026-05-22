import type { FC } from 'react';
import { Suspense } from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Spinner from '@/components/Spinner';
import LayoutHeader from './header';
import MainMenu from './menu';

const MainLayout: FC = () => {
  const renderLoading = () => (
    <div className="h-full flex items-center justify-center text-[160px]">
      <Spinner type="infinity-spin" />
    </div>
  );

  return (
    <Layout className="h-full">
      <MainMenu />
      <Layout className="bg-[var(--bg-color-primary)]">
        <LayoutHeader />
        <Layout.Content className="overflow-y-auto">
          <Suspense fallback={renderLoading()}>
            <Outlet />
          </Suspense>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
