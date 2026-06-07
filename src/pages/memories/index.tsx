import type { FC } from 'react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  AppstoreOutlined,
  DeleteOutlined,
  EditOutlined,
  HistoryOutlined,
  PushpinOutlined,
} from '@ant-design/icons';
import { Button, Progress, Space, Tag, Tooltip } from 'antd';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-table';

import { useStatusValueEnum } from '@/hooks/useStatusValueEnum';
import StatusTag from '@/components/StatusTag';
import {
  createProTableEmptyViewRenderer,
  proTableDrawerPagination,
  proTableSearchConfig,
} from '@/utils/proTable';
import PageActions from './components/PageActions';
import type { MemoryRecord, MemoryType } from './types';

const mockData: MemoryRecord[] = [
  {
    key: '1',
    user: 'James Smith',
    memory: 'User has severe peanut allergy',
    type: 'semantics',
    graphs: 104,
    clarity: 0.95,
    status: 'enabled',
  },
  {
    key: '2',
    user: 'James Smith',
    memory: 'User is currently traveling in France',
    type: 'scenario',
    graphs: 85,
    clarity: 0.78,
    status: 'enabled',
  },
  {
    key: '3',
    user: 'James Smith',
    memory: 'The user expressed dissatisfaction with the previous service experience',
    type: 'semantics',
    graphs: 7,
    clarity: 0.18,
    status: 'disabled',
  },
];

const typeTagColor: Record<MemoryType, string> = {
  semantics: 'purple',
  scenario: 'blue',
};

const getClarityStrokeColor = (value: number) => {
  if (value >= 0.7) {
    return '#52c41a';
  }
  if (value >= 0.4) {
    return '#95de64';
  }
  return '#b7eb8f';
};

const Memories: FC = () => {
  const { t } = useTranslation();

  const typeValueEnum = useMemo(() => ({
    semantics: { text: t('memoriesPage.types.semantics') },
    scenario: { text: t('memoriesPage.types.scenario') },
  }), [t]);

  const statusValueEnum = useStatusValueEnum();

  const columns: ProColumns<MemoryRecord>[] = useMemo(() => [
    {
      title: t('memoriesPage.columns.user'),
      dataIndex: 'user',
    },
    {
      title: t('memoriesPage.columns.memory'),
      dataIndex: 'memory',
      ellipsis: true,
    },
    {
      title: t('memoriesPage.columns.type'),
      dataIndex: 'type',
      valueType: 'select',
      valueEnum: typeValueEnum,
      render: (_dom, record) => (
        <Tag color={typeTagColor[record.type]}>
          {t(`memoriesPage.types.${record.type}`)}
        </Tag>
      ),
    },
    {
      title: t('memoriesPage.columns.graphs'),
      dataIndex: 'graphs',
      valueType: 'digit',
    },
    {
      title: t('memoriesPage.columns.clarity'),
      dataIndex: 'clarity',
      valueType: 'digit',
      initialValue: 0.5,
      fieldProps: {
        min: 0,
        max: 1,
        step: 0.01,
      },
      render: (_dom, record) => (
        <Space size={8}>
          <Progress
            percent={record.clarity * 100}
            showInfo={false}
            size="small"
            strokeColor={getClarityStrokeColor(record.clarity)}
            className="w-[80px]"
          />
          <span>{record.clarity.toFixed(2)}</span>
        </Space>
      ),
    },
    {
      title: t('memoriesPage.columns.status'),
      dataIndex: 'status',
      valueType: 'select',
      initialValue: 'enabled',
      valueEnum: statusValueEnum,
      render: (_dom, record) => <StatusTag status={record.status} />,
    },
    {
      title: t('memoriesPage.columns.actions'),
      dataIndex: 'actions',
      hideInSearch: true,
      width: 200,
      render: () => (
        <Space size={12}>
          <Tooltip title={t('memoriesPage.actions.pin')}>
            <Button
              size="small"
              color="default"
              variant="filled"
              icon={<PushpinOutlined />}
              onClick={() => {}}
            />
          </Tooltip>
          <Tooltip title={t('common.edit')}>
            <Button
              size="small"
              color="default"
              variant="filled"
              icon={<EditOutlined />}
              onClick={() => {}}
            />
          </Tooltip>
          <Tooltip title={t('common.delete')}>
            <Button
              size="small"
              color="danger"
              variant="filled"
              icon={<DeleteOutlined />}
              onClick={() => {}}
            />
          </Tooltip>
          <Tooltip title={t('memoriesPage.actions.history')}>
            <Button
              size="small"
              color="default"
              variant="filled"
              icon={<HistoryOutlined />}
              onClick={() => {}}
            />
          </Tooltip>
          <Tooltip title={t('memoriesPage.actions.details')}>
            <Button
              size="small"
              color="default"
              variant="filled"
              icon={<AppstoreOutlined />}
              onClick={() => {}}
            />
          </Tooltip>
        </Space>
      ),
    },
  ], [t, typeValueEnum, statusValueEnum]);

  const tableEmptyViewRenderer = useMemo(
    () => createProTableEmptyViewRenderer({ description: t('common.noDataAvailable') }),
    [t],
  );

  return (
    <PageContainer
      title={t('menu.memories')}
      extra={<PageActions />}
    >
      <ProTable<MemoryRecord>
        columns={columns}
        dataSource={mockData}
        rowKey="key"
        toolBarRender={false}
        search={proTableSearchConfig}
        pagination={{
          ...proTableDrawerPagination,
          total: 17,
        }}
        tableViewRender={tableEmptyViewRenderer}
      />
    </PageContainer>
  );
};

export default Memories;
