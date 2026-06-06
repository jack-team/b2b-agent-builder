import type { ReactElement } from 'react';
import { Empty } from 'antd';
import type { TableProps } from 'antd';
import i18n from '@/i18n';

type TableViewRenderProps = Pick<TableProps, 'dataSource'>;

export const proTableSearchConfig = {
  layout: 'vertical' as const,
  labelWidth: 'auto' as const,
};

export const proTableDrawerPagination = {
  pageSize: 3,
  showSizeChanger: false,
  showTotal: (total: number, range: [number, number]) =>
    i18n.t('common.paginationTotal', {
      start: range[0],
      end: range[1],
      total,
    }),
};

export const renderProTableEmptyView = (
  { dataSource = [] }: TableViewRenderProps,
  dom: ReactElement,
) => {
  if (!dataSource.length) {
    return (
      <div className="py-[56px]">
        <Empty description={i18n.t('common.nothingFound')} />
      </div>
    );
  }
  return dom;
};
