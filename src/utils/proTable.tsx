import type { ReactElement } from 'react';
import { Empty } from 'antd';
import type { TableProps } from 'antd';

type TableViewRenderProps = Pick<TableProps, 'dataSource'>;

export const proTableSearchConfig = {
  layout: 'vertical' as const,
  labelWidth: 'auto' as const,
};

export const proTableDrawerPagination = {
  pageSize: 3,
  showSizeChanger: false,
  showTotal: (total: number, range: [number, number]) =>
    `${range[0]}-${range[1]} / ${total}`,
};

export const renderProTableEmptyView = (
  { dataSource = [] }: TableViewRenderProps,
  dom: ReactElement,
) => {
  if (!dataSource.length) {
    return (
      <div className="py-[56px]">
        <Empty description="Nothing found yet." />
      </div>
    );
  }
  return dom;
};
