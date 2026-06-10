import type { FC } from 'react';
import { useMemo } from 'react';
import { Button, Tag } from 'antd';
import { ExportOutlined } from '@/components/BaseIcons';
import type { ProColumns } from '@ant-design/pro-table';
import { useTranslation } from 'react-i18next';

import NiceTable from '@/components/NiceTable';
import {
  getTextSearchFieldProps,
  proTableDrawerPagination,
  proTableSearchConfig,
} from '@/utils/proTable';
import { mockAuditLogs } from './mock';
import type { AuditLogRecord } from './types';

const AuditLogsTab: FC = () => {
  const { t } = useTranslation();

  const searchFieldProps = useMemo(
    () => getTextSearchFieldProps(t('common.pleaseEnter')),
    [t],
  );

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
        fieldProps: searchFieldProps,
        render: (_dom, record) => (
          <Tag>{t(`privacyMasking.operationType.${record.operationType}`)}</Tag>
        ),
      },
      {
        title: t('privacyMasking.auditLogs.columns.operator'),
        dataIndex: 'operator',
        fieldProps: searchFieldProps,
        render: (_dom, record) => <Tag>{record.operator}</Tag>,
      },
      {
        title: t('privacyMasking.auditLogs.columns.targetRule'),
        dataIndex: 'targetRule',
        fieldProps: searchFieldProps,
      },
      {
        title: t('privacyMasking.auditLogs.columns.details'),
        dataIndex: 'details',
        ellipsis: true,
        fieldProps: searchFieldProps,
      },
    ],
    [t, searchFieldProps],
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
      search={{
        ...proTableSearchConfig,
        searchText: t('common.search'),
        resetText: t('common.reset'),
      }}
      pagination={{
        ...proTableDrawerPagination,
        total: 17,
      }}
    />
  );
};

export default AuditLogsTab;
