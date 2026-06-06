import type { FC } from 'react';
import dayjs from 'dayjs';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

import type { MemoryDetailBoxProps } from './types';
import styles from './styles.module.less';

const formatMemoryDate = (value: string) => dayjs(value).format('DD/MM/YYYY');

const MemoryDetailBox: FC<MemoryDetailBoxProps> = ({ variant, memory, onAction }) => {
  const { t } = useTranslation();
  const isOld = variant === 'old';

  return (
    <div className={styles.memory_box}>
      <div className={styles.memory_header}>
        <span className={styles.memory_title}>
          {isOld
            ? t('conflictMemoryResolution.oldMemory')
            : t('conflictMemoryResolution.newMemory')}
        </span>
        <span className={styles.memory_date}>{formatMemoryDate(memory.date)}</span>
      </div>
      <div className={styles.memory_label}>{memory.label}</div>
      <div className={styles.memory_content}>{memory.content}</div>
      <div className={styles.memory_meta}>
        <span>
          {t('conflictMemoryResolution.decayScore', { score: memory.decayScore.toFixed(2) })}
        </span>
        {isOld && memory.accessedCount !== undefined && (
          <span>
            {t('conflictMemoryResolution.accessedCount', { count: memory.accessedCount })}
          </span>
        )}
        {!isOld && memory.sourceDialog && (
          <span>
            {t('conflictMemoryResolution.sourceDialog', { dialog: memory.sourceDialog })}
          </span>
        )}
      </div>
      <Button
        className={styles.memory_action}
        type={isOld ? 'default' : 'primary'}
        onClick={onAction}
      >
        {isOld
          ? t('conflictMemoryResolution.keepThisMemory')
          : t('conflictMemoryResolution.useThisMemory')}
      </Button>
    </div>
  );
};

export default MemoryDetailBox;
