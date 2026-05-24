import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RootLayout, MainLayout } from '../layouts';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        index: true,
        Component: lazy(() => import('@/pages/auth')),
      },
      {
        path: '/auth',
        Component: lazy(() => import('@/pages/auth')),
      },
      {
        element: <MainLayout />,
        children: [
          {
            path: '/dashboard',
            Component: lazy(() => import('@/pages/dashboard')),
          },
          {
            path: '/knowledges',
            Component: lazy(() => import('@/pages/knowledges')),
          },
          {
            path: '/capabilities',
            Component: lazy(() => import('@/pages/capabilities')),
          },
          {
            path: '/llm',
            Component: lazy(() => import('@/pages/llm')),
          }
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
