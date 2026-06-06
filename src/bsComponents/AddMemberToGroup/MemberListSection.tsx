import type { FC, ReactNode } from 'react';

import styles from './styles.module.less';

interface MemberListSectionProps {
  title: string;
  countLabel: string;
  children: ReactNode;
}

const MemberListSection: FC<MemberListSectionProps> = ({ title, countLabel, children }) => (
  <section>
    <div className={styles.section_header}>
      <span className={styles.section_title}>{title}</span>
      <span className={styles.member_count}>{countLabel}</span>
    </div>
    <div className={styles.list_container}>{children}</div>
  </section>
);

export default MemberListSection;
