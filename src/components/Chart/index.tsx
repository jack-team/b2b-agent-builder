import { type FC, Fragment } from 'react';
import ReactEcharts from 'echarts-for-react';
import { useChartConfigs } from './hooks';
import type { ChartProps } from './types';
import Tooltip from './tooltip';
import XAxis from './xAxis';
import SplitLines from './splitLins';
import styles from './styles.module.less';

const Chart: FC<ChartProps> = (props) => {
  const {
    ready,
    option,
    xValues,
    yValues,
    dateRanges,
    chartsRef,
    activeIndex,
    onChartReady,
    handleDownplay,
    handleGlobalout,
    handlePointHighlight,
    BOTTOM_OFFSET,
    LEFT_OFFSET,
    RIGHT_OFFSET
  } = useChartConfigs(props);

  const boxWidth = `calc(100% - ${LEFT_OFFSET} - ${RIGHT_OFFSET})`;
  const boxHeight = `calc(100% - ${BOTTOM_OFFSET} + 2px)`;

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
              {activeIndex > -1 && (
                <Tooltip
                  xValues={xValues}
                  yValues={yValues}
                  chartsRef={chartsRef}
                  activeIndex={activeIndex}
                />
              )}
              <SplitLines
                left={LEFT_OFFSET}
                width={boxWidth}
                height={boxHeight}
              />
            </Fragment>
          )}
        </div>
      </div>
      <div style={{ marginLeft: LEFT_OFFSET, width: boxWidth }}>
        <XAxis dateRanges={dateRanges} />
      </div>
    </div>
  );
}

export default Chart;