import React, { useEffect } from 'react';
import useSWR from 'swr';
import { AUTH_USER } from '@/apis/keys';
import { authFetcher } from '@/apis/authFetcher';
import { useRouter } from 'next/router';

/**
 * check user authentication hooks.
 */
const useAuth = () => {
  const router = useRouter();
  const { data, isLoading } = useSWR(AUTH_USER, authFetcher);

  const authUserNickname = data?.data.nickname;
  const isAuthenticated = authUserNickname ? true : false;
  const nickname = authUserNickname ? authUserNickname : null;
  const message = data?.message ? data.message : null;

  useEffect(() => {
    //temporary password login user check
    if (message === 'needResetPassword') {
      // prevent infinite routing loop
      if (router.pathname !== '/resetPassword') {
        router.replace('/resetPassword');
      }
    }
  }, [router, message]);

  return { isLoading, isAuthenticated, nickname, message };
};

export default useAuth;
