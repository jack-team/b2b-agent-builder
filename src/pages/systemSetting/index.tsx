import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs, Card, Form, Input, Button, Switch, Select } from 'antd';

const SystemSetting: FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const generalSettings = (
    <Card title="General Settings">
      <Form form={form} layout="vertical">
        <Form.Item label="System Name" name="systemName" initialValue="B2B Agent Builder">
          <Input />
        </Form.Item>
        <Form.Item label="Language" name="language" initialValue="en">
          <Select>
            <Select.Option value="en">English</Select.Option>
            <Select.Option value="zh-CN">简体中文</Select.Option>
            <Select.Option value="zh-TW">繁體中文</Select.Option>
            <Select.Option value="ja">日本語</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Timezone" name="timezone" initialValue="UTC+8">
          <Select>
            <Select.Option value="UTC+8">UTC+8</Select.Option>
            <Select.Option value="UTC+0">UTC+0</Select.Option>
            <Select.Option value="UTC-8">UTC-8</Select.Option>
          </Select>
        </Form.Item>
        <Button type="primary">Save</Button>
      </Form>
    </Card>
  );

  const securitySettings = (
    <Card title="Security Settings">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span>Two-Factor Authentication</span>
          <Switch />
        </div>
        <div className="flex justify-between items-center">
          <span>IP Whitelist</span>
          <Switch />
        </div>
        <div className="flex justify-between items-center">
          <span>Audit Log</span>
          <Switch defaultChecked />
        </div>
      </div>
    </Card>
  );

  const notificationSettings = (
    <Card title="Notification Settings">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span>Email Notifications</span>
          <Switch defaultChecked />
        </div>
        <div className="flex justify-between items-center">
          <span>System Alerts</span>
          <Switch defaultChecked />
        </div>
        <div className="flex justify-between items-center">
          <span>Marketing Emails</span>
          <Switch />
        </div>
      </div>
    </Card>
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">{t('menu.systemSetting')}</h1>
      <Card>
        <Tabs
          items={[
            { key: 'general', label: 'General', children: generalSettings },
            { key: 'security', label: 'Security', children: securitySettings },
            { key: 'notification', label: 'Notification', children: notificationSettings },
          ]}
        />
      </Card>
    </div>
  );
};

export default SystemSetting;
