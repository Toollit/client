import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import ProfileView, { ViewProps } from './ProfileView';
import useSWR, { Cache } from 'swr';
import { useRouter } from 'next/router';
import type { ScopedMutator } from 'swr/_internal';
import useAuth from '@/hooks/useAuth';
import useLogout from '@/hooks/useLogout';
import useWindowSize from '@/hooks/useWindowSize';
import useCachedKeys from '@/hooks/useCachedKeys';
import { useAppDispatch, useAppSelector } from '@/store';
import { updateProfileTab } from '@/features/profile';
import useUserRegisteredCheckSWR from '@/hooks/useSWR/useUserRegisteredCheckSWR';

interface CachedData<T> {
  cache: Cache<T | undefined>;
  mutate: ScopedMutator;
}

type CustomMemberTypes = ('Developer' | 'Designer' | 'PM' | 'Anyone')[];

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
  const { isLaptop } = useWindowSize();
  const { clearCache } = useCachedKeys();

  const tab = useAppSelector((state) => state.profile.tab);

  const tabs = useRef([
    { name: '프로필', query: 'viewProfile' },
    { name: '프로젝트', query: 'viewProjects' },
    { name: '북마크', query: 'viewBookmarks' },
    { name: '알림', query: 'viewNotifications' },
  ]);

  const [nickname, setNickname] = useState('');
  const { isRegisteredUser } = useUserRegisteredCheckSWR(nickname);

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
      // TODO 이부분 꼭 필요한지 확인하고 필요없으면 삭제하고 필요하면 북마크 오류 어떻게 해결할지 확인
      // clearCache();
    };
  }, [clearCache, dispatch]);

  // useEffect for troubleshooting nickname undefined upon reload or tab movement
  useEffect(() => {
    const nickname = router.query.nickname;
    const currentTab = router.query.tab;

    if (typeof nickname === 'string' && nickname) {
      setNickname(nickname);

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
            pathname: `/profile/${nickname}`,
            query: { tab: 'viewProfile' },
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
    isLaptop: isLaptop ? true : false,
    isMyProfile: nickname === user?.nickname,
    handleSigninLogout,
    signinLogoutText: user?.nickname ? '로그아웃' : '로그인',
    myProfileLink: user?.nickname ? `/profile/${user.nickname}` : '/signin',
    noticeLink: '/notice',
    privacyLink: '/policy/privacy',
    termsOfServiceLink: '/policy/terms-of-service',
    logoLink: '/',
    tabs: tabs.current,
    tab,
    nickname,
    isViewProfileTab: tab === 'viewProfile',
    isViewProjectsTab: tab === 'viewProjects',
    isBookmarksTab: tab === 'viewBookmarks',
    isNotificationsTab: tab === 'viewNotifications',
  };

  return <ProfileView {...props} />;
};

export default ProfileController;
