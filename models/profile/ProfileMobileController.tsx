import React, { useState } from 'react';
import ProfileMobileView, { ProfileMobileViewProps } from './ProfileMobileView';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useRouter } from 'next/router';
import { profileFetcher } from '@/apis/profileFetcher';
import { GET_USER_PROFILE_API_ENDPOINT } from '@/apis/keys';
import useSWR from 'swr';
import { errorMessage } from '@/apis/errorMessage';

const ProfileMobileController = () => {
  const router = useRouter();
  const currentTabIndex = useSelector(
    (state: RootState) => state.swipeableView.tabIndex,
  );

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

  const { data: userProfile } = useSWR(
    nickname && currentTab
      ? `${GET_USER_PROFILE_API_ENDPOINT}/${nickname}?tab=${tabs[currentTabIndex].query}`
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

  const props: ProfileMobileViewProps = {
    tabs,
    currentTab,
    // userProfile: userProfile?.data,
    // profileNickname,
    // projects: data?.data.projects,
    // handleLogout,
    // isLaptop,
    isLoadedData,
  };

  return <ProfileMobileView {...props} />;
};

export default ProfileMobileController;
