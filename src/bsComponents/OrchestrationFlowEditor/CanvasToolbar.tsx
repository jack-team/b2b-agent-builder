/** 画布左下角工具栏：视图模式切换与缩放控制 */
import type { FC } from 'react';
import {
  ExpandOutlined,
  LockOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@/components/BaseIcons';
import { Button, Segmented, Tooltip } from 'antd';
import { useReactFlow, useStore } from '@xyflow/react';
import { useTranslation } from 'react-i18next';

import type { CanvasViewMode } from './types';
import styles from './styles.module.less';

interface CanvasToolbarProps {
  viewMode: CanvasViewMode;
  onViewModeChange: (mode: CanvasViewMode) => void;
}

const CanvasToolbar: FC<CanvasToolbarProps> = ({
  viewMode,
  onViewModeChange,
}) => {
  const { t } = useTranslation();
  const { zoomIn, zoomOut, fitView } = useReactFlow();
  // 读取 ReactFlow 交互状态，用于锁定按钮的视觉反馈（当前为只读指示）
  const isInteractive = useStore((store) => (
    store.nodesDraggable
    && store.nodesConnectable
    && store.elementsSelectable
  ));

  const viewModeOptions = [
    { label: t('orchestrationFlowEditor.viewMode.workflow'), value: 'workflow' as const },
    { label: t('orchestrationFlowEditor.viewMode.chat'), value: 'chat' as const },
  ];

  return (
    <div className={styles.canvas_toolbar}>
      <Segmented<CanvasViewMode>
        value={viewMode}
        options={viewModeOptions}
        onChange={onViewModeChange}
        className={styles.view_mode_switch}
      />

      <div className={styles.canvas_controls}>
        <Tooltip title={t('orchestrationFlowEditor.zoomIn')}>
          <Button
            type="text"
            icon={<ZoomInOutlined />}
            onClick={() => zoomIn({ duration: 200 })}
          />
        </Tooltip>
        <Tooltip title={t('orchestrationFlowEditor.zoomOut')}>
          <Button
            type="text"
            icon={<ZoomOutOutlined />}
            onClick={() => zoomOut({ duration: 200 })}
          />
        </Tooltip>
        <Tooltip title={t('orchestrationFlowEditor.fitView')}>
          <Button
            type="text"
            icon={<ExpandOutlined />}
            onClick={() => fitView({ padding: 0.2, duration: 200 })}
          />
        </Tooltip>
        <Tooltip title={t('orchestrationFlowEditor.interactive')}>
          <Button
            type="text"
            icon={<LockOutlined />}
            className={isInteractive ? styles.control_active : undefined}
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default CanvasToolbar;
