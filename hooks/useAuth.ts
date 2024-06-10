import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWRImmutable from 'swr/immutable';
import { authUserKey } from '@/apis/keys';
import { authFetcher } from '@/apis/authFetcher';
import { serialize } from '@/middleware/swr/serialize';

/**
 * check user authentication hooks.
 */
const useAuth = () => {
  const router = useRouter();

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
  const user = response?.data;

  const handleTemporaryPasswordUser = useCallback(() => {
    if (user?.needResetPassword === true) {
      // Prevent infinite routing loop
      if (router.pathname !== '/resetPassword') {
        router.replace('/resetPassword');
      }
    }
  }, [router, user]);

  const handleInitialNicknameSetup = useCallback(() => {
    if (isAuthenticated && nickname === null) {
      // Prevent infinite routing loop
      if (router.pathname !== '/signUp/settings/nickname') {
        router.replace('/signUp/settings/nickname');
      }
    }
  }, [router, nickname, isAuthenticated]);

  useEffect(() => {
    handleTemporaryPasswordUser();
    handleInitialNicknameSetup();
  }, [handleTemporaryPasswordUser, handleInitialNicknameSetup]);

  return { isLoading, isAuthenticated, nickname, user, authMutate };
};

export default useAuth;
