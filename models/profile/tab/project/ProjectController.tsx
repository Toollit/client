import React, { FC, useCallback, useEffect, useState } from 'react';
import ProjectView, { ViewProps } from './ProjectView';
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
import { ProfileTab } from '@/models/profile/ProfileController';
import { updateSwipeableViewHeight } from '@/features/swipeableView';
import { useAppDispatch, useAppSelector } from '@/store';
import useWindowSize from '@/hooks/useWindowSize';

type CustomMemberTypes = ('Developer' | 'Designer' | 'PM' | 'Anyone')[];

interface ProjectData {
  isLoaded: boolean;
  data: ProfileProjectsAPIRes['data'] | null;
}

interface ControllerProps {}

const ProjectController: FC<ControllerProps> = ({}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { getCachedData } = useCachedKeys();
  const { isLaptop } = useWindowSize();

  const isRegisteredUser = useAppSelector(
    (state) => state.profile.isRegisteredUser,
  );
  const profileUserNickname = useAppSelector(
    (state) => state.profile.userNickname,
  );
  const tab = useAppSelector((state) => state.profile.tab);

  const [data, setData] = useState<ProjectData>({
    isLoaded: false,
    data: null,
  });
  const [projectPostCount, setProjectPostCount] = useState(5); // Load by 5

  const { data: profileProjectsData, mutate: profileProjectsDataMutate } =
    useSWR(
      isRegisteredUser && tab === 'viewProjects' && profileUserNickname
        ? {
            url: profileProjectsKey(profileUserNickname, projectPostCount),
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

      // member type convert. developer -> Developer, designer -> Designer, pm -> PM, anyone -> Anyone
      const convertedMemberTypes = data?.projects.map((project) => {
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
        projects: convertedMemberTypes,
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
    if (!profileUserNickname) {
      return;
    }

    const profileProjectsCachedData: ProfileProjectsAPIRes['data'] =
      getCachedData({
        tag: `profileProjects?count=${projectPostCount}`,
      });

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
    profileUserNickname,
    projectPostCount,
    getCachedData,
  ]);

  const props: ViewProps = {
    data: handleProjectDataResponse(data.data),
    loadMore: handleProjectLoadMore,
  };

  return <ProjectView {...props} />;
};

export default ProjectController;
