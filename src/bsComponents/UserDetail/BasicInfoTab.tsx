import type { FC, ReactNode } from 'react';
import { Tag } from 'antd';
import { useTranslation } from 'react-i18next';
import type { UserDetailData } from './types';
import styles from './styles.module.less';

type BasicInfoTabProps = {
  data: UserDetailData;
};

const BasicInfoTab: FC<BasicInfoTabProps> = ({ data }) => {
  const { t } = useTranslation();

  const fields: { label: string; value: ReactNode }[] = [
    { label: t('userDetail.fields.name'), value: data.name },
    { label: t('userDetail.fields.merchant'), value: data.merchantLabel },
    { label: t('userDetail.fields.department'), value: data.department },
    { label: t('userDetail.fields.jobTitle'), value: data.jobTitle },
    { label: t('userDetail.fields.email'), value: data.email },
    { label: t('userDetail.fields.phoneNumber'), value: data.phone },
    {
      label: t('userDetail.fields.status'),
      value: (
        <Tag color={data.status === 'enabled' ? 'success' : 'error'}>
          {data.status === 'enabled' ? t('common.enabled') : t('common.disabled')}
        </Tag>
      ),
    },
    { label: t('userDetail.fields.mfa'), value: data.mfa },
    { label: t('userDetail.fields.createdAt'), value: data.createdAt },
  ];

  return (
    <div className="p-[16px]">
      {fields.map((field) => (
        <div key={field.label} className={styles.field_row}>
          <span className={styles.field_label}>{field.label}</span>
          <span className={styles.field_value}>{field.value}</span>
        </div>
      ))}
    </div>
  );
};

export default BasicInfoTab;
