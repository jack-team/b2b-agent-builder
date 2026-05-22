import { type FC } from 'react';
import { Menu, Layout } from 'antd';
import { useNavigate, Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '@/store/app';
import { useMenu } from './hooks';
import { icons } from './icons';

import styles from './styles.module.less';

const AppMenu: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { menuCollapsed } = useAppStore();
  const { menus, selectedKeys } = useMenu();

  return (
    <Layout.Sider
      theme="light"
      className="px-[4px] border-r-[1px] border-[var(--border-color-primary)]"
      collapsed={menuCollapsed}
    >
      <div className="flex items-center justify-center h-[64px]">
        <Link to="/dashboard">
          <img src="/favicon.svg" className="h-[24px]" alt="logo" />
        </Link>
      </div>
      <Menu
        mode="inline"
        className={styles.menus}
        selectedKeys={selectedKeys}
        items={menus.map(item => {
          const iconName = item.icon as keyof typeof icons;
          const Icon = icons[iconName] as FC;
          return {
            key: item.path,
            label: t(item.title),
            icon: Icon ? <Icon /> : null,
            onClick: () => navigate(item.path),
          };
        })}
      />
    </Layout.Sider>
  );
};

export default AppMenu;
