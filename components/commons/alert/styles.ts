import { mediaQueryMobile } from '@/styles/mediaQuery';
import styled from '@emotion/styled';

const Container = styled.div`
  position: sticky;
  bottom: 3rem;
  right: 0;
  width: calc(100vw - 2rem);
  margin: 0 auto;

  ${mediaQueryMobile} {
    max-width: 40rem;
    width: 100%;
    margin: 0 0 0 auto;
    right: 2rem;
  }
`;

const Title = styled.h3`
  font-size: 1.4rem;
`;

const Content = styled.p`
  font-size: 1.4rem;
`;

export { Container, Title, Content };
