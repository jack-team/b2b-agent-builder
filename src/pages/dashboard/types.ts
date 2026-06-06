export type WorkspaceItemStatus = 'processing' | 'stopped' | 'draft';

export type WorkspaceItemType = 'orchestration' | 'agent' | 'capability';

export type StatCardIconType = 'knowledge' | 'memory' | 'model' | 'token';

export type ActivityIconType = 'success' | 'sync' | 'warning' | 'error' | 'memory';

export interface StatCardItem {
  key: string;
  icon: StatCardIconType;
  value: string;
  trend: string;
  trendUp?: boolean;
}

export interface FrequentlyUsedItem {
  key: string;
  title: string;
  badge?: number;
}

export interface WorkspaceItem {
  key: string;
  type: WorkspaceItemType;
  title: string;
  status: WorkspaceItemStatus;
  description: string;
  updatedAt: string;
  views: number;
  nodes: number;
  iconColor: string;
}

export interface ActivityItem {
  key: string;
  title: string;
  time: string;
  icon: ActivityIconType;
}
