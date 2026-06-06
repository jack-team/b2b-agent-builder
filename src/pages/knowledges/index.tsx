import type { FC } from 'react';
import { useSafeState } from 'ahooks';
import { useTranslation } from 'react-i18next';
import { Button, Space, Tabs, Row, Col } from 'antd';
import { PageContainer, ProCard, ProForm } from '@ant-design/pro-components';

import Drawer from '@/components/Drawer';
import KnowledgeFilterForm from './components/KnowledgeFilterForm';
import GraphVisualization from './components/GraphVisualization';
import ImportIcon from '@/assets/svg-icons/page/import.svg?react';
import TableIcon from '@/assets/svg-icons/page/table.svg?react';
import KnowledgeSources from '@/bsComponents/KnowledgeSources';
import UpdateKnowledges from '@/bsComponents/UpdateKnowledge';
import DataGrid from './components/DataGrid';

const Knowledges: FC = () => {
  const { t } = useTranslation();
  const [form] = ProForm.useForm();
  const [searchParams, setSearchParams] = useSafeState<Record<string, any>>({});


  return (
    <PageContainer
      title={t('menu.knowledges')}
      extra={
        <Space size={16}>
          <Drawer
            trigger={(
              <Button icon={<ImportIcon />}>
                {t('knowledgesPage.updateKnowledges')}
              </Button>
            )}
          >
            <UpdateKnowledges />
          </Drawer>
          <Drawer
            trigger={(
              <Button
                type="primary"
                icon={<TableIcon />}
              >
                {t('knowledgesPage.knowledgeSources')}
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
            title={t('knowledgesPage.filters')}
            collapsible="icon"
          >
            <KnowledgeFilterForm
              form={form}
              onSearch={setSearchParams}
            />
          </ProCard>
        </Col>
        <Col span={24}>
          <Tabs
            className="card-tabs"
            items={[
              {
                key: 'data_grid',
                label: t('knowledgesPage.dataGrid'),
                children: <DataGrid />,
              },
              {
                key: 'graph_visualization',
                label: t('knowledgesPage.graphVisualization'),
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
