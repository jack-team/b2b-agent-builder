import type { FC } from 'react';
import { Button } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import {
  ProCard,
  ProForm,
  ProFormDateTimePicker,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { DrawerContainer } from '@/components/Drawer';

const MCPToolConfig: FC = () => {
  return (
    <DrawerContainer
      title="MCP Tool Context"
      extra={
        <Button type="primary" icon={<SaveOutlined />}>
          Save
        </Button>
      }
    >
      <ProForm submitter={false}>
        <ProCard>
          <ProFormText
            name="name"
            label="Name"
          />
          <ProFormTextArea
            name="description"
            label="Description"
          />
          <ProFormSelect
            name="status"
            label="Status"
            initialValue="enabled"
            options={[
              { value: 'enabled', label: 'Enabled' },
              { value: 'disabled', label: 'Disabled' },
            ]}
          />
          <ProFormDateTimePicker
            disabled
            name="updatedAt"
            label="Updated At"
            initialValue={dayjs('2026-04-08 15:02:51')}
            fieldProps={{
              format: 'DD/MM/YYYY HH:mm:ss',
              style: { width: '100%' },
            }}
          />
          <ProFormDateTimePicker
            disabled
            name="createdAt"
            label="Created At"
            initialValue={dayjs('2026-04-08 14:37:19')}
            fieldProps={{
              format: 'DD/MM/YYYY HH:mm:ss',
              style: { width: '100%' },
            }}
          />
        </ProCard>
      </ProForm>
    </DrawerContainer>
  );
};

export default MCPToolConfig;
