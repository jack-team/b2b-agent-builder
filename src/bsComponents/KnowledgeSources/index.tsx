import type { FC } from 'react';
import { useMemo } from 'react';
import { Tag, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ProTable } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-table';
import { useTranslation } from 'react-i18next';
import Drawer, { DrawerContainer } from '@/components/Drawer';
import UpdateKnowledge from '@/bsComponents/UpdateKnowledge';
import StatusTag from '@/components/StatusTag';
import TableActions from '@/components/TableActions';
import { createProTableEmptyViewRenderer } from '@/utils/proTable';

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

const KnowledgeSources: FC = () => {
  const { t } = useTranslation();

  const columns: ProColumns<KnowledgeSource>[] = useMemo(() => [
    {
      title: t('knowledgesPage.columns.documentName'),
      dataIndex: 'documentName',
    },
    {
      title: t('knowledgesPage.columns.type'),
      dataIndex: 'type',
    },
    {
      title: t('knowledgesPage.columns.keywords'),
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
      title: t('common.status'),
      dataIndex: 'status',
      render: (_dom, record) => <StatusTag status={record.status} />,
    },
    {
      align: 'center',
      title: t('common.actions'),
      hideInSearch: true,
      dataIndex: 'actions',
      width: 100,
      render: () => (
        <TableActions onDelete={() => { }} />
      ),
    },
  ], [t]);

  const newKnowledgeButton = (
    <Drawer
      trigger={
        <Button
          type="primary"
          icon={<PlusOutlined />}
        >
          {t('knowledgesPage.updateKnowledges')}
        </Button>
      }
    >
      <UpdateKnowledge />
    </Drawer>
  );

  const tableEmptyViewRenderer = useMemo(
    () => createProTableEmptyViewRenderer({ action: newKnowledgeButton }),
    [t],
  );

  return (
    <DrawerContainer
      title={t('knowledgesPage.knowledgeSources')}
      extra={newKnowledgeButton}
    >
      <ProTable
        size="medium"
        columns={columns}
        toolBarRender={false}
        dataSource={mockData}
        search={{ layout: 'vertical' }}
        tableViewRender={tableEmptyViewRenderer}
      />
    </DrawerContainer>
  );
};

export default KnowledgeSources;
