import type { FC } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useUserStore } from '@/store/user';

export const NoAuthWrapper: FC = () => {
  const user = useUserStore(s => s.user);
  console.log(user)
  return user ? <Outlet /> : <Navigate to="/auth" replace />;
}

export const AuthWrapper: FC = () => {
  const user = useUserStore(s => s.user);
  return !user ? <Outlet /> : <Navigate to="/" replace />;
}