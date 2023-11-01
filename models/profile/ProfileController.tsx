import React, { useCallback, useEffect, useRef, useState } from 'react';
import ProfileView, { ProfileViewProps } from './ProfileView';
import useSWR, { useSWRConfig, Cache } from 'swr';
import {
  profileAlarmsKey,
  profileBookmarksKey,
  profileImageKey,
  profileInfoKey,
  profileProjectsKey,
  userExistCheckKey,
} from '@/apis/keys';
import { useRouter } from 'next/router';
import { errorMessage } from '@/apis/errorMessage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { updateProfileAPI } from '@/apis/updateProfile';
import { changeDateFormat, dateFromNow } from '@/utils/changeDateFormat';
import { open as openDialog, close as closeDialog } from '@/features/dialog';
import { profileImageFetcher } from '@/apis/profileImageFetcher';
import {
  ProfileInfoAPIRes,
  profileInfoFetcher,
} from '@/apis/profileInfoFetcher';
import {
  ProfileProjectsAPIRes,
  profileProjectsFetcher,
} from '@/apis/profileProjectsFetcher';
import type { ScopedMutator } from 'swr/_internal';
import useAuth from '@/hooks/useAuth';
import useLogout from '@/hooks/useLogout';
import { serialize } from '@/middleware/swr/serialize';
import useCachedKeys from '@/hooks/useCachedKeys';
import useTooltip from '@/hooks/useTooltip';
import { userExistCheckFetcher } from '@/apis/userExistCheckFetcher';
import {
  ProfileBookmarksAPIRes,
  profileBookmarksFetcher,
} from '@/apis/profileBookmarksFetcher';
import {
  ProfileAlarmsAPIRes,
  profileAlarmsFetcher,
} from '@/apis/profileAlarmsFetcher';

interface CachedData<T> {
  cache: Cache<T | undefined>;
  mutate: ScopedMutator;
}

interface ProfilePageData {
  profileInfo: {
    isLoaded: boolean;
    data: null | ProfileInfoAPIRes['data'];
  };
  projects: {
    isLoaded: boolean;
    data: null | ProfileProjectsAPIRes['data'];
  };
  bookmarks: {
    isLoaded: boolean;
    data: null | ProfileBookmarksAPIRes['data'];
  };
  alarms: {
    isLoaded: boolean;
    data: null | ProfileAlarmsAPIRes['data'];
  };
}

type CustomMemberTypes = ('Developer' | 'Designer' | 'PM' | 'Anyone')[];

const ProfileController = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { cache } = useSWRConfig();
  const { logOut } = useLogout();
  const { nickname: accessUser, authMutate } = useAuth();
  const { getCachedKeyWithTag, getCachedDataWithKey } = useCachedKeys();
  const {
    tooltipAnchorEl,
    setTooltipAnchorEl,
    tooltipOpen,
    handleTooltipOpen,
    handleTooltipClose,
  } = useTooltip();

  const updatePage = useSelector((state: RootState) => state.dialog.page);
  const updateCategory = useSelector(
    (state: RootState) => state.dialog.update?.category,
  );
  const updateNewValue = useSelector(
    (state: RootState) => state.dialog.update?.newValue,
  );

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
    alarms: {
      isLoaded: false,
      data: null,
    },
  });

  const [nickname, setNickname] = useState('');
  const [currentTab, setCurrentTab] = useState<
    'viewProfile' | 'viewProjects' | 'viewBookmarks' | 'viewAlarms' | undefined
  >();
  const [projectPostCount, setProjectPostCount] = useState(5); // Load by 5
  const [bookmarkPostCount, setBookmarkPostCount] = useState(5); // Load by 5

  const tabs = useRef([
    { name: '프로필', query: 'viewProfile' },
    { name: '프로젝트', query: 'viewProjects' },
    { name: '북마크', query: 'viewBookmarks' },
    { name: '알림', query: 'viewAlarms' },
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
  const { data: profileImageData, mutate: profileImageMutate } = useSWR(
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

  // Profile info fetcher
  const { data: profileInfoData, mutate: profileInfoDataMutate } = useSWR(
    userExistCheckData?.data.existUser &&
      nickname &&
      currentTab === 'viewProfile'
      ? {
          url: profileInfoKey(nickname),
          args: {
            page: '/profile',
            tag: 'profileInfo',
          },
        }
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
              data: res?.data,
            },
          };
        });
      },
      use: [serialize],
    },
  );

  // Project create and join list fetcher
  const { data: profileProjectsData, mutate: profileProjectsDataMutate } =
    useSWR(
      userExistCheckData?.data.existUser &&
        nickname &&
        currentTab === 'viewProjects'
        ? {
            url: profileProjectsKey(nickname, projectPostCount),
            args: {
              page: '/profile',
              tag: `profileProjects?count=${projectPostCount}`,
            },
          }
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
          if (projectPostCount > 5) {
            setData((prev) => {
              return {
                ...prev,
                projects: {
                  isLoaded: true,
                  data:
                    prev.projects.data && res?.data
                      ? {
                          projects: [
                            ...prev.projects.data?.projects,
                            ...res.data?.projects,
                          ],

                          total: res.data?.total,
                        }
                      : null,
                },
              };
            });
          }

          if (projectPostCount <= 5) {
            setData((prev) => {
              return {
                ...prev,
                projects: {
                  isLoaded: true,
                  data: res?.data,
                },
              };
            });
          }
        },
        use: [serialize],
      },
    );

  // Profile User bookmarks fetcher
  const { data: profileBookmarksData } = useSWR(
    userExistCheckData?.data.existUser &&
      nickname &&
      currentTab === 'viewBookmarks'
      ? {
          url: profileBookmarksKey(nickname, bookmarkPostCount),
          args: {
            page: '/profile',
            tag: `profileBookmarks?count=${bookmarkPostCount}`,
          },
        }
      : null,
    profileBookmarksFetcher,
    {
      dedupingInterval: 1000 * 60 * 10,
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      onError(err, key, config) {
        errorMessage(err);
        router.back();
      },
      onSuccess(res, key, config) {
        if (bookmarkPostCount > 5) {
          setData((prev) => {
            return {
              ...prev,
              bookmarks: {
                isLoaded: true,
                data:
                  prev.bookmarks.data && res?.data
                    ? {
                        bookmarks: [
                          ...prev.bookmarks.data?.bookmarks,
                          ...res.data?.bookmarks,
                        ],

                        total: res.data?.total,
                      }
                    : null,
              },
            };
          });
        }

        if (bookmarkPostCount <= 5) {
          setData((prev) => {
            return {
              ...prev,
              bookmarks: {
                isLoaded: true,
                data: res?.data,
              },
            };
          });
        }
      },
      use: [serialize],
    },
  );

  // Profile User Alarms fetcher
  const { data: profileAlarmsData } = useSWR(
    userExistCheckData?.data.existUser &&
      nickname &&
      currentTab === 'viewAlarms'
      ? {
          url: profileAlarmsKey(nickname),
          args: {
            page: '/profile',
            tag: `profileAlarms`,
          },
        }
      : null,
    profileAlarmsFetcher,
    {
      dedupingInterval: 1000 * 60 * 10,
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      onError(err, key, config) {
        errorMessage(err);
        router.back();
      },
      onSuccess(res, key, config) {
        setData((prev) => {
          return {
            ...prev,
            alarms: {
              isLoaded: true,
              data: res?.data
                ? {
                    alarms: res.data.alarms,
                  }
                : null,
            },
          };
        });
      },
      use: [serialize],
    },
  );

  const handleLogInOut = useCallback(() => {
    const isLoggedIn = accessUser;

    if (isLoggedIn) {
      return logOut({ push: '/' });
    }

    if (!isLoggedIn) {
      return router.push('/login');
    }
  }, [router, accessUser, logOut]);

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
        setTimeout(async () => {
          await authMutate();
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
    (data: ProfileInfoAPIRes['data'] | null) => {
      if (!data) {
        return null;
      }

      // login user data
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

      // not login user data
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

  const handleProjectDataResponse = useCallback(
    (data: ProfileProjectsAPIRes['data'] | null) => {
      if (!data) {
        return null;
      }

      const convertedData = data?.projects.map((project) => {
        return {
          ...project,
          memberTypes: project.memberTypes.map((type) => {
            return type === 'pm'
              ? type.toUpperCase()
              : type.charAt(0).toUpperCase() + type.slice(1);
          }) as CustomMemberTypes,
        };
      });

      if (data.projects.length < 1) {
        return {
          projects: [],
          total: data.total,
          showLoadMore: data.projects.length !== data.total,
        };
      }

      return {
        projects: convertedData ?? [],
        total: data.total,
        showLoadMore: data.projects.length !== data.total,
      };
    },
    [],
  );

  const handleBookmarkDataResponse = useCallback(
    (data: ProfileBookmarksAPIRes['data'] | null) => {
      if (!data) {
        return null;
      }

      const convertedData = data?.bookmarks?.map((project) => {
        return {
          ...project,
          memberTypes: project.memberTypes.map((type) => {
            return type === 'pm'
              ? type.toUpperCase()
              : type.charAt(0).toUpperCase() + type.slice(1);
          }) as CustomMemberTypes,
        };
      });

      if (data.bookmarks?.length < 1) {
        return {
          bookmarks: [],
          total: data.total,
          showLoadMore: data.bookmarks.length !== data.total,
        };
      }

      return {
        bookmarks: convertedData ?? [],
        total: data.total,
        showLoadMore: data.bookmarks?.length !== data.total,
      };
    },
    [],
  );

  const handleAlarmDataResponse = useCallback(
    (data: ProfileAlarmsAPIRes['data'] | null) => {
      if (!data) {
        return null;
      }

      const convertedData = data?.alarms.map((alarm) => {
        return {
          ...alarm,
          project: {
            ...alarm.project,
            createdAt: dateFromNow({ date: alarm.project.createdAt }),
          },
        };
      });

      return {
        alarms: convertedData,
      };
    },

    [],
  );

  const handleProjectLoadMore = useCallback(() => {
    if (!nickname) {
      return;
    }

    setProjectPostCount((prev) => prev + 5);

    // The code written under that comment only works if there is cached data. Logic for leveraging cached data without additional data load.
    const key = getCachedKeyWithTag({
      tag: `profileProjects?count=${projectPostCount + 5}`,
    });

    if (!key) {
      return;
    }

    const profileProjectsCachedData = getCachedDataWithKey({
      key,
    }) as ProfileProjectsAPIRes['data'];

    if (profileProjectsCachedData !== undefined) {
      setData((prev) => {
        return {
          ...prev,
          projects: {
            isLoaded: true,
            data:
              prev.projects.data && profileProjectsCachedData
                ? {
                    projects: [
                      ...prev.projects.data?.projects,
                      ...profileProjectsCachedData.projects,
                    ],

                    total: prev.projects.data.total,
                  }
                : null,
          },
        };
      });
    }
  }, [nickname, projectPostCount, getCachedKeyWithTag, getCachedDataWithKey]);

  const handleBookmarkLoadMore = useCallback(() => {
    if (!nickname) {
      return;
    }

    setBookmarkPostCount((prev) => prev + 5);

    // The code written under that comment only works if there is cached data. Logic for leveraging cached data without additional data load.
    const key = getCachedKeyWithTag({
      tag: `profileBookmarks?count=${bookmarkPostCount + 5}`,
    });

    if (!key) {
      return;
    }

    const profileBookmarksCachedData = getCachedDataWithKey({
      key,
    }) as ProfileBookmarksAPIRes['data'];

    if (profileBookmarksCachedData !== undefined) {
      setData((prev) => {
        return {
          ...prev,
          bookmarks: {
            isLoaded: true,
            data:
              prev.bookmarks.data && profileBookmarksCachedData
                ? {
                    bookmarks: [
                      ...prev.bookmarks.data?.bookmarks,
                      ...profileBookmarksCachedData.bookmarks,
                    ],

                    total: prev.bookmarks.data.total,
                  }
                : null,
          },
        };
      });
    }
  }, [nickname, bookmarkPostCount, getCachedKeyWithTag, getCachedDataWithKey]);

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

    const profileInfoKey = getCachedKeyWithTag({ tag: 'profileInfo' });
    const profileProjectsKey = getCachedKeyWithTag({
      tag: `profileProjects?count=${projectPostCount}`,
    });
    const profileAlarmsKey = getCachedKeyWithTag({ tag: 'profileAlarms' });

    const profileInfoCachedData = profileInfoKey
      ? (getCachedDataWithKey({
          key: profileInfoKey,
        }) as ProfileInfoAPIRes['data'])
      : null;
    const profileProjectsCachedData = profileProjectsKey
      ? (getCachedDataWithKey({
          key: profileProjectsKey,
        }) as ProfileProjectsAPIRes['data'])
      : null;

    const profileAlarmsCachedData = profileAlarmsKey
      ? (getCachedDataWithKey({
          key: profileAlarmsKey,
        }) as ProfileAlarmsAPIRes['data'])
      : null;

    if (!data.profileInfo.isLoaded && profileInfoCachedData) {
      setData((prev) => {
        return {
          ...prev,
          profileInfo: {
            isLoaded: true,
            data: profileInfoCachedData,
          },
        };
      });
    }

    if (!data.projects.isLoaded && profileProjectsCachedData) {
      setData((prev) => {
        return {
          ...prev,
          projects: {
            isLoaded: true,
            data: profileProjectsCachedData,
          },
        };
      });
    }

    if (!data.alarms.isLoaded && profileAlarmsCachedData) {
      setData((prev) => {
        return {
          ...prev,
          alarms: {
            isLoaded: true,
            data: profileAlarmsCachedData,
          },
        };
      });
    }
  }, [
    data,
    profileInfoData,
    profileProjectsData,
    profileBookmarksData,
    profileAlarmsData,
    cache,
    nickname,
    projectPostCount,
    getCachedKeyWithTag,
    getCachedDataWithKey,
  ]);

  // Create to resolve cases where the currentTab is not set or is set strangely when loading a page
  useEffect(() => {
    const nickname = router.query.nickname as string | undefined;
    const currentTab = router.query.tab as
      | 'viewProfile'
      | 'viewProjects'
      | 'viewBookmarks'
      | 'viewAlarms'
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
        currentTab === 'viewAlarms'
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
    const nickname = router.query.nickname as string | undefined;

    if (nickname !== undefined && typeof nickname === 'string') {
      setNickname(nickname);
    }
  }, [router]);

  const props: ProfileViewProps = {
    accessUser,
    me: nickname === accessUser,
    loginState: accessUser,
    tabs: tabs.current,
    currentTab,
    profileImageData: profileImageData?.data?.profileImage,
    profileInfoData: handleProfileInfoDataResponse(data.profileInfo.data),
    projectData: handleProjectDataResponse(data.projects.data),
    bookmarkData: handleBookmarkDataResponse(data.bookmarks.data),
    alarmData: handleAlarmDataResponse(data.alarms.data),
    nickname,
    handleLogInOut,
    handleProfileInfoEditBtn,
    profileImgRef,
    handleChangeProfileImg,
    handleProjectLoadMore,
    handleBookmarkLoadMore,
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
