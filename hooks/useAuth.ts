import React from 'react';
import useSWRImmutable from 'swr/immutable';
import { authUserKey } from '@/apis/keys';
import { authFetcher } from '@/apis/authFetcher';

/**
 * check user authentication hooks.
 */
const useAuth = () => {
  const {
    data,
    isLoading,
    mutate: authMutate,
  } = useSWRImmutable(authUserKey, authFetcher);

  const authUserNickname = data?.data.nickname;
  const isAuthenticated = authUserNickname ? true : false;
  const nickname = authUserNickname ? authUserNickname : null;
  const message = data?.message ? data.message : null;

  return { isLoading, isAuthenticated, nickname, message, authMutate };
};

export default useAuth;
