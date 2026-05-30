import { type FC } from 'react';
import styles from './styles.module.less';

type XAxisProps = {
  dateRanges: string[];
}

const xAxis: FC<XAxisProps> = (props) => {
  const { dateRanges } = props;
  return (
    <div className={styles.x_axis}>
      {dateRanges.map((val,) => {
        return (
          <div key={val} className={styles.x_axis_item}>
            {val}
          </div>
        )
      })}
    </div>
  )
}

export default xAxis;