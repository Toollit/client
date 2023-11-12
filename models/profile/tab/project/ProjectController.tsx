import React, { useCallback, useEffect, useState } from 'react';
import ProjectView, { ProjectViewProps } from './ProjectView';
import useSWR from 'swr';
import { profileProjectsKey } from '@/apis/keys';
import {
  ProfileProjectsAPIRes,
  profileProjectsFetcher,
} from '@/apis/profileProjectsFetcher';
import { errorMessage } from '@/apis/errorMessage';
import { useRouter } from 'next/router';
import { serialize } from '@/middleware/swr/serialize';
import useCachedKeys from '@/hooks/useCachedKeys';
import { ProfileCurrentTab } from '@/models/profile/ProfileController';
import { updateSwipeableViewHeight } from '@/features/swipeableView';
import { useAppDispatch } from '@/store';
import useWindowSize from '@/hooks/useWindowSize';

type CustomMemberTypes = ('Developer' | 'Designer' | 'PM' | 'Anyone')[];

interface ProjectData {
  isLoaded: boolean;
  data: ProfileProjectsAPIRes['data'] | null;
}

export interface ProjectControllerProps {
  currentTab: ProfileCurrentTab;
  isExistUser?: boolean;
  nickname: string;
}

const ProjectController = ({
  currentTab,
  isExistUser,
  nickname,
}: ProjectControllerProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { getCachedData } = useCachedKeys();
  const { isLaptop } = useWindowSize();

  const [data, setData] = useState<ProjectData>({
    isLoaded: false,
    data: null,
  });
  const [projectPostCount, setProjectPostCount] = useState(5); // Load by 5

  const { data: profileProjectsData, mutate: profileProjectsDataMutate } =
    useSWR(
      isExistUser && currentTab === 'viewProjects' && nickname
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
                isLoaded: true,
                data:
                  prev.data?.projects && res?.data
                    ? {
                        projects: [
                          ...prev.data?.projects,
                          ...res.data?.projects,
                        ],
                        total: res.data?.total,
                      }
                    : null,
              };
            });
          }

          if (projectPostCount <= 5) {
            setData({
              isLoaded: true,
              data: res?.data,
            });
          }
        },
        use: [serialize],
      },
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

      return {
        projects: convertedData,
        total: data.total,
        showLoadMore: data.projects.length !== data.total,
      };
    },
    [],
  );

  const handleProjectLoadMore = useCallback(() => {
    setProjectPostCount((prev) => prev + 5);

    const profileProjectsCachedData = getCachedData({
      tag: `profileProjects?count=${projectPostCount + 5}`,
    }) as ProfileProjectsAPIRes['data'];

    if (profileProjectsCachedData !== undefined) {
      setData((prev) => {
        return {
          isLoaded: true,
          data:
            prev.data?.projects && profileProjectsCachedData
              ? {
                  projects: [
                    ...prev.data?.projects,
                    ...profileProjectsCachedData.projects,
                  ],
                  total: prev.data.total,
                }
              : null,
        };
      });
    }
  }, [projectPostCount, getCachedData]);

  // The reason data is write in the dependencies is to adjust the screen size when the data is updated.
  // Works only in non-desktop versions
  useEffect(() => {
    if (isLaptop !== null && !isLaptop) {
      dispatch(updateSwipeableViewHeight(true));
    }
  }, [data, dispatch, isLaptop]);

  // 프로필 페이지 특정 탭에 있다가 다른 페이지 다녀온 경우 캐싱 된 데이터가 존재하는 경우 state 업데이트
  useEffect(() => {
    if (!nickname) {
      return;
    }

    const profileProjectsCachedData = getCachedData({
      tag: `profileProjects?count=${projectPostCount}`,
    }) as ProfileProjectsAPIRes['data'];

    if (!data.isLoaded && profileProjectsCachedData) {
      setData({
        isLoaded: true,
        data: profileProjectsCachedData,
      });
    }
  }, [
    dispatch,
    data,
    profileProjectsData,
    nickname,
    projectPostCount,
    getCachedData,
  ]);

  const props: ProjectViewProps = {
    data: handleProjectDataResponse(data.data),
    loadMore: handleProjectLoadMore,
  };

  return <ProjectView {...props} />;
};

export default ProjectController;
