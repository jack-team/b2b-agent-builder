import type { UserRecord, UserRole } from '@/bsComponents/UserConfig/types';

export type PermissionOperation = 'C' | 'R' | 'U' | 'D';

export interface EffectivePermission {
  key: string;
  resource: string;
  operations: PermissionOperation[];
  sourceRole: string;
}

export interface OperationLogItem {
  key: string;
  content: string;
  time: string;
  color: 'blue' | 'orange' | 'red' | 'green' | 'gray';
}

export interface AssignableRole {
  key: string;
  label: string;
  dotColor: string;
}

export interface UserDetailData extends UserRecord {
  phone: string;
  jobTitle: string;
  department: string;
  merchantLabel: string;
  lastLoginAt: string;
  lastLoginIp: string;
  mfa: string;
  createdAt: string;
  assignedRoles: UserRole[];
}

export interface UserDetailProps {
  record: UserRecord;
  onClose?: () => void;
}
