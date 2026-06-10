import { Empty, Skeleton, type TableProps } from 'antd';
import { useTranslation } from 'react-i18next';
import { ProTable } from '@ant-design/pro-components';
import Spinner from '@/components/Spinner';
import { useRequestCache } from './useRequestCache';
import type { NiceTableProps, NiceTableData } from './types';
import styles from './styles.module.less';

function NiceTable<D extends object = NiceTableData>(props: NiceTableProps<D>) {
  const { t } = useTranslation();
  const { renderEmptyAction, tableName, request, pagination, search, ...rest } = props;

  const { ready, enableCache, cachedData, request: cachedRequest } = useRequestCache({
    tableName,
    request,
  });

  const renderLoading = () => (
    <div className={styles.loading}>
      <Spinner type="infinity-spin" />
    </div>
  );

  const renderSkeleton = () => {
    return (
      <div className="p-[24px]">
        <Skeleton active />
      </div>
    );
  }

  const renderEmpty = (props: TableProps<D>) => {
    const { loading } = props;
    const spinning = typeof loading === 'boolean' ? loading : loading?.spinning;

    if (spinning) return renderSkeleton();

    return (
      <div className="p-[24px]">
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          children={renderEmptyAction?.(props)}
          description={t('common.noDataAvailable')}
        />
      </div>
    );
  };

  if (!ready) {
    return renderSkeleton();
  }

  return (
    <ProTable
      {...rest}
      request={cachedRequest}
      search={search !== false && {
        ...search,
        searchText: t('common.search'),
        resetText: t('common.reset')
      }}
      loading={{ indicator: renderLoading() }}
      defaultData={enableCache ? cachedData : undefined}
      pagination={{ showSizeChanger: true, ...pagination }}
      tableViewRender={(props, dom) => {
        const { dataSource: d } = props;
        if (d?.length) return dom;
        return renderEmpty(props);
      }}
    />
  );
}

export default NiceTable;
