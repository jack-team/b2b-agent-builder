import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { NoAuthWrapper, AuthWrapper } from '@/components/AuthWrapper';
import RouteError from '@/components/RouteError';
import { MainLayout } from '@/layouts';
import { mainRoutes } from './main';

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <RouteError />,
    children: [
      {
        path: '/',
        element: <NoAuthWrapper />,
        children: [{
          path: '/',
          element: <MainLayout />,
          children: mainRoutes
        }]
      },
      {
        path: '/',
        element: <AuthWrapper />,
        children: [{
          path: '/auth',
          Component: lazy(() => import('@/pages/auth'))
        }]
      },
      {
        path: '*',
        Component: lazy(() => import('@/pages/notFound'))
      }
    ]
  }
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default router;
