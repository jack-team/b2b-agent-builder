import type { OrchestrationFlowEdge, OrchestrationFlowNode } from './types';

/** 从源节点向右插入新节点时的水平间距 */
export const NODE_HORIZONTAL_GAP = 240;

/** ReactFlow nodeTypes 注册键，与 nodes/index.tsx 中的组件一一对应 */
export const FLOW_NODE_TYPES = {
  start: 'start',
  end: 'end',
  logic: 'logic',
  agent: 'agent',
} as const;

export const initialNodes: OrchestrationFlowNode[] = [
  {
    id: 'start',
    type: FLOW_NODE_TYPES.start,
    position: { x: 280, y: 160 },
    data: {
      label: 'Start',
      nodeType: 'start',
      category: 'start',
      variables: [],
    },
  },
  {
    id: 'end',
    type: FLOW_NODE_TYPES.end,
    position: { x: 720, y: 160 },
    data: {
      label: 'End',
      nodeType: 'end',
      category: 'end',
    },
  },
];

export const initialEdges: OrchestrationFlowEdge[] = [];

export const logicPaletteItems = [
  { nodeType: 'branch' as const, category: 'logic' as const, labelKey: 'orchestrationFlowEditor.palette.branch' },
  { nodeType: 'loop' as const, category: 'logic' as const, labelKey: 'orchestrationFlowEditor.palette.loop' },
  { nodeType: 'batch' as const, category: 'logic' as const, labelKey: 'orchestrationFlowEditor.palette.batch' },
];

export const agentPaletteItems = [
  { nodeType: 'shipping' as const, category: 'agent' as const, labelKey: 'orchestrationFlowEditor.palette.shipping' },
  { nodeType: 'product' as const, category: 'agent' as const, labelKey: 'orchestrationFlowEditor.palette.product' },
  { nodeType: 'price' as const, category: 'agent' as const, labelKey: 'orchestrationFlowEditor.palette.price' },
  { nodeType: 'order' as const, category: 'agent' as const, labelKey: 'orchestrationFlowEditor.palette.order' },
  { nodeType: 'inventory' as const, category: 'agent' as const, labelKey: 'orchestrationFlowEditor.palette.inventory' },
];

export const variableTypeOptions = [
  { value: 'string', labelKey: 'orchestrationFlowEditor.variableTypes.string' },
  { value: 'number', labelKey: 'orchestrationFlowEditor.variableTypes.number' },
  { value: 'boolean', labelKey: 'orchestrationFlowEditor.variableTypes.boolean' },
  { value: 'object', labelKey: 'orchestrationFlowEditor.variableTypes.object' },
] as const;
