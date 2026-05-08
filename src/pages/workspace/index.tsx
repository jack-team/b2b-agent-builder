import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

const Workspace: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="h-full flex items-center justify-center">
      <h1 className="text-3xl font-bold text-gray-600">{t('welcome')}</h1>
    </div>
  );
};

export default Workspace;
