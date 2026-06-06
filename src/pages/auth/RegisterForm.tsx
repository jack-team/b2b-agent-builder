import type { FC } from 'react';
import { ProForm, ProFormText, ProFormCheckbox } from '@ant-design/pro-components';
import { Button, Row, Col } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import styles from './styles.module.less';

const RegisterForm: FC = () => {
  return (
    <ProForm
      layout="vertical"
      submitter={false}
    >
      <ProFormText
        name="companyName"
        placeholder="Company Name"
        formItemProps={{ className: 'no-card' }}
        rules={[{ required: true }]}
      />
      <ProFormText
        name="adminName"
        placeholder="Admin Name"
        formItemProps={{ className: 'no-card' }}
        rules={[{ required: true }]}
      />
      <ProFormText
        name="contactPhone"
        placeholder="Contact Phone"
        formItemProps={{ className: 'no-card' }}
        rules={[{ required: true }]}
      />
      <ProFormText
        name="businessEmail"
        placeholder="Business Email"
        formItemProps={{ className: 'no-card' }}
        rules={[{ required: true }]}
      />
      <Row gutter={12}>
        <Col flex="auto">
          <ProFormText
            name="code"
            placeholder="Code"
            formItemProps={{ className: 'no-card' }}
            rules={[{ required: true }]}
          />
        </Col>
        <Col flex="none">
          <ProForm.Item className="no-card">
            <Button type="primary" icon={<MailOutlined />}>Send code</Button>
          </ProForm.Item>
        </Col>
      </Row>
      <ProFormText.Password
        name="password"
        placeholder="Password"
        formItemProps={{ className: 'no-card' }}
        rules={[{ required: true }]}
      />
      <ProForm.Item className="no-card">
        <ProFormCheckbox noStyle name="terms">
          I have read and agree to the <a>Terms of Service</a> and <a>Privacy Policy</a>
        </ProFormCheckbox>
      </ProForm.Item>
      <Button type="primary" block className={styles.submitter}>
        Create Account
      </Button>
    </ProForm>
  );
};

export default RegisterForm;