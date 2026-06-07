import type { FC, ReactNode } from 'react';
import { Fragment, useCallback, useMemo } from 'react';
import {
  ArrowRightOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  EyeInvisibleOutlined,
  AuditOutlined,
  LockOutlined,
  MinusCircleOutlined,
  UserOutlined,
} from '@/components/BaseIcons';
import { Col, Row, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ProCard } from '@ant-design/pro-components';
import { useTranslation } from 'react-i18next';

import { DrawerContainer } from '@/components/Drawer';
import type {
  PermissionMatrixRow,
  PermissionStatus,
  PrivateDomainFlowStep,
  PrivateDomainProps,
  PrivateDomainRuleItem,
} from './types';
import styles from './styles.module.less';

const ruleItems: PrivateDomainRuleItem[] = [
  { key: 'autoBindUserId', icon: <UserOutlined /> },
  { key: 'crossDomainForbidden', icon: <MinusCircleOutlined /> },
  { key: 'accessibleOnlyToUser', icon: <LockOutlined /> },
  { key: 'automaticPrivacyMasking', icon: <EyeInvisibleOutlined /> },
];

const flowSteps: PrivateDomainFlowStep[] = [
  { key: 'userRequest', step: 1 },
  { key: 'permissionVerification', step: 2 },
  { key: 'desensitization', step: 3 },
  { key: 'memoryRecall', step: 4 },
];

const permissionMatrix: PermissionMatrixRow[] = [
  {
    key: 'view',
    user: 'allowed',
    administrator: 'forbidden',
    superAdministrator: 'forbidden',
  },
  {
    key: 'create',
    user: 'allowed',
    administrator: 'approvalRequired',
    superAdministrator: 'approvalRequired',
  },
  {
    key: 'modify',
    user: 'allowed',
    administrator: 'forbidden',
    superAdministrator: 'forbidden',
  },
  {
    key: 'delete',
    user: 'allowed',
    administrator: 'approvalRequired',
    superAdministrator: 'forbidden',
  },
  {
    key: 'export',
    user: 'allowed',
    administrator: 'forbidden',
    superAdministrator: 'forbidden',
  },
  {
    key: 'transfer',
    user: 'forbidden',
    administrator: 'forbidden',
    superAdministrator: 'forbidden',
  },
];

const statusClassMap: Record<PermissionStatus, string> = {
  allowed: styles.status_allowed,
  forbidden: styles.status_forbidden,
  approvalRequired: styles.status_approval_required,
};

const PrivateDomain: FC<PrivateDomainProps> = ({ onClose }) => {
  const { t } = useTranslation();

  const renderStatusCell = useCallback((status: PermissionStatus) => {
    const label = t(`privateDomain.matrix.status.${status}`);
    const className = `${styles.status_cell} ${statusClassMap[status]}`;

    const iconMap: Record<PermissionStatus, ReactNode> = {
      allowed: <CheckCircleOutlined />,
      forbidden: <CloseCircleOutlined />,
      approvalRequired: <AuditOutlined />,
    };

    return (
      <span className={className}>
        <span className={styles.status_icon}>{iconMap[status]}</span>
        <span className={styles.status_label}>{label}</span>
      </span>
    );
  }, [t]);

  const matrixColumns: ColumnsType<PermissionMatrixRow> = useMemo(
    () => [
      {
        title: t('privateDomain.matrix.columns.operation'),
        dataIndex: 'key',
        key: 'operation',
        render: (key: PermissionMatrixRow['key']) => t(`privateDomain.matrix.operations.${key}`),
      },
      {
        title: t('privateDomain.matrix.columns.user'),
        dataIndex: 'user',
        key: 'user',
        render: (status: PermissionStatus) => renderStatusCell(status),
      },
      {
        title: t('privateDomain.matrix.columns.administrator'),
        dataIndex: 'administrator',
        key: 'administrator',
        render: (status: PermissionStatus) => renderStatusCell(status),
      },
      {
        title: t('privateDomain.matrix.columns.superAdministrator'),
        dataIndex: 'superAdministrator',
        key: 'superAdministrator',
        render: (status: PermissionStatus) => renderStatusCell(status),
      },
    ],
    [t, renderStatusCell],
  );

  return (
    <DrawerContainer title={t('privateDomain.title')} onClose={onClose}>
      <ProCard
        size="small"
        title={t('privateDomain.sections.coreRules')}
        className={styles.section}
      >
        <Row gutter={[16, 16]}>
          {ruleItems.map((item) => (
            <Col key={item.key} xs={24} md={12}>
              <div className={styles.rule_card}>
                <div className={styles.rule_icon}>{item.icon}</div>
                <div className={styles.rule_content}>
                  <div className={styles.rule_title}>
                    {t(`privateDomain.rules.${item.key}.title`)}
                  </div>
                  <div className={styles.rule_description}>
                    {t(`privateDomain.rules.${item.key}.description`)}
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </ProCard>

      <ProCard
        size="small"
        title={t('privateDomain.sections.accessFlow')}
        className={styles.section}
      >
        <div className={styles.flow}>
          {flowSteps.map((step, index) => (
            <Fragment key={step.key}>
              <div className={styles.flow_step}>
                <div className={styles.flow_step_number}>{step.step}</div>
                <div className={styles.flow_step_title}>
                  {t(`privateDomain.flowSteps.${step.key}.title`)}
                </div>
                <div className={styles.flow_step_description}>
                  {t(`privateDomain.flowSteps.${step.key}.description`)}
                </div>
              </div>
              {index < flowSteps.length - 1 && (
                <div className={styles.flow_arrow}>
                  <ArrowRightOutlined />
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </ProCard>

      <ProCard
        size="small"
        title={t('privateDomain.sections.permissionMatrix')}
      >
        <Table<PermissionMatrixRow>
          className={styles.matrix_table}
          columns={matrixColumns}
          dataSource={permissionMatrix}
          rowKey="key"
          pagination={false}
          size="small"
        />
      </ProCard>
    </DrawerContainer>
  );
};

export default PrivateDomain;
