import React from 'react';

interface SlideProps {
  children: React.ReactNode;
}

const SwiperSlide = ({ children }: SlideProps) => {
  return <swiper-slide>{children}</swiper-slide>;
};

export default SwiperSlide;
