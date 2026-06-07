import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { pathToRegexp } from 'path-to-regexp';
import { useLocation } from 'react-router-dom';
import { menuList, type MenuItem } from '@/configs/menus';

// 用于获取当前选中的菜单项的路径
export const useMenu = () => {
  const { pathname } = useLocation();

  const selectedKeys = useMemo(() => {
    const keys: string[] = [];

    for (const item of menuList) {
      const children = item.children || [];
      for (const child of children) {
        const path = child.path;
        const childRegexp = pathToRegexp(path, { end: false });
        if (childRegexp.test(pathname)) keys.push(path);
      }
    }
    return keys;
  }, [pathname]);

  return {
    menus: menuList,
    selectedKeys,
  };
};

/**
 * 用于获取当前选中的菜单项的面包屑
 * @returns {MenuItem[]} 面包屑列表
 */
export const useBreadcrumb = () => {
  const { t } = useTranslation();
  const { menus, selectedKeys } = useMenu();

  const breadcrumbItems = useMemo(() => {
    const items: MenuItem[] = [];
    for (const key of selectedKeys) {
      let _items: MenuItem[] = [];

      const menu = menus.find(menu => {
        const children = menu.children || [];
        _items = children.filter(child => child.path === key)
          .map(child => ({ ...child, title: t(child.title) }));
        return _items.length > 0;
      });

      if (_items.length > 0) {
        items.push({
          ...menu,
          path: '/',
          title: t(menu.title),
        }, ..._items);
      }
    }
    return items;
  }, [menus, selectedKeys]);

  return {
    breadcrumbItems,
  };
}
