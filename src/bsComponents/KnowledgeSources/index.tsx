import type { FC } from 'react';
import { Tag, Button, Empty } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ProTable, ProForm } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-table';
import Drawer, { DrawerContainer } from '@/components/Drawer';
import UpdateKnowledge from '@/bsComponents/UpdateKnowledge';
import TableActions from '@/components/TableActions';

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
  }
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
    align: 'center',
    title: 'Actions',
    hideInSearch: true,
    dataIndex: 'actions',
    width: 100,
    render: () => (
      <TableActions onDelete={() => { }} />
    ),
  },
];

const KnowledgeSources: FC = () => {
  const renderNewKnowledgeButton = () => (
    <Drawer
      trigger={
        <Button
          type="primary"
          icon={<PlusOutlined />}
        >
          Update Knowledges
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
        search={{ layout: 'vertical' }}
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
