import { type FC, useMemo, Fragment, memo } from 'react';
import ReactEcharts from 'echarts-for-react';
import { useChartConfigs } from './hooks';
import type { ChartProps } from './types';
import XAxis from './xAxis';
import SplitLines from './splitLins';
import IndicatorLine from './indicatorLine';
import styles from './styles.module.less';

const DEFAULT_PADDING = {
  top: '24px',
  right: '100px',
  bottom: '33.33%',
  left: '40px'
}

const Chart: FC<ChartProps> = (props) => {
  const { padding, ...reset } = props;

  const _padding = useMemo(() => {
    return { ...DEFAULT_PADDING, ...padding };
  }, [padding]);

  const {
    ready,
    option,
    yValues,
    chartsRef,
    activeIndex,
    dateRanges,
    onChartReady,
    handleDownplay,
    handleGlobalout,
    handlePointHighlight
  } = useChartConfigs({ ...reset, padding: _padding });

  const boxWidth = `calc(100% - ${_padding.left} - ${_padding.right})`;
  const boxHeight = `calc(100% - ${_padding.bottom} + 2px)`;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.chart}>
          <ReactEcharts
            option={option}
            style={{ height: '100%' }}
            onChartReady={onChartReady}
            className={styles.chart_inner}
            onEvents={{
              downplay: handleDownplay,
              globalout: handleGlobalout,
              highlight: handlePointHighlight
            }}
          />
          {ready && (
            <Fragment>
              <SplitLines
                left={_padding.left}
                width={boxWidth}
                height={boxHeight}
              />
              <IndicatorLine
                yValues={yValues}
                chartsRef={chartsRef}
                activeIndex={activeIndex}
              />
            </Fragment>
          )}
        </div>
      </div>
      <div style={{ marginLeft: _padding.left, width: boxWidth }}>
        <XAxis dateRanges={dateRanges} />
      </div>
    </div>
  );
}

export default memo(Chart);