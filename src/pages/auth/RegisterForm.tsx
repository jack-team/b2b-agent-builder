import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Checkbox, Col, Form, Input, Row } from 'antd';
import { MailOutlined } from '@/components/BaseIcons';

const RegisterForm: FC = () => {
  const { t } = useTranslation();

  return (
    <Form layout="vertical" size="large">
      <Form.Item
        name="companyName"
        className="no-card"
        rules={[{ required: true }]}
      >
        <Input placeholder={t('auth.companyName')} />
      </Form.Item>
      <Form.Item
        name="adminName"
        className="no-card"
        rules={[{ required: true }]}
      >
        <Input placeholder={t('auth.adminName')} />
      </Form.Item>
      <Form.Item
        name="contactPhone"
        className="no-card"
        rules={[{ required: true }]}
      >
        <Input placeholder={t('auth.contactPhone')} />
      </Form.Item>
      <Form.Item
        name="businessEmail"
        className="no-card"
        rules={[{ required: true }]}
      >
        <Input placeholder={t('auth.businessEmail')} />
      </Form.Item>
      <Row gutter={12}>
        <Col flex="auto">
          <Form.Item
            name="code"
            className="no-card"
            rules={[{ required: true }]}
          >
            <Input placeholder={t('auth.code')} />
          </Form.Item>
        </Col>
        <Col flex="none">
          <Form.Item className="no-card">
            <Button type="primary" icon={<MailOutlined />}>{t('auth.sendCode')}</Button>
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        name="password"
        className="no-card"
        rules={[{ required: true }]}
      >
        <Input.Password placeholder={t('auth.password')} />
      </Form.Item>
      <Form.Item className="no-card" name="terms" valuePropName="checked" rules={[{ required: true }]}>
        <Checkbox>
          {t('auth.termsPrefix')}{' '}
          <a>{t('auth.termsOfService')}</a>{' '}
          {t('auth.termsAnd')}{' '}
          <a>{t('auth.privacyPolicy')}</a>
        </Checkbox>
      </Form.Item>
      <Button type="primary" block>
        {t('auth.createAccount')}
      </Button>
    </Form>
  );
};

export default RegisterForm;
