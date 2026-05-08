import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Row, Col, Statistic, Progress } from 'antd';

const Monitoring: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">{t('menu.monitoringAndAnalysis')}</h1>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic title="Total Requests" value={1024000} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Active Users" value={1024} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Success Rate" value={99.8} suffix="%" />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Avg Response Time" value={120} suffix="ms" />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} className="mt-4">
        <Col span={12}>
          <Card title="API Usage">
            <Progress percent={75} />
            <p className="text-gray-500 mt-2">75% of daily quota used</p>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Error Rate">
            <Progress percent={2} status="exception" />
            <p className="text-gray-500 mt-2">2% error rate (target: &lt;1%)</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Monitoring;
