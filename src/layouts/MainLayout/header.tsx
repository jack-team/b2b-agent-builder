import { type FC } from 'react';
import { Button, Layout  } from 'antd';
import { useAppStore } from '@/store/app';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import UserCenter from './userCenter';

const LayoutHeader: FC = () => {
  const { menuCollapsed, toggleMenu } = useAppStore();

  return (
    <Layout.Header className="flex items-center justify-between border-b border-[var(--border-color-primary)]">
      <Button type="text" onClick={toggleMenu} size="large">
        {menuCollapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
      </Button>
      <UserCenter />
    </Layout.Header>
  );
}

export default LayoutHeader;