import type { FC } from 'react';
import { Tag } from 'antd';
import { useTranslation } from 'react-i18next';

type StatusTagProps = {
  status: string;
};

const StatusTag: FC<StatusTagProps> = ({ status }) => {
  const { t } = useTranslation();

  return (
    <Tag color={status === 'enabled' ? 'success' : 'warning'}>
      {status === 'enabled' ? t('common.enabled') : t('common.disabled')}
    </Tag>
  );
};

export default StatusTag;
