import type { FC } from 'react';
import { useMemo } from 'react';
import { ArrowDownOutlined, DeleteOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Popconfirm } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { useTranslation } from 'react-i18next';

import { DrawerContainer } from '@/components/Drawer';
import { AVAILABLE_USER_TOTAL } from './mock';
import MemberListSection from './MemberListSection';
import type { AddMemberToGroupProps } from './types';
import { useGroupMemberState } from './useGroupMemberState';
import UserRow from './UserRow';
import styles from './styles.module.less';

const AddMemberToGroup: FC<AddMemberToGroupProps> = ({ group, onClose }) => {
  const { t } = useTranslation();
  const {
    groupMembers,
    availableUsers,
    handleAddToGroup,
    handleRemoveFromGroup,
  } = useGroupMemberState(group);

  const groupName = useMemo(
    () => t(`sharedDomain.groups.${group.key}`),
    [group.key, t],
  );

  const handleSave = useMemoizedFn(() => {
    // placeholder for API integration
    onClose?.();
  });

  return (
    <DrawerContainer
      title={t('addMemberToGroup.title')}
      onClose={onClose}
      extra={(
        <Button type="primary" icon={<SaveOutlined />} onClick={handleSave}>
          {t('common.save')}
        </Button>
      )}
    >
      <div className={styles.panel}>
        <MemberListSection
          title={t('addMemberToGroup.availableUsers')}
          countLabel={t('addMemberToGroup.userCount', { count: AVAILABLE_USER_TOTAL })}
        >
          {availableUsers.map((user) => (
            <UserRow
              key={user.key}
              name={user.name}
              avatarColor={user.avatarColor}
              action={(
                <Button
                  type="link"
                  size="small"
                  className={`${styles.row_action} ${styles.add_btn}`}
                  icon={<PlusOutlined />}
                  onClick={() => handleAddToGroup(user)}
                >
                  {t('addMemberToGroup.addToGroup')}
                </Button>
              )}
            />
          ))}
        </MemberListSection>

        <div className={styles.flow_arrow}>
          <ArrowDownOutlined />
        </div>

        <MemberListSection
          title={groupName}
          countLabel={t('sharedDomain.memberCount', { count: groupMembers.length })}
        >
          {groupMembers.map((member) => (
            <UserRow
              key={member.key}
              name={member.name}
              avatarColor={member.avatarColor}
              subtitle={t(`sharedDomain.roles.${member.role}`)}
              action={member.removable ? (
                <Popconfirm
                  title={t('sharedDomain.removeMemberConfirm')}
                  okText={t('common.delete')}
                  okButtonProps={{ danger: true }}
                  onConfirm={() => handleRemoveFromGroup(member)}
                >
                  <Button
                    type="text"
                    size="small"
                    className={`${styles.row_action} ${styles.remove_btn}`}
                    icon={<DeleteOutlined />}
                    aria-label={t('common.delete')}
                  />
                </Popconfirm>
              ) : undefined}
            />
          ))}
        </MemberListSection>
      </div>
    </DrawerContainer>
  );
};

export default AddMemberToGroup;
