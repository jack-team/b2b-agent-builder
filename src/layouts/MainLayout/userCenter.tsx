import { type FC, cloneElement, type CSSProperties } from 'react';
import { Avatar, Dropdown, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { icons } from './icons';

import { useUserStore } from '@/store/user';
import styles from './styles.module.less';

type MenuElement = React.ReactElement<{
  style: React.CSSProperties;
}>;

const UserCenter: FC = () => {
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
              label: 'Profile',
              icon: <UserOutlined />,
              onClick: () => navigate('/profile')
            },
            {
              key: 'permissions',
              label: 'Permissions',
              icon: <icons.permission />,
              onClick: () => navigate('/permissions')
            },
            {
              key: 'company',
              label: 'My Company',
              icon: <icons.merchant />,
              onClick: () => navigate('/merchants')
            },
            {
              type: 'divider',
              style: { margin: '4px 0' }
            },
            {
              key: 'logout',
              label: 'Logout',
              onClick: logout
            }
          ]
        }}
      >
        <div className={styles.userProfile}>
          {renderAvatar(36)}
          <div className={styles.userInfo}>
            <div className={styles.userName}>Jack Jiang</div>
            <div className={styles.userRole}>Admin</div>
          </div>
        </div>
      </Dropdown>
    </div>
  );
}

export default UserCenter;