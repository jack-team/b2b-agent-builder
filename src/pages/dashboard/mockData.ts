import type {
  ActivityItem,
  FrequentlyUsedItem,
  StatCardItem,
  WorkspaceItem,
} from './types';

export const statCards: StatCardItem[] = [
  {
    key: 'knowledges',
    icon: 'knowledge',
    value: '8424',
    trend: '+15% from last week',
    trendUp: true,
  },
  {
    key: 'memories',
    icon: 'memory',
    value: '557',
    trend: '+8% from last week',
    trendUp: true,
  },
  {
    key: 'models',
    icon: 'model',
    value: '9',
    trend: '2 new this week',
  },
  {
    key: 'tokens',
    icon: 'token',
    value: '39.7 K',
    trend: '+27% this week',
    trendUp: true,
  },
];

export const frequentlyUsedOrchestrations: FrequentlyUsedItem[] = [
  { key: 'orch-1', title: 'Request for Quotation(RFQ)', badge: 3 },
  { key: 'orch-2', title: 'Request for Quotation(RFQ)', badge: 1 },
];

export const frequentlyUsedAgents: FrequentlyUsedItem[] = [
  { key: 'agent-1', title: 'Request for Quotation(RFQ)', badge: 2 },
  { key: 'agent-2', title: 'Request for Quotation(RFQ)' },
];

export const workspaceItems: WorkspaceItem[] = [
  {
    key: '1',
    type: 'orchestration',
    title: 'Request for Quotation(RFQ)',
    status: 'processing',
    description:
      'Automated RFQ workflow that collects supplier quotes, compares pricing, and routes approvals.',
    updatedAt: '2 hours ago',
    views: 512,
    nodes: 7,
    iconColor: '#7C3AED',
  },
  {
    key: '2',
    type: 'orchestration',
    title: 'Request for Quotation(RFQ)',
    status: 'stopped',
    description:
      'Automated RFQ workflow that collects supplier quotes, compares pricing, and routes approvals.',
    updatedAt: '2 hours ago',
    views: 512,
    nodes: 7,
    iconColor: '#14B8A6',
  },
  {
    key: '3',
    type: 'orchestration',
    title: 'Request for Quotation(RFQ)',
    status: 'draft',
    description:
      'Automated RFQ workflow that collects supplier quotes, compares pricing, and routes approvals.',
    updatedAt: '2 hours ago',
    views: 512,
    nodes: 7,
    iconColor: '#F59E0B',
  },
  {
    key: '4',
    type: 'agent',
    title: 'Request for Quotation(RFQ)',
    status: 'processing',
    description:
      'Agent that assists procurement teams with supplier outreach and quote normalization.',
    updatedAt: '3 hours ago',
    views: 328,
    nodes: 5,
    iconColor: '#3B82F6',
  },
  {
    key: '5',
    type: 'agent',
    title: 'Request for Quotation(RFQ)',
    status: 'draft',
    description:
      'Agent that assists procurement teams with supplier outreach and quote normalization.',
    updatedAt: '5 hours ago',
    views: 128,
    nodes: 4,
    iconColor: '#8B5CF6',
  },
  {
    key: '6',
    type: 'capability',
    title: 'Request for Quotation(RFQ)',
    status: 'processing',
    description:
      'Capability bundle for parsing RFQ documents and extracting structured pricing fields.',
    updatedAt: '1 day ago',
    views: 96,
    nodes: 3,
    iconColor: '#10B981',
  },
  {
    key: '7',
    type: 'capability',
    title: 'Request for Quotation(RFQ)',
    status: 'stopped',
    description:
      'Capability bundle for parsing RFQ documents and extracting structured pricing fields.',
    updatedAt: '2 days ago',
    views: 64,
    nodes: 2,
    iconColor: '#EF4444',
  },
];

export const recentActivities: ActivityItem[] = [
  {
    key: '1',
    title: 'Knowledge base updated',
    time: '2 days ago',
    icon: 'success',
  },
  {
    key: '2',
    title: 'Orchestration running',
    time: '40 minutes ago',
    icon: 'sync',
  },
  {
    key: '3',
    title: 'Task pending review',
    time: '1 hour ago',
    icon: 'warning',
  },
  {
    key: '4',
    title: 'Capability configured',
    time: '1 day ago',
    icon: 'error',
  },
  {
    key: '5',
    title: 'Resolving Memory Conflicts',
    time: '3 days ago',
    icon: 'memory',
  },
];
