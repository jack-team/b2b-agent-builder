import type { BaseIconNameType } from '@/components/BaseIcons';

export type MenuItem = {
  path?: string;
  title: string;
  icon?: BaseIconNameType;
  children?: MenuItem[];
}

/**
 * 注意：菜单路径必须以 / 开头，没有path的情况只会出现在顶层，顶层为一个大的分组；
 * 并且分组下的菜单最多只有一层子菜单；
 * 
 * @description 菜单列表
 * @returns {MenuItem[]} 菜单列表
 * */ 
export const menuList: MenuItem[] = [
  {
    title: "menu.groups.overview",
    children: [
      {
        "path": "/dashboard",
        "title": "menu.dashboard",
        "icon": "IconDashboard"
      }
    ]
  },
  {
    title: "menu.groups.aiCapabilities",
    children: [
      {
        "path": "/knowledges",
        "title": "menu.knowledges",
        "icon": "IconKnowledge"
      },
      {
        "path": "/memories",
        "title": "menu.memories",
        "icon": "IconMemories"
      },
      {
        "path": "/capabilities",
        "title": "menu.capabilities",
        "icon": "IconCapability"
      },
      {
        "path": "/llm",
        "title": "menu.largeLanguageModels",
        "icon": "LLMIcon"
      },
      {
        path: "/orchestrations",
        title: "menu.orchestrations",
        icon: "IconOrchestration"
      }
    ]
  },
  {
    title: "menu.groups.management",
    children: [
      {
        "path": "/merchants",
        "title": "menu.merchants",
        "icon": "IconMerchant"
      },
      {
        "path": "/users",
        "title": "menu.users",
        "icon": "IconUsers"
      },
      {
        "path": "/permissions",
        "title": "menu.permissions",
        "icon": "IconPermission"
      }
    ]
  },
  {
    title: "menu.groups.operations",
    children: [
      {
        "path": "/monitoringAndAnalysis",
        "title": "menu.monitoringAndAnalysis",
        "icon": "IconAnalysis"
      },
      {
        "path": "/settings",
        "title": "menu.systemSetting",
        "icon": "IconSetting"
      },
    ]
  }
]
