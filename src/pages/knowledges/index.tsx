import type { FC } from 'react';
import { Button, Space, Tabs, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import Drawer from '@/components/Drawer';
import KnowledgeFilterForm from './components/KnowledgeFilterForm';
import GraphVisualization from './components/GraphVisualization';
import ImportIcon from '@/assets/svg-icons/page/import.svg?react';
import TableIcon from '@/assets/svg-icons/page/table.svg?react';
import DataGrid from './components/DataGrid';
import KnowledgeSources from '@/bsComponents/KnowledgeSources';
import UpdateKnowledges from '@/bsComponents/UpdateKnowledge';

const Knowledges: FC = () => {
  const { t } = useTranslation();

  return (
    <PageContainer
      title={t('menu.knowledges')}
      extra={
        <Space size={16}>
          <Drawer
            trigger={(
              <Button icon={<ImportIcon />}>
                Update Knowledges
              </Button>
            )}
          >
            <UpdateKnowledges />
          </Drawer>
          <Drawer
            trigger={(
              <Button type="primary" icon={<TableIcon />}>
                Knowledge Sources
              </Button>
            )}
          >
            <KnowledgeSources />
          </Drawer>
        </Space>
      }
    >
      <Row gutter={[0, 16]}>
        <Col span={24}>
          <ProCard
            title="Filters"
            collapsible="icon"
          >
            <KnowledgeFilterForm />
          </ProCard>
        </Col>
        <Col span={24}>
          <Tabs
            className="card-tabs"
            items={[
              {
                key: 'data_grid',
                label: 'Data Grid',
                children: <DataGrid />,
              },
              {
                key: 'graph_visualization',
                label: 'Graph Visualization',
                children: <GraphVisualization />,
              }
            ]}
          />
        </Col>
      </Row>
    </PageContainer>
  );
};

export default Knowledges;
