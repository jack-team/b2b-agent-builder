import type { FC } from 'react';
import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import OperationBadge from './OperationBadge';
import type { EffectivePermission } from './types';
import { effectivePermissions } from './utils';
import styles from './styles.module.less';

const columns: ColumnsType<EffectivePermission> = [
  {
    title: 'Resource',
    dataIndex: 'resource',
    key: 'resource',
  },
  {
    title: 'Operation',
    dataIndex: 'operations',
    key: 'operations',
    render: (operations: EffectivePermission['operations']) => (
      <OperationBadge operations={operations} />
    ),
  },
  {
    title: 'Source Role',
    dataIndex: 'sourceRole',
    key: 'sourceRole',
    render: (sourceRole: string) => (
      <Tag color="processing">{sourceRole}</Tag>
    ),
  },
];

const PermissionsTab: FC = () => (
  <div className="p-[16px]">
    <h4 className={styles.section_title}>Effective Permissions</h4>
    <Table<EffectivePermission>
      columns={columns}
      dataSource={effectivePermissions}
      rowKey="key"
      pagination={false}
      size="small"
    />
  </div>
);

export default PermissionsTab;
