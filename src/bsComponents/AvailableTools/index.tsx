import type { FC } from 'react';
import { Button } from 'antd';
import { useSafeState, useUpdateEffect } from 'ahooks';
import { ProCard, ProForm, ProFormText, ProFormTextArea, ProFormCheckbox } from '@ant-design/pro-components';
import { SaveOutlined, SearchOutlined } from '@/components/BaseIcons';
import { useTranslation } from 'react-i18next';
import { DrawerContainer } from '@/components/Drawer';
import ToolItem from './tool';
import styles from './styles.module.less';

interface ToolType {
  key: string;
  name: string;
  description?: string;
}

const availableTools: ToolType[] = [
  { key: '1', name: 'CSV Parser', description: 'Parses CSV text into structured data (e.g., arrays or objects) for further processing.' },
  { key: '2', name: 'JSON Parser', description: 'Converts JSON strings into native objects/arrays for easy manipulation.' },
  { key: '3', name: 'XML Parser', description: 'Parses XML documents and extracts data into structured formats.' },
  { key: '4', name: 'YAML Parser', description: 'Parses YAML files into native data structures.' },
  { key: '5', name: 'Text File Parser', description: 'Reads and processes plain text files with various encoding support.' },
  { key: '6', name: 'INI Parser', description: 'Parses INI configuration files into key-value pairs.' },
  { key: '7', name: 'Excel Parser', description: 'Extracts data from Excel spreadsheets (XLS/XLSX).' },
];

const AvailableTools: FC = () => {
  const { t } = useTranslation();
  const [form] = ProForm.useForm();
  const [selectedTool, setSelectedTool] = useSafeState<ToolType>();
  const [tools] = useSafeState<ToolType[]>(availableTools);
  const toolValues = ProForm.useWatch(['tool'], form);

  useUpdateEffect(() => {
    if (selectedTool) {
      form.setFieldsValue({
        tool: selectedTool,
      });
    }
  }, [selectedTool]);

  useUpdateEffect(() => {
    if (toolValues) {

    }
  }, [toolValues]);

  return (
    <DrawerContainer
      title={t('mcp.availableTools')}
      extra={
        <Button type="primary" icon={<SaveOutlined />}>
          {t('common.save')}
        </Button>
      }
    >
      <ProForm form={form} submitter={false} className="h-full">
        <div className=" h-full flex gap-[16px] overflow-hidden">
          <div className="h-full w-[40%]">
            <ProCard title={t('common.tools')} size="small" className={styles.box}>
              <ProFormText
                name="keyword"
                fieldProps={{ prefix: <SearchOutlined /> }}
                placeholder={t('mcp.toolSearchPlaceholder')}
              />
              <div className={styles.tool_list}>
                <ProForm.Item>
                  <div className="flex flex-col gap-[8px]">
                    {tools.map(item => {
                      return (
                        <ToolItem
                          key={item.key}
                          title={item.name}
                          selected={item.key === selectedTool?.key}
                          onSelect={() => setSelectedTool(item)}
                        />
                      );
                    })}
                  </div>
                </ProForm.Item>
              </div>
            </ProCard>
          </div>
          <div className="h-full w-[60%]">
            <ProCard title={t('mcp.toolDetails')} size="small" className={styles.box}>
              {!selectedTool ? (
                <div className="flex items-center justify-center h-full">
                  {t('mcp.selectToolHint')}
                </div>
              ) : (
                <>
                  <ProFormText name={['tool', 'name']} label={t('common.name')} />
                  <ProFormTextArea name={['tool', 'description']} label={t('common.description')} />
                  <ProFormCheckbox name={['tool', 'status']} label={t('common.status')} />
                </>
              )}
            </ProCard>
          </div>
        </div>
      </ProForm>
    </DrawerContainer>
  );
};

export default AvailableTools;
