import styled from '@emotion/styled';

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

const LeftNavContainer = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RightNavContainer = styled.li`
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

const IconContainer = styled.li`
  cursor: pointer;
`;

const IconContent = styled.div`
  padding: 0 0.8rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// search
const SearchBoxPositionContainer = styled.div`
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  margin-top: 4.4rem;
  width: 100%;
  height: calc(100%-4.4rem); // scroll prevent
  background-color: transparent;
`;

const SearchBoxContainer = styled.div`
  background-color: #fff;
  height: 36rem;
`;

const SearchBox = styled.div`
  height: 100%;
  max-width: 102.4rem;
  width: 100%;
  margin: 0 auto;
  padding: 3.2rem 2.2rem 8rem 2.2rem;
`;

const SearchBoxIconInputPositionContainer = styled.div`
  position: relative;
`;

const SearchIconContainer = styled.div`
  position: absolute;
  top: 1rem;
  left: 0.5rem;
  bottom: 0;
`;

const SearchInput = styled.input`
  height: 4.4rem;
  border: none;
  font-size: 2.4rem;
  color: #000;
  width: 100%;
  padding: 0 3.4rem;
  font-weight: 600;

  &:focus {
    outline: none;
    border-bottom: 1px solid #e8e8ed;
  }
`;

const SearchRecommendation = styled.div`
  margin-top: 4.9rem;
  font-size: 1.7rem;
  color: #86868b;
`;

// TODO 추후 배경 블러 처리
// saturate 180% blur 20px

export {
  LeftNavContainer,
  RightNavContainer,
  Content,
  NavList,
  IconContainer,
  StyledLink,
  LogoText,
  IconContent,
  SearchBoxPositionContainer,
  SearchBoxContainer,
  SearchBox,
  SearchBoxIconInputPositionContainer,
  SearchIconContainer,
  SearchInput,
  SearchRecommendation,
};
