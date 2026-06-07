import type { FC } from 'react';
import { lazy, useMemo } from 'react';
import { useSafeState } from 'ahooks';
import { useTranslation } from 'react-i18next';
import { Button, Space, Tabs, Row, Col } from 'antd';
import { PageContainer, ProCard, ProForm } from '@ant-design/pro-components';

import Drawer from '@/components/Drawer';
import LazyDrawerContent from '@/components/LazyDrawerContent';
import KnowledgeFilterForm from './components/KnowledgeFilterForm';
import GraphVisualization from './components/GraphVisualization';
import { IconImport, IconTable } from '@/components/BaseIcons';
import DataGrid from './components/DataGrid';

const KnowledgeSources = lazy(() => import('@/bsComponents/KnowledgeSources'));
const UpdateKnowledges = lazy(() => import('@/bsComponents/UpdateKnowledge'));

const Knowledges: FC = () => {
  const { t } = useTranslation();
  const [form] = ProForm.useForm();
  const [, setSearchParams] = useSafeState<Record<string, unknown>>({});

  const tabItems = useMemo(
    () => [
      {
        key: 'data_grid',
        label: t('knowledgesPage.dataGrid'),
        children: <DataGrid />,
      },
      {
        key: 'graph_visualization',
        label: t('knowledgesPage.graphVisualization'),
        children: <GraphVisualization />,
      },
    ],
    [t],
  );

  return (
    <PageContainer
      title={t('menu.knowledges')}
      extra={
        <Space size={16}>
          <Drawer
            trigger={(
              <Button icon={<IconImport />}>
                {t('knowledgesPage.updateKnowledges')}
              </Button>
            )}
          >
            <LazyDrawerContent>
              <UpdateKnowledges />
            </LazyDrawerContent>
          </Drawer>
          <Drawer
            trigger={(
              <Button
                type="primary"
                icon={<IconTable />}
              >
                {t('knowledgesPage.knowledgeSources')}
              </Button>
            )}
          >
            <LazyDrawerContent>
              <KnowledgeSources />
            </LazyDrawerContent>
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
            destroyOnHidden
            items={tabItems}
          />
        </Col>
      </Row>
    </PageContainer>
  );
};

export default Knowledges;
