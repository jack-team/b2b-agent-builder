import type { FC } from 'react';
import { useMemo } from 'react';
import { Button } from 'antd';
import { SaveOutlined } from '@/components/BaseIcons';
import dayjs from 'dayjs';
import {
  ProCard,
  ProForm,
  ProFormDateTimePicker,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { useTranslation } from 'react-i18next';
import { DrawerContainer } from '@/components/Drawer';

const MCPToolConfig: FC = () => {
  const { t } = useTranslation();

  const statusOptions = useMemo(() => [
    { value: 'enabled', label: t('common.enabled') },
    { value: 'disabled', label: t('common.disabled') },
  ], [t]);

  return (
    <DrawerContainer
      title={t('mcp.toolContext')}
      extra={
        <Button type="primary" icon={<SaveOutlined />}>
          {t('common.save')}
        </Button>
      }
    >
      <ProForm submitter={false}>
        <ProCard>
          <ProFormText
            name="name"
            label={t('common.name')}
          />
          <ProFormTextArea
            name="description"
            label={t('common.description')}
          />
          <ProFormSelect
            name="status"
            label={t('common.status')}
            initialValue="enabled"
            options={statusOptions}
          />
          <ProFormDateTimePicker
            disabled
            name="updatedAt"
            label={t('llmPage.columnsUpdatedAt')}
            initialValue={dayjs('2026-04-08 15:02:51')}
            fieldProps={{
              format: 'DD/MM/YYYY HH:mm:ss',
              style: { width: '100%' },
            }}
          />
          <ProFormDateTimePicker
            disabled
            name="createdAt"
            label={t('llmPage.columnsCreatedAt')}
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
