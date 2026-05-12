import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Space, Card } from 'antd';
import { PageContainer } from '@ant-design/pro-components';
import Drawer, { DrawerContainer } from '@/components/Drawer';

const Knowledges: FC = () => {
  const { t } = useTranslation();
  return (
    <PageContainer
      title={t('menu.knowledges')}
      extra={
        <Space>
          <Drawer
            size="50vw"
            trigger={
              <Button type="primary" ghost={false}>
                Knowledge Sources
              </Button>
            }
          >
            <DrawerContainer
              title='Update Knowledge'
              extra={
                <Space>
                  <Button>Reset</Button>
                  <Button>Save</Button>
                </Space>
              }
            >
              <div className="h-[1000px]">
                Knowledge Sources
              </div>
            </DrawerContainer>
          </Drawer>
          <Button type="primary" ghost={false}>
            Import
          </Button>
        </Space>
      }
    >
      <Card title="Filters">

      </Card>
    </PageContainer>
  );
};

export default Knowledges;
