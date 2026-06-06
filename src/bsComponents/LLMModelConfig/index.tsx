import type { FC } from 'react';
import { useRef, useMemo } from 'react';
import { Button, Row, Col } from 'antd';
import { PlusOutlined, SaveOutlined } from '@ant-design/icons';
import {
  ProForm,
  ProCard,
  ProFormSelect,
  ProFormText,
  ProFormCheckbox,
  ProFormList,
  ProFormDigit,
} from '@ant-design/pro-components';
import type { ProFormInstance } from '@ant-design/pro-components';
import { useMemoizedFn } from 'ahooks';
import { useTranslation } from 'react-i18next';

import { DrawerContainer } from '@/components/Drawer';
import type { LLMModelConfigProps, LLMModelFormValues } from './types';

const defaultFormValues: LLMModelFormValues = {
  modelName: '',
  modelId: '',
  apiProtocol: 'openai_compatible',
  status: true,
  apiUrl: '',
  apiKey: '',
  secret: '',
  headers: [{}],
  timeout: 30,
  maxContext: 8192,
  temperature: 0.7,
  maxOutput: 1024,
  topP: 0.9,
  stopSequences: '',
};

const getInitialValues = (record?: LLMModelConfigProps['record']): LLMModelFormValues => {
  if (!record) {
    return defaultFormValues;
  }

  return {
    ...defaultFormValues,
    modelName: record.modelName,
    modelId: record.modelId,
    apiUrl: record.apiUrl,
    status: record.status === 'enabled',
  };
};

const LLMModelConfig: FC<LLMModelConfigProps> = ({ onClose, record }) => {
  const { t } = useTranslation();
  const formRef = useRef<ProFormInstance<LLMModelFormValues>>(null);

  const apiProtocolOptions = useMemo(() => [
    { value: 'openai_compatible', label: t('llmPage.protocolOpenai') },
    { value: 'anthropic', label: t('llmPage.protocolAnthropic') },
    { value: 'custom', label: t('llmPage.protocolCustom') },
  ], [t]);

  const handleFinish = useMemoizedFn((_values: LLMModelFormValues) => {
    // placeholder for API integration
  });

  const handleSave = useMemoizedFn(() => {
    formRef.current?.submit();
  });

  return (
    <DrawerContainer
      title={record ? t('llmPage.updateModel') : t('llmPage.createModel')}
      onClose={onClose}
      extra={
        <Button type="primary" icon={<SaveOutlined />} onClick={handleSave}>
          {t('common.save')}
        </Button>
      }
    >
      <ProForm<LLMModelFormValues>
        formRef={formRef}
        submitter={false}
        initialValues={getInitialValues(record)}
        onFinish={handleFinish}
      >
        <ProCard size="small" title={t('llmPage.basicInformation')}>
          <Row gutter={16}>
            <Col span={12}>
              <ProFormText
                name="modelName"
                label={t('llmPage.modelName')}
                rules={[{ required: true, message: t('llmPage.validationModelName') }]}
              />
            </Col>
            <Col span={12}>
              <ProFormText
                name="modelId"
                label={t('llmPage.modelId')}
                rules={[{ required: true, message: t('llmPage.validationModelId') }]}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <ProFormSelect
                name="apiProtocol"
                label={t('llmPage.apiProtocol')}
                options={apiProtocolOptions}
              />
            </Col>
            <Col span={12}>
              <ProFormCheckbox
                name="status"
                label={t('common.status')}
              >
                {t('common.enable')}
              </ProFormCheckbox>
            </Col>
          </Row>
          <ProFormText
            name="apiUrl"
            label={t('llmPage.apiUrl')}
            rules={[{ required: true, message: t('llmPage.validationApiUrl') }]}
          />
          <ProFormText.Password
            name="apiKey"
            label={t('llmPage.apiKey')}
          />
          <ProFormText.Password
            name="secret"
            label={t('llmPage.secret')}
          />
          <ProFormList
            name="headers"
            label={t('llmPage.headers')}
            creatorButtonProps={{
              type: 'link',
              icon: <PlusOutlined />,
              creatorButtonText: t('llmPage.newHeader'),
            }}
          >
            <Row gutter={16}>
              <Col span={12}>
                <ProFormText
                  name="key"
                  placeholder={t('common.key')}
                />
              </Col>
              <Col span={12}>
                <ProFormText
                  name="value"
                  placeholder={t('common.value')}
                />
              </Col>
            </Row>
          </ProFormList>
          <ProFormDigit
            name="timeout"
            label={t('llmPage.timeout')}
            fieldProps={{ precision: 0, style: { width: '100%' } }}
          />
        </ProCard>
        <ProCard size="small" title={t('llmPage.modelParameters')} className="mt-[16px]">
          <Row gutter={16}>
            <Col span={12}>
              <ProFormDigit
                name="maxContext"
                label={t('llmPage.maxContext')}
                fieldProps={{ precision: 0, style: { width: '100%' } }}
              />
            </Col>
            <Col span={12}>
              <ProFormDigit
                name="temperature"
                label={t('llmPage.temperature')}
                fieldProps={{ min: 0, max: 2, step: 0.1, style: { width: '100%' } }}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <ProFormDigit
                name="maxOutput"
                label={t('llmPage.maxOutput')}
                fieldProps={{ precision: 0, style: { width: '100%' } }}
              />
            </Col>
            <Col span={12}>
              <ProFormDigit
                name="topP"
                label={t('llmPage.topP')}
                fieldProps={{ min: 0, max: 1, step: 0.1, style: { width: '100%' } }}
              />
            </Col>
          </Row>
          <ProFormText
            name="stopSequences"
            label={t('llmPage.stopSequences')}
            placeholder={t('llmPage.stopSequencesPlaceholder')}
          />
        </ProCard>
      </ProForm>
    </DrawerContainer>
  );
};

export default LLMModelConfig;
