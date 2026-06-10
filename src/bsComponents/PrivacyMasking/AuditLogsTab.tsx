import type { FC } from 'react';
import { useMemo } from 'react';
import { Button, Tag } from 'antd';
import { ExportOutlined } from '@/components/BaseIcons';
import type { ProColumns } from '@ant-design/pro-table';
import { useTranslation } from 'react-i18next';

import NiceTable from '@/components/NiceTable';
import { mockAuditLogs } from './mock';
import type { AuditLogRecord } from './types';

const AuditLogsTab: FC = () => {
  const { t } = useTranslation();

  const columns: ProColumns<AuditLogRecord>[] = useMemo(
    () => [
      {
        title: t('privacyMasking.auditLogs.columns.time'),
        dataIndex: 'time',
        valueType: 'dateTime',
        fieldProps: {
          showTime: true,
          className: 'w-full',
        },
      },
      {
        title: t('privacyMasking.auditLogs.columns.operationType'),
        dataIndex: 'operationType',
        render: (_dom, record) => (
          <Tag>{t(`privacyMasking.operationType.${record.operationType}`)}</Tag>
        ),
      },
      {
        title: t('privacyMasking.auditLogs.columns.operator'),
        dataIndex: 'operator',
        render: (_dom, record) => <Tag>{record.operator}</Tag>,
      },
      {
        title: t('privacyMasking.auditLogs.columns.targetRule'),
        dataIndex: 'targetRule',
      },
      {
        title: t('privacyMasking.auditLogs.columns.details'),
        dataIndex: 'details',
        ellipsis: true,
      },
    ],
    [t],
  );

  return (
    <NiceTable<AuditLogRecord>
      tableName="privacy-masking-audit-logs"
      columns={columns}
      dataSource={mockAuditLogs}
      rowKey="key"
      toolBarRender={() => [
        <Button key="export" icon={<ExportOutlined />}>
          {t('privacyMasking.actions.export')}
        </Button>,
      ]}
    />
  );
};

export default AuditLogsTab;
