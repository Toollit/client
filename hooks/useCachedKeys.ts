import React, { useCallback, useRef, useEffect } from 'react';
import { useSWRConfig } from 'swr';

interface CachedKeysRefs {
  key: string;
  url: string;
  args: { page: string; tag: string };
}

interface MutateProps {
  [key: string]: string;
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

  const mutateCachedKeysWithTag = useCallback(
    ({ tag }: MutateProps) => {
      const found = cachedKeysRefs.current.filter(
        (key) => key.args.tag === tag,
      );

      found.forEach((v) => {
        return mutate(v.key);
      });
    },
    [mutate],
  );

  const mutateCachedKeysWithPage = useCallback(
    ({ page }: MutateProps) => {
      const found = cachedKeysRefs.current.filter(
        (key) => key.args.page === page,
      );

      found.forEach((v) => {
        return mutate(v.key);
      });
    },
    [mutate],
  );

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
    mutateCachedKeysWithTag,
    mutateCachedKeysWithPage,
    revalidatePageCache,
    revalidateTagCache,
  };
};

export default useCachedKeys;
