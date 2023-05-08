import React from 'react';
import Link from 'next/link';
import GetitLogo from '@/assets/images/GetitLogo';
import { AccountCircleIcon, EditCircleIcon } from '@/assets/icons';
import { Project, User } from '@/apis/userFetcher';
import Divider from '@/components/commons/divider';
import { SwiperTab, SwiperSlider } from '@/components/commons/swiper';
import SwiperCore from 'swiper';
import {
  Container,
  ColumnLeftContainer,
  ColumnRightContainer,
  GNBArea,
  GNBLogo,
  GNBTitleContainer,
  StyledTitleLink,
  GNBTitle,
  ProfileArea,
  UserNickname,
  UserEmail,
  ProfileImageContainer,
  HeaderLeft,
  HeaderLeftMenu,
  HeaderLeftLink,
  DividerContainer,
  LogOut,
  Logo,
  SettingsContainer,
  DeleteUser,
  SliderContainer,
  UserInfoContainer,
} from './styles';

export interface ProfileViewProps {
  swiperRef: React.MutableRefObject<SwiperCore | undefined>;
  currentTab: 'viewProfile' | 'project' | 'bookmark';
  userProfile?: User;
  projects?: Project[];
}

const ProfileView = ({
  swiperRef,
  currentTab,
  userProfile,
  projects,
}: ProfileViewProps) => {
  console.log('swiperRef ===>', swiperRef);
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
              <AccountCircleIcon
                fill={true}
                width={130}
                height={130}
                color='#767678'
              />
              <div>
                <EditCircleIcon
                  fill={true}
                  width={35}
                  height={35}
                  color='#4dd290'
                />
              </div>
            </ProfileImageContainer>

            <UserNickname>{userProfile?.nickname}</UserNickname>
            <UserEmail>{userProfile?.email}</UserEmail>
          </ProfileArea>

          <HeaderLeft>
            <HeaderLeftMenu currentTab={currentTab} role='menu'>
              <li>
                <Link
                  href={`/profile/${userProfile?.nickname}?tab=viewProfile`}
                >
                  <a>내프로필</a>
                </Link>
              </li>

              <li>
                <Link href={`/profile/${userProfile?.nickname}?tab=project`}>
                  <a>프로젝트</a>
                </Link>
              </li>
              <li>
                <Link href={`/profile/${userProfile?.nickname}?tab=bookmark`}>
                  <a>북마크</a>
                </Link>
              </li>
            </HeaderLeftMenu>
            <DividerContainer>
              <Divider type='thin' />
            </DividerContainer>

            <HeaderLeftLink>
              <ul>
                <li>
                  <Link href=''>
                    <LogOut>로그아웃</LogOut>
                  </Link>
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
          {currentTab && (
            <div>
              <div>
                <div>내 프로필</div>
                <div>실명</div>
                <div>핸드폰 번호 수정</div>
                <div>이메일 수정</div>
                <div>이메일 공개</div>
              </div>
              <div>간단한 자기소개</div>
              <div>사용 프로그램 또는 기술</div>
            </div>
          )}
        </ColumnRightContainer>

        <SwiperTab
          tab={['내프로필', '프로젝트', '북마크']}
          swiperRef={swiperRef}
        >
          <SwiperSlider>
            <SliderContainer>
              <UserInfoContainer>
                <div>
                  {/* <div>내 프로필</div> */}
                  {/* <div>이름</div> */}
                  {/* <div>핸드폰 번호 수정</div> */}
                  <div>
                    <div>이메일</div>
                    <div>수정</div>
                  </div>
                  <Divider type='thin' />
                </div>
                <div>
                  <div>자기소개</div>
                  <div>수정</div>
                </div>

                <Divider type='thin' />

                <div>
                  <div>온/오프라인</div>
                  <div>모임장소</div>
                  <div>모임시간</div>
                  <div>관심분야</div>
                  <div>경력사항</div>
                </div>

                <Divider type='thin' />
                <div>
                  <div>사용 프로그램 또는 기술</div>
                  <div>수정</div>
                </div>
              </UserInfoContainer>

              <SettingsContainer>
                <div>이메일 공개</div>

                <div>on/off 토글</div>
              </SettingsContainer>

              <DeleteUser>{`회원탈퇴 >`}</DeleteUser>
            </SliderContainer>
          </SwiperSlider>
          <SwiperSlider>
            {/* {({ isVisible }) => (
              <div>Current slide is {isVisible ? 'active' : 'not active'}</div>
            )} */}

            {/* <div>{swiperSlide.isActive ? 'active' : 'no'}</div> */}
            {/* <div>프로젝트</div>
            <div>프로젝트</div>
            <div>프로젝트</div>
            <div>프로젝트</div> */}
          </SwiperSlider>
          <SwiperSlider>
            <div>북마크</div>
            <div>북마크</div>
            <div>북마크</div>
            <div>북마크</div>
          </SwiperSlider>
        </SwiperTab>
      </Container>
    </>
  );
};

export default ProfileView;
