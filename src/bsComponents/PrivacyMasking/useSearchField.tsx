import { useMemo } from 'react';
import { Input, Select, Space } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { useTranslation } from 'react-i18next';

import styles from './styles.module.less';

export const useSearchField = () => {
  const { t } = useTranslation();

  const operatorOptions = useMemo(
    () => [{ value: 'equal', label: t('privacyMasking.operators.equal') }],
    [t],
  );

  const renderSearchField = useMemoizedFn((
    _schema: unknown,
    config: { value?: string; onChange?: (value: string) => void },
  ) => (
    <Space.Compact className={styles.search_compact}>
      <Select
        className={styles.search_operator}
        defaultValue="equal"
        options={operatorOptions}
      />
      <Input
        value={config.value}
        onChange={(event) => config.onChange?.(event.target.value)}
        placeholder={t('common.pleaseEnter')}
      />
    </Space.Compact>
  ));

  return renderSearchField;
};
