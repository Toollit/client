import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Cache, useSWRConfig } from 'swr';
import { AUTH_USER } from '@/apis/keys';
import { AuthAPIRes } from '@/apis/authFetcher';

interface Props {
  redirectTo?: string;
  message?: string;
}

interface CacheData {
  cache: Cache<AuthAPIRes>;
}

/**
 * @param redirectTo - redirect url if user is not loggedIn
 * @param message - show message if user is not loggedIn
 *
 * *Description: redirectTo, message params is optional. If you do not pass anything to params, return the value that only user logged in or not.
 */
const useAuth = ({ redirectTo, message }: Props) => {
  const router = useRouter();

  const { cache }: CacheData = useSWRConfig();

  const isLoggedIn = cache.get(AUTH_USER)?.data?.data.nickname;

  useEffect(() => {
    if (isLoggedIn === null) {
      if (message) {
        alert(message);
      }

      if (redirectTo) {
        router.replace(redirectTo);
      }
    }
  }, [router, isLoggedIn, message, redirectTo]);

  return isLoggedIn;
};

export default useAuth;
