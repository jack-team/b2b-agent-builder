import type { UserRecord, UserRole } from '@/bsComponents/UserConfig/types';
import type {
  AssignableRole,
  EffectivePermission,
  OperationLogItem,
  UserDetailData,
} from './types';

const detailDefaults: Record<string, Partial<UserDetailData>> = {
  '1': {
    phone: '13800138000',
    jobTitle: 'Senior Software Engineer',
    department: 'Development',
    merchantLabel: 'Shopify Inc.',
    lastLoginAt: '05/08/2026 09:12:51',
    lastLoginIp: '47.231.9.177',
    mfa: 'Enabled',
    createdAt: '04/23/2026 15:32:14',
    assignedRoles: ['super_admin'],
  },
  '2': {
    phone: '13900139000',
    jobTitle: 'Product Manager',
    department: 'Product',
    merchantLabel: 'Shopify Inc.',
    lastLoginAt: '05/07/2026 14:20:10',
    lastLoginIp: '47.231.9.178',
    mfa: 'Enabled',
    createdAt: '04/20/2026 10:15:00',
    assignedRoles: ['admin'],
  },
  '3': {
    phone: '13700137000',
    jobTitle: 'Audit Specialist',
    department: 'Operations',
    merchantLabel: 'Shopify Inc.',
    lastLoginAt: '05/05/2026 08:45:33',
    lastLoginIp: '47.231.9.179',
    mfa: 'Disabled',
    createdAt: '04/18/2026 09:00:00',
    assignedRoles: ['audit_admin'],
  },
};

export const toUserDetailData = (record: UserRecord): UserDetailData => {
  const defaults = detailDefaults[record.key] ?? {};
  return {
    ...record,
    phone: record.phone ?? defaults.phone ?? '',
    jobTitle: record.jobTitle ?? defaults.jobTitle ?? '',
    department: record.department ?? defaults.department ?? '',
    merchantLabel: defaults.merchantLabel ?? record.merchant,
    lastLoginAt: defaults.lastLoginAt ?? `${record.lastLogin} 00:00:00`,
    lastLoginIp: defaults.lastLoginIp ?? '—',
    mfa: defaults.mfa ?? 'Enabled',
    createdAt: defaults.createdAt ?? '—',
    assignedRoles: defaults.assignedRoles ?? [record.role],
  };
};

export const assignableRoles: AssignableRole[] = [
  { key: 'super_admin', label: 'Super Admin', dotColor: '#ef4444' },
  { key: 'system_admin', label: 'System Admin', dotColor: '#8b5cf6' },
  { key: 'security_admin', label: 'Security Admin', dotColor: '#f59e0b' },
  { key: 'audit_admin', label: 'Audit Admin', dotColor: '#22c55e' },
  { key: 'admin', label: 'Admin', dotColor: '#3b82f6' },
  { key: 'cto', label: 'CTO', dotColor: '#06b6d4' },
];

export const effectivePermissions: EffectivePermission[] = [
  {
    key: '1',
    resource: 'merchants',
    operations: ['C', 'R', 'U', 'D'],
    sourceRole: 'System Admin',
  },
  {
    key: '2',
    resource: 'Knowledges',
    operations: ['R', 'U'],
    sourceRole: 'Audit Admin',
  },
  {
    key: '3',
    resource: 'Capabilities',
    operations: ['R'],
    sourceRole: 'Admin',
  },
  {
    key: '4',
    resource: 'users',
    operations: ['C', 'R', 'U'],
    sourceRole: 'System Admin',
  },
];

export const operationLogs: OperationLogItem[] = [
  {
    key: '1',
    content: 'Login',
    time: '05/08/2026 09:24:51',
    color: 'blue',
  },
  {
    key: '2',
    content: 'Personal email has been updated',
    time: '05/05/2026 16:37:05',
    color: 'orange',
  },
  {
    key: '3',
    content: 'Password changed successfully',
    time: '05/01/2026 11:01:13',
    color: 'orange',
  },
  {
    key: '4',
    content: "Role 'Admin' removed successfully",
    time: '05/01/2026 10:45:17',
    color: 'red',
  },
];

export const getInitials = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

export const isRoleKey = (key: string): key is UserRole =>
  key === 'super_admin' || key === 'admin' || key === 'audit_admin';
