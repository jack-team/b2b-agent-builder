import type { FC, ReactElement } from 'react';
import { useMemo } from 'react';
import { Button, Empty, Space, Switch, Tag, Tooltip } from 'antd';
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { ProTable } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-table';
import { useTranslation } from 'react-i18next';

import {
  getOperatorSearchFieldProps,
  proTableDrawerPagination,
  proTableSearchConfig,
} from '@/utils/proTable';
import { mockDataTypes } from './mock';
import RiskLevelTag from './RiskLevelTag';
import type { DataTypeRecord } from './types';
import styles from './styles.module.less';

const DataTypesTab: FC = () => {
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

  const columns: ProColumns<DataTypeRecord>[] = useMemo(
    () => [
      {
        title: t('privacyMasking.dataTypes.columns.name'),
        dataIndex: 'name',
        fieldProps: searchFieldProps,
      },
      {
        title: t('privacyMasking.dataTypes.columns.description'),
        dataIndex: 'description',
        ellipsis: true,
        fieldProps: searchFieldProps,
      },
      {
        title: t('privacyMasking.dataTypes.columns.category'),
        dataIndex: 'category',
        fieldProps: searchFieldProps,
        render: (_dom, record) => (
          <Tag>{t(`privacyMasking.category.${record.category}`)}</Tag>
        ),
      },
      {
        title: t('privacyMasking.dataTypes.columns.riskLevel'),
        dataIndex: 'riskLevel',
        fieldProps: searchFieldProps,
        render: (_dom, record) => <RiskLevelTag level={record.riskLevel} />,
      },
      {
        title: t('privacyMasking.dataTypes.columns.regexPattern'),
        dataIndex: 'regexPattern',
        ellipsis: true,
        fieldProps: searchFieldProps,
        render: (_dom, record) => (
          <code className={styles.regex_pattern}>{record.regexPattern}</code>
        ),
      },
      {
        title: t('privacyMasking.dataTypes.columns.status'),
        dataIndex: 'enabled',
        valueType: 'switch',
        initialValue: true,
        render: (_dom, record) => (
          <Switch checked={record.enabled} size="small" />
        ),
      },
      {
        title: t('privacyMasking.dataTypes.columns.actions'),
        dataIndex: 'actions',
        hideInSearch: true,
        width: 140,
        render: () => (
          <Space size={12}>
            <Tooltip title={t('common.edit')}>
              <Button size="small" color="default" variant="filled">
                <EditOutlined />
              </Button>
            </Tooltip>
            <Tooltip title={t('privacyMasking.actions.copy')}>
              <Button size="small" color="default" variant="filled">
                <CopyOutlined />
              </Button>
            </Tooltip>
            <Tooltip title={t('common.delete')}>
              <Button size="small" color="danger" variant="filled">
                <DeleteOutlined />
              </Button>
            </Tooltip>
          </Space>
        ),
      },
    ],
    [t, searchFieldProps],
  );

  const renderEmptyView = (
    { dataSource = [] }: { dataSource?: readonly DataTypeRecord[] },
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
    <ProTable<DataTypeRecord>
      columns={columns}
      dataSource={mockDataTypes}
      rowKey="key"
      toolBarRender={() => [
        <Button key="new" type="primary" icon={<PlusOutlined />}>
          {t('privacyMasking.actions.new')}
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

export default DataTypesTab;
