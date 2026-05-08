import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Table, Tag, Button, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const Users: FC = () => {
  const { t } = useTranslation();

  const columns = [
    {
      title: 'User',
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => (
        <div className="flex items-center gap-2">
          <Avatar icon={<UserOutlined />} />
          <span>{name}</span>
        </div>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => (
        <Tag color={role === 'admin' ? 'purple' : 'blue'}>{role}</Tag>
      ),
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
      title: 'Actions',
      key: 'actions',
      render: () => <Button type="link">Edit</Button>,
    },
  ];

  const data = [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'admin', status: 'active' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'user', status: 'active' },
    { id: '3', name: 'Bob Wilson', email: 'bob@example.com', role: 'user', status: 'inactive' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">{t('menu.users')}</h1>
      <Table columns={columns} dataSource={data} rowKey="id" />
    </div>
  );
};

export default Users;
