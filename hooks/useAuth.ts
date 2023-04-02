import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { authAPI } from '@/apis/auth';
import { updateUser } from '@/features/user';

interface UseAuthProps {
  authUserAccess: boolean;
  notAuthUserAccess: boolean;
}

/**
 * * Notice - SSR을 통해 검색엔진에 검색이 되어야하는 페이지에서는 모든 parameter 값은 true로 전달해야한다.
 * @param authUserAccess - 인증된 사용자 페이지 접근 가능 여부
 * @param notAuthUserAccess - 인증되지 않은 사용자 페이지 접근 가능 여부
 */
const useAuth = ({ authUserAccess, notAuthUserAccess }: UseAuthProps) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const response = await authAPI();

      if (response?.success) {
        if (response.message === 'needResetPassword') {
          // prevent infinite routing loop
          if (router.pathname === '/resetPassword') {
            return;
          } else {
            return router.replace('/resetPassword', undefined, {
              shallow: true,
            });
          }
        }

        // 로그인 유저 접근 불가
        if (!authUserAccess) {
          return router.back();
        }

        const { nickname } = response.data;
        setIsAuthenticated(true);
        dispatch(updateUser({ nickname, isAuthenticated: true }));
      } else {
        // 비로그인 유저 접근 불가
        if (!notAuthUserAccess) {
          return router.replace('/login');
        }

        setIsAuthenticated(false);
        dispatch(updateUser({ nickname: null, isAuthenticated: false }));
      }
    })();
  }, [router, dispatch, authUserAccess, notAuthUserAccess]);

  return isAuthenticated;
};

export default useAuth;
