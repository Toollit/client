import React from 'react';
import useSWR from 'swr';
import { AUTH_USER } from '@/apis/keys';
import { authFetcher } from '@/apis/authFetcher';

/**
 * check user authentication hooks.
 */
const useAuth = () => {
  const { data, isLoading } = useSWR(AUTH_USER, authFetcher, {
    dedupingInterval: 60 * 1000,
  });

  const authUserNickname = data?.data.nickname;
  const isAuthenticated = authUserNickname ? true : false;
  const nickname = authUserNickname ? authUserNickname : null;
  const message = data?.message ? data.message : null;

  return { isLoading, isAuthenticated, nickname, message };
};

export default useAuth;
