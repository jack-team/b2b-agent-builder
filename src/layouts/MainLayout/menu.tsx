import cls from 'classnames';
import { Menu, Layout, type MenuProps } from 'antd';
import { type FC, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { BaseIcons, MenuFoldOutlined, MenuUnfoldOutlined } from '@/components/BaseIcons';
import { useAppStore } from '@/store/app';
import { useThemeStore } from '@/store/theme';
import { prefetchRoute } from '@/router/helper';
import { useMenu } from './hooks';
import UserCenter from './userCenter';
import styles from './styles.module.less';

const AppMenu: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const mode = useThemeStore(s => s.mode);
  const { menus, selectedKeys } = useMenu();
  const { menuCollapsed, toggleMenu } = useAppStore();
  const sidebarWidth = useThemeStore(s => s.appTheme.sidebarWidth);

  const menuItems = useMemo(() => {
    return menus.map(item => {
      const childs = item.children || [];
      return {
        key: item.title,
        type: 'group' as const,
        label: t(item.title),
        children: childs.map(child => {
          const iconName = child.icon;
          const path = child.path || '/';
          const Icon = iconName ? BaseIcons[iconName] : null;
          return {
            key: child.path,
            label: t(child.title),
            icon: Icon ? <Icon /> : null,
            onClick: () => navigate(path),
            // 预加载路由
            onFocus: () => prefetchRoute(path),
            onMouseEnter: () => prefetchRoute(path)
          };
        }),
      }
    }) as MenuProps['items'];
  }, [menus, navigate, t]);

  return (
    <Layout.Sider
      // 侧边栏内置样式需与当前主题一致
      theme={mode}
      width={sidebarWidth}
      collapsed={menuCollapsed}
      className={cls(
        menuCollapsed && styles.collapsed,
        'border-r-[1px] border-[var(--border-color-primary)]'
      )}
    >
      <div className="h-full flex flex-col overflow-hidden">
        <div className={styles.band}>
          <img src="/logo.svg" className="h-[var(--logo-height)]" alt="logo" />
          <div className={styles.band_title}>
            {t('layout.brandName')}
          </div>
          <div className={styles.collapsed_switch} onClick={toggleMenu}>
            {menuCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
        </div>
        <Menu
          className={styles.menu}
          selectedKeys={selectedKeys}
          items={menuItems}
        />
        <UserCenter />
      </div>
    </Layout.Sider>
  );
};

export default AppMenu;
