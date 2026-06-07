import type { FC } from 'react';
import { useMemo } from 'react';
import { Col, Row } from 'antd';
import {
  ProCard,
  ProForm,
  ProFormCheckbox,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { useTranslation } from 'react-i18next';

import { DrawerContainer } from '@/components/Drawer';
import { useDrawerForm } from '@/hooks/useDrawerForm';
import MemberPicker from './MemberPicker';
import { defaultSelectedMemberIds, mockMemberCandidates } from './mock';
import type { CreateSharedDomainFormValues, CreateSharedDomainProps } from './types';
import styles from './styles.module.less';

const departmentValues = ['engineering', 'product', 'operations', 'sales'] as const;

const groupMemberPermissionValues = ['read_write', 'read_only', 'manage'] as const;

const memoryCreationPermissionValues = ['all_members', 'admins_only'] as const;

const defaultFormValues: CreateSharedDomainFormValues = {
  name: '',
  description: '',
  department: '',
  status: true,
  memberIds: defaultSelectedMemberIds,
  groupMemberPermission: 'read_write',
  memoryCreationPermission: 'admins_only',
  privacyMaskingEnabled: true,
  accessLogsEnabled: true,
};

const CreateSharedDomain: FC<CreateSharedDomainProps> = ({ onClose }) => {
  const { t } = useTranslation();
  const { formRef, handleFinish, saveButton } = useDrawerForm<CreateSharedDomainFormValues>({
    onFinish: () => {
      onClose?.();
    },
  });

  const departmentOptions = useMemo(
    () => departmentValues.map((value) => ({
      value,
      label: t(`departments.${value}`),
    })),
    [t],
  );

  const groupMemberPermissionOptions = useMemo(
    () => groupMemberPermissionValues.map((value) => ({
      value,
      label: t(`createSharedDomain.groupMemberPermissionOptions.${value}`),
    })),
    [t],
  );

  const memoryCreationPermissionOptions = useMemo(
    () => memoryCreationPermissionValues.map((value) => ({
      value,
      label: t(`createSharedDomain.memoryCreationPermissionOptions.${value}`),
    })),
    [t],
  );

  return (
    <DrawerContainer
      title={t('createSharedDomain.title')}
      onClose={onClose}
      extra={saveButton}
    >
      <ProForm<CreateSharedDomainFormValues>
        formRef={formRef}
        submitter={false}
        layout="vertical"
        initialValues={defaultFormValues}
        onFinish={handleFinish}
      >
        <ProCard
          size="small"
          title={t('createSharedDomain.sections.basicInformation')}
          className={styles.section}
        >
          <div className={styles.field_box}>
            <ProFormText
              name="name"
              label={t('createSharedDomain.name')}
              placeholder={t('createSharedDomain.namePlaceholder')}
              rules={[{ required: true, message: t('createSharedDomain.validationName') }]}
            />
            <ProFormTextArea
              name="description"
              label={t('createSharedDomain.description')}
              placeholder={t('createSharedDomain.descriptionPlaceholder')}
              fieldProps={{ rows: 3 }}
            />
            <Row gutter={16}>
              <Col span={12}>
                <ProFormSelect
                  name="department"
                  label={t('createSharedDomain.department')}
                  placeholder={t('createSharedDomain.departmentPlaceholder')}
                  options={departmentOptions}
                  rules={[{ required: true, message: t('createSharedDomain.validationDepartment') }]}
                />
              </Col>
              <Col span={12}>
                <ProFormCheckbox name="status" label={t('createSharedDomain.status')}>
                  {t('common.enable')}
                </ProFormCheckbox>
              </Col>
            </Row>
          </div>
        </ProCard>

        <ProCard
          size="small"
          title={t('createSharedDomain.sections.initializeMembers')}
          className={styles.section}
        >
          <div className={styles.field_box}>
            <ProForm.Item
              name="memberIds"
              label={t('createSharedDomain.members')}
              rules={[{ required: true, message: t('createSharedDomain.validationMembers') }]}
            >
              <MemberPicker candidates={mockMemberCandidates} />
            </ProForm.Item>
          </div>
        </ProCard>

        <ProCard
          size="small"
          title={t('createSharedDomain.sections.accessPermissions')}
        >
          <div className={styles.field_box}>
            <ProFormSelect
              name="groupMemberPermission"
              label={t('createSharedDomain.groupMemberPermissions')}
              placeholder={t('createSharedDomain.groupMemberPermissionsPlaceholder')}
              options={groupMemberPermissionOptions}
              rules={[{ required: true, message: t('createSharedDomain.validationGroupMemberPermissions') }]}
            />
            <ProFormRadio.Group
              name="memoryCreationPermission"
              label={t('createSharedDomain.memoryCreationPermission')}
              options={memoryCreationPermissionOptions}
              rules={[{ required: true, message: t('createSharedDomain.validationMemoryCreationPermission') }]}
            />
            <Row gutter={16}>
              <Col span={12}>
                <ProFormCheckbox
                  name="privacyMaskingEnabled"
                  label={t('createSharedDomain.privacyMasking')}
                >
                  {t('createSharedDomain.privacyMaskingOption')}
                </ProFormCheckbox>
              </Col>
              <Col span={12}>
                <ProFormCheckbox
                  name="accessLogsEnabled"
                  label={t('createSharedDomain.accessLogs')}
                >
                  {t('createSharedDomain.accessLogsOption')}
                </ProFormCheckbox>
              </Col>
            </Row>
          </div>
        </ProCard>
      </ProForm>
    </DrawerContainer>
  );
};

export default CreateSharedDomain;
