import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RootLayout, MainLayout } from '../layouts';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            index: true,
            Component: lazy(() => import('@/pages/dashboard')),
          },
          {
            path: '/dashboard',
            Component: lazy(() => import('@/pages/dashboard')),
          },
          {
            path: '/knowledges',
            Component: lazy(() => import('@/pages/knowledges')),
          },
          {
            path: '/memories',
            Component: lazy(() => import('@/pages/memories')),
          },
          {
            path: '/capabilities',
            Component: lazy(() => import('@/pages/capabilities')),
          },
          {
            path: '/llm',
            Component: lazy(() => import('@/pages/llm')),
          },
          {
            path: '/orchestrations',
            Component: lazy(() => import('@/pages/orchestrations')),
          },
          {
            path: '/merchants',
            Component: lazy(() => import('@/pages/merchants')),
          },
          {
            path: '/users',
            Component: lazy(() => import('@/pages/users')),
          },
          {
            path: '/permissions',
            Component: lazy(() => import('@/pages/permissions')),
          },
          {
            path: '/monitoring',
            Component: lazy(() => import('@/pages/monitoring')),
          },
          {
            path: '/system-setting',
            Component: lazy(() => import('@/pages/systemSetting')),
          },
          {
            path: '/workspace',
            Component: lazy(() => import('@/pages/workspace')),
          },
        ],
      },
      {
        path: '*',
        Component: lazy(() => import('@/pages/notFound')),
      },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default router;
