import { useMemoizedFn } from 'ahooks';
import { Dropdown as AntdDropdown, type DropdownProps, theme } from 'antd';
import { type FC, type CSSProperties, cloneElement, type ReactElement, type ReactNode } from 'react';

type MenuElement = ReactElement<{
  style: CSSProperties;
}>;

const Dropdown: FC<DropdownProps> = ({ children, ...props }) => {
  const { token } = theme.useToken();


  const popupRender = useMemoizedFn((menu: ReactNode) => {
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
      <div style={popupStyle}>
        {cloneElement(
          menu as MenuElement,
          { style: menuStyle }
        )}
      </div>
    );
  });

  return (
    <AntdDropdown {...props} popupRender={popupRender}>
      {children}
    </AntdDropdown>
  );
}

export default Dropdown;