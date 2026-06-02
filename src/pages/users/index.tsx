import type { FC, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { Avatar, Button, Empty, Space, Tag, Typography } from 'antd';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-table';

import Drawer from '@/components/Drawer';
import RoleTag from '@/components/RoleTag';
import TableActions from '@/components/TableActions';
import UserConfig from '@/bsComponents/UserConfig';
import UserDetail from '@/bsComponents/UserDetail';
import type { UserRecord } from '@/bsComponents/UserConfig/types';
import {
  proTableDrawerPagination,
  proTableSearchConfig,
} from '@/utils/proTable';

const getInitials = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

const mockData: UserRecord[] = [
  {
    key: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    merchant: 'Shopify',
    role: 'super_admin',
    lastLogin: '2026-05-28',
    status: 'enabled',
    avatarColor: '#7c3aed',
  },
  {
    key: '2',
    name: 'Emma Johnson',
    email: 'emma.johnson@example.com',
    merchant: 'Shopify',
    role: 'admin',
    lastLogin: '2026-05-27',
    status: 'enabled',
    avatarColor: '#2563eb',
  },
  {
    key: '3',
    name: 'Carlos Rodriguez',
    email: 'carlos.rodriguez@example.com',
    merchant: 'Shopify',
    role: 'audit_admin',
    lastLogin: '2026-05-20',
    status: 'disabled',
    avatarColor: '#059669',
  },
];

const merchantOptions = [
  { label: 'Shopify', value: 'Shopify' },
  { label: 'WooCommerce', value: 'WooCommerce' },
  { label: 'Magento', value: 'Magento' },
];

const columns: ProColumns<UserRecord>[] = [
  {
    title: 'User',
    dataIndex: 'name',
    hideInTable: false,
    render: (_dom, record) => (
      <Drawer
        size="large"
        trigger={
          <Space size={12} className="cursor-pointer">
            <Avatar style={{ backgroundColor: record.avatarColor }}>
              {getInitials(record.name)}
            </Avatar>
            <div>
              <Typography.Text strong>{record.name}</Typography.Text>
              <div>
                <Typography.Text type="secondary" className="text-[12px]">
                  {record.email}
                </Typography.Text>
              </div>
            </div>
          </Space>
        }
      >
        <UserDetail record={record} />
      </Drawer>
    ),
  },
  {
    title: 'Merchant',
    dataIndex: 'merchant',
    valueType: 'select',
    initialValue: 'Shopify',
    fieldProps: {
      options: merchantOptions,
    },
  },
  {
    title: 'Role',
    dataIndex: 'role',
    valueType: 'select',
    fieldProps: {
      options: [
        { label: 'Super Admin', value: 'super_admin' },
        { label: 'Admin', value: 'admin' },
        { label: 'Audit Admin', value: 'audit_admin' },
      ],
    },
    render: (_dom, record) => <RoleTag role={record.role} />,
  },
  {
    title: 'Last Login',
    dataIndex: 'lastLogin',
    valueType: 'date',
    render: (_dom, record) => record.lastLogin,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    valueType: 'switch',
    initialValue: true,
    fieldProps: {
      checkedChildren: 'On',
      unCheckedChildren: 'Off',
    },
    render: (_dom, record) => (
      <Tag color={record.status === 'enabled' ? 'success' : 'error'}>
        {record.status === 'enabled' ? 'Enabled' : 'Disabled'}
      </Tag>
    ),
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
    hideInSearch: true,
    width: 120,
    render: (_dom, record) => (
      <TableActions
        onDelete={() => {}}
        renderEditBtn={(btn) => (
          <Drawer size="small" trigger={btn}>
            <UserDetail record={record} />
          </Drawer>
        )}
      />
    ),
  },
];

const renderNewUserButton = () => (
  <Drawer size="medium" trigger={<Button type="primary">+ New User</Button>}>
    <UserConfig />
  </Drawer>
);

const renderUsersEmptyView = (
  { dataSource = [] }: { dataSource?: readonly UserRecord[] },
  dom: ReactElement,
) => {
  if (!dataSource.length) {
    return (
      <div className="py-[56px]">
        <Empty description="No Data Available">{renderNewUserButton()}</Empty>
      </div>
    );
  }
  return dom;
};

const Users: FC = () => {
  const { t } = useTranslation();

  return (
    <PageContainer
      title={t('menu.users')}
      extra={renderNewUserButton()}
    >
      <ProTable<UserRecord>
        columns={columns}
        dataSource={mockData}
        rowKey="key"
        toolBarRender={false}
        search={proTableSearchConfig}
        pagination={{
          ...proTableDrawerPagination,
          total: 17,
        }}
        tableViewRender={renderUsersEmptyView}
      />
    </PageContainer>
  );
};

export default Users;
