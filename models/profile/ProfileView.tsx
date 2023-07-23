import React, { ChangeEvent } from 'react';
import Link from 'next/link';
import GetitLogo from '@/assets/images/GetitLogo';
import { AccountCircleIcon, EditCircleIcon } from '@/assets/icons';
import { MyProfile, Project, UserProfile } from '@/apis/profileInfoFetcher';
import Divider from '@/components/commons/divider';
import Skeleton from '@/components/commons/skeleton';
import Dialog from '@/components/commons/dialog';
import ProfileInfoBox from './profileViewSection/ProfileInfoBox';
import SwipeableTabView from '@/components/commons/swipeableView/swipeableTabViews';
import Image from 'next/image';
import ProfileProjectBox from './profileViewSection/ProfileProjectBox';
import ProfileFooterLink from './profileViewSection/ProfileFooterLink';
import {
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
  profileImageData?: string | null;
  profileInfoData?: CustomMyProfile | CustomUserProfile | null;
  profileProjectData?: Project[] | null;
  profileNickname: string;
  handleLogInOut: () => void;
  isLoadedData: {
    viewProfile: {
      isLoaded: boolean;
      data: CustomMyProfile | CustomUserProfile | null;
    };
    viewProjects: {
      isLoaded: boolean;
      data: Project[] | null;
    };
    viewBookmarks: {
      isLoaded: boolean;
      data: null;
    };
  };
  handleEditBtn: (category: string) => void;
  profileImgRef: React.RefObject<HTMLInputElement>;
  handleChangeProfileImg: (event: ChangeEvent<HTMLInputElement>) => void;
  anchorEl: null | HTMLElement;
  handleOpenEditSelector: (event: React.MouseEvent<HTMLDivElement>) => void;
  handleEditSelector: (event: React.MouseEvent<HTMLLIElement>) => void;
  open: boolean;
}

const ProfileView = ({
  me,
  loginState,
  tabs,
  currentTab,
  profileImageData,
  profileInfoData,
  profileProjectData,
  profileNickname,
  handleLogInOut,
  isLoadedData,
  handleEditBtn,
  profileImgRef,
  handleChangeProfileImg,
  anchorEl,
  handleOpenEditSelector,
  handleEditSelector,
  open,
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
              <StyledLink>
                <GNBTitle>Getit 프로필</GNBTitle>
              </StyledLink>
            </Link>
          </GNBArea>

          <ProfileArea>
            {profileImageData !== undefined ? (
              <>
                {profileImageData ? (
                  <ProfileImageContainer>
                    <Image
                      style={{ borderRadius: '25rem' }}
                      src={profileImageData}
                      alt={'profile image'}
                      width={120}
                      height={120}
                      draggable={false}
                      priority
                    />
                  </ProfileImageContainer>
                ) : (
                  <ProfileNoImageContainer>
                    <NoImage>
                      <AccountCircleIcon
                        fill={true}
                        width={150}
                        height={150}
                        color='#767678'
                      />
                    </NoImage>
                  </ProfileNoImageContainer>
                )}
                {me && (
                  <>
                    <ImageEditBtn onClick={handleOpenEditSelector}>
                      <EditCircleIcon
                        fill={true}
                        width={35}
                        height={35}
                        color='#4dd290'
                      />
                    </ImageEditBtn>

                    <EditMenu
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleEditSelector}
                    >
                      <EditCondition
                        onClick={handleEditSelector}
                        data-value='update'
                      >
                        수정
                      </EditCondition>
                      <EditCondition
                        onClick={handleEditSelector}
                        data-value='delete'
                      >
                        삭제
                      </EditCondition>
                    </EditMenu>
                  </>
                )}
              </>
            ) : (
              <ProfileImageSkeletonContainer>
                <Skeleton shape='circular' width={120} height={120} top={3} />
              </ProfileImageSkeletonContainer>
            )}

            <input
              hidden
              type='file'
              accept='image/jpg, image/jpeg, image/png'
              ref={profileImgRef}
              onChange={handleChangeProfileImg}
            />

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
          {currentTab === 'viewProfile' && (
            <>
              {isLoadedData.viewProfile.isLoaded ? (
                <ProfileInfoBox
                  me={me}
                  data={profileInfoData}
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
          )}

          {currentTab === 'viewProjects' && (
            <>
              {isLoadedData.viewProjects.isLoaded ? (
                <ProfileProjectBox data={profileProjectData} />
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
            <ViewContainer>
              {isLoadedData.viewProfile.isLoaded ? (
                <>
                  <ProfileInfoBox
                    me={me}
                    data={profileInfoData}
                    editBtnHandler={handleEditBtn}
                  />
                  <ProfileFooterLink
                    loginState={loginState}
                    handleLogInOut={handleLogInOut}
                  />
                </>
              ) : (
                <>
                  <Skeleton height={200} top={3} />
                  <Skeleton height={200} top={3} />
                  <Skeleton height={200} top={3} />
                  <Skeleton height={200} top={3} />
                </>
              )}
            </ViewContainer>
            <ViewContainer>
              {isLoadedData.viewProjects.isLoaded ? (
                <>
                  <ProfileProjectBox data={profileProjectData} />
                  <ProfileFooterLink
                    loginState={loginState}
                    handleLogInOut={handleLogInOut}
                  />
                </>
              ) : (
                <>
                  <Skeleton height={200} top={3} />
                  <Skeleton height={200} top={3} />
                  <Skeleton height={200} top={3} />
                  <Skeleton height={200} top={3} />
                </>
              )}
            </ViewContainer>
            <ViewContainer>
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
            </ViewContainer>
          </SwipeableTabView>
        </MobileProfileContainer>
      </Container>
      <Dialog />
    </>
  );
};

export default ProfileView;
