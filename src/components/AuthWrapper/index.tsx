import type { FC } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useUserStore } from '@/store/user';

// 未登录时，显示登录页面
export const NoAuthWrapper: FC = () => {
  const user = useUserStore(s => s.user);
  return user ? <Outlet /> : <Navigate to="/auth" replace />;
}

// 已登录时，显示主页面
export const AuthWrapper: FC = () => {
  const user = useUserStore(s => s.user);
  return !user ? <Outlet /> : <Navigate to="/" replace />;
}