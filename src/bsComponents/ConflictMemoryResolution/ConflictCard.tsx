import type { FC } from 'react';
import dayjs from 'dayjs';
import { Tag } from 'antd';
import { useTranslation } from 'react-i18next';
import { useMemoizedFn } from 'ahooks';

import MemoryDetailBox from './MemoryDetailBox';
import type { ConflictCardProps } from './types';
import styles from './styles.module.less';

const formatTimestamp = (value: string) => dayjs(value).format('DD/MM/YYYY HH:mm:ss');

const ConflictCard: FC<ConflictCardProps> = ({ conflict, onKeepOld, onUseNew }) => {
  const { t } = useTranslation();

  const handleKeepOld = useMemoizedFn(() => {
    onKeepOld(conflict.id);
  });

  const handleUseNew = useMemoizedFn(() => {
    onUseNew(conflict.id);
  });

  return (
    <div className={styles.card}>
      <div className={styles.card_header}>
        <div className={styles.card_header_main}>
          <span className={styles.card_id}>
            {t('conflictMemoryResolution.conflictTitle', { id: conflict.id })}
          </span>
          <span className={styles.card_timestamp}>{formatTimestamp(conflict.timestamp)}</span>
        </div>
        {conflict.status === 'pending' && (
          <Tag className={styles.status_tag}>
            {t('conflictMemoryResolution.status.pending')}
          </Tag>
        )}
      </div>
      <div className={styles.comparison}>
        <MemoryDetailBox
          variant="old"
          memory={conflict.oldMemory}
          onAction={handleKeepOld}
        />
        <span className={styles.vs_label}>{t('conflictMemoryResolution.vs')}</span>
        <MemoryDetailBox
          variant="new"
          memory={conflict.newMemory}
          onAction={handleUseNew}
        />
      </div>
    </div>
  );
};

export default ConflictCard;
