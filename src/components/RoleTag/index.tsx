import type { FC } from 'react';
import { Tag } from 'antd';
import type { UserRole } from '@/bsComponents/UserConfig/types';

const roleConfig: Record<
  UserRole,
  { label: string; color: string }
> = {
  super_admin: { label: 'Super Admin', color: 'error' },
  admin: { label: 'Admin', color: 'processing' },
  audit_admin: { label: 'Audit Admin', color: 'success' },
};

type RoleTagProps = {
  role: UserRole;
};

const RoleTag: FC<RoleTagProps> = ({ role }) => {
  const { label, color } = roleConfig[role];
  return <Tag color={color}>{label}</Tag>;
};

export default RoleTag;
