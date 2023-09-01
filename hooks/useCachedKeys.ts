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

  const revalidatePageCache = useCallback(
    ({ page }: { page: string }) => {
      const filtered = cachedKeysRefs.current.filter(
        (v) => v.args?.page === page,
      );

      filtered.forEach((v) => {
        mutate(v.key, undefined, true);
      });
    },
    [mutate],
  );

  const revalidateTagCache = useCallback(
    ({ tag }: { tag: string }) => {
      const filtered = cachedKeysRefs.current.filter(
        (v) => v.args?.tag === tag,
      );

      filtered.forEach((v) => {
        mutate(v.key, undefined, true);
      });
    },
    [mutate],
  );

  useEffect(() => {
    const cachedKeys = cache.keys();

    const keys = Array.from(cachedKeys);

    for (let i = 0; i < keys.length; i++) {
      cachedKeysRefs.current = [
        ...cachedKeysRefs.current,
        { key: keys[i], ...JSON.parse(keys[i]) },
      ];
    }
  }, [cache]);

  return {
    cachedKeys: cachedKeysRefs.current,
    clearCache,
    revalidatePageCache,
    revalidateTagCache,
  };
};

export default useCachedKeys;
