import { lazy } from 'react';
import { type RouteObject } from 'react-router-dom';
import { mainRoutes } from '@/configs/routes';
import type { AppPageConfig, PageLoader } from './types';



// 将页面配置转换为路由配置
export const toLazyRoute = (page: AppPageConfig): RouteObject => ({
  path: page.path,
  Component: lazy(page.load),
});


// 根据路径缓存页面
export const prefetchRoute = (() => {
  const prefetchers = mainRoutes.reduce((acc, page) => {
    return { ...acc, [page.path]: page.load };
  }, {} as Record<string, PageLoader>);
  
  return (path: string) => prefetchers[path]?.();
})();
