import type { FC } from 'react';
import { Suspense } from 'react';
import { Button } from 'antd';
import { Outlet } from 'react-router-dom';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import Spinner from '@/components/Spinner';
import { useAppStore } from '@/store/app';
import MainMenu from './menu';

const MainLayout: FC = () => {
  const { menuCollapsed, toggleMenu } = useAppStore();

  const renderLoading = () => (
    <div className="h-full flex items-center justify-center text-[160px]">
      <Spinner type="infinity-spin" />
    </div>
  );

  return (
    <div className="h-full flex">
      <MainMenu collapsed={menuCollapsed} />
      <div className="flex-1 h-full bg-[var(--bg-color-primary)] flex flex-col">
        <div className="h-[60px] bg-[#fff] flex items-center px-[16px]">
          <Button
            type="text"
            size="large"
            onClick={toggleMenu}
            icon={menuCollapsed ?
              <MenuUnfoldOutlined /> :
              <MenuFoldOutlined />
            }
          />
        </div>
        <div className="flex-1 overflow-auto">
          <Suspense fallback={renderLoading()}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
