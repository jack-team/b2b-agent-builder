import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

const GraphVisualization: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="p-[12px]">
      {t('knowledgesPage.graphPlaceholder')}
    </div>
  );
};

export default GraphVisualization;
