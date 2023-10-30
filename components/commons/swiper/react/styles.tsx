import styled from '@emotion/styled';
import { Global, css } from '@emotion/react';
import { Swiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { mediaQueryLaptop } from '@/styles/mediaQuery';

const Container = styled.div`
  ${mediaQueryLaptop} {
    display: none;
  }
`;

const TabCustomStyles = css`
  .swiper-pagination-custom {
    display: flex;
    font-size: 1.4rem;
    justify-content: center;
    text-align: center;
    box-shadow: 0 2px 4px 0 hsla(0, 0%, 80.8%, 0.5);
    font-weight: 700;
  }

  .custom-bullet {
    margin: 0rem 2rem;
    padding: 1rem 0rem;
    background-color: #fff;

    ${mediaQueryLaptop} {
      margin: 0rem 4rem;
    }
  }

  .swiper-pagination-bullet-active {
    background-color: #fff !important;
    /* border-bottom: 1px solid #000; */
    position: relative;
    ::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 2px;
      background-color: #1e1e23;
      border-radius: 1px;
    }
  }
`;

const CustomSwiperStyles = () => {
  return <Global styles={TabCustomStyles} />;
};

const SwiperContainer = styled(Swiper)`
  /* max-width: 102.4rem; */
  width: 100vw;
  height: 100%;

  .swiper-bottom {
    margin-top: 30px;
    overflow: hidden;
    width: 600px;
    border: 1px solid #e0e0e0;
  }

  .custom_slide_wrap {
    width: 600px;
  }
  .swiper-pagination-custom {
    display: flex;
    justify-content: flex-start;
    text-align: center;
  }
`;

export { CustomSwiperStyles, SwiperContainer, Container };
