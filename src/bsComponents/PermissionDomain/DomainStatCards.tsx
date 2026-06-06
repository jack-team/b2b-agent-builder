import type { FC } from 'react';
import cls from 'classnames';
import {
  FileTextOutlined,
  GlobalOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';

import Drawer from '@/components/Drawer';
import PrivateDomain from '@/bsComponents/PrivateDomain';
import PublicDomain from '@/bsComponents/PublicDomain';
import SharedDomain from '@/bsComponents/SharedDomain';
import type { DomainStatItem, DomainStatKey } from './types';
import styles from './styles.module.less';

const iconMap: Record<DomainStatKey, FC> = {
  privateMemory: UserOutlined,
  sharedDomain: TeamOutlined,
  publicDomain: GlobalOutlined,
};

const iconColorMap: Record<DomainStatKey, string> = {
  privateMemory: '#7C3AED',
  sharedDomain: '#3B82F6',
  publicDomain: '#10B981',
};

interface DomainStatCardsProps {
  items: DomainStatItem[];
}

const DomainStatCards: FC<DomainStatCardsProps> = ({ items }) => {
  const { t } = useTranslation();

  return (
    <Row gutter={[16, 16]} className={styles.stat_cards}>
      {items.map((item) => {
        const Icon = iconMap[item.key];
        const iconColor = iconColorMap[item.key];
        const actionIcon = item.action === 'rules' ? <FileTextOutlined /> : <SettingOutlined />;

        return (
          <Col key={item.key} xs={24} md={8}>
            <div className={cls(styles.stat_card, 'custom-pro-card-container')}>
              <div className={styles.stat_card_main}>
                <div
                  className={styles.stat_icon}
                  style={{ backgroundColor: `${iconColor}14`, color: iconColor }}
                >
                  <Icon />
                </div>
                <div className={styles.stat_content}>
                  <div className={styles.stat_label}>
                    {t(`permissionDomain.stats.${item.key}`)}
                  </div>
                  <div className={styles.stat_value}>
                    {item.value.toLocaleString()}
                  </div>
                </div>
              </div>
              {item.action === 'rules' ? (
                <Drawer
                  size="large"
                  trigger={(
                    <Button icon={actionIcon}>
                      {t(`permissionDomain.stats.${item.action}`)}
                    </Button>
                  )}
                >
                  <PrivateDomain />
                </Drawer>
              ) : item.key === 'sharedDomain' ? (
                <Drawer
                  size="large"
                  trigger={(
                    <Button icon={actionIcon}>
                      {t(`permissionDomain.stats.${item.action}`)}
                    </Button>
                  )}
                >
                  <SharedDomain />
                </Drawer>
              ) : (
                <Drawer
                  size="large"
                  trigger={(
                    <Button icon={actionIcon}>
                      {t(`permissionDomain.stats.${item.action}`)}
                    </Button>
                  )}
                >
                  <PublicDomain />
                </Drawer>
              )}
            </div>
          </Col>
        );
      })}
    </Row>
  );
};

export default DomainStatCards;
