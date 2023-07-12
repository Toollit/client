import React from 'react';
import Link from 'next/link';
import GetitLogo from '@/assets/images/GetitLogo';
import { AccountCircleIcon, EditCircleIcon } from '@/assets/icons';
import { MyProfile, UserProfile } from '@/apis/profileInfoFetcher';
import Divider from '@/components/commons/divider';
import Skeleton from '@/components/commons/skeleton';
import Dialog from '@/components/commons/dialog';
import ProfileInfoBox from './ProfileInfoBox';
import SwipeableTabView from '@/components/commons/swipeableView/swipeableTabViews';
import {
  Container,
  ColumnLeftContainer,
  ColumnRightContainer,
  GNBArea,
  StyledTitleLink,
  GNBTitle,
  ProfileArea,
  UserNickname,
  ProfileImageContainer,
  HeaderLeft,
  HeaderLeftMenu,
  HeaderLeftLink,
  DividerContainer,
  LogInOut,
  Logo,
  AccountCircleIconContainer,
  EditCircleIconContainer,
  UserProfileContainer,
  SettingsContainer,
  DeleteUser,
  MobileProfileContainer,
  FooterLink,
  FooterLogo,
} from './styles';

export interface CustomMyProfile extends Omit<MyProfile, 'skills'> {
  skills: string[];
}

export interface CustomUserProfile extends Omit<UserProfile, 'skills'> {
  skills: string[];
}

export interface ProfileViewProps {
  me: boolean;
  loginState?: string | null;
  tabs: { name: string; query: string }[];
  currentTab: 'viewProfile' | 'viewProjects' | 'viewBookmarks' | undefined;
  // data?: User | Project[];
  profileData?: CustomMyProfile | CustomUserProfile;
  profileNickname: string;
  handleLogInOut: () => void;
  isLoadedData: {
    viewProfile: boolean;
    viewProjects: boolean;
    viewBookmarks: boolean;
  };
  handleEditBtn: (category: string) => void;
}

const ProfileView = ({
  me,
  loginState,
  tabs,
  currentTab,
  // data,
  profileData,
  profileNickname,
  handleLogInOut,
  isLoadedData,
  handleEditBtn,
}: ProfileViewProps) => {
  return (
    <>
      <Container>
        <ColumnLeftContainer role=''>
          <GNBArea>
            <Link href={'/'} passHref>
              <a>
                <GetitLogo width={32} height={32} />
              </a>
            </Link>

            <Link href={'/'} passHref>
              <StyledTitleLink>
                <GNBTitle>Getit 프로필</GNBTitle>
              </StyledTitleLink>
            </Link>
          </GNBArea>

          <ProfileArea>
            <ProfileImageContainer>
              {/* 이미지 없는 경우만 보이도록하기 */}
              <AccountCircleIconContainer>
                <AccountCircleIcon
                  fill={true}
                  width={130}
                  height={130}
                  color='#767678'
                />
              </AccountCircleIconContainer>
              <EditCircleIconContainer>
                <EditCircleIcon
                  fill={true}
                  width={35}
                  height={35}
                  color='#4dd290'
                />
              </EditCircleIconContainer>
            </ProfileImageContainer>

            <UserNickname>{profileNickname}</UserNickname>
          </ProfileArea>

          <HeaderLeft>
            <HeaderLeftMenu currentTab={currentTab} role='menu'>
              {tabs.map((tab, index) => {
                return (
                  <li key={tab.name}>
                    <Link
                      href={{
                        pathname: `/profile/${profileNickname}`,
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
                  <LogInOut onClick={handleLogInOut}>
                    {loginState ? '로그아웃' : '로그인'}
                  </LogInOut>
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
          {currentTab === 'viewProfile' ? (
            <>
              {/* // data !== undefined && */}
              {isLoadedData.viewProfile && profileData ? (
                <ProfileInfoBox
                  me={me}
                  data={profileData}
                  editBtnHandler={handleEditBtn}
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
          ) : null}
          {currentTab === 'viewProjects' ? <>viewProjects</> : null}
          {currentTab === 'viewBookmarks' ? (
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
          ) : null}
        </ColumnRightContainer>

        {/* mobile view */}
        <MobileProfileContainer>
          <SwipeableTabView tabs={tabs}>
            <div>
              {currentTab === 'viewProfile' ? (
                <>
                  {/* // data !== undefined && */}
                  {isLoadedData.viewProfile && profileData ? (
                    <ProfileInfoBox
                      me={me}
                      data={profileData}
                      editBtnHandler={handleEditBtn}
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
              ) : null}
            </div>
            <div>
              {currentTab === 'viewProjects' ? <div>viewProjects</div> : null}
            </div>
            <div>
              {currentTab === 'viewBookmarks' ? (
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
              ) : null}
            </div>
          </SwipeableTabView>
          <FooterLink>
            <ul>
              <li>
                <LogInOut onClick={handleLogInOut}>
                  {loginState ? '로그아웃' : '로그인'}
                </LogInOut>
              </li>
              <li>
                <Link href='/'>
                  <a>고객센터</a>
                </Link>
              </li>
            </ul>
            <ul>
              <li>
                <Link href={'/policy/terms-of-service'}>
                  <a>이용약관</a>
                </Link>
              </li>

              <li>
                <Link href={'/policy/privacy'}>
                  <a>개인정보처리방침</a>
                </Link>
              </li>
            </ul>
            <ul>
              <li>
                <Link href='/' passHref>
                  <FooterLogo>Getit</FooterLogo>
                </Link>
              </li>
            </ul>
          </FooterLink>
        </MobileProfileContainer>
      </Container>
      <Dialog />
    </>
  );
};

export default ProfileView;
