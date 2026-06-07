import type { FC } from 'react';
import { Avatar, Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import { DrawerContainer } from '@/components/Drawer';
import RoleTag from '@/components/RoleTag';
import StatusTag from '@/components/StatusTag';
import type { UserDetailProps } from './types';
import BasicInfoTab from './BasicInfoTab';
import RoleTab from './RoleTab';
import PermissionsTab from './PermissionsTab';
import OperationLogsTab from './OperationLogsTab';
import { getInitials, isRoleKey, toUserDetailData } from './utils';
import styles from './styles.module.less';

const UserDetail: FC<UserDetailProps> = ({ record, onClose }) => {
  const { t } = useTranslation();
  const data = toUserDetailData(record);
  const primaryRole = data.assignedRoles.find(isRoleKey) ?? data.role;

  return (
    <DrawerContainer title={t('userDetail.title')} onClose={onClose}>
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
              <StatusTag status={data.status} />
              {isRoleKey(primaryRole) && <RoleTag role={primaryRole} />}
            </div>
          </div>
        </div>
        <div className={styles.summary_stats}>
          <div className={styles.stat_row}>
            <span className={styles.stat_label}>{t('userDetail.lastLogin')}</span>
            <span className={styles.stat_value}>{data.lastLoginAt}</span>
          </div>
          <div className={styles.stat_row}>
            <span className={styles.stat_label}>{t('userDetail.lastLoginIp')}</span>
            <span className={styles.stat_value}>{data.lastLoginIp}</span>
          </div>
        </div>
      </div>
      <Tabs
        className="card-tabs"
        items={[
          {
            key: 'basic',
            label: t('userDetail.tabs.basicInfo'),
            children: <BasicInfoTab data={data} />,
          },
          {
            key: 'role',
            label: t('userDetail.tabs.role'),
            children: <RoleTab data={data} />,
          },
          {
            key: 'permissions',
            label: t('userDetail.tabs.permissions'),
            children: <PermissionsTab />,
          },
          {
            key: 'logs',
            label: t('userDetail.tabs.operationLogs'),
            children: <OperationLogsTab />,
          },
        ]}
      />
    </DrawerContainer>
  );
};

export default UserDetail;
