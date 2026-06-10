import { useMemoizedFn, useSafeState, useMount } from 'ahooks';
import type { RequestData } from '@ant-design/pro-table';
import { DexieStorage } from '@/utils/dexieStorage';
import type { RequestCacheParams, TableRequest } from './types';

const tableCacheStorage = new DexieStorage('nice-table', true);

export function useRequestCache<D extends object, U>(params: RequestCacheParams<D, U>) {
  const { tableName, request } = params;
  const [cachedData, setCachedData] = useSafeState<D[]>();
  const [ready, setReady] = useSafeState(!tableName);
  const enableCache = Boolean(tableName);

  const initCachedData = useMemoizedFn(async () => {
    const cached = await tableCacheStorage.getItem(tableName!);
    const parsed = cached as RequestData<D> | null;
    if (parsed?.data?.length) setCachedData(parsed.data);
    setReady(true);
  });

  // 初始化获取缓存数据
  useMount(() => {
    if (enableCache) {
      initCachedData();
    };
  });

  // 代理请求，缓存数据
  const proxyRequest = useMemoizedFn<TableRequest<D, U>>(async (...args) => {
    const result = await request!(...args);
    if (tableName && result.success !== false) {
      tableCacheStorage.setItem(tableName, result);
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
