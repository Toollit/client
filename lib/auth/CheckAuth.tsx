import { useEffect } from 'react';
import { NextComponentType } from 'next';
import { useRouter } from 'next/router';
import { authAPI } from 'apis/auth';
import useCheckUserAgent from 'hooks/useCheckUserAgent';
import { updateUser } from 'features/user';
import { useDispatch } from 'react-redux';

interface CheckAuthProps {
  Component: NextComponentType;
  Props: any;
}

const CheckAuth = ({ Component, Props }: CheckAuthProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  useCheckUserAgent();

  useEffect(() => {
    (async () => {
      const path = router.pathname;
      const response = await authAPI();

      if (response?.success) {
        const { email, nickname } = response.data;

        dispatch(updateUser({ email, nickname }));

        if (response.message === 'needResetPassword') {
          // prevent infinite routing loop
          if (router.pathname === '/resetPassword') {
            return;
          } else {
            return router.replace('/resetPassword');
          }
        }

        switch (path) {
          case '/signup':
            router.replace('/');
            break;

          case '/signup/emailAuth':
            router.replace('/');
            break;

          case '/login':
            router.replace('/');
            break;

          case '/pwInquiry':
            router.replace('/');
            break;

          case '/resetPassword':
            router.replace('/');
            break;

          default:
            break;
        }
      } else {
        switch (path) {
          case '/resetPassword':
            router.replace('/');
            break;

          default:
            break;
        }
      }
    })();
  }, [router, dispatch]);

  return <Component {...Props.pageProps} />;
};

export default CheckAuth;
