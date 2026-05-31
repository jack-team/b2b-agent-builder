import { type FC, type RefObject } from 'react';
import { useUpdateEffect, useSafeState, useMemoizedFn } from 'ahooks';
import * as ReactEcharts from 'echarts-for-react';
import cls from 'classnames';
import styles from './styles.module.less';

type IndicatorLineProps = {
  yValues: any[];
  activeIndex: number;
  chartsRef: RefObject<ReactEcharts.EChartsInstance | null>;
}


const IndicatorLine: FC<IndicatorLineProps> = (props) => {
  const { activeIndex: i, chartsRef, yValues } = props;
  const [point, setPoint] = useSafeState([0, 0]);

  const updatePoint = useMemoizedFn(() => {
    const g = chartsRef.current!;
    const val = yValues[i];
    setPoint(g.convertToPixel({ seriesIndex: 0 }, [i, val]));
  });

  useUpdateEffect(() => {
    if (i > -1) requestAnimationFrame(updatePoint);
  }, [i, yValues]);

  return (
    <div
      style={{ left: point[0] }}
      className={cls(
        styles.indicator_line,
        i < 0 && styles.indicator_line_hide
      )}
    />
  );
}

export default IndicatorLine;