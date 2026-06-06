import type { FC } from 'react';
import { Alert, Button } from 'antd';
import { useTranslation } from 'react-i18next';

import type { QuotaAlertItem } from './types';
import styles from './styles.module.less';

interface QuotaAlertListProps {
  items: QuotaAlertItem[];
}

const QuotaAlertList: FC<QuotaAlertListProps> = ({ items }) => {
  const { t } = useTranslation();

  const getMessage = (item: QuotaAlertItem) => {
    if (item.type === 'warning') {
      return t('permissionDomain.alerts.quotaWarning', {
        userId: item.userId,
        usage: item.usagePercent,
      });
    }

    return t('permissionDomain.alerts.interceptionInfo', {
      count: item.interceptionCount,
    });
  };

  return (
    <div className={styles.alerts}>
      {items.map((item) => (
        <Alert
          key={item.key}
          type={item.type}
          showIcon
          message={getMessage(item)}
          action={
            item.type === 'warning' ? (
              <Button size="small" type="primary" className={styles.alert_action}>
                {t('permissionDomain.alerts.processNow')}
              </Button>
            ) : undefined
          }
        />
      ))}
    </div>
  );
};

export default QuotaAlertList;
