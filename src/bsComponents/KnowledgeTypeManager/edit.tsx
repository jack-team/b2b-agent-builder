import { type FC } from 'react';
import { Button, Row, Col, Space, Input } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
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
  return (
    <DrawerContainer
      title="Knowledge type"
      extra={
        <Button
          type="primary"
          icon={<SaveOutlined />}
        >
          Save
        </Button>
      }
    >
      <ProForm submitter={false}>
        <ProCard>
          <KnowledgeTypeSelect
            label="Parent"
            name="parent"
            rules={[{ required: true }]}
          />
          <ProFormText
            label="Name"
            name="name"
            rules={[{ required: true }]}
          />
          <Row gutter={16}>
            <Col span={16}>
              <ProForm.Item
                label="Code"
                name="code"
                rules={[{ required: true }]}
              >
                <Space.Compact className="w-full">
                  <Input readOnly placeholder="Please enter" />
                  <Button type="primary">生成</Button>
                </Space.Compact>
              </ProForm.Item>
            </Col>
            <Col span={8}>
              <ProFormCheckbox
                name="status"
                label="Status"
              >
                Enable
              </ProFormCheckbox>
            </Col>
          </Row>
          <ProFormTextArea
            name="desc"
            label="Description"
          />
        </ProCard>
      </ProForm>
    </DrawerContainer>
  );
}

export default KnowledgeTypeEdit;