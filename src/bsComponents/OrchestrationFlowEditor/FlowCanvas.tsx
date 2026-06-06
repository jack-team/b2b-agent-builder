/**
 * 流程画布核心组件。
 * 负责节点/边的状态管理、选区联动、节点面板与属性面板的协调。
 */
import type { FC } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Background,
  BackgroundVariant,
  ConnectionLineType,
  MarkerType,
  Panel,
  ReactFlow,
  addEdge,
  useEdgesState,
  useNodesState,
  useOnSelectionChange,
  useReactFlow,
} from '@xyflow/react';
import type { Connection, OnSelectionChangeParams } from '@xyflow/react';
import { useMemoizedFn } from 'ahooks';
import { v4 as uuidv4 } from 'uuid';

import CanvasToolbar from './CanvasToolbar';
import NodePalette from './NodePalette';
import PropertiesPanel from './PropertiesPanel';
import { FlowCanvasContext } from './context';
import {
  FLOW_NODE_TYPES,
  NODE_HORIZONTAL_GAP,
  initialEdges,
  initialNodes,
} from './constants';
import { flowNodeTypes } from './nodes';
import type {
  CanvasViewMode,
  FlowNodeData,
  NodePaletteState,
  OrchestrationFlowEdge,
  OrchestrationFlowNode,
  PaletteSelectPayload,
} from './types';
import styles from './styles.module.less';

import '@xyflow/react/dist/style.css';

interface FlowCanvasProps {
  initialFlowNodes?: OrchestrationFlowNode[];
  initialFlowEdges?: OrchestrationFlowEdge[];
  onFlowChange?: (nodes: OrchestrationFlowNode[], edges: OrchestrationFlowEdge[]) => void;
}

// ReactFlow 的 type 决定渲染哪个节点组件；logic/agent 共用组件，start/end 各自独立
const getFlowNodeType = (category: FlowNodeData['category']) => {
  if (category === 'logic') {
    return FLOW_NODE_TYPES.logic;
  }

  if (category === 'agent') {
    return FLOW_NODE_TYPES.agent;
  }

  return category;
};

const FlowCanvas: FC<FlowCanvasProps> = ({
  initialFlowNodes = initialNodes,
  initialFlowEdges = initialEdges,
  onFlowChange,
}) => {
  const { getNode } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialFlowNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialFlowEdges);
  // 默认选中 Start 节点，使属性面板在初次进入时即展示自定义变量配置
  const [selectedNode, setSelectedNode] = useState<OrchestrationFlowNode | null>(
    () => initialFlowNodes.find((node) => node.data.nodeType === 'start') ?? null,
  );
  const [viewMode, setViewMode] = useState<CanvasViewMode>('workflow');
  const [paletteState, setPaletteState] = useState<NodePaletteState | null>(null);

  // 同步 ReactFlow 内部选中态，与 selectedNode 保持一致
  useEffect(() => {
    setNodes((currentNodes) => currentNodes.map((node) => ({
      ...node,
      selected: node.data.nodeType === 'start',
    })));
  }, [setNodes]);

  const defaultEdgeOptions = useMemo(
    () => ({
      type: 'smoothstep' as const,
      markerEnd: { type: MarkerType.ArrowClosed, width: 16, height: 16 },
      style: { stroke: '#94A3B8', strokeWidth: 2 },
    }),
    [],
  );

  const notifyFlowChange = useMemoizedFn((
    nextNodes: OrchestrationFlowNode[],
    nextEdges: OrchestrationFlowEdge[],
  ) => {
    onFlowChange?.(nextNodes, nextEdges);
  });

  const onConnect = useCallback((connection: Connection) => {
    setEdges((currentEdges) => {
      const nextEdges = addEdge(connection, currentEdges);
      notifyFlowChange(nodes, nextEdges);
      return nextEdges;
    });
  }, [nodes, notifyFlowChange, setEdges]);

  const onSelectionChange = useMemoizedFn(({ nodes: selectedNodes }: OnSelectionChangeParams) => {
    const nextSelectedNode = selectedNodes.length === 1
      ? selectedNodes[0] as OrchestrationFlowNode
      : null;
    setSelectedNode(nextSelectedNode);
  });

  useOnSelectionChange({ onChange: onSelectionChange });

  const openNodePalette = useMemoizedFn((sourceNodeId: string, anchor: NodePaletteState['anchor']) => {
    setPaletteState({ sourceNodeId, anchor });
  });

  const closeNodePalette = useMemoizedFn(() => {
    setPaletteState(null);
  });

  // 从节点面板选中类型后，在源节点右侧插入新节点并自动连线
  const handlePaletteSelect = useMemoizedFn((payload: PaletteSelectPayload) => {
    if (!paletteState) {
      return;
    }

    const sourceNode = getNode(paletteState.sourceNodeId);
    if (!sourceNode) {
      closeNodePalette();
      return;
    }

    const newNodeId = uuidv4();
    const newNode: OrchestrationFlowNode = {
      id: newNodeId,
      type: getFlowNodeType(payload.category),
      position: {
        x: sourceNode.position.x + NODE_HORIZONTAL_GAP,
        y: sourceNode.position.y,
      },
      data: {
        label: payload.label,
        nodeType: payload.nodeType,
        category: payload.category,
      },
    };

    const newEdge: OrchestrationFlowEdge = {
      id: `edge-${paletteState.sourceNodeId}-${newNodeId}`,
      source: paletteState.sourceNodeId,
      target: newNodeId,
    };

    const nextNodes = nodes.concat(newNode);
    const nextEdges = addEdge(newEdge, edges);

    setNodes(nextNodes);
    setEdges(nextEdges);
    notifyFlowChange(nextNodes, nextEdges);
    closeNodePalette();
  });

  const handleUpdateNode = useMemoizedFn((nodeId: string, data: Partial<FlowNodeData>) => {
    setNodes((currentNodes) => {
      const nextNodes = currentNodes.map((node) => (
        node.id === nodeId
          ? { ...node, data: { ...node.data, ...data } }
          : node
      ));
      notifyFlowChange(nextNodes, edges);
      return nextNodes;
    });

    setSelectedNode((currentNode) => (
      currentNode?.id === nodeId
        ? { ...currentNode, data: { ...currentNode.data, ...data } }
        : currentNode
    ));
  });

  const handleCloseProperties = useMemoizedFn(() => {
    setSelectedNode(null);
    setNodes((currentNodes) => currentNodes.map((node) => ({ ...node, selected: false })));
  });

  const handlePaneClick = useMemoizedFn(() => {
    closeNodePalette();
  });

  // 向节点子组件（SourceHandle）暴露打开面板的能力，避免 prop drilling
  const flowCanvasContextValue = useMemo(
    () => ({ openNodePalette }),
    [openNodePalette],
  );

  return (
    <FlowCanvasContext.Provider value={flowCanvasContextValue}>
      <div className={styles.canvas_layout}>
        <div className={styles.canvas_wrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={flowNodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onPaneClick={handlePaneClick}
            defaultEdgeOptions={defaultEdgeOptions}
            connectionLineType={ConnectionLineType.SmoothStep}
            fitView
            fitViewOptions={{ padding: 0.2 }}
            proOptions={{ hideAttribution: true }}
            className={styles.react_flow}
          >
            <Background
              variant={BackgroundVariant.Dots}
              gap={20}
              size={1}
              color="#D1D5DB"
            />

            <Panel position="bottom-left" className={styles.toolbar_panel}>
              <CanvasToolbar
                viewMode={viewMode}
                onViewModeChange={setViewMode}
              />
            </Panel>
          </ReactFlow>
        </div>

        {paletteState ? (
          <NodePalette
            anchor={paletteState.anchor}
            onSelect={handlePaletteSelect}
            onClose={closeNodePalette}
          />
        ) : null}

        {selectedNode ? (
          <PropertiesPanel
            selectedNode={selectedNode}
            onClose={handleCloseProperties}
            onUpdateNode={handleUpdateNode}
          />
        ) : null}
      </div>
    </FlowCanvasContext.Provider>
  );
};

export default FlowCanvas;
