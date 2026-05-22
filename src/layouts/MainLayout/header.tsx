import type { FC } from 'react';
import { Button, Layout, Avatar } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useAppStore } from '@/store/app';

const LayoutHeader: FC = () => {
  const { menuCollapsed, toggleMenu } = useAppStore();
  return (
    <Layout.Header className="flex items-center justify-between border-b border-[var(--border-color-primary)]">
      <Button type="text" onClick={toggleMenu} size="large">
        {menuCollapsed ?
          <MenuFoldOutlined /> :
          <MenuUnfoldOutlined />
        }
      </Button>
      <div className="flex items-center gap-[6px] cursor-pointer">
        <Avatar size={28} src="https://picsum.photos/seed/picsum/200/300" />
        <div className="text-[14px]">
          test1223@qq.com
        </div>
      </div>
    </Layout.Header>
  );
}

export default LayoutHeader;