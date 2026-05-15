import type { FC } from 'react';
import { Button, Space, Row, Col, Card } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { ProForm, ProCard, ProFormSelect, ProFormText, ProFormUploadDragger, ProFormTextArea } from '@ant-design/pro-components';
import { DrawerContainer } from '@/components/Drawer';

interface MCPServerConfigProps {
  onClose?: () => void;
}

const MCPServerConfig: FC<MCPServerConfigProps> = ({ onClose }) => {
  return (
    <DrawerContainer
      title="MCP Server Configuration"
      extra={
        <Space size={16}>
          <Button type="primary">Next</Button>
        </Space>
      }
      onClose={onClose}
    >
      <Card>
              <ProForm submitter={false}>
        <ProFormText
          name="mcp_server_name"
          label="MCP server name"
          initialValue="Production"
        />

        <Row gutter={16}>
          <Col span={12}>
            <ProFormSelect
              name="status"
              label="Status"
              initialValue="enable"
              options={[
                { value: 'enable', label: 'Enable' },
                { value: 'disable', label: 'Disable' },
              ]}
            />
          </Col>
          <Col span={12}>
            <ProFormText
              name="timeout"
              label="Timeout (ms)"
              initialValue="30000"
            />
          </Col>
        </Row>

        <ProFormSelect
          name="transport"
          label="Transport"
          initialValue="stdio"
          options={[
            { value: 'stdio', label: 'Stdio' },
            { value: 'http', label: 'HTTP' },
            { value: 'websocket', label: 'Websocket' },
          ]}
        />

        <ProCard title="Standard Input/Output" className="mt-[24px]">
          <Row gutter={16}>
            <Col span={12}>
              <ProFormText
                name="command"
                label="Command"
                initialValue="python"
              />
            </Col>
            <Col span={12}>
              <ProFormText
                name="working_directory"
                label="Working directory"
                initialValue="/opt/workspace"
              />
            </Col>
          </Row>
          <ProForm.Item
            name="arguments"
            label="Arguments"
            fieldProps={{
              rows: 4,
            }}
          >
            <ProFormTextArea
              initialValue="python /opt/workspace -m y -s\n-s"
            />
          </ProForm.Item>
          <Button type="link" icon={<PlusOutlined />}>
            + Add argument
          </Button>
        </ProCard>

        <ProCard title="Internalizable Connection" className="mt-[24px]">
          <ProFormUploadDragger
            name="internalizable_source_package"
            label="Internalizable Source package"
            fieldProps={{
              maxCount: 1,
            }}
          />
          <Row gutter={16}>
            <Col span={12}>
              <ProFormText
                name="package_name"
                label="Package name"
              />
            </Col>
            <Col span={12}>
              <ProFormText
                name="class_name"
                label="Class name"
              />
            </Col>
          </Row>
          <Button type="link" icon={<PlusOutlined />}>
            + Add new variable
          </Button>
          <ProFormText
            name="url_internal"
            label="URL"
          />
          <ProFormText
            name="authorization_token_internal"
            label="Authorization token"
          />
        </ProCard>

        <ProCard title="Remote Connection" className="mt-[24px]">
          <ProFormText
            name="url_remote"
            label="URL"
          />
          <ProFormText
            name="authorization_token_remote"
            label="Authorization token"
          />
        </ProCard>

        <ProCard title="Environment variable" className="mt-[24px]">
          <Row gutter={16}>
            <Col span={10}>
              <ProFormText
                name="variable_name"
                label="Variable name"
              />
            </Col>
            <Col span={10}>
              <ProFormText
                name="variable_value"
                label="Value"
              />
            </Col>
            <Col span={4}>
              <Button danger icon={<MinusCircleOutlined />} />
            </Col>
          </Row>
          <Button type="link" icon={<PlusOutlined />}>
            + Add new variable
          </Button>
        </ProCard>
      </ProForm>
      </Card>

    </DrawerContainer>
  );
};

export default MCPServerConfig;
