import type { FC } from 'react';
import { useRef } from 'react';
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
  const formRef = useRef<ProFormInstance<LLMModelFormValues>>(null);

  const handleFinish = useMemoizedFn((_values: LLMModelFormValues) => {
    // placeholder for API integration
  });

  const handleSave = useMemoizedFn(() => {
    formRef.current?.submit();
  });

  return (
    <DrawerContainer
      title={record ? 'Update Model' : 'Create Model'}
      onClose={onClose}
      extra={
        <Button type="primary" icon={<SaveOutlined />} onClick={handleSave}>
          Save
        </Button>
      }
    >
      <ProForm<LLMModelFormValues>
        formRef={formRef}
        submitter={false}
        initialValues={getInitialValues(record)}
        onFinish={handleFinish}
      >
        <div className="gay-box mb-[16px]">
          <ProCard size="small" title="Basic Information">
            <Row gutter={16}>
              <Col span={12}>
                <ProFormText
                  name="modelName"
                  label="Model name"
                  rules={[{ required: true, message: 'Please enter model name' }]}
                />
              </Col>
              <Col span={12}>
                <ProFormText
                  name="modelId"
                  label="Model ID"
                  rules={[{ required: true, message: 'Please enter model ID' }]}
                />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <ProFormSelect
                  name="apiProtocol"
                  label="API Protocol"
                  options={[
                    { value: 'openai_compatible', label: 'OpenAI Compatible' },
                    { value: 'anthropic', label: 'Anthropic' },
                    { value: 'custom', label: 'Custom' },
                  ]}
                />
              </Col>
              <Col span={12}>
                <ProFormCheckbox
                  name="status"
                  label="Status"
                >
                  Enable
                </ProFormCheckbox>
              </Col>
            </Row>
            <ProFormText
              name="apiUrl"
              label="API URL"
              rules={[{ required: true, message: 'Please enter API URL' }]}
            />
            <ProFormText.Password
              name="apiKey"
              label="API Key"
            />
            <ProFormText.Password
              name="secret"
              label="Secret"
            />
            <ProFormList
              name="headers"
              label="Headers"
              creatorButtonProps={{
                type: 'link',
                icon: <PlusOutlined />,
                creatorButtonText: '+ New header',
              }}
            >
              <Row gutter={16}>
                <Col span={12}>
                  <ProFormText
                    name="key"
                    placeholder="Key"
                  />
                </Col>
                <Col span={12}>
                  <ProFormText
                    name="value"
                    placeholder="Value"
                  />
                </Col>
              </Row>
            </ProFormList>
            <ProFormDigit
              name="timeout"
              label="Timeout(s)"
              fieldProps={{ precision: 0, style: { width: '100%' } }}
            />
          </ProCard>
        </div>
        <div className="gay-box">
          <ProCard size="small" title="Model Parameters">
            <Row gutter={16}>
              <Col span={12}>
                <ProFormDigit
                  name="maxContext"
                  label="Max context"
                  fieldProps={{ precision: 0, style: { width: '100%' } }}
                />
              </Col>
              <Col span={12}>
                <ProFormDigit
                  name="temperature"
                  label="Temperature"
                  fieldProps={{ min: 0, max: 2, step: 0.1, style: { width: '100%' } }}
                />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <ProFormDigit
                  name="maxOutput"
                  label="Max output"
                  fieldProps={{ precision: 0, style: { width: '100%' } }}
                />
              </Col>
              <Col span={12}>
                <ProFormDigit
                  name="topP"
                  label="Top P"
                  fieldProps={{ min: 0, max: 1, step: 0.1, style: { width: '100%' } }}
                />
              </Col>
            </Row>
            <ProFormText
              name="stopSequences"
              label="Stop sequences"
              placeholder="Separate multiple stop words with English commas"
            />
          </ProCard>
        </div>
      </ProForm>
    </DrawerContainer>
  );
};

export default LLMModelConfig;
