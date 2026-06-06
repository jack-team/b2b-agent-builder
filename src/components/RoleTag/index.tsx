import type { FC } from 'react';
import { Tag } from 'antd';
import { useTranslation } from 'react-i18next';
import type { UserRole } from '@/bsComponents/UserConfig/types';

const roleColorMap: Record<UserRole, string> = {
  super_admin: 'error',
  admin: 'processing',
  audit_admin: 'success',
};

type RoleTagProps = {
  role: UserRole;
};

const RoleTag: FC<RoleTagProps> = ({ role }) => {
  const { t } = useTranslation();

  return <Tag color={roleColorMap[role]}>{t(`roles.${role}`)}</Tag>;
};

export default RoleTag;
