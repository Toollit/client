import styled from '@emotion/styled';
import Grid from '@mui/material/Grid';

import { mediaQueryTablet } from '@/styles/mediaQuery';

const Banner = styled.div<{ order: 'first' | 'second' | 'third' }>`
  position: relative;
  max-width: 102.4rem;
  width: 100%;
  display: flex;
  margin: 0 auto;
  height: 36rem;
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
  overflow: hidden;
`;

const FirstSlideHeadline = styled.div`
  font-size: 2rem;
  font-weight: 600;
`;

const FirstSlideSubhead = styled.div`
  font-size: 1.6rem;
`;

// second slide
const SecondSlideText = styled.div`
  margin: 3rem auto 0 2rem;
  font-size: 2rem;

  ${mediaQueryTablet} {
    margin: auto 0 auto 2rem;
  }
`;

const NetworkImg = styled.div`
  position: absolute;
  right: 0;
  bottom: 2rem;
  width: 28rem;
  height: 28rem;
  margin: 0 2rem 0 auto;

  ${mediaQueryTablet} {
    position: absolute;
    right: 0;
    width: 46rem;
    height: 34rem;
    margin: 0 0 0 auto;
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
  margin: 3rem;
  width: 15rem;

  ${mediaQueryTablet} {
    margin: 10rem;
  }
`;
``;

// 게시글 필터링, 작성 버튼
const PostFilterWriteContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  column-gap: 2rem;
  padding: 1.5rem 1.5rem 1rem 1.5rem;
`;

const GridContainer = styled(Grid)`
  padding: 0 1.5rem;
`;

const PaginationContainer = styled.div`
  padding-top: 4rem;
  padding-bottom: 8rem;
`;

// 게시글 목록 관련
const StyledLink = styled.a`
  text-decoration: none;
  color: #000;
`;

export {
  Banner,
  FirstSlideText,
  BannerPersonImg,
  FirstSlideBackground,
  FirstSlideHeadline,
  FirstSlideSubhead,
  SecondSlideText,
  NetworkImg,
  ThirdSlideNotice,
  ThirdSlideText,
  BugImage,
  PostFilterWriteContainer,
  GridContainer,
  PaginationContainer,
  StyledLink,
};
