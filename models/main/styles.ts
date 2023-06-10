import styled from '@emotion/styled';
import { mediaQueryTablet } from '@/styles/mediaQuery';

const Container = styled.section``;

const BannerContainer = styled.div<{ order: 'first' | 'second' | 'third' }>`
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
const PostWriteFilterContainer = styled.div`
  display: flex;
  max-width: 102.4rem;
  margin: 0 auto;
  margin-top: 1.5rem;
  padding: 0rem 2rem;
  align-items: center;
`;

const PostFilterContainer = styled.div`
  margin-left: auto;
  margin-right: 2rem;
`;

const PostWriteButton = styled.button`
  height: 4rem;
  text-align: center;
  border-radius: 25rem;
  border-style: none;
  background-color: #4dd290;
  color: #fff;
  font-weight: 700;
  font-size: 1.3rem;
  padding: 1rem 2rem;
`;

// 게시글 목록 관련
const PostContainer = styled.div`
  max-width: 102.4rem;
  margin: 0 auto;
  padding: 1rem 1rem;

  ${mediaQueryTablet} {
    padding: 1rem 0.5rem;
  }
`;

export {
  Container,
  BannerContainer,
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
  PostWriteFilterContainer,
  PostFilterContainer,
  PostWriteButton,
  PostContainer,
};
