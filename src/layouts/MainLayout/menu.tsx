import { type FC } from 'react';
import cls from 'classnames';
import { Menu, Layout } from 'antd';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useAppStore } from '@/store/app';
import { useMenu } from './hooks';
import { icons, type IconNameType } from './icons';
import UserCenter from './userCenter';
import styles from './styles.module.less';

const AppMenu: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { menuCollapsed, toggleMenu } = useAppStore();
  const { menus, selectedKeys } = useMenu();

  return (
    <Layout.Sider
      theme="light"
      width={240}
      collapsed={menuCollapsed}
      className={cls(
        menuCollapsed && styles.collapsed,
        'border-r-[1px] border-[var(--border-color-primary)]'
      )}
    >
      <div className="h-full flex flex-col overflow-hidden">
        <div className={styles.band}>
          <img src="/favicon.svg" className="h-[36px]" alt="logo" />
          <div className={styles.band_title}>
            {t('layout.brandName')}
          </div>
          <div className={styles.collapsed_switch} onClick={toggleMenu}>
            {menuCollapsed ? <MenuUnfoldOutlined  /> : <MenuFoldOutlined />}
          </div>
        </div>
        <Menu
          className={styles.menu}
          selectedKeys={selectedKeys}
          items={menus.map(item => {
            return {
              key: item.title,
              type: 'group',
              label: t(item.title),
              children: item.children.map(child => {
                const Icon = icons[child.icon as IconNameType];
                return {
                  key: child.path,
                  icon: <Icon />,
                  label: t(child.title),
                  onClick: () => navigate(child.path),
                };
              }),
            };
          })}
        />
        <UserCenter />
      </div>
    </Layout.Sider>
  );
};

export default AppMenu;
