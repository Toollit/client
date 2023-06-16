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
 * Custom authentication hook.
 *
 * @typedef {Object} UseAuthProps
 * @property {string} redirectTo - The URL to redirect if the user is not logged in.
 * @property {string} message - The message to display if the user is not logged in.
 *
 * @typedef {Object} UseAuthReturn
 * @property {boolean} isLoggedIn - Indicates whether the user is logged in or not.
 * @property {string|null} nickname - The nickname of the authenticated user, or null if not logged in.
 *
 * @param {UseAuthProps} params - The parameters for the useAuth hook.
 * @returns {UseAuthReturn} The return value of the useAuth hook.
 */
const useAuth = ({ redirectTo, message }: Props) => {
  const router = useRouter();

  const { cache }: CacheData = useSWRConfig();

  const authUser = cache.get(AUTH_USER)?.data?.data.nickname;
  const isLoggedIn = authUser ? true : false;
  const nickname = authUser ? authUser : null;

  useEffect(() => {
    if (isLoggedIn === false) {
      if (message) {
        alert(message);
      }

      if (redirectTo) {
        router.replace(redirectTo);
      }
    }
  }, [router, isLoggedIn, message, redirectTo]);

  return { isLoggedIn, nickname };
};

export default useAuth;
