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
    data,
    isLoading,
    mutate: authMutate,
  } = useSWRImmutable(
    { url: authUserKey, args: { page: '*', tag: 'auth' } },
    authFetcher,
    {
      use: [serialize],
    },
  );

  const authUserNickname = data?.data.nickname;
  const isAuthenticated = data?.success;
  const nickname = authUserNickname ? authUserNickname : null;
  const message = data?.message ? data.message : null;

  return { isLoading, isAuthenticated, nickname, message, authMutate };
};

export default useAuth;
