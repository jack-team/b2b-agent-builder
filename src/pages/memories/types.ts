import type { BaseRecord, EnableStatus } from '@/types/common';

export type MemoryType = 'semantics' | 'scenario';

export type MemoryStatus = EnableStatus;

export interface MemoryRecord extends BaseRecord {
  user: string;
  memory: string;
  type: MemoryType;
  graphs: number;
  clarity: number;
  status: MemoryStatus;
}
