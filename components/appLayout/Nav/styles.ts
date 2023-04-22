import styled from '@emotion/styled';

const NavContainer = styled.nav`
  box-shadow: 0 2px 4px 0 hsla(0, 0%, 80.8%, 0.5);
`;

const Content = styled.div`
  display: flex;
  margin: 0 auto;
  max-width: 102.4rem;
  width: 100%;
  position: relative;
  /* padding-left: max(2.2rem, env(safe-area-inset-left)); */
  /* padding-right: max(2.2rem, env(safe-area-inset-right)); */
`;

const NavList = styled.ul`
  height: 4.4rem;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const ColumnLeftContainer = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 0.8rem;
`;

const ColumnRightContainer = styled.li`
  ul {
    display: flex;
    height: 100%;
  }
`;

const StyledLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: #000;
`;

const LogoText = styled.div`
  font-size: 1.8rem;
  padding: 0rem 0.4rem;
`;

const IconContainer = styled.div`
  padding: 0 0.8rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SearchDrawerBtn = styled.li`
  cursor: pointer;
`;

export {
  NavContainer,
  ColumnLeftContainer,
  ColumnRightContainer,
  Content,
  NavList,
  StyledLink,
  LogoText,
  IconContainer,
  SearchDrawerBtn,
};
