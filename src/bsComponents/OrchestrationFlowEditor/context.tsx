/**
 * 画布上下文：节点组件（如 SourceHandle）无法直接访问画布状态，
 * 通过 Context 触发「添加后续节点」面板的打开。
 */
import { createContext, useContext } from 'react';

/** 节点面板锚点，使用屏幕坐标定位浮层 */
export interface PaletteAnchor {
  x: number;
  y: number;
}

export interface FlowCanvasContextValue {
  openNodePalette: (sourceNodeId: string, anchor: PaletteAnchor) => void;
}

export const FlowCanvasContext = createContext<FlowCanvasContextValue | null>(null);

export const useFlowCanvasContext = () => {
  const context = useContext(FlowCanvasContext);

  if (!context) {
    throw new Error('useFlowCanvasContext must be used within FlowCanvasContext.Provider');
  }

  return context;
};
