import type { FC } from 'react';
import { Fragment } from 'react';
import {
  AimOutlined,
  ArrowRightOutlined,
  PlusOutlined,
  ShareAltOutlined,
  StopOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import { ProCard } from '@ant-design/pro-components';
import { useTranslation } from 'react-i18next';

import CreateSharedDomain from '@/bsComponents/CreateSharedDomain';
import { DrawerContainer } from '@/components/Drawer';
import Drawer from '@/components/Drawer';
import GroupCard from './GroupCard';
import type {
  SharedDomainFlowStep,
  SharedDomainProps,
  SharedDomainRuleItem,
  SharingGroup,
} from './types';
import styles from './styles.module.less';

const ruleItems: SharedDomainRuleItem[] = [
  { key: 'boundToGroupId', icon: <AimOutlined /> },
  { key: 'memberConfig', icon: <TeamOutlined /> },
  { key: 'outsideBlocked', icon: <StopOutlined /> },
  { key: 'crossUserSharing', icon: <ShareAltOutlined /> },
];

const flowSteps: SharedDomainFlowStep[] = [
  { key: 'userRequest', step: 1 },
  { key: 'groupMemberVerification', step: 2 },
  { key: 'memoryRecall', step: 3 },
];

const sharingGroups: SharingGroup[] = [
  {
    key: 'sales',
    memberCount: 10,
    members: [
      {
        key: 'sales-1',
        name: 'James William Smith',
        role: 'leader',
        avatarColor: '#7C3AED',
      },
      {
        key: 'sales-2',
        name: 'Emma Rose Johnson',
        role: 'member',
        avatarColor: '#3B82F6',
        removable: true,
      },
      {
        key: 'sales-3',
        name: 'Lucas Gabriel Martinez',
        role: 'member',
        avatarColor: '#10B981',
      },
      {
        key: 'sales-4',
        name: 'Sophia Marie Brown',
        role: 'leader',
        avatarColor: '#F59E0B',
      },
      {
        key: 'sales-5',
        name: 'Oliver James Williams',
        role: 'member',
        avatarColor: '#EC4899',
      },
    ],
  },
  {
    key: 'customerService',
    memberCount: 8,
    members: [
      {
        key: 'cs-1',
        name: 'James William Smith',
        role: 'leader',
        avatarColor: '#7C3AED',
      },
      {
        key: 'cs-2',
        name: 'Emma Rose Johnson',
        role: 'member',
        avatarColor: '#3B82F6',
        removable: true,
      },
      {
        key: 'cs-3',
        name: 'Lucas Gabriel Martinez',
        role: 'member',
        avatarColor: '#10B981',
      },
      {
        key: 'cs-4',
        name: 'Sophia Marie Brown',
        role: 'leader',
        avatarColor: '#F59E0B',
      },
      {
        key: 'cs-5',
        name: 'Oliver James Williams',
        role: 'member',
        avatarColor: '#EC4899',
      },
    ],
  },
  {
    key: 'marketing',
    memberCount: 6,
    members: [
      {
        key: 'mkt-1',
        name: 'James William Smith',
        role: 'leader',
        avatarColor: '#7C3AED',
      },
      {
        key: 'mkt-2',
        name: 'Emma Rose Johnson',
        role: 'member',
        avatarColor: '#3B82F6',
        removable: true,
      },
      {
        key: 'mkt-3',
        name: 'Lucas Gabriel Martinez',
        role: 'member',
        avatarColor: '#10B981',
      },
      {
        key: 'mkt-4',
        name: 'Sophia Marie Brown',
        role: 'leader',
        avatarColor: '#F59E0B',
      },
      {
        key: 'mkt-5',
        name: 'Oliver James Williams',
        role: 'member',
        avatarColor: '#EC4899',
      },
    ],
  },
];

const SharedDomain: FC<SharedDomainProps> = ({ onClose }) => {
  const { t } = useTranslation();

  return (
    <DrawerContainer title={t('sharedDomain.title')} onClose={onClose}>
      <ProCard
        size="small"
        title={t('sharedDomain.sections.coreRules')}
        className={styles.section}
      >
        <Row gutter={[16, 16]}>
          {ruleItems.map((item) => (
            <Col key={item.key} xs={24} md={12}>
              <div className={styles.rule_card}>
                <div className={styles.rule_icon}>{item.icon}</div>
                <div className={styles.rule_content}>
                  <div className={styles.rule_title}>
                    {t(`sharedDomain.rules.${item.key}.title`)}
                  </div>
                  <div className={styles.rule_description}>
                    {t(`sharedDomain.rules.${item.key}.description`)}
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </ProCard>

      <ProCard
        size="small"
        title={t('sharedDomain.sections.accessFlow')}
        className={styles.section}
      >
        <div className={styles.flow}>
          {flowSteps.map((step, index) => (
            <Fragment key={step.key}>
              <div className={styles.flow_step}>
                <div className={styles.flow_step_number}>{step.step}</div>
                <div className={styles.flow_step_title}>
                  {t(`sharedDomain.flowSteps.${step.key}.title`)}
                </div>
                <div className={styles.flow_step_description}>
                  {t(`sharedDomain.flowSteps.${step.key}.description`)}
                </div>
              </div>
              {index < flowSteps.length - 1 && (
                <div className={styles.flow_arrow}>
                  <ArrowRightOutlined />
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </ProCard>

      <ProCard
        size="small"
        title={t('sharedDomain.sections.sharingGroups')}
        extra={(
          <Drawer
            size="large"
            trigger={(
              <Button type="primary" icon={<PlusOutlined />}>
                {t('createSharedDomain.createButton')}
              </Button>
            )}
          >
            <CreateSharedDomain />
          </Drawer>
        )}
      >
        <div className={styles.groups}>
          {sharingGroups.map((group) => (
            <GroupCard key={group.key} group={group} />
          ))}
        </div>
      </ProCard>
    </DrawerContainer>
  );
};

export default SharedDomain;
