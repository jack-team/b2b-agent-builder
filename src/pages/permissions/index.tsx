import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Tree, Card, Button } from 'antd';
import type { DataNode } from 'antd/es/tree';

const Permissions: FC = () => {
  const { t } = useTranslation();

  const treeData: DataNode[] = [
    {
      title: 'Dashboard',
      key: 'dashboard',
      children: [
        { title: 'View', key: 'dashboard:view' },
      ],
    },
    {
      title: 'Knowledges',
      key: 'knowledges',
      children: [
        { title: 'View', key: 'knowledges:view' },
        { title: 'Create', key: 'knowledges:create' },
        { title: 'Edit', key: 'knowledges:edit' },
        { title: 'Delete', key: 'knowledges:delete' },
      ],
    },
    {
      title: 'Users',
      key: 'users',
      children: [
        { title: 'View', key: 'users:view' },
        { title: 'Create', key: 'users:create' },
        { title: 'Edit', key: 'users:edit' },
        { title: 'Delete', key: 'users:delete' },
      ],
    },
    {
      title: 'Settings',
      key: 'settings',
      children: [
        { title: 'View', key: 'settings:view' },
        { title: 'Edit', key: 'settings:edit' },
      ],
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">{t('menu.permissions')}</h1>
      <Card
        title="Permission Tree"
        extra={<Button type="primary">Save Changes</Button>}
      >
        <Tree checkable defaultExpandAll treeData={treeData} />
      </Card>
    </div>
  );
};

export default Permissions;
