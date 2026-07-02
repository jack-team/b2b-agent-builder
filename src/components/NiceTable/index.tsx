import { useMemo } from 'react';
import { useMemoizedFn } from 'ahooks';
import { Empty, Skeleton, type TableProps } from 'antd';
import { useTranslation } from 'react-i18next';
import { ProTable } from '@ant-design/pro-components';
import Spinner from '@/components/Spinner';
import { useRequestCache } from './useRequestCache';
import type { NiceTableProps, NiceTableData } from './types';
import styles from './styles.module.less';

const loadingIndicator = (
  <div className={styles.loading}>
    <Spinner type="infinity-spin" />
  </div>
);

function TablePlaceholder({ children }: { children: React.ReactNode }) {
  return <div className="p-[24px]">{children}</div>;
}

/**
 * 基于 ProTable 的业务表格封装，提供：
 * - 统一的搜索栏布局与 i18n 文案
 * - 自定义 loading / 空态（含空态操作区）
 * - 可选的 IndexedDB 请求缓存（需同时传入 tableName 与 request）
 */
function NiceTable<D extends object = NiceTableData>(props: NiceTableProps<D>) {
  const { t } = useTranslation();
  const { renderEmptyAction, tableName, request, pagination, search, ...rest } = props;

  const { ready, enableCache, cachedData, request: cachedRequest } = useRequestCache({
    tableName,
    request,
  });

  const renderSkeleton = () => (
    <TablePlaceholder>
      <Skeleton active />
    </TablePlaceholder>
  );

  const renderEmpty = useMemoizedFn((tableProps: TableProps<D>) => {
    const { loading } = tableProps;
    const spinning = typeof loading === 'boolean' ? loading : loading?.spinning;

    if (spinning) return renderSkeleton();

    return (
      <TablePlaceholder>
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={t('common.noDataAvailable')}
        >
          {renderEmptyAction?.(tableProps)}
        </Empty>
      </TablePlaceholder>
    );
  });

  const searchConfig = useMemo(
    () => search !== false && {
      ...search,
      layout: 'vertical' as const,
      searchText: t('common.search'),
      resetText: t('common.reset'),
    },
    [search, t],
  );

  const paginationConfig = useMemo(
    () => ({ showSizeChanger: true, ...pagination }),
    [pagination],
  );

  const loadingConfig = useMemo(
    () => ({ indicator: loadingIndicator }),
    [],
  );

  const tableViewRender = useMemoizedFn((tableProps: TableProps<D>, dom) => {
    if (tableProps.dataSource?.length) return dom;
    return renderEmpty(tableProps);
  });

  if (!ready) {
    return renderSkeleton();
  }

  return (
    <ProTable
      {...rest}
      request={cachedRequest}
      search={searchConfig}
      loading={loadingConfig}
      defaultData={enableCache ? cachedData : undefined}
      pagination={paginationConfig}
      tableViewRender={tableViewRender}
    />
  );
}

export default NiceTable;
