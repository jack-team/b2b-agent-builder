import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Tag, Button, Space } from 'antd';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-table';
import Drawer from '@/components/Drawer';
import MCPServerConfig from '@/bsComponents/MCPServerConfig';

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

const columns: ProColumns<Capability>[] = [
  {
    title: 'Provider Name',
    dataIndex: 'providerName',
  },
  {
    title: 'Transport',
    dataIndex: 'transport',
  },
  {
    title: 'Timeout',
    dataIndex: 'timeout',
    render: (_dom, record) => `${record.timeout}`,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: (_dom, record) => (
      <Tag color={record.status === 'enabled' ? 'green' : 'red'}>
        {record.status === 'enabled' ? 'Enabled' : 'Disabled'}
      </Tag>
    ),
  },
  {
    width: '120px',
    title: 'Actions',
    dataIndex: 'actions',
    hideInSearch: true,
    render: () => (
      <Space size={12}>
        <Button size="small">Edit</Button>
        <Button danger size="small">Delete</Button>
        <Button size="small">Tools</Button>
      </Space>
    ),
  },
];

const Capabilities: FC = () => {
  const { t } = useTranslation();

  return (
    <PageContainer
      title={t('menu.capabilities')}
      extra={
        <Drawer
          size={700}
          trigger={<Button type="primary">+ New Provider</Button>}>
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
          showTotal: (total, range) => `${range[0]}-${range[1]} / ${total}`,
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
