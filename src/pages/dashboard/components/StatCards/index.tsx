import type { FC } from 'react';
import cls from 'classnames';
import { Row, Col } from 'antd';
import {
  BookOutlined,
  BulbOutlined,
  SettingOutlined,
  BarChartOutlined,
} from '@/components/BaseIcons';
import { useTranslation } from 'react-i18next';
import { statCards } from '../../mockData';
import type { StatCardIconType } from '../../types';
import styles from './styles.module.less';

const iconMap: Record<StatCardIconType, FC> = {
  knowledge: BookOutlined,
  memory: BulbOutlined,
  model: SettingOutlined,
  token: BarChartOutlined,
};

const iconColorMap: Record<StatCardIconType, string> = {
  knowledge: '#3B82F6',
  memory: '#7C3AED',
  model: '#F59E0B',
  token: '#10B981',
};

const StatCards: FC = () => {
  const { t } = useTranslation();

  return (
    <Row gutter={[16, 16]}>
      {statCards.map(item => {
        const Icon = iconMap[item.icon];
        const iconColor = iconColorMap[item.icon];

        return (
          <Col key={item.key} xs={24} sm={12} xl={6}>
            <div className={cls(styles.card, 'custom-pro-card-container')}>
              <div
                className={styles.iconWrap}
                style={{ backgroundColor: `${iconColor}14`, color: iconColor }}
              >
                <Icon />
              </div>
              <div className={styles.content}>
                <div className={styles.label}>
                  {t(`dashboardPage.stats.${item.key}`)}
                </div>
                <div className={styles.value}>{item.value}</div>
                <div
                  className={cls(
                    styles.trend,
                    item.trendUp && styles.trendUp
                  )}
                >
                  {item.trend}
                </div>
              </div>
            </div>
          </Col>
        );
      })}
    </Row>
  );
};

export default StatCards;
