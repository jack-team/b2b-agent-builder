export type ChartDataType = {
  date: string;
  value: number;
}

export type ChartProps = {
  // 折线的颜色值
  lineColor: string;
  datas?: ChartDataType[];
  padding?: Partial<{
    top: string;
    right: string;
    bottom: string;
    left: string;
  }>;
}

export type EChartsHighlightParams = {
  type: string;
  escapeConnect: boolean;
  batch: Array<{
    dataIndex: number;
  }>
}

export type FormatterParams = {
  dataIndex: number;
}