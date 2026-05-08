import { Menu } from 'antd';
import cls from 'classnames';
import { type FC } from 'react';
import * as icons from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useMenu } from './hooks';

interface AppMenuProps {
  collapsed: boolean;
}

const AppMenu: FC<AppMenuProps> = (props) => {
  const { collapsed } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { menus, selectedKeys } = useMenu();

  return (
    <div className={cls('flex flex-col h-full', collapsed ? 'w-[90px]' : 'w-[300px]')}>
      <div className="flex items-center justify-center bg-[#7948EA] h-[60px] text-[#fff]">
        Logo
      </div>
      <Menu
        theme="light"
        mode="inline"
        className="flex-1 app-menu"
        inlineCollapsed={collapsed}
        selectedKeys={selectedKeys}
        items={menus.map(item => {
          const iconName = item.icon as keyof typeof icons;
          const Icon = icons[iconName] as FC;
          return {
            key: item.path,
            label: t(item.title),
            icon: Icon ? <Icon /> : null,
            onClick: () => navigate(item.path),
          };
        })}
      />
    </div>
  );
};

export default AppMenu;
