import type { FC, JSX } from 'react';
import { Tag, Button, Space, Empty } from 'antd';
import { ProTable } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-table';
import Drawer, { DrawerContainer } from '@/components/Drawer';
import MCPToolConfig from '@/bsComponents/MCPToolConfig';
import MCPToolContext from '@/bsComponents/MCPToolContext';

interface Tool {
  key: string;
  toolName: string;
  description: string;
  status: string;
}

const mockData: Tool[] = [
  {
    key: '1',
    toolName: 'CSV Parser',
    description: 'Parses CSV text into structured data (e.g., arrays or objects) fo...',
    status: 'enabled',
  },
  {
    key: '2',
    toolName: 'JSON Parser',
    description: 'Converts JSON strings into native objects/arrays for...',
    status: 'enabled',
  },
  {
    key: '3',
    toolName: 'PDF Parser',
    description: 'Extracts text, images, and metadata from PDF files for further...',
    status: 'disabled',
  },
  {
    key: '4',
    toolName: 'CSV Parser',
    description: 'Parses CSV text into structured data (e.g., arrays or objects) fo...',
    status: 'enabled',
  },
  {
    key: '5',
    toolName: 'JSON Parser',
    description: 'Converts JSON strings into native objects/arrays for...',
    status: 'enabled',
  },
  {
    key: '6',
    toolName: 'PDF Parser',
    description: 'Extracts text, images, and metadata from PDF files for further...',
    status: 'disabled',
  },
  {
    key: '7',
    toolName: 'CSV Parser',
    description: 'Parses CSV text into structured data (e.g., arrays or objects) fo...',
    status: 'enabled',
  },
  {
    key: '8',
    toolName: 'JSON Parser',
    description: 'Converts JSON strings into native objects/arrays for...',
    status: 'enabled',
  },
  {
    key: '9',
    toolName: 'PDF Parser',
    description: 'Extracts text, images, and metadata from PDF files for further...',
    status: 'disabled',
  },
  {
    key: '10',
    toolName: 'CSV Parser',
    description: 'Parses CSV text into structured data (e.g., arrays or objects) fo...',
    status: 'enabled',
  },
  {
    key: '11',
    toolName: 'JSON Parser',
    description: 'Converts JSON strings into native objects/arrays for...',
    status: 'enabled',
  },
  {
    key: '12',
    toolName: 'PDF Parser',
    description: 'Extracts text, images, and metadata from PDF files for further...',
    status: 'disabled',
  },
  {
    key: '13',
    toolName: 'CSV Parser',
    description: 'Parses CSV text into structured data (e.g., arrays or objects) fo...',
    status: 'enabled',
  },
  {
    key: '14',
    toolName: 'JSON Parser',
    description: 'Converts JSON strings into native objects/arrays for...',
    status: 'enabled',
  },
  {
    key: '15',
    toolName: 'PDF Parser',
    description: 'Extracts text, images, and metadata from PDF files for further...',
    status: 'disabled',
  },
  {
    key: '16',
    toolName: 'CSV Parser',
    description: 'Parses CSV text into structured data (e.g., arrays or objects) fo...',
    status: 'enabled',
  },
  {
    key: '17',
    toolName: 'JSON Parser',
    description: 'Converts JSON strings into native objects/arrays for...',
    status: 'enabled',
  },
];

const MCPTools: FC = () => {
  const renderToolConfigDrawer = (trigger: JSX.Element) => (
    <Drawer size="small" trigger={trigger}>
      <MCPToolConfig />
    </Drawer>
  );

  const renderExecutionContextDrawer = (trigger: JSX.Element) => (
    <Drawer size="large" trigger={trigger}>
      <MCPToolContext />
    </Drawer>
  );

  const columns: ProColumns<Tool>[] = [
    {
      title: 'Tool Name',
      dataIndex: 'toolName',
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_dom, record) => (
        <Tag color={record.status === 'enabled' ? 'success' : 'warning'}>
          {record.status === 'enabled' ? 'Enabled' : 'Disabled'}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      hideInSearch: true,
      dataIndex: 'actions',
      width: 200,
      render: () => (
        <Space size={8}>
          {renderToolConfigDrawer(<Button size="small">Config</Button>)}
          {renderExecutionContextDrawer(
            <Button size="small">Execution Context</Button>,
          )}
        </Space>
      ),
    },
  ];

  return (
    <DrawerContainer
      title="Shopify MCP Tools"
    >
      <ProTable
        size="medium"
        columns={columns}
        toolBarRender={false}
        dataSource={mockData}
        search={{
          layout: 'vertical',
        }}
        pagination={{
          pageSize: 6,
          showSizeChanger: false,
          showTotal: (total, range) => `${range[0]}-${range[1]} / ${total}`,
        }}
        tableViewRender={({ dataSource = [] }, dom) => {
          if (!dataSource.length) {
            return (
              <div className="py-[56px]">
                <Empty description="No Data Available" />
              </div>
            );
          }
          return dom;
        }}
      />
    </DrawerContainer>
  );
};

export default MCPTools;
