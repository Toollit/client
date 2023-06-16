import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Cache, useSWRConfig } from 'swr';
import { AUTH_USER } from '@/apis/keys';
import { AuthAPIRes } from '@/apis/authFetcher';

interface Props {
  redirectTo?: string;
  alertMessage?: string;
}

interface CacheData {
  cache: Cache<AuthAPIRes>;
}

/**
 * Custom authentication hook.
 *
 * @typedef {Object} UseAuthProps
 * @property {string} redirectTo - The URL to redirect if the user is not logged in.
 * @property {string} alertMessage - The alertMessage to display if the user is not logged in.
 *
 * @typedef {Object} UseAuthReturn
 * @property {boolean} isLoggedIn - Indicates whether the user is logged in or not.
 * @property {string|null} nickname - The nickname of the authenticated user, or null if not logged in.
 *
 * @param {UseAuthProps} params - The parameters for the useAuth hook.
 * @returns {UseAuthReturn} The return value of the useAuth hook.
 */
const useAuth = ({ redirectTo, alertMessage }: Props) => {
  const router = useRouter();

  const { cache }: CacheData = useSWRConfig();

  const cacheData = cache.get(AUTH_USER)?.data;

  const authUser = cacheData?.data?.nickname;
  const isLoggedIn = authUser ? true : false;
  const nickname = authUser ? authUser : null;
  const message = cacheData?.message ? cacheData.message : null;

  useEffect(() => {
    if (isLoggedIn === false) {
      if (alertMessage) {
        alert(alertMessage);
      }

      if (redirectTo) {
        router.replace(redirectTo);
      }
    }
  }, [router, isLoggedIn, alertMessage, redirectTo]);

  return { isLoggedIn, nickname, message };
};

export default useAuth;
