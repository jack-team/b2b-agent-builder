import type { FC, JSX } from 'react';
import { useMemo } from 'react';
import { Tag, Button, Empty } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ProTable } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-table';
import { useTranslation } from 'react-i18next';
import { DrawerContainer } from '@/components/Drawer';
import Drawer from '@/components/Drawer';
import TableActions from '@/components/TableActions';
import KnowledgeTypeEdit from './edit';

interface KnowledgeType {
  key: string;
  typeName: string;
  code: string;
  description: string;
  status: string;
}

const mockData: KnowledgeType[] = [
  {
    key: '1',
    typeName: 'Product',
    code: 'product',
    description: 'Any tangible or intangible item that is offered for ...',
    status: 'enabled',
  },
  {
    key: '2',
    typeName: 'Product',
    code: 'product',
    description: 'Any tangible or intangible item that is offered for ...',
    status: 'enabled',
  },
  {
    key: '3',
    typeName: 'User',
    code: 'user',
    description: 'The User type identifies a person, account, or agent ...',
    status: 'enabled',
  },
  {
    key: '4',
    typeName: 'Company',
    code: 'company',
    description: 'A commercial organization or business entity, such ...',
    status: 'disabled',
  },
  {
    key: '5',
    typeName: 'Company',
    code: 'company',
    description: 'A commercial organization or business entity, such ...',
    status: 'disabled',
  },
  {
    key: '6',
    typeName: 'Product',
    code: 'product',
    description: 'Any tangible or intangible item that is offered for ...',
    status: 'enabled',
  }
];

const KnowledgeTypeManager: FC = () => {
  const { t } = useTranslation();

  const renderDrawerForm = (trigger: JSX.Element) => {
    return (
      <Drawer
        size="small"
        trigger={trigger}
      >
        <KnowledgeTypeEdit />
      </Drawer>
    );
  }

  const renderCreateNew = () => (
    renderDrawerForm(<Button type="primary" icon={<PlusOutlined />}>{t('common.create')}</Button>)
  );

  const columns: ProColumns<KnowledgeType>[] = useMemo(() => [
    {
      title: t('knowledgeType.columns.typeName'),
      dataIndex: 'typeName',
    },
    {
      title: t('knowledgeType.columns.code'),
      dataIndex: 'code'
    },
    {
      title: t('knowledgeType.columns.description'),
      dataIndex: 'description',
    },
    {
      title: t('knowledgeType.columns.status'),
      dataIndex: 'status',
      render: (_dom, record) => (
        <Tag color={record.status === 'enabled' ? 'success' : 'warning'}>
          {record.status === 'enabled' ? t('common.enabled') : t('common.disabled')}
        </Tag>
      ),
    },
    {
      title: t('knowledgeType.columns.actions'),
      hideInSearch: true,
      dataIndex: 'actions',
      width: 120,
      render: () => (
        <TableActions
          renderEditBtn={renderDrawerForm}
        />
      ),
    },
  ], [t]);

  return (
    <DrawerContainer
      title={t('knowledgeType.knowledgeTypes')}
      extra={renderCreateNew()}
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
          showTotal: (total, range) =>
            t('common.paginationTotal', { start: range[0], end: range[1], total }),
        }}
        tableViewRender={({ dataSource = [] }, dom) => {
          if (!dataSource.length) {
            return (
              <div className="py-[56px]">
                <Empty description={t('common.noDataAvailable')}>
                  {renderCreateNew()}
                </Empty>
              </div>
            );
          }
          return dom;
        }}
      />
    </DrawerContainer>
  );
};

export default KnowledgeTypeManager;
