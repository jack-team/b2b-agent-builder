import type { FC } from 'react';
import { Button } from 'antd';
import { ProForm, ProFormText, ProFormCheckbox } from '@ant-design/pro-components';

const SignInForm: FC = () => {
  return (
    <ProForm
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
      <div className="pt-[6px]">
        <div className="flex items-center justify-between mb-[24px]">
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
        <Button type="primary" htmlType="submit" block>
          Sign In
        </Button>
      </div>
    </ProForm>
  );
};

export default SignInForm;