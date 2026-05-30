import { useMemo, useRef } from 'react';
import * as ReactEcharts from 'echarts-for-react';
import { useMemoizedFn, useSafeState } from 'ahooks';
import type { ChartProps, EChartsHighlightParams } from './types';
import { splitIntoSegments } from './helper';

const TOP_OFFSET = '8px';
const BOTTOM_OFFSET = '33.33%';

const LEFT_OFFSET = '12px';
const RIGHT_OFFSET = '100px';

export const useChartConfigs = (props: ChartProps) => {
  const { datas: _datas = [] } = props;
  const [ready, setReady] = useSafeState(false);
  const [activeIndex, setActiveIndex] = useSafeState(-1);
  const chartsRef = useRef<ReactEcharts.EChartsInstance>(null);

  // 数据，如果只有一条数据，补一条相同点的数据，筹齐两条
  const datas = useMemo(() => {
    if (_datas.length > 1) return _datas;
    return [..._datas, ..._datas];
  }, [_datas]);

  const lastIndex = datas.length - 1;

  const segments = useMemo(() => {
    return splitIntoSegments(datas);
  }, [datas]);

  const { xValues, yValues } = useMemo(() => {
    let xValues: string[] = [];
    let yValues: number[] = [];

    for (const item of datas) {
      xValues.push(item.date);
      yValues.push(item.value);
    }

    return { xValues, yValues }
  }, [datas])

  const dateRanges = useMemo(() => {
    return segments.reduce((acc, cur, i) => {
      if (!i) acc.push(cur.startDate);
      return [...acc, cur.endDate];
    }, [] as string[]);
  }, [segments]);

  // 关闭/开启高亮
  const tooglePointHighlight = useMemoizedFn(
    (type: 'highlight' | 'downplay', index = lastIndex) => {
      const instance = chartsRef.current;
      instance?.dispatchAction({
        type,
        seriesIndex: 0,
        dataIndex: index,
      });
    }
  );

  // 高亮最后一个点
  const highlightLastPoint = useMemoizedFn(() => {
    tooglePointHighlight('highlight');
  });

  // 取消高亮最后一个点
  const cancelLastPoint = useMemoizedFn(() => {
    tooglePointHighlight('downplay');
  });

  // 鼠标移出charts 区域以外触发
  const handleGlobalout = useMemoizedFn(() => {
    setActiveIndex(-1);
    highlightLastPoint();
  });

  // 点高亮的时候触发
  const handlePointHighlight = useMemoizedFn(
    (params: EChartsHighlightParams) => {
      const { batch = [] } = params;
      if (!batch.length) return;
      const [{ dataIndex }] = batch;

      cancelLastPoint();
      setActiveIndex(dataIndex);
      tooglePointHighlight('highlight', dataIndex);
    }
  );

  // 点高亮消失触发
  const handleDownplay = useMemoizedFn(
    (params: EChartsHighlightParams) => {
      const { batch = [] } = params;
      if (!batch.length) return;
      handleGlobalout();
    }
  );

  const onChartReady = useMemoizedFn(
    (instance: ReactEcharts.EChartsInstance) => {
      chartsRef.current = instance;
      highlightLastPoint();
      setReady(true);
    }
  );

  const option = useMemo(() => {
    const yMin = Math.min(...yValues);
    let yMax = Math.max(...yValues);

    if (yMin === yMax) {
      yMax = yMax * 3;
    }

    return {
      tooltip: {
        trigger: 'axis',
        showContent: false,
        axisPointer: {
          type: 'line',
          lineStyle: {
            width: 1,
            color: '#FF0000',
            type: 'dashed'
          }
        }
      },
      grid: {
        top: TOP_OFFSET,
        left: LEFT_OFFSET,
        right: RIGHT_OFFSET,
        bottom: BOTTOM_OFFSET,
        containLabel: true
      },
      xAxis: {
        data: xValues,
        show: false,
        axisLabel: {
          show: false
        },
        boundaryGap: false
      },
      yAxis: {
        min: yMin,
        max: yMax,
        splitLine: {
          show: false
        },
        axisLabel: {
          show: false
        },
      },
      series: [
        {
          type: 'line',
          showSymbol: false,
          data: yValues,
          zlevel: 10,
          lineStyle: {
            width: 2,
            color: props.lineColor,
          },
          smooth: true,
          symbol: 'circle',
          // 点的大小
          symbolSize: 12,
          // 点的样式
          itemStyle: {
            color: '#f40',
            borderWidth: 1,
            borderColor: '#fff'
          },
          label: {
            show: true,
            formatter: (params: any) => {
              return yValues[params.dataIndex] + ' USDT';
            },
            position: 'right', // 标签显示在点的上方
            offset: [0, 0], // [x轴偏移, y轴偏移]
            fontWeight: 'bold',
            fontSize: 12,
            color: '#fff'
          }
        }
      ]
    }
  }, [xValues, yValues]);

  return {
    ready,
    option,
    chartsRef,
    segments,
    xValues,
    yValues,
    dateRanges,
    activeIndex,
    onChartReady,
    handleGlobalout,
    handleDownplay,
    highlightLastPoint,
    handlePointHighlight,
    TOP_OFFSET,
    BOTTOM_OFFSET,
    LEFT_OFFSET,
    RIGHT_OFFSET
  }
}