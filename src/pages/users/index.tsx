import type { FC } from 'react';
import { lazy, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Avatar, Button, Space, Typography } from 'antd';
import { PageContainer } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-table';

import Drawer from '@/components/Drawer';
import LazyDrawerContent from '@/components/LazyDrawerContent';
import NiceTable from '@/components/NiceTable';
import RoleTag from '@/components/RoleTag';
import StatusTag from '@/components/StatusTag';
import TableActions from '@/components/TableActions';
import type { UserRecord } from '@/bsComponents/UserConfig/types';
import {
  proTableDrawerPagination,
  proTableSearchConfig,
} from '@/utils/proTable';
import { getInitials } from '@/utils/user';
import { brandTokens } from '@/theme';

const UserConfig = lazy(() => import('@/bsComponents/UserConfig'));
const UserDetail = lazy(() => import('@/bsComponents/UserDetail'));

const mockData: UserRecord[] = [
  {
    key: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    merchant: 'Shopify',
    role: 'super_admin',
    lastLogin: '2026-05-28',
    status: 'enabled',
    avatarColor: brandTokens.colorPrimary,
  },
  {
    key: '2',
    name: 'Emma Johnson',
    email: 'emma.johnson@example.com',
    merchant: 'Shopify',
    role: 'admin',
    lastLogin: '2026-05-27',
    status: 'enabled',
    avatarColor: brandTokens.colorInfoDark,
  },
  {
    key: '3',
    name: 'Carlos Rodriguez',
    email: 'carlos.rodriguez@example.com',
    merchant: 'Shopify',
    role: 'audit_admin',
    lastLogin: '2026-05-20',
    status: 'disabled',
    avatarColor: brandTokens.colorSuccessDark,
  },
];

const merchantOptions = [
  { label: 'Shopify', value: 'Shopify' },
  { label: 'WooCommerce', value: 'WooCommerce' },
  { label: 'Magento', value: 'Magento' },
];

const Users: FC = () => {
  const { t } = useTranslation();

  const columns: ProColumns<UserRecord>[] = useMemo(() => [
    {
      title: t('usersPage.columns.user'),
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
          <LazyDrawerContent>
            <UserDetail record={record} />
          </LazyDrawerContent>
        </Drawer>
      ),
    },
    {
      title: t('usersPage.columns.merchant'),
      dataIndex: 'merchant',
      valueType: 'select',
      initialValue: 'Shopify',
      fieldProps: {
        options: merchantOptions,
      },
    },
    {
      title: t('usersPage.columns.role'),
      dataIndex: 'role',
      valueType: 'select',
      fieldProps: {
        options: [
          { label: t('roles.super_admin'), value: 'super_admin' },
          { label: t('roles.admin'), value: 'admin' },
          { label: t('roles.audit_admin'), value: 'audit_admin' },
        ],
      },
      render: (_dom, record) => <RoleTag role={record.role} />,
    },
    {
      title: t('usersPage.columns.lastLogin'),
      dataIndex: 'lastLogin',
      valueType: 'date',
      render: (_dom, record) => record.lastLogin,
    },
    {
      title: t('usersPage.columns.status'),
      dataIndex: 'status',
      valueType: 'switch',
      initialValue: true,
      fieldProps: {
        checkedChildren: t('common.on'),
        unCheckedChildren: t('common.off'),
      },
      render: (_dom, record) => <StatusTag status={record.status} />,
    },
    {
      title: t('usersPage.columns.actions'),
      dataIndex: 'actions',
      hideInSearch: true,
      width: 120,
      render: (_dom, record) => (
        <TableActions
          onDelete={() => {}}
          renderEditBtn={(btn) => (
            <Drawer size="small" trigger={btn}>
              <LazyDrawerContent>
                <UserDetail record={record} />
              </LazyDrawerContent>
            </Drawer>
          )}
        />
      ),
    },
  ], [t]);

  const newUserButton = (
    <Drawer size="medium" trigger={<Button type="primary">{t('usersPage.newUser')}</Button>}>
      <LazyDrawerContent>
        <UserConfig />
      </LazyDrawerContent>
    </Drawer>
  );

  return (
    <PageContainer
      title={t('menu.users')}
      extra={newUserButton}
    >
      <NiceTable<UserRecord>
        tableName="users"
        columns={columns}
        dataSource={mockData}
        rowKey="key"
        toolBarRender={false}
        search={proTableSearchConfig}
        pagination={{
          ...proTableDrawerPagination,
          total: 17,
        }}
        renderEmptyAction={() => newUserButton}
      />
    </PageContainer>
  );
};

export default Users;
