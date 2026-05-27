import { type FC, cloneElement } from 'react';
import { Avatar, Dropdown, theme } from 'antd';
import { useUserStore } from '@/store/user';

type MenuElement = React.ReactElement<{
  style: React.CSSProperties;
}>;

const UserCenter: FC = () => {
  const { token } = theme.useToken();
  const logout = useUserStore(s => s.logout)

  const renderAvatar = (size: number) => {
    return (
      <Avatar
        size={size}
        src="https://picsum.photos/200/300?grayscale"
      />
    );
  }

  return (
    <Dropdown
      menu={{
        items: [
          {
            key: 'logout',
            label: 'Logout',
            onClick: logout
          }
        ]
      }}
      popupRender={(menu) => (
        <div style={{
          overflow: 'hidden',
          borderRadius: token.borderRadiusLG,
          boxShadow: token.boxShadowSecondary,
          backgroundColor: token.colorBgElevated
        }}>
          {cloneElement(
            menu as MenuElement,
            {
              style: {
                minWidth: 200,
                boxShadow: 'none',
                borderRadius: 0
              }
            },
          )}
        </div>
      )}
    >
      <div className="h-full flex items-center cursor-pointer gap-[8px]">
        {renderAvatar(28)}
        <span>Jack Jiang</span>
      </div>
    </Dropdown>
  )
}

export default UserCenter;