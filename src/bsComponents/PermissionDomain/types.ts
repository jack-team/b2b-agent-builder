export type DomainStatKey = 'privateMemory' | 'sharedDomain' | 'publicDomain';

export interface DomainStatItem {
  key: DomainStatKey;
  value: number;
  action: 'rules' | 'manage';
}

export interface QuotaAlertItem {
  key: string;
  type: 'warning' | 'info' | 'success';
  userId?: string;
  usagePercent?: number;
  interceptionCount?: number;
}

export interface UserQuotaRecord {
  key: string;
  userId: string;
  userName: string;
  quota: number;
  usedQuota: number;
  usagePercent: number;
  interceptionCount: number;
}

export interface PermissionDomainProps {
  onClose?: () => void;
}
