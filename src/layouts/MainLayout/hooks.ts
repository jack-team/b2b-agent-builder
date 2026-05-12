import { useMemo } from 'react';
import { pathToRegexp } from 'path-to-regexp';
import { useLocation } from 'react-router-dom';
import { menuList } from '@/configs/menu-list';

// 用于获取当前选中的菜单项的路径
export const useMenu = () => {
  const { pathname } = useLocation();

  const selectedKeys = useMemo(() => {
    const keys: string[] = [];
    for (const item of menuList) {
      const regexp = pathToRegexp(item.path, { end: false });
      if (regexp.test(pathname)) keys.push(item.path);
    }
    return keys;
  }, [pathname]);

  return {
    menus: menuList,
    selectedKeys,
  };
};
