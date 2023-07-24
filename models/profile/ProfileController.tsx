import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import ProfileView, { ProfileViewProps } from './ProfileView';
import useSWR, { useSWRConfig } from 'swr';
import { AUTH_USER, GET_USER_PROFILE_API_ENDPOINT } from '@/apis/keys';
import {
  MyProfile,
  ProfileImage,
  UserProfile,
  profileInfoFetcher,
} from '@/apis/profileInfoFetcher';
import { useRouter } from 'next/router';
import { errorMessage } from '@/apis/errorMessage';
import { logoutAPI } from '@/apis/logout';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { updateProfileAPI } from '@/apis/updateProfile';
import { authFetcher } from '@/apis/authFetcher';
import { changeDateFormat } from '@/utils/changeDateFormat';
import { open as openDialog, close as closeDialog } from '@/features/dialog';
import useWindowSize from '@/hooks/useWindowSize';
import {
  profileProjectsAPIRes,
  profileProjectsFetcher,
} from '@/apis/profileProjectsFetcher';

const ProfileController = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { cache, mutate } = useSWRConfig();
  const { isLaptop } = useWindowSize();

  const updatePage = useSelector((state: RootState) => state.dialog.page);
  const updateCategory = useSelector(
    (state: RootState) => state.dialog.update?.category,
  );
  const updateNewValue = useSelector(
    (state: RootState) => state.dialog.update?.newValue,
  );

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [profileNickname, setProfileNickname] = useState('');

  const tabs = useRef([
    { name: '내프로필', query: 'viewProfile' },
    { name: '프로젝트', query: 'viewProjects' },
    { name: '북마크', query: 'viewBookmarks' },
  ]);

  const profileImgRef = useRef<HTMLInputElement>(null);

  const [projectPostCount, setProjectPostCount] = useState(10); // Load by 10

  const nickname = router.query.nickname;
  const currentTab = router.query.tab as
    | 'viewProfile'
    | 'viewProjects'
    | 'viewBookmarks'
    | undefined;

  const isProfileImage = (data: any): data is ProfileImage => {
    return data && 'profileImage' in data;
  };

  const isProfileInfo = (data: any): data is MyProfile | UserProfile => {
    return data && 'nickname' in data;
  };

  const isProject = (data: any): data is profileProjectsAPIRes['data'] => {
    // if (Array.isArray(data)) {
    //   return true;
    // }

    if (data && 'projects' in data && 'total' in data) {
      return true;
    }

    return false;
  };

  // Current Access User Self Information
  const { data: user, mutate: userMutate } = useSWR(AUTH_USER, authFetcher);

  // Profile image fetcher
  const { data: profileImageData, mutate: profileImageMutate } = useSWR(
    nickname ? `${GET_USER_PROFILE_API_ENDPOINT}/${nickname}` : null,
    profileInfoFetcher,
    {
      dedupingInterval: 60 * 1000,
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      onError(err, key, config) {
        errorMessage(err);
      },
    },
  );

  // Profile info fetcher
  const { data: profileInfoData, mutate: profileInfoDataMutate } = useSWR(
    nickname && currentTab === 'viewProfile'
      ? `${GET_USER_PROFILE_API_ENDPOINT}/${nickname}?tab=viewProfile`
      : null,
    profileInfoFetcher,
    {
      dedupingInterval: 60 * 1000,
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      onError(err, key, config) {
        errorMessage(err);
      },
    },
  );

  // Profile projects fetcher
  const { data: profileProjectsData, mutate: profileProjectsDataMutate } =
    useSWR(
      nickname && currentTab === 'viewProjects'
        ? `${GET_USER_PROFILE_API_ENDPOINT}/${nickname}?tab=viewProjects&count=${projectPostCount}`
        : null,
      profileProjectsFetcher,
      {
        // dedupingInterval: 60 * 1000,
        revalidateOnFocus: false,
        shouldRetryOnError: false,
        onError(err, key, config) {
          errorMessage(err);
        },
        onSuccess(data, key, config) {
          const keys = cache;
          console.log('keys ===>', keys);
        },
      },
    );

  const handleLogInOut = useCallback(async () => {
    const isLoggedIn = user?.data?.nickname;

    if (isLoggedIn) {
      try {
        await logoutAPI();

        // mutate(AUTH_USER);
        userMutate();
        profileInfoDataMutate();

        router.push('/');
      } catch (error) {
        errorMessage(error);
      }
    }

    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [router, user, userMutate, profileInfoDataMutate]);

  const handleOpenEditSelector = (event: React.MouseEvent<HTMLDivElement>) => {
    // open selector
    setAnchorEl(event.currentTarget);
  };

  const handleEditSelector = useCallback(
    async (event: React.MouseEvent<HTMLLIElement>) => {
      const { value } = event.currentTarget.dataset;

      if (value === 'update') {
        profileImgRef.current?.click();
      }

      if (value === 'delete') {
        try {
          await updateProfileAPI({
            category: 'profileImage',
            data: 'delete',
          });

          profileImageMutate();
        } catch (error) {
          errorMessage(error);
        }
      }

      // edit selector close
      setAnchorEl(null);
    },
    [profileImageMutate],
  );

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
    (event: ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files) {
        return;
      }

      const file = event.target.files[0];

      uploadProfileImage(file);
    },
    [uploadProfileImage],
  );

  const handleUpdateProfile = useCallback(async () => {
    // empty string('') value can come from updateNewValue. so write null and undefined explicitly
    if (updateNewValue === null || updateNewValue === undefined) {
      return;
    }

    try {
      if (updateCategory === 'nickname') {
        const response = await updateProfileAPI({
          category: 'nickname',
          data: updateNewValue,
        });

        const nickname = response?.data.nickname;

        if (nickname) {
          router.replace(`/profile/${nickname}?tab=viewProfile`);
        }

        // If revalidate immediately. It will make an api request with the previous nickname value, resulting in an error. It should be handled asynchronously.
        setTimeout(() => {
          userMutate();
          profileInfoDataMutate();
        }, 100);

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

        profileInfoDataMutate();

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
    profileInfoDataMutate,
  ]);

  const handleProfileInfoDataResponse = useCallback(
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

  const handleProfileInfoEditBtn = useCallback(
    (category: string) => {
      if (!(profileInfoData?.data && 'email' in profileInfoData.data)) {
        return;
      }

      switch (category) {
        case 'nickname':
          dispatch(
            openDialog({
              page: 'profile',
              type: 'standard',
              category: 'nickname',
              title: '닉네임',
              value: profileInfoData?.data?.nickname ?? '',
              // placeholder: '',
              maxLength: 20,
            }),
          );
          break;
        case 'introduce':
          dispatch(
            openDialog({
              page: 'profile',
              type: 'multiline',
              category: 'introduce',
              title: '자기소개',
              value: profileInfoData?.data?.introduce ?? '',
              maxLength: 1000,
            }),
          );
          break;
        case 'onOffline':
          dispatch(
            openDialog({
              page: 'profile',
              type: 'select',
              category: 'onOffline',
              title: '온/오프라인',
              value: profileInfoData?.data?.onOffline ?? '',
              selectList: [
                '온라인 가능',
                '오프라인 가능',
                '온,오프라인 모두 가능',
              ],
            }),
          );
          break;
        case 'place':
          dispatch(
            openDialog({
              page: 'profile',
              type: 'standard',
              category: 'place',
              title: '모임장소',
              value: profileInfoData?.data?.place ?? '',
              placeholder: 'ex) 서울특별시 종로구, 상관없음',
              maxLength: 30,
            }),
          );
          break;
        case 'contactTime':
          dispatch(
            openDialog({
              page: 'profile',
              type: 'standard',
              category: 'contactTime',
              title: '모임시간',
              value: profileInfoData?.data?.contactTime ?? '',
              placeholder: 'ex) 평일 9시~18시, 화요일 20시 이후',
              maxLength: 30,
            }),
          );
          break;
        case 'interests':
          dispatch(
            openDialog({
              page: 'profile',
              type: 'multiSelect',
              category: 'interests',
              title: '관심분야 (다중선택가능)',
              value: profileInfoData?.data?.interests ?? '',
              selectList: [
                '인공지능',
                '가상현실(VR)',
                '증강현실(AR)',
                'O2O',
                '공유서비스',
                '데이팅서비스',
                '여행',
                '소셜네트워크',
                '뷰티/패션',
                '이커머스',
                '엔터테인먼트',
                '게임',
                '헬스/스포츠',
                '뉴스/정보',
                '유틸',
                '금융',
                '부동산/인테리어',
                '종교',
                '교육',
                '의료/병원',
                '모빌리티',
                '육아/출산',
                '사물인터넷',
                '블록체인',
              ],
            }),
          );
          break;
        case 'career':
          dispatch(
            openDialog({
              page: 'profile',
              type: 'standard',
              category: 'career',
              title: '경력사항',
              value: profileInfoData?.data?.career ?? '',
              placeholder: 'ex) 3년차 개발자, 1년차 디자이너, 학생',
              maxLength: 30,
            }),
          );
          break;
        case 'skills':
          dispatch(
            openDialog({
              page: 'profile',
              type: 'hashtag',
              category: 'skills',
              title: '사용 프로그램 또는 기술',
              value: profileInfoData?.data?.skills ?? '',
              maxLength: 30,
            }),
          );
          break;

        default:
          break;
      }
    },
    [dispatch, profileInfoData],
  );

  const handleProjectLoadMore = useCallback(() => {
    setProjectPostCount((prev) => prev + 10);
  }, []);

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
    tabs: tabs.current,
    currentTab,
    profileImageData: isProfileImage(profileImageData?.data)
      ? profileImageData?.data.profileImage
      : null,
    profileInfoData: isProfileInfo(profileInfoData?.data)
      ? handleProfileInfoDataResponse(profileInfoData?.data)
      : null,
    profileProjectData: isProject(profileProjectsData?.data)
      ? profileProjectsData?.data
      : null,
    profileNickname,
    handleLogInOut,
    handleProfileInfoEditBtn,
    profileImgRef,
    handleChangeProfileImg,
    anchorEl,
    handleOpenEditSelector,
    handleEditSelector,
    open,
    handleProjectLoadMore,
    isLaptop,
  };

  return <ProfileView {...props} />;
};

export default ProfileController;
