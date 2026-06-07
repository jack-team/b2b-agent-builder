import type { FC } from 'react';
import { useMemo } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Button, Progress } from 'antd';
import { ProTable } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-table';
import { useTranslation } from 'react-i18next';

import { DrawerContainer } from '@/components/Drawer';
import {
  createProTableEmptyViewRenderer,
  getOperatorSearchFieldProps,
  proTableDrawerPagination,
  proTableSearchConfig,
} from '@/utils/proTable';
import DomainStatCards from './DomainStatCards';
import QuotaAlertList from './QuotaAlertList';
import type {
  DomainStatItem,
  PermissionDomainProps,
  QuotaAlertItem,
  UserQuotaRecord,
} from './types';
import styles from './styles.module.less';

const domainStats: DomainStatItem[] = [
  { key: 'privateMemory', value: 15271, action: 'rules' },
  { key: 'sharedDomain', value: 7457, action: 'manage' },
  { key: 'publicDomain', value: 9224, action: 'manage' },
];

const quotaAlerts: QuotaAlertItem[] = [
  {
    key: 'warning-1',
    type: 'warning',
    userId: 'UID0000000002',
    usagePercent: 97,
  },
  {
    key: 'info-1',
    type: 'info',
    interceptionCount: 23,
  },
  {
    key: 'success-1',
    type: 'success',
    interceptionCount: 23,
  },
];

const mockQuotaRecords: UserQuotaRecord[] = [
  {
    key: '1',
    userId: 'UID0000000001',
    userName: 'Emma Johnson',
    quota: 500,
    usedQuota: 336,
    usagePercent: 67.2,
    interceptionCount: 0,
  },
  {
    key: '2',
    userId: 'UID0000000002',
    userName: 'Liam Carter',
    quota: 300,
    usedQuota: 292,
    usagePercent: 97.4,
    interceptionCount: 12,
  },
  {
    key: '3',
    userId: 'UID0000000003',
    userName: 'Sophie Taylor',
    quota: 400,
    usedQuota: 178,
    usagePercent: 44.5,
    interceptionCount: 0,
  },
];

const getUsageStrokeColor = (value: number) => {
  if (value >= 90) {
    return '#ff4d4f';
  }
  return '#52c41a';
};

const PermissionDomain: FC<PermissionDomainProps> = ({ onClose }) => {
  const { t } = useTranslation();

  const operatorOptions = useMemo(
    () => [{ value: 'equal', label: t('permissionDomain.operators.equal') }],
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

  const columns: ProColumns<UserQuotaRecord>[] = useMemo(
    () => [
      {
        title: t('permissionDomain.columns.userId'),
        dataIndex: 'userId',
        fieldProps: searchFieldProps,
      },
      {
        title: t('permissionDomain.columns.userName'),
        dataIndex: 'userName',
        fieldProps: searchFieldProps,
      },
      {
        title: t('permissionDomain.columns.quota'),
        dataIndex: 'quota',
        valueType: 'digit',
      },
      {
        title: t('permissionDomain.columns.usedQuota'),
        dataIndex: 'usedQuota',
        valueType: 'digit',
      },
      {
        title: t('permissionDomain.columns.usagePercent'),
        dataIndex: 'usagePercent',
        valueType: 'digit',
        render: (_dom, record) => (
          <div className={styles.usage_cell}>
            <Progress
              className={styles.usage_bar}
              percent={record.usagePercent}
              showInfo={false}
              size="small"
              strokeColor={getUsageStrokeColor(record.usagePercent)}
            />
            <span className={styles.usage_text}>
              {record.usagePercent.toFixed(1)}%
            </span>
          </div>
        ),
      },
      {
        title: t('permissionDomain.columns.interceptionCount'),
        dataIndex: 'interceptionCount',
        valueType: 'digit',
        render: (_dom, record) => (
          <span
            className={record.interceptionCount > 0 ? styles.interception_high : undefined}
          >
            {record.interceptionCount}
          </span>
        ),
      },
      {
        title: t('permissionDomain.columns.actions'),
        dataIndex: 'actions',
        hideInSearch: true,
        width: 140,
        render: () => (
          <Button type="link" icon={<EditOutlined />} onClick={() => { }}>
            {t('permissionDomain.adjustQuota')}
          </Button>
        ),
      },
    ],
    [t, searchFieldProps],
  );

  const tableEmptyViewRenderer = useMemo(
    () => createProTableEmptyViewRenderer({ description: t('common.noDataAvailable') }),
    [t],
  );

  return (
    <DrawerContainer title={t('permissionDomain.title')} onClose={onClose}>
      <DomainStatCards items={domainStats} />
      <QuotaAlertList items={quotaAlerts} />
      <ProTable<UserQuotaRecord>
        columns={columns}
        dataSource={mockQuotaRecords}
        rowKey="key"
        toolBarRender={false}
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
    </DrawerContainer>
  );
};

export default PermissionDomain;
