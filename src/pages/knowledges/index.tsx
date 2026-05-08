import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Table, Button, Input, Space } from 'antd';
import { PageContainer } from '@ant-design/pro-components'

const Knowledges: FC = () => {
  const { t } = useTranslation();

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: t('menu.knowledges'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => <Button type="link">Edit</Button>,
    },
  ];

  const data = [
    {
      id: '1',
      name: 'Product Documentation',
      description: 'Product knowledge base',
      createdAt: '2024-01-01',
    },
    {
      id: '2',
      name: 'FAQ',
      description: 'Frequently asked questions',
      createdAt: '2024-01-02',
    },
  ];

  return (
    <PageContainer title="Knowledges" extra={
      <Space>
        <Button>
          Knowledge Sources
        </Button>
      </Space>
    }>

    </PageContainer>
  );
};

export default Knowledges;
