import type { FC } from 'react';
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

const statusValueEnum = {
  enabled: { text: 'Enabled', status: 'Success' as const },
  disabled: { text: 'Disabled', status: 'Default' as const },
};

const columns: ProColumns<LLMModel>[] = [
  {
    title: 'Model Name',
    dataIndex: 'modelName',
  },
  {
    title: 'Model ID',
    dataIndex: 'modelId',
  },
  {
    title: 'API URL',
    dataIndex: 'apiUrl',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    valueType: 'select',
    initialValue: 'enabled',
    valueEnum: statusValueEnum,
    render: (_dom, record) => <StatusTag status={record.status} />,
  },
  {
    title: 'Actions',
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
            <Tooltip title="Agents">
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
];

const LLM: FC = () => {
  const { t } = useTranslation();

  return (
    <PageContainer
      title={t('menu.largeLanguageModels')}
      extra={
        <Drawer
          size="medium"
          trigger={<Button type="primary">+ New Model</Button>}
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
