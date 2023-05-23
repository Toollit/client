import React, { useCallback, useEffect, useState } from 'react';
import ProfileView, { ProfileViewProps } from './ProfileView';
import useSWR from 'swr';
import { GET_USER_PROFILE_API_ENDPOINT } from '@/apis/keys';
import { profileFetcher } from '@/apis/profileFetcher';
import { useRouter } from 'next/router';
import { errorMessage } from '@/apis/errorMessage';
import { logoutAPI } from '@/apis/logout';
import useWindowSize from '@/hooks/useWindowSize';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const ProfileController = () => {
  const router = useRouter();
  const { isLaptop } = useWindowSize();
  const currentTabIndex = useSelector(
    (state: RootState) => state.swipeableView.tabIndex,
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

  const { data } = useSWR(
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

  const handleLogout = useCallback(async () => {
    try {
      const response = await logoutAPI();

      if (response?.success) {
        router.push('/');
      }
    } catch (error) {
      errorMessage(error);
    }
  }, [router]);

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
    tabs,
    currentTab,
    data: data?.data,
    profileNickname,
    // projects: data?.data.projects,
    handleLogout,
    isLaptop,
    isLoadedData,
  };

  return <ProfileView {...props} />;
};

export default ProfileController;
