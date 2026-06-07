import type { FC } from 'react';
import { Tabs } from 'antd';
import cls from 'classnames';
import { useTranslation } from 'react-i18next';

import { DrawerContainer } from '@/components/Drawer';
import AuditLogsTab from './AuditLogsTab';
import DataTypesTab from './DataTypesTab';
import RulesTab from './RulesTab';
import TemplatesTab from './TemplatesTab';
import type { PrivacyMaskingProps } from './types';
import styles from './styles.module.less';

const PrivacyMasking: FC<PrivacyMaskingProps> = ({ onClose }) => {
  const { t } = useTranslation();

  return (
    <DrawerContainer title={t('privacyMasking.title')} onClose={onClose}>
      <Tabs
        className={cls(styles.tabs, 'card-tabs')}
        destroyOnHidden
        items={[
          {
            key: 'dataTypes',
            label: t('privacyMasking.tabs.dataTypes'),
            children: <DataTypesTab />,
          },
          {
            key: 'rules',
            label: t('privacyMasking.tabs.rules'),
            children: <RulesTab />,
          },
          {
            key: 'templates',
            label: t('privacyMasking.tabs.templates'),
            children: <TemplatesTab />,
          },
          {
            key: 'auditLogs',
            label: t('privacyMasking.tabs.auditLogs'),
            children: <AuditLogsTab />,
          },
        ]}
      />
    </DrawerContainer>
  );
};

export default PrivacyMasking;
