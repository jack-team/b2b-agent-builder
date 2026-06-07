import type { FC } from 'react';
import { Layout } from 'antd';
import Suspense from '@/components/Suspense';
import AnimatedOutlet from '@/components/AnimatedOutlet';
import LayoutHeader from './header';
import MainMenu from './menu';

const MainLayout: FC = () => {
  return (
    <Layout className="h-full">
      <MainMenu />
      <Layout className="bg-[var(--bg-color-primary)]">
        <LayoutHeader />
        <Layout.Content>
          <Suspense>
            <AnimatedOutlet />
          </Suspense>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
