import type { FC } from 'react';
import { Avatar, Tabs, Tag } from 'antd';
import { DrawerContainer } from '@/components/Drawer';
import RoleTag from '@/components/RoleTag';
import type { UserDetailProps } from './types';
import BasicInfoTab from './BasicInfoTab';
import RoleTab from './RoleTab';
import PermissionsTab from './PermissionsTab';
import OperationLogsTab from './OperationLogsTab';
import { getInitials, isRoleKey, toUserDetailData } from './utils';
import styles from './styles.module.less';

const UserDetail: FC<UserDetailProps> = ({ record, onClose }) => {
  const data = toUserDetailData(record);
  const primaryRole = data.assignedRoles.find(isRoleKey) ?? data.role;

  return (
    <DrawerContainer title="User Detail" onClose={onClose}>
      <div className={styles.summary}>
        <div className={styles.summary_main}>
          <Avatar size={72} style={{ backgroundColor: data.avatarColor }}>
            {getInitials(data.name)}
          </Avatar>
          <div className={styles.summary_info}>
            <h2 className={styles.summary_name}>{data.name}</h2>
            <p className={styles.summary_job}>{data.jobTitle}</p>
            <div className={styles.summary_meta}>
              <span>{data.email}</span>
              <span>{data.phone}</span>
            </div>
            <div className={styles.summary_badges}>
              <Tag color={data.status === 'enabled' ? 'success' : 'error'}>
                {data.status === 'enabled' ? 'Enabled' : 'Disabled'}
              </Tag>
              {isRoleKey(primaryRole) && <RoleTag role={primaryRole} />}
            </div>
          </div>
        </div>
        <div className={styles.summary_stats}>
          <div className={styles.stat_row}>
            <span className={styles.stat_label}>Last Login</span>
            <span className={styles.stat_value}>{data.lastLoginAt}</span>
          </div>
          <div className={styles.stat_row}>
            <span className={styles.stat_label}>Last Login IP</span>
            <span className={styles.stat_value}>{data.lastLoginIp}</span>
          </div>
        </div>
      </div>
      <Tabs
        className="card-tabs"
        items={[
          {
            key: 'basic',
            label: 'Basic Information',
            children: <BasicInfoTab data={data} />,
          },
          {
            key: 'role',
            label: 'Role',
            children: <RoleTab data={data} />,
          },
          {
            key: 'permissions',
            label: 'Permissions',
            children: <PermissionsTab />,
          },
          {
            key: 'logs',
            label: 'Operation Logs',
            children: <OperationLogsTab />,
          },
        ]}
      />
    </DrawerContainer>
  );
};

export default UserDetail;
