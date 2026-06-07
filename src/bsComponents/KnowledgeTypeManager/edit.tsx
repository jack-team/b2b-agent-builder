import { type FC } from 'react';
import { Button, Row, Col, Space, Input } from 'antd';
import { SaveOutlined } from '@/components/BaseIcons';
import { useTranslation } from 'react-i18next';
import { DrawerContainer } from '@/components/Drawer';
import KnowledgeTypeSelect from '../KnowledgeTypeSelect';

import {
  ProCard,
  ProForm,
  ProFormText,
  ProFormCheckbox,
  ProFormTextArea
} from '@ant-design/pro-components';

const KnowledgeTypeEdit: FC = () => {
  const { t } = useTranslation();

  return (
    <DrawerContainer
      title={t('knowledgeType.title')}
      extra={
        <Button
          type="primary"
          icon={<SaveOutlined />}
        >
          {t('common.save')}
        </Button>
      }
    >
      <ProForm submitter={false}>
        <ProCard>
          <KnowledgeTypeSelect
            label={t('knowledgeType.parent')}
            name="parent"
            rules={[{ required: true }]}
          />
          <ProFormText
            label={t('common.name')}
            name="name"
            rules={[{ required: true }]}
          />
          <Row gutter={16}>
            <Col span={16}>
              <ProForm.Item
                label={t('knowledgeType.columns.code')}
                name="code"
                rules={[{ required: true }]}
              >
                <Space.Compact className="w-full">
                  <Input readOnly placeholder={t('common.pleaseEnter')} />
                  <Button type="primary">{t('common.generate')}</Button>
                </Space.Compact>
              </ProForm.Item>
            </Col>
            <Col span={8}>
              <ProFormCheckbox
                name="status"
                label={t('common.status')}
              >
                {t('common.enable')}
              </ProFormCheckbox>
            </Col>
          </Row>
          <ProFormTextArea
            name="desc"
            label={t('common.description')}
          />
        </ProCard>
      </ProForm>
    </DrawerContainer>
  );
}

export default KnowledgeTypeEdit;
