import type { FC } from 'react';
import { Tabs } from 'antd';
import SignInForm from './SignInForm';
import RegisterForm from './RegisterForm';
import styles from './styles.module.less';
import icon1 from '@/assets/svg-icons/page/auth/icon_1.svg';
import icon2 from '@/assets/svg-icons/page/auth/icon_2.svg';
import icon3 from '@/assets/svg-icons/page/auth/icon_3.svg';
import icon4 from '@/assets/svg-icons/page/auth/icon_4.svg';

const features = [
  { 
    icon: icon1, 
    title: 'Orchestration & Multi-Agent Collaboration', 
    desc: 'Visually build complex agent workflows with multi-agent collaboration' 
  },
  { 
    icon: icon2, 
    title: 'Enterprise Knowledge Base', 
    desc: 'Securely store and manage enterprise knowledge with version control' 
  },
  { 
    icon: icon3, 
    title: 'Universal Capability Center', 
    desc: 'MCP tools, plugins, and custom actions in one unified platform' 
  },
  { 
    icon: icon4, 
    title: 'Secure Multi-Tenant Architecture', 
    desc: 'Enterprise-grade security with isolated data and role-based access' 
  },
];

const AuthPage: FC = () => {
  return (
    <div className={styles.container}>
      <div className="w-[40%] flex items-center justify-center">
        <div className="w-[420px]">
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
      <div className={styles.rightPanel}>
        <div className="max-w-[620px]">
          <div className="text-[48px] leading-[56px] font-[900] text-[#fff]">Enterprise AI Multi-Agent</div>
          <div className="text-[48px] leading-[56px] font-[900] text-[#fff]">Automation Platform</div>
          <div className="text-[16px] text-[rgba(255,255,255,0.9)] mt-[30px]">
            One-stop AI orchestration, capability integration, knowledge management and secure enterprise automation.
          </div>
          <div className="flex flex-col gap-[16px] mt-[48px]">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-[12px]">
                <div className="w-[36px] h-[36px]">
                  <img src={feature.icon} className="w-full h-full" />
                </div>
                <div className="flex-1">
                  <div className="text-[18px] font-[500] text-[#fff]">{feature.title}</div>
                  <div className="text-[14px] text-[rgba(255,255,255,0.9)]">{feature.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;