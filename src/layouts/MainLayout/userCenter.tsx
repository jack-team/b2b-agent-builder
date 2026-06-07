import { type FC } from 'react';
import { Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Dropdown from '@/components/Dropdown';
import { useUserStore } from '@/store/user';
import { UserOutlined, IconPermission, IconMerchant } from '@/components/BaseIcons';
import styles from './styles.module.less';

const UserCenter: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const logout = useUserStore(s => s.logout)

  const renderAvatar = (size: number) => {
    return (
      <Avatar
        size={size}
        src="https://picsum.photos/200/300"
        className="border-[var(--border-color-primary)]"
      />
    );
  }

  return (
    <div className={styles.userCenter}>
      <Dropdown
        trigger={['click']}
        openClassName={styles.openDropdown}
        menu={{
          inlineCollapsed: false,
          items: [
            {
              key: 'profile',
              label: t('layout.profile'),
              icon: <UserOutlined />,
              onClick: () => navigate('/profile')
            },
            {
              key: 'permissions',
              label: t('layout.permissions'),
              icon: <IconPermission />,
              onClick: () => navigate('/permissions')
            },
            {
              key: 'company',
              label: t('layout.myCompany'),
              icon: <IconMerchant />,
              onClick: () => navigate('/merchants')
            },
            {
              type: 'divider',
              style: { margin: '4px 0' }
            },
            {
              key: 'logout',
              label: t('layout.logout'),
              onClick: logout
            }
          ]
        }}
      >
        <div className={styles.userProfile}>
          {renderAvatar(36)}
          <div className={styles.userInfo}>
            <div className={styles.userName}>Jack Jiang</div>
            <div className={styles.userRole}>{t('roles.admin')}</div>
          </div>
        </div>
      </Dropdown>
    </div>
  );
}

export default UserCenter;
