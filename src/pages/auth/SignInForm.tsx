import type { FC } from 'react';
import * as uuid from 'uuid';
import { Button } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { ProForm, ProFormText, ProFormCheckbox } from '@ant-design/pro-components';
import { useUserStore } from '@/store/user';

const SignInForm: FC = () => {
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
      size="large"
    >
      <ProFormText
        name="username"
        allowClear={true}
        placeholder="Email / Username"
        formItemProps={{ className: 'no-card' }}
        rules={[{ required: true }]}
      />
      <ProFormText.Password
        name="password"
        allowClear={true}
        placeholder="Password"
        formItemProps={{ className: 'no-card' }}
        rules={[{ required: true }]}
      />
      <ProForm.Item className="no-card">
        <div className="flex items-center justify-between">
          <ProFormCheckbox
            noStyle
            name="remember"
            initialValue={false}
            formItemProps={{ className: 'no-card' }}
          >
            Remember me
          </ProFormCheckbox>
          <a>Forgot password?</a>
        </div>
      </ProForm.Item>
      <Button
        block
        type="primary"
        onClick={handleSubmit}
      >
        Sign In
      </Button>
    </ProForm>
  );
};

export default SignInForm;