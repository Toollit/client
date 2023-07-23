import { mediaQueryLaptop } from '@/styles/mediaQuery';
import styled from '@emotion/styled';
import { Theme, css } from '@emotion/react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const Container = styled.div`
  display: table;
  table-layout: fixed; // required!!!
  width: 100%;

  ${mediaQueryLaptop} {
    max-width: 102.4rem;
    margin: 0 auto;
  }
`;

const ColumnLeftContainer = styled.div`
  background-color: linear-gradient(to bottom, #fff 0, #f9fbfc);

  ${mediaQueryLaptop} {
    display: table-cell;
    width: 35%;
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
    display: table-cell;
    width: 65%;
    padding: 0 3rem 5rem 3rem;
  }
`;

const GNBArea = styled.div`
  background-color: #fff;
  padding: 1.6rem 1rem 1.6rem 2rem;
  display: flex;
`;

const StyledLink = styled.a`
  text-decoration: none;
  color: #000;
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
  position: relative;
`;

const ProfileNoImageContainer = styled.div`
  position: relative;
  height: 15rem;
`;

const ProfileImageContainer = styled.div`
  position: relative;
  height: 15rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NoImage = styled.div`
  display: flex;
  justify-content: center;
`;

const ImageEditBtn = styled.div`
  border: 1px solid #fff;
  border-radius: 50rem;
  background-color: #fff;
  width: 3.68rem;
  height: 3.68rem;
  position: absolute;
  bottom: 4.5rem;
  left: calc((100% / 2) + 2.5rem);
  cursor: pointer;
`;

const ProfileImageSkeletonContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 15rem;
`;

const EditMenu = styled(Menu)`
  .MuiList-padding {
    padding: 0;
  }
`;

const EditCondition = styled(MenuItem)`
  font-size: 1.4rem;
  padding: 0.5rem 2rem;
`;

const UserNickname = styled.div`
  font-size: 1.4rem;
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
  currentTab: 'viewProfile' | 'viewProjects' | 'viewBookmarks' | undefined;
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

const LogInOut = styled.div`
  font-size: 1.4rem;
  color: ${(props) => props.theme.colors.gray};

  cursor: pointer;
`;

const Logo = styled.a`
  font-weight: 900;
`;

const MobileProfileContainer = styled.div`
  width: 100vw;
  padding-bottom: 5rem;
  display: initial;

  ${mediaQueryLaptop} {
    display: none;
  }
`;

const ViewContainer = styled.div`
  padding: 0 2rem;
`;

export {
  Container,
  ColumnLeftContainer,
  ColumnRightContainer,
  GNBArea,
  StyledLink,
  GNBTitle,
  ProfileArea,
  EditMenu,
  EditCondition,
  UserNickname,
  ProfileNoImageContainer,
  ProfileImageContainer,
  HeaderLeft,
  HeaderLeftMenu,
  HeaderLeftLink,
  DividerContainer,
  LogInOut,
  Logo,
  NoImage,
  ImageEditBtn,
  MobileProfileContainer,
  ProfileImageSkeletonContainer,
  ViewContainer,

  // SwipeableViewContainer,
};
