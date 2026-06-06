import type { FC } from 'react';
import cls from 'classnames';
import { Timeline } from 'antd';
import {
  CheckCircleFilled,
  SyncOutlined,
  ExclamationCircleFilled,
  CloseCircleFilled,
  BulbOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { recentActivities } from '../../mockData';
import type { ActivityIconType } from '../../types';
import styles from './styles.module.less';

const iconConfig: Record<
  ActivityIconType,
  { icon: FC; color: string }
> = {
  success: { icon: CheckCircleFilled, color: '#10B981' },
  sync: { icon: SyncOutlined, color: '#3B82F6' },
  warning: { icon: ExclamationCircleFilled, color: '#F59E0B' },
  error: { icon: CloseCircleFilled, color: '#EF4444' },
  memory: { icon: BulbOutlined, color: '#7C3AED' },
};

const RecentActivities: FC = () => {
  const { t } = useTranslation();

  return (
    <div className={cls(styles.container, 'custom-pro-card-container')}>
      <div className={styles.title}>{t('recentActivity')}</div>
      <Timeline
        className={styles.timeline}
        items={recentActivities.map(item => {
          const config = iconConfig[item.icon];
          const Icon = config.icon;

          return {
            key: item.key,
            dot: (
              <span
                className={styles.dot}
                style={{ color: config.color }}
              >
                <Icon />
              </span>
            ),
            children: (
              <div className={styles.item}>
                <div className={styles.itemTitle}>
                  {t(`dashboardPage.activities.${item.key}`)}
                </div>
                <div className={styles.itemTime}>{item.time}</div>
              </div>
            ),
          };
        })}
      />
    </div>
  );
};

export default RecentActivities;
