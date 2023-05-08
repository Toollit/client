import React, { useEffect, useRef, useState } from 'react';
import ProfileView, { ProfileViewProps } from './ProfileView';
import useSWR from 'swr';
import { GET_USER_PROFILE } from '@/apis/keys';
import { userFetcher } from '@/apis/userFetcher';
import { useRouter } from 'next/router';
import { errorMessage } from '@/apis/errorMessage';
import SwiperCore from 'swiper';

const ProfileController = () => {
  const swiperRef = useRef<SwiperCore>();
  const router = useRouter();
  const nickname = router.query.nickname;
  const currentTab = router.query.tab as 'viewProfile' | 'project' | 'bookmark';

  const { data: userProfile } = useSWR(
    nickname ? `${GET_USER_PROFILE}/${nickname}` : null,
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

  // default tab settings
  if (userProfile && !currentTab) {
    router.push({
      pathname: `/profile/${nickname}`,
      query: { tab: 'viewProfile' },
    });
  }

  useEffect(() => {
    console.log('activeIndex ===>', swiperRef.current?.activeIndex);
  }, []);

  const props: ProfileViewProps = {
    swiperRef,
    currentTab,
    userProfile: userProfile?.data,
    // projects: data?.data.projects,
  };

  return <ProfileView {...props} />;
};

export default ProfileController;
