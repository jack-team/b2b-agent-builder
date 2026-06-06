/**
 * 右侧属性面板：展示当前选中节点的可编辑属性。
 * 目前仅 Start 节点支持自定义变量配置，其余节点显示占位提示。
 */
import type { FC } from 'react';
import { useMemo } from 'react';
import {
  CloseOutlined,
  DeleteOutlined,
  PlaySquareOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Button, Input, Select, Typography } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';

import { variableTypeOptions } from './constants';
import type { CustomVariable, FlowNodeData, OrchestrationFlowNode } from './types';
import styles from './styles.module.less';

interface PropertiesPanelProps {
  selectedNode: OrchestrationFlowNode | null;
  onClose: () => void;
  onUpdateNode: (nodeId: string, data: Partial<FlowNodeData>) => void;
}

const createEmptyVariable = (): CustomVariable => ({
  id: uuidv4(),
  name: '',
  type: 'string',
  description: '',
});

const PropertiesPanel: FC<PropertiesPanelProps> = ({
  selectedNode,
  onClose,
  onUpdateNode,
}) => {
  const { t } = useTranslation();

  const variables = useMemo(
    () => selectedNode?.data.variables ?? [],
    [selectedNode?.data.variables],
  );

  const variableTypeSelectOptions = useMemo(
    () => variableTypeOptions.map((option) => ({
      value: option.value,
      label: t(option.labelKey),
    })),
    [t],
  );

  const handleVariableChange = useMemoizedFn((
    variableId: string,
    field: keyof CustomVariable,
    value: string,
  ) => {
    if (!selectedNode) {
      return;
    }

    const nextVariables = variables.map((variable) => (
      variable.id === variableId
        ? { ...variable, [field]: value }
        : variable
    ));

    onUpdateNode(selectedNode.id, { variables: nextVariables });
  });

  const handleAddVariable = useMemoizedFn(() => {
    if (!selectedNode) {
      return;
    }

    onUpdateNode(selectedNode.id, {
      variables: [...variables, createEmptyVariable()],
    });
  });

  const handleRemoveVariable = useMemoizedFn((variableId: string) => {
    if (!selectedNode) {
      return;
    }

    onUpdateNode(selectedNode.id, {
      variables: variables.filter((variable) => variable.id !== variableId),
    });
  });

  if (!selectedNode) {
    return null;
  }

  const isStartNode = selectedNode.data.nodeType === 'start';

  return (
    <aside className={styles.properties}>
      <div className={styles.properties_header}>
        <div className={styles.properties_title_group}>
          <span className={styles.properties_node_icon}>
            <PlaySquareOutlined />
          </span>
          <Typography.Text className={styles.properties_title}>
            {selectedNode.data.label}
          </Typography.Text>
        </div>
        <Button
          type="text"
          size="small"
          icon={<CloseOutlined />}
          onClick={onClose}
        />
      </div>

      {isStartNode ? (
        <section className={styles.properties_section}>
          <Typography.Text className={styles.properties_section_title}>
            {t('orchestrationFlowEditor.customVariables')}
          </Typography.Text>

          <div className={styles.variable_table}>
            <div className={styles.variable_table_header}>
              <span>{t('orchestrationFlowEditor.variable')}</span>
              <span>{t('orchestrationFlowEditor.type')}</span>
              <span>{t('common.description')}</span>
              <span />
            </div>

            {variables.map((variable) => (
              <div key={variable.id} className={styles.variable_row}>
                <Input
                  value={variable.name}
                  placeholder={t('orchestrationFlowEditor.variable')}
                  onChange={(event) => handleVariableChange(
                    variable.id,
                    'name',
                    event.target.value,
                  )}
                />
                <Select
                  value={variable.type}
                  options={variableTypeSelectOptions}
                  onChange={(value) => handleVariableChange(variable.id, 'type', value)}
                />
                <Input
                  value={variable.description}
                  placeholder={t('common.description')}
                  onChange={(event) => handleVariableChange(
                    variable.id,
                    'description',
                    event.target.value,
                  )}
                />
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleRemoveVariable(variable.id)}
                />
              </div>
            ))}
          </div>

          <Button
            type="link"
            icon={<PlusOutlined />}
            className={styles.add_variable_btn}
            onClick={handleAddVariable}
          >
            {t('orchestrationFlowEditor.addVariable')}
          </Button>
        </section>
      ) : (
        <section className={styles.properties_section}>
          <Typography.Paragraph type="secondary">
            {t('orchestrationFlowEditor.noProperties')}
          </Typography.Paragraph>
        </section>
      )}
    </aside>
  );
};

export default PropertiesPanel;
