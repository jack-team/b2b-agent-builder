import type { TableProps } from 'antd';
import type { ProTableProps } from '@ant-design/pro-table';

/** 表格行数据的默认类型 */
export type NiceTableData = Record<string, any>;

/** ProTable request 函数的类型别名 */
export type TableRequest<D, U> = NonNullable<ProTableProps<D, U>['request']>;

export type NiceTableProps<D extends object = NiceTableData> = Omit<ProTableProps<D, {}, 'text'>, 'defaultData'> & {
  /** 表格唯一标识；与 request 同时传入时启用 IndexedDB 缓存（见 useRequestCache） */
  tableName?: string;
  /** 空态时渲染的自定义操作区域，如「新建」按钮 */
  renderEmptyAction?: (props: TableProps<D>) => React.ReactNode;
};

export type RequestCacheParams<D, U> = {
  tableName?: string;
  request?: TableRequest<D, U>;
};