import type { ReactNode } from 'react';

export type PermissionStatus = 'allowed' | 'forbidden' | 'approvalRequired';

export type PermissionMatrixRowKey =
  | 'view'
  | 'create'
  | 'modify'
  | 'delete'
  | 'export'
  | 'transfer';

export interface PrivateDomainRuleItem {
  key: 'autoBindUserId' | 'crossDomainForbidden' | 'accessibleOnlyToUser' | 'automaticPrivacyMasking';
  icon: ReactNode;
}

export interface PrivateDomainFlowStep {
  key: 'userRequest' | 'permissionVerification' | 'desensitization' | 'memoryRecall';
  step: number;
}

export interface PermissionMatrixRow {
  key: PermissionMatrixRowKey;
  user: PermissionStatus;
  administrator: PermissionStatus;
  superAdministrator: PermissionStatus;
}

export interface PrivateDomainProps {
  onClose?: () => void;
}
