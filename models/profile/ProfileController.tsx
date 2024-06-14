import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import ProfileView, { ViewProps } from './ProfileView';
import useSWR, { Cache } from 'swr';
import { profileImageKey, userRegisteredCheckKey } from '@/apis/keys';
import { useRouter } from 'next/router';
import { errorMessage } from '@/apis/errorMessage';
import { updateProfileAPI } from '@/apis/updateProfile';
import { profileImageFetcher } from '@/apis/profileImageFetcher';
import type { ScopedMutator } from 'swr/_internal';
import useAuth from '@/hooks/useAuth';
import useLogout from '@/hooks/useLogout';
import { serialize } from '@/middleware/swr/serialize';
import useTooltip from '@/hooks/useTooltip';
import { userRegisteredCheckFetcher } from '@/apis/userRegisteredCheckFetcher';
import useWindowSize from '@/hooks/useWindowSize';
import useCachedKeys from '@/hooks/useCachedKeys';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  updateProfileRegisteredUserStatus,
  updateProfileUserNickname,
  updateProfileTab,
} from '@/features/profile';

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
  const {
    tooltipAnchorEl,
    setTooltipAnchorEl,
    tooltipOpen,
    handleTooltipOpen,
    handleTooltipClose,
  } = useTooltip();
  const { isLaptop } = useWindowSize();
  const { clearCache } = useCachedKeys();
  const profileUserNickname = useAppSelector(
    (state) => state.profile.userNickname,
  );
  const tab = useAppSelector((state) => state.profile.tab);

  const tabs = useRef([
    { name: '프로필', query: 'viewProfile' },
    { name: '프로젝트', query: 'viewProjects' },
    { name: '북마크', query: 'viewBookmarks' },
    { name: '알림', query: 'viewNotifications' },
  ]);

  const profileImgRef = useRef<HTMLInputElement>(null);

  // User exist check fetcher
  const { data: userRegisteredCheckData } = useSWR(
    profileUserNickname && {
      url: userRegisteredCheckKey(profileUserNickname),
      args: {
        page: '/profile',
        tag: 'userRegisteredCheck',
      },
    },
    userRegisteredCheckFetcher,
    {
      dedupingInterval: 1000 * 60 * 10,
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      onError(err, key, config) {
        dispatch(
          updateProfileRegisteredUserStatus({ isRegisteredUser: false }),
        );
        router.replace('/');
        errorMessage(err);
      },
      onSuccess(data, key, config) {
        dispatch(updateProfileRegisteredUserStatus({ isRegisteredUser: true }));
      },
      use: [serialize],
    },
  );

  // Profile image fetcher
  const {
    data: profileImageData,
    mutate: profileImageMutate,
    isLoading: isProfileImageLoading,
  } = useSWR(
    userRegisteredCheckData?.data.registeredUser && profileUserNickname && tab
      ? {
          url: profileImageKey(profileUserNickname),
          args: {
            page: '/profile',
            tag: 'profileImage',
          },
        }
      : null,
    profileImageFetcher,
    {
      dedupingInterval: 1000 * 60 * 10,
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      onError(err, key, config) {
        router.replace('/');
        errorMessage(err);
      },
      use: [serialize],
    },
  );

  const handleSignInOut = useCallback(async () => {
    const isLoggedIn = user?.nickname;

    if (isLoggedIn) {
      return await logout({ push: '/' });
    }

    if (!isLoggedIn) {
      return router.push('/login');
    }
  }, [router, user, logout]);

  const handleTooltipModify = useCallback(() => {
    setTooltipAnchorEl(null);

    profileImgRef.current?.click();
  }, [setTooltipAnchorEl]);

  const handleTooltipDelete = useCallback(async () => {
    setTooltipAnchorEl(null);

    try {
      await updateProfileAPI({
        category: 'profileImage',
        data: 'delete',
      });

      profileImageMutate();
    } catch (err) {
      errorMessage(err);
    }
  }, [profileImageMutate, setTooltipAnchorEl]);

  const uploadProfileImage = useCallback(
    async (File: File) => {
      const formData = new FormData();
      formData.append('profileImage', File);

      try {
        await updateProfileAPI({
          category: 'profileImage',
          data: formData,
          option: {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        });

        profileImageMutate();
      } catch (err) {
        errorMessage(err);
      }
    },
    [profileImageMutate],
  );

  const handleChangeProfileImg = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files) {
        return;
      }

      const file = event.target.files[0];

      uploadProfileImage(file);
    },
    [uploadProfileImage],
  );

  useEffect(() => {
    return () => {
      clearCache();
      dispatch(updateProfileRegisteredUserStatus({ isRegisteredUser: false }));
    };
  }, [clearCache, dispatch]);

  // useEffect for troubleshooting nickname undefined upon reload or tab movement
  useEffect(() => {
    const nickname = router.query.nickname;
    const currentTab = router.query.tab;

    if (typeof nickname === 'string' && nickname) {
      dispatch(updateProfileUserNickname({ userNickname: nickname }));

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
    isProfileImageLoading,
    profileImageData: profileImageData?.data?.profileImage,
    isLaptop: isLaptop ? true : false,
    isMyProfile: profileUserNickname === user?.nickname,
    handleSignInOut,
    signInOutText: user?.nickname ? '로그아웃' : '로그인',
    myProfileLink: user?.nickname ? `/profile/${user.nickname}` : '/login',
    noticeLink: '/notice',
    privacyLink: '/policy/privacy',
    termsOfServiceLink: '/policy/terms-of-service',
    logoLink: '/',
    tabs: tabs.current,
    tab,
    nickname: profileUserNickname,
    profileImgRef,
    handleChangeProfileImg,
    handleTooltipOpen,
    tooltip: {
      items: [
        {
          text: '수정',
          handler: handleTooltipModify,
        },
        {
          text: '삭제',
          handler: handleTooltipDelete,
        },
      ],
      anchorEl: tooltipAnchorEl,
      open: tooltipOpen,
      onClose: handleTooltipClose,
    },
    isViewProfileTab: tab === 'viewProfile',
    isViewProjectsTab: tab === 'viewProjects',
    isBookmarksTab: tab === 'viewBookmarks',
    isNotificationsTab: tab === 'viewNotifications',
  };

  return <ProfileView {...props} />;
};

export default ProfileController;
