import type { ReactNode } from 'react';

export interface PublicDomainRuleItem {
  key:
    | 'globalVisibility'
    | 'superAdminsOnly'
    | 'generalKnowledgeRepository'
    | 'approvalRequiredForPublishing';
  icon: ReactNode;
}

export interface PublicDomainFlowStep {
  key: 'createMemory' | 'contentReview' | 'complianceCheck' | 'officialPublishing';
  step: number;
}

export interface PendingApprovalItem {
  key: string;
  title: string;
  applicant: string;
  submittedAt: string;
  categoryKey: 'policiesRegulations' | 'businessProcesses' | 'marketingStrategy';
}

export interface PublishedKnowledgeItem {
  key: string;
  title: string;
  description: string;
  visitCount: number;
  updatedAt: string;
}

export interface PublicDomainProps {
  onClose?: () => void;
}
