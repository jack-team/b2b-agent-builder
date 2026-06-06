import type { FC } from 'react';
import { useMemo } from 'react';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { ProTable } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-table';

import { DrawerContainer } from '@/components/Drawer';
import StatusTag from '@/components/StatusTag';
import TableActions from '@/components/TableActions';
import {
  proTableDrawerPagination,
  proTableSearchConfig,
  renderProTableEmptyView,
} from '@/utils/proTable';
import type { AssociatedAgent, LLMAgentsProps } from './types';

const mockAgents: AssociatedAgent[] = [
  {
    key: '1',
    agentName: 'Customer Support Agent',
    createdAt: '2026-04-09',
    updatedAt: '2026-04-09',
    status: 'enabled',
  },
  {
    key: '2',
    agentName: 'Search Agent',
    createdAt: '2026-04-04',
    updatedAt: '2026-04-09',
    status: 'enabled',
  },
  {
    key: '3',
    agentName: 'Shopping Agent',
    createdAt: '2026-04-02',
    updatedAt: '2026-04-03',
    status: 'disabled',
  },
];

const formatDate = (value: string) => dayjs(value).format('DD/MM/YYYY');

const LLMAgents: FC<LLMAgentsProps> = ({ modelName, onClose }) => {
  const { t } = useTranslation();

  const statusValueEnum = useMemo(() => ({
    enabled: { text: t('common.enabled'), status: 'Success' as const },
    disabled: { text: t('common.disabled'), status: 'Default' as const },
  }), [t]);

  const columns: ProColumns<AssociatedAgent>[] = useMemo(() => [
    {
      title: t('llmPage.columnsAgentName'),
      dataIndex: 'agentName',
    },
    {
      title: t('llmPage.columnsCreatedAt'),
      dataIndex: 'createdAt',
      valueType: 'date',
      render: (_dom, record) => formatDate(record.createdAt),
    },
    {
      title: t('llmPage.columnsUpdatedAt'),
      dataIndex: 'updatedAt',
      valueType: 'date',
      render: (_dom, record) => formatDate(record.updatedAt),
    },
    {
      title: t('llmPage.columns.status'),
      dataIndex: 'status',
      valueType: 'select',
      initialValue: 'enabled',
      valueEnum: statusValueEnum,
      render: (_dom, record) => <StatusTag status={record.status} />,
    },
    {
      title: t('llmPage.columns.actions'),
      dataIndex: 'actions',
      hideInSearch: true,
      width: 120,
      render: () => (
        <TableActions
          onEdit={() => { }}
          onDelete={() => { }}
        />
      ),
    },
  ], [t, statusValueEnum]);

  const title = modelName
    ? t('llmPage.associatedAgentsWithModel', { modelName })
    : t('llmPage.associatedAgents');

  return (
    <DrawerContainer
      title={title}
      onClose={onClose}
    >
      <ProTable<AssociatedAgent>
        size="medium"
        columns={columns}
        dataSource={mockAgents}
        rowKey="key"
        toolBarRender={false}
        search={proTableSearchConfig}
        pagination={proTableDrawerPagination}
        tableViewRender={renderProTableEmptyView}
      />
    </DrawerContainer>
  );
};

export default LLMAgents;
