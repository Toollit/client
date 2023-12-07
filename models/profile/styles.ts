import { mediaQueryLaptop } from '@/styles/mediaQuery';
import styled from '@emotion/styled';
import { Theme, css } from '@emotion/react';
import Image from 'next/image';
import { ProfileTab } from './ProfileController';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* min-height: 100%; */
  /* height: auto; */
  min-height: 100vh;
  height: 100%;
  width: 100%;

  ${mediaQueryLaptop} {
    flex-direction: row;
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
  flex-grow: 1;

  ${mediaQueryLaptop} {
    display: table-cell;
    width: 65%;
    padding: 3rem 3rem 5rem 3rem;
  }
`;

const GNBArea = styled.div`
  background-color: #fff;
  display: flex;
  height: 6rem;
  align-items: center;
  padding-left: 1.5rem;
`;

const GNBLink = styled.a`
  display: flex;
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

const BlankImage = styled.div`
  display: flex;
  justify-content: center;
`;

const ProfileImageContainer = styled.div`
  position: relative;
  height: 15rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledProfileImage = styled(Image)`
  border-radius: 25rem;
`;

const ImageEditBtn = styled.button`
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
  position: relative;
  height: 15rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const UserNickname = styled.div`
  font-size: 1.4rem;
`;

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

const Menu = styled.ul<{ currentTab: ProfileTab }>`
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
      case 'viewNotifications':
        return css`
          li:nth-of-type(4) a {
            ${TabHighlight(props.theme)}
          }
        `;
    }
  }}
`;

const DividerContainer = styled.div`
  padding: 0rem 3.9rem;
`;

const FooterLink = styled.div`
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

const LogInOut = styled.a`
  font-size: 1.4rem;
  color: ${(props) => props.theme.colors.gray};

  cursor: pointer;
`;

const MyProfile = styled.a`
  font-size: 1.4rem;
  color: ${(props) => props.theme.colors.gray};

  cursor: pointer;
`;

const Logo = styled.a`
  font-weight: 900;
`;

const ViewContainer = styled.div`
  padding: 3rem 1.5rem 0rem 1.5rem;
  display: flex;
  flex-direction: column;
  min-height: ${(props) =>
    `calc(100vh - ${props.theme.layout.navHeight} - ${props.theme.layout.profileHeight} - ${props.theme.layout.swipeableViewTabHeight} )`};
`;

export {
  Container,
  ColumnLeftContainer,
  ColumnRightContainer,
  GNBArea,
  GNBLink,
  GNBTitle,
  ProfileArea,
  UserNickname,
  ProfileImageContainer,
  HeaderLeft,
  Menu,
  FooterLink,
  DividerContainer,
  LogInOut,
  MyProfile,
  Logo,
  StyledProfileImage,
  BlankImage,
  ImageEditBtn,
  ProfileImageSkeletonContainer,
  ViewContainer,
};
