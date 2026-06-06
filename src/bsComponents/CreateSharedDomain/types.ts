export type GroupMemberPermission = 'read_write' | 'read_only' | 'manage';

export type MemoryCreationPermission = 'all_members' | 'admins_only';

export interface MemberCandidate {
  key: string;
  name: string;
  userId: string;
  avatarColor: string;
}

export interface CreateSharedDomainFormValues {
  name: string;
  description: string;
  department: string;
  status: boolean;
  memberIds: string[];
  groupMemberPermission: GroupMemberPermission;
  memoryCreationPermission: MemoryCreationPermission;
  privacyMaskingEnabled: boolean;
  accessLogsEnabled: boolean;
}

export interface CreateSharedDomainProps {
  onClose?: () => void;
}
