import React, { useCallback, useState } from 'react';
import MainView, { MainViewProps } from './MainView';
import SwiperCore, { Autoplay } from 'swiper';
import { useRouter } from 'next/router';
import { RootState } from 'store';
import { useSelector } from 'react-redux';
import { Project } from '@/apis/project/getProjectList';

interface MainControllerProps {
  projectList: Project[];
}

const MainController = ({ projectList }: MainControllerProps) => {
  // Swiper setting
  SwiperCore.use([Autoplay]);
  const router = useRouter();
  const isLoggedIn = useSelector((state: RootState) => state.user.nickname);

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

  const props: MainViewProps = {
    projectList,
    createForm,
    handleRouteProjectDetail,
  };

  return <MainView {...props} />;
};

export default MainController;
