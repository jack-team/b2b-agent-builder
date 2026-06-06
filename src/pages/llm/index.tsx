import type { FC } from 'react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { RobotOutlined } from '@ant-design/icons';
import { Button, Space, Tooltip } from 'antd';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-table';

import Drawer from '@/components/Drawer';
import StatusTag from '@/components/StatusTag';
import TableActions from '@/components/TableActions';
import LLMModelConfig from '@/bsComponents/LLMModelConfig';
import LLMAgents from '@/bsComponents/LLMAgents';
import type { LLMModel } from '@/bsComponents/LLMModelConfig/types';
import {
  proTableDrawerPagination,
  proTableSearchConfig,
  renderProTableEmptyView,
} from '@/utils/proTable';

const mockData: LLMModel[] = [
  {
    key: '1',
    modelName: 'Shopify MCP',
    modelId: 'Stdio',
    apiUrl: '30000',
    status: 'enabled',
  },
  {
    key: '2',
    modelName: 'Github',
    modelId: 'HTTP',
    apiUrl: '10000',
    status: 'enabled',
  },
  {
    key: '3',
    modelName: 'IdeaBosque',
    modelId: 'Websocket',
    apiUrl: '30000',
    status: 'disabled',
  },
];

const LLM: FC = () => {
  const { t } = useTranslation();

  const statusValueEnum = useMemo(() => ({
    enabled: { text: t('common.enabled'), status: 'Success' as const },
    disabled: { text: t('common.disabled'), status: 'Default' as const },
  }), [t]);

  const columns: ProColumns<LLMModel>[] = useMemo(() => [
    {
      title: t('llmPage.columns.modelName'),
      dataIndex: 'modelName',
    },
    {
      title: t('llmPage.columns.modelId'),
      dataIndex: 'modelId',
    },
    {
      title: t('llmPage.columns.apiUrl'),
      dataIndex: 'apiUrl',
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
      render: (_dom, record) => (
        <Space size={12}>
          <TableActions
            onDelete={() => { }}
            renderEditBtn={(btn) => (
              <Drawer size="medium" trigger={btn}>
                <LLMModelConfig record={record} />
              </Drawer>
            )}
          />
          <Drawer
            size="large"
            trigger={
              <Tooltip title={t('common.agents')}>
                <Button
                  size="small"
                  color="primary"
                  variant="filled"
                  icon={<RobotOutlined />}
                />
              </Tooltip>
            }
          >
            <LLMAgents modelName={record.modelName} />
          </Drawer>
        </Space>
      ),
    },
  ], [t, statusValueEnum]);

  return (
    <PageContainer
      title={t('menu.largeLanguageModels')}
      extra={
        <Drawer
          size="medium"
          trigger={<Button type="primary">{t('llmPage.newModel')}</Button>}
        >
          <LLMModelConfig />
        </Drawer>
      }
    >
      <ProTable<LLMModel>
        columns={columns}
        dataSource={mockData}
        rowKey="key"
        toolBarRender={false}
        search={proTableSearchConfig}
        pagination={{
          ...proTableDrawerPagination,
          total: mockData.length,
        }}
        tableViewRender={renderProTableEmptyView}
      />
    </PageContainer>
  );
};

export default LLM;
