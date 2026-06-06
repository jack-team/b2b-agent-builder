export type OrchestrationStatus = 'enabled' | 'disabled';

export interface OrchestrationRecord {
  key: string;
  name: string;
  description: string;
  updatedAt: string;
  status: OrchestrationStatus;
}
