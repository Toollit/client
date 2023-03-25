import React, { useCallback, useState } from 'react';
import MainView, { MainViewProps } from './MainView';
import SwiperCore, { Autoplay } from 'swiper';
import { useRouter } from 'next/router';
import { RootState } from 'store';
import { useSelector } from 'react-redux';

const MainController = () => {
  // Swiper setting
  SwiperCore.use([Autoplay]);
  const router = useRouter();
  const isLoggedIn = useSelector((state: RootState) => state.user.nickname);

  const [mainPosts, setMainPosts] = useState(Array(12).fill('test'));

  const createForm = useCallback(() => {
    if (isLoggedIn) {
      router.push('/project/create');
    } else {
      alert('로그인 후 이용 가능합니다.');
      router.push('/login');
    }
  }, [router, isLoggedIn]);

  const props: MainViewProps = {
    mainPosts,
    createForm,
  };

  return <MainView {...props} />;
};

export default MainController;
