import type { FC } from 'react';
import cls from 'classnames';
import { ProFormText } from '@ant-design/pro-components';
import type { FormItemProps } from 'antd';
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

  const lowerName = lower?.name || 'lower';
  const upperName = upper?.name || 'upper';
  const upperLabel = upper?.label || '上限';
  const lowerLabel = lower?.label || '下限';

  return (
    <div className={styles.range_group}>
      <div className={styles.item}>
        <ProFormText
          required
          name={lowerName}
          label={showLabel && title}
          placeholder={lowerLabel}
          rules={[{ required: true, message: '请输入下限' }]}
        />
      </div>
      <div className={cls(styles.separator, showLabel && styles.has_label)} />
      <div className={styles.item}>
        <ProFormText
          name={upperName}
          required={false}
          label={showLabel && ` `}
          placeholder={upperLabel}
          rules={[{ required: true, message: '请输入上限' }]}
        />
      </div>
    </div>
  );
};

export default RangeGroup;