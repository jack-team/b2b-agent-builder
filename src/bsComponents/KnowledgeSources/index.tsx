import type { FC } from 'react';
import { Tag, Button, Space, Empty } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ProTable } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-table';
import Drawer, { DrawerContainer } from '@/components/Drawer';
import UpdateKnowledge from '@/bsComponents/UpdateKnowledge';

interface KnowledgeSource {
  key: string;
  documentName: string;
  type: string;
  keywords: string[];
  status: string;
}

const mockData: KnowledgeSource[] = [
  {
    key: '1',
    documentName: 'AI terms and concept relationships',
    type: 'Document',
    keywords: ['LLM', 'Agent', 'ACP', 'MCP', 'Skill'],
    status: 'enabled',
  },
  {
    key: '2',
    documentName: 'UI/UX design specifications',
    type: 'Document',
    keywords: ['Color system', 'Design', 'UI', 'UX'],
    status: 'enabled',
  },
  {
    key: '3',
    documentName: 'UI/UX design specifications',
    type: 'Document',
    keywords: ['Color system', 'Design', 'UI', 'UX'],
    status: 'enabled',
  },
  {
    key: '4',
    documentName: 'AI Agent Agent Orchestration and Automation ...',
    type: 'Document',
    keywords: ['Workflow', 'Relationship', 'Orchestration'],
    status: 'disabled',
  },
  {
    key: '5',
    documentName: 'AI Agent Agent Orchestration and Automation ...',
    type: 'Document',
    keywords: ['Workflow', 'Relationship', 'Orchestration'],
    status: 'disabled',
  },
  {
    key: '6',
    documentName: 'AI Agent Agent Orchestration and Automation ...',
    type: 'Document',
    keywords: ['Workflow', 'Relationship', 'Orchestration'],
    status: 'disabled',
  },
  {
    key: '7',
    documentName: 'AI Agent Agent Orchestration and Automation ...',
    type: 'Document',
    keywords: ['Workflow', 'Relationship', 'Orchestration'],
    status: 'disabled',
  },
  {
    key: '8',
    documentName: 'AI Agent Agent Orchestration and Automation ...',
    type: 'Document',
    keywords: ['Workflow', 'Relationship', 'Orchestration'],
    status: 'disabled',
  },
  {
    key: '9',
    documentName: 'AI Agent Agent Orchestration and Automation ...',
    type: 'Document',
    keywords: ['Workflow', 'Relationship', 'Orchestration'],
    status: 'disabled',
  },
];

const columns: ProColumns<KnowledgeSource>[] = [
  {
    title: 'Document Name',
    dataIndex: 'documentName',
  },
  {
    title: 'Type',
    dataIndex: 'type',
  },
  {
    title: 'Keywords',
    dataIndex: 'keywords',
    render: (_dom, record) => (
      <div className="flex flex-wrap gap-[6px]">
        {record.keywords.map((keyword) => (
          <Tag key={keyword}>
            {keyword}
          </Tag>
        ))}
      </div>
    ),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: (_dom, record) => (
      <Tag>
        {record.status === 'enabled' ? 'Enabled' : 'Disabled'}
      </Tag>
    ),
  },
  {
    title: 'Actions',
    hideInSearch: true,
    dataIndex: 'actions',
    width: 140,
    render: () => (
      <Space size={12}>
        <Button size="small">Edit</Button>
        <Button danger size="small">Delete</Button>
      </Space>
    ),
  },
];

const KnowledgeSources: FC = () => {
  const renderNewKnowledgeButton = () => (
    <Drawer
      size="var(--drawer-width)"
      trigger={
        <Button
          type="primary"
          icon={<PlusOutlined />}
        >
          New Knowledge
        </Button>
      }
    >
      <UpdateKnowledge />
    </Drawer>
  );

  return (
    <DrawerContainer
      title="Knowledge Sources"
      extra={renderNewKnowledgeButton()}
    >
      <ProTable
        size="medium"
        columns={columns}
        toolBarRender={false}
        dataSource={mockData}
        search={{
          layout: 'vertical'
        }}
        tableViewRender={({ dataSource = [] }, dom) => {
          if (!dataSource.length) {
            return (
              <div className="py-[56px]">
                <Empty>{renderNewKnowledgeButton()}</Empty>
              </div>
            );
          }
          return dom;
        }}
      />
    </DrawerContainer>
  );
};

export default KnowledgeSources;
