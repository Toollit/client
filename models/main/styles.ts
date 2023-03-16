import styled from '@emotion/styled';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

const mediaQuery = `@media (max-width: 768px)`;

const Container = styled.section``;

const CustomSwiper = styled(Swiper)`
  /* max-width: 102.4rem; */
  width: 100%;
  height: 36rem;

  .swiper-pagination-bullet-active {
    background-color: #fff;
  }
`;

const CustomSwiperSlide = styled(SwiperSlide)<{
  order: 'first' | 'second' | 'third';
}>`
  font-size: 1.6rem;
  background-color: ${(props) => {
    let order = props.order;
    switch (order) {
      case 'first':
        return '#f2f2f2';
      case 'second':
        return '#9BC1F8';
      case 'third':
        return '#151515';
      default:
        break;
    }
  }};
`;

// innerBoxBanner
const BannerContainer = styled.div`
  position: relative;
  max-width: 102.4rem;
  width: 100%;
  display: flex;
  margin: 0 auto;
  height: 36rem;
`;

const FirstSlideText = styled.div`
  z-index: 2;
  position: absolute;
  top: 5rem;
  bottom: 0;
  left: 13%;
`;

const BannerPersonImg = styled.div`
  position: absolute;
  right: 1rem;
  bottom: 2rem;
  z-index: 1;
`;

// first slide
const FirstSlideBackground = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const FirstSlideHeadline = styled.div`
  font-size: 2rem;
  font-weight: 600;
`;

const FirstSlideSubhead = styled.div`
  font-size: 1.6rem;
`;

const BannerBackgroundLeftContainer = styled.div`
  width: 100%;
`;
const BannerBackgroundRightContainer = styled.div`
  width: 100%;
  overflow: hidden;
`;

// second slide
const SecondSlideText = styled.div`
  margin: auto 0 auto 2rem;
  font-size: 2rem;
  z-index: 1;

  ${mediaQuery} {
    margin: 2rem 0 2rem 2rem;
  }
`;

const NetworkImg = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 46rem;
  height: 36rem;

  ${mediaQuery} {
    width: 30rem;
    height: 30rem;
    margin-right: 2rem;
  }
`;

// third slide
const ThirdSlideNotice = styled.div`
  background-color: #ffd159;
  color: #000;
  width: 10rem;
  font-size: 2rem;
  padding: 0.2rem 0.5rem;
  margin-bottom: 2rem;
  text-align: center;
  border-radius: 4rem;
  font-weight: 600;
`;

const ThirdSlideText = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  margin: 5rem 2rem;
  font-size: 2rem;
  color: #fff;
  font-weight: 600;
`;

const BugImage = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  margin: 10rem;
  width: 15rem;

  ${mediaQuery} {
    margin: 3rem;
  }
`;

export {
  Container,
  CustomSwiper,
  CustomSwiperSlide,
  BannerContainer,
  FirstSlideText,
  BannerPersonImg,
  FirstSlideBackground,
  FirstSlideHeadline,
  FirstSlideSubhead,
  BannerBackgroundLeftContainer,
  BannerBackgroundRightContainer,
  SecondSlideText,
  NetworkImg,
  ThirdSlideNotice,
  ThirdSlideText,
  BugImage,
};
