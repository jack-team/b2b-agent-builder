import type { FC } from 'react';
import { useMemo } from 'react';
import { Button, Space, Switch, Tag, Tooltip } from 'antd';
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  ExportOutlined,
  ImportOutlined,
  PlusOutlined,
} from '@/components/BaseIcons';
import type { ProColumns } from '@ant-design/pro-table';
import { useTranslation } from 'react-i18next';

import NiceTable from '@/components/NiceTable';
import {
  getTextSearchFieldProps,
  proTableDrawerPagination,
  proTableSearchConfig,
} from '@/utils/proTable';
import { mockMaskingRules } from './mock';
import RiskLevelTag from './RiskLevelTag';
import type { DetectionMethod, MaskingRuleRecord } from './types';

const detectionMethodColorMap: Record<DetectionMethod, string> = {
  regex: 'blue',
  llm: 'cyan',
  ner: 'purple',
  luhn: 'geekblue',
};

const RulesTab: FC = () => {
  const { t } = useTranslation();

  const searchFieldProps = useMemo(
    () => getTextSearchFieldProps(t('common.pleaseEnter')),
    [t],
  );

  const columns: ProColumns<MaskingRuleRecord>[] = useMemo(
    () => [
      {
        title: t('privacyMasking.rules.columns.name'),
        dataIndex: 'name',
        fieldProps: searchFieldProps,
      },
      {
        title: t('privacyMasking.rules.columns.dataType'),
        dataIndex: 'dataType',
        fieldProps: searchFieldProps,
      },
      {
        title: t('privacyMasking.rules.columns.detectionMethod'),
        dataIndex: 'detectionMethods',
        fieldProps: searchFieldProps,
        render: (_dom, record) => (
          <Space size={4} wrap>
            {record.detectionMethods.map((method) => (
              <Tag key={method} color={detectionMethodColorMap[method]}>
                {t(`privacyMasking.detectionMethod.${method}`)}
              </Tag>
            ))}
          </Space>
        ),
      },
      {
        title: t('privacyMasking.rules.columns.handlingStrategy'),
        dataIndex: 'handlingStrategy',
        ellipsis: true,
        fieldProps: searchFieldProps,
        render: (_dom, record) =>
          t(`privacyMasking.handlingStrategy.${record.handlingStrategy}`),
      },
      {
        title: t('privacyMasking.rules.columns.riskLevel'),
        dataIndex: 'riskLevel',
        fieldProps: searchFieldProps,
        render: (_dom, record) => <RiskLevelTag level={record.riskLevel} />,
      },
      {
        title: t('privacyMasking.rules.columns.status'),
        dataIndex: 'enabled',
        valueType: 'switch',
        initialValue: true,
        render: (_dom, record) => (
          <Switch checked={record.enabled} size="small" />
        ),
      },
      {
        title: t('privacyMasking.rules.columns.actions'),
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

  return (
    <NiceTable<MaskingRuleRecord>
      tableName="privacy-masking-rules"
      columns={columns}
      dataSource={mockMaskingRules}
      rowKey="key"
      toolBarRender={() => [
        <Button key="new" type="primary" icon={<PlusOutlined />}>
          {t('privacyMasking.actions.new')}
        </Button>,
        <Button key="import" icon={<ImportOutlined />}>
          {t('privacyMasking.actions.import')}
        </Button>,
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

export default RulesTab;
