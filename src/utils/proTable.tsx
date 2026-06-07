import type { ReactElement, ReactNode } from 'react';
import { Empty } from 'antd';
import type { InputProps, TableProps } from 'antd';
import i18n from '@/i18n';

export const getTextSearchFieldProps = (placeholder: string): InputProps => ({
  placeholder,
});

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

type ProTableEmptyViewOptions = {
  description?: string;
  action?: ReactNode;
};

export const createProTableEmptyViewRenderer = (options?: ProTableEmptyViewOptions) => {
  const description = options?.description ?? i18n.t('common.nothingFound');

  return (
    { dataSource = [] }: TableViewRenderProps,
    dom: ReactElement,
  ) => {
    if (!dataSource.length) {
      return (
        <div className="py-[56px]">
          <Empty description={description}>
            {options?.action}
          </Empty>
        </div>
      );
    }
    return dom;
  };
};

export const renderProTableEmptyView = createProTableEmptyViewRenderer();
