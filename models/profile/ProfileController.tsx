import React, { useCallback, useEffect, useRef, useState } from 'react';
import ProfileView, { ProfileViewProps } from './ProfileView';
import useSWR from 'swr';
import { GET_USER_PROFILE } from '@/apis/keys';
import { userFetcher } from '@/apis/userFetcher';
import { useRouter } from 'next/router';
import { errorMessage } from '@/apis/errorMessage';
import SwiperCore from 'swiper';
import { logoutAPI } from '@/apis/logout';

const ProfileController = () => {
  const swiperRef = useRef<SwiperCore>();
  const router = useRouter();
  const nickname = router.query.nickname;
  const currentTab = router.query.tab as
    | 'viewProfile'
    | 'viewProjects'
    | 'viewBookmarks';

  const { data: userProfile } = useSWR(
    nickname && currentTab
      ? `${GET_USER_PROFILE}/${nickname}?tab=${currentTab}`
      : null,
    userFetcher,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      onError(err, key, config) {
        errorMessage(err);
        router.replace('/');
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

  useEffect(() => {
    // default tab settings
    if (nickname && currentTab === undefined) {
      router.replace({
        pathname: `/profile/${nickname}`,
        query: { tab: 'viewProfile' },
      });
    }
  }, [currentTab, nickname, router]);

  const props: ProfileViewProps = {
    swiperRef,
    currentTab,
    userProfile: userProfile?.data,
    // projects: data?.data.projects,
    handleLogout,
  };

  return <ProfileView {...props} />;
};

export default ProfileController;
