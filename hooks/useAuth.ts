import React from 'react';
import { Cache, useSWRConfig } from 'swr';
import { AUTH_USER } from '@/apis/keys';
import { AuthAPIRes } from '@/apis/authFetcher';

interface CacheData {
  cache: Cache<AuthAPIRes>;
}

/**
 * check user authentication hooks.
 */
const useAuth = () => {
  const { cache }: CacheData = useSWRConfig();

  const cacheData = cache.get(AUTH_USER)?.data;

  const authUser = cacheData?.data?.nickname;
  const isAuthenticated = authUser ? true : false;
  const isLoading = authUser === undefined ? true : false;
  const nickname = authUser ? authUser : null;
  const message = cacheData?.message ? cacheData.message : null;

  return { isLoading, isAuthenticated, nickname, message };
};

export default useAuth;
