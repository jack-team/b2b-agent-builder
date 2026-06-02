import type { FC } from 'react';
import cls from 'classnames';
import { Tag, Input, Empty } from 'antd';
import { TableOutlined, SearchOutlined } from '@ant-design/icons';
import { ProTable, ProCard } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-table';
import { useSafeState } from 'ahooks';
import { DrawerContainer } from '@/components/Drawer';
import TableActions from '@/components/TableActions';
import styles from './styles.module.less';

interface ContextTool {
  key: string;
  toolName: string;
  description: string;
  status: string;
}

const runtimeLogItems = [
  { key: 'logs-1', label: 'Runtime Logs' },
  { key: 'logs-2', label: 'Runtime Logs' },
  { key: 'logs-3', label: 'Runtime Logs' },
];

const mockData: ContextTool[] = [
  {
    key: '1',
    toolName: 'List products',
    description: 'Returns a paginated list of products from the Shopify catalog.',
    status: 'enabled',
  },
  {
    key: '2',
    toolName: 'Get user info',
    description: 'Fetches customer profile and order history for the given user ID.',
    status: 'enabled',
  },
  {
    key: '3',
    toolName: 'Place order',
    description: 'Creates a draft order and submits it for fulfillment.',
    status: 'disabled',
  },
  {
    key: '4',
    toolName: 'List products',
    description: 'Returns a paginated list of products from the Shopify catalog.',
    status: 'enabled',
  },
  {
    key: '5',
    toolName: 'Get user info',
    description: 'Fetches customer profile and order history for the given user ID.',
    status: 'enabled',
  },
  {
    key: '6',
    toolName: 'Place order',
    description: 'Creates a draft order and submits it for fulfillment.',
    status: 'disabled',
  },
  {
    key: '7',
    toolName: 'List products',
    description: 'Returns a paginated list of products from the Shopify catalog.',
    status: 'enabled',
  },
  {
    key: '8',
    toolName: 'Get user info',
    description: 'Fetches customer profile and order history for the given user ID.',
    status: 'enabled',
  },
  {
    key: '9',
    toolName: 'Place order',
    description: 'Creates a draft order and submits it for fulfillment.',
    status: 'disabled',
  },
  {
    key: '10',
    toolName: 'List products',
    description: 'Returns a paginated list of products from the Shopify catalog.',
    status: 'enabled',
  },
  {
    key: '11',
    toolName: 'Get user info',
    description: 'Fetches customer profile and order history for the given user ID.',
    status: 'enabled',
  },
  {
    key: '12',
    toolName: 'Place order',
    description: 'Creates a draft order and submits it for fulfillment.',
    status: 'disabled',
  },
  {
    key: '13',
    toolName: 'List products',
    description: 'Returns a paginated list of products from the Shopify catalog.',
    status: 'enabled',
  },
  {
    key: '14',
    toolName: 'Get user info',
    description: 'Fetches customer profile and order history for the given user ID.',
    status: 'enabled',
  },
  {
    key: '15',
    toolName: 'Place order',
    description: 'Creates a draft order and submits it for fulfillment.',
    status: 'disabled',
  },
  {
    key: '16',
    toolName: 'List products',
    description: 'Returns a paginated list of products from the Shopify catalog.',
    status: 'enabled',
  },
  {
    key: '17',
    toolName: 'Get user info',
    description: 'Fetches customer profile and order history for the given user ID.',
    status: 'enabled',
  },
];

const columns: ProColumns<ContextTool>[] = [
  {
    title: 'Tool Name',
    dataIndex: 'toolName',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    ellipsis: true,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    valueType: 'select',
    valueEnum: {
      enabled: { text: 'Enabled' },
      disabled: { text: 'Disabled' },
    },
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
    width: 120,
    render: () => (
      <TableActions
        onEdit={() => { }}
        onDelete={() => { }}
      />
    ),
  },
];

const MCPToolContext: FC = () => {
  const [activeLogKey, setActiveLogKey] = useSafeState(runtimeLogItems[0].key);
  const [keyword, setKeyword] = useSafeState('');

  const filteredData = mockData.filter((item) => {
    if (!keyword.trim()) {
      return true;
    }
    const lowerKeyword = keyword.trim().toLowerCase();
    return (
      item.toolName.toLowerCase().includes(lowerKeyword)
      || item.description.toLowerCase().includes(lowerKeyword)
    );
  });

  return (
    <DrawerContainer title="Shopify MCP Tool Context">
      <div className={cls(styles.layout, 'h-full')}>
        <div className={cls(styles.sidebar, 'custom-pro-card-container')}>
          <Input
            allowClear
            placeholder="Search"
            prefix={<SearchOutlined />}
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
          />
          <div className={styles.menu_list}>
            {runtimeLogItems.map((item) => (
              <div
                key={item.key}
                className={cls(
                  styles.menu_item,
                  activeLogKey === item.key && styles.menu_item_active,
                )}
                onClick={() => setActiveLogKey(item.key)}
              >
                <TableOutlined />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={cls(styles.main, 'custom-pro-card-container')}>
          <ProTable<ContextTool>
            size="medium"
            rowKey="key"
            columns={columns}
            toolBarRender={false}
            dataSource={filteredData}
            search={{
              layout: 'vertical',
              labelWidth: 'auto',
            }}
            pagination={{
              pageSize: 3,
              showSizeChanger: false,
              showTotal: (total, range) => `${range[0]}-${range[1]} / ${total}`,
            }}
            tableViewRender={({ dataSource = [] }, dom) => {
              if (!dataSource.length) {
                return (
                  <div className="py-[56px]">
                    <Empty description="Nothing found yet." />
                  </div>
                );
              }
              return dom;
            }}
          />
        </div>
      </div>
    </DrawerContainer>
  );
};

export default MCPToolContext;
