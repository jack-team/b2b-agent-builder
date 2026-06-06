import type { FC } from 'react';
import { useRef } from 'react';
import { Button, Row, Col } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import {
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormCheckbox,
  ProFormList
} from '@ant-design/pro-components';
import type { ProFormInstance } from '@ant-design/pro-components';
import { useMemoizedFn } from 'ahooks';

import { DrawerContainer } from '@/components/Drawer';
import type { UserConfigProps, UserFormValues } from './types';
import StageItem from './stageItem';

const fieldPlaceholder =
  'Please enter a shared domain group name, e.g., R&D Team';

const merchantOptions = [
  { value: 'shopify', label: 'Shopify' },
  { value: 'woocommerce', label: 'WooCommerce' },
  { value: 'magento', label: 'Magento' },
];

const departmentOptions = [
  { value: 'engineering', label: 'Engineering' },
  { value: 'product', label: 'Product' },
  { value: 'operations', label: 'Operations' },
  { value: 'sales', label: 'Sales' },
];

const roleOptions = [
  { value: 'super_admin', label: 'Super Admin' },
  { value: 'admin', label: 'Admin' },
  { value: 'audit_admin', label: 'Audit Admin' },
];

const defaultFormValues: UserFormValues = {
  name: '',
  email: '',
  phone: '',
  merchant: '',
  department: '',
  jobTitle: '',
  status: true,
  welcomeEmail: true,
};

const normalizeMerchant = (merchant: string) => {
  const normalized = merchant.toLowerCase();
  const matched = merchantOptions.find(
    (item) => item.value === normalized || item.label === merchant,
  );
  return matched?.value ?? merchant;
};

const getInitialValues = (record?: UserConfigProps['record']): UserFormValues => {
  if (!record) {
    return defaultFormValues;
  }

  return {
    name: record.name,
    email: record.email,
    phone: record.phone ?? '',
    merchant: normalizeMerchant(record.merchant),
    department: record.department ?? '',
    jobTitle: record.jobTitle ?? '',
    role: record.role,
    status: record.status === 'enabled',
    welcomeEmail: false,
  };
};

const UserConfig: FC<UserConfigProps> = ({ onClose, record }) => {
  const formRef = useRef<ProFormInstance<UserFormValues>>(null);
  const isEdit = Boolean(record);

  const handleFinish = useMemoizedFn((_values: UserFormValues) => {
    // placeholder for API integration
  });

  const handleSave = useMemoizedFn(() => {
    formRef.current?.submit();
  });

  return (
    <DrawerContainer
      title={isEdit ? 'Update User' : 'Create User'}
      onClose={onClose}
      extra={
        <Button type="primary" icon={<SaveOutlined />} onClick={handleSave}>
          Save
        </Button>
      }
    >
      <ProForm<UserFormValues>
        formRef={formRef}
        submitter={false}
        layout="vertical"
        initialValues={getInitialValues(record)}
        onFinish={handleFinish}
      >
        <div className="gay-box p-[16px]">
          <ProFormText
            name="name"
            label="Name"
            placeholder={fieldPlaceholder}
            rules={[{ required: true, message: 'Please enter name' }]}
          />
          <ProFormText
            name="email"
            label="Email"
            placeholder={fieldPlaceholder}
            rules={[
              { required: true, message: 'Please enter email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          />
          <ProFormText
            name="phone"
            label="Phone Number"
            placeholder={fieldPlaceholder}
          />
          <ProFormSelect
            name="merchant"
            label="Merchant"
            placeholder={fieldPlaceholder}
            options={merchantOptions}
            rules={[{ required: true, message: 'Please select merchant' }]}
          />
          <ProFormSelect
            name="department"
            label="Department"
            placeholder={fieldPlaceholder}
            options={departmentOptions}
            rules={[{ required: true, message: 'Please select department' }]}
          />
          <ProFormText
            name="jobTitle"
            label="Job Title"
            placeholder={fieldPlaceholder}
          />
          <ProFormSelect
            name="role"
            label="Role"
            placeholder="Please select a department"
            options={roleOptions}
            rules={[{ required: true, message: 'Please select role' }]}
          />
          <ProFormList
            name="list"
            initialValue={[{}]}
            copyIconProps={false}
            deleteIconProps={false}
            alwaysShowItemLabel
            creatorButtonProps={{
              type: 'link',
            }}
          >
            {(_, index, actions, count) => {
              return (
                <StageItem
                  index={index}
                  count={count}
                  actions={actions}
                />
              )
            }}
          </ProFormList>
          <Row gutter={16}>
            <Col span={12}>
              <ProFormCheckbox name="status" label="Status">
                Enable
              </ProFormCheckbox>
            </Col>
            <Col span={12}>
              <ProFormCheckbox
                name="welcomeEmail"
                label="Send a welcome email to the user"
              >
                Enable
              </ProFormCheckbox>
            </Col>
          </Row>
        </div>
      </ProForm>
    </DrawerContainer>
  );
};

export default UserConfig;
