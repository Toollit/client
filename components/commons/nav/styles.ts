import { mediaQueryLaptop, mediaQueryTablet } from '@/styles/mediaQuery';
import styled from '@emotion/styled';

const Container = styled.nav<{ boundary: boolean }>`
  border-bottom: ${(props) => (props.boundary ? '1px solid #eee' : 'none')};
`;

const ColumnContainer = styled.div<{ type?: 'default' }>`
  display: flex;
  min-height: 6rem;
  height: 6rem;
  align-items: center;
  padding: 0 1.5rem;
  justify-content: space-between;
  margin: 0 auto;
  max-width: ${(props) => props.type === 'default' && '102.4rem'};
  width: 100%;
  position: relative;

  /* padding-left: max(2.2rem, env(safe-area-inset-left)); */
  /* padding-right: max(2.2rem, env(safe-area-inset-right)); */
  ${mediaQueryLaptop} {
    padding: 0 0.5rem;
  }
`;

const ColumnLeftContainer = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ColumnRightContainer = styled.ul`
  display: flex;
  height: 100%;

  li {
    padding-left: 1rem;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
`;

const StyledLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
`;

const LogoText = styled.h1`
  font-size: 1.8rem;
  padding: 0rem 0.4rem;
`;

export {
  Container,
  ColumnContainer,
  ColumnLeftContainer,
  ColumnRightContainer,
  StyledLink,
  LogoText,
};
