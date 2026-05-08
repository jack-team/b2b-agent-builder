import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, List } from 'antd';

const Memories: FC = () => {
  const { t } = useTranslation();

  const memories = [
    { id: '1', type: 'short_term', size: '128MB', updatedAt: '2024-01-01' },
    { id: '2', type: 'long_term', size: '512MB', updatedAt: '2024-01-02' },
    { id: '3', type: 'working', size: '256MB', updatedAt: '2024-01-03' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">{t('menu.memories')}</h1>
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={memories}
        renderItem={(item) => (
          <List.Item>
            <Card title={item.type.replace('_', ' ').toUpperCase()}>
              <p>Size: {item.size}</p>
              <p>Updated: {item.updatedAt}</p>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Memories;
