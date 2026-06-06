export type MenuItem = {
  path?: string;
  title: string;
  icon?: string;
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
    title: "概览",
    children: [
      {
        "path": "/dashboard",
        "title": "menu.dashboard",
        "icon": "dashboard"
      }
    ]
  },
  {
    title: "AI 能力",
    children: [
      {
        "path": "/knowledges",
        "title": "menu.knowledges",
        "icon": "knowledge"
      },
      {
        "path": "/memories",
        "title": "menu.memories",
        "icon": "memories"
      },
      {
        "path": "/capabilities",
        "title": "menu.capabilities",
        "icon": "capability"
      },
      {
        "path": "/llm",
        "title": "menu.largeLanguageModels",
        "icon": "llm"
      },
      {
        path: "/orchestrations",
        title: "menu.orchestrations",
        icon: "orchestration"
      }
    ]
  },
  {
    title: "管理",
    children: [
      {
        "path": "/merchants",
        "title": "menu.merchants",
        "icon": "merchant"
      },
      {
        "path": "/users",
        "title": "menu.users",
        "icon": "users"
      },
      {
        "path": "/permissions",
        "title": "menu.permissions",
        "icon": "permission"
      }
    ]
  },
  {
    title: "运维",
    children: [
      {
        "path": "/monitoringAndAnalysis",
        "title": "menu.monitoringAndAnalysis",
        "icon": "analysis"
      },
      {
        "path": "/settings",
        "title": "menu.systemSetting",
        "icon": "setting"
      },
    ]
  }
]
