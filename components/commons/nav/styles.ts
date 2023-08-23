import styled from '@emotion/styled';

const Container = styled.nav<{ boundary: boolean }>`
  border-bottom: ${(props) => (props.boundary ? '1px solid #eee' : 'none')};
  max-width: 102.4rem;
  width: 100%;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

const ColumnContainer = styled.div`
  display: flex;
  min-height: 6rem;
  height: 6rem;
  align-items: center;
  justify-content: space-between;
  position: relative;
  margin: auto -0.8rem;

  /* padding-left: max(2.2rem, env(safe-area-inset-left)); */
  /* padding-right: max(2.2rem, env(safe-area-inset-right)); */

  li {
    padding: 0 0.8rem;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
`;

const ColumnLeftContainer = styled.ul`
  display: flex;
  height: 100%;
`;

const ColumnRightContainer = styled.ul`
  display: flex;
  height: 100%;
`;

const StyledLogoLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
`;

const LogoText = styled.span`
  line-height: 1.1;
  font-size: 1.8rem;
  padding: 0rem 0.4rem;
  font-weight: 600;
`;

const Title = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.6rem;
  font-weight: 500;
`;

const StyledLink = styled.a`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export {
  Container,
  ColumnContainer,
  ColumnLeftContainer,
  ColumnRightContainer,
  StyledLogoLink,
  LogoText,
  Title,
  StyledLink,
};
