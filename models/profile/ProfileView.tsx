import React, { FC } from 'react';
import Link from 'next/link';
import ToollitLogo from '@/assets/images/ToollitLogo';
import Divider from '@/components/divider';
import Dialog from '@/components/dialog';
import SwipeableTabViews from '@/components/swipeableViews/swipeableTabViews';
import ProjectController from './tab/project/ProjectController';
import NotificationController from './tab/notification/NotificationController';
import FooterController from './footer/FooterController';
import BookmarkController from './tab/bookmark/BookmarkController';
import UserInfoController from './tab/userInfo/UserInfoController';
import { ProfileTab } from './ProfileController';
import ImageController from './image/ImageController';
import AppLayout from '@/components/appLayout';
import Skeleton from '@/components/skeleton';
import {
  Container,
  ColumnLeftContainer,
  ColumnRightContainer,
  GNBArea,
  GNBLink,
  GNBTitle,
  ProfileArea,
  HeaderLeft,
  Menu,
  FooterLink,
  DividerContainer,
  SignInOut,
  LogoLink,
  MyProfileLink,
  ViewContainer,
  LaptopViewContainer,
  MobileViewContainer,
  ImageSkeletonLayoutContainer,
  NicknameSkeletonLayoutContainer,
} from './styles';

export interface ViewProps {
  isRegisteredUser: boolean;
  isMyProfile: boolean;
  signinLogoutText: string;
  handleSigninLogout: () => void;
  myProfileLink: string;
  noticeLink: string;
  privacyLink: string;
  termsOfServiceLink: string;
  logoLink: string;
  tabs: { name: string; query: string }[];
  tab: ProfileTab;
  nickname: string;
  isViewProfileTab: boolean;
  isViewProjectsTab: boolean;
  isBookmarksTab: boolean;
  isNotificationsTab: boolean;
}

const ProfileView: FC<ViewProps> = ({
  isRegisteredUser,
  isMyProfile,
  signinLogoutText,
  myProfileLink,
  noticeLink,
  privacyLink,
  termsOfServiceLink,
  logoLink,
  tabs,
  tab,
  nickname,
  handleSigninLogout,
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
            {isRegisteredUser ? (
              <ImageController />
            ) : (
              <>
                <ImageSkeletonLayoutContainer>
                  <Skeleton shape='circular' width={12} height={12} />
                </ImageSkeletonLayoutContainer>
                <NicknameSkeletonLayoutContainer>
                  <Skeleton shape='text' width={10} height={3} />
                </NicknameSkeletonLayoutContainer>
              </>
            )}
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
                    <SignInOut onClick={handleSigninLogout}>
                      {signinLogoutText}
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
          {isRegisteredUser ? (
            <>
              <LaptopViewContainer>
                {isViewProfileTab && <UserInfoController />}
                {isViewProjectsTab && <ProjectController />}
                {isBookmarksTab && <BookmarkController />}
                {isNotificationsTab && <NotificationController />}
              </LaptopViewContainer>

              <MobileViewContainer>
                <SwipeableTabViews tabs={tabs}>
                  <ViewContainer>
                    <UserInfoController />
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
              </MobileViewContainer>
            </>
          ) : (
            <>
              <Skeleton width={60} height={20} bottom={2} />
              <Skeleton width={60} height={15} bottom={2} />
              <Skeleton width={60} height={30} bottom={2} />
            </>
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
