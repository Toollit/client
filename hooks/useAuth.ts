import React from 'react';
import useSWRImmutable from 'swr/immutable';
import { authUserKey } from '@/apis/keys';
import { authFetcher } from '@/apis/authFetcher';
import { serialize } from '@/middleware/swr/serialize';

/**
 * check user authentication hooks.
 */
const useAuth = () => {
  const {
    data: response,
    isLoading,
    mutate: authMutate,
  } = useSWRImmutable(
    { url: authUserKey, args: { page: '*', tag: 'auth' } },
    authFetcher,
    {
      use: [serialize],
    },
  );

  const authUserNickname = response?.data.nickname;
  const isAuthenticated = response?.success;
  const nickname = authUserNickname ? authUserNickname : null;
  const data = response?.data ? response.data : null;

  return { isLoading, isAuthenticated, nickname, data, authMutate };
};

export default useAuth;
