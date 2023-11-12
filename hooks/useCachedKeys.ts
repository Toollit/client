import { useCallback } from 'react';
import { useSWRConfig } from 'swr';

interface DeserializedCachedKeys {
  key: string;
  url: string;
  args: { page: string; tag: string };
}

interface GetCachedDataParam {
  tag: string;
}

interface MutateParam {
  [key: string]: string;
}

/**
 * swr cache keys handle hooks
 */
const useCachedKeys = () => {
  const { mutate, cache } = useSWRConfig();

  /**
   * Remove all cached keys
   */
  const clearCache = useCallback(() => {
    const cachedKeys = cache.keys();

    for (let key of cachedKeys) {
      cache.delete(key);
    }
  }, [cache]);

  /**
   * Get all cached keys
   */
  const getCachedKeys = useCallback(() => {
    const cachedKeys = cache.keys();

    const keys = Array.from(cachedKeys);

    let processedCachedKeys: DeserializedCachedKeys[] = [];

    for (let i = 0; i < keys.length; i++) {
      processedCachedKeys.push({ key: keys[i], ...JSON.parse(keys[i]) });
    }

    return processedCachedKeys;
  }, [cache]);

  /**
   * Get cached data with tag
   * @param {string} tag - tag contained in serialized cache key
   * @returns {unknown | undefined} - Unknown if data is present, undefined if not
   */
  const getCachedData = useCallback(
    ({ tag }: GetCachedDataParam) => {
      const found = getCachedKeys().find((key) => key.args?.tag === tag);

      const cachedKey = found?.key;

      if (cachedKey) {
        const cachedData = cache.get(cachedKey)?.data?.data;

        return cachedData;
      }
    },
    [getCachedKeys, cache],
  );

  /**
   * Revalidate cached data with tag
   * @param {string} tag - tag contained in serialized cache key
   */
  const mutateTag = useCallback(
    ({ tag }: MutateParam) => {
      const found = getCachedKeys().filter((key) => key.args?.tag === tag);

      found.forEach((v) => {
        return mutate(v.key, undefined, true);
      });
    },
    [mutate, getCachedKeys],
  );

  /**
   * Revalidate cached data with page
   * @param {string} tag - tag contained in serialized cache key
   */
  const mutatePage = useCallback(
    ({ page }: MutateParam) => {
      const found = getCachedKeys().filter((key) => key.args?.page === page);

      found.forEach((v) => {
        return mutate(v.key, undefined, true);
      });
    },
    [mutate, getCachedKeys],
  );

  return {
    clearCache,
    getCachedData,
    mutateTag,
    mutatePage,
  };
};

export default useCachedKeys;
