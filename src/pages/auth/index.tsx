import { Tabs } from 'antd';
import { type FC, lazy, Suspense, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Spinner from '@/components/Spinner';
import { prefetchRoute } from '@/router/helper';
import SignInForm from './SignInForm';
import RightPanel from './rightPanel';
import styles from './styles.module.less';

const RegisterForm = lazy(() => import('./RegisterForm'));

const prefetchDashboard = () => {
  prefetchRoute('/dashboard');
};

const AuthPage: FC = () => {
  const { t } = useTranslation();
  useEffect(prefetchDashboard, []);

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
                children: (
                  <Suspense
                    fallback={
                      <div className="flex justify-center py-8 text-[24px]">
                        <Spinner type="rotating-lines" />
                      </div>
                    }
                  >
                    <RegisterForm />
                  </Suspense>
                ),
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
