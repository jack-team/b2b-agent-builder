import type { FC } from 'react';
import { Row, Col } from 'antd';
import WelcomeSection from './components/WelcomeSection';
import FrequentlyUsed from './components/FrequentlyUsed';
import StatCards from './components/StatCards';
import WorkspacePanel from './components/WorkspacePanel';
import RecentActivities from './components/RecentActivities';
import styles from './styles.module.less';

const Dashboard: FC = () => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.page}>
        <WelcomeSection />
        <FrequentlyUsed />
        <StatCards />
        <Row gutter={[16, 16]} className={styles.bodyRow}>
          <Col xs={24} xl={17} className={styles.mainColumn}>
            <WorkspacePanel />
          </Col>
          <Col xs={24} xl={7} className={styles.sideColumn}>
            <RecentActivities />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Dashboard;
