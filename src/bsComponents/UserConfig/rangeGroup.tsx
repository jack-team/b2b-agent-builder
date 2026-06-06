import type { FC } from 'react';
import cls from 'classnames';
import { ProFormText } from '@ant-design/pro-components';
import type { FormItemProps } from 'antd';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.less';

type NamePath = FormItemProps['name'];

type RangeGroupProps = {
  title?: string;
  showLabel?: boolean;
  lower?: {
    name: NamePath;
    label: string;
  };
  upper?: {
    name: NamePath;
    label: string;
  };
};

const RangeGroup: FC<RangeGroupProps> = (props) => {
  const { title, lower, upper, showLabel = true } = props;
  const { t } = useTranslation();

  const lowerName = lower?.name || 'lower';
  const upperName = upper?.name || 'upper';
  const upperLabel = upper?.label || t('userConfig.upperLimit');
  const lowerLabel = lower?.label || t('userConfig.lowerLimit');

  return (
    <div className={styles.range_group}>
      <div className={styles.item}>
        <ProFormText
          required
          name={lowerName}
          label={showLabel && title}
          placeholder={lowerLabel}
          rules={[{ required: true, message: t('userConfig.enterLowerLimit') }]}
        />
      </div>
      <div className={cls(styles.separator, showLabel && styles.has_label)} />
      <div className={styles.item}>
        <ProFormText
          name={upperName}
          required={false}
          label={showLabel && ` `}
          placeholder={upperLabel}
          rules={[{ required: true, message: t('userConfig.enterUpperLimit') }]}
        />
      </div>
    </div>
  );
};

export default RangeGroup;