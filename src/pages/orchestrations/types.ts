import type { BaseRecord, EnableStatus } from '@/types/common';

export type OrchestrationStatus = EnableStatus;

export interface OrchestrationRecord extends BaseRecord {
  name: string;
  description: string;
  updatedAt: string;
  status: OrchestrationStatus;
}
