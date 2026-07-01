import type { FC } from 'react';
import * as uuid from 'uuid';
import { Button, Checkbox, Form, Input } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '@/store/user';
import { prefetchRoute } from '@/router/helper';
import { IconEmail, IconLock } from '@/components/BaseIcons';
import styles from './styles.module.less';

const SignInForm: FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const updateUser = useUserStore(s => s.updateUser);

  const handleSubmit = useMemoizedFn(async () => {
    const formData = await form.validateFields();
    updateUser({ userId: uuid.v4(), email: formData.username });
    prefetchRoute('/dashboard');
  });

  return (
    <Form form={form} layout="vertical">
      <Form.Item
        name="username"
        label={t('auth.email')}
        className="no-card"
        rules={[{ required: true }]}
      >
        <Input prefix={<IconEmail />} allowClear />
      </Form.Item>
      <Form.Item
        name="password"
        label={t('auth.password')}
        className="no-card"
        rules={[{ required: true }]}
      >
        <Input.Password prefix={<IconLock />} allowClear />
      </Form.Item>
      <Form.Item className="no-card">
        <div className="flex items-center justify-between">
          <Form.Item name="remember" valuePropName="checked" noStyle initialValue={false}>
            <Checkbox>{t('auth.rememberMe')}</Checkbox>
          </Form.Item>
          <a>{t('auth.forgotPassword')}</a>
        </div>
      </Form.Item>
      <Button
        block
        type="primary"
        onClick={handleSubmit}
        className={styles.submitter}
      >
        {t('auth.signIn')}
      </Button>
    </Form>
  );
};

export default SignInForm;
