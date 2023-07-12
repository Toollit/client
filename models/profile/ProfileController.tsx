import React, { useCallback, useEffect, useState } from 'react';
import ProfileView, { ProfileViewProps } from './ProfileView';
import useSWR from 'swr';
import { AUTH_USER, GET_USER_PROFILE_API_ENDPOINT } from '@/apis/keys';
import {
  MyProfile,
  UserProfile,
  profileInfoFetcher,
} from '@/apis/profileInfoFetcher';
import { useRouter } from 'next/router';
import { errorMessage } from '@/apis/errorMessage';
import { logoutAPI } from '@/apis/logout';
import useWindowSize from '@/hooks/useWindowSize';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { updateProfileAPI } from '@/apis/updateProfile';
import { authFetcher } from '@/apis/authFetcher';
import { changeDateFormat } from '@/utils/changeDateFormat';
import {
  open as openDialog,
  close as closeDialog,
  update,
} from '@/features/dialog';
import useAuth from '@/hooks/useAuth';
import { useSWRConfig } from 'swr';
import Hashtag from '@/components/commons/hashtag';

const ProfileController = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { mutate } = useSWRConfig();

  const currentTabIndex = useSelector(
    (state: RootState) => state.swipeableView.tabIndex,
  );
  const updatePage = useSelector((state: RootState) => state.dialog.page);
  const updateCategory = useSelector(
    (state: RootState) => state.dialog.update?.category,
  );
  const updateNewValue = useSelector(
    (state: RootState) => state.dialog.update?.newValue,
  );

  const [profileNickname, setProfileNickname] = useState('');
  const [isLoadedData, setIsLoadedData] = useState({
    viewProfile: false,
    viewProjects: false,
    viewBookmarks: false,
  });
  const [tabs] = useState([
    { name: '내프로필', query: 'viewProfile' },
    { name: '프로젝트', query: 'viewProjects' },
    { name: '북마크', query: 'viewBookmarks' },
  ]);

  const nickname = router.query.nickname;
  const currentTab = router.query.tab as
    | 'viewProfile'
    | 'viewProjects'
    | 'viewBookmarks'
    | undefined;

  const { data: user, mutate: userMutate } = useSWR(AUTH_USER, authFetcher);

  const { data: profileData, mutate: profileMutate } = useSWR(
    nickname && currentTab
      ? `${GET_USER_PROFILE_API_ENDPOINT}/${nickname}?tab=${currentTab}`
      : null,
    profileInfoFetcher,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      onError(err, key, config) {
        errorMessage(err);
        router.replace('/');
      },
      onSuccess(data, key, config) {
        if (typeof currentTab !== 'undefined') {
          setIsLoadedData((prev) => {
            return {
              ...prev,
              [currentTab]: true,
            };
          });
        }
      },
    },
  );

  const handleLogInOut = useCallback(async () => {
    const isLoggedIn = user?.data?.nickname;

    if (isLoggedIn) {
      try {
        await logoutAPI();

        mutate(AUTH_USER);

        router.push('/');
      } catch (error) {
        errorMessage(error);
      }
    }

    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [router, user, mutate]);

  const handleUpdateProfile = useCallback(async () => {
    if (updateNewValue === null || updateNewValue === undefined) {
      return;
    }

    try {
      if (updateCategory === 'nickname') {
        const response = await updateProfileAPI({
          category: 'nickname',
          data: updateNewValue,
        });

        userMutate();

        const nickname = response?.data.nickname;

        if (nickname) {
          router.replace(`/profile/${nickname}?tab=viewProfile`);
        }

        return dispatch(closeDialog());
      }

      if (
        updateCategory === 'introduce' ||
        updateCategory === 'onOffline' ||
        updateCategory === 'place' ||
        updateCategory === 'contactTime' ||
        updateCategory === 'interests' ||
        updateCategory === 'career' ||
        updateCategory === 'skills'
      ) {
        await updateProfileAPI({
          category: updateCategory,
          data: updateNewValue,
        });

        profileMutate();

        return dispatch(closeDialog());
      }
    } catch (error) {
      errorMessage(error);
    }
  }, [
    dispatch,
    router,
    updateCategory,
    updateNewValue,
    userMutate,
    profileMutate,
  ]);

  const handleProfileDataResponse = useCallback(
    (data?: MyProfile | UserProfile) => {
      if (!data) {
        return;
      }

      if ('email' in data) {
        return {
          ...data,
          createdAt: changeDateFormat({
            date: data.createdAt,
            format: 'YYMMDD_hhmmss',
          }),
          lastLoginAt: changeDateFormat({
            date: data.lastLoginAt,
            format: 'YYMMDD_hhmmss',
          }),
          skills: data.skills ? [...data.skills.split(',')] : [],
        };
      }

      if (!('email' in data)) {
        return {
          ...data,
          createdAt: changeDateFormat({
            date: data.createdAt,
            format: 'YYMMDD',
          }),
          lastLoginAt: changeDateFormat({
            date: data.lastLoginAt,
            format: 'YYMMDD_hhmmss',
          }),
          skills: data.skills ? [...data.skills.split(',')] : [],
        };
      }
    },
    [],
  );

  useEffect(() => {
    if (updatePage !== 'profile') {
      return;
    }

    if (updatePage === 'profile' && updateCategory) {
      handleUpdateProfile();
    }
  }, [updatePage, updateCategory, handleUpdateProfile]);

  // 페이지 첫 로드시 query 조건이 없는 경우 tab 설정을 하기 위한 useEffect
  useEffect(() => {
    // default tab settings
    if (nickname && currentTab === undefined) {
      router.replace({
        pathname: `/profile/${nickname}`,
        query: { tab: 'viewProfile' },
      });
    }
  }, [currentTab, nickname, router]);

  // 새로고침시 탭 이동시 nickname이 undefined되는 문제 해결을 위한 useEffect
  useEffect(() => {
    if (nickname !== undefined && typeof nickname === 'string') {
      setProfileNickname(nickname);
    }
  }, [nickname]);

  const props: ProfileViewProps = {
    me: nickname === user?.data?.nickname,
    loginState: user?.data?.nickname,
    tabs,
    currentTab,
    profileData: handleProfileDataResponse(profileData?.data),
    profileNickname,
    handleLogInOut,
    isLoadedData,
  };

  return <ProfileView {...props} />;
};

export default ProfileController;
