import { mediaQueryLaptop, mediaQueryTablet } from '@/styles/mediaQuery';
import styled from '@emotion/styled';
import { Theme, css } from '@emotion/react';

const Container = styled.div`
  display: table;
  width: 100%;
  max-width: 102.4rem;
  height: 100%;
  margin: 0 auto;
`;

const ColumnLeftContainer = styled.div`
  background-color: linear-gradient(to bottom, #fff 0, #f9fbfc);

  ${mediaQueryLaptop} {
    display: table-cell;
    width: 39.5rem;
    background-color: #fff;
    box-shadow: 5px 1px 8px 0 rgba(0, 0, 0, 0.06);
    border-left: 1px solid rgba(0, 0, 0, 0.08);
    vertical-align: top;
    z-index: 1;
  }
`;

const ColumnRightContainer = styled.div`
  display: none;

  ${mediaQueryLaptop} {
    width: 100%;
    background-color: green;
    padding: 0 3rem;
    display: table-cell;
    width: 80rem;
    /* vertical-align: top; */
  }
`;

const GNBArea = styled.div`
  background-color: #fff;
  padding: 1.6rem 1rem 1.6rem 2rem;
  display: flex;
`;

const GNBLogo = styled.div`
  /* position: absolute; */
  /* left: 2.4rem; */
`;

const GNBTitleContainer = styled.div``;

const StyledTitleLink = styled.a`
  text-decoration: none;
`;

const GNBTitle = styled.h1`
  font-size: 2.2rem;
  padding-left: 0.5rem;
  color: #000;
  font-weight: 400;
`;

const ProfileArea = styled.div`
  padding: 1.2rem 2rem;
  text-align: center;
`;

const ProfileImageContainer = styled.div`
  position: relative;
  text-align: center;

  div {
    border: 1px solid #fff;
    border-radius: 50rem;
    background-color: #fff;
    width: 3.68rem;
    height: 3.68rem;
    position: absolute;
    bottom: 1.3rem;
    left: calc((100% / 2) + 2.5rem);
  }
`;

const UserNickname = styled.div`
  font-size: 2rem;
`;

const UserEmail = styled.div``;

const HeaderLeft = styled.div`
  display: none;

  ${mediaQueryLaptop} {
    display: initial;
  }
`;

const TabHighlight = (theme: Theme) => css`
  color: ${theme.colors.black};

  ::after {
    content: '';

    width: 100%;
    position: absolute;
    left: 0;
    bottom: -0.5rem;

    border-width: 0 0 2px;
    border-style: solid;
  }
`;

const HeaderLeftMenu = styled.ul<{
  currentTab: 'viewProfile' | 'viewProjects' | 'viewBookmarks';
}>`
  padding: 4rem 3.9rem;

  li {
    margin-top: 3rem;
  }

  li a {
    font-size: 1.9rem;
    position: relative;
    text-decoration: none;
    color: ${(props) => props.theme.colors.gray};
  }

  ${(props) => {
    switch (props.currentTab) {
      case 'viewProfile':
        return css`
          li:nth-of-type(1) a {
            ${TabHighlight(props.theme)}
          }
        `;

      case 'viewProjects':
        return css`
          li:nth-of-type(2) a {
            ${TabHighlight(props.theme)}
          }
        `;

      case 'viewBookmarks':
        return css`
          li:nth-of-type(3) a {
            ${TabHighlight(props.theme)}
          }
        `;
    }
  }}
`;

const DividerContainer = styled.div`
  padding: 0rem 3.9rem;
`;

const HeaderLeftLink = styled.div`
  padding: 4rem 3.9rem;

  /* display: flex; */
  /* flex-wrap: wrap; */

  ul {
    display: flex;
    position: relative;
    padding-bottom: 1.6rem;
  }

  li {
    position: relative;
    padding-left: 1.4rem;

    ::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0.6rem;
      width: 0.1rem;
      height: 1.1rem;
      margin-top: -0.55rem;
      background-color: rgba(146, 146, 148, 0.3);
    }
  }

  li:first-of-type {
    padding-left: 0;

    ::before {
      display: none;
    }
  }

  li a {
    font-size: 1.4rem;
    color: ${(props) => props.theme.colors.gray};
    text-decoration: none;
  }
`;

const Content = styled.div`
  padding: 0 2rem;
`;

const LogOut = styled.div`
  font-size: 1.4rem;
  color: ${(props) => props.theme.colors.gray};

  cursor: pointer;
`;

const Logo = styled.a`
  font-weight: 900;
`;

const DeleteUser = styled.div`
  font-size: 1.5rem;
`;

const UserProfileContainer = styled.div`
  width: calc(100vw - 4rem);
  margin: 4rem auto;
  border-radius: ${(props) => props.theme.borderRadius.base};
  border: 1px solid ${(props) => props.theme.colors.border.base};
  padding: 1.6rem;
`;

const EmailContainer = styled.div``;

const IntroduceContainer = styled.div``;

const SkillContainer = styled.div``;

const SettingsContainer = styled.div`
  border-radius: ${(props) => props.theme.borderRadius.base};
  border: 1px solid ${(props) => props.theme.colors.border.base};
  margin-bottom: 2.4rem;
  padding: 1.6rem;
`;

const SwipeableTabViewContainer = styled.div`
  ${mediaQueryLaptop} {
    display: none;
  }
`;

const SwipeableViewContainer = styled.div``;

export {
  Container,
  ColumnLeftContainer,
  ColumnRightContainer,
  GNBArea,
  GNBLogo,
  GNBTitleContainer,
  StyledTitleLink,
  GNBTitle,
  ProfileArea,
  ProfileImageContainer,
  UserNickname,
  UserEmail,
  HeaderLeft,
  HeaderLeftMenu,
  HeaderLeftLink,
  DividerContainer,
  LogOut,
  Logo,
  SettingsContainer,
  DeleteUser,
  // SliderContainer,
  UserProfileContainer,
  SwipeableTabViewContainer,
  SwipeableViewContainer,
};
