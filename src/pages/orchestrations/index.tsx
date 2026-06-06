import type { FC } from 'react';
import { useMemo } from 'react';
import dayjs from 'dayjs';
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  SwapOutlined,
} from '@ant-design/icons';
import { Button, DatePicker, Space, Tooltip } from 'antd';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-table';
import { useTranslation } from 'react-i18next';

import {
  proTableDrawerPagination,
  proTableSearchConfig,
  renderProTableEmptyView,
} from '@/utils/proTable';
import type { OrchestrationRecord } from './types';
import { useSearchField } from './useSearchField';

const mockData: OrchestrationRecord[] = [
  {
    key: '1',
    name: 'RFQ (Request for Quote)',
    description: 'A formal procurement document used to solicit price quotations from potential suppliers for specific products or services.',
    updatedAt: '2026-04-07T13:47:24',
    status: 'enabled',
  },
  {
    key: '2',
    name: 'Expense Approval',
    description: 'A multi-step workflow where employees submit expense claims, managers review them, and finance processes reimbursements.',
    updatedAt: '2026-04-03T10:29:32',
    status: 'enabled',
  },
  {
    key: '3',
    name: 'Shipping Process',
    description: 'The workflow from order picking and packing through carrier handoff, tracking, and delivery confirmation.',
    updatedAt: '2026-04-01T09:11:19',
    status: 'disabled',
  },
];

const formatUpdatedAt = (value: string) =>
  dayjs(value).format('DD/MM/YYYY HH:mm:ss');

const Orchestrations: FC = () => {
  const { t } = useTranslation();
  const renderSearchField = useSearchField();

  const statusValueEnum = useMemo(
    () => ({
      enabled: { text: t('common.enabled') },
      disabled: { text: t('common.disabled') },
    }),
    [t],
  );

  const columns: ProColumns<OrchestrationRecord>[] = useMemo(
    () => [
      {
        title: t('orchestrationsPage.columns.name'),
        dataIndex: 'name',
        renderFormItem: renderSearchField,
      },
      {
        title: t('orchestrationsPage.columns.description'),
        dataIndex: 'description',
        ellipsis: true,
        renderFormItem: renderSearchField,
      },
      {
        title: t('orchestrationsPage.columns.updatedAt'),
        dataIndex: 'updatedAt',
        valueType: 'dateTime',
        renderFormItem: () => <DatePicker showTime className="w-full" />,
        render: (_dom, record) => formatUpdatedAt(record.updatedAt),
      },
      {
        title: t('orchestrationsPage.columns.status'),
        dataIndex: 'status',
        valueType: 'select',
        initialValue: 'enabled',
        valueEnum: statusValueEnum,
        render: (_dom, record) =>
          record.status === 'enabled'
            ? t('common.enabled')
            : t('common.disabled'),
      },
      {
        title: t('orchestrationsPage.columns.actions'),
        dataIndex: 'actions',
        hideInSearch: true,
        width: 180,
        render: () => (
          <Space size={12}>
            <Tooltip title={t('orchestrationsPage.actions.view')}>
              <Button size="small" color="default" variant="filled">
                <EyeOutlined />
              </Button>
            </Tooltip>
            <Tooltip title={t('common.edit')}>
              <Button size="small" color="default" variant="filled">
                <EditOutlined />
              </Button>
            </Tooltip>
            <Tooltip title={t('orchestrationsPage.actions.transfer')}>
              <Button size="small" color="default" variant="filled">
                <SwapOutlined />
              </Button>
            </Tooltip>
            <Tooltip title={t('common.delete')}>
              <Button size="small" color="danger" variant="filled">
                <DeleteOutlined />
              </Button>
            </Tooltip>
          </Space>
        ),
      },
    ],
    [t, renderSearchField, statusValueEnum],
  );

  return (
    <PageContainer title={t('menu.orchestrations')}>
      <ProTable<OrchestrationRecord>
        columns={columns}
        dataSource={mockData}
        rowKey="key"
        toolBarRender={false}
        search={{
          ...proTableSearchConfig,
          searchText: t('common.search'),
          resetText: t('common.reset'),
        }}
        pagination={{
          ...proTableDrawerPagination,
          total: 17,
        }}
        tableViewRender={renderProTableEmptyView}
      />
    </PageContainer>
  );
};

export default Orchestrations;
