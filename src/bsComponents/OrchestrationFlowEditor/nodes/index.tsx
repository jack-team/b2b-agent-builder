/**
 * 流程节点组件集合。
 * 按 category 注册到 ReactFlow 的 nodeTypes，各节点通过 Handle 控制连入/连出。
 */
import type { FC } from 'react';
import { memo } from 'react';
import {
  AppstoreOutlined,
  EllipsisOutlined,
  PartitionOutlined,
  PlaySquareOutlined,
  RetweetOutlined,
  RobotOutlined,
  StopOutlined,
} from '@/components/BaseIcons';
import { Button, Dropdown } from 'antd';
import type { NodeProps } from '@xyflow/react';
import { Handle, Position } from '@xyflow/react';
import cls from 'classnames';

import SourceHandle from './SourceHandle';
import type { FlowNodeData, FlowNodeType } from '../types';
import styles from '../styles.module.less';

const nodeIconMap: Partial<Record<FlowNodeType, FC>> = {
  start: PlaySquareOutlined,
  end: StopOutlined,
  branch: PartitionOutlined,
  loop: RetweetOutlined,
  batch: AppstoreOutlined,
};

const getNodeIcon = (nodeType: FlowNodeType) => {
  if (nodeType in nodeIconMap) {
    const Icon = nodeIconMap[nodeType];
    return Icon ? <Icon /> : <RobotOutlined />;
  }

  return <RobotOutlined />;
};

interface FlowNodeShellProps {
  data: FlowNodeData;
  selected?: boolean;
  showSourceHandle?: boolean;
  showTargetHandle?: boolean;
  iconClassName?: string;
}

const FlowNodeShell: FC<FlowNodeShellProps> = ({
  data,
  selected,
  showSourceHandle,
  showTargetHandle,
  iconClassName,
}) => (
  <div className={cls(styles.flow_node, { [styles.flow_node_selected]: selected })}>
    {showTargetHandle ? (
      <Handle
        type="target"
        position={Position.Left}
        className={styles.handle_target}
      />
    ) : null}
    <div className={cls(styles.flow_node_icon, iconClassName)}>
      {getNodeIcon(data.nodeType)}
    </div>
    <span className={styles.flow_node_label}>{data.label}</span>
    <Dropdown
      menu={{ items: [] }}
      trigger={['click']}
    >
      <Button
        type="text"
        size="small"
        className={styles.flow_node_menu}
        icon={<EllipsisOutlined />}
        onClick={(event) => event.stopPropagation()}
      />
    </Dropdown>
    {showSourceHandle ? <SourceHandle /> : null}
  </div>
);

export const StartNode = memo(({ data, selected }: NodeProps) => (
  // Start 节点仅有出边
  <FlowNodeShell
    data={data as FlowNodeData}
    selected={selected}
    showSourceHandle
    iconClassName={styles.flow_node_icon_start}
  />
));

StartNode.displayName = 'StartNode';

export const EndNode = memo(({ data, selected }: NodeProps) => (
  // End 节点仅有入边
  <FlowNodeShell
    data={data as FlowNodeData}
    selected={selected}
    showTargetHandle
    iconClassName={styles.flow_node_icon_end}
  />
));

EndNode.displayName = 'EndNode';

export const LogicNode = memo(({ data, selected }: NodeProps) => (
  <FlowNodeShell
    data={data as FlowNodeData}
    selected={selected}
    showSourceHandle
    showTargetHandle
    iconClassName={styles.flow_node_icon_logic}
  />
));

LogicNode.displayName = 'LogicNode';

export const AgentNode = memo(({ data, selected }: NodeProps) => (
  <FlowNodeShell
    data={data as FlowNodeData}
    selected={selected}
    showSourceHandle
    showTargetHandle
    iconClassName={styles.flow_node_icon_agent}
  />
));

AgentNode.displayName = 'AgentNode';

/** 注册到 ReactFlow 的节点类型映射，键名需与 constants.FLOW_NODE_TYPES 一致 */
export const flowNodeTypes = {
  start: StartNode,
  end: EndNode,
  logic: LogicNode,
  agent: AgentNode,
};
