import type { FC } from 'react';
import { useMemo } from 'react';
import { Button, Tag } from 'antd';
import { ExportOutlined } from '@ant-design/icons';
import { ProTable } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-table';
import { useTranslation } from 'react-i18next';

import {
  createProTableEmptyViewRenderer,
  getOperatorSearchFieldProps,
  proTableDrawerPagination,
  proTableSearchConfig,
} from '@/utils/proTable';
import { mockAuditLogs } from './mock';
import type { AuditLogRecord } from './types';
import styles from './styles.module.less';

const AuditLogsTab: FC = () => {
  const { t } = useTranslation();

  const operatorOptions = useMemo(
    () => [{ value: 'equal', label: t('privacyMasking.operators.equal') }],
    [t],
  );

  const searchFieldProps = useMemo(
    () =>
      getOperatorSearchFieldProps({
        placeholder: t('common.pleaseEnter'),
        operatorOptions,
        operatorClassName: styles.search_operator,
      }),
    [t, operatorOptions],
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

  const tableEmptyViewRenderer = useMemo(
    () => createProTableEmptyViewRenderer({ description: t('common.noDataAvailable') }),
    [t],
  );

  return (
    <ProTable<AuditLogRecord>
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
      tableViewRender={tableEmptyViewRenderer}
    />
  );
};

export default AuditLogsTab;
