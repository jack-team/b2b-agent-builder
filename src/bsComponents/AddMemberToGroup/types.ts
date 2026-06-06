import type { GroupMember, SharingGroup } from '@/bsComponents/SharedDomain/types';

export interface AvailableUser {
  key: string;
  name: string;
  avatarColor: string;
}

export interface AddMemberToGroupProps {
  group: SharingGroup;
  onClose?: () => void;
}

export type { GroupMember };
