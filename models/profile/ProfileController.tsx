import React, { useCallback, useEffect, useState } from 'react';
import ProfileView, { ProfileViewProps } from './ProfileView';
import useSWR from 'swr';
import { AUTH_USER, GET_USER_PROFILE_API_ENDPOINT } from '@/apis/keys';
import { User, profileFetcher } from '@/apis/profileFetcher';
import { useRouter } from 'next/router';
import { errorMessage } from '@/apis/errorMessage';
import { logoutAPI } from '@/apis/logout';
import useWindowSize from '@/hooks/useWindowSize';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { updateProfileAPI } from '@/apis/updateProfile';
import { authFetcher } from '@/apis/authFetcher';
import { changeDateFormat } from '@/utils/changeDateFormat';
import { open as openDialog, close as closeDialog } from '@/features/dialog';
import useAuth from '@/hooks/useAuth';
import { useSWRConfig } from 'swr';

const ProfileController = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLaptop } = useWindowSize();
  const { mutate } = useSWRConfig();

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

  const { data, mutate: profileMutate } = useSWR(
    nickname && currentTab
      ? `${GET_USER_PROFILE_API_ENDPOINT}/${nickname}?tab=${currentTab}`
      : null,
    profileFetcher,
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
    } else {
      router.push('/login');
    }
  }, [router, user, mutate]);

  const handleUpdateNickname = useCallback(async () => {
    if (!updateNewValue) {
      return;
    }

    try {
      const response = await updateProfileAPI({
        category: 'nickname',
        data: updateNewValue,
      });

      userMutate();

      const nickname = response?.data.nickname;

      if (nickname) {
        router.replace(`/profile/${nickname}?tab=viewProfile`);
      }

      dispatch(closeDialog());
    } catch (error) {
      errorMessage(error);
    }
  }, [dispatch, router, userMutate, updateNewValue]);

  const handleUpdateIntroduce = useCallback(async () => {
    if (!updateNewValue) {
      return;
    }

    try {
      await updateProfileAPI({
        category: 'introduce',
        data: updateNewValue,
      });

      profileMutate();

      dispatch(closeDialog());
    } catch (error) {
      errorMessage(error);
    }
  }, [dispatch, profileMutate, updateNewValue]);

  useEffect(() => {
    if (updatePage !== 'profile') {
      return;
    }

    if (updateCategory === 'nickname') {
      handleUpdateNickname();
      return;
    }

    if (updateCategory === 'introduce') {
      handleUpdateIntroduce();
      return;
    }
  }, [updatePage, updateCategory, handleUpdateNickname, handleUpdateIntroduce]);

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
    data: data?.data,
    profileNickname,
    handleLogInOut,
    isLoadedData,
  };

  return <ProfileView {...props} />;
};

export default ProfileController;
