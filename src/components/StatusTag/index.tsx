import type { FC } from 'react';
import { Tag } from 'antd';

type StatusTagProps = {
  status: string;
};

const StatusTag: FC<StatusTagProps> = ({ status }) => (
  <Tag color={status === 'enabled' ? 'success' : 'warning'}>
    {status === 'enabled' ? 'Enabled' : 'Disabled'}
  </Tag>
);

export default StatusTag;
