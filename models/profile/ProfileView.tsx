import React from 'react';
import Link from 'next/link';
import GetitLogo from '@/assets/images/GetitLogo';
import { AccountCircleIcon, EditCircleIcon } from '@/assets/icons';
import Divider from '@/components/commons/divider';
import Skeleton from '@/components/commons/skeleton';
import Dialog from '@/components/commons/dialog';
import Tooltip, { TooltipProps } from '@/components/commons/tooltip';
import { ImageWrapper } from '@/styles/commons';
import SwipeableTabViews from '@/components/commons/swipeableViews/swipeableTabViews';
import ProjectController from './tab/project/ProjectController';
import NotificationController from './tab/notification/NotificationController';
import ProfileFooterLink from './footer/Footer';
import BookmarkController from './tab/bookmark/BookmarkController';
import ProfileInfoController from './tab/profile/ProfileInfoController';
import { ProfileTab } from './ProfileController';
import AppLayout from '@/components/appLayout';
import {
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
  Logo,
  BlankImage,
  ImageEditBtn,
  ProfileImageSkeletonContainer,
  MyProfile,
  ViewContainer,
  StyledProfileImage,
} from './styles';

export interface ProfileViewProps {
  isProfileImageLoading: boolean;
  isLaptop: boolean | null;
  isExistUser?: boolean;
  accessUser: string | null;
  me: boolean;
  loginState?: string | null;
  tabs: { name: string; query: string }[];
  currentTab: ProfileTab;
  profileImageData?: string | null;
  nickname: string;
  handleLogInOut: () => void;
  profileImgRef: React.RefObject<HTMLInputElement>;
  handleChangeProfileImg: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleTooltipOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
  tooltip: TooltipProps;
}

const ProfileView = ({
  isProfileImageLoading,
  isLaptop,
  isExistUser,
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
    <AppLayout type='none' footer={false}>
      <Container>
        <ColumnLeftContainer role=''>
          <GNBArea>
            <Link href={'/'} passHref legacyBehavior>
              <GNBLink>
                <GetitLogo width={3.2} height={3.2} />
                <GNBTitle>Getit 프로필</GNBTitle>
              </GNBLink>
            </Link>
          </GNBArea>

          <ProfileArea>
            {/* Loading profile image */}
            {(profileImageData === undefined || isProfileImageLoading) && (
              <ProfileImageSkeletonContainer>
                <Skeleton shape='circular' width={12} height={12} />
              </ProfileImageSkeletonContainer>
            )}

            {/* Default profile image */}
            {profileImageData === null && (
              <BlankImage>
                <AccountCircleIcon
                  fill={true}
                  width={15}
                  height={15}
                  color='#767678'
                />
              </BlankImage>
            )}

            {/* User settings profile image */}
            {profileImageData && (
              <ProfileImageContainer>
                <ImageWrapper width={12} height={12}>
                  <StyledProfileImage
                    src={profileImageData}
                    alt={'profile image'}
                    draggable={false}
                    priority={true}
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
                      {tab.name}
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
                      legacyBehavior>
                      <MyProfile>내프로필</MyProfile>
                    </Link>
                  )}
                </li>
                <li>
                  <Link href='/notice'>
                    공지사항
                  </Link>
                </li>
              </ul>
              <ul>
                <li>
                  <Link href='/' passHref legacyBehavior>
                    <Logo>Getit</Logo>
                  </Link>
                </li>
                <li>
                  <Link href='/policy/privacy'>
                    개인정보처리방침
                  </Link>
                </li>
                <li>
                  <Link href='/policy/terms-of-service'>
                    이용약관
                  </Link>
                </li>
              </ul>
            </FooterLink>
          </HeaderLeft>
        </ColumnLeftContainer>

        <ColumnRightContainer>
          {isLaptop !== null && isLaptop && (
            <>
              {currentTab === 'viewProfile' && (
                <ProfileInfoController
                  currentTab={currentTab}
                  isExistUser={isExistUser}
                  nickname={nickname}
                />
              )}

              {currentTab === 'viewProjects' && (
                <ProjectController
                  currentTab={currentTab}
                  isExistUser={isExistUser}
                  nickname={nickname}
                />
              )}

              {currentTab === 'viewBookmarks' && (
                <BookmarkController
                  currentTab={currentTab}
                  isExistUser={isExistUser}
                  nickname={nickname}
                />
              )}

              {currentTab === 'viewNotifications' && (
                <NotificationController
                  currentTab={currentTab}
                  isExistUser={isExistUser}
                  nickname={nickname}
                />
              )}
            </>
          )}

          {isLaptop !== null && !isLaptop && (
            <SwipeableTabViews tabs={tabs}>
              <ViewContainer>
                <ProfileInfoController
                  currentTab={currentTab}
                  isExistUser={isExistUser}
                  nickname={nickname}
                />
                <ProfileFooterLink
                  me={me}
                  accessUser={accessUser}
                  loginState={loginState}
                  handleLogInOut={handleLogInOut}
                />
              </ViewContainer>

              <ViewContainer>
                <ProjectController
                  currentTab={currentTab}
                  isExistUser={isExistUser}
                  nickname={nickname}
                />
                <ProfileFooterLink
                  me={me}
                  accessUser={accessUser}
                  loginState={loginState}
                  handleLogInOut={handleLogInOut}
                />
              </ViewContainer>

              <ViewContainer>
                <BookmarkController
                  currentTab={currentTab}
                  isExistUser={isExistUser}
                  nickname={nickname}
                />
                <ProfileFooterLink
                  me={me}
                  accessUser={accessUser}
                  loginState={loginState}
                  handleLogInOut={handleLogInOut}
                />
              </ViewContainer>

              <ViewContainer>
                <NotificationController
                  currentTab={currentTab}
                  isExistUser={isExistUser}
                  nickname={nickname}
                />
                <ProfileFooterLink
                  me={me}
                  accessUser={accessUser}
                  loginState={loginState}
                  handleLogInOut={handleLogInOut}
                />
              </ViewContainer>
            </SwipeableTabViews>
          )}
        </ColumnRightContainer>
        <Dialog />
      </Container>
    </AppLayout>
  );
};
{
}
export default ProfileView;
