import type { FC } from 'react';
import { Button, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import Drawer from '@/components/Drawer';
import KnowledgeFilterForm from './components/KnowledgeFilterForm';
import GraphVisualization from './components/GraphVisualization';
import ImportIcon from '@/assets/svg-icons/page/import.svg?react';
import TableIcon from '@/assets/svg-icons/page/table.svg?react';
import DataGrid from './components/DataGrid';
import KnowledgeSources from './components/KnowledgeSources';

const Knowledges: FC = () => {
  const { t } = useTranslation();

  return (
    <PageContainer
      title={t('menu.knowledges')}
      extra={
        <Space size={16}>
          <Drawer
            size="70vw"
            trigger={(
              <Button type="primary" icon={<TableIcon />}>
                Knowledge Sources
              </Button>
            )}
          >
            <KnowledgeSources />
          </Drawer>
          <Button type="primary" icon={<ImportIcon />}>Import</Button>
        </Space>
      }
    >
      <ProCard title="Filters">
        <KnowledgeFilterForm />
      </ProCard>
      <ProCard
        className="mt-[24px]"
        tabs={{
          type: 'card',
          items: [
            {
              key: 'graph_visualization',
              label: 'Graph Visualization',
              children: <GraphVisualization />,
            },
            {
              key: 'data_grid',
              label: 'Data Grid',
              children: <DataGrid />,
            }
          ]
        }}
      />
    </PageContainer>
  );
};

export default Knowledges;
