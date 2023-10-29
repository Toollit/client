import styled from '@emotion/styled';
import { Global, css } from '@emotion/react';
import createCache from '@emotion/cache';

const CustomPaginationStyles = css`
  /* .swiper-pagination {
    background-color: red !important;
    font-size: 2rem !important;
  }
  :host(.swiperContainer) {
    .swiper-pagination-fraction {
      background-color: red !important;
      font-size: 2rem !important;
    }
  }

  .swiper-pagination-horizontal {
  }

  .swiper-pagination-current {
    font-size: 2rem !important;
  } */
  /* .swiperContainer {
    background-color: red;
  } */
  ::shadow .swiper-pagination-fraction {
    background-color: red !important;
    font-size: 2rem !important;
  }
`;

const CustomSwiperStyles = () => {
  return <Global styles={CustomPaginationStyles} />;
};

export { CustomSwiperStyles };
