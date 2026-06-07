import type { FC } from 'react';
import { useMemo } from 'react';
import { Row, Col } from 'antd';
import {
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormCheckbox,
  ProFormList
} from '@ant-design/pro-components';
import { useTranslation } from 'react-i18next';

import { DrawerContainer } from '@/components/Drawer';
import { useDrawerForm } from '@/hooks/useDrawerForm';
import type { UserConfigProps, UserFormValues } from './types';
import StageItem from './stageItem';

const merchantOptions = [
  { value: 'shopify', label: 'Shopify' },
  { value: 'woocommerce', label: 'WooCommerce' },
  { value: 'magento', label: 'Magento' },
];

const departmentValues = ['engineering', 'product', 'operations', 'sales'] as const;

const roleValues = ['super_admin', 'admin', 'audit_admin'] as const;

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
  const { t } = useTranslation();
  const { formRef, handleFinish, saveButton } = useDrawerForm<UserFormValues>({
    onFinish: () => {
      // placeholder for API integration
    },
  });
  const isEdit = Boolean(record);

  const departmentOptions = useMemo(
    () => departmentValues.map((value) => ({
      value,
      label: t(`departments.${value}`),
    })),
    [t],
  );

  const roleOptions = useMemo(
    () => roleValues.map((value) => ({
      value,
      label: t(`roles.${value}`),
    })),
    [t],
  );

  return (
    <DrawerContainer
      title={isEdit ? t('userConfig.updateUser') : t('userConfig.createUser')}
      onClose={onClose}
      extra={saveButton}
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
            label={t('userConfig.name')}
            placeholder={t('userConfig.fieldPlaceholder')}
            rules={[{ required: true, message: t('userConfig.validationName') }]}
          />
          <ProFormText
            name="email"
            label={t('userConfig.email')}
            placeholder={t('userConfig.fieldPlaceholder')}
            rules={[
              { required: true, message: t('userConfig.validationEmail') },
              { type: 'email', message: t('userConfig.validationEmailFormat') },
            ]}
          />
          <ProFormText
            name="phone"
            label={t('userConfig.phoneNumber')}
            placeholder={t('userConfig.fieldPlaceholder')}
          />
          <ProFormSelect
            name="merchant"
            label={t('userConfig.merchant')}
            placeholder={t('userConfig.fieldPlaceholder')}
            options={merchantOptions}
            rules={[{ required: true, message: t('userConfig.validationMerchant') }]}
          />
          <ProFormSelect
            name="department"
            label={t('userConfig.department')}
            placeholder={t('userConfig.fieldPlaceholder')}
            options={departmentOptions}
            rules={[{ required: true, message: t('userConfig.validationDepartment') }]}
          />
          <ProFormText
            name="jobTitle"
            label={t('userConfig.jobTitle')}
            placeholder={t('userConfig.fieldPlaceholder')}
          />
          <ProFormSelect
            name="role"
            label={t('userConfig.role')}
            placeholder={t('userConfig.selectDepartment')}
            options={roleOptions}
            rules={[{ required: true, message: t('userConfig.validationRole') }]}
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
              <ProFormCheckbox name="status" label={t('userConfig.status')}>
                {t('common.enable')}
              </ProFormCheckbox>
            </Col>
            <Col span={12}>
              <ProFormCheckbox
                name="welcomeEmail"
                label={t('userConfig.welcomeEmail')}
              >
                {t('common.enable')}
              </ProFormCheckbox>
            </Col>
          </Row>
        </div>
      </ProForm>
    </DrawerContainer>
  );
};

export default UserConfig;
