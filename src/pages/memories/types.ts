export type MemoryType = 'semantics' | 'scenario';

export type MemoryStatus = 'enabled' | 'disabled';

export interface MemoryRecord {
  key: string;
  user: string;
  memory: string;
  type: MemoryType;
  graphs: number;
  clarity: number;
  status: MemoryStatus;
}
