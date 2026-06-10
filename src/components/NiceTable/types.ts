import type { TableProps } from 'antd';
import type { ProTableProps } from '@ant-design/pro-table';

export type NiceTableData = Record<string, unknown>;

export type TableRequest<D, U> = NonNullable<ProTableProps<D, U>['request']>;

export type NiceTableProps<D extends NiceTableData = NiceTableData> = ProTableProps<D, {}, 'text'> & {
  tableName?: string;
  renderEmptyAction?: (props: TableProps<D>) => React.ReactNode;
};

export type RequestCacheParams<D, U> = {
  tableName?: string;
  request?: TableRequest<D, U>;
}