import type { Edge, Node } from '@xyflow/react';

/** 节点业务分类，决定 ReactFlow 渲染组件与面板分组 */
export type FlowNodeCategory = 'start' | 'end' | 'logic' | 'agent';

export type LogicNodeType = 'branch' | 'loop' | 'batch';

export type AgentNodeType = 'shipping' | 'product' | 'price' | 'order' | 'inventory';

/** 具体节点类型，区分同一 category 下的不同逻辑/Agent 节点 */
export type FlowNodeType = 'start' | 'end' | LogicNodeType | AgentNodeType;

export type VariableType = 'string' | 'number' | 'boolean' | 'object';

export interface CustomVariable {
  id: string;
  name: string;
  type: VariableType;
  description: string;
}

/** 节点挂载的业务数据；category 映射 ReactFlow type，nodeType 标识具体业务类型 */
export interface FlowNodeData extends Record<string, unknown> {
  label: string;
  nodeType: FlowNodeType;
  category: FlowNodeCategory;
  /** 仅 Start 节点使用，定义流程入参变量 */
  variables?: CustomVariable[];
}

export type OrchestrationFlowNode = Node<FlowNodeData>;

export type OrchestrationFlowEdge = Edge;

export type CanvasViewMode = 'workflow' | 'chat';

export interface PaletteSelectPayload {
  nodeType: FlowNodeType;
  category: FlowNodeCategory;
  label: string;
}

export interface NodePaletteState {
  sourceNodeId: string;
  anchor: { x: number; y: number };
}

export interface OrchestrationFlowEditorRecord {
  key: string;
  name: string;
  description?: string;
}

export interface OrchestrationFlowEditorProps {
  record?: OrchestrationFlowEditorRecord;
  title?: string;
  initialFlowNodes?: OrchestrationFlowNode[];
  initialFlowEdges?: OrchestrationFlowEdge[];
  onClose?: () => void;
  onBack?: () => void;
  onSave?: (nodes: OrchestrationFlowNode[], edges: OrchestrationFlowEdge[]) => void;
  onRun?: () => void;
}
