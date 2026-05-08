import { useMemo } from 'react';
import { pathToRegexp } from 'path-to-regexp';
import { useLocation } from 'react-router-dom';
import menus from '@/configs/menu-configs.json';

// 用于获取当前选中的菜单项的路径
export const useMenu = () => {
  const { pathname } = useLocation();

  const selectedKeys = useMemo(() => {
    const keys: string[] = [];
    for (const item of menus) {
      const regexp = pathToRegexp(item.path, { end: false });
      if (regexp.test(pathname)) keys.push(item.path);
    }
    return keys;
  }, [pathname]);

  return {
    menus,
    selectedKeys,
  };
};
