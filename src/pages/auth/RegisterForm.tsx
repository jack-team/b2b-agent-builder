import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ProForm, ProFormText, ProFormCheckbox } from '@ant-design/pro-components';
import { Button, Row, Col } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import styles from './styles.module.less';

const RegisterForm: FC = () => {
  const { t } = useTranslation();

  return (
    <ProForm
      layout="vertical"
      submitter={false}
    >
      <ProFormText
        name="companyName"
        placeholder={t('auth.companyName')}
        formItemProps={{ className: 'no-card' }}
        rules={[{ required: true }]}
      />
      <ProFormText
        name="adminName"
        placeholder={t('auth.adminName')}
        formItemProps={{ className: 'no-card' }}
        rules={[{ required: true }]}
      />
      <ProFormText
        name="contactPhone"
        placeholder={t('auth.contactPhone')}
        formItemProps={{ className: 'no-card' }}
        rules={[{ required: true }]}
      />
      <ProFormText
        name="businessEmail"
        placeholder={t('auth.businessEmail')}
        formItemProps={{ className: 'no-card' }}
        rules={[{ required: true }]}
      />
      <Row gutter={12}>
        <Col flex="auto">
          <ProFormText
            name="code"
            placeholder={t('auth.code')}
            formItemProps={{ className: 'no-card' }}
            rules={[{ required: true }]}
          />
        </Col>
        <Col flex="none">
          <ProForm.Item className="no-card">
            <Button type="primary" icon={<MailOutlined />}>{t('auth.sendCode')}</Button>
          </ProForm.Item>
        </Col>
      </Row>
      <ProFormText.Password
        name="password"
        placeholder={t('auth.password')}
        formItemProps={{ className: 'no-card' }}
        rules={[{ required: true }]}
      />
      <ProForm.Item className="no-card">
        <ProFormCheckbox noStyle name="terms">
          {t('auth.termsPrefix')}{' '}
          <a>{t('auth.termsOfService')}</a>{' '}
          {t('auth.termsAnd')}{' '}
          <a>{t('auth.privacyPolicy')}</a>
        </ProFormCheckbox>
      </ProForm.Item>
      <Button type="primary" block className={styles.submitter}>
        {t('auth.createAccount')}
      </Button>
    </ProForm>
  );
};

export default RegisterForm;
