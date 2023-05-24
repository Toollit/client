import React from 'react';
import Link from 'next/link';
import GetitLogo from '@/assets/images/GetitLogo';
import { AccountCircleIcon, EditCircleIcon } from '@/assets/icons';
import { User, Project } from '@/apis/profileFetcher';
import Divider from '@/components/commons/divider';
import Skeleton from '@/components/commons/skeleton';
import ProfileMobileView from './ProfileMobileView';
import PersonIcon from '@/assets/icons/PersonIcon';
import PhoneIcon from '@/assets/icons/PhoneIcon';
import MailIcon from '@/assets/icons/MailIcon';
import Hashtag from '@/components/commons/hashtag';
import Padding from '@/components/commons/padding';
import Dialog from '@/components/commons/dialog';
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
  LogOut,
  Logo,
  ContentContainer,
  CategoryTitle,
  CategoryContent,
  EditButton,
  Text,
  IconTextContainer,
  CategoryContentContainer,
  IntroduceContentContainer,
  IntroduceContent,
  ProgramOrSkillContainer,
  HashtagContainer,
} from './styles';

export interface ProfileViewProps {
  tabs: { name: string; query: string }[];
  currentTab: 'viewProfile' | 'viewProjects' | 'viewBookmarks' | undefined;
  data?: User | Project[];
  profileNickname: string;
  projects?: Project[];
  handleLogout: () => void;
  isLaptop: boolean;
  isLoadedData: {
    viewProfile: boolean;
    viewProjects: boolean;
    viewBookmarks: boolean;
  };
  handleEdit: (event: React.MouseEvent) => void;
  dialogOpen: boolean;
  dialogTitle: string;
  dialogValue: string;
  handleDialogValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDialog: (event: React.MouseEvent) => void;
  dialogEditType: 'standard' | 'multiline' | 'select';
}

const ProfileView = ({
  tabs,
  currentTab,
  data,
  profileNickname,
  projects,
  handleLogout,
  isLaptop,
  isLoadedData,
  handleEdit,
  dialogOpen,
  dialogTitle,
  dialogValue,
  handleDialogValue,
  handleDialog,
  dialogEditType,
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
                  <LogOut onClick={handleLogout}>로그아웃</LogOut>
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
            isLoadedData.viewProfile &&
            data !== undefined &&
            'email' in data ? (
              <div>
                <ContentContainer>
                  <CategoryTitle>내 프로필</CategoryTitle>
                  <CategoryContentContainer>
                    <CategoryContent>
                      <IconTextContainer>
                        <PersonIcon />
                        <Text padding>{data.nickname}</Text>
                      </IconTextContainer>
                      <EditButton
                        data-edit-title='닉네임 수정'
                        data-edit-value={data.nickname}
                        data-edit-type='standard'
                        data-edit-category='nickname'
                        onClick={handleEdit}
                      >
                        닉네임수정
                      </EditButton>
                    </CategoryContent>
                    {/* <CategoryContent>
                      <IconTextContainer>
                        <PersonIcon />
                        <Text padding>테스트</Text>
                      </IconTextContainer>
                      <EditButton data-edit-title='실명 수정' onClick={handleEdit}>
                        실명수정
                      </EditButton>
                    </CategoryContent> */}

                    {/* <CategoryContent>
                      <IconTextContainer>
                        <PhoneIcon />
                        <Text padding>010-1234-5678</Text>
                      </IconTextContainer>
                      <EditButton
                        data-edit-title='전화번호 수정'
                        onClick={handleEdit}
                      >
                        수정
                      </EditButton>
                    </CategoryContent> */}
                    <CategoryContent>
                      <IconTextContainer>
                        <MailIcon />
                        <Text padding>{data.email}</Text>
                      </IconTextContainer>
                      <EditButton
                        data-edit-title='이메일 수정'
                        data-edit-value={data.email}
                        data-edit-type='standard'
                        data-edit-category='email'
                        onClick={handleEdit}
                      >
                        이메일수정
                      </EditButton>
                    </CategoryContent>
                  </CategoryContentContainer>
                </ContentContainer>
                <ContentContainer>
                  <CategoryTitle>자기소개</CategoryTitle>
                  <IntroduceContentContainer>
                    <IntroduceContent>
                      현재 작성된 자기소개가 없습니다. 현재 작성된 자기소개가
                      없습니다.현재 작성된 자기소개가 없습니다. 현재 작성된
                      자기소개가 없습니다.현재 작성된 자기소개가 없습니다. 현재
                      작성된 자기소개가 없습니다.현재 작성된 자기소개가
                      없습니다. 현재 작성된 자기소개가 없습니다. 현재 작성된
                      자기소개가 없습니다. 현재 작성된 자기소개가 없습니다.현재
                      작성된 자기소개가 없습니다. 현재 작성된 자기소개가
                      없습니다.현재 작성된 자기소개가 없습니다. 현재 작성된
                      자기소개가 없습니다.현재 작성된 자기소개가 없습니다. 현재
                      작성된 자기소개가 없습니다.
                    </IntroduceContent>
                    <EditButton
                      data-edit-title='자기소개 수정'
                      // data-edit-value={data.email}
                      data-edit-type='multiline'
                      data-edit-category='introduce'
                      onClick={handleEdit}
                    >
                      수정
                    </EditButton>
                  </IntroduceContentContainer>
                </ContentContainer>
                <ContentContainer>
                  <CategoryTitle>추가 정보</CategoryTitle>
                  <CategoryContentContainer>
                    <CategoryContent>
                      <div>
                        <Text>온/오프라인:</Text>
                        <Text padding>온라인</Text>
                      </div>
                      <EditButton onClick={handleEdit}>수정</EditButton>
                    </CategoryContent>
                    <CategoryContent>
                      <div>
                        <Text>모임장소:</Text>
                        <Text padding>상관없음</Text>
                      </div>
                      <EditButton onClick={handleEdit}>수정</EditButton>
                    </CategoryContent>
                    <CategoryContent>
                      <div>
                        <Text>모임시간:</Text>
                        <Text padding>주중,주말 가능/시간대 미정</Text>
                      </div>
                      <EditButton onClick={handleEdit}>수정</EditButton>
                    </CategoryContent>
                    <CategoryContent>
                      <div>
                        <Text>관심 분야:</Text>
                        <Text padding>
                          공유서비스, O2O, 이커머스, 유틸, 금융
                        </Text>
                      </div>
                      <EditButton onClick={handleEdit}>수정</EditButton>
                    </CategoryContent>
                    <CategoryContent>
                      <div>
                        <Text>경력사항:</Text>
                        <Text padding>1년차</Text>
                      </div>
                      <EditButton onClick={handleEdit}>수정</EditButton>
                    </CategoryContent>
                  </CategoryContentContainer>
                </ContentContainer>
                <ContentContainer>
                  <CategoryTitle>사용 프로그램 또는 기술</CategoryTitle>

                  <ProgramOrSkillContainer>
                    <HashtagContainer>
                      {[
                        'typescript',
                        'react',
                        'Nextjs',
                        'nodejs',
                        'expressjs',
                        'typescript',
                        'react',
                        'Nextjs',
                        'nodejs',
                        'expressjs',
                        'typescript',
                        'react',
                        'Nextjs',
                        'nodejs',
                        'expressjs',
                        'typescript',
                        'react',
                        'Nextjs',
                        'nodejs',
                        'expressjs',
                      ].map((hashtag, index) => {
                        return (
                          <Hashtag
                            tagName={hashtag}
                            key={`${hashtag}-${index}`}
                          />
                        );
                      })}
                    </HashtagContainer>

                    <EditButton onClick={handleEdit}>수정</EditButton>
                  </ProgramOrSkillContainer>
                </ContentContainer>
              </div>
            ) : (
              <>
                <Skeleton height={200} top={3} />
                <Skeleton height={200} top={3} />
                <Skeleton height={200} top={3} />
                <Skeleton height={200} top={3} />
              </>
            )
          ) : null}

          {currentTab === 'viewProjects' ? (
            isLoadedData.viewProjects ? (
              <div>
                <div>
                  <div>viewProjects</div>
                  <div>viewProjects</div>
                  <div>viewProjects</div>
                  <div>viewProjects</div>
                  <div>viewProjects</div>
                </div>
                <div>간단한 자기소개</div>
                <div>사용 프로그램 또는 기술</div>
              </div>
            ) : (
              <Skeleton />
            )
          ) : null}

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

        {/* {!isLaptop && (
          <ProfileMobileView
            tabs={tabs}
            currentTab={currentTab}
            isLoadedData={isLoadedData}
          />
        )} */}
      </Container>
      <Dialog
        type={dialogEditType}
        open={dialogOpen}
        handler={handleDialog}
        title={dialogTitle}
        value={dialogValue}
        onChange={handleDialogValue}
      />
    </>
  );
};

export default ProfileView;
