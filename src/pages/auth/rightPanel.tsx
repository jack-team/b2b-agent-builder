import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col } from 'antd';
import Icon1 from '@/assets/svg-icons/page/auth/icon_1.svg?react';
import Icon2 from '@/assets/svg-icons/page/auth/icon_2.svg?react';
import Icon3 from '@/assets/svg-icons/page/auth/icon_3.svg?react';
import Icon4 from '@/assets/svg-icons/page/auth/icon_4.svg?react';
import styles from './styles.module.less';

const featureKeys = [
  { icon: <Icon1 />, titleKey: 'auth.feature1Title', descKey: 'auth.feature1Desc' },
  { icon: <Icon2 />, titleKey: 'auth.feature2Title', descKey: 'auth.feature2Desc' },
  { icon: <Icon3 />, titleKey: 'auth.feature3Title', descKey: 'auth.feature3Desc' },
  { icon: <Icon4 />, titleKey: 'auth.feature4Title', descKey: 'auth.feature4Desc' },
] as const;

const RightPanel: FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.rightPanel}>
      <div className={styles.grid} />
      <div className={styles.rightPanelContent}>
        <div className="text-[var(--text-color-inverse)]">
          <div className="text-[36px] leading-[48px] font-[800]">
            {t('auth.heroTitle1')}
          </div>
          <div className="text-[36px] leading-[48px] font-[800]">
            {t('auth.heroTitle2')}
          </div>
          <div className="text-[16px] opacity-80 mt-[30px]">
            {t('auth.heroDesc')}
          </div>
        </div>
        <div className={styles.features}>
          {featureKeys.map((feature) => (
            <div key={feature.titleKey} className={styles.feature}>
              <div className={styles.feature_icon}>{feature.icon}</div>
              <div className="flex-1 text-[var(--text-color-inverse)]">
                <div className="text-[14px] font-[600] mb-[4px]">{t(feature.titleKey)}</div>
                <div className="text-[12px] opacity-70">{t(feature.descKey)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightPanel;
