import { type FC, type RefObject, useMemo } from 'react';
import * as ReactEcharts from 'echarts-for-react';
import styles from './styles.module.less';

type TooltipProps = {
  xValues: string[];
  yValues: number[];
  activeIndex: number;
  chartsRef: RefObject<ReactEcharts.EChartsInstance | null>;
}

const Tooltip: FC<TooltipProps> = ((props) => {
  const {
    xValues,
    yValues,
    chartsRef,
    activeIndex
  } = props;

  const date = xValues[activeIndex];
  const intsance = chartsRef.current!;

  const [x, y] = useMemo(() => {
    const val = yValues[activeIndex];
    return intsance.convertToPixel({ seriesIndex: 0 }, [activeIndex, val]);
  }, [activeIndex, intsance]);

  return (
    <div className={styles.tooltip} style={{ left: x, top: y }}>
      <div className={styles.date}>
        {date}
      </div>
    </div>
  );
})

export default Tooltip;