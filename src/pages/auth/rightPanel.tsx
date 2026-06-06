import type { FC } from 'react';
import { Row, Col } from 'antd';
import Icon1 from '@/assets/svg-icons/page/auth/icon_1.svg?react';
import Icon2 from '@/assets/svg-icons/page/auth/icon_2.svg?react';
import Icon3 from '@/assets/svg-icons/page/auth/icon_3.svg?react';
import Icon4 from '@/assets/svg-icons/page/auth/icon_4.svg?react';
import styles from './styles.module.less';

const features = [
  {
    icon: <Icon1 />,
    title: 'Orchestration & Multi-Agent Collaboration',
    desc: 'Visually build complex agent workflows with multi-agent collaboration'
  },
  {
    icon: <Icon2 />,
    title: 'Enterprise Knowledge Base',
    desc: 'Securely store and manage enterprise knowledge with version control'
  },
  {
    icon: <Icon3 />,
    title: 'Universal Capability Center',
    desc: 'MCP tools, plugins, and custom actions in one unified platform'
  },
  {
    icon: <Icon4 />,
    title: 'Secure Multi-Tenant Architecture',
    desc: 'Enterprise-grade security with isolated data and role-based access'
  },
];

const RightPanel: FC = () => {
  return (
    <div className={styles.rightPanel}>
      <div className={styles.grid} />
      <div className={styles.rightPanelContent}>
        <div className="text-[var(--text-color-inverse)]">
          <div className="text-[36px] leading-[48px] font-[800]">
            Enterprise AI Multi-Agent
          </div>
          <div className="text-[36px] leading-[48px] font-[800]">
            Automation Platform
          </div>
          <div className="text-[16px] opacity-80 mt-[30px]">
            One-stop AI orchestration, capability integration, knowledge management and secure enterprise automation.
          </div>
        </div>
        <div className={styles.features}>
          {features.map((feature, index) => (
            <div key={index} className={styles.feature}>
              <div className={styles.feature_icon}>{feature.icon}</div>
              <div className="flex-1 text-[var(--text-color-inverse)]">
                <div className="text-[14px] font-[600] mb-[4px]">{feature.title}</div>
                <div className="text-[12px] opacity-70">{feature.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightPanel;