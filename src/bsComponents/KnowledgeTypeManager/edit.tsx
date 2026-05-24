import { type FC } from 'react';
import { Button, Row, Col } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { DrawerContainer } from '@/components/Drawer';
import { ProCard, ProForm, ProFormSelect, ProFormText, ProFormCheckbox, ProFormTextArea } from '@ant-design/pro-components';

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
          <ProFormSelect
            label="Parent"
            name="parent"
          />
          <ProFormText
            label="Name"
            name="name"
          />
          <Row gutter={16}>
            <Col span={16}>
              <ProFormText
                label="Code"
                name="code"
              />
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