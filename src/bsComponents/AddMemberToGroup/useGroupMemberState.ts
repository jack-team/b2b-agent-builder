import { useState } from 'react';
import { useMemoizedFn } from 'ahooks';

import type { GroupMember, SharingGroup } from '@/bsComponents/SharedDomain/types';
import { mockAvailableUsers } from './mock';
import type { AvailableUser } from './types';
import {
  filterAvailableUsers,
  toAvailableUser,
  toGroupMember,
} from './utils';

export const useGroupMemberState = (group: SharingGroup) => {
  const [groupMembers, setGroupMembers] = useState<GroupMember[]>(() => [...group.members]);
  const [availableUsers, setAvailableUsers] = useState<AvailableUser[]>(() =>
    filterAvailableUsers(mockAvailableUsers, group.members),
  );

  const handleAddToGroup = useMemoizedFn((user: AvailableUser) => {
    setGroupMembers((prev) => [...prev, toGroupMember(user)]);
    setAvailableUsers((prev) => prev.filter((item) => item.key !== user.key));
  });

  const handleRemoveFromGroup = useMemoizedFn((member: GroupMember) => {
    setGroupMembers((prev) => prev.filter((item) => item.key !== member.key));
    setAvailableUsers((prev) => [
      ...prev,
      toAvailableUser(member),
    ].sort((left, right) => left.name.localeCompare(right.name)));
  });

  return {
    groupMembers,
    availableUsers,
    handleAddToGroup,
    handleRemoveFromGroup,
  };
};
