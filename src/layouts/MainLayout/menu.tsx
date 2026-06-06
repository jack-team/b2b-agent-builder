import { type FC } from 'react';
import cls from 'classnames';
import { Menu, Layout } from 'antd';
import { useNavigate, Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '@/store/app';
import { useMenu } from './hooks';
import { icons, type IconNameType } from './icons';
import styles from './styles.module.less';

const AppMenu: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { menuCollapsed } = useAppStore();
  const { menus, selectedKeys } = useMenu();

  return (
    <Layout.Sider
      theme="light"
      width={240}
      collapsed={menuCollapsed}
      className={cls(
        menuCollapsed && styles.menu_collapsed,
        'border-r-[1px] border-[var(--border-color-primary)]'
      )}
    >
      <div className="h-full flex flex-col">
        <div className={styles.band}>
          <img src="/favicon.svg" className="h-[36px]" alt="logo" />
          <div className={styles.band_title}>
            B2B Agent Builder
          </div>
        </div>
        <Menu
          className={cls('flex-1 border-none!', styles.menu)}
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
      </div>
    </Layout.Sider>
  );
};

export default AppMenu;
