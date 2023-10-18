import React from 'react';
import Link from 'next/link';
import GetitLogo from '@/assets/images/GetitLogo';
import { AccountCircleIcon, EditCircleIcon } from '@/assets/icons';
import Divider from '@/components/commons/divider';
import Skeleton from '@/components/commons/skeleton';
import Dialog from '@/components/commons/dialog';
import ProfileInfoBox, {
  ProfileInfoData,
} from './profileViewSection/ProfileInfoBox';
import SwipeableTabView from '@/components/commons/swipeableView/swipeableTabViews';
import Image from 'next/image';
import ProfileProjectBox, {
  ProfileProjectsData,
} from './profileViewSection/ProfileProjectBox';
import ProfileFooterLink from './profileViewSection/ProfileFooterLink';
import Block from '@/components/commons/block';
import Tooltip, { TooltipProps } from '@/components/commons/tooltip';
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
  HeaderLeftMenu,
  HeaderLeftLink,
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
import { ImageWrapper } from '@/styles/commons';

export interface ProfileViewProps {
  accessUser: string | null;
  me: boolean;
  loginState?: string | null;
  tabs: { name: string; query: string }[];
  currentTab: 'viewProfile' | 'viewProjects' | 'viewBookmarks' | undefined;
  profileImageData?: string | null;
  profileInfoData: ProfileInfoData | null;
  profileProjectData: ProfileProjectsData | null;
  nickname: string;
  handleLogInOut: () => void;
  handleProfileInfoEditBtn: (category: string) => void;
  profileImgRef: React.RefObject<HTMLInputElement>;
  handleChangeProfileImg: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleProjectLoadMore: () => void;
  isLaptop: boolean;
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
  profileProjectData,
  nickname,
  handleLogInOut,
  handleProfileInfoEditBtn,
  profileImgRef,
  handleChangeProfileImg,
  handleProjectLoadMore,
  isLaptop,
  handleTooltipOpen,
  tooltip,
}: ProfileViewProps) => {
  return (
    <Container>
      <ColumnLeftContainer role=''>
        <GNBArea>
          <Link href={'/'}>
            <a>
              <GetitLogo width={3.2} height={3.2} />
            </a>
          </Link>

          <Link href={'/'} passHref>
            <GNBLink>
              <GNBTitle>Getit 프로필</GNBTitle>
            </GNBLink>
          </Link>
        </GNBArea>

        <ProfileArea>
          {profileImageData !== undefined ? (
            <>
              {profileImageData !== null ? (
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
              ) : (
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
              {me && (
                <>
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
            </>
          ) : (
            <ProfileImageSkeletonContainer>
              <Skeleton shape='circular' width={12} height={12} />
            </ProfileImageSkeletonContainer>
          )}

          <input
            hidden
            type='file'
            accept='image/jpg, image/jpeg, image/png'
            ref={profileImgRef}
            onChange={handleChangeProfileImg}
          />

          <UserNickname>{nickname}</UserNickname>
        </ProfileArea>

        <HeaderLeft>
          <HeaderLeftMenu currentTab={currentTab} role='menu'>
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
          </HeaderLeftMenu>

          <DividerContainer>
            <Divider type='thin' />
          </DividerContainer>

          <HeaderLeftLink>
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
          </HeaderLeftLink>
        </HeaderLeft>
      </ColumnLeftContainer>

      <ColumnRightContainer>
        {/* Laptop view */}
        <LaptopViewContainer>
          {currentTab === 'viewProfile' && (
            <>
              {profileInfoData ? (
                <ProfileInfoBox
                  me={me}
                  data={profileInfoData}
                  editBtnHandler={handleProfileInfoEditBtn}
                />
              ) : (
                <>
                  <Skeleton height={200} top={3} />
                  <Skeleton height={200} top={3} />
                  <Skeleton height={200} top={3} />
                  <Skeleton height={200} top={3} />
                </>
              )}
            </>
          )}

          {currentTab === 'viewProjects' && (
            <>
              {profileProjectData ? (
                <ProfileProjectBox
                  data={profileProjectData}
                  loadMore={handleProjectLoadMore}
                />
              ) : (
                <>
                  <Skeleton height={200} top={3} />
                  <Skeleton height={200} top={3} />
                  <Skeleton height={200} top={3} />
                  <Skeleton height={200} top={3} />
                </>
              )}
            </>
          )}

          {/* {currentTab === 'viewBookmarks' ? (
            isLoadedData.viewBookmarks ? (
              <div>
                <div>
                  <div>12342134</div>
                  <div>12342134</div>
                  <div>핸드폰 번호 수정</div>
                  <div>이메일 수정</div>
                  <div>이메일 공개</div>
                </div>
                <div>간단한 자기소개</div>
                <div>사용 프로그램 또는 기술</div>
              </div>
            ) : (
              <Skeleton />
            )
          ) : null} */}
        </LaptopViewContainer>

        {/* Mobile view */}
        <MobileViewContainer>
          <SwipeableTabView tabs={tabs}>
            <ViewContainer>
              {profileInfoData ? (
                <Content>
                  <ProfileInfoBox
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
              {profileProjectData ? (
                <Content>
                  <ProfileProjectBox
                    data={profileProjectData}
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
