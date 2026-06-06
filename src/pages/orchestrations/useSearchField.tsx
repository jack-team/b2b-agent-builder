import { Input } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { useTranslation } from 'react-i18next';

export const useSearchField = () => {
  const { t } = useTranslation();

  const renderSearchField = useMemoizedFn((
    _schema: unknown,
    config: { value?: string; onChange?: (value: string) => void },
  ) => (
    <Input
      value={config.value}
      onChange={(event) => config.onChange?.(event.target.value)}
      placeholder={t('common.pleaseEnter')}
    />
  ));

  return renderSearchField;
};
