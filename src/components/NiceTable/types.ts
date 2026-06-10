import type { TableProps } from 'antd';
import type { ProTableProps } from '@ant-design/pro-table';

export type NiceTableData = Record<string, any>;

export type TableRequest<D, U> = NonNullable<ProTableProps<D, U>['request']>;

export type NiceTableProps<D extends object = NiceTableData> = Omit<ProTableProps<D, {}, 'text'>, 'defaultData'> & {
  tableName?: string;
  renderEmptyAction?: (props: TableProps<D>) => React.ReactNode;
};

export type RequestCacheParams<D, U> = {
  tableName?: string;
  request?: TableRequest<D, U>;
}