import type { GroupMember } from '@/bsComponents/SharedDomain/types';
import type { AvailableUser } from './types';

export const isSameUser = (left: { name: string }, right: { name: string }) =>
  left.name === right.name;

export const filterAvailableUsers = (
  users: AvailableUser[],
  members: GroupMember[],
) => users.filter((user) => !members.some((member) => isSameUser(user, member)));

export const toGroupMember = (user: AvailableUser): GroupMember => ({
  key: `member-${user.key}`,
  name: user.name,
  role: 'member',
  avatarColor: user.avatarColor,
  removable: true,
});

export const toAvailableUser = (member: GroupMember): AvailableUser => ({
  key: member.key.replace('member-', 'avail-'),
  name: member.name,
  avatarColor: member.avatarColor,
});
