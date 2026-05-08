import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Button } from 'antd';

const Orchestrations: FC = () => {
  const { t } = useTranslation();

  const workflows = [
    { name: 'Customer Support', steps: 5, status: 'active' },
    { name: 'Data Processing', steps: 8, status: 'draft' },
    { name: 'Report Generation', steps: 3, status: 'active' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">{t('menu.orchestrations')}</h1>
      <div className="grid grid-cols-3 gap-4">
        {workflows.map((wf) => (
          <Card
            key={wf.name}
            title={wf.name}
            extra={<Button type="link">Edit</Button>}
          >
            <p>Steps: {wf.steps}</p>
            <p>Status: {wf.status}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Orchestrations;
