import type { ComponentType, FC } from 'react';
import { useMemo } from 'react';
import {
  ArrowRightOutlined,
  PlusOutlined,
} from '@/components/BaseIcons';
import { Button, Col, Row } from 'antd';
import {
  ProCard,
  ProForm,
  ProFormCheckbox,
  ProFormList,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from '@ant-design/pro-components';
import type { ProFormUploadButtonProps } from '@ant-design/pro-form';
import { useTranslation } from 'react-i18next';

import { DrawerContainer } from '@/components/Drawer';
import { useDrawerForm } from '@/hooks/useDrawerForm';
import type {
  OrchestrationBasicInfoFormValues,
  OrchestrationBasicInfoProps,
  OrchestrationType,
} from './types';
import styles from './styles.module.less';

const ProFormAvatarUpload = ProFormUploadButton as ComponentType<ProFormUploadButtonProps>;

const orchestrationTypeValues = [
  'internet_ecommerce',
  'manufacturing',
  'finance',
  'healthcare',
] as const;

const defaultFormValues: OrchestrationBasicInfoFormValues = {
  name: 'Production',
  type: 'internet_ecommerce',
  status: true,
  description: '',
  constraints: [{ value: '' }],
};

const getInitialValues = (
  record?: OrchestrationBasicInfoProps['record'],
): OrchestrationBasicInfoFormValues => {
  if (!record) {
    return defaultFormValues;
  }

  return {
    name: record.name,
    type: record.type ?? 'internet_ecommerce',
    status: record.status === 'enabled',
    description: record.description,
    constraints: record.constraints?.length
      ? record.constraints
      : [{ value: '' }],
  };
};

const OrchestrationBasicInfo: FC<OrchestrationBasicInfoProps> = ({
  onClose,
  onNext,
  record,
}) => {
  const { t } = useTranslation();
  const { formRef, handleFinish, submit } = useDrawerForm<OrchestrationBasicInfoFormValues>({
    onFinish: (values) => {
      onNext?.(values);
    },
  });

  const typeOptions = useMemo(
    () => orchestrationTypeValues.map((value) => ({
      value,
      label: t(`orchestrationBasicInfo.typeOptions.${value}`),
    })),
    [t],
  );

  const initialValues = useMemo(() => getInitialValues(record), [record]);

  return (
    <DrawerContainer
      title={t('orchestrationBasicInfo.title')}
      onClose={onClose}
      extra={(
        <Button type="primary" icon={<ArrowRightOutlined />} onClick={submit}>
          {t('common.next')}
        </Button>
      )}
    >
      <ProForm<OrchestrationBasicInfoFormValues>
        formRef={formRef}
        submitter={false}
        layout="vertical"
        initialValues={initialValues}
        onFinish={handleFinish}
      >
        <ProCard size="small" className={styles.section}>
          <div className={styles.card_header}>
            <div className={styles.card_title}>
              {t('orchestrationBasicInfo.sectionTitle')}
            </div>
            <div className={styles.card_description}>
              {t('orchestrationBasicInfo.sectionDescription')}
            </div>
          </div>
          <ProFormText
            name="name"
            label={t('common.name')}
            rules={[{ required: true, message: t('orchestrationBasicInfo.validationName') }]}
          />
          <Row gutter={12} className={styles.inline_row}>
            <Col span={8}>
              <ProFormSelect<OrchestrationType>
                name="type"
                label={t('orchestrationBasicInfo.type')}
                options={typeOptions}
                rules={[{ required: true, message: t('orchestrationBasicInfo.validationType') }]}
              />
            </Col>
            <Col span={8}>
              <ProFormCheckbox name="status" label={t('common.status')}>
                {t('common.enable')}
              </ProFormCheckbox>
            </Col>
            <Col span={8}>
              <ProFormAvatarUpload
                name="avatar"
                label={t('orchestrationBasicInfo.avatar')}
                max={1}
                title=""
                fieldProps={{
                  beforeUpload: () => false,
                  showUploadList: { showPreviewIcon: false },
                  className: styles.avatar_upload,
                }}
              />
            </Col>
          </Row>
          <ProFormTextArea
            name="description"
            label={t('common.description')}
            fieldProps={{ rows: 4 }}
          />
          <ProFormList
            name="constraints"
            label={t('orchestrationBasicInfo.constraint')}
            copyIconProps={false}
            creatorButtonProps={{
              type: 'link',
              icon: <PlusOutlined />,
              creatorButtonText: t('orchestrationBasicInfo.addNewConstraint'),
            }}
          >
            <ProFormText name="value" />
          </ProFormList>
        </ProCard>
      </ProForm>
    </DrawerContainer>
  );
};

export default OrchestrationBasicInfo;
