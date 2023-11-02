import React from 'react';
import Link from 'next/link';
import GetitLogo from '@/assets/images/GetitLogo';
import { AccountCircleIcon, EditCircleIcon } from '@/assets/icons';
import Divider from '@/components/commons/divider';
import Skeleton from '@/components/commons/skeleton';
import Dialog from '@/components/commons/dialog';
import Tooltip, { TooltipProps } from '@/components/commons/tooltip';
import { ImageWrapper } from '@/styles/commons';
import SwipeableTabView from '@/components/commons/swipeableView/swipeableTabViews';
import ProjectController from './tab/project/ProjectController';
import AlarmController from './tab/alarm/AlarmController';
import ProfileFooterLink from './footer/Footer';
import BookmarkController from './tab/bookmark/BookmarkController';
import ProfileInfoController from './tab/profile/ProfileInfoController';
import {
  Container,
  ColumnLeftContainer,
  ColumnRightContainer,
  GNBArea,
  GNBLink,
  GNBTitle,
  ProfileArea,
  UserNickname,
  BlankImageContainer,
  ProfileImageContainer,
  HeaderLeft,
  Menu,
  FooterLink,
  DividerContainer,
  LogInOut,
  Logo,
  BlankImage,
  ImageEditBtn,
  ProfileImageSkeletonContainer,
  MyProfile,
  LaptopViewContainer,
  MobileViewContainer,
  ViewContainer,
  Content,
  StyledProfileImage,
} from './styles';

export interface ProfileViewProps {
  accessUser: string | null;
  me: boolean;
  loginState?: string | null;
  tabs: { name: string; query: string }[];
  currentTab:
    | 'viewProfile'
    | 'viewProjects'
    | 'viewBookmarks'
    | 'viewAlarms'
    | undefined;
  profileImageData?: string | null;
  nickname: string;
  handleLogInOut: () => void;
  profileImgRef: React.RefObject<HTMLInputElement>;
  handleChangeProfileImg: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleTooltipOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
  tooltip: TooltipProps;
}

const ProfileView = ({
  accessUser,
  me,
  loginState,
  tabs,
  currentTab,
  profileImageData,
  nickname,
  handleLogInOut,
  profileImgRef,
  handleChangeProfileImg,
  handleTooltipOpen,
  tooltip,
}: ProfileViewProps) => {
  return (
    <Container>
      <ColumnLeftContainer role=''>
        <GNBArea>
          <Link href={'/'} passHref>
            <GNBLink>
              <GetitLogo width={3.2} height={3.2} />
              <GNBTitle>Getit 프로필</GNBTitle>
            </GNBLink>
          </Link>
        </GNBArea>

        <ProfileArea>
          {/* Loading profile image */}
          {profileImageData === undefined && (
            <ProfileImageSkeletonContainer>
              <Skeleton shape='circular' width={12} height={12} />
            </ProfileImageSkeletonContainer>
          )}

          {/* Default profile image */}
          {profileImageData === null && (
            <BlankImageContainer>
              <BlankImage>
                <AccountCircleIcon
                  fill={true}
                  width={15}
                  height={15}
                  color='#767678'
                />
              </BlankImage>
            </BlankImageContainer>
          )}

          {/* User settings profile image */}
          {profileImageData && (
            <ProfileImageContainer>
              <ImageWrapper width={12} height={12}>
                <StyledProfileImage
                  src={profileImageData}
                  alt={'profile image'}
                  draggable={false}
                  priority
                  layout='fill'
                />
              </ImageWrapper>
            </ProfileImageContainer>
          )}

          {/* Change profile image button */}
          {me && (
            <>
              <input
                hidden
                type='file'
                accept='image/jpg, image/jpeg, image/png'
                ref={profileImgRef}
                onChange={handleChangeProfileImg}
              />

              <ImageEditBtn onClick={handleTooltipOpen}>
                <EditCircleIcon
                  fill={true}
                  width={3.5}
                  height={3.5}
                  color='#4dd290'
                />
              </ImageEditBtn>
              <Tooltip {...tooltip} />
            </>
          )}

          <UserNickname>{nickname}</UserNickname>
        </ProfileArea>

        <HeaderLeft>
          <Menu currentTab={currentTab} role='menu'>
            {tabs.map((tab, index) => {
              return (
                <li key={tab.name}>
                  <Link
                    href={{
                      pathname: `/profile/${nickname}`,
                      query: {
                        tab: tab.query,
                      },
                    }}
                  >
                    <a>{tab.name}</a>
                  </Link>
                </li>
              );
            })}
          </Menu>

          <DividerContainer>
            <Divider type='thin' />
          </DividerContainer>

          <FooterLink>
            <ul>
              <li>
                {me ? (
                  <LogInOut onClick={handleLogInOut}>
                    {loginState ? '로그아웃' : '로그인'}
                  </LogInOut>
                ) : (
                  <Link
                    href={accessUser ? `/profile/${accessUser}` : '/login'}
                    passHref
                  >
                    <MyProfile>내프로필</MyProfile>
                  </Link>
                )}
              </li>
              <li>
                <Link href='/'>
                  <a>고객센터</a>
                </Link>
              </li>
            </ul>
            <ul>
              <li>
                <Link href='/' passHref>
                  <Logo>Getit</Logo>
                </Link>
              </li>
              <li>
                <Link href=''>
                  <a>개인정보처리방침</a>
                </Link>
              </li>
              <li>
                <Link href=''>
                  <a>이용약관</a>
                </Link>
              </li>
            </ul>
          </FooterLink>
        </HeaderLeft>
      </ColumnLeftContainer>

      <ColumnRightContainer>
        {/* Laptop view */}
        <LaptopViewContainer>
          {currentTab === 'viewProfile' && (
            <ProfileInfoController currentTab={currentTab} />
          )}

          {currentTab === 'viewProjects' && (
            <ProjectController currentTab={currentTab} />
          )}

          {currentTab === 'viewBookmarks' && (
            <BookmarkController currentTab={currentTab} />
          )}

          {currentTab === 'viewAlarms' && (
            <AlarmController currentTab={currentTab} />
          )}
        </LaptopViewContainer>

        {/* Mobile view */}
        <MobileViewContainer>
          <SwipeableTabView tabs={tabs}>
            <ViewContainer>
              <Content>
                <ProfileInfoController currentTab={currentTab} />
                <ProfileFooterLink
                  me={me}
                  accessUser={accessUser}
                  loginState={loginState}
                  handleLogInOut={handleLogInOut}
                />
              </Content>
            </ViewContainer>

            <ViewContainer>
              <Content>
                <ProjectController currentTab={currentTab} />
                <ProfileFooterLink
                  me={me}
                  accessUser={accessUser}
                  loginState={loginState}
                  handleLogInOut={handleLogInOut}
                />
              </Content>
            </ViewContainer>

            <ViewContainer>
              <Content>
                <BookmarkController currentTab={currentTab} />
                <ProfileFooterLink
                  me={me}
                  accessUser={accessUser}
                  loginState={loginState}
                  handleLogInOut={handleLogInOut}
                />
              </Content>
            </ViewContainer>

            <ViewContainer>
              <Content>
                <AlarmController currentTab={currentTab} />
                <ProfileFooterLink
                  me={me}
                  accessUser={accessUser}
                  loginState={loginState}
                  handleLogInOut={handleLogInOut}
                />
              </Content>
            </ViewContainer>
          </SwipeableTabView>
        </MobileViewContainer>
      </ColumnRightContainer>
      <Dialog />
    </Container>
  );
};
{
}
export default ProfileView;
