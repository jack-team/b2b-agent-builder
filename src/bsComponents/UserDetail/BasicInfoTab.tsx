import type { FC, ReactNode } from 'react';
import { Tag } from 'antd';
import type { UserDetailData } from './types';
import styles from './styles.module.less';

type BasicInfoTabProps = {
  data: UserDetailData;
};

const BasicInfoTab: FC<BasicInfoTabProps> = ({ data }) => {
  const fields: { label: string; value: ReactNode }[] = [
    { label: 'Name', value: data.name },
    { label: 'Merchant', value: data.merchantLabel },
    { label: 'Department', value: data.department },
    { label: 'Job Title', value: data.jobTitle },
    { label: 'Email', value: data.email },
    { label: 'Phone Number', value: data.phone },
    {
      label: 'Status',
      value: (
        <Tag color={data.status === 'enabled' ? 'success' : 'error'}>
          {data.status === 'enabled' ? 'Enabled' : 'Disabled'}
        </Tag>
      ),
    },
    { label: 'MFA', value: data.mfa },
    { label: 'Created At', value: data.createdAt },
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
