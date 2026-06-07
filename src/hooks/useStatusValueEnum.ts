import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';

export const getStatusValueEnum = (t: TFunction) => ({
  enabled: { text: t('common.enabled'), status: 'Success' as const },
  disabled: { text: t('common.disabled'), status: 'Default' as const },
});

export const useStatusValueEnum = () => {
  const { t } = useTranslation();
  return useMemo(() => getStatusValueEnum(t), [t]);
};
