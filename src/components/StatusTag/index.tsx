import type { FC } from 'react';
import { Tag } from 'antd';
import { useTranslation } from 'react-i18next';
import type { EnableStatus } from '@/types/common';

type StatusTagProps = {
  status: EnableStatus | string;
};

const StatusTag: FC<StatusTagProps> = ({ status }) => {
  const { t } = useTranslation();
  const enabled = status === 'enabled';

  return (
    <Tag color={enabled ? 'success' : 'warning'}>
      {enabled ? t('common.enabled') : t('common.disabled')}
    </Tag>
  );
};

export default StatusTag;
