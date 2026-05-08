import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Row, Col, Statistic } from 'antd';
import { UserOutlined, FileTextOutlined, RocketOutlined, CloudOutlined } from '@ant-design/icons';

const Dashboard: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">{t('menu.dashboard')}</h1>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title={t('menu.users')}
              value={1024}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title={t('menu.knowledges')}
              value={256}
              prefix={<FileTextOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title={t('menu.capabilities')}
              value={64}
              prefix={<RocketOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title={t('menu.largeLanguageModels')}
              value={8}
              prefix={<CloudOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
