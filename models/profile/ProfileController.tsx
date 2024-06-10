import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import ProfileView, { ViewProps } from './ProfileView';
import useSWR, { Cache } from 'swr';
import { profileImageKey, userExistCheckKey } from '@/apis/keys';
import { useRouter } from 'next/router';
import { errorMessage } from '@/apis/errorMessage';
import { updateProfileAPI } from '@/apis/updateProfile';
import { profileImageFetcher } from '@/apis/profileImageFetcher';
import type { ScopedMutator } from 'swr/_internal';
import useAuth from '@/hooks/useAuth';
import useLogout from '@/hooks/useLogout';
import { serialize } from '@/middleware/swr/serialize';
import useTooltip from '@/hooks/useTooltip';
import { userExistCheckFetcher } from '@/apis/userExistCheckFetcher';
import useWindowSize from '@/hooks/useWindowSize';
import useCachedKeys from '@/hooks/useCachedKeys';

interface CachedData<T> {
  cache: Cache<T | undefined>;
  mutate: ScopedMutator;
}

type CustomMemberTypes = ('Developer' | 'Designer' | 'PM' | 'Anyone')[];

export type ProfileTab =
  | 'viewProfile'
  | 'viewProjects'
  | 'viewBookmarks'
  | 'viewNotifications'
  | undefined;

export interface ControllerProps {}

const ProfileController: FC<ControllerProps> = () => {
  const router = useRouter();
  const { logOut } = useLogout();
  const { user, authMutate } = useAuth();
  const {
    tooltipAnchorEl,
    setTooltipAnchorEl,
    tooltipOpen,
    handleTooltipOpen,
    handleTooltipClose,
  } = useTooltip();
  const { isLaptop } = useWindowSize();
  const { clearCache } = useCachedKeys();

  const [nickname, setNickname] = useState('');
  const [currentTab, setCurrentTab] = useState<ProfileTab>();

  const tabs = useRef([
    { name: '프로필', query: 'viewProfile' },
    { name: '프로젝트', query: 'viewProjects' },
    { name: '북마크', query: 'viewBookmarks' },
    { name: '알림', query: 'viewNotifications' },
  ]);

  const profileImgRef = useRef<HTMLInputElement>(null);

  // User exist check fetcher
  const { data: userExistCheckData } = useSWR(
    nickname && {
      url: userExistCheckKey(nickname),
      args: {
        page: '/profile',
        tag: 'userExistCheck',
      },
    },
    userExistCheckFetcher,
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

  // Profile image fetcher
  const {
    data: profileImageData,
    mutate: profileImageMutate,
    isLoading: isProfileImageLoading,
  } = useSWR(
    userExistCheckData?.data.existUser && nickname && currentTab
      ? {
          url: profileImageKey(nickname),
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

  const handleLogInOut = useCallback(async () => {
    const isLoggedIn = user?.nickname;

    if (isLoggedIn) {
      return await logOut({ push: '/' });
    }

    if (!isLoggedIn) {
      return router.push('/login');
    }
  }, [router, user, logOut]);

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
    } catch (error) {
      errorMessage(error);
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
      } catch (error) {
        errorMessage(error);
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
    };
  }, [clearCache]);

  // Create to resolve cases where the currentTab is not set or is set strangely when loading a page
  useEffect(() => {
    const nickname = router.query.nickname as string | undefined;
    const currentTab = router.query.tab as
      | 'viewProfile'
      | 'viewProjects'
      | 'viewBookmarks'
      | 'viewNotifications'
      | undefined;

    if (nickname && currentTab === undefined) {
      (async () => {
        return router.replace({
          pathname: `/profile/${nickname}`,
          query: { tab: 'viewProfile' },
        });
      })();
    }

    if (
      nickname &&
      !(
        currentTab === 'viewProfile' ||
        currentTab === 'viewProjects' ||
        currentTab === 'viewBookmarks' ||
        currentTab === 'viewNotifications'
      )
    ) {
      (async () => {
        return router.replace({
          pathname: `/profile/${nickname}`,
          query: { tab: 'viewProfile' },
        });
      })();
    } else {
      setCurrentTab(currentTab);
    }
  }, [router, authMutate]);

  // useEffect for troubleshooting nickname undefined upon reload or tab movement
  useEffect(() => {
    const nickname = router.query.nickname;

    if (nickname !== undefined && typeof nickname === 'string') {
      setNickname(nickname);
    }
  }, [router]);

  const props: ViewProps = {
    isProfileImageLoading,
    isLaptop,
    isExistUser: userExistCheckData?.data.existUser,
    accessUser: user?.nickname,
    me: nickname === user?.nickname,
    loginState: user?.nickname,
    tabs: tabs.current,
    currentTab,
    profileImageData: profileImageData?.data?.profileImage,
    nickname,
    handleLogInOut,
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
  };

  return <ProfileView {...props} />;
};

export default ProfileController;
