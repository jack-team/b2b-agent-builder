import type { ReactNode } from 'react';

export type SharedDomainRuleKey =
  | 'boundToGroupId'
  | 'memberConfig'
  | 'outsideBlocked'
  | 'crossUserSharing';

export type SharedDomainFlowStepKey =
  | 'userRequest'
  | 'groupMemberVerification'
  | 'memoryRecall';

export type SharingGroupKey = 'sales' | 'customerService' | 'marketing';

export type GroupMemberRole = 'leader' | 'member';

export interface SharedDomainRuleItem {
  key: SharedDomainRuleKey;
  icon: ReactNode;
}

export interface SharedDomainFlowStep {
  key: SharedDomainFlowStepKey;
  step: number;
}

export interface GroupMember {
  key: string;
  name: string;
  role: GroupMemberRole;
  avatarColor: string;
  removable?: boolean;
}

export interface SharingGroup {
  key: SharingGroupKey;
  memberCount: number;
  members: GroupMember[];
}

export interface SharedDomainProps {
  onClose?: () => void;
}

export interface GroupCardProps {
  group: SharingGroup;
}
