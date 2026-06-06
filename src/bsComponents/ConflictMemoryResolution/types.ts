export type ConflictMemoryStatus = 'pending' | 'resolved';

export interface MemorySideDetail {
  date: string;
  label: string;
  content: string;
  decayScore: number;
  accessedCount?: number;
  sourceDialog?: string;
}

export interface ConflictMemoryItem {
  id: string;
  timestamp: string;
  status: ConflictMemoryStatus;
  oldMemory: MemorySideDetail;
  newMemory: MemorySideDetail;
}

export type MemorySideVariant = 'old' | 'new';

export interface MemoryDetailBoxProps {
  variant: MemorySideVariant;
  memory: MemorySideDetail;
  onAction: () => void;
}

export interface ConflictCardProps {
  conflict: ConflictMemoryItem;
  onKeepOld: (conflictId: string) => void;
  onUseNew: (conflictId: string) => void;
}

export interface ConflictMemoryResolutionProps {
  onClose?: () => void;
  conflicts?: ConflictMemoryItem[];
  onKeepOld?: (conflictId: string) => void;
  onUseNew?: (conflictId: string) => void;
}
