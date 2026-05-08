import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Table, Tag, Button } from 'antd';

const Merchants: FC = () => {
  const { t } = useTranslation();

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>{status}</Tag>
      ),
    },
    {
      title: 'Agents',
      dataIndex: 'agents',
      key: 'agents',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => <Button type="link">Manage</Button>,
    },
  ];

  const data = [
    { id: '1', name: 'TechCorp', status: 'active', agents: 12 },
    { id: '2', name: 'DataFlow Inc', status: 'active', agents: 8 },
    { id: '3', name: 'CloudBase', status: 'inactive', agents: 0 },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">{t('menu.merchants')}</h1>
      <Table columns={columns} dataSource={data} rowKey="id" />
    </div>
  );
};

export default Merchants;
