import type { FC, ReactElement } from 'react';
import { useMemo } from 'react';
import { Button, DatePicker, Empty, Tag } from 'antd';
import { ExportOutlined } from '@ant-design/icons';
import { ProTable } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-table';
import { useTranslation } from 'react-i18next';

import {
  proTableDrawerPagination,
  proTableSearchConfig,
} from '@/utils/proTable';
import { mockAuditLogs } from './mock';
import type { AuditLogRecord } from './types';
import { useSearchField } from './useSearchField';

const AuditLogsTab: FC = () => {
  const { t } = useTranslation();
  const renderSearchField = useSearchField();

  const columns: ProColumns<AuditLogRecord>[] = useMemo(
    () => [
      {
        title: t('privacyMasking.auditLogs.columns.time'),
        dataIndex: 'time',
        valueType: 'dateTime',
        renderFormItem: () => <DatePicker showTime className="w-full" />,
      },
      {
        title: t('privacyMasking.auditLogs.columns.operationType'),
        dataIndex: 'operationType',
        renderFormItem: renderSearchField,
        render: (_dom, record) => (
          <Tag>{t(`privacyMasking.operationType.${record.operationType}`)}</Tag>
        ),
      },
      {
        title: t('privacyMasking.auditLogs.columns.operator'),
        dataIndex: 'operator',
        renderFormItem: renderSearchField,
        render: (_dom, record) => <Tag>{record.operator}</Tag>,
      },
      {
        title: t('privacyMasking.auditLogs.columns.targetRule'),
        dataIndex: 'targetRule',
        renderFormItem: renderSearchField,
      },
      {
        title: t('privacyMasking.auditLogs.columns.details'),
        dataIndex: 'details',
        ellipsis: true,
        renderFormItem: renderSearchField,
      },
    ],
    [t, renderSearchField],
  );

  const renderEmptyView = (
    { dataSource = [] }: { dataSource?: readonly AuditLogRecord[] },
    dom: ReactElement,
  ) => {
    if (!dataSource.length) {
      return (
        <div className="py-[56px]">
          <Empty description={t('common.noDataAvailable')} />
        </div>
      );
    }
    return dom;
  };

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
      tableViewRender={renderEmptyView}
    />
  );
};

export default AuditLogsTab;
