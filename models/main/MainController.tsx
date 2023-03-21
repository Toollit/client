import React, { useCallback, useState } from 'react';
import MainView, { MainViewProps } from './MainView';
import SwiperCore, { Autoplay } from 'swiper';
import type { Swiper } from 'swiper';

const MainController = () => {
  // Swiper setting
  SwiperCore.use([Autoplay]);

  const [mainPosts, setMainPosts] = useState(Array(12).fill('test'));

  const props: MainViewProps = {
    mainPosts,
  };

  return <MainView {...props} />;
};

export default MainController;
