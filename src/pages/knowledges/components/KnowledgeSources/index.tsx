import type { FC } from 'react';
import { Tag, Button, Space, Empty } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ProTable, ProCard } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-table';
import Drawer, { DrawerContainer } from '@/components/Drawer';
import UpdateKnowledge from '../UpdateKnowledge';

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
];

const columns: ProColumns<KnowledgeSource>[] = [
  {
    title: 'Document Name',
    dataIndex: 'documentName',
    ellipsis: true,
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
  return (
    <DrawerContainer title="Knowledge Sources">
      <ProTable
        columns={columns}
        toolBarRender={false}
        dataSource={mockData}
        search={{
          layout: 'vertical'
        }}
      />
      <ProCard className="mt-[24px] p-[24px]">
        <Empty description="No Data Available"  >
          <Drawer
            size="80vw"
            trigger={
              <Button
                type="primary"
                icon={<PlusOutlined />}
              >
                Update Knowledge
              </Button>
            }
          >
            <UpdateKnowledge />
          </Drawer>
        </Empty>
      </ProCard>
    </DrawerContainer>
  );
};

export default KnowledgeSources;
