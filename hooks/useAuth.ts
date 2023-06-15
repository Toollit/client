import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Cache, useSWRConfig } from 'swr';
import { AUTH_USER } from '@/apis/keys';
import { AuthAPIRes } from '@/apis/authFetcher';

interface Props {
  redirectTo: string;
  message?: string;
}

interface CacheData {
  cache: Cache<AuthAPIRes>;
}

const useAuth = ({ redirectTo, message }: Props) => {
  const router = useRouter();

  const { cache }: CacheData = useSWRConfig();

  const isLoggedIn = cache.get(AUTH_USER)?.data?.data.nickname;

  useEffect(() => {
    if (isLoggedIn === null) {
      if (message) {
        alert(message);
      }

      router.replace(redirectTo);
    }
  }, [router, isLoggedIn, message, redirectTo]);

  return isLoggedIn;
};

export default useAuth;
