/**
 * 添加节点浮层面板。
 * 由 SourceHandle 的「+」按钮触发，按 Logic / Agent 分组展示可选节点类型。
 */
import type { FC } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  AppstoreOutlined,
  PartitionOutlined,
  PlusOutlined,
  RetweetOutlined,
  RobotOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Button, Input, Typography } from 'antd';
import cls from 'classnames';
import { useTranslation } from 'react-i18next';

import { agentPaletteItems, logicPaletteItems } from './constants';
import type { PaletteAnchor } from './context';
import type { FlowNodeCategory, FlowNodeType, PaletteSelectPayload } from './types';
import styles from './styles.module.less';

const logicIconMap = {
  branch: PartitionOutlined,
  loop: RetweetOutlined,
  batch: AppstoreOutlined,
} as const;

interface PaletteItemProps {
  label: string;
  nodeType: FlowNodeType;
  category: FlowNodeCategory;
  icon: FC;
  onSelect: (payload: PaletteSelectPayload) => void;
}

const PaletteItem: FC<PaletteItemProps> = ({
  label,
  nodeType,
  category,
  icon: Icon,
  onSelect,
}) => (
  <button
    type="button"
    className={styles.palette_item}
    onClick={() => onSelect({ nodeType, category, label })}
  >
    <span className={styles.palette_item_icon}>
      <Icon />
    </span>
    <span className={styles.palette_item_label}>{label}</span>
  </button>
);

interface NodePaletteProps {
  anchor: PaletteAnchor;
  onSelect: (payload: PaletteSelectPayload) => void;
  onClose: () => void;
}

const NodePalette: FC<NodePaletteProps> = ({
  anchor,
  onSelect,
  onClose,
}) => {
  const { t } = useTranslation();
  const [keyword, setKeyword] = useState('');
  const panelRef = useRef<HTMLDivElement>(null);

  const normalizedKeyword = keyword.trim().toLowerCase();

  const filteredLogicItems = useMemo(
    () => logicPaletteItems.filter((item) => {
      const label = t(item.labelKey).toLowerCase();
      return !normalizedKeyword || label.includes(normalizedKeyword);
    }),
    [normalizedKeyword, t],
  );

  const filteredAgentItems = useMemo(
    () => agentPaletteItems.filter((item) => {
      const label = t(item.labelKey).toLowerCase();
      return !normalizedKeyword || label.includes(normalizedKeyword);
    }),
    [normalizedKeyword, t],
  );

  // 点击面板外部区域时关闭
  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!panelRef.current?.contains(event.target as HTMLElement)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [onClose]);

  // 根据锚点与视口尺寸计算面板位置，避免超出屏幕边界
  const panelStyle = useMemo(() => {
    const panelWidth = 220;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const left = anchor.x + 12 + panelWidth > viewportWidth
      ? anchor.x - panelWidth - 12
      : anchor.x + 12;
    const top = Math.min(anchor.y, viewportHeight - 420);

    return { left, top };
  }, [anchor.x, anchor.y]);

  return (
    <div
      ref={panelRef}
      className={styles.palette}
      style={panelStyle}
      onClick={(event) => event.stopPropagation()}
    >
      <Input
        allowClear
        prefix={<SearchOutlined className={styles.palette_search_icon} />}
        placeholder={t('common.search')}
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
        className={styles.palette_search}
      />

      {filteredLogicItems.length > 0 ? (
        <section className={styles.palette_section}>
          <Typography.Text className={styles.palette_section_title}>
            {t('orchestrationFlowEditor.palette.logics')}
          </Typography.Text>
          <div className={styles.palette_list}>
            {filteredLogicItems.map((item) => {
              const Icon = logicIconMap[item.nodeType];
              return (
                <PaletteItem
                  key={item.nodeType}
                  label={t(item.labelKey)}
                  nodeType={item.nodeType}
                  category={item.category}
                  icon={Icon}
                  onSelect={onSelect}
                />
              );
            })}
          </div>
        </section>
      ) : null}

      {filteredAgentItems.length > 0 ? (
        <section className={styles.palette_section}>
          <Typography.Text className={styles.palette_section_title}>
            {t('orchestrationFlowEditor.palette.agents')}
          </Typography.Text>
          <div className={styles.palette_list}>
            {filteredAgentItems.map((item) => (
              <PaletteItem
                key={item.nodeType}
                label={t(item.labelKey)}
                nodeType={item.nodeType}
                category={item.category}
                icon={RobotOutlined}
                onSelect={onSelect}
              />
            ))}
          </div>
        </section>
      ) : null}

      <Button
        type="link"
        icon={<PlusOutlined />}
        className={cls(styles.palette_new_agent, 'px-0')}
      >
        {t('orchestrationFlowEditor.palette.newAgent')}
      </Button>
    </div>
  );
};

export default NodePalette;
