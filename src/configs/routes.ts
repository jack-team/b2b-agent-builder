import type { AppPageConfig } from '@/router/types';

// 登录页面配置
export const authPage: AppPageConfig = {
  path: '/auth',
  load: () => import('@/pages/auth'),
}

// 主应用页面配置
export const mainRoutes: AppPageConfig[] = [
  {
    path: '/dashboard',
    load: () => import('@/pages/dashboard'),
  },
  {
    path: '/knowledges',
    load: () => import('@/pages/knowledges'),
  },
  {
    path: '/memories',
    load: () => import('@/pages/memories'),
  },
  {
    path: '/capabilities',
    load: () => import('@/pages/capabilities'),
  },
  {
    path: '/llm',
    load: () => import('@/pages/llm'),
  },
  {
    path: '/orchestrations',
    load: () => import('@/pages/orchestrations'),
  },
  {
    path: '/users',
    load: () => import('@/pages/users'),
  },
  {
    path: '*',
    load: () => import('@/pages/notFound'),
  }
];
