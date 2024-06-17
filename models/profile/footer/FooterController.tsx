import React, { FC, useCallback } from 'react';
import FooterView, { ViewProps } from './FooterView';
import { useRouter } from 'next/router';
import useLogout from '@/hooks/useLogout';
import useAuth from '@/hooks/useAuth';
import { useAppSelector } from '@/store';

export interface ControllerProps {}

const FooterController: FC<ControllerProps> = ({}) => {
  const router = useRouter();
  const { logout } = useLogout();
  const { user } = useAuth();

  const profileUserNickname = useAppSelector(
    (state) => state.profile.userNickname,
  );

  const handleSignInOut = useCallback(async () => {
    const isSignedIn = user?.nickname;

    if (isSignedIn) {
      return await logout({ push: '/' });
    }

    if (!isSignedIn) {
      return router.push('/signin');
    }
  }, [router, user, logout]);

  const props: ViewProps = {
    isMyProfile: profileUserNickname === user?.nickname,
    handleSignInOut,
    signInOutText: user?.nickname ? '로그아웃' : '로그인',
    myProfileLink: user?.nickname ? `/profile/${user.nickname}` : '/signin',
    noticeLink: '/notice',
    privacyLink: '/policy/privacy',
    termsOfServiceLink: '/policy/terms-of-service',
    logoLink: '/',
  };

  return <FooterView {...props} />;
};

export default FooterController;
