import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { MainLayout } from '@/layouts';
import RouteError from '@/components/RouteError';
import { NoAuthWrapper, AuthWrapper } from '@/components/AuthWrapper';
import { authPage, mainRoutes } from '@/configs/routes';
import { toLazyRoute } from './helper';

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <RouteError />,
    children: [
      // 登录前相关路由
      {
        element: <AuthWrapper />,
        children: [toLazyRoute(authPage)]
      },
      // 登录后相关路由
      {
        element: <NoAuthWrapper />,
        children: [{
          element: <MainLayout />,
          children: [
            {
              path: '/',
              element: <Navigate to="/dashboard" />,
            },
            ...mainRoutes.map(toLazyRoute)
          ]
        }]
      }
    ]
  }
]);

export const AppRouter = () => <RouterProvider router={router} />;

export default router;
