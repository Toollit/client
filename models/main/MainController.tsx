import React, { useCallback, useState } from 'react';
import MainView, { MainViewProps } from './MainView';
import SwiperCore, { Autoplay } from 'swiper';
import type { Swiper } from 'swiper';

const MainController = () => {
  // Swiper setting
  SwiperCore.use([Autoplay]);

  const [searchDialog, setSearchDialog] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSlide = useCallback((swiper: Swiper) => {
    const currentSlideIndex = swiper.activeIndex;
    setCurrentSlide(currentSlideIndex);
  }, []);

  const props: MainViewProps = {
    currentSlide,
    handleSlide,
  };

  return <MainView {...props} />;
};

export default MainController;
