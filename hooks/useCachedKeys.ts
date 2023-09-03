import React, { useCallback, useRef, useEffect } from 'react';
import { useSWRConfig } from 'swr';

interface CustomCachedKeys {
  key: string;
  url: string;
  args: { page: string; tag: string };
}

interface FunctionProps {
  [key: string]: string;
}

/**
 * swr cache keys handle hooks
 */
const useCachedKeys = () => {
  const { mutate, cache } = useSWRConfig();

  const clearCache = useCallback(() => {
    const cachedKeys = cache.keys();

    for (let key of cachedKeys) {
      cache.delete(key);
    }
  }, [cache]);

  const getCustomCachedKeys = useCallback(() => {
    const cachedKeys = cache.keys();

    const keys = Array.from(cachedKeys);

    let customCachedKeys: CustomCachedKeys[] = [];

    for (let i = 0; i < keys.length; i++) {
      customCachedKeys.push({ key: keys[i], ...JSON.parse(keys[i]) });
    }

    return customCachedKeys;
  }, [cache]);

  const getCachedKeyWithTag = useCallback(
    ({ tag }: FunctionProps) => {
      const found = getCustomCachedKeys().find((key) => key.args?.tag === tag);

      const key = found?.key;

      return key;
    },
    [getCustomCachedKeys],
  );

  const getCachedDataWithKey = useCallback(
    ({ key }: FunctionProps) => {
      const cachedData = cache.get(key)?.data?.data;

      return cachedData;
    },
    [cache],
  );

  const mutateCachedKeysWithTag = useCallback(
    ({ tag }: FunctionProps) => {
      const found = getCustomCachedKeys().filter(
        (key) => key.args?.tag === tag,
      );

      found.forEach((v) => {
        return mutate(v.key, undefined, true);
      });
    },
    [mutate, getCustomCachedKeys],
  );

  const mutateCachedKeysWithPage = useCallback(
    ({ page }: FunctionProps) => {
      const found = getCustomCachedKeys().filter(
        (key) => key.args?.page === page,
      );

      found.forEach((v) => {
        return mutate(v.key, undefined, true);
      });
    },
    [mutate, getCustomCachedKeys],
  );

  return {
    clearCache,
    getCustomCachedKeys,
    getCachedKeyWithTag,
    getCachedDataWithKey,
    mutateCachedKeysWithTag,
    mutateCachedKeysWithPage,
  };
};

export default useCachedKeys;
