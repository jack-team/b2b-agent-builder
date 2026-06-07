import type { FC } from 'react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ToolOutlined } from '@ant-design/icons';
import { Button, Space, Tooltip } from 'antd';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-table';
import Drawer from '@/components/Drawer';
import StatusTag from '@/components/StatusTag';
import TableActions from '@/components/TableActions';
import MCPServerConfig from '@/bsComponents/MCPServerConfig';
import MCPTools from '@/bsComponents/MCPTools';
import i18n from '@/i18n';

interface Capability {
  key: string;
  providerName: string;
  transport: string;
  timeout: number;
  status: string;
}

const mockData: Capability[] = [
  {
    key: '1',
    providerName: 'Shopify MCP',
    transport: 'Stdio',
    timeout: 30000,
    status: 'enabled',
  },
  {
    key: '2',
    providerName: 'Github',
    transport: 'HTTP',
    timeout: 10000,
    status: 'enabled',
  },
  {
    key: '3',
    providerName: 'Github',
    transport: 'HTTP',
    timeout: 10000,
    status: 'enabled',
  },
  {
    key: '4',
    providerName: 'IdeaBosque',
    transport: 'Websocket',
    timeout: 30000,
    status: 'disabled',
  },
];

const Capabilities: FC = () => {
  const { t } = useTranslation();

  const columns: ProColumns<Capability>[] = useMemo(() => [
    {
      title: t('capabilitiesPage.columns.providerName'),
      dataIndex: 'providerName',
    },
    {
      title: t('capabilitiesPage.columns.transport'),
      dataIndex: 'transport',
    },
    {
      title: t('capabilitiesPage.columns.timeout'),
      dataIndex: 'timeout',
      render: (_dom, record) => `${record.timeout}`,
    },
    {
      title: t('capabilitiesPage.columns.status'),
      dataIndex: 'status',
      render: (_dom, record) => <StatusTag status={record.status} />,
    },
    {
      width: '120px',
      title: t('capabilitiesPage.columns.actions'),
      dataIndex: 'actions',
      hideInSearch: true,
      render: () => (
        <Space size={12}>
          <TableActions
            onDelete={() => { }}
            onEdit={() => { }}
          />
          <Tooltip title={t('common.tools')}>
            <Drawer size="large" trigger={
              <Button
                size="small"
                color="primary"
                variant="filled"
                icon={<ToolOutlined />}
              />
            }>
              <MCPTools />
            </Drawer>
          </Tooltip>
        </Space>
      ),
    },
  ], [t]);

  return (
    <PageContainer
      title={t('menu.capabilities')}
      extra={
        <Drawer
          size="small"
          trigger={<Button type="primary">{t('capabilitiesPage.newProvider')}</Button>}>
          <MCPServerConfig />
        </Drawer>
      }
    >
      <ProTable
        columns={columns}
        dataSource={mockData}
        pagination={{
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '50'],
          showTotal: (total, range) =>
            i18n.t('common.paginationTotal', {
              start: range[0],
              end: range[1],
              total,
            }),
          defaultCurrent: 1,
          defaultPageSize: 10,
          total: 17,
        }}
        search={{
          layout: 'vertical',
          labelWidth: 'auto',
        }}
        toolBarRender={false}
      />
    </PageContainer>
  );
};

export default Capabilities;
