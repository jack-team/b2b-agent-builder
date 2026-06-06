import type { FC } from 'react';
import { useMemo } from 'react';
import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import OperationBadge from './OperationBadge';
import type { EffectivePermission } from './types';
import { effectivePermissions } from './utils';
import styles from './styles.module.less';

const PermissionsTab: FC = () => {
  const { t } = useTranslation();

  const columns: ColumnsType<EffectivePermission> = useMemo(() => [
    {
      title: t('userDetail.columns.resource'),
      dataIndex: 'resource',
      key: 'resource',
    },
    {
      title: t('userDetail.columns.operation'),
      dataIndex: 'operations',
      key: 'operations',
      render: (operations: EffectivePermission['operations']) => (
        <OperationBadge operations={operations} />
      ),
    },
    {
      title: t('userDetail.columns.sourceRole'),
      dataIndex: 'sourceRole',
      key: 'sourceRole',
      render: (sourceRole: string) => (
        <Tag color="processing">{sourceRole}</Tag>
      ),
    },
  ], [t]);

  return (
    <div className="p-[16px]">
      <h4 className={styles.section_title}>{t('userDetail.effectivePermissions')}</h4>
      <Table<EffectivePermission>
        columns={columns}
        dataSource={effectivePermissions}
        rowKey="key"
        pagination={false}
        size="small"
      />
    </div>
  );
};

export default PermissionsTab;
