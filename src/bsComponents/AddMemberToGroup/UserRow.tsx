import type { FC, ReactNode } from 'react';
import { Avatar } from 'antd';

import { getInitials } from '@/utils/user';
import styles from './styles.module.less';

interface UserRowProps {
  name: string;
  avatarColor: string;
  subtitle?: string;
  action?: ReactNode;
}

const UserRow: FC<UserRowProps> = ({ name, avatarColor, subtitle, action }) => (
  <div className={styles.user_row}>
    <Avatar
      className={styles.user_avatar}
      size={36}
      style={{ backgroundColor: avatarColor }}
    >
      {getInitials(name)}
    </Avatar>
    <div className={styles.user_info}>
      <span className={styles.user_name}>{name}</span>
      {subtitle && <span className={styles.user_role}>{subtitle}</span>}
    </div>
    {action}
  </div>
);

export default UserRow;
