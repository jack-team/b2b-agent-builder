import type { FC } from 'react';
import { Button, Space, Tag } from 'antd';
import { EyeOutlined, PlusOutlined } from '@/components/BaseIcons';
import { useTranslation } from 'react-i18next';

import { mockMaskingTemplates } from './mock';
import type { DetectionMethod } from './types';
import styles from './styles.module.less';

const detectionMethodColorMap: Record<DetectionMethod, string> = {
  regex: 'blue',
  llm: 'cyan',
  ner: 'purple',
  luhn: 'geekblue',
};

const TemplatesTab: FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.templates}>
      <div className={styles.templates_toolbar}>
        <Button type="primary" icon={<PlusOutlined />}>
          {t('privacyMasking.actions.new')}
        </Button>
      </div>
      <div className={styles.template_list}>
        {mockMaskingTemplates.map((template) => (
          <div key={template.key} className={styles.template_card}>
            <div className={styles.template_main}>
              <div className={styles.template_header}>
                <span className={styles.template_name}>{template.name}</span>
                <Tag color={detectionMethodColorMap[template.method]}>
                  {t(`privacyMasking.detectionMethod.${template.method}`)}
                </Tag>
              </div>
              <p className={styles.template_description}>{template.description}</p>
              <div className={styles.template_meta}>
                <span>
                  {t('privacyMasking.templates.method')}
                  {': '}
                  {t(`privacyMasking.detectionMethod.${template.method}`)}
                </span>
                <span className={styles.template_meta_divider}>·</span>
                <span>
                  {t('privacyMasking.templates.strategy')}
                  {': '}
                  {t(`privacyMasking.templateStrategy.${template.strategy}`)}
                </span>
                <span className={styles.template_meta_divider}>·</span>
                <span>
                  {t('privacyMasking.templates.used', { count: template.usedCount })}
                </span>
              </div>
            </div>
            <Space className={styles.template_actions} size={12}>
              <Button type="primary">
                {t('privacyMasking.actions.createRule')}
              </Button>
              <Button icon={<EyeOutlined />}>
                {t('privacyMasking.actions.preview')}
              </Button>
            </Space>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplatesTab;
