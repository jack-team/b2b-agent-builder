import { type FC, cloneElement, type CSSProperties } from 'react';
import { Avatar, Dropdown, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { UserOutlined } from '@ant-design/icons';
import { icons } from './icons';

import { useUserStore } from '@/store/user';
import styles from './styles.module.less';

type MenuElement = React.ReactElement<{
  style: React.CSSProperties;
}>;

const UserCenter: FC = () => {
  const { t } = useTranslation();
  const { token } = theme.useToken();
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

  const menuStyle: CSSProperties = {
    minWidth: 200,
    boxShadow: 'none',
    borderRadius: 0
  }

  const popupStyle: CSSProperties = {
    overflow: 'hidden',
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
    backgroundColor: token.colorBgElevated
  }

  return (
    <div className={styles.userCenter}>
      <Dropdown
        trigger={['click']}
        openClassName={styles.openDropdown}
        popupRender={(menu: MenuElement) => (
          <div style={popupStyle}>
            {cloneElement(menu, { style: menuStyle })}
          </div>
        )}
        menu={{
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
              icon: <icons.permission />,
              onClick: () => navigate('/permissions')
            },
            {
              key: 'company',
              label: t('layout.myCompany'),
              icon: <icons.merchant />,
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
