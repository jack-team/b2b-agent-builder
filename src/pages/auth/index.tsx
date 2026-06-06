import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs } from 'antd';
import SignInForm from './SignInForm';
import RegisterForm from './RegisterForm';
import RightPanel from './rightPanel';
import styles from './styles.module.less';

const AuthPage: FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <div className={styles.leftPanelContent}>
          <div className="text-center mb-[32px]">
            <div className="text-[28px] font-[900] mb-[8px]">{t('auth.title')}</div>
            <div className="text-[14px] text-[var(--text-color-secondary)]">
              {t('auth.subtitle')}
            </div>
          </div>
          <Tabs
            defaultActiveKey="signin"
            className={styles.tabs}
            items={[
              {
                key: 'signin',
                label: t('auth.signIn'),
                children: <SignInForm />,
              },
              {
                key: 'register',
                label: t('auth.register'),
                children: <RegisterForm />,
              },
            ]}
          />
        </div>
      </div>
      <RightPanel />
    </div>
  );
};

export default AuthPage;
