import type { FC } from 'react';
import { Tag, Space, Tooltip, Button } from 'antd';
import {
  PlayCircleOutlined,
  EditOutlined,
  EyeOutlined,
  ApartmentOutlined,
  LinkOutlined,
} from '@/components/BaseIcons';
import { useTranslation } from 'react-i18next';
import type { WorkspaceItem, WorkspaceItemStatus } from '../../types';
import styles from './styles.module.less';

type WorkspaceCardProps = {
  item: WorkspaceItem;
};

const statusColorMap: Record<WorkspaceItemStatus, string> = {
  processing: 'success',
  stopped: 'error',
  draft: 'warning',
};

const WorkspaceCard: FC<WorkspaceCardProps> = ({ item }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.card}>
      <div
        className={styles.icon}
        style={{ backgroundColor: `${item.iconColor}14`, color: item.iconColor }}
      >
        <LinkOutlined />
      </div>

      <div className={styles.main}>
        <div className={styles.header}>
          <span className={styles.title}>{item.title}</span>
          <Tag
            bordered={false}
            color={statusColorMap[item.status]}
            className={styles.statusTag}
          >
            {t(`dashboardPage.status.${item.status}`)}
          </Tag>
        </div>
        <p className={styles.description}>{item.description}</p>
        <div className={styles.meta}>
          <span>{item.updatedAt}</span>
          <Space size={16}>
            <span className={styles.metaItem}>
              <EyeOutlined />
              {item.views}
            </span>
            <span className={styles.metaItem}>
              <ApartmentOutlined />
              {t('dashboardPage.nodes', { count: item.nodes })}
            </span>
          </Space>
        </div>
      </div>

      <div className={styles.actions}>
        <Tooltip title={t('dashboardPage.run')}>
          <Button
            type="text"
            size="small"
            icon={<PlayCircleOutlined />}
          />
        </Tooltip>
        <Tooltip title={t('dashboardPage.edit')}>
          <Button
            type="text"
            size="small"
            icon={<EditOutlined />}
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default WorkspaceCard;
