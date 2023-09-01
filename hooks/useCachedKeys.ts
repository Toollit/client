import React, { useCallback, useRef, useEffect } from 'react';
import { useSWRConfig } from 'swr';

interface CachedKeysRefs {
  key: string;
  url: string;
  args: { page: string; tag: string };
}

/**
 * swr cache keys handle hooks
 */
const useCachedKeys = () => {
  const { mutate, cache } = useSWRConfig();

  const cachedKeysRefs = useRef<CachedKeysRefs[]>([]);

  const clearCache = useCallback(() => {
    const cachedKeys = cache.keys();

    for (let key of cachedKeys) {
      cache.delete(key);
    }
  }, [cache]);

  const revalidateCache = useCallback(
    ({ page, tag }: { page?: string; tag?: string }) => {
      const keysValueObj = cachedKeysRefs.current;

      if (page) {
        const filtered = keysValueObj.filter((v) => v.args?.page === page);

        filtered.forEach((v) => {
          mutate(v.key, undefined, true);
        });
      }

      if (tag) {
        const filtered = keysValueObj.filter((v) => v.args?.tag === tag);

        filtered.forEach((v) => {
          mutate(v.key, undefined, true);
        });
      }
    },
    [mutate],
  );

  useEffect(() => {
    const cachedKeys = cache.keys();
    // console.log('cachedKeysRefs.current ===>', cachedKeys);
    // for (let key of cachedKeys) {
    //   cachedKeysRefs.current = [...cachedKeysRefs.current, key];
    // }

    // for (let key of cachedKeys) {
    //   console.log(JSON.parse(key));
    // }

    const keys = Array.from(cachedKeys);

    for (let i = 0; i < keys.length; i++) {
      cachedKeysRefs.current = [
        ...cachedKeysRefs.current,
        { key: keys[i], ...JSON.parse(keys[i]) },
      ];
    }

    // console.log('cachedKeysRefs.current ===>', cachedKeys);
  }, [cache]);

  return {
    cachedKeys: cachedKeysRefs.current,
    clearCache,
    revalidateCache,
  };
};

export default useCachedKeys;
