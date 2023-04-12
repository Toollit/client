import { mediaQueryMobile } from '@/styles/mediaQuery';
import styled from '@emotion/styled';

const TitleContainer = styled.div`
  min-height: 7.2rem;
  height: fit-content;
  padding: 2.5rem 0rem;
  width: 100%;
  word-wrap: break-word;
`;

const TitleText = styled.h1`
  font-size: ${(props) => props.theme.fontSizes.xxxlarge};

  ${mediaQueryMobile} {
    font-size: ${(props) => props.theme.fontSizes.large};
  }
`;

export { TitleContainer, TitleText };
