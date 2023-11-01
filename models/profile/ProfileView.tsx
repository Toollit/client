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
import ProfileInfoView, {
  ProfileInfoData,
} from './tab/profile/ProfileInfoView';
import ProjectView, { ProjectViewData } from './tab/project/ProjectView';
import BookmarkView, { BookmarkViewData } from './tab/bookmark/BookmarkView';
import AlarmView, { AlarmViewData } from './tab/alarm/AlarmView';
import ProfileFooterLink from './footer/Footer';
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
  profileInfoData: ProfileInfoData | null;
  projectData: ProjectViewData | null;
  bookmarkData: BookmarkViewData | null;
  alarmData: AlarmViewData | null;
  nickname: string;
  handleLogInOut: () => void;
  handleProfileInfoEditBtn: (category: string) => void;
  profileImgRef: React.RefObject<HTMLInputElement>;
  handleChangeProfileImg: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleProjectLoadMore: () => void;
  handleBookmarkLoadMore: () => void;
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
  profileInfoData,
  projectData,
  bookmarkData,
  alarmData,
  nickname,
  handleLogInOut,
  handleProfileInfoEditBtn,
  profileImgRef,
  handleChangeProfileImg,
  handleProjectLoadMore,
  handleBookmarkLoadMore,
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
            <>
              {profileInfoData && (
                <ProfileInfoView
                  me={me}
                  data={profileInfoData}
                  editBtnHandler={handleProfileInfoEditBtn}
                />
              )}
              {!profileInfoData && (
                <>
                  <Skeleton height={25} top={3} />
                  <Skeleton height={15} top={3} />
                  <Skeleton height={25} top={3} />
                  <Skeleton height={15} top={3} />
                </>
              )}
            </>
          )}

          {currentTab === 'viewProjects' && (
            <>
              {projectData && (
                <ProjectView
                  data={projectData}
                  loadMore={handleProjectLoadMore}
                />
              )}
              {!projectData && (
                <>
                  <Skeleton height={30} top={3} />
                  <Skeleton height={30} top={3} />
                </>
              )}
            </>
          )}

          {currentTab === 'viewBookmarks' && (
            <>
              {bookmarkData && (
                <BookmarkView
                  data={bookmarkData}
                  loadMore={handleBookmarkLoadMore}
                />
              )}
              {!bookmarkData && (
                <>
                  <Skeleton height={30} top={3} />
                  <Skeleton height={30} top={3} />
                </>
              )}
            </>
          )}

          {currentTab === 'viewAlarms' && (
            <>
              {alarmData && <AlarmView data={alarmData} />}
              {!alarmData && (
                <>
                  <Skeleton height={25} top={3} />
                  <Skeleton height={25} top={3} />
                  <Skeleton height={25} top={3} />
                </>
              )}
            </>
          )}
        </LaptopViewContainer>

        {/* Mobile view */}
        <MobileViewContainer>
          <SwipeableTabView tabs={tabs}>
            <ViewContainer>
              {profileInfoData ? (
                <Content>
                  <ProfileInfoView
                    me={me}
                    data={profileInfoData}
                    editBtnHandler={handleProfileInfoEditBtn}
                  />
                  <ProfileFooterLink
                    me={me}
                    accessUser={accessUser}
                    loginState={loginState}
                    handleLogInOut={handleLogInOut}
                  />
                </Content>
              ) : (
                <>
                  <Skeleton height={20} top={3} />
                  <Skeleton height={20} top={3} />
                  <Skeleton height={20} top={3} />
                  <Skeleton height={20} top={3} />
                </>
              )}
            </ViewContainer>

            <ViewContainer>
              {projectData ? (
                <Content>
                  <ProjectView
                    data={projectData}
                    loadMore={handleProjectLoadMore}
                  />
                  <ProfileFooterLink
                    me={me}
                    accessUser={accessUser}
                    loginState={loginState}
                    handleLogInOut={handleLogInOut}
                  />
                </Content>
              ) : (
                <>
                  <Skeleton height={20} top={3} />
                  <Skeleton height={20} top={3} />
                  <Skeleton height={20} top={3} />
                  <Skeleton height={20} top={3} />
                </>
              )}
            </ViewContainer>

            <ViewContainer>
              {currentTab === 'viewBookmarks' ? (
                <Content>
                  <div>
                    <div>12342134</div>
                    <div>12342134</div>
                    <div>핸드폰 번호 수정</div>
                    <div>이메일 수정</div>
                    <div>이메일 공개</div>
                  </div>
                  <div>간단한 자기소개</div>
                  <div>사용 프로그램 또는 기술</div>
                  <ProfileFooterLink
                    me={me}
                    accessUser={accessUser}
                    loginState={loginState}
                    handleLogInOut={handleLogInOut}
                  />
                </Content>
              ) : null}
            </ViewContainer>

            <ViewContainer>
              {alarmData ? (
                <Content>
                  <AlarmView data={alarmData} />
                  <ProfileFooterLink
                    me={me}
                    accessUser={accessUser}
                    loginState={loginState}
                    handleLogInOut={handleLogInOut}
                  />
                </Content>
              ) : (
                <>
                  <Skeleton height={25} top={3} />
                  <Skeleton height={25} top={3} />
                  <Skeleton height={25} top={3} />
                </>
              )}
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
