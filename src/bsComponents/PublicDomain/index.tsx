import type { FC } from 'react';
import { Fragment } from 'react';
import {
  ArrowRightOutlined,
  BookOutlined,
  CrownOutlined,
  GlobalOutlined,
  SendOutlined,
} from '@/components/BaseIcons';
import { Button, Col, Row, Space } from 'antd';
import { ProCard } from '@ant-design/pro-components';
import { useTranslation } from 'react-i18next';

import { DrawerContainer } from '@/components/Drawer';
import type {
  PendingApprovalItem,
  PublicDomainFlowStep,
  PublicDomainProps,
  PublicDomainRuleItem,
  PublishedKnowledgeItem,
} from './types';
import styles from './styles.module.less';

const ruleItems: PublicDomainRuleItem[] = [
  { key: 'globalVisibility', icon: <GlobalOutlined /> },
  { key: 'superAdminsOnly', icon: <CrownOutlined /> },
  { key: 'generalKnowledgeRepository', icon: <BookOutlined /> },
  { key: 'approvalRequiredForPublishing', icon: <SendOutlined /> },
];

const flowSteps: PublicDomainFlowStep[] = [
  { key: 'createMemory', step: 1 },
  { key: 'contentReview', step: 2 },
  { key: 'complianceCheck', step: 3 },
  { key: 'officialPublishing', step: 4 },
];

const pendingApprovals: PendingApprovalItem[] = [
  {
    key: 'pending-1',
    title: '2026 Labor Day Holiday Duty Schedule',
    applicant: 'Isabella Jones',
    submittedAt: '04/26 10:30',
    categoryKey: 'policiesRegulations',
  },
  {
    key: 'pending-2',
    title: 'Customer Complaint Handling SOP Update',
    applicant: 'Sophia Brown',
    submittedAt: '04/26 09:10',
    categoryKey: 'businessProcesses',
  },
  {
    key: 'pending-3',
    title: 'New Product Launch Promotion Plan',
    applicant: 'Amelia Wilson',
    submittedAt: '04/25 14:27',
    categoryKey: 'marketingStrategy',
  },
];

const publishedKnowledge: PublishedKnowledgeItem[] = [
  {
    key: 'published-1',
    title: 'Company Attendance Policy V3.2',
    description: 'Full text of attendance-related policies including clock-in rules, leave management, and overtime compensation standards.',
    visitCount: 2847,
    updatedAt: '04/23 15:41',
  },
  {
    key: 'published-2',
    title: 'Employee Handbook 2026 Edition',
    description: 'Employee concerns including onboarding guidelines, workplace conduct, benefits overview, and career development pathways.',
    visitCount: 2114,
    updatedAt: '04/23 15:59',
  },
  {
    key: 'published-3',
    title: 'Information Security Policy',
    description: 'Security-related requirements including data security, access control, incident response procedures, and compliance obligations.',
    visitCount: 3211,
    updatedAt: '04/23 16:17',
  },
];

const PublicDomain: FC<PublicDomainProps> = ({ onClose }) => {
  const { t } = useTranslation();

  return (
    <DrawerContainer title={t('publicDomain.title')} onClose={onClose}>
      <ProCard
        size="small"
        title={t('publicDomain.sections.coreRules')}
        className={styles.section}
      >
        <Row gutter={[16, 16]}>
          {ruleItems.map((item) => (
            <Col key={item.key} xs={24} md={12}>
              <div className={styles.rule_card}>
                <div className={styles.rule_icon}>{item.icon}</div>
                <div className={styles.rule_content}>
                  <div className={styles.rule_title}>
                    {t(`publicDomain.rules.${item.key}.title`)}
                  </div>
                  <div className={styles.rule_description}>
                    {t(`publicDomain.rules.${item.key}.description`)}
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </ProCard>

      <ProCard
        size="small"
        title={t('publicDomain.sections.approvalProcess')}
        className={styles.section}
      >
        <div className={styles.flow}>
          {flowSteps.map((step, index) => (
            <Fragment key={step.key}>
              <div className={styles.flow_step}>
                <div className={styles.flow_step_number}>{step.step}</div>
                <div className={styles.flow_step_title}>
                  {t(`publicDomain.flowSteps.${step.key}.title`)}
                </div>
                <div className={styles.flow_step_description}>
                  {t(`publicDomain.flowSteps.${step.key}.description`)}
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
        title={t('publicDomain.sections.pendingApproval')}
        className={styles.section}
      >
        <div className={styles.pending_list}>
          {pendingApprovals.map((item) => (
            <div key={item.key} className={styles.pending_item}>
              <div className={styles.pending_content}>
                <div className={styles.pending_title}>{item.title}</div>
                <div className={styles.pending_meta}>
                  {t('publicDomain.pendingMeta', {
                    applicant: item.applicant,
                    submittedAt: item.submittedAt,
                    category: t(`publicDomain.categories.${item.categoryKey}`),
                  })}
                </div>
              </div>
              <Space className={styles.pending_actions} size={12}>
                <Button type="primary" className={styles.approve_btn}>
                  {t('publicDomain.actions.approve')}
                </Button>
                <Button className={styles.reject_btn}>
                  {t('publicDomain.actions.reject')}
                </Button>
              </Space>
            </div>
          ))}
        </div>
      </ProCard>

      <ProCard
        size="small"
        title={t('publicDomain.sections.publishedKnowledge')}
      >
        <div className={styles.knowledge_list}>
          {publishedKnowledge.map((item) => (
            <div key={item.key} className={styles.knowledge_card}>
              <div className={styles.knowledge_body}>
                <div className={styles.knowledge_title}>{item.title}</div>
                <div className={styles.knowledge_description}>{item.description}</div>
              </div>
              <div className={styles.knowledge_footer}>
                {t('publicDomain.knowledgeFooter', {
                  visitCount: item.visitCount.toLocaleString(),
                  updatedAt: item.updatedAt,
                })}
              </div>
            </div>
          ))}
        </div>
      </ProCard>
    </DrawerContainer>
  );
};

export default PublicDomain;
