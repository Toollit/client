import React, { FC } from 'react';
import Link from 'next/link';
import ToollitLogo from '@/assets/images/ToollitLogo';
import { AccountCircleIcon, EditCircleIcon } from '@/assets/icons';
import Divider from '@/components/divider';
import Skeleton from '@/components/skeleton';
import Dialog from '@/components/dialog';
import Tooltip, { TooltipProps } from '@/components/tooltip';
import { ImageWrapper } from '@/styles/commons';
import SwipeableTabViews from '@/components/swipeableViews/swipeableTabViews';
import ProjectController from './tab/project/ProjectController';
import NotificationController from './tab/notification/NotificationController';
import FooterController from './footer/FooterController';
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
  SignInOut,
  LogoLink,
  BlankImage,
  ImageEditBtn,
  ProfileImageSkeletonContainer,
  MyProfileLink,
  ViewContainer,
  StyledProfileImage,
} from './styles';

export interface ViewProps {
  isProfileImageLoading: boolean;
  isLaptop: boolean | null;
  isMyProfile: boolean;
  signInOutText: string;
  handleSignInOut: () => void;
  myProfileLink: string;
  noticeLink: string;
  privacyLink: string;
  termsOfServiceLink: string;
  logoLink: string;
  tabs: { name: string; query: string }[];
  tab: ProfileTab;
  profileImageData?: string | null;
  nickname: string;
  profileImgRef: React.RefObject<HTMLInputElement>;
  handleChangeProfileImg: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleTooltipOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
  tooltip: TooltipProps;
  isViewProfileTab: boolean;
  isViewProjectsTab: boolean;
  isBookmarksTab: boolean;
  isNotificationsTab: boolean;
}

const ProfileView: FC<ViewProps> = ({
  isProfileImageLoading,
  isLaptop,
  isMyProfile,
  signInOutText,
  myProfileLink,
  noticeLink,
  privacyLink,
  termsOfServiceLink,
  logoLink,
  tabs,
  tab,
  profileImageData,
  nickname,
  handleSignInOut,
  profileImgRef,
  handleChangeProfileImg,
  handleTooltipOpen,
  tooltip,
  isViewProfileTab,
  isViewProjectsTab,
  isBookmarksTab,
  isNotificationsTab,
}) => {
  return (
    <AppLayout type='none' footer={false}>
      <Container>
        <ColumnLeftContainer role=''>
          <GNBArea>
            <GNBLink href={'/'}>
              <ToollitLogo width={3.2} height={3.2} />
              <GNBTitle>Toollit 프로필</GNBTitle>
            </GNBLink>
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
            {isMyProfile && (
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
            <Menu tab={tab} role='menu'>
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
                  {isMyProfile ? (
                    <SignInOut onClick={handleSignInOut}>
                      {signInOutText}
                    </SignInOut>
                  ) : (
                    <MyProfileLink href={myProfileLink}>내프로필</MyProfileLink>
                  )}
                </li>
                <li>
                  <Link href={noticeLink}>공지사항</Link>
                </li>
              </ul>
              <ul>
                <li>
                  <LogoLink href={logoLink}>Toollit</LogoLink>
                </li>
                <li>
                  <Link href={privacyLink}>개인정보처리방침</Link>
                </li>
                <li>
                  <Link href={termsOfServiceLink}>이용약관</Link>
                </li>
              </ul>
            </FooterLink>
          </HeaderLeft>
        </ColumnLeftContainer>

        <ColumnRightContainer>
          {isLaptop && (
            <>
              {isViewProfileTab && <ProfileInfoController />}
              {isViewProjectsTab && <ProjectController />}
              {isBookmarksTab && <BookmarkController />}
              {isNotificationsTab && <NotificationController />}
            </>
          )}

          {!isLaptop && (
            <SwipeableTabViews tabs={tabs}>
              <ViewContainer>
                <ProfileInfoController />
                <FooterController />
              </ViewContainer>

              <ViewContainer>
                <ProjectController />
                <FooterController />
              </ViewContainer>

              <ViewContainer>
                <BookmarkController />
                <FooterController />
              </ViewContainer>

              <ViewContainer>
                <NotificationController />
                <FooterController />
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
