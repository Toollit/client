import React, { useCallback } from 'react';
import MainView, { MainViewProps } from './MainView';
import SwiperCore, { Autoplay } from 'swiper';
import { useRouter } from 'next/router';
import { getProjectsFetcher } from '@/apis/getProjectsFetcher';
import { AUTH_USER, GET_PROJECTS_API_ENDPOINT } from '@/apis/keys';
import LoadingCircularProgress from '@/components/commons/loading';
import useSWR, { useSWRConfig, Cache } from 'swr';
import { AuthAPIRes } from '@/apis/authFetcher';

const MainController = () => {
  const router = useRouter();
  const { cache }: { cache: Cache<AuthAPIRes> } = useSWRConfig();

  const isLoggedIn = cache.get(AUTH_USER)?.data?.data?.nickname;

  const { data, isLoading, error } = useSWR(
    GET_PROJECTS_API_ENDPOINT,
    getProjectsFetcher,
  );

  // Swiper setting
  SwiperCore.use([Autoplay]);

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

  const createForm = useCallback(() => {
    if (isLoggedIn) {
      router.push('/project/create');
    } else {
      alert('로그인 후 이용 가능합니다.');
      router.push('/login');
    }
  }, [router, isLoggedIn]);

  if (!data) {
    return <LoadingCircularProgress />;
  }

  const props: MainViewProps = {
    projects: data,
    createForm,
    handleRouteProjectDetail,
  };

  return <MainView {...props} />;
};

export default MainController;
