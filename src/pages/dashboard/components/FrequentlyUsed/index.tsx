import type { FC } from 'react';
import cls from 'classnames';
import { Badge, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import {
  frequentlyUsedAgents,
  frequentlyUsedOrchestrations,
} from '../../mockData';
import styles from './styles.module.less';

const FrequentlyUsed: FC = () => {
  const { t } = useTranslation();

  const renderGroup = (
    title: string,
    items: typeof frequentlyUsedOrchestrations
  ) => (
    <div className={styles.group}>
      <div className={styles.groupTitle}>{title}</div>
      <div className={styles.cardList}>
        {items.map(item => (
          <div key={item.key} className={styles.card}>
            <span className={styles.cardTitle}>{item.title}</span>
            {item.badge ? (
              <Badge count={item.badge} size="small" className={styles.badge} />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className={cls(styles.frequentlyUsed, 'custom-pro-card-container')}>
      <div className={styles.sectionTitle}>
        {t('dashboardPage.frequentlyUsed')}
      </div>
      <Row gutter={[24, 16]}>
        <Col xs={24} md={12}>
          {renderGroup(t('menu.orchestrations'), frequentlyUsedOrchestrations)}
        </Col>
        <Col xs={24} md={12}>
          {renderGroup(t('dashboardPage.agents'), frequentlyUsedAgents)}
        </Col>
      </Row>
    </div>
  );
};

export default FrequentlyUsed;
