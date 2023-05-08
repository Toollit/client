import React from 'react';
import SwiperCore, { Pagination } from 'swiper';
import { SwiperSlide as SwiperSlider } from 'swiper/react';
import { Container, CustomSwiperStyles, SwiperContainer } from './styles';

interface SwiperTabProps {
  children: React.ReactNode;
  tab: string[];
  swiperRef: React.MutableRefObject<SwiperCore | undefined>;
}
/**
 *
 * @props children - slider use with SwiperSlider (original name SwiperSlide)
 * @props tab - tab title
 * @props swiperRef - Ref for allocating the swiper core object value
 */
const SwiperTab = ({ children, tab, swiperRef }: SwiperTabProps) => {
  return (
    <Container>
      <CustomSwiperStyles />

      <div>
        <div className='swiper-pagination-custom'></div>
      </div>
      <SwiperContainer
        modules={[Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{
          clickable: true,
          type: 'bullets',
          el: '.swiper-pagination-custom',
          bulletClass: 'custom-bullet',

          renderBullet: function (index, className) {
            console.log({ index, className });
            return '<div class="' + className + '">' + tab[index] + '</div>';
          },
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {children}
      </SwiperContainer>
    </Container>
  );
};

export { SwiperTab, SwiperSlider };
