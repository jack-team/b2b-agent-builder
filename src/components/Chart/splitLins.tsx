import { type FC } from 'react';
import styles from './styles.module.less';

type SplitLinesProps = {
  width: string;
  height: string;
  left: string;
}

const SplitLines: FC<SplitLinesProps> = (porps) => {
  const { ...style } = porps;
  return <div style={style} className={styles.split_lines} />;
}

export default SplitLines;