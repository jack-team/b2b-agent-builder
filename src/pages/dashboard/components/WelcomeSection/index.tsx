import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '@/store/user';
import styles from '../../styles.module.less';

const WelcomeSection: FC = () => {
  const { t } = useTranslation();
  const user = useUserStore(s => s.user);
  const displayName = user?.email?.split('@')[0] ?? 'Garabateador';

  return (
    <div className={styles.welcome}>
      <h1 className={styles.welcomeTitle}>
        {t('dashboardPage.welcomeBack', { name: displayName })}
      </h1>
      <p className={styles.welcomeDesc}>
        {t('dashboardPage.workspaceOverview')}
      </p>
    </div>
  );
};

export default WelcomeSection;
