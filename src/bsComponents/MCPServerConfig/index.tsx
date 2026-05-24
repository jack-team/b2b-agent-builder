import type { FC } from 'react';
import { Button, Space, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {
  ProForm,
  ProCard,
  ProFormSelect,
  ProFormText,
  ProFormUploadDragger,
  ProFormCheckbox,
  ProFormList
} from '@ant-design/pro-components';

import Drawer from '@/components/Drawer';
import { DrawerContainer } from '@/components/Drawer';
import AvailableTools from '../AvailableTools';

interface MCPServerConfigProps {
  onClose?: () => void;
}

const MCPServerConfig: FC<MCPServerConfigProps> = ({ onClose }) => {
  return (
    <DrawerContainer
      title="MCP Server Configuration"
      extra={
        <Space size={16}>
          <Drawer size="medium" trigger={<Button type="primary">Next</Button>}>
            <AvailableTools />
          </Drawer>
        </Space>
      }
      onClose={onClose}
    >
      <ProCard size="small">
        <ProForm submitter={false}>
          <ProFormText
            name="mcp_server_name"
            label="MCP server name"
            initialValue="Production"
          />
          <Row gutter={16}>
            <Col span={12}>
              <ProFormCheckbox
                name="status"
                label="Status"
                initialValue="enable"
              >
                Enable
              </ProFormCheckbox>
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
          <div className="gay-box mt-[16px]">
            <ProCard size="small" title="Standard Input/Output">
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
              <ProFormList
                name="arguments"
                label="Arguments"
                creatorButtonProps={{
                  type: 'link',
                  icon: <PlusOutlined />,
                  creatorButtonText: 'Add new argument',
                }}
              >
                <ProFormText
                  name="argument"
                  initialValue="-m y -s"
                  className="w-full"
                />
              </ProFormList>
            </ProCard>
          </div>
          <div className="gay-box mt-[16px]">
            <ProCard  size="small" title="Internalizable Connection" >
              <ProFormUploadDragger
                name="internalizable_source_package"
                label="Internalizable Source package"
                fieldProps={{
                  maxCount: 1,
                }}
              />
              <ProFormList
                initialValue={[{}]}
                name="internalizable_source_package1"
                label="Internalizable Source package"
                creatorButtonProps={{
                  type: 'link',
                  icon: <PlusOutlined />,
                  creatorButtonText: 'Add new variable',
                }}
              >
                <Row gutter={16}>
                  <Col span={12}>
                    <ProFormText
                      name="package_name"
                      placeholder="Package name"
                    />
                  </Col>
                  <Col span={12}>
                    <ProFormText
                      name="class_name"
                      placeholder="Class name"
                    />
                  </Col>
                </Row>
              </ProFormList>
              <ProFormText
                name="url_internal"
                label="URL"
              />
              <ProFormText
                name="authorization_token_internal"
                label="Authorization token"
              />
            </ProCard>
          </div>
          <div className="gay-box mt-[16px]">
            <ProCard size="small"title="Remote Connection">
              <ProFormText
                name="url_remote"
                label="URL"
              />
              <ProFormText
                name="authorization_token_remote"
                label="Authorization token"
              />
            </ProCard>
          </div>
          <div className="mt-[16px]">
            <ProFormList
              name="environment_variables"
              label="Environment variables"
              creatorButtonProps={{
                type: 'link',
                icon: <PlusOutlined />,
                creatorButtonText: 'Add new variable',
              }}
            >
              <Row gutter={16}>
                <Col span={12}>
                  <ProFormText
                    name="variable_name"
                    placeholder="Variable name"
                  />
                </Col>
                <Col span={12}>
                  <ProFormText
                    name="variable_value"
                    placeholder="Value"
                  />
                </Col>
              </Row>
            </ProFormList>
          </div>
        </ProForm>
      </ProCard>
    </DrawerContainer>
  );
};

export default MCPServerConfig;
