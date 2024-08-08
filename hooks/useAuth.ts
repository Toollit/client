import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWRImmutable from 'swr/immutable';
import { authUserKey } from '@/apis/keys';
import { authFetcher } from '@/apis/fetcher/authFetcher';
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

  const isAuthenticated = response?.success;
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
    if (isAuthenticated && user?.nickname === null) {
      // Prevent infinite routing loop
      if (router.pathname !== '/signup/nickname/initialize') {
        router.replace('/signup/nickname/initialize');
      }
    }
  }, [router, user, isAuthenticated]);

  useEffect(() => {
    handleTemporaryPasswordUser();
    handleInitialNicknameSetup();
  }, [handleTemporaryPasswordUser, handleInitialNicknameSetup]);

  return { isLoading, isAuthenticated, user, authMutate };
};

export default useAuth;
