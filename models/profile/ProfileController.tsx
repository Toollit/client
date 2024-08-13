import React, { FC, useCallback, useEffect, useRef } from 'react';
import ProfileView, { ViewProps } from './ProfileView';
import { useRouter } from 'next/router';
import useAuth from '@/hooks/useAuth';
import useLogout from '@/hooks/useLogout';
import useCachedKeys from '@/hooks/useCachedKeys';
import { useAppDispatch, useAppSelector } from '@/store';
import { updateProfileTab, updateProfileNickname } from '@/features/profile';
import useUserRegisteredCheckSWR from '@/hooks/useSWR/useUserRegisteredCheckSWR';

export type ProfileTab =
  | 'viewProfile'
  | 'viewProjects'
  | 'viewBookmarks'
  | 'viewNotifications';

export interface ControllerProps {}

const ProfileController: FC<ControllerProps> = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { logout } = useLogout();
  const { user } = useAuth();
  const { mutatePage } = useCachedKeys();

  const tab = useAppSelector((state) => state.profile.tab);
  const userNickname = useAppSelector((state) => state.profile.userNickname);

  const tabs = useRef([
    { name: '프로필', query: 'viewProfile' },
    { name: '프로젝트', query: 'viewProjects' },
    { name: '북마크', query: 'viewBookmarks' },
    { name: '알림', query: 'viewNotifications' },
  ]);

  const { isRegisteredUser } = useUserRegisteredCheckSWR(
    true,
    userNickname,
    {},
  );

  const handleSigninLogout = useCallback(async () => {
    const isSignedIn = user?.nickname;

    if (isSignedIn) {
      return await logout({ push: '/' });
    }

    if (!isSignedIn) {
      return router.push('/signin');
    }
  }, [router, user, logout]);

  useEffect(() => {
    return () => {
      mutatePage({ page: '/profile' });
    };
  }, [dispatch, mutatePage]);

  // useEffect for troubleshooting nickname undefined upon reload or tab movement
  useEffect(() => {
    const nickname = router.query.nickname;
    const currentTab = router.query.tab;

    if (typeof nickname === 'string' && nickname) {
      dispatch(updateProfileNickname({ userNickname: nickname }));

      if (
        !(
          currentTab === 'viewProfile' ||
          currentTab === 'viewProjects' ||
          currentTab === 'viewBookmarks' ||
          currentTab === 'viewNotifications'
        )
      ) {
        (async () => {
          router.replace({
            pathname: '/profile',
            query: { nickname, tab: 'viewProfile' },
          });

          dispatch(updateProfileTab({ tab: 'viewProfile' }));
        })();
      } else {
        dispatch(updateProfileTab({ tab: currentTab }));
      }
    }
  }, [router, dispatch]);

  const props: ViewProps = {
    isRegisteredUser,
    isMyProfile: userNickname === user?.nickname,
    handleSigninLogout,
    signinLogoutText: user?.nickname ? '로그아웃' : '로그인',
    myProfileLink: user?.nickname ? `/profile/${user.nickname}` : '/signin',
    noticeLink: '/notice',
    privacyLink: '/policy/privacy',
    termsOfServiceLink: '/policy/terms-of-service',
    logoLink: '/',
    tabs: tabs.current,
    tab,
    nickname: userNickname,
    isViewProfileTab: tab === 'viewProfile',
    isViewProjectsTab: tab === 'viewProjects',
    isBookmarksTab: tab === 'viewBookmarks',
    isNotificationsTab: tab === 'viewNotifications',
  };

  return <ProfileView {...props} />;
};

export default ProfileController;
