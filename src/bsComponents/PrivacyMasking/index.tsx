import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { DrawerContainer } from '@/components/Drawer';

const PrivacyMasking: FC = () => {
  const { t } = useTranslation();

  return (
    <DrawerContainer title={t('memoriesPage.privacyMasking')} />
  );
};

export default PrivacyMasking;
