import type { MemberCandidate } from './types';

export const mockMemberCandidates: MemberCandidate[] = [
  { key: 'user-1', name: 'Amelia Rose Wilson', userId: 'UID0000000101', avatarColor: '#7C3AED' },
  { key: 'user-2', name: 'Mia Charlotte Miller', userId: 'UID0000000102', avatarColor: '#3B82F6' },
  { key: 'user-3', name: 'Ethan Noah Garcia', userId: 'UID0000000103', avatarColor: '#10B981' },
  { key: 'user-4', name: 'Isabella Grace Jones', userId: 'UID0000000104', avatarColor: '#F59E0B' },
  { key: 'user-5', name: 'Liam Alexander Davis', userId: 'UID0000000105', avatarColor: '#EC4899' },
  { key: 'user-6', name: 'Oliver James Williams', userId: 'UID0000000106', avatarColor: '#8B5CF6' },
  { key: 'user-7', name: 'James William Smith', userId: 'UID0000000107', avatarColor: '#06B6D4' },
];

export const defaultSelectedMemberIds = ['user-1', 'user-2', 'user-3', 'user-4', 'user-6'];
