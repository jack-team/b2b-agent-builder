import type { FC } from 'react';
import * as uuid from 'uuid';
import { Button } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { useTranslation } from 'react-i18next';
import { ProForm, ProFormText, ProFormCheckbox } from '@ant-design/pro-components';
import { useUserStore } from '@/store/user';
import { IconEmail, IconLock } from '@/components/BaseIcons';
import styles from './styles.module.less';

const SignInForm: FC = () => {
  const { t } = useTranslation();
  const [form] = ProForm.useForm();
  const updateUser = useUserStore(s => s.updateUser);

  const handleSubmit = useMemoizedFn(async () => {
    const formData = await form.validateFields();
    updateUser({ userId: uuid.v4(), email: formData.username });
  });

  return (
    <ProForm
      form={form}
      layout="vertical"
      submitter={false}
    >
      <ProFormText
        name="username"
        label={t('auth.email')}
        required={false}
        allowClear={true}
        rules={[{ required: true }]}
        formItemProps={{ className: 'no-card' }}
        fieldProps={{ prefix: <IconEmail /> }}
      />
      <ProFormText.Password
        name="password"
        label={t('auth.password')}
        allowClear={true}
        required={false}
        rules={[{ required: true }]}
        formItemProps={{ className: 'no-card' }}
        fieldProps={{ prefix: <IconLock /> }}
      />
      <ProForm.Item className="no-card">
        <div className="flex items-center justify-between">
          <ProFormCheckbox
            noStyle
            name="remember"
            initialValue={false}
          >
            {t('auth.rememberMe')}
          </ProFormCheckbox>
          <a>{t('auth.forgotPassword')}</a>
        </div>
      </ProForm.Item>
      <Button
        block
        type="primary"
        onClick={handleSubmit}
        className={styles.submitter}
      >
        {t('auth.signIn')}
      </Button>
    </ProForm>
  );
};

export default SignInForm;
