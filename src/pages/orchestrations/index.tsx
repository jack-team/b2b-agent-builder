import type { FC } from 'react';
import { lazy, useMemo } from 'react';
import dayjs from 'dayjs';
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  SwapOutlined,
} from '@ant-design/icons';
import { Button, Space, Tooltip } from 'antd';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-table';
import { useTranslation } from 'react-i18next';

import { useStatusValueEnum } from '@/hooks/useStatusValueEnum';
import Drawer from '@/components/Drawer';
import LazyDrawerContent from '@/components/LazyDrawerContent';
import StatusTag from '@/components/StatusTag';
import {
  getTextSearchFieldProps,
  proTableDrawerPagination,
  proTableSearchConfig,
  renderProTableEmptyView,
} from '@/utils/proTable';
import type { OrchestrationRecord } from './types';

const OrchestrationBasicInfo = lazy(() => import('@/bsComponents/OrchestrationBasicInfo'));
const OrchestrationFlowEditor = lazy(() => import('@/bsComponents/OrchestrationFlowEditor'));

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
    name: 'Harmonization',
    description: 'The workflow from order picking and packing through carrier handoff, tracking, and delivery confirmation.',
    updatedAt: '2026-04-01T09:11:19',
    status: 'disabled',
  },
];

const formatUpdatedAt = (value: string) =>
  dayjs(value).format('DD/MM/YYYY HH:mm:ss');

const Orchestrations: FC = () => {
  const { t } = useTranslation();

  const textSearchFieldProps = useMemo(
    () => getTextSearchFieldProps(t('common.pleaseEnter')),
    [t],
  );

  const statusValueEnum = useStatusValueEnum();

  const columns: ProColumns<OrchestrationRecord>[] = useMemo(
    () => [
      {
        title: t('orchestrationsPage.columns.name'),
        dataIndex: 'name',
        fieldProps: textSearchFieldProps,
      },
      {
        title: t('orchestrationsPage.columns.description'),
        dataIndex: 'description',
        ellipsis: true,
        fieldProps: textSearchFieldProps,
      },
      {
        title: t('orchestrationsPage.columns.updatedAt'),
        dataIndex: 'updatedAt',
        valueType: 'dateTime',
        fieldProps: {
          showTime: true,
          className: 'w-full',
        },
        render: (_dom, record) => formatUpdatedAt(record.updatedAt),
      },
      {
        title: t('orchestrationsPage.columns.status'),
        dataIndex: 'status',
        valueType: 'select',
        initialValue: 'enabled',
        valueEnum: statusValueEnum,
        render: (_dom, record) => <StatusTag status={record.status} />,
      },
      {
        title: t('orchestrationsPage.columns.actions'),
        dataIndex: 'actions',
        hideInSearch: true,
        width: 180,
        render: (_dom, record) => (
          <Space size={12}>
            <Tooltip title={t('orchestrationsPage.actions.view')}>
              <Drawer
                size="large"
                trigger={(
                  <Button size="small" color="default" variant="filled">
                    <EyeOutlined />
                  </Button>
                )}
              >
                <LazyDrawerContent>
                  <OrchestrationFlowEditor record={record} />
                </LazyDrawerContent>
              </Drawer>
            </Tooltip>
            <Tooltip title={t('common.edit')}>
              <Drawer
                size="medium"
                trigger={(
                  <Button size="small" color="default" variant="filled">
                    <EditOutlined />
                  </Button>
                )}
              >
                <LazyDrawerContent>
                  <OrchestrationBasicInfo record={record} />
                </LazyDrawerContent>
              </Drawer>
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
    [t, textSearchFieldProps, statusValueEnum],
  );

  const renderNewOrchestrationButton = () => (
    <Drawer
      size="medium"
      trigger={(
        <Button type="primary">
          {t('orchestrationsPage.newOrchestration')}
        </Button>
      )}
    >
      <LazyDrawerContent>
        <OrchestrationBasicInfo />
      </LazyDrawerContent>
    </Drawer>
  );

  return (
    <PageContainer
      title={t('menu.orchestrations')}
      extra={renderNewOrchestrationButton()}
    >
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
