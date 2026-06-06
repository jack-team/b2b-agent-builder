/**
 * 编排流程编辑器入口组件。
 * 以 Drawer 形式承载画布，提供保存/运行操作，并将画布变更同步给外部。
 */
import type { FC } from 'react';
import { useMemo, useRef } from 'react';
import { message } from 'antd';
import { ReactFlowProvider } from '@xyflow/react';
import { useMemoizedFn } from 'ahooks';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { DrawerContainer } from '@/components/Drawer';
import { useDrawerClose } from '@/components/Drawer';
import { CaretRightOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import FlowCanvas from './FlowCanvas';
import { initialEdges, initialNodes } from './constants';
import type {
  OrchestrationFlowEdge,
  OrchestrationFlowEditorProps,
  OrchestrationFlowNode,
} from './types';
import styles from './styles.module.less';

const OrchestrationFlowEditor: FC<OrchestrationFlowEditorProps> = ({
  record,
  title,
  initialFlowNodes = initialNodes,
  initialFlowEdges = initialEdges,
  onClose,
  onBack,
  onSave,
  onRun,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const closeDrawer = useDrawerClose();

  // 用 ref 缓存最新画布快照，保存时直接读取，避免画布每次变更都触发本组件重渲染
  const flowSnapshotRef = useRef<{
    nodes: OrchestrationFlowNode[];
    edges: OrchestrationFlowEdge[];
  }>({
    nodes: initialFlowNodes,
    edges: initialFlowEdges,
  });

  const editorTitle = useMemo(
    () => title ?? record?.name ?? t('orchestrationFlowEditor.defaultTitle'),
    [record?.name, t, title],
  );

  const handleFlowChange = useMemoizedFn((
    nodes: OrchestrationFlowNode[],
    edges: OrchestrationFlowEdge[],
  ) => {
    flowSnapshotRef.current = { nodes, edges };
  });

  const handleBack = useMemoizedFn(() => {
    if (onBack) {
      onBack();
      return;
    }

    if (onClose) {
      onClose();
      return;
    }

    closeDrawer();
    navigate('/orchestrations');
  });

  const handleSave = useMemoizedFn(() => {
    const { nodes, edges } = flowSnapshotRef.current;
    onSave?.(nodes, edges);
    message.success(t('orchestrationFlowEditor.saveSuccess'));
  });

  const handleRun = useMemoizedFn(() => {
    onRun?.();
    message.info(t('orchestrationFlowEditor.runStarted'));
  });

  return (
    <DrawerContainer
      title={editorTitle}
      onClose={handleBack}
      extra={
        <Space>
          <Button
            icon={<CaretRightOutlined />}
            className={styles.header_run}
            onClick={handleRun}
          >
            {t('orchestrationFlowEditor.run')}
          </Button>
          <Button
            type="primary"
            icon={<SaveOutlined />}
            onClick={handleSave}
          >
            {t('common.save')}
          </Button>
        </Space>
      }
    >
      <div className={styles.editor}>
        {/* ReactFlowProvider 必须在 FlowCanvas 外层，为 useReactFlow 等 hook 提供上下文 */}
        <ReactFlowProvider>
          <FlowCanvas
            initialFlowNodes={initialFlowNodes}
            initialFlowEdges={initialFlowEdges}
            onFlowChange={handleFlowChange}
          />
        </ReactFlowProvider>
      </div>
    </DrawerContainer>
  );
};

export default OrchestrationFlowEditor;
