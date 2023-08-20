import styled from '@emotion/styled';

const Container = styled.nav<{ boundary: boolean }>`
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;
  border-bottom: ${(props) => (props.boundary ? '1px solid #eee' : 'none')};
  max-width: 102.4rem;
  width: 100%;
  margin: 0 auto;
`;

const ColumnContainer = styled.div`
  display: flex;
  min-height: 6rem;
  height: 6rem;
  align-items: center;
  padding: 0 1.5rem;
  justify-content: space-between;
  position: relative;

  /* padding-left: max(2.2rem, env(safe-area-inset-left)); */
  /* padding-right: max(2.2rem, env(safe-area-inset-right)); */
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

const Title = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.6rem;
  font-weight: 500;
`;

export {
  Container,
  ColumnContainer,
  ColumnLeftContainer,
  ColumnRightContainer,
  StyledLink,
  LogoText,
  Title,
};