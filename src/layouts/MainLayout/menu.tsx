import { Menu } from 'antd';
import cls from 'classnames';
import { type FC } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useMenu } from './hooks';

import llmIcon from '@/assets/svg-icons/menu/llm.svg?react';
import usersIcon from '@/assets/svg-icons/menu/users.svg?react';
import settingIcon from '@/assets/svg-icons/menu/setting.svg?react';
import analysisIcon from '@/assets/svg-icons/menu/analysis.svg?react';
import merchantIcon from '@/assets/svg-icons/menu/merchant.svg?react';
import dashboardIcon from '@/assets/svg-icons/menu/dashboard.svg?react';
import knowledgeIcon from '@/assets/svg-icons/menu/knowledge.svg?react';
import memoriesIcon from '@/assets/svg-icons/menu/memories.svg?react';
import permissionIcon from '@/assets/svg-icons/menu/permission.svg?react'
import capabilityIcon from '@/assets/svg-icons/menu/capability.svg?react';
import orchestrationIcon from '@/assets/svg-icons/menu/orchestration.svg?react';
interface AppMenuProps {
  collapsed: boolean;
}

const icons = {
  llm: llmIcon,
  users: usersIcon,
  merchant: merchantIcon,
  dashboard: dashboardIcon,
  knowledge: knowledgeIcon,
  memories: memoriesIcon,
  analysis: analysisIcon,
  setting: settingIcon,
  capability: capabilityIcon,
  permission: permissionIcon,
  orchestration: orchestrationIcon
}

const AppMenu: FC<AppMenuProps> = (props) => {
  const { collapsed } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { menus, selectedKeys } = useMenu();

  return (
    <div className={cls('flex flex-col h-full', collapsed ? 'w-[90px]' : 'w-[300px]')}>
      <div className="flex items-center justify-center bg-[var(--color-primary)] h-[60px] text-[#fff]">
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
