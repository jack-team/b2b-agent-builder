import type { FC } from 'react';
import { useMemo } from 'react';
import { Col, Row, Space } from 'antd';
import {
  ProForm,
  ProCard,
  ProFormSelect,
  ProFormDigit,
  ProFormSlider,
  ProFormCheckbox,
  ProFormDependency,
} from '@ant-design/pro-components';
import { useTranslation } from 'react-i18next';

import { DrawerContainer } from '@/components/Drawer';
import { useDrawerForm } from '@/hooks/useDrawerForm';
import type {
  MemoryLifecyclePolicyFormValues,
  MemoryLifecyclePolicyProps,
} from './types';
import styles from './styles.module.less';

const defaultFormValues: MemoryLifecyclePolicyFormValues = {
  decayCurveType: 'ebbinghaus_standard',
  memoryHalfLife: 30,
  memoryHalfLifeUnit: 'days',
  dormantThreshold: 0.2,
  archiveTriggerValue: 30,
  archiveTriggerUnit: 'days_of_inactivity',
  mergeTriggerCondition: 'same_type_dormant_gt_30',
  offlineMergeEnabled: true,
  mergeStrategy: 'semantic_similarity',
};

const getInitialValues = (
  record?: MemoryLifecyclePolicyProps['record'],
): MemoryLifecyclePolicyFormValues => ({
  ...defaultFormValues,
  ...record,
});

const MemoryLifecyclePolicy: FC<MemoryLifecyclePolicyProps> = ({ onClose, record }) => {
  const { t } = useTranslation();
  const { formRef, handleFinish, saveButton } = useDrawerForm<MemoryLifecyclePolicyFormValues>({
    onFinish: () => {
      // placeholder for API integration
    },
  });

  const decayCurveTypeOptions = useMemo(
    () => [
      {
        value: 'ebbinghaus_standard',
        label: t('memoryLifecyclePolicy.decayCurveTypeOptions.ebbinghausStandard'),
      },
    ],
    [t],
  );

  const memoryHalfLifeUnitOptions = useMemo(
    () => [
      { value: 'days', label: t('memoryLifecyclePolicy.units.days') },
      { value: 'hours', label: t('memoryLifecyclePolicy.units.hours') },
      { value: 'weeks', label: t('memoryLifecyclePolicy.units.weeks') },
    ],
    [t],
  );

  const archiveTriggerUnitOptions = useMemo(
    () => [
      {
        value: 'days_of_inactivity',
        label: t('memoryLifecyclePolicy.units.daysOfInactivity'),
      },
    ],
    [t],
  );

  const mergeTriggerConditionOptions = useMemo(
    () => [
      {
        value: 'same_type_dormant_gt_30',
        label: t('memoryLifecyclePolicy.mergeTriggerOptions.sameTypeDormantGt30'),
      },
    ],
    [t],
  );

  const mergeStrategyOptions = useMemo(
    () => [
      {
        value: 'semantic_similarity',
        label: t('memoryLifecyclePolicy.mergeStrategyOptions.semanticSimilarity'),
      },
    ],
    [t],
  );

  return (
    <DrawerContainer
      title={t('memoryLifecyclePolicy.title')}
      onClose={onClose}
      extra={saveButton}
    >
      <ProForm<MemoryLifecyclePolicyFormValues>
        formRef={formRef}
        submitter={false}
        layout="vertical"
        initialValues={getInitialValues(record)}
        onFinish={handleFinish}
      >
        <ProCard size="small" title={t('memoryLifecyclePolicy.sections.decayRate')}>
          <ProFormSelect
            name="decayCurveType"
            label={t('memoryLifecyclePolicy.decayCurveType')}
            options={decayCurveTypeOptions}
            rules={[{ required: true, message: t('memoryLifecyclePolicy.validationDecayCurveType') }]}
          />
          <ProForm.Item
            label={t('memoryLifecyclePolicy.memoryHalfLife')}
            extra={t('memoryLifecyclePolicy.memoryHalfLifeHint')}
            required
          >
            <Space.Compact className={styles.compact_field}>
              <ProFormDigit
                name="memoryHalfLife"
                noStyle
                min={1}
                fieldProps={{ precision: 0, style: { width: '50%' } }}
                rules={[{ required: true, message: t('memoryLifecyclePolicy.validationMemoryHalfLife') }]}
              />
              <ProFormSelect
                name="memoryHalfLifeUnit"
                noStyle
                options={memoryHalfLifeUnitOptions}
                fieldProps={{ style: { width: '50%' } }}
                rules={[{ required: true, message: t('memoryLifecyclePolicy.validationMemoryHalfLifeUnit') }]}
              />
            </Space.Compact>
          </ProForm.Item>
        </ProCard>

        <ProCard
          size="small"
          title={t('memoryLifecyclePolicy.sections.archiveThreshold')}
          className="mt-[16px]"
        >
          <ProForm.Item
            label={t('memoryLifecyclePolicy.dormantThreshold')}
            extra={t('memoryLifecyclePolicy.dormantThresholdHint')}
            required
          >
            <div className={styles.slider_row}>
              <div className={styles.slider_track}>
                <ProFormSlider
                  name="dormantThreshold"
                  noStyle
                  min={0}
                  max={1}
                  step={0.01}
                  rules={[{ required: true, message: t('memoryLifecyclePolicy.validationDormantThreshold') }]}
                />
              </div>
              <ProFormDependency name={['dormantThreshold']}>
                {({ dormantThreshold }) => (
                  <span className={styles.slider_value}>
                    {(dormantThreshold ?? 0).toFixed(2)}
                  </span>
                )}
              </ProFormDependency>
            </div>
          </ProForm.Item>
          <ProForm.Item
            label={t('memoryLifecyclePolicy.archiveTriggerCondition')}
            required
          >
            <Space.Compact className={styles.compact_field}>
              <ProFormDigit
                name="archiveTriggerValue"
                noStyle
                min={1}
                fieldProps={{ precision: 0, style: { width: '50%' } }}
                rules={[{ required: true, message: t('memoryLifecyclePolicy.validationArchiveTriggerValue') }]}
              />
              <ProFormSelect
                name="archiveTriggerUnit"
                noStyle
                options={archiveTriggerUnitOptions}
                fieldProps={{ style: { width: '50%' } }}
                rules={[{ required: true, message: t('memoryLifecyclePolicy.validationArchiveTriggerUnit') }]}
              />
            </Space.Compact>
          </ProForm.Item>
        </ProCard>

        <ProCard
          size="small"
          title={t('memoryLifecyclePolicy.sections.reflectionMergeStrategy')}
          className="mt-[16px]"
        >
          <ProFormSelect
            name="mergeTriggerCondition"
            label={t('memoryLifecyclePolicy.mergeTriggerCondition')}
            options={mergeTriggerConditionOptions}
            rules={[{ required: true, message: t('memoryLifecyclePolicy.validationMergeTriggerCondition') }]}
          />
          <Row gutter={16}>
            <Col span={12}>
              <ProFormCheckbox
                name="offlineMergeEnabled"
                label={t('memoryLifecyclePolicy.offlineMergeSwitch')}
              >
                {t('common.enable')}
              </ProFormCheckbox>
            </Col>
          </Row>
          <ProFormSelect
            name="mergeStrategy"
            label={t('memoryLifecyclePolicy.mergeStrategy')}
            options={mergeStrategyOptions}
            rules={[{ required: true, message: t('memoryLifecyclePolicy.validationMergeStrategy') }]}
          />
        </ProCard>
      </ProForm>
    </DrawerContainer>
  );
};

export default MemoryLifecyclePolicy;
