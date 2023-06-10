import React, { useCallback, useEffect } from 'react';
import MainView, { MainViewProps } from './MainView';
import { useRouter } from 'next/router';
import { getProjectsFetcher } from '@/apis/getProjectsFetcher';
import { AUTH_USER, getProjectsKey } from '@/apis/keys';
import LoadingCircularProgress from '@/components/commons/loading';
import useSWR, { useSWRConfig, Cache } from 'swr';
import { AuthAPIRes } from '@/apis/authFetcher';
import { errorMessage } from '@/apis/errorMessage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { updateTotalPage } from '@/features/pagination';

const MainController = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const page = useSelector((state: RootState) => state.pagination.page);

  const { cache }: { cache: Cache<AuthAPIRes> } = useSWRConfig();

  const isLoggedIn = cache.get(AUTH_USER)?.data?.data?.nickname;

  const { data } = useSWR(getProjectsKey(page), getProjectsFetcher, {
    revalidateOnMount: false,
    errorRetryCount: 0,
    onError(err, key, config) {
      errorMessage(err);
    },
  });

  const handleRouteProjectDetail = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      const target = event.currentTarget as HTMLDivElement;
      const projectId = target.getAttribute('data-id');
      if (projectId) {
        return router.push(`project/${projectId}`);
      }
    },
    [router],
  );

  const createProject = useCallback(() => {
    if (isLoggedIn) {
      router.push('/project/create');
    } else {
      alert('로그인 후 이용 가능합니다.');
      router.push('/login');
    }
  }, [router, isLoggedIn]);

  // if (!projects) {
  //   return <LoadingCircularProgress />;
  // }

  useEffect(() => {
    if (data) {
      dispatch(updateTotalPage({ totalPage: data.totalPage }));
    }
  }, [dispatch, data]);

  const props: MainViewProps = {
    projects: data?.projects,
    createProject,
    handleRouteProjectDetail,
  };

  return <MainView {...props} />;
};

export default MainController;
