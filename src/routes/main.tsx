import { lazy } from 'react';
import { type RouteObject, Navigate } from 'react-router-dom';


export const mainRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/dashboard" />,
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
    path: '/capabilities',
    Component: lazy(() => import('@/pages/capabilities')),
  },
  {
    path: '/llm',
    Component: lazy(() => import('@/pages/llm')),
  },
  {
    path: '/users',
    Component: lazy(() => import('@/pages/users')),
  },
  {
    path: '*',
    Component: lazy(() => import('@/pages/notFound'))
  }
];
