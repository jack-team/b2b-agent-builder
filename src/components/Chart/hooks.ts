import { useMemo, useRef } from 'react';
import * as ReactEcharts from 'echarts-for-react';
import { useMemoizedFn, useSafeState } from 'ahooks';
import type { ChartProps, EChartsHighlightParams, FormatterParams } from './types';
import { splitIntoSegments } from './helper';

export const useChartConfigs = (props: ChartProps) => {
  const { datas: _datas = [], padding } = props;
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
  const clearLastPoint = useMemoizedFn(() => {
    tooglePointHighlight('downplay');
  });

  // 鼠标移出charts 区域以外触发
  const handleGlobalout = useMemoizedFn(() => {
    highlightLastPoint();
    setActiveIndex(-1);
  });

  // 点高亮的时候触发
  const handlePointHighlight = useMemoizedFn(
    (params: EChartsHighlightParams) => {
      const { batch = [] } = params;
      if (!batch.length) return;
      const [{ dataIndex }] = batch;
      clearLastPoint();
      tooglePointHighlight('highlight', dataIndex);
      requestAnimationFrame(() => setActiveIndex(dataIndex));
    }
  );

  // 点高亮消失触发
  const handleDownplay = useMemoizedFn(
    (params: EChartsHighlightParams) => {
      const { batch = [] } = params;
      if (!batch.length) return;

      highlightLastPoint();
      setActiveIndex(-1);
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
            width: 0
          }
        }
      },
      grid: {
        ...padding,
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
          zlevel: 10,
          type: 'line',
          showSymbol: false,
          data: yValues,
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
            formatter: (params: FormatterParams) => {
              return yValues[params.dataIndex] + ' USDT';
            },
            position: 'right',
            offset: [0, 0],
            fontWeight: 'bold',
            fontSize: 12,
            color: '#fff'
          }
        },
        {
          zlevel: 11,
          type: 'line',
          data: yValues,
          symbol: 'none',
          smooth: true,
          lineStyle: {
            width: 2,
            color: 'transparent',
          },
          label: {
            show: true,
            formatter: (params: FormatterParams) => {
              return xValues[params.dataIndex];
            },
            position: 'top',
            fontSize: 12,
            color: '#fff',
            offset: [0, -6],
            fontWeight: 'bold',
          }
        },
      ]
    }
  }, [xValues, yValues, padding]);

  return {
    ready,
    option,
    segments,
    xValues,
    yValues,
    chartsRef,
    dateRanges,
    activeIndex,
    onChartReady,
    handleGlobalout,
    handleDownplay,
    highlightLastPoint,
    handlePointHighlight
  }
}