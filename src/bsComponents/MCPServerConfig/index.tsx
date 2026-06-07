import type { FC } from 'react';
import { useMemo } from 'react';
import { Button, Space, Row, Col } from 'antd';
import { PlusOutlined } from '@/components/BaseIcons';
import {
  ProForm,
  ProCard,
  ProFormSelect,
  ProFormText,
  ProFormUploadDragger,
  ProFormCheckbox,
  ProFormList
} from '@ant-design/pro-components';
import { useTranslation } from 'react-i18next';

import Drawer from '@/components/Drawer';
import { DrawerContainer } from '@/components/Drawer';
import AvailableTools from '../AvailableTools';

interface MCPServerConfigProps {
  onClose?: () => void;
}

const MCPServerConfig: FC<MCPServerConfigProps> = ({ onClose }) => {
  const { t } = useTranslation();

  const transportOptions = useMemo(() => [
    { value: 'stdio', label: t('mcp.transportStdio') },
    { value: 'http', label: t('mcp.transportHttp') },
    { value: 'websocket', label: t('mcp.transportWebsocket') },
  ], [t]);

  return (
    <DrawerContainer
      title={t('mcp.serverConfiguration')}
      extra={
        <Space size={16}>
          <Drawer size="medium" trigger={<Button type="primary">{t('common.next')}</Button>}>
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
            label={t('mcp.serverName')}
            initialValue="Production"
          />
          <Row gutter={16}>
            <Col span={12}>
              <ProFormCheckbox
                name="status"
                label={t('common.status')}
                initialValue="enable"
              >
                {t('common.enable')}
              </ProFormCheckbox>
            </Col>
            <Col span={12}>
              <ProFormText
                name="timeout"
                label={t('mcp.timeoutMs')}
                initialValue="30000"
              />
            </Col>
          </Row>
          <ProFormSelect
            name="transport"
            label={t('mcp.transport')}
            initialValue="stdio"
            options={transportOptions}
          />
          <div className="gay-box mt-[16px]">
            <ProCard size="small" title={t('mcp.standardInputOutput')}>
              <Row gutter={16}>
                <Col span={12}>
                  <ProFormText
                    name="command"
                    label={t('mcp.command')}
                    initialValue="python"
                  />
                </Col>
                <Col span={12}>
                  <ProFormText
                    name="working_directory"
                    label={t('mcp.workingDirectory')}
                    initialValue="/opt/workspace"
                  />
                </Col>
              </Row>
              <ProFormList
                name="arguments"
                label={t('mcp.arguments')}
                creatorButtonProps={{
                  type: 'link',
                  icon: <PlusOutlined />,
                  creatorButtonText: t('mcp.addNewArgument'),
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
            <ProCard size="small" title={t('mcp.internalizableConnection')}>
              <ProFormUploadDragger
                name="internalizable_source_package"
                label={t('mcp.internalizableSourcePackage')}
                fieldProps={{
                  maxCount: 1,
                }}
              />
              <ProFormList
                initialValue={[{}]}
                name="internalizable_source_package1"
                label={t('mcp.internalizableSourcePackage')}
                creatorButtonProps={{
                  type: 'link',
                  icon: <PlusOutlined />,
                  creatorButtonText: t('mcp.addNewVariable'),
                }}
              >
                <Row gutter={16}>
                  <Col span={12}>
                    <ProFormText
                      name="package_name"
                      placeholder={t('mcp.packageName')}
                    />
                  </Col>
                  <Col span={12}>
                    <ProFormText
                      name="class_name"
                      placeholder={t('mcp.className')}
                    />
                  </Col>
                </Row>
              </ProFormList>
              <ProFormText
                name="url_internal"
                label={t('mcp.url')}
              />
              <ProFormText
                name="authorization_token_internal"
                label={t('mcp.authorizationToken')}
              />
            </ProCard>
          </div>
          <div className="gay-box mt-[16px]">
            <ProCard size="small" title={t('mcp.remoteConnection')}>
              <ProFormText
                name="url_remote"
                label={t('mcp.url')}
              />
              <ProFormText
                name="authorization_token_remote"
                label={t('mcp.authorizationToken')}
              />
            </ProCard>
          </div>
          <div className="mt-[16px]">
            <ProFormList
              name="environment_variables"
              label={t('mcp.environmentVariables')}
              creatorButtonProps={{
                type: 'link',
                icon: <PlusOutlined />,
                creatorButtonText: t('mcp.addNewVariable'),
              }}
            >
              <Row gutter={16}>
                <Col span={12}>
                  <ProFormText
                    name="variable_name"
                    placeholder={t('mcp.variableName')}
                  />
                </Col>
                <Col span={12}>
                  <ProFormText
                    name="variable_value"
                    placeholder={t('common.value')}
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
