import type { FC } from 'react';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Avatar, Button, Popconfirm } from 'antd';
import { useTranslation } from 'react-i18next';

import Drawer from '@/components/Drawer';
import AddMemberToGroup from '@/bsComponents/AddMemberToGroup';
import { getInitials } from '@/bsComponents/UserDetail/utils';
import type { GroupCardProps } from './types';
import styles from './styles.module.less';

const GroupCard: FC<GroupCardProps> = ({ group }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.group_card}>
      <div className={styles.group_header}>
        <span className={styles.group_name}>
          {t(`sharedDomain.groups.${group.key}`)}
        </span>
        <span className={styles.member_count}>
          {t('sharedDomain.memberCount', { count: group.memberCount })}
        </span>
      </div>
      <div className={styles.member_list}>
        {group.members.map((member) => (
          <div key={member.key} className={styles.member_row}>
            <Avatar
              className={styles.member_avatar}
              size={36}
              style={{ backgroundColor: member.avatarColor }}
            >
              {getInitials(member.name)}
            </Avatar>
            <div className={styles.member_info}>
              <span className={styles.member_name}>{member.name}</span>
              <span className={styles.member_role}>
                {t(`sharedDomain.roles.${member.role}`)}
              </span>
            </div>
            {member.removable && (
              <Popconfirm
                title={t('sharedDomain.removeMemberConfirm')}
                okText={t('common.delete')}
                okButtonProps={{ danger: true }}
              >
                <Button
                  type="text"
                  size="small"
                  className={styles.member_delete}
                  icon={<DeleteOutlined />}
                  aria-label={t('common.delete')}
                />
              </Popconfirm>
            )}
          </div>
        ))}
      </div>
      <div className={styles.group_footer}>
        <Drawer
          size="medium"
          trigger={(
            <Button
              className={styles.add_member_btn}
              icon={<PlusOutlined />}
            >
              {t('sharedDomain.addMember')}
            </Button>
          )}
        >
          <AddMemberToGroup group={group} />
        </Drawer>
      </div>
    </div>
  );
};

export default GroupCard;
