import type { ReactElement } from 'react';
import { Empty, Select } from 'antd';
import type { InputProps, TableProps } from 'antd';
import i18n from '@/i18n';

type OperatorOption = { value: string; label: string };

export const getTextSearchFieldProps = (placeholder: string): InputProps => ({
  placeholder,
});

export const getOperatorSearchFieldProps = ({
  placeholder,
  operatorOptions,
  operatorClassName,
}: {
  placeholder: string;
  operatorOptions: OperatorOption[];
  operatorClassName?: string;
}): InputProps => ({
  placeholder,
  addonBefore: (
    <Select
      defaultValue={operatorOptions[0]?.value}
      options={operatorOptions}
      className={operatorClassName}
    />
  ),
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
