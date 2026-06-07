/**
 * 源节点出口：「+」按钮与 source Handle 组合。
 * 点击按钮打开节点面板，Handle 用于手动拖拽连线。
 */
import type { FC, MouseEvent } from 'react';
import { memo, useCallback } from 'react';
import { PlusOutlined } from '@/components/BaseIcons';
import { Handle, Position, useNodeId } from '@xyflow/react';

import { useFlowCanvasContext } from '../context';
import styles from '../styles.module.less';

const SourceHandle: FC = () => {
  const nodeId = useNodeId();
  const { openNodePalette } = useFlowCanvasContext();

  const handleClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    // 阻止事件冒泡，避免触发画布选区变更或面板关闭
    event.stopPropagation();
    event.preventDefault();

    if (!nodeId) {
      return;
    }

    openNodePalette(nodeId, {
      x: event.clientX,
      y: event.clientY,
    });
  }, [nodeId, openNodePalette]);

  return (
    <div className={styles.source_handle_wrap}>
      <button
        type="button"
        className={styles.source_handle_btn}
        aria-label="Add node"
        onClick={handleClick}
        onPointerDown={(event) => event.stopPropagation()}
      >
        <PlusOutlined className={styles.source_handle_icon} />
      </button>
      <Handle
        type="source"
        position={Position.Right}
        className={styles.source_handle_point}
        isConnectable
      />
    </div>
  );
};

export default memo(SourceHandle);
