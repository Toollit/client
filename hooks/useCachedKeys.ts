import React, { useCallback, useRef, useEffect } from 'react';
import { useSWRConfig } from 'swr';

/**
 * handle swr cache key hooks
 */
const useCachedKeys = () => {
  const { mutate, cache } = useSWRConfig();

  const cachedKeysRefs = useRef<string[]>([]);

  const clearCache = useCallback(() => {
    for (let i = 0; i < cachedKeysRefs.current.length; i++) {
      // revalidate all keys
      mutate(cachedKeysRefs.current[i], undefined, true);
    }
  }, [mutate]);

  useEffect(() => {
    const cachedKeys = cache.keys();

    for (let key of cachedKeys) {
      cachedKeysRefs.current = [...cachedKeysRefs.current, key];
    }
  }, [cache]);

  return {
    cachedKeys: cachedKeysRefs.current,
    clearCache,
  };
};

export default useCachedKeys;
