import { useEffect } from 'react';
import { useMemoizedFn, useSafeState } from 'ahooks';
import type { RequestData } from '@ant-design/pro-table';
import { DexieStorage } from '@/utils/dexieStorage';
import type { RequestCacheParams, TableRequest } from './types';

/** 表格请求结果的 IndexedDB 存储，key 为 tableName */
const tableCacheStorage = new DexieStorage('nice-table', true);

/**
 * 为 ProTable 的 request 提供 IndexedDB 缓存能力。
 * 需同时传入 tableName 与 request 才启用；先展示上次成功的数据（defaultData），再发起新请求并更新缓存。
 */
export function useRequestCache<D extends object, U>(params: RequestCacheParams<D, U>) {
  const { tableName, request } = params;
  const enableCache = Boolean(tableName && request);
  const [cachedData, setCachedData] = useSafeState<D[]>();
  const [ready, setReady] = useSafeState(!enableCache);

  const initCachedData = useMemoizedFn(async () => {
    try {
      const cached = await tableCacheStorage.getItem(tableName!);
      const parsed = cached as RequestData<D> | null;
      if (parsed?.data?.length) setCachedData(parsed.data);
    } finally {
      setReady(true);
    }
  });

  useEffect(() => {
    if (!enableCache) {
      setCachedData(undefined);
      setReady(true);
      return;
    }
    setReady(false);
    initCachedData();
  }, [enableCache, tableName, initCachedData, setCachedData, setReady]);

  const proxyRequest = useMemoizedFn<TableRequest<D, U>>(async (...args) => {
    const result = (await request!(...args)) ?? {};
    if (result.success !== false) {
      tableCacheStorage.setItem(tableName!, result);
    }
    return result;
  });

  return {
    ready,
    enableCache,
    cachedData,
    request: enableCache ? proxyRequest : request,
  };
}
