import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useMemoizedFn } from 'ahooks';

import { DrawerContainer } from '@/components/Drawer';
import ConflictCard from './ConflictCard';
import type {
  ConflictMemoryItem,
  ConflictMemoryResolutionProps,
} from './types';
import styles from './styles.module.less';

const defaultConflicts: ConflictMemoryItem[] = [
  {
    id: 'CM001',
    timestamp: '2026-04-18T14:32:15',
    status: 'pending',
    oldMemory: {
      date: '2026-04-01',
      label: 'User Residential Address:',
      content: '1234 Maple Street, Apt 5B, Los Angeles, CA 90001, United States',
      decayScore: 0.82,
      accessedCount: 12,
    },
    newMemory: {
      date: '2026-04-21',
      label: 'User Residential Address:',
      content: '47 Baker Street, Flat 2, London W1U 8EW, United Kingdom',
      decayScore: 0.97,
      sourceDialog: 'dlg_882x',
    },
  },
  {
    id: 'CM002',
    timestamp: '2026-04-17T09:15:42',
    status: 'pending',
    oldMemory: {
      date: '2026-03-28',
      label: 'User Preferred Language:',
      content: 'English (US)',
      decayScore: 0.76,
      accessedCount: 8,
    },
    newMemory: {
      date: '2026-04-16',
      label: 'User Preferred Language:',
      content: 'French (FR)',
      decayScore: 0.91,
      sourceDialog: 'dlg_441a',
    },
  },
  {
    id: 'CM003',
    timestamp: '2026-04-15T18:08:03',
    status: 'pending',
    oldMemory: {
      date: '2026-03-10',
      label: 'User Dietary Restriction:',
      content: 'Severe peanut allergy — avoid all peanut-derived products',
      decayScore: 0.88,
      accessedCount: 24,
    },
    newMemory: {
      date: '2026-04-14',
      label: 'User Dietary Restriction:',
      content: 'Mild peanut intolerance — can tolerate trace amounts',
      decayScore: 0.94,
      sourceDialog: 'dlg_773b',
    },
  },
];

const ConflictMemoryResolution: FC<ConflictMemoryResolutionProps> = ({
  onClose,
  conflicts = defaultConflicts,
  onKeepOld,
  onUseNew,
}) => {
  const { t } = useTranslation();

  const handleKeepOld = useMemoizedFn((conflictId: string) => {
    onKeepOld?.(conflictId);
  });

  const handleUseNew = useMemoizedFn((conflictId: string) => {
    onUseNew?.(conflictId);
  });

  return (
    <DrawerContainer title={t('conflictMemoryResolution.title')} onClose={onClose}>
      <div className={styles.list}>
        {conflicts.map((conflict) => (
          <ConflictCard
            key={conflict.id}
            conflict={conflict}
            onKeepOld={handleKeepOld}
            onUseNew={handleUseNew}
          />
        ))}
      </div>
    </DrawerContainer>
  );
};

export default ConflictMemoryResolution;
