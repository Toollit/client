import React, { useCallback } from 'react';
import { logoutAPI } from '@/apis/logout';
import useCachedKeys from './useCachedKeys';
import { useRouter } from 'next/router';
import { errorMessage } from '@/apis/errorMessage';

interface LogOut {
  push?: string;
  replace?: string;
}

const useLogout = () => {
  const router = useRouter();

  const { clearCache } = useCachedKeys();

  const logOut = useCallback(
    async ({ push, replace }: LogOut) => {
      try {
        await logoutAPI();

        clearCache();

        if (push) {
          return router.push(push);
        }

        if (replace) {
          return router.replace(replace);
        }
      } catch (error) {
        errorMessage(error);
      }
    },
    [router, clearCache],
  );

  return { logOut };
};

export default useLogout;
