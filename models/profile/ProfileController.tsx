import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import ProfileView, { ProfileViewProps } from './ProfileView';
import useSWR, { useSWRConfig, Cache } from 'swr';
import {
  getProfileImageKey,
  getProfileInfoKey,
  getProfileProjectsKey,
} from '@/apis/keys';
import { useRouter } from 'next/router';
import { errorMessage } from '@/apis/errorMessage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { updateProfileAPI } from '@/apis/updateProfile';
import { changeDateFormat } from '@/utils/changeDateFormat';
import { open as openDialog, close as closeDialog } from '@/features/dialog';
import useWindowSize from '@/hooks/useWindowSize';
import { profileImageFetcher, ProfileImage } from '@/apis/profileImageFetcher';
import {
  ProfileInfoAPIRes,
  profileInfoFetcher,
} from '@/apis/profileInfoFetcher';
import {
  Project,
  ProfileProjectsAPIRes,
  profileProjectsFetcher,
} from '@/apis/profileProjectsFetcher';
import { ScopedMutator } from 'swr/_internal';
import useAuth from '@/hooks/useAuth';
import useLogout from '@/hooks/useLogout';

interface CachedData<T> {
  cache: Cache<T | undefined>;
  mutate: ScopedMutator;
}

interface ProfilePageData {
  profileInfo: {
    isLoaded: boolean;
    data?: null | ProfileInfoAPIRes['data'];
  };
  projects: {
    isLoaded: boolean;
    data?: null | ProfileProjectsAPIRes['data'];
  };
  bookmarks: {
    isLoaded: boolean;
    data?: null;
  };
}

type CustomMemberTypes = ('Developer' | 'Designer' | 'PM' | 'Anyone')[];

const ProfileController = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { cache, mutate } = useSWRConfig();
  const { isLaptop } = useWindowSize();
  const { logOut } = useLogout();

  const updatePage = useSelector((state: RootState) => state.dialog.page);
  const updateCategory = useSelector(
    (state: RootState) => state.dialog.update?.category,
  );
  const updateNewValue = useSelector(
    (state: RootState) => state.dialog.update?.newValue,
  );

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const [data, setData] = useState<ProfilePageData>({
    profileInfo: {
      isLoaded: false,
      data: null,
    },
    projects: {
      isLoaded: false,
      data: null,
    },
    bookmarks: {
      isLoaded: false,
      data: null,
    },
  });

  const [profileNickname, setProfileNickname] = useState('');
  const [projectPostCount, setProjectPostCount] = useState(10); // Load by 10

  const tabs = useRef([
    { name: '내프로필', query: 'viewProfile' },
    { name: '프로젝트', query: 'viewProjects' },
    { name: '북마크', query: 'viewBookmarks' },
  ]);

  const profileImgRef = useRef<HTMLInputElement>(null);

  const nickname = router.query.nickname as string | undefined;
  const currentTab = router.query.tab as
    | 'viewProfile'
    | 'viewProjects'
    | 'viewBookmarks'
    | undefined;

  const isProfileImage = (data: any): data is ProfileImage => {
    return data && 'profileImage' in data;
  };

  const isProfileInfo = (data: any): data is ProfileInfoAPIRes['data'] => {
    return data && 'nickname' in data;
  };

  const isProject = (data: any): data is ProfileProjectsAPIRes['data'] => {
    return data && 'projects' in data && 'total' in data;
  };

  // Current Access User Self Information
  const { nickname: accessUser, mutate: authMutate } = useAuth();

  // Profile image fetcher
  const { data: profileImageData, mutate: profileImageMutate } = useSWR(
    nickname ? getProfileImageKey(nickname) : null,
    profileImageFetcher,
    {
      dedupingInterval: 1000 * 60 * 10,
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      onError(err, key, config) {
        router.replace('/');
        errorMessage(err);
      },
    },
  );

  // Profile info fetcher
  const { data: profileInfoData, mutate: profileInfoDataMutate } = useSWR(
    profileImageData?.success && nickname && currentTab === 'viewProfile'
      ? getProfileInfoKey(nickname)
      : null,
    profileInfoFetcher,
    {
      dedupingInterval: 1000 * 60 * 10,
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      onError(err, key, config) {
        router.replace('/');
        errorMessage(err);
      },
      onSuccess(res, key, config) {
        setData((prev) => {
          return {
            ...prev,
            profileInfo: {
              isLoaded: true,
              data: res.data,
            },
          };
        });
      },
    },
  );

  // Profile projects fetcher
  const { data: profileProjectsData, mutate: profileProjectsDataMutate } =
    useSWR(
      nickname && currentTab === 'viewProjects'
        ? getProfileProjectsKey(nickname, projectPostCount)
        : null,
      profileProjectsFetcher,
      {
        dedupingInterval: 1000 * 60 * 10,
        revalidateOnFocus: false,
        shouldRetryOnError: false,
        onError(err, key, config) {
          errorMessage(err);
          router.back();
        },
        onSuccess(res, key, config) {
          if (projectPostCount > 10) {
            setData((prev) => {
              return {
                ...prev,
                projects: {
                  isLoaded: true,
                  data: {
                    projects:
                      res.data?.projects && prev.projects.data?.projects
                        ? [
                            ...prev.projects.data?.projects,
                            ...res.data?.projects,
                          ]
                        : null,
                    total: res.data ? res.data.total : 0,
                  },
                },
              };
            });
          }

          if (projectPostCount <= 10) {
            setData((prev) => {
              return {
                ...prev,
                projects: {
                  isLoaded: true,
                  data: res.data,
                },
              };
            });
          }
        },
      },
    );

  const handleLogInOut = useCallback(async () => {
    const isLoggedIn = accessUser;

    if (isLoggedIn) {
      logOut({ push: '/' });
    }

    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [router, accessUser, logOut]);

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
          authMutate();
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
    authMutate,
    profileInfoDataMutate,
  ]);

  const handleProfileInfoDataResponse = useCallback(
    (data?: ProfileInfoAPIRes['data']) => {
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

  const handleProfileProjectDataResponse = useCallback(
    (data?: ProfileProjectsAPIRes['data']) => {
      const dataConverter = (projects?: Project[] | null) => {
        if (projects) {
          return projects.map((project) => {
            return {
              ...project,
              memberTypes: project.memberTypes.map((type) => {
                return type === 'pm'
                  ? type.toUpperCase()
                  : type.charAt(0).toUpperCase() + type.slice(1);
              }) as CustomMemberTypes,
            };
          });
        } else {
          return null;
        }
      };

      return {
        projects: dataConverter(data?.projects),
        total: data?.total ? data.total : 0,
        showLoadMore: data?.projects?.length !== data?.total,
      };
    },
    [],
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

  // 프로필 페이지 특정 탭에 있다가 다른 페이지 다녀온 경우 캐싱 된 데이터가 존재하는 경우 state 업데이트
  useEffect(() => {
    if (!nickname) {
      return;
    }

    if (!data.profileInfo.data && profileInfoData) {
      const profileInfoData = cache.get(getProfileInfoKey(nickname))?.data
        ?.data as ProfileInfoAPIRes['data'];

      setData((prev) => {
        return {
          ...prev,
          profileInfo: {
            isLoaded: true,
            data: profileInfoData,
          },
        };
      });
    }

    if (!data.projects.data && profileProjectsData) {
      const profileProjectsData = cache.get(
        getProfileProjectsKey(nickname, projectPostCount),
      )?.data?.data as ProfileProjectsAPIRes['data'];

      setData((prev) => {
        return {
          ...prev,
          projects: {
            isLoaded: true,
            data: profileProjectsData,
          },
        };
      });
    }
  }, [
    data,
    profileInfoData,
    profileProjectsData,
    cache,
    nickname,
    projectPostCount,
  ]);

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
    me: nickname === accessUser,
    loginState: accessUser,
    tabs: tabs.current,
    currentTab,
    profileImageData: isProfileImage(profileImageData?.data)
      ? profileImageData?.data.profileImage
      : null,
    profileInfoData: isProfileInfo(data.profileInfo.data)
      ? handleProfileInfoDataResponse(data.profileInfo.data)
      : null,
    profileProjectData: isProject(data.projects.data)
      ? handleProfileProjectDataResponse(data.projects.data)
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
