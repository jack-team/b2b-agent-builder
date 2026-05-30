export type ChartDataType = {
  date: string;
  value: number;
}

export type ChartProps = {
  // 折线的颜色值
  lineColor: string;
  datas?: ChartDataType[];
}

export type EChartsHighlightParams = {
  type: string;
  escapeConnect: boolean;
  batch: Array<{
    dataIndex: number;
  }>
}