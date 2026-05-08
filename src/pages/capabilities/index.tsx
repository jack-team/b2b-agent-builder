import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Row, Col, Tag } from 'antd';

const Capabilities: FC = () => {
  const { t } = useTranslation();

  const capabilities = [
    { name: 'Text Generation', status: 'active', tags: ['NLP', 'GPT'] },
    { name: 'Image Recognition', status: 'active', tags: ['CV', 'OCR'] },
    { name: 'Speech Synthesis', status: 'beta', tags: ['Audio', 'TTS'] },
    { name: 'Translation', status: 'active', tags: ['NLP', 'Multi-lang'] },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">{t('menu.capabilities')}</h1>
      <Row gutter={16}>
        {capabilities.map((cap) => (
          <Col span={6} key={cap.name}>
            <Card
              title={cap.name}
              extra={
                <Tag color={cap.status === 'active' ? 'green' : 'orange'}>
                  {cap.status}
                </Tag>
              }
            >
              <div className="flex gap-2 flex-wrap">
                {cap.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Capabilities;
