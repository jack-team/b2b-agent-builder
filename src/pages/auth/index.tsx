import type { FC } from 'react';
import { Tabs } from 'antd';
import SignInForm from './SignInForm';
import RegisterForm from './RegisterForm';
import RightPanel from './rightPanel';
import styles from './styles.module.less';

const AuthPage: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <div className={styles.leftPanelContent}>
          <div className="text-center mb-[32px]">
            <div className="text-[28px] font-[900] mb-[8px]">AI Multi-Agent System</div>
            <div className="text-[14px] text-[var(--text-color-secondary)]">
              Enterprise-Grade Autonomous Agent Platform
            </div>
          </div>
          <Tabs
            defaultActiveKey="signin"
            className={styles.tabs}
            items={[
              {
                key: 'signin',
                label: 'Sign In',
                children: <SignInForm />,
              },
              {
                key: 'register',
                label: 'Register',
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