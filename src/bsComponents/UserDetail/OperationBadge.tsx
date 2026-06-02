import type { FC } from 'react';
import type { PermissionOperation } from './types';
import styles from './styles.module.less';

const operationClassMap: Record<PermissionOperation, string> = {
  C: styles.operation_c,
  R: styles.operation_r,
  U: styles.operation_u,
  D: styles.operation_d,
};

type OperationBadgeProps = {
  operations: PermissionOperation[];
};

const OperationBadge: FC<OperationBadgeProps> = ({ operations }) => (
  <span className={styles.operation_badges}>
    {operations.map((op) => (
      <span
        key={op}
        className={`${styles.operation_badge} ${operationClassMap[op]}`}
      >
        {op}
      </span>
    ))}
  </span>
);

export default OperationBadge;
