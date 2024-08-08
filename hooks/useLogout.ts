import React, { useCallback } from 'react';
import { logoutAPI } from '@/apis/auth/logout';
import useCachedKeys from '@/hooks/useCachedKeys';
import { useRouter } from 'next/router';
import { errorMessage } from '@/apis/config/errorMessage';
import { useAppDispatch } from '@/store';
import { loading } from '@/features/loading';

interface LogOut {
  push?: string;
  replace?: string;
}

/**
 * logout hooks
 * delete user authentication cookies
 * delete swr cached data(revalidate all SWR keys)
 */
const useLogout = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { clearCache } = useCachedKeys();

  const logout = useCallback(
    async ({ push, replace }: LogOut) => {
      try {
        dispatch(loading({ status: true }));

        await logoutAPI();

        clearCache();

        if (push) {
          router.push(push);
        }

        if (replace) {
          router.replace(replace);
        }

        return router.events.on('routeChangeComplete', () => {
          dispatch(loading({ status: false }));
        });
      } catch (error) {
        dispatch(loading({ status: false }));
        errorMessage(error);
      }
    },
    [router, clearCache, dispatch],
  );

  return { logout };
};

export default useLogout;
